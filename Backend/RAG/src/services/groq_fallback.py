"""
Groq Fallback Service
=======================
Provides fallback AI answers using Groq when the knowledge base lacks information.
"""

from src.llm.groq_client import GroqClient
from src.utils.logger import log


class GroqFallbackService:
    """
    Service for answering questions purely from Groq's internal knowledge
    when hybrid search returns no relevant results.
    """

    def __init__(self, groq_client: GroqClient):
        self._llm = groq_client
        self.fallback_prompt = (
            "You are LogiMind Copilot, an expert maritime safety and port operations assistant developed exclusively for LogiMind AI. "
            "The user asked a question that could not be answered using the provided document knowledge base. "
            "Please answer the question based on authoritative knowledge of maritime "
            "safety, regulations (like SOLAS, MARPOL, IMDG), and port operations best practices. "
            "CRITICAL: Absolutely NEVER mention any underlying AI model names, providers, or vendor architectures (such as Groq, Llama, OpenAI, GPT, Qwen, Gemini, Claude, Meta, etc.). Always identify strictly as LogiMind Copilot."
        )
        log.info("GroqFallbackService initialised.")

    def generate_general_answer(self, query: str, system_prompt: str = None) -> str:
        """
        Generate a fallback answer without document context.

        Args:
            query: The user's query.
            system_prompt: Optional system prompt to use.

        Returns:
            The generated fallback answer string.
        """
        log.info("Generating fallback answer via Groq...")
        try:
            from langchain_core.messages import HumanMessage, SystemMessage
            prompt = system_prompt or self.fallback_prompt
            messages = [
                SystemMessage(content=prompt),
                HumanMessage(content=query),
            ]
            response = self._llm._llm.invoke(messages)
            
            if isinstance(response.content, list):
                parts = []
                for part in response.content:
                    if isinstance(part, dict) and "text" in part:
                        parts.append(part["text"])
                    elif isinstance(part, str):
                        parts.append(part)
                return "".join(parts)
            return str(response.content)
            
        except Exception as exc:
            # Check for API errors
            log.error("GroqFallbackService: Groq fallback API call failed: {}", exc)
            raise
