from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.prediction import router as prediction_router


app = FastAPI(
    title="MediVerse API",
    description="AI-powered disease prediction using NLP and XGBoost.",
    version="1.0.0",
)


# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # We'll restrict this after React is ready
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Routers
# -----------------------------
app.include_router(
    prediction_router,
    prefix="/api/v1",
)


# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def root():

    return {
        "project": "MediVerse",
        "version": "1.0.0",
        "status": "Running",
    }


# -----------------------------
# Health Check
# -----------------------------
@app.get("/health")
def health():

    return {
        "status": "Healthy"
    }