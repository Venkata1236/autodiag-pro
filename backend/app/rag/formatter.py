def format_dtc_document(code_data: dict) -> str:
    """
    Convert structured DTC JSON into embedding-friendly text.
    """

    possible_causes = ", ".join(
        code_data.get("possible_causes", [])
    )

    symptoms = ", ".join(
        code_data.get("symptoms", [])
    )

    diagnostic_steps = ", ".join(
        code_data.get("diagnostic_steps", [])
    )

    fix_sequence = ", ".join(
        code_data.get("fix_sequence", [])
    )

    related_codes = ", ".join(
        code_data.get("related_codes", [])
    )

    return f"""
    DTC Code: {code_data.get("code")}

    Category: {code_data.get("category")}

    System: {code_data.get("system")}

    Title: {code_data.get("title")}

    Description:
    {code_data.get("description")}

    Possible Causes:
    {possible_causes}

    Symptoms:
    {symptoms}

    Diagnostic Steps:
    {diagnostic_steps}

    Recommended Fix Sequence:
    {fix_sequence}

    Related Codes:
    {related_codes}
    """