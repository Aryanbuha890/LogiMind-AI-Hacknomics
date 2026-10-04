"""
FastAPI Application – Maritime-RAG
===================================
Production-ready REST API exposing the Hybrid RAG pipeline.

Endpoints:
    POST /ask            – Ask a maritime safety question
    POST /ingest         – Ingest PDF documents from data/raw_pdfs
    GET  /health         – Health check
    GET  /stats          – Collection statistics
    POST /ask/{agent}    – Ask via a specialised agent
"""

from contextlib import asynccontextmanager
from typing import List, Optional, Literal

from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from src.utils.logger import log
from src.utils.config import get_settings
from src.ingestion.pdf_loader import PDFDocumentLoader
from src.ingestion.text_splitter import DocumentSplitter
from src.ingestion.embedder import DocumentEmbedder
from src.retrieval.hybrid_search import HybridSearchEngine
from src.retrieval.reranker import Reranker
from src.retrieval.vector_search import VectorSearchEngine
from src.llm.groq_client import GroqClient
from src.llm.prompts import get_agent_system_prompt
from src.services import (
    RetrievalService,
    RelevanceChecker,
    GroqFallbackService,
    ResponseGenerator,
    HybridRAGSystem,
)


# =========================================================================
# Pydantic Models
# =========================================================================
class AskRequest(BaseModel):
    """Request body for the /ask endpoint."""

    question: str = Field(
        ...,
        min_length=3,
        max_length=2000,
        description="The maritime safety question to answer.",
        json_schema_extra={"example": "What is the procedure after chemical leakage?"},
    )
    agent: Optional[str] = Field(
        default=None,
        description="Optional agent specialisation: chemical_leak, crane_safety, vessel_safety, emergency_response.",
    )


class AskResponse(BaseModel):
    """Response body for the /ask endpoint."""

    answer: str = Field(..., description="Generated answer.")
    sources: List[str] = Field(default_factory=list, description="Source document filenames cited.")
    confidence: str = Field(default="Medium", description="High / Medium / Low confidence.")
    source: str = Field(default="RAG", description="Whether the answer came from RAG or Gemini fallback.")


class IngestResponse(BaseModel):
    """Response body for the /ingest endpoint."""

    message: str
    documents_loaded: int
    chunks_created: int


class HealthResponse(BaseModel):
    """Response body for the /health endpoint."""

    status: str
    gemini_ok: bool
    collection_count: int


class StatsResponse(BaseModel):
    """Response body for the /stats endpoint."""

    collection_name: str
    vector_count: int
    available_pdfs: List[str]


