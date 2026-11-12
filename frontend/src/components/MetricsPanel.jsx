import KpiCard from "./KpiCard";
const MODEL_LABELS = {
  logisticRegression: "Logistic Regression",
  decisionTree: "Decision Tree",
  randomForest: "Random Forest",
};
const DATASET_LABELS = {
  moons: "Moons",
  circles: "Circles",
  blobs: "Blobs",
};
const MetricsPanel = ({ trainingResult }) => {
  if (!trainingResult) {
    return null;
  }
  const metrics = [
    {
      id: "dataset",
      title: "Dataset",
      value: DATASET_LABELS[trainingResult.dataset],
    },
    {
      id: "model",
      title: "Model",
      value: MODEL_LABELS[trainingResult.model],
    },

    {
      id: "accuracy",
      title: "Test Accuracy",
      value: `${(trainingResult.accuracy * 100).toFixed(1)}%`,
    },

    {
      id: "train",
      title: "Training Samples",
      value: trainingResult.train_samples.toLocaleString(),
    },
    {
      id: "test",
      title: "Testing Samples",
      value: trainingResult.test_samples.toLocaleString(),
    },
    {
      id: "precision",
      title: "Precision",
      value: `${(trainingResult.precision * 100).toFixed(1)}%`,
    },
    {
      id: "recall",
      title: "Recall",
      value: `${(trainingResult.recall * 100).toFixed(1)}%`,
    },
    {
      id: "f1",
      title: "F1 Score",
      value: `${(trainingResult.f1 * 100).toFixed(1)}%`,
    },
  ];

  return (
    <section className="rounded-xl border border-slate-700 bg-slate-800 p-4">
      <h2 className="text-lg font-semibold text-white">Model Performance</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <KpiCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            compact={metric.id === "model"}
          />
        ))}
      </div>
    </section>
  );
};

export default MetricsPanel;
