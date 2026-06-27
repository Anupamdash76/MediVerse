from dataclasses import dataclass
from typing import List

from app.schema.parser import SymptomMatch


@dataclass
class PredictionResult:
    """
    Final disease prediction returned by PredictionService.
    """

    disease: str

    confidence: float

    matched_symptoms: List[SymptomMatch]