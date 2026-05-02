import uuid

from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    JSON,
    String,
    Text
)
from sqlalchemy.sql import func

from app.database.connection import Base


class DiagnosisRecord(Base):
    __tablename__ = "diagnoses"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    vehicle_make = Column(
        String,
        nullable=False
    )

    vehicle_model = Column(
        String,
        nullable=False
    )

    vehicle_year = Column(
        Integer,
        nullable=False
    )

    mileage_km = Column(
        Integer,
        nullable=True
    )

    fault_codes = Column(
        JSON,
        nullable=False
    )

    symptoms = Column(
        Text,
        nullable=False
    )

    root_cause = Column(
        Text,
        nullable=False
    )

    confidence = Column(
        String,
        nullable=False
    )

    severity_score = Column(
        Integer,
        nullable=False
    )

    safety_warning = Column(
        Text,
        nullable=True
    )

    fix_sequence = Column(
        JSON,
        nullable=False
    )

    parts_list = Column(
        JSON,
        nullable=False
    )

    estimated_cost = Column(
        JSON,
        nullable=False
    )

    summary = Column(
        Text,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )