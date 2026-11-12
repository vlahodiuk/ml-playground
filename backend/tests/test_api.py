from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

@pytest.mark.parametrize(
    "api_call",
    [
        {
            "json": {
                "dataset": "moons",
                "model": "randomForest",
                "noise": 0.2,
                "samples": 200,
            },
            "status_code": 200,
        },
        {
            "json":{
                "dataset": "moons",
                "model": "superNeuralQuantumForest",
                "noise": 0.2,
                "samples": 200,
            },
            "status_code": 422,
        },
        {
            "json": {
                "dataset": "moons",
                "model": "randomForest",
                "noise": -0.5,
                "samples": 200,
            },
            "status_code": 422,
        }
    ]
)

def test_train_endpoint(api_call):
    response = client.post(
        "/train",
        json=api_call["json"],
    )

    assert response.status_code == api_call["status_code"]

    data = response.json()


    if api_call["status_code"] == 200:
        assert data["dataset"] == "moons"
        assert data["model"] == "randomForest"
        boundary = data["decision_boundary"]
        assert len(data["points"]) == 200
        assert len(boundary["x"]) == 100
        assert len(boundary["y"]) == 100
        assert len(boundary["z"]) == 100
        assert all(len(row) == 100 for row in boundary["z"])

        all(len(row) == 100 for row in boundary["z"])

    elif api_call["status_code"] == 422:
        assert "detail" in data

    

