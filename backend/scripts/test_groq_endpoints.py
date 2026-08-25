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

from app.services.llm_ensemble import get_grok_differential_diagnosis, ensemble_predictions
from app.services.prediction_service import PredictionService

async def test_groq_direct_endpoint():
    print("=" * 60)
    print("1. Direct Groq API Endpoint Test")
    print("=" * 60)
    
    groq_key = os.getenv("GROQ_API_KEY") or os.getenv("XAI_API_KEY")
    print(f"API Key present: {bool(groq_key)}")
    if groq_key:
        masked_key = groq_key[:8] + "..." + groq_key[-4:]
        print(f"Key preview   : {masked_key}")
    
    symptoms = "high fever, severe headache, joint pain, skin rash"
    print(f"Test Input    : '{symptoms}'")
    print("\nSending request to Groq / LLM Ensemble service...")
    
    results, model_source = await get_grok_differential_diagnosis(symptoms)
    
    print(f"\nModel Source Returned : {model_source}")
    print(f"Differential Diagnoses ({len(results)} items):")
    print(json.dumps(results, indent=2))
    return bool(results)

async def test_prediction_pipeline():
    print("\n" + "=" * 60)
    print("2. Full MediVerse Prediction Pipeline Test (XGBoost + Groq)")
    print("=" * 60)
    
    service = PredictionService()
    symptoms = "high fever, severe headache, joint pain, skin rash"
    
    res = await service.predict(symptoms)
    
    print("\nPredictions Output:")
    for idx, item in enumerate(res["predictions"], 1):
        print(f"\n[{idx}] Disease        : {item['disease']}")
        print(f"    Probability    : {item['probability']}%")
        print(f"    Ensemble Source: {item['ensemble_source']}")
        print(f"    Rec. Tests     : {item['recommended_tests']}")
        print(f"    Doctor Spec.   : {item.get('doctor_speciality', 'N/A')}")

async def main():
    await test_groq_direct_endpoint()
    await test_prediction_pipeline()

if __name__ == "__main__":
    asyncio.run(main())
