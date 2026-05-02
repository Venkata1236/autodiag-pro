from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.diagnose import router as diagnose_router


app = FastAPI(
    title="AutoDiag Pro API",
    description=(
        "AI-powered automotive diagnostic system "
        "using LangGraph and ChromaDB"
    ),
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    diagnose_router,
    prefix="/api/v1",
    tags=["Diagnosis"]
)


@app.get("/")
async def root():
    return {
        "message": "AutoDiag Pro API running"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy"
    }