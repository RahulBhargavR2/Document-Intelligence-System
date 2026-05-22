from pydantic_settings import BaseSettings, SettingsConfigDict
import os

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

env_file = ".env.production" if ENVIRONMENT == "production" else ".env.development"

class Settings(BaseSettings):

    OPENAI_API_KEY: str

    EMBEDDING_MODEL: str = (
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    RERANKER_MODEL: str = (
     "cross-encoder/ms-marco-MiniLM-L-6-v2"
    )

    LLM_MODEL: str

    FAISS_INDEX_PATH: str = (
        "storage/faiss_index.bin"
    )

    CHUNKS_PATH: str = (
        "storage/chunks.json"
    )

    DOCUMENTS_PATH: str = (
        "storage/documents.json"
    )

    BASE_URL: str = (
        "https://openrouter.ai/api/v1"
    )

    TOP_K_RETRIEVAL: int = 5

    model_config = SettingsConfigDict(
        env_file=env_file,
        extra="ignore"
    )

    DEBUG : bool = False


settings = Settings()
