from app.data.disease_info import DISEASE_INFO


class DiseaseRepository:

    @staticmethod
    def get(disease: str):
        return DISEASE_INFO.get(
            disease,
            {
                "summary": "Information unavailable.",

                "recommended_medicines": [],

                "precautions": [],

                "doctor_speciality": "General Physician",

                "severity": "Unknown",

                "disclaimer":
                    "This AI prediction is informational only."
            },
        )