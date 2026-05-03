import time
import uuid

from fastapi import APIRouter
from fastapi import Depends

from loguru import logger

from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from app.database.connection import (
    get_db
)

from app.database.crud import (
    create_diagnosis
)

from app.graph.pipeline import (
    diagnosis_pipeline
)

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
    request: DiagnoseRequest,
    db: AsyncSession = Depends(get_db)
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

    diagnosis_id = str(uuid.uuid4())

    response_payload = {
        "diagnosis_id": diagnosis_id,
        "vehicle": (
            f"{request.vehicle_year} "
            f"{request.vehicle_make} "
            f"{request.vehicle_model}"
        ),
        "fault_codes_analyzed":
            request.fault_codes,
        "root_cause":
            result["root_cause"],
        "root_cause_confidence":
            result["root_cause_confidence"],
        "safety_warning":
            result.get("safety_warning"),
        "severity_score":
            result["severity_score"],
        "fix_sequence":
            result["fix_sequence"],
        "parts_list":
            result["parts_list"],
        "estimated_cost_inr":
            result["estimated_cost_inr"],
        "summary":
            result["summary"],
        "processing_time_seconds":
            processing_time
    }

    database_payload = {
        "id": diagnosis_id,
        "vehicle_make":
            request.vehicle_make,
        "vehicle_model":
            request.vehicle_model,
        "vehicle_year":
            request.vehicle_year,
        "mileage_km":
            request.mileage_km,
        "fault_codes":
            request.fault_codes,
        "symptoms":
            request.symptoms,
        "root_cause":
            result["root_cause"],
        "confidence":
            result[
                "root_cause_confidence"
            ],
        "severity_score":
            result["severity_score"],
        "safety_warning":
            result.get(
                "safety_warning"
            ),
        "fix_sequence":
            result["fix_sequence"],
        "parts_list":
            result["parts_list"],
        "estimated_cost":
            result[
                "estimated_cost_inr"
            ],
        "summary":
            result["summary"]
    }

    try:

        await create_diagnosis(
            db=db,
            diagnosis_data=database_payload
        )

        logger.info(
            f"Diagnosis saved: "
            f"{diagnosis_id}"
        )

    except Exception as error:

        logger.error(
            f"Database save failed: "
            f"{error}"
        )

    return DiagnosisResponse(
        **response_payload
    )