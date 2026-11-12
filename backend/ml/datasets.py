from sklearn.datasets import make_moons, make_circles, make_blobs

def generate_moons(samples: int, noise: float):
    X, y = make_moons(
        n_samples=samples,
        noise=noise,
        random_state=42 # Because it is a amin number for everething =)
    )

    return X, y

def generate_circles(samples: int, noise: float):
    X, y = make_circles(
        n_samples=samples,
        noise=noise,
        random_state=42
    )

    return X, y


def generate_blobs(samples: int, noise: float):
    X, y = make_blobs(
        n_samples=samples,
        cluster_std=0.3 + noise * 6,
        centers=2,
        n_features=2,
        random_state=42
    )

    return X, y


DATASET_GENERATORS = {
    "moons": generate_moons,
    "circles": generate_circles,
    "blobs": generate_blobs,
}


def generate_dataset(dataset_type: str, samples: int, noise: float):
    generator = DATASET_GENERATORS[dataset_type]
    return generator(samples=samples, noise=noise)