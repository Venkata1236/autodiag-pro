from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    OPENAI_API_KEY: str

    DATABASE_URL: str

    CHROMA_DB_PATH: str = "chroma_db/"

    MAX_CODES_PER_REQUEST: int = 10

    RETRIEVAL_TOP_K: int = 5

    ENVIRONMENT: str = "development"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()