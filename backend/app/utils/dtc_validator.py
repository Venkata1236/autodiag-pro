import re

from fastapi import HTTPException

from app.core.constants import DTC_CODE_PATTERN
from app.core.config import settings


def normalize_fault_codes(fault_codes: list[str]) -> list[str]:
    """
    Normalize fault codes to uppercase and remove duplicates.
    """

    normalized_codes = []

    for code in fault_codes:
        cleaned_code = code.strip().upper()

        if cleaned_code not in normalized_codes:
            normalized_codes.append(cleaned_code)

    return normalized_codes


def validate_fault_codes(fault_codes: list[str]) -> list[str]:
    """
    Validate OBD-II diagnostic trouble codes.
    """

    normalized_codes = normalize_fault_codes(fault_codes)

    if not normalized_codes:
        raise HTTPException(
            status_code=400,
            detail="At least one fault code is required."
        )

    if len(normalized_codes) > settings.MAX_CODES_PER_REQUEST:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Maximum {settings.MAX_CODES_PER_REQUEST} "
                f"fault codes allowed per request."
            )
        )

    invalid_codes = [
        code
        for code in normalized_codes
        if not re.match(DTC_CODE_PATTERN, code)
    ]

    if invalid_codes:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid DTC codes: {', '.join(invalid_codes)}"
        )

    return normalized_codes