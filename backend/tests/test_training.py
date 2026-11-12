import pytest
import numpy as np

from ml.datasets import generate_dataset
from ml.training import train_model

@pytest.mark.parametrize(
    "model_type",
    ["logisticRegression", "decisionTree", "randomForest"]
)
def test_model_training(model_type):
    X, y = generate_dataset(
        dataset_type="moons",
        samples=200,
        noise=0.2
    )

    result = train_model(X, y, model_type)

    assert 0 <= result["accuracy"] <= 1
    assert 0 <= result["precision"] <= 1
    assert 0 <= result["recall"] <= 1
    assert 0 <= result["f1"] <= 1
    assert result["train_samples"] == 160
    assert result["test_samples"] == 40
    assert result["confusion_matrix"].shape == (2,2)
    assert result["confusion_matrix"].sum() == 40