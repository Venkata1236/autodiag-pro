from fastapi import FastAPI

app = FastAPI(title="AutoDiag Pro API")


@app.get("/")
def root():
    return {"status": "running"}


@app.get("/health")
def health():
    return {"healthy": True}
