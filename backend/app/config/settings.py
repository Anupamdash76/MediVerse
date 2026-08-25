"""
Application settings for MediVerse.

Contains:
- NLP configuration
- Database configuration
- Authentication configuration
"""

import os
from dotenv import load_dotenv

load_dotenv()


# =====================================================
# NLP Configuration
# =====================================================

# Number of semantic matches to retrieve
TOP_K = 3

# Minimum cosine similarity score
# required for a symptom to be considered a match.
SIMILARITY_THRESHOLD = 0.55


# =====================================================
# Database Configuration
# =====================================================

MONGODB_URL = os.getenv("MONGODB_URL", "")

DATABASE_NAME = os.getenv("DATABASE_NAME", "mediverse")


# =====================================================
# JWT Configuration
# =====================================================

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change_this_secret_in_production")

JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        60,
    )
)