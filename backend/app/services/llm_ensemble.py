import os
import json
import re
import logging
from typing import List, Dict, Any, Tuple
import httpx

logger = logging.getLogger(__name__)

# List of Groq candidate models to try in order of capability & speed
GROQ_MODELS = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "llama3-70b-8192",
    "llama3-8b-8192",
    "deepseek-r1-distill-llama-70b",
]

def _build_grok_prompt(symptoms_text: str) -> str:
    return f"""You are an elite clinical AI diagnostic engine specializing in differential diagnosis.
Analyze the following patient-reported symptoms and generate a ranked list of up to 3 most likely medical conditions.

PATIENT SYMPTOMS:
"{symptoms_text}"

Return ONLY a valid JSON object matching this exact schema:
{{
  "differential_diagnosis": [
    {{
      "disease": "Exact Name of Disease 1",
      "score": 90.0,
      "recommended_tests": ["Complete Blood Count (CBC)", "Targeted Diagnostic Test 1"]
    }},
    {{
      "disease": "Exact Name of Disease 2",
      "score": 75.0,
      "recommended_tests": ["Targeted Diagnostic Test 2"]
    }},
    {{
      "disease": "Exact Name of Disease 3",
      "score": 60.0,
      "recommended_tests": ["Targeted Diagnostic Test 3"]
    }}
  ]
}}

CRITICAL INSTRUCTIONS:
- Return ONLY the JSON object. Do NOT include markdown codeblocks (no ```json).
- Provide maximum 3 diseases sorted by likelihood score (percentage between 0 and 100).
- Do not output any preamble, commentary, or postscript text.
"""

async def get_grok_differential_diagnosis(symptoms_text: str) -> Tuple[List[Dict[str, Any]], str]:
    """
    Queries Groq API with robust model fallback sequence.
    Returns (list_of_prediction_dicts, model_source_name).
    """
    api_key = os.getenv("GROQ_API_KEY", "").strip()
    if not api_key:
        logger.warning("GROQ_API_KEY missing from environment. Skipping LLM ensemble step.")
        return [], "XGBoost ML"

    prompt = _build_grok_prompt(symptoms_text)
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        for model in GROQ_MODELS:
            payload = {
                "model": model,
                "messages": [
                    {"role": "system", "content": "You are a clinical diagnostic AI. Return JSON only."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.2,
                "response_format": {"type": "json_object"}
            }

            try:
                resp = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    json=payload,
                    headers=headers
                )

                if resp.status_code == 200:
                    data = resp.json()
                    content = data["choices"][0]["message"]["content"].strip()

                    # Clean potential markdown wrapping
                    if content.startswith("```"):
                        content = re.sub(r"^```(?:json)?", "", content, flags=re.IGNORECASE)
                        content = re.sub(r"```$", "", content).strip()

                    parsed = json.loads(content)
                    items = parsed.get("differential_diagnosis", [])
                    if isinstance(items, list) and len(items) > 0:
                        logger.info(f"[GROQ LLM SUCCESS] Model '{model}' generated {len(items)} predictions.")
                        return items[:3], f"Groq AI ({model})"
                else:
                    logger.warning(f"Groq model '{model}' returned HTTP {resp.status_code}: {resp.text[:150]}")

            except Exception as e:
                logger.warning(f"Failed to query Groq model '{model}': {e}")

    logger.warning("All Groq LLM models failed or returned invalid responses. Falling back to XGBoost ML.")
    return [], "XGBoost ML"


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
        return xgb_predictions[:3]

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
