from typing import Literal
from pydantic import BaseModel, Field



class DataPoint(BaseModel):
    x: float
    y: float
    label: int


class DatasetResponse(BaseModel):
    dataset: str
    noise: float
    samples: int
    points: list[DataPoint]


class TrainRequest(BaseModel):
    dataset: Literal["moons", "circles", "blobs"]
    model: Literal[
        "logisticRegression",
        "decisionTree",
        "randomForest",
    ]
    noise: float = Field(default=0.2, ge=0, le=0.5)
    samples: int = Field(default=200, ge=10, le=1000)

class DecisionBoundary(BaseModel):
    x: list[float]
    y: list[float]
    z: list[list[int]]


class TrainResponse(BaseModel):
    dataset: str
    model: str
    accuracy: float
    train_samples: int
    test_samples: int
    decision_boundary: DecisionBoundary
    points: list[DataPoint]
    precision: float
    recall: float
    f1: float
    confusion_matrix: list[list[int]]

