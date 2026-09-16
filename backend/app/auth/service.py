import random
from datetime import datetime, timedelta, timezone
from app.auth.repository import auth_repository
from app.auth.security import verify_password, hash_password, create_access_token
from app.services.email_service import send_otp_email
import asyncio

class AuthService:
    async def register(self, name: str, email: str, password: str):
        """
        Registers a new user account if the email does not already exist.
        """
        email_clean = email.strip().lower()
        existing_user = await auth_repository.get_user_by_email(email_clean)

        if existing_user:
            raise ValueError("Email already registered.")

        hashed = hash_password(password)
        created_user = await auth_repository.create_user(
            {
                "name": name,
                "email": email_clean,
                "password": hashed,
            }
        )

        user_id = str(created_user["_id"])

        token = create_access_token(
            {
                "sub": user_id,
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user_id,
                "name": name,
                "email": email_clean,
            },
        }

    async def login(self, email: str, password: str):
        """
        Authenticates an existing user and returns JWT token.
        """
        email_clean = email.strip().lower()
        user = await auth_repository.get_user_by_email(email_clean)

        if not user or not verify_password(
            password,
            user["password"],
        ):
            raise ValueError(
                "Invalid email or password."
            )

        token = create_access_token(
            {
                "sub": str(user["_id"]),
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
            },
        }

    async def forgot_password(self, email: str):
        """
        Generates a 6-digit verification code, saves it in DB, and emails it to user asynchronously.
        """
        email_clean = email.strip().lower()
        user = await auth_repository.get_user_by_email(email_clean)

        if not user:
            # Prevent user enumeration security vulnerability while letting frontend know email was handled
            return {"message": "If this email is registered, a password reset code has been sent.", "status": "success"}

        # Generate 6-digit random numeric OTP code
        otp_code = f"{random.randint(100000, 999999)}"
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=10)

        await auth_repository.save_otp(email_clean, otp_code, expires_at)
        asyncio.create_task(send_otp_email(email_clean, otp_code, user_name=user.get("name", "Valued User")))

        return {
            "message": f"A 6-digit verification code has been sent to {email_clean}.",
            "status": "success"
        }

    async def verify_otp(self, email: str, otp: str):
        """
        Validates the 6-digit OTP code against the database.
        """
        email_clean = email.strip().lower()
        user = await auth_repository.get_user_by_email(email_clean)

        if not user:
            raise ValueError("Invalid email or verification code.")

        db_otp = user.get("reset_otp")
        db_expires = user.get("reset_otp_expires_at")

        if not db_otp or db_otp != otp.strip():
            raise ValueError("Invalid verification code. Please check your email and try again.")

        if db_expires:
            # Ensure datetime offset awareness
            if db_expires.tzinfo is None:
                db_expires = db_expires.replace(tzinfo=timezone.utc)
            if datetime.now(timezone.utc) > db_expires:
                raise ValueError("Verification code has expired. Please request a new code.")

        return {
            "message": "Verification code confirmed successfully.",
            "status": "success"
        }

    async def reset_password(self, email: str, otp: str, new_password: str):
        """
        Validates the OTP code, hashes the new password, and updates user credentials.
        """
        await self.verify_otp(email, otp)
        email_clean = email.strip().lower()

        hashed_password = hash_password(new_password)
        await auth_repository.update_password(email_clean, hashed_password)
        await auth_repository.clear_otp(email_clean)

        return {
            "message": "Password reset successfully. You can now login with your new password.",
            "status": "success"
        }

auth_service = AuthService()