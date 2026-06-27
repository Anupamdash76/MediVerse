from fastapi import FastAPI

app = FastAPI(
    title="MediVerse API",
    description="AI-Powered Healthcare Recommendation Platform",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to MediVerse API 🚀",
        "status": "running"
    }