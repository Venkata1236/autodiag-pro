from fastapi import APIRouter


router = APIRouter()


@router.get("/history")
async def get_history():

    return {
        "message": (
            "Diagnosis history endpoint coming soon"
        ),
        "data": []
    }