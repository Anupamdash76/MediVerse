from pydantic import BaseModel
from typing import List, Optional


class ProfileResponse(BaseModel):
    age: Optional[int] = None

    gender: Optional[str] = None

    height_cm: Optional[float] = None

    weight_kg: Optional[float] = None

    blood_group: Optional[str] = None

    allergies: List[str] = []

    chronic_diseases: List[str] = []

    current_medications: List[str] = []