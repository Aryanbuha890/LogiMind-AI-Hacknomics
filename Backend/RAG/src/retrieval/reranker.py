"""
Reranker Module
===============
Re-scores retrieval candidates using a cross-encoder reranker model
to surface the most relevant chunks before passing them to the LLM.

Default model: ``BAAI/bge-reranker-large``
"""

from typing import List, Optional, Tuple

from langchain_core.documents import Document
from sentence_transformers import CrossEncoder
import torch

from src.utils.logger import log
from src.utils.config import get_settings


class Reranker:
    """
    Cross-encoder reranker for retrieval refinement.

    Loads ``bge-reranker-large`` and scores (query, passage) pairs.
    Returns top-K results sorted by relevance.
    """

    def __init__(
        self,
        model_name: Optional[str] = None,
        top_k: Optional[int] = None,
    ):
        """
        Initialise the reranker.

        Args:
            model_name: Override reranker model (default from settings).
            top_k:      Number of results to keep after reranking.
        """
        settings = get_settings()
        self.model_name = model_name or settings.reranker_model
        self.top_k = top_k or settings.rerank_top_k

        if not self.model_name or self.model_name.lower() in ("none", "disabled", "passthrough"):
            log.info("Reranker set to passthrough mode – skipping HuggingFace model download.")
            self._model = None
            return

        log.info("Loading reranker model: {}", self.model_name)
        try:
            device = "cuda" if torch.cuda.is_available() else "cpu"
            self._model = CrossEncoder(self.model_name, max_length=512, device=device)
            log.info("Reranker loaded successfully")
        except Exception as e:
            log.warning(
                "Could not load CrossEncoder model '{}' ({}). Reranker running in fail-safe passthrough mode.",
                self.model_name,
                e,
            )
            self._model = None

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------
    def rerank(
        self,
        query: str,
        documents: List[Document],
        top_k: Optional[int] = None,
    ) -> List[Document]:
        """
        Rerank documents by cross-encoder relevance.

        Args:
            query:     The user's question.
            documents: Candidate documents from the retrieval stage.
            top_k:     Override number of results to return.

        Returns:
            Reranked list of Documents (highest relevance first).
        """
        if not documents:
            log.warning("No documents to rerank.")
            return []

        k = top_k or self.top_k
        log.info("Reranking {} candidate(s), returning top {}", len(documents), k)

        if self._model is None:
            log.info("Reranker model not loaded; returning top {} candidates via vector/hybrid order.", k)
            return documents[:k]

        # Build (query, passage) pairs for cross-encoder
        pairs = [(query, doc.page_content) for doc in documents]
        scores = self._model.predict(pairs)

        # Attach scores and sort
        scored_docs: List[Tuple[Document, float]] = list(zip(documents, scores))
        scored_docs.sort(key=lambda x: x[1], reverse=True)

        # Attach rerank score to metadata
        reranked: List[Document] = []
        for doc, score in scored_docs[:k]:
            doc.metadata["rerank_score"] = float(score)
            reranked.append(doc)

        log.info(
            "Reranking complete – top score: {:.4f}, bottom score: {:.4f}",
            scored_docs[0][1] if scored_docs else 0.0,
            scored_docs[min(k - 1, len(scored_docs) - 1)][1] if scored_docs else 0.0,
        )
        return reranked

    def score_pair(self, query: str, passage: str) -> float:
        """
        Score a single (query, passage) pair.

        Args:
            query:   The user's question.
            passage: A candidate text passage.

        Returns:
            Relevance score (higher = more relevant).
        """
        return float(self._model.predict([(query, passage)])[0])
