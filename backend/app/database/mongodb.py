from motor.motor_asyncio import AsyncIOMotorClient

from app.config.settings import (
    MONGODB_URL,
    DATABASE_NAME,
)

mongo_uri = MONGODB_URL.strip() if MONGODB_URL and MONGODB_URL.strip() else "mongodb://localhost:27017"

client = AsyncIOMotorClient(mongo_uri)

db = client[DATABASE_NAME]