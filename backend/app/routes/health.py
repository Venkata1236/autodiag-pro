from datetime import datetime

from fastapi import APIRouter

from app.core.config import settings


router = APIRouter()


@router.get("/health")
async def health_check():

    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "timestamp": datetime.utcnow().isoformat(),
        "service": "AutoDiag Pro API"
    }