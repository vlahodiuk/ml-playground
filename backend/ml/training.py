from sklearn.base import clone
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from ml.decision_boundary import generate_decision_boundary

def train_model(X, y, model_type):

    MODEL_SELECTION = {
        "logisticRegression": LogisticRegression(max_iter=1000),
        "decisionTree": DecisionTreeClassifier(random_state=42),
        "randomForest": RandomForestClassifier(
        n_estimators=100,
        random_state=42,
    ),
    }

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    model = clone(MODEL_SELECTION[model_type])
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    precision = precision_score(y_test, predictions, zero_division=0)
    recall = recall_score(y_test, predictions, zero_division=0)
    f1 = f1_score(y_test, predictions, zero_division=0)
    cm = confusion_matrix(y_test, predictions, labels=[0, 1])

    x_grid, y_grid, predictions_grid = generate_decision_boundary(
        model=model,
        X=X,
        resolution=100
    )

    return {
        "model": model,
        "accuracy": float(accuracy),
        "train_samples": len(X_train),
        "test_samples": len(X_test),
        "decision_boundary": {
            "x": x_grid,
            "y": y_grid,
            "z": predictions_grid
        },
            "precision": float(precision),
        "recall": float(recall),
        "f1": float(f1),
        "confusion_matrix": cm,
    }