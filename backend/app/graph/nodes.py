import json

from openai import OpenAI

from app.core.config import settings
from app.core.logger import logger
from app.graph.prompts import (
    FIX_SEQUENCE_PROMPT,
    PARTS_ESTIMATE_PROMPT,
    ROOT_CAUSE_PROMPT
)
from app.graph.state import DiagnosisState
from app.rag.retriever import OBDRetriever
from app.core.constants import SAFETY_CRITICAL_SYSTEMS
from backend.app.graph import state



client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)

retriever = OBDRetriever()

def detect_safety_issue(
    retrieved_records: list[dict]
) -> str | None:
    """
    Detect safety-critical diagnostic conditions.
    """

    for record in retrieved_records:
        metadata = record.get("metadata", {})

        system = metadata.get(
            "system",
            ""
        ).upper()

        if system in [
            critical.upper()
            for critical in SAFETY_CRITICAL_SYSTEMS
        ]:
            return (
                "Safety-critical issue detected. "
                "Vehicle should be inspected immediately."
            )

    return None

def fault_lookup_node(
    state: DiagnosisState
) -> DiagnosisState:
    """
    Retrieve relevant DTC records from ChromaDB.
    """

    logger.info(
        "Running FaultLookupNode"
    )

    retrieved_records = retriever.retrieve(
        fault_codes=state["fault_codes"],
        symptoms=state["symptoms"]
    )

    state["retrieved_records"] = retrieved_records

    return state


def root_cause_node(
    state: DiagnosisState
) -> DiagnosisState:
    """
    Analyze combined fault codes and determine
    most likely root cause.
    """

    logger.info(
        "Running RootCauseNode"
    )

    user_prompt = f"""
    Fault Codes:
    {state['fault_codes']}

    Vehicle:
    {state['vehicle_year']}
    {state['vehicle_make']}
    {state['vehicle_model']}

    Mileage:
    {state['mileage_km']}

    Symptoms:
    {state['symptoms']}

    Retrieved Records:
    {json.dumps(state['retrieved_records'], indent=2)}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": ROOT_CAUSE_PROMPT
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )

    parsed_response = json.loads(
        response.choices[0].message.content
    )

    state["root_cause"] = parsed_response.get(
        "root_cause",
        ""
    )

    state["root_cause_confidence"] = parsed_response.get(
        "root_cause_confidence",
        "LOW"
    )

    state["reasoning"] = parsed_response.get(
        "reasoning",
        ""
    )

    llm_warning = parsed_response.get(
    "safety_warning"
    )

    deterministic_warning = detect_safety_issue(
        state["retrieved_records"]
    )

    state["safety_warning"] = (
        deterministic_warning
        or llm_warning
    )

    return state


def fix_sequence_node(
    state: DiagnosisState
) -> DiagnosisState:
    """
    Generate prioritized repair workflow.
    """

    logger.info(
        "Running FixSequenceNode"
    )

    user_prompt = f"""
    Root Cause:
    {state['root_cause']}

    Retrieved Records:
    {json.dumps(state['retrieved_records'], indent=2)}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": FIX_SEQUENCE_PROMPT
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )

    parsed_response = json.loads(
        response.choices[0].message.content
    )

    state["fix_sequence"] = parsed_response.get(
        "fix_sequence",
        []
    )

    return state


def parts_estimate_node(
    state: DiagnosisState
) -> DiagnosisState:
    """
    Generate parts list, cost estimation,
    severity score, and summary.
    """

    logger.info(
        "Running PartsEstimateNode"
    )

    user_prompt = f"""
    Vehicle:
    {state['vehicle_year']}
    {state['vehicle_make']}
    {state['vehicle_model']}

    Root Cause:
    {state['root_cause']}

    Fix Sequence:
    {json.dumps(state['fix_sequence'], indent=2)}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": PARTS_ESTIMATE_PROMPT
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )

    parsed_response = json.loads(
        response.choices[0].message.content
    )

    state["parts_list"] = parsed_response.get(
        "parts_list",
        []
    )

    state["estimated_cost_inr"] = parsed_response.get(
        "estimated_cost_inr",
        {}
    )

    state["severity_score"] = parsed_response.get(
        "severity_score",
        1
    )

    state["summary"] = parsed_response.get(
        "summary",
        ""
    )

    return state