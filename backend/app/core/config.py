from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # OpenAI
    OPENAI_API_KEY: str = ""

    # Vector DB
    CHROMA_DB_PATH: str = "chroma_db/"

    # Limits
    MAX_CODES_PER_REQUEST: int = 10
    RETRIEVAL_TOP_K: int = 5

    #  Environment
    ENVIRONMENT: str = "development"

    #DATABASE (HARDCODED FIX)
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@127.0.0.1:5432/autodiag_pro"

    class Config:
        env_file = ".env"
        extra = "ignore"   # prevents crashes if extra env vars exist


# Single instance used across app
settings = Settings()