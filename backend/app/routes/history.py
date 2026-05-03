from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from app.database.connection import (
    get_db
)

from app.database.crud import (
    get_all_diagnoses
)


router = APIRouter()


@router.get("/history")
async def get_history(
    db: AsyncSession = Depends(get_db)
):

    diagnoses = await get_all_diagnoses(
        db
    )

    history = []

    for item in diagnoses:

        history.append({
            "diagnosis_id": item.id,

            "vehicle": (
                f"{item.vehicle_year} "
                f"{item.vehicle_make} "
                f"{item.vehicle_model}"
            ),

            "fault_codes_analyzed":
                item.fault_codes,

            "root_cause":
                item.root_cause,

            "severity_score":
                item.severity_score,

            "estimated_cost_inr":
                item.estimated_cost
        })

    return {
        "message":
            "Diagnosis history retrieved",
        "data": history
    }