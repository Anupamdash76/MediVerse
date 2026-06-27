from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
    """
    Request body for disease prediction.
    """

    symptoms: str = Field(
        ...,
        min_length=1,
        example="headache, vomiting, fever",
        description="Comma-separated symptoms or free-text symptom description."
    )