import asyncio
import logging
from app.data.disease_repository import DiseaseRepository
from app.ml.predictor import DiseasePredictor
from app.nlp.parser import SymptomParser
from app.services.llm_ensemble import get_grok_differential_diagnosis, ensemble_predictions

logger = logging.getLogger(__name__)


class PredictionService:
    """
    Coordinates the complete AI prediction pipeline with statistical ML & LLM Ensemble.
    """

    def __init__(self):
        self.parser = SymptomParser()
        self.predictor = DiseasePredictor()
        self.repository = DiseaseRepository()

    async def predict(self, symptoms: str):

        parser_result = self.parser.parse(symptoms)

        prediction = self.predictor.predict(
            parser_result.feature_vector,
            top_k=3,
        )

        raw_preds = prediction["predictions"]

        # Call Grok / Gemini LLM API and ensemble results
        model_source = "XGBoost Machine Learning"
        try:
            llm_preds, model_source = await get_grok_differential_diagnosis(symptoms)
            raw_preds = ensemble_predictions(raw_preds, llm_preds, model_source)
        except Exception as e:
            logger.error(f"Ensemble execution error: {e}")

        # Enforce strict top 3 predictions limit
        raw_preds = raw_preds[:3]

        enriched_predictions = []

        for item in raw_preds:
            disease = item["disease"]
            info = self.repository.get(disease)

            enriched_predictions.append(
                {
                    "disease": disease,
                    "probability": item.get("probability", 50.0),
                    "ensemble_source": item.get("ensemble_source", model_source),
                    "recommended_tests": item.get("recommended_tests", ["Complete Blood Count (CBC)"]),
                    **info,
                }
            )

        return {
            "predictions": enriched_predictions[:3],
            "matched_symptoms": parser_result.matches,
            "unknown_symptoms": prediction["unknown_symptoms"],
        }