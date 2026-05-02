DTC_CODE_PATTERN = r"^[PCBU][0-9]{4}$"


SUPPORTED_VEHICLE_MAKES = [
    "Maruti Suzuki",
    "Hyundai",
    "Tata",
    "Honda",
    "Toyota",
    "Ford",
    "Volkswagen",
    "Skoda",
    "Kia",
    "MG",
    "Mahindra",
    "Renault",
    "Nissan",
    "Chevrolet",
    "Other"
]


SEVERITY_LABELS = {
    1: "MINOR",
    2: "LOW",
    3: "MODERATE",
    4: "SERIOUS",
    5: "CRITICAL"
}


CONFIDENCE_LEVELS = [
    "HIGH",
    "MEDIUM",
    "LOW"
]


SAFETY_CRITICAL_SYSTEMS = [
    "ABS",
    "BRAKES",
    "STEERING",
    "AIRBAG",
    "TRACTION CONTROL"
]


CODE_CATEGORY_MAPPING = {
    "P": "Powertrain",
    "C": "Chassis",
    "B": "Body",
    "U": "Network"
}