from app.ml.predictor import DiseasePredictor
from app.nlp.parser import SymptomParser

from app.schema.internal import PredictionResult


class PredictionService:
    """
    Coordinates the complete prediction pipeline.
    """

    def __init__(self):

        self.parser = SymptomParser()
        self.predictor = DiseasePredictor()

    def predict(self, symptoms: str) -> PredictionResult:

        parser_result = self.parser.parse(
            symptoms
        )

        disease = self.predictor.predict(
            parser_result.feature_vector
        )

        return PredictionResult(
            disease=disease,
            matched_symptoms=parser_result.matches,
        )