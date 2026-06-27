import numpy as np
import pandas as pd

from app.nlp.utils import load_artifact


class DiseasePredictor:
    """
    Handles disease prediction using
    the trained XGBoost model.
    """

    def __init__(self):

        self.model = load_artifact(
            "xgb_model.pkl"
        )

        self.encoder = load_artifact(
            "label_encoder.pkl"
        )

    def predict(
        self,
        feature_vector: pd.DataFrame,
    ) -> tuple[str, float]:

        prediction = self.model.predict(
            feature_vector
        )

        disease = self.encoder.inverse_transform(
            prediction
        )[0]

        probabilities = self.model.predict_proba(
            feature_vector
        )[0]

        confidence = float(
            np.max(probabilities) * 100
        )

        return (
            disease,
            round(confidence, 2),
        )