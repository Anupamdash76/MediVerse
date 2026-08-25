import json

from app.config.paths import APP_DIR


class DiseaseRepository:
    """
    Loads disease information once and serves it
    throughout the application's lifetime.
    """

    def __init__(self):

        path = APP_DIR / "data" / "diseases.json"

       

        with open(
            path,
            "r",
            encoding="utf-8",
        ) as file:

            self.data = json.load(file)

        

    def get(self, disease: str):
        """
        Returns disease information from the knowledge base, supporting fuzzy lookup.
        """
        key = disease.strip().lower()

        if key in self.data:
            return self.data[key]

        # Fuzzy / Substring lookup
        for d_key, info in self.data.items():
            if key == d_key or key in d_key or d_key in key:
                return info

        return {
            "summary": f"Clinical assessment and management plan recommended for {disease}.",
            "recommended_medicines": ["Consult a medical professional for prescribed therapeutic regimen."],
            "precautions": ["Monitor vital signs", "Rest and adequate hydration", "Seek urgent care if symptoms deteriorate"],
            "doctor_speciality": "General Physician",
            "severity": "Moderate",
            "disclaimer": (
                "This AI prediction is informational only "
                "and should not replace professional medical advice."
            ),
        }