import os
import sys
import json
import asyncio
from pathlib import Path

# Add backend root directory to sys.path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from dotenv import load_dotenv
load_dotenv(backend_dir / ".env")

from app.services.prediction_service import PredictionService

TEST_CASES = [
    {
        "category": "Infectious / Vector-borne",
        "symptoms": "high fever, shivering chills, sweating, muscle aches, fatigue"
    },
    {
        "category": "Respiratory",
        "symptoms": "persistent dry cough, shortness of breath, chest tightness, low fever"
    },
    {
        "category": "Gastrointestinal",
        "symptoms": "severe abdominal pain, nausea, vomiting, yellowing of eyes, dark urine"
    },
    {
        "category": "Dermatological / Allergic",
        "symptoms": "red itchy skin rash, swelling of face, hives, skin flaking"
    },
    {
        "category": "Neurological",
        "symptoms": "throbbing headache on one side, sensitivity to light, nausea, dizziness"
    }
]

async def run_suite():
    print("=" * 80)
    print(" MediVerse Dual-AI Ensemble Test Suite (Groq LPU + XGBoost ML)")
    print("=" * 80)
    
    service = PredictionService()

    for idx, case in enumerate(TEST_CASES, 1):
        print(f"\n[{idx}] Category  : {case['category']}")
        print(f"    Symptoms  : '{case['symptoms']}'")
        print("-" * 80)

        res = await service.predict(case['symptoms'])

        print(f"  {'Rank':<4} | {'Disease':<32} | {'Prob':<8} | {'Ensemble Source'}")
        print("  " + "-" * 76)

        for rank, item in enumerate(res["predictions"][:4], 1):
            disease = item["disease"][:32]
            prob = f"{item['probability']}%"
            source = item["ensemble_source"]
            print(f"  {rank:<4} | {disease:<32} | {prob:<8} | {source}")

        if res["matched_symptoms"]:
            matched_str = ", ".join([f"{m.input}->{m.matched} ({m.score:.2f})" for m in res["matched_symptoms"][:3]])
            print(f"\n  Matched NLP Symptoms: {matched_str}")
        print()

if __name__ == "__main__":
    asyncio.run(run_suite())
