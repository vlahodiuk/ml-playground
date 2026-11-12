import numpy as np
def generate_decision_boundary(model, X, resolution):
    # 0.5 provide some empty space around the outermost data points
    x_min, x_max = X[:, 0].min() - 0.5, X[:, 0].max() + 0.5
    y_min, y_max = X[:, 1].min() - 0.5, X[:, 1].max() + 0.5

    xv, yv = np.meshgrid(np.linspace(x_min, x_max, resolution), np.linspace(y_min, y_max, resolution))

    grid_points = np.column_stack([np.ravel(xv), np.ravel(yv)])
    predictions = model.predict(grid_points)
    predictions = predictions.reshape(xv.shape)
    return xv[0, :], yv[:, 0], predictions