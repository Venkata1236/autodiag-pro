from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.models import (
    DiagnosisRecord
)


async def create_diagnosis(
    db: AsyncSession,
    diagnosis_data: dict
):

    diagnosis = DiagnosisRecord(
        **diagnosis_data
    )

    db.add(diagnosis)

    await db.commit()

    await db.refresh(diagnosis)

    return diagnosis


async def get_all_diagnoses(
    db: AsyncSession
):

    result = await db.execute(
        select(DiagnosisRecord)
        .order_by(
            DiagnosisRecord.created_at.desc()
        )
    )

    return result.scalars().all()