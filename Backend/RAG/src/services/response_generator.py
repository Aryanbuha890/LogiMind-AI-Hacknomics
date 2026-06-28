from typing import List, Dict, Any, Optional
from langchain_core.documents import Document

from src.llm.groq_client import GroqClient
from src.services.groq_fallback import GroqFallbackService
from src.utils.logger import log

class ResponseGenerator:
    """
    Response Generator Service
    ==========================
    Orchestrates response formatting for both RAG-based and Groq fallback-based routes.
    """

    def __init__(self, groq_client: GroqClient, fallback_service: GroqFallbackService):
        self.groq_client = groq_client
        self.fallback_service = fallback_service

    def generate_rag_response(
        self,
        question: str,
        documents: List[Document],
        similarity_score: float,
        system_prompt: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate answer from the provided RAG context documents.

        Args:
            question: User's question.
            documents: Reranked documents containing the context.
            similarity_score: Similarity score computed during retrieval.
            system_prompt: Optional agent system prompt.

        Returns:
            Dict containing answer, source, confidence, and sources list.
        """
        log.debug("ResponseGenerator: generating RAG response for query='{}'", question[:80])

        result = self.groq_client.generate_answer(
            question=question,
            documents=documents,
            system_prompt=system_prompt
        )

        return {
            "answer": result["answer"],
            "source": "RAG",
            "confidence": result.get("confidence", "Medium"),
            "sources": result["sources"]
        }

    def generate_fallback_response(
        self,
        question: str,
        similarity_score: float,
        system_prompt: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate fallback general knowledge answer.

        Args:
            question: User's question.
            similarity_score: Retrieval similarity score (usually below threshold).
            system_prompt: Optional agent system prompt.

        Returns:
            Dict containing answer, source, confidence, and empty sources list.
        """
        log.debug("ResponseGenerator: generating Groq fallback response for query='{}'", question[:80])

        answer = self.fallback_service.generate_general_answer(
            query=question,
            system_prompt=system_prompt
        )

        return {
            "answer": answer,
            "source": "Groq",
            "confidence": "Medium",
            "sources": ["General Maritime Knowledge (Groq)"]
        }
