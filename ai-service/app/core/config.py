from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    AI_ENV: str = "development"
    PORT: int = 8000
    CONFIDENCE_THRESHOLD_APPROVED: float = 0.85
    CONFIDENCE_THRESHOLD_REVIEW: float = 0.60
    CONTAMINATION_THRESHOLD_FLAG: float = 0.15
    MODEL_VERSION: str = "swachhsetu-waste-v2.1"
    ALLOWED_ORIGINS: str = "*"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
