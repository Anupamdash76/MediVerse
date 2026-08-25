import os
import json
import re
import logging
import httpx
from typing import List, Dict, Any, Tuple

logger = logging.getLogger(__name__)

async def get_grok_differential_diagnosis(symptom_text: str) -> Tuple[List[Dict[str, Any]], str]:
    """
    Queries Groq Cloud API, Google Gemini API, or xAI Grok API for top 3 differential diagnoses.
    Returns tuple: (list_of_dicts, model_source_name_or_status)
    """
    gemini_key = (os.getenv("GEMINI_API_KEY") or os.getenv("gemini_api_key") or "").strip()
    groq_key = (os.getenv("GROQ_API_KEY") or os.getenv("groq_api_key") or "").strip()
    xai_key = (os.getenv("XAI_API_KEY") or os.getenv("xai_api_key") or "").strip()

    # Auto-detect if XAI_API_KEY is actually a Groq key (starts with 'gsk_')
    if not groq_key and xai_key.startswith("gsk_"):
        groq_key = xai_key
        xai_key = ""
    elif xai_key.startswith("gsk_"):
        xai_key = ""

    if not gemini_key and not groq_key and not xai_key:
        return [], "XGBoost ML (No LLM API Key in environment)"

    prompt = f"""You are an expert clinical diagnostic AI assistant.
Analyze the following patient symptoms and output TOP 3 differential diagnoses in JSON format.
Symptoms: "{symptom_text}"

Return ONLY a valid JSON array of objects with keys "disease" and "score" (where score is estimated probability between 0 and 100).
Example format:
[
  {{"disease": "Pneumonia", "score": 75}},
  {{"disease": "Bronchitis", "score": 15}},
  {{"disease": "Common Cold", "score": 10}}
]
"""

    async with httpx.AsyncClient(timeout=10.0) as client:

        # 1. TRY GROQ API FIRST (Fast LPU Inference)
        if groq_key and len(groq_key) > 5:
            groq_models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768", "gemma2-9b-it"]
            for g_model in groq_models:
                try:
                    url = "https://api.groq.com/openai/v1/chat/completions"
                    headers = {
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {groq_key}"
                    }
                    payload = {
                        "model": g_model,
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": 0.2
                    }
                    res = await client.post(url, json=payload, headers=headers)
                    if res.status_code == 200:
                        content = res.json()["choices"][0]["message"]["content"]
                        match = re.search(r'\[.*\]', content, re.DOTALL)
                        if match:
                            results = json.loads(match.group(0))
                            return results, f"Groq LPU ({g_model})"
                    elif res.status_code == 429:
                        logger.warning(f"Groq API Quota Exceeded (429) on model {g_model}")
                        continue
                    else:
                        logger.warning(f"Groq API endpoint '{g_model}' Status {res.status_code}: {res.text}")
                except Exception as e:
                    logger.warning(f"Groq exception for '{g_model}': {e}")

        # 2. TRY GEMINI API NEXT
        if gemini_key and len(gemini_key) > 5:
            gemini_models = ["gemini-2.0-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro"]
            
            for model_name in gemini_models:
                try:
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={gemini_key}"
                    headers = {"Content-Type": "application/json"}
                    payload = {
                        "contents": [{
                            "parts": [{"text": prompt}]
                        }]
                    }
                    res = await client.post(url, json=payload, headers=headers)
                    if res.status_code == 200:
                        data = res.json()
                        content = data["candidates"][0]["content"]["parts"][0]["text"]
                        match = re.search(r'\[.*\]', content, re.DOTALL)
                        if match:
                            results = json.loads(match.group(0))
                            return results, f"Google Gemini ({model_name})"
                    elif res.status_code == 429:
                        logger.warning(f"Gemini API Quota Exceeded (429) on model {model_name}")
                        continue
                    else:
                        logger.warning(f"Gemini API endpoint '{model_name}' Status {res.status_code}: {res.text}")
                except Exception as e:
                    logger.warning(f"Gemini exception for '{model_name}': {e}")

        # 3. TRY xAI GROK API NEXT
        if xai_key and len(xai_key) > 5:
            grok_models = ["grok-2-latest", "grok-beta"]
            for g_model in grok_models:
                try:
                    url = "https://api.x.ai/v1/chat/completions"
                    headers = {
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {xai_key}"
                    }
                    payload = {
                        "model": g_model,
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": 0.2
                    }
                    res = await client.post(url, json=payload, headers=headers)
                    if res.status_code == 200:
                        content = res.json()["choices"][0]["message"]["content"]
                        match = re.search(r'\[.*\]', content, re.DOTALL)
                        if match:
                            results = json.loads(match.group(0))
                            return results, f"xAI Grok ({g_model})"
                    elif res.status_code == 429:
                        logger.warning(f"Grok API Quota Exceeded (429) on model {g_model}")
                        continue
                    elif res.status_code == 400:
                        logger.warning(f"Grok API HTTP 400 on model {g_model}")
                        continue
                except Exception as e:
                    logger.warning(f"Grok exception for '{g_model}': {e}")

    return [], "XGBoost ML (LLM Quota Exceeded or Unavailable)"

