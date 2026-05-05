from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.diagnose import (
    router as diagnose_router
)

from app.routes.health import (
    router as health_router
)

from app.routes.history import (
    router as history_router
)

from app.routes.chat import (
    router as chat_router
)

app = FastAPI(
    title="AutoDiag Pro API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(
    diagnose_router,
    prefix="/api"
)

app.include_router(
    health_router,
    prefix="/api"
)

app.include_router(
    history_router,
    prefix="/api"
)

app.include_router(
    chat_router,
    prefix="/api"
)

@app.get("/")
async def root():

    return {
        "message": "AutoDiag Pro API running"
    }
    
from app.database.connection import engine, Base


@app.on_event("startup")
async def startup():

    async with engine.begin() as conn:
        await conn.run_sync(
            Base.metadata.create_all
        )