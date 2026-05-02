from typing import List, Optional, TypedDict


class DiagnosisState(TypedDict):
    # Incoming Request Data
    fault_codes: List[str]

    symptoms: str

    vehicle_make: str

    vehicle_model: str

    vehicle_year: int

    mileage_km: Optional[int]

    # Retrieval Layer
    retrieved_records: List[dict]

    # Root Cause Analysis
    root_cause: str

    root_cause_confidence: str

    reasoning: str

    safety_warning: Optional[str]

    # Repair Planning
    fix_sequence: List[dict]

    # Parts + Pricing
    parts_list: List[dict]

    estimated_cost_inr: dict

    severity_score: int

    # Final Summary
    summary: str