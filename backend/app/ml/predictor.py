import json
import joblib
import numpy as np

from pathlib import Path
from xgboost import XGBClassifier


BASE_DIR = Path(__file__).resolve().parent.parent.parent

MODEL_PATH = BASE_DIR / "models" / "xgboost.json"
ENCODER_PATH = BASE_DIR / "artifacts" / "label_encoder.pkl"
TESTS_PATH = BASE_DIR / "app" / "data" / "diagnostic_tests.json"


class DiseasePredictor:
    """
    Performs disease prediction from a prepared feature vector.
    """

    def __init__(self):

        self.model = XGBClassifier()
        self.model.load_model(str(MODEL_PATH))

        self.encoder = joblib.load(
            ENCODER_PATH
        )

        if TESTS_PATH.exists():
            with open(TESTS_PATH, "r", encoding="utf-8") as f:
                self.diagnostic_data = json.load(f)
        else:
            self.diagnostic_data = {"default": ["Complete Blood Count (CBC)"], "categories": {}, "disease_mapping": {}}

    def get_recommended_tests(self, disease_name: str):
        mapping = self.diagnostic_data.get("disease_mapping", {})
        categories = self.diagnostic_data.get("categories", {})
        default_tests = self.diagnostic_data.get("default", ["Complete Blood Count (CBC)", "Vital Signs Baseline Panel"])

        category_key = mapping.get(disease_name)
        if category_key and category_key in categories:
            return categories[category_key]
        
        # Comprehensive keyword-based dynamic fallback across 304 disease categories
        d_lower = disease_name.lower()
        if any(k in d_lower for k in ["fever", "infect", "pox", "measles", "malaria", "dengue", "typhoid", "abscess", "sepsis", "otitis"]):
            return categories.get("infectious_fever", default_tests)
        elif any(k in d_lower for k in ["lung", "cough", "bronch", "pneumon", "tuberculosis", "cold", "flu", "respirat", "asthma", "pharynx"]):
            return categories.get("respiratory", default_tests)
        elif any(k in d_lower for k in ["heart", "cardi", "artery", "aortic", "valve", "hypertension", "angina", "tietze"]):
            return categories.get("cardiovascular", default_tests)
        elif any(k in d_lower for k in ["diabet", "thyroid", "ketoacidosis", "metabolic", "goiter"]):
            return categories.get("metabolic_endocrine", default_tests)
        elif any(k in d_lower for k in ["gastro", "liver", "hepat", "jaundice", "ulcer", "stomach", "gerd", "bowel", "pancreat"]):
            return categories.get("gastrointestinal_liver", default_tests)
        elif any(k in d_lower for k in ["skin", "derma", "rash", "acne", "psoriasis", "fungal", "eczema"]):
            return categories.get("dermatological", default_tests)
        elif any(k in d_lower for k in ["brain", "neuro", "migraine", "paralysis", "stroke", "seizure", "headache"]):
            return categories.get("neurological", default_tests)
        elif any(k in d_lower for k in ["arthr", "bone", "joint", "spondyl", "fracture", "muscle", "gout"]):
            return categories.get("musculoskeletal", default_tests)
        elif any(k in d_lower for k in ["urethr", "kidney", "renal", "urinary", "bladder", "vaginal", "leukorrhea"]):
            return ["Urine Routine & Culture", "Complete Blood Count (CBC)", "Renal Function Test (KFT)"]
        
        return default_tests

    def predict(
        self,
        feature_vector,
        top_k=3,
        min_probability=2.0,
    ):
        # 1. Guard against empty / all-zero symptom vectors
        if (feature_vector == 0).all().all():
            return {
                "predictions": [],
                "unknown_symptoms": [
                    "No recognized symptoms matched. Please describe your symptoms clearly (e.g., fever, cough, headache)."
                ],
            }

        probabilities = self.model.predict_proba(
            feature_vector
        )[0]

        top_indices = np.argsort(
            probabilities
        )[::-1]

        predictions = []

        for idx in top_indices:
            prob_percent = round(float(probabilities[idx] * 100), 2)
            
            # Apply minimum confidence threshold to filter uncalibrated tree noise
            if prob_percent < min_probability and len(predictions) > 0:
                continue

            disease_name = self.encoder.inverse_transform([idx])[0]
            recommended_tests = self.get_recommended_tests(disease_name)

            predictions.append(
                {
                    "disease": disease_name,
                    "probability": prob_percent,
                    "recommended_tests": recommended_tests,
                }
            )

            if len(predictions) >= top_k:
                break

        return {
            "predictions": predictions,
            "unknown_symptoms": [],
        }