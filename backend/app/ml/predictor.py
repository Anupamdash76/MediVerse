from app.nlp.utils import load_artifact


class DiseasePredictor:
    """
    Handles disease prediction using the trained XGBoost model.
    """

    def __init__(self):

        self.model = load_artifact(
            "xgb_model.pkl"
        )

        self.encoder = load_artifact(
            "label_encoder.pkl"
        )

    def predict(self, feature_vector):

        prediction = self.model.predict(
            feature_vector
        )

        disease = self.encoder.inverse_transform(
            prediction
        )[0]

        return disease