# =========================================================================
# Application Lifespan – initialise heavy components once
# =========================================================================
# Shared state populated during startup
_components: dict = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup / shutdown lifecycle for heavy ML models and DB connections."""
    log.info("🚀 Starting Maritime-RAG API…")
    settings = get_settings()

    # Instantiate core components
    loader = PDFDocumentLoader()
    splitter = DocumentSplitter()
    embedder = DocumentEmbedder()
    search = HybridSearchEngine()
    reranker = Reranker()
    # Initialize Groq LLM
    llm = GroqClient()
    vector_search = VectorSearchEngine()

    _components["loader"] = loader
    _components["splitter"] = splitter
    _components["embedder"] = embedder
    _components["search"] = search
    _components["reranker"] = reranker
    _components["llm"] = llm

    # Instantiate services
    retrieval_service = RetrievalService(
        vector_search=vector_search,
        hybrid_search=search,
        reranker=reranker
    )
    relevance_checker = RelevanceChecker(groq_client=llm)
    fallback_service = GroqFallbackService(groq_client=llm)
    response_generator = ResponseGenerator(groq_client=llm, fallback_service=fallback_service)

    # Initialize the hybrid system coordinator
    _components["hybrid_rag"] = HybridRAGSystem(
        retrieval_service=retrieval_service,
        relevance_checker=relevance_checker,
        response_generator=response_generator
    )

    log.info("✅ All components and Hybrid RAG services initialised")
    yield
    log.info("🛑 Shutting down Maritime-RAG API")


# =========================================================================
# FastAPI App
# =========================================================================
app = FastAPI(
    title="Maritime-RAG API",
    description=(
        "Hybrid Retrieval-Augmented Generation system for Maritime Safety "
        "and Port Operations."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

# CORS – allow all in development; tighten in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================================
# Endpoints
# =========================================================================
@app.post("/ask", response_model=AskResponse, tags=["RAG"])
def ask_question(request: AskRequest):
    """
    Ask a maritime safety question and receive an AI-generated answer.
    Uses Hybrid RAG with Gemini fallback logic and LLM-based relevance checking.
    """
    try:
        hybrid_rag: HybridRAGSystem = _components["hybrid_rag"]
        result = hybrid_rag.answer_question(
            question=request.question,
            agent=request.agent
        )
        return AskResponse(**result)

    except HTTPException:
        raise
    except Exception as exc:
        log.exception("Error processing question")
        raise HTTPException(status_code=500, detail=f"Internal error: {exc}")


@app.post(
    "/ask/{agent_name}",
    response_model=AskResponse,
    tags=["Agents"],
    summary="Ask via a specialised agent",
)
def ask_agent(agent_name: str, request: AskRequest):
    """
    Route the question through a domain-specific agent.

    Available agents:
        - ``chemical_leak``
        - ``crane_safety``
        - ``vessel_safety``
        - ``emergency_response``
    """
    request.agent = agent_name
    return ask_question(request)


@app.post("/ingest", response_model=IngestResponse, tags=["Ingestion"])
def ingest_documents():
    """
    Ingest all PDFs from ``data/raw_pdfs/``, chunk them, embed, and store
    into ChromaDB. Call this after adding new PDF files.
    """
    try:
        loader: PDFDocumentLoader = _components["loader"]
        splitter: DocumentSplitter = _components["splitter"]
        embedder: DocumentEmbedder = _components["embedder"]
        search_engine: HybridSearchEngine = _components["search"]

        # Load → Split → Embed
        docs = loader.load_directory()
        if not docs:
            return IngestResponse(
                message="No PDF files found in data/raw_pdfs/",
                documents_loaded=0,
                chunks_created=0,
            )

        chunks = splitter.split(docs)
        embedder.embed_and_store(chunks)

        # Refresh BM25 index after new documents
        search_engine.refresh_bm25_index()

        return IngestResponse(
            message=f"Successfully ingested {len(docs)} document(s)",
            documents_loaded=len(docs),
            chunks_created=len(chunks),
        )

    except Exception as exc:
        log.exception("Ingestion failed")
        raise HTTPException(status_code=500, detail=f"Ingestion error: {exc}")


@app.get("/health", response_model=HealthResponse, tags=["System"])
def health_check():
    """Check system health: API, Groq connectivity, and vector store."""
    llm: GroqClient = _components["llm"]
    search: HybridSearchEngine = _components["search"]

    groq_ok = llm.health_check()
    try:
        count = search._vectorstore._collection.count()
    except Exception:
        count = 0

    status = "healthy" if groq_ok else "degraded"
    return HealthResponse(status=status, gemini_ok=groq_ok, collection_count=count)


@app.get("/stats", response_model=StatsResponse, tags=["System"])
def collection_stats():
    """Return vector store statistics and available PDFs."""
    settings = get_settings()
    search: HybridSearchEngine = _components["search"]
    loader: PDFDocumentLoader = _components["loader"]

    try:
        count = search._vectorstore._collection.count()
    except Exception:
        count = 0

    return StatsResponse(
        collection_name=settings.chroma_collection_name,
        vector_count=count,
        available_pdfs=loader.get_available_pdfs(),
    )


@app.get("/", response_class=HTMLResponse, tags=["System"])
def root():
    """Serve the RAG UI dashboard."""
    import os
    static_file_path = os.path.join(os.path.dirname(__file__), "static", "index.html")
    try:
        with open(static_file_path, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read(), status_code=200)
    except Exception as exc:
        log.error("Failed to read index.html: {}", exc)
        return HTMLResponse(content="<h1>Maritime-RAG Control Center Offline</h1>", status_code=500)
