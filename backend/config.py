from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    # Google Custom Search API Settings
    GOOGLE_CUSTOM_SEARCH_API_KEY: Optional[str] = None
    GOOGLE_SEARCH_ENGINE_ID: Optional[str] = None

    # Application Settings
    APP_NAME: str = "Image Search API"
    DEBUG: bool = False
    
    # Scraping and Search Limits
    MAX_IMAGES_PER_SEARCH: int = 50
    MAX_RESULTS_PER_REQUEST: int = 10

    # Security Settings
    ALLOWED_IMAGE_TYPES: list[str] = [
        'image/jpeg', 
        'image/png', 
        'image/gif', 
        'image/webp'
    ]
    
    # Temporary File Settings
    TEMP_UPLOAD_DIR: str = "temp"
    MAX_UPLOAD_FILE_SIZE: int = 10 * 1024 * 1024  # 10 MB

    # Logging and Monitoring
    LOG_LEVEL: str = "INFO"

    # Model configuration to read from .env file
    model_config = SettingsConfigDict(
        env_file=".env",  # Primary env file
        env_file_encoding="utf-8",
        extra="ignore"  # Ignore extra environment variables
    )

# Create a singleton settings instance
settings = Settings()