def ensemble_predictions(
    xgb_predictions: List[Dict[str, Any]],
    llm_predictions: List[Dict[str, Any]],
    model_source: str = "LLM"
) -> List[Dict[str, Any]]:
    """
    Hybrid consensus ranker dynamically merging XGBoost ML and LLM (Groq) predictions.
    Weighting Equation: P_Hybrid = 0.65 * P_XGB + 0.35 * S_LLM
    """
    if not llm_predictions:
        for item in xgb_predictions:
            item["ensemble_source"] = model_source
        return xgb_predictions

    # Key -> dict of candidate data
    candidates = {}

    # 1. Insert XGBoost candidate predictions (weighted at 65%)
    for item in xgb_predictions:
        disease_name = item["disease"]
        norm_key = disease_name.strip().lower()
        candidates[norm_key] = {
            "disease": disease_name,
            "prob": 0.65 * float(item.get("probability", 0)),
            "source": "XGBoost Machine Learning",
            "recommended_tests": item.get("recommended_tests", []),
            "raw": item.copy()
        }

    # Helper function for matching LLM names against XGBoost keys
    def find_matched_key(llm_name: str) -> str:
        clean_llm = re.sub(r'[^\w\s]', '', llm_name.lower()).strip()
        for k, v in candidates.items():
            clean_k = re.sub(r'[^\w\s]', '', k).strip()
            if clean_llm == clean_k or clean_llm in clean_k or clean_k in clean_llm:
                return k
            # Word token overlap check
            llm_tokens = set(clean_llm.split())
            k_tokens = set(clean_k.split())
            if llm_tokens and k_tokens and (llm_tokens.issubset(k_tokens) or k_tokens.issubset(llm_tokens)):
                return k
        return None

    # 2. Process LLM (Groq) predictions (weighted at 35%)
    for item in llm_predictions:
        llm_disease = item.get("disease", "").strip()
        if not llm_disease:
            continue
        
        llm_score = float(item.get("score", 0))
        matched_key = find_matched_key(llm_disease)

        if matched_key:
            candidates[matched_key]["prob"] += 0.35 * llm_score
            candidates[matched_key]["source"] = f"Dual-AI Hybrid Ensemble ({model_source} + XGBoost ML)"
        else:
            # Add Groq diagnosis as a new valid candidate
            norm_key = llm_disease.lower()
            candidates[norm_key] = {
                "disease": llm_disease,
                "prob": 0.35 * llm_score,
                "source": f"{model_source} Clinical AI",
                "recommended_tests": ["Complete Blood Count (CBC)", "Vital Signs Baseline Panel"],
                "raw": {
                    "disease": llm_disease,
                    "probability": 0.35 * llm_score,
                    "recommended_tests": ["Complete Blood Count (CBC)", "Vital Signs Baseline Panel"]
                }
            }

    # 3. Sort by hybrid probability score descending and slice top 3
    sorted_candidates = sorted(candidates.values(), key=lambda x: x["prob"], reverse=True)[:3]

    result = []
    for entry in sorted_candidates:
        item = entry["raw"].copy()
        item["disease"] = entry["disease"]
        item["probability"] = round(entry["prob"], 2)
        item["ensemble_source"] = entry["source"]
        if "recommended_tests" in entry and entry["recommended_tests"]:
            item["recommended_tests"] = entry["recommended_tests"]
        result.append(item)

    return result[:3] if result else xgb_predictions[:3]
