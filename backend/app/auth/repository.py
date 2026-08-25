from datetime import datetime, timezone
from bson import ObjectId

from app.database.collections import users_collection


class AuthRepository:

    async def get_user_by_email(
        self,
        email: str,
    ):
        return await users_collection.find_one(
            {
                "email": email.strip().lower(),
            }
        )

    async def get_user_by_id(
        self,
        user_id: str,
    ):
        return await users_collection.find_one(
            {
                "_id": ObjectId(user_id),
            }
        )

    async def create_user(
        self,
        user: dict,
    ):
        user["email"] = user["email"].strip().lower()
        result = await users_collection.insert_one(
            user
        )

        return await self.get_user_by_id(
            str(result.inserted_id)
        )

    async def save_otp(self, email: str, otp: str, expires_at: datetime):
        """
        Stores 6-digit OTP and expiration timestamp in user document.
        """
        await users_collection.update_one(
            {"email": email.strip().lower()},
            {
                "$set": {
                    "reset_otp": otp,
                    "reset_otp_expires_at": expires_at,
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )

    async def clear_otp(self, email: str):
        """
        Clears reset OTP fields after successful verification/reset.
        """
        await users_collection.update_one(
            {"email": email.strip().lower()},
            {
                "$unset": {
                    "reset_otp": "",
                    "reset_otp_expires_at": ""
                },
                "$set": {
                    "updated_at": datetime.now(timezone.utc)
                }
            }
        )

    async def update_password(self, email: str, new_hashed_password: str):
        """
        Updates user password hash and clears OTP fields.
        """
        now = datetime.now(timezone.utc)
        await users_collection.update_one(
            {"email": email.strip().lower()},
            {
                "$set": {
                    "password": new_hashed_password,
                    "updated_at": now
                },
                "$unset": {
                    "reset_otp": "",
                    "reset_otp_expires_at": ""
                }
            }
        )


auth_repository = AuthRepository()