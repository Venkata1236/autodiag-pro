import time
import uuid

from fastapi import APIRouter
from loguru import logger

from app.graph.pipeline import diagnosis_pipeline
from app.models.schemas import (
    DiagnoseRequest,
    DiagnosisResponse
)

router = APIRouter()


@router.post(
    "/diagnose",
    response_model=DiagnosisResponse
)
async def diagnose_vehicle(
    request: DiagnoseRequest
):

    logger.info(
        "Received diagnosis request"
    )

    start_time = time.time()

    initial_state = {
        "fault_codes": request.fault_codes,
        "symptoms": request.symptoms,
        "vehicle_make": request.vehicle_make,
        "vehicle_model": request.vehicle_model,
        "vehicle_year": request.vehicle_year,
        "mileage_km": request.mileage_km
    }

    result = diagnosis_pipeline.invoke(
        initial_state
    )

    processing_time = round(
        time.time() - start_time,
        2
    )

    logger.info(
        f"Diagnosis completed in "
        f"{processing_time} seconds"
    )

    return DiagnosisResponse(
        diagnosis_id=str(uuid.uuid4()),
        vehicle=(
            f"{request.vehicle_year} "
            f"{request.vehicle_make} "
            f"{request.vehicle_model}"
        ),
        fault_codes_analyzed=request.fault_codes,
        root_cause=result["root_cause"],
        root_cause_confidence=result[
            "root_cause_confidence"
        ],
        safety_warning=result.get(
            "safety_warning"
        ),
        severity_score=result[
            "severity_score"
        ],
        fix_sequence=result[
            "fix_sequence"
        ],
        parts_list=result[
            "parts_list"
        ],
        estimated_cost_inr=result[
            "estimated_cost_inr"
        ],
        summary=result["summary"],
        processing_time_seconds=processing_time
    )