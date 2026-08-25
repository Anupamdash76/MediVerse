from typing import List

from pydantic import BaseModel


class SymptomMatchResponse(BaseModel):
    input: str
    matched: str
    score: float


class PredictionItemResponse(BaseModel):
    disease: str

    summary: str

    recommended_medicines: List[str]

    precautions: List[str]

    doctor_speciality: str

    severity: str

    disclaimer: str

    recommended_tests: List[str] = []

    probability: float = 0.0

    ensemble_source: str = "XGBoost Machine Learning"


class PredictResponse(BaseModel):

    predictions: List[PredictionItemResponse]

    matched_symptoms: List[SymptomMatchResponse]

    unknown_symptoms: List[str]