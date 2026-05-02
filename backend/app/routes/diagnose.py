import time
import uuid

from fastapi import APIRouter

from app.graph.pipeline import diagnosis_pipeline
from app.graph.state import DiagnosisState
from app.models.schemas import (
    DiagnoseRequest,
    DiagnosisResponse
)
from app.utils.dtc_validator import validate_fault_codes


router = APIRouter()


@router.post(
    "/diagnose",
    response_model=DiagnosisResponse
)
async def diagnose_vehicle(
    payload: DiagnoseRequest
):
    """
    Run full AI-powered vehicle diagnosis pipeline.
    """

    start_time = time.time()

    validated_codes = validate_fault_codes(
        payload.fault_codes
    )

    initial_state: DiagnosisState = {
        "fault_codes": validated_codes,
        "symptoms": payload.symptoms,
        "vehicle_make": payload.vehicle_make,
        "vehicle_model": payload.vehicle_model,
        "vehicle_year": payload.vehicle_year,
        "mileage_km": payload.mileage_km,

        "retrieved_records": [],

        "root_cause": "",
        "root_cause_confidence": "",
        "reasoning": "",
        "safety_warning": None,

        "fix_sequence": [],

        "parts_list": [],

        "estimated_cost_inr": {},

        "severity_score": 0,

        "summary": ""
    }

    result = diagnosis_pipeline.invoke(
        initial_state
    )

    processing_time = round(
        time.time() - start_time,
        2
    )

    diagnosis_response = {
        "diagnosis_id": str(uuid.uuid4()),

        "vehicle": (
            f"{payload.vehicle_year} "
            f"{payload.vehicle_make} "
            f"{payload.vehicle_model}"
        ),

        "fault_codes_analyzed": validated_codes,

        "root_cause": result["root_cause"],

        "root_cause_confidence": result[
            "root_cause_confidence"
        ],

        "safety_warning": result[
            "safety_warning"
        ],

        "severity_score": result[
            "severity_score"
        ],

        "fix_sequence": result[
            "fix_sequence"
        ],

        "parts_list": result[
            "parts_list"
        ],

        "estimated_cost_inr": result[
            "estimated_cost_inr"
        ],

        "summary": result[
            "summary"
        ],

        "processing_time_seconds": processing_time
    }

    return diagnosis_response