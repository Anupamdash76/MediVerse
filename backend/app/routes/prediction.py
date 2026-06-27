from fastapi import APIRouter, HTTPException

from app.schema.api import (
    PredictRequest,
    PredictResponse,
    SymptomMatchResponse,
)

from app.services.prediction_service import PredictionService


router = APIRouter(
    prefix="/predict",
    tags=["Prediction"],
)

prediction_service = PredictionService()


@router.post(
    "",
    response_model=PredictResponse,
)
def predict(request: PredictRequest):

    try:

        result = prediction_service.predict(
            request.symptoms
        )

        matches = [
            SymptomMatchResponse(
                input=match.input,
                matched=match.matched,
                score=match.score,
            )
            for match in result.matched_symptoms
        ]

        return PredictResponse(
            disease=result.disease,
            matched_symptoms=matches,
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )