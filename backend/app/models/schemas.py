from typing import List, Optional

from pydantic import BaseModel, Field


class DiagnoseRequest(BaseModel):
    fault_codes: List[str] = Field(
        ...,
        min_length=1,
        max_length=10,
        description="List of OBD-II fault codes"
    )

    symptoms: str = Field(
        ...,
        min_length=5,
        description="Vehicle symptoms described by user"
    )

    vehicle_make: str

    vehicle_model: str

    vehicle_year: int = Field(
        ...,
        ge=1995,
        le=2026
    )

    mileage_km: Optional[int] = Field(
        default=None,
        ge=0
    )


class FixStep(BaseModel):
    step: int

    action: str

    tool_needed: str

    difficulty: str

    estimated_time_minutes: int


class PartItem(BaseModel):
    part: str

    oem_price_inr: str

    aftermarket_price_inr: str

    availability: str


class EstimatedCost(BaseModel):
    min: int

    max: int


class DiagnosisResponse(BaseModel):
    diagnosis_id: str

    vehicle: str

    fault_codes_analyzed: List[str]

    root_cause: str

    root_cause_confidence: str

    safety_warning: Optional[str]

    severity_score: int

    fix_sequence: List[FixStep]

    parts_list: List[PartItem]

    estimated_cost_inr: EstimatedCost

    summary: str

    processing_time_seconds: float