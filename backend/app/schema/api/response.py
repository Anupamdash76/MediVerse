from typing import List

from pydantic import BaseModel, Field


class SymptomMatchResponse(BaseModel):
    """
    Represents one semantic symptom match.
    """

    input: str
    matched: str
    score: float


class PredictResponse(BaseModel):
    """
    Response returned by the prediction API.
    """

    disease: str = Field(
        ...,
        example="Migraine",
    )

    matched_symptoms: List[SymptomMatchResponse]