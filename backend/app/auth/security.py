import bcrypt
from datetime import datetime, timedelta, timezone

from jose import jwt

from app.config.settings import (
    JWT_SECRET_KEY,
    JWT_ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)


def _safe_pwd_bytes(password: str) -> bytes:
    """
    Safely encode and truncate password to max 72 UTF-8 bytes for bcrypt.
    """
    if not password:
        return b""
    return str(password).encode('utf-8')[:72]


def hash_password(password: str) -> str:
    """
    Hash a plain-text password using native bcrypt.
    """
    pwd_bytes = _safe_pwd_bytes(password)
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    """
    Verify a password against its hash using native bcrypt.
    Never raises ValueError.
    """
    try:
        pwd_bytes = _safe_pwd_bytes(plain_password)
        hash_bytes = str(hashed_password).encode('utf-8')
        return bcrypt.checkpw(pwd_bytes, hash_bytes)
    except Exception:
        return False


def create_access_token(
    data: dict,
) -> str:
    """
    Generate a JWT access token.
    """

    payload = data.copy()

    expire = datetime.now(
        timezone.utc
    ) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload.update({"exp": expire})

    return jwt.encode(
        payload,
        JWT_SECRET_KEY,
        algorithm=JWT_ALGORITHM,
    )