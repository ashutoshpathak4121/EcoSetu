from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router
from app.core.config import settings

app = FastAPI(
    title="EcoSetu AI Waste Verification Service",
    description="Independent Computer Vision & Waste Stream Classification Microservice",
    version="2.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS setup
origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",")]
if "*" in origins:
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {
        "message": "Welcome to EcoSetu AI Verification Engine",
        "docs": "/docs",
        "health": "/api/v1/health"
    }

