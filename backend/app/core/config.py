from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    OPENAI_API_KEY: str

    CHROMA_DB_PATH: str = "chroma_db/"

    MAX_CODES_PER_REQUEST: int = 10

    RETRIEVAL_TOP_K: int = 5

    ENVIRONMENT: str = "development"

    DATABASE_URL: str

    class Config:
        env_file = ".env"


settings = Settings()