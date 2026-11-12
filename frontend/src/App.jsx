import { useState } from "react";
import Header from "./components/Header";
import ControlPanel from "./components/ControlPanel";
import DatasetChart from "./components/DatasetChart";
import { trainModel } from "./services/mlApi";
import MetricsPanel from "./components/MetricsPanel";
import ConfusionMatrix from "./components/ConfusionMatrix";

const App = () => {
  const [dataset, setDataset] = useState("moons");
  const [model, setModel] = useState("logisticRegression");
  const [noise, setNoise] = useState(0.2);
  const datasetHandleChange = (e) => {
    setDataset(e.target.value);
  };
  const modelHandleChange = (e) => {
    setModel(e.target.value);
  };

  const [experimentResult, setExperimentResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrain = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await trainModel(dataset, model, noise);

      setExperimentResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <ControlPanel
              selectedDataset={dataset}
              selectedModel={model}
              onChangeDataset={datasetHandleChange}
              onChangeModel={modelHandleChange}
              noise={noise}
              onChangeNoise={setNoise}
              onTrain={handleTrain}
              loading={loading}
            />
            <ConfusionMatrix experimentResult={experimentResult} />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6 min-w-0">
            <MetricsPanel
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
              trainingResult={experimentResult}
            />

            <DatasetChart experimentResult={experimentResult} error={error} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
