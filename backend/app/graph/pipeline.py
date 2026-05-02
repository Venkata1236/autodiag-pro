from langgraph.graph import END, StateGraph

from app.graph.nodes import (
    fault_lookup_node,
    fix_sequence_node,
    parts_estimate_node,
    root_cause_node
)
from app.graph.state import DiagnosisState


graph_builder = StateGraph(
    DiagnosisState
)


graph_builder.add_node(
    "fault_lookup_node",
    fault_lookup_node
)

graph_builder.add_node(
    "root_cause_node",
    root_cause_node
)

graph_builder.add_node(
    "fix_sequence_node",
    fix_sequence_node
)

graph_builder.add_node(
    "parts_estimate_node",
    parts_estimate_node
)


graph_builder.set_entry_point(
    "fault_lookup_node"
)


graph_builder.add_edge(
    "fault_lookup_node",
    "root_cause_node"
)

graph_builder.add_edge(
    "root_cause_node",
    "fix_sequence_node"
)

graph_builder.add_edge(
    "fix_sequence_node",
    "parts_estimate_node"
)

graph_builder.add_edge(
    "parts_estimate_node",
    END
)


diagnosis_pipeline = graph_builder.compile()