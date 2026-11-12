from typing import Annotated, Literal
from fastapi import FastAPI, Query
from ml.datasets import generate_dataset
from ml.serializers import serialize_points, serialize_decision_boundary
from fastapi.middleware.cors import CORSMiddleware
from schemas import DatasetResponse, TrainRequest, TrainResponse
from ml.training import train_model

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET",  "POST"],
    allow_headers=["*"],
)


@app.get("/datasets")
def get_dataset(
    type:Literal["moons", "circles", "blobs"],
    noise: Annotated[float, Query(ge=0, le=0.5)] = 0.2,
    samples: Annotated[int, Query(ge=10, le=1000)] = 200,
):
    X, y = generate_dataset(
        dataset_type=type,
        samples=samples,
        noise=noise,
    )

    return DatasetResponse(
        dataset=type,
        noise=noise,
        samples=samples,
        points=serialize_points(X, y),
    )

@app.post("/train", response_model=TrainResponse)
def train(request: TrainRequest):

    X, y = generate_dataset(
        dataset_type=request.dataset,
        samples=request.samples,
        noise=request.noise,
    )

    result = train_model(
        X=X,
        y=y,
        model_type=request.model,
    )

    return TrainResponse(
    dataset=request.dataset,
    model=request.model,
    accuracy=result["accuracy"],
    train_samples=result["train_samples"],
    test_samples=result["test_samples"],
    decision_boundary=serialize_decision_boundary(
    result["decision_boundary"]
    ),
    points=serialize_points(X, y),
    precision=result["precision"],
    recall=result["recall"],
    f1=result["f1"],
    confusion_matrix=result["confusion_matrix"].tolist(),
)