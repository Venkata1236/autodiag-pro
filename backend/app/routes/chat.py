from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from openai import OpenAI

from app.core.config import settings

from pydantic import BaseModel


router = APIRouter()

client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)


class ChatRequest(BaseModel):

    question: str

    diagnosis_summary: str


@router.post("/chat")
async def mechanic_chat(
    request: ChatRequest
):

    system_prompt = f"""
    You are an expert automotive mechanic AI.

    Use the diagnosis context below
    to answer the user professionally.

    Diagnosis Context:
    {request.diagnosis_summary}
    """


    async def stream_response():

        stream = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": request.question
                }
            ],
            stream=True
        )

        for chunk in stream:

            content = (
                chunk
                .choices[0]
                .delta
                .content
            )

            if content:
                yield content


    return StreamingResponse(
        stream_response(),
        media_type="text/plain"
    )