"""
Maritime-RAG Configuration Module
=================================
Centralised configuration management using pydantic-settings.
All values are loaded from environment variables / .env file,
with sensible defaults for local development.
"""

from pathlib import Path
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


# ---------------------------------------------------------------------------
# Resolve project root (two levels up from this file → maritime-rag/)
# ---------------------------------------------------------------------------
PROJECT_ROOT = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    """Application-wide settings loaded from .env at project root."""

    model_config = SettingsConfigDict(
        env_file=str(PROJECT_ROOT / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # ── Groq ──────────────────────────────────────────────────────────────
    groq_api_key: str = ""
    groq_model: str = "openai/gpt-oss-20b"
    llm_temperature: float = 0.3
    llm_max_tokens: int = 2048

    # ── Embedding ──────────────────────────────────────────────────────────
    embedding_model: str = "BAAI/bge-small-en-v1.5"

    # ── Reranker ───────────────────────────────────────────────────────────
    reranker_model: str = "BAAI/bge-reranker-base"

    # ── ChromaDB ───────────────────────────────────────────────────────────
    chroma_persist_dir: str = str(PROJECT_ROOT / "chroma_db")
    chroma_collection_name: str = "maritime_safety"

    # ── Chunking ───────────────────────────────────────────────────────────
    chunk_size: int = 512
    chunk_overlap: int = 50

    # ── Retrieval ──────────────────────────────────────────────────────────
    vector_search_top_k: int = 5
    hybrid_search_top_k: int = 5
    rerank_top_k: int = 3
    rag_threshold: float = 0.65

    # ── API ────────────────────────────────────────────────────────────────
    api_host: str = "0.0.0.0"
    api_port: int = 8001
    api_reload: bool = True

    # ── Logging ────────────────────────────────────────────────────────────
    log_level: str = "INFO"
    log_file: str = str(PROJECT_ROOT / "logs" / "maritime_rag.log")

    # ── Data Paths ─────────────────────────────────────────────────────────
    @property
    def raw_pdfs_dir(self) -> Path:
        return PROJECT_ROOT / "data" / "raw_pdfs"

    @property
    def processed_dir(self) -> Path:
        return PROJECT_ROOT / "data" / "processed"


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return a cached singleton of application settings."""
    return Settings()
