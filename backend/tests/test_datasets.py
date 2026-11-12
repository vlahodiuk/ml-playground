import pytest
import numpy as np

from ml.datasets import generate_dataset


@pytest.mark.parametrize(
    "dataset_type",
    ["moons", "circles", "blobs"]
)
@pytest.mark.parametrize(
    "samples",
    [100, 300]
)

@pytest.mark.parametrize(
    "noise",
    [0.2, 0.4]
)
def test_dataset_shape(dataset_type, samples, noise):
    X, y = generate_dataset(
        dataset_type=dataset_type,
        samples=samples,
        noise=noise
    )

    assert X.shape == (samples, 2)
    assert y.shape == (samples,)
    assert set(y.tolist()) == {0, 1}

@pytest.mark.parametrize(
    "dataset_type",
    ["moons", "circles", "blobs"]
)

def test_dataset_reproducibility(dataset_type):
    X_A, y_A = generate_dataset(
    dataset_type=dataset_type,
    samples=200,
    noise=0.2
    )

    X_B, y_B = generate_dataset(
    dataset_type=dataset_type,
    samples=200,
    noise=0.2
    )

    assert np.array_equal(X_A, X_B)
    assert np.array_equal(y_A, y_B)
