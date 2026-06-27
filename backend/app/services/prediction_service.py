from app.ml.predictor import DiseasePredictor
from app.nlp.parser import SymptomParser
from app.schema.prediction import PredictionResult


class PredictionService:
    """
    Coordinates the complete prediction pipeline.

    User Symptoms
            ↓
    SymptomParser
            ↓
    Feature Vector
            ↓
    DiseasePredictor
            ↓
    PredictionResult
    """

    def __init__(self):
        self.parser = SymptomParser()
        self.predictor = DiseasePredictor()

    def predict(self, symptoms: str) -> PredictionResult:

        parser_result = self.parser.parse(symptoms)

        disease, confidence = self.predictor.predict(
            parser_result.feature_vector
        )

        return PredictionResult(
            disease=disease,
            confidence=confidence,
            matched_symptoms=parser_result.matches,
        )