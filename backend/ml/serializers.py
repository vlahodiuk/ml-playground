import numpy as np
from numpy.typing import NDArray


def serialize_points(
    X: NDArray,
    y: NDArray,
) -> list[dict[str, float | int]]:

    return [
        {
            "x": float(point[0]),
            "y": float(point[1]),
            "label": int(label),
        }
        for point, label in zip(X, y)
    ]

def serialize_decision_boundary(boundary):
    return {
        "x": boundary["x"].tolist(),
        "y": boundary["y"].tolist(),
        "z": boundary["z"].tolist(),
    }