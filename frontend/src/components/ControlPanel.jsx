import SelectInput from "./inputs/SelectInput";
import SliderInput from "./inputs/SliderInput";

const datasetOptions = [
  { value: "moons", label: "Moons" },
  { value: "circles", label: "Circles" },
  { value: "blobs", label: "Blobs" },
];

const modelOptions = [
  { value: "logisticRegression", label: "Logistic Regression" },
  { value: "decisionTree", label: "Decision Tree" },
  { value: "randomForest", label: "Random Forest" },
];
const ControlPanel = ({
  selectedDataset,
  selectedModel,
  onChangeDataset,
  onChangeModel,
  noise,
  onChangeNoise,
  onTrain,
  loading,
}) => {
  return (
    <aside className="rounded-xl bg-slate-800 border border-slate-700 p-6">
      <h2 className="text-lg font-semibold text-white">Model Configuration</h2>
      <div>
        <SelectInput
          label="Dataset"
          name="dataset"
          options={datasetOptions}
          value={selectedDataset}
          onChange={onChangeDataset}
          disabled={loading}
        />
      </div>
      <div>
        <SelectInput
          label="Machine Learning Model"
          name="mlModel"
          options={modelOptions}
          value={selectedModel}
          onChange={onChangeModel}
          disabled={loading}
        />
      </div>
      <div>
        <SliderInput
          label="Noise Level"
          name="noise"
          value={noise}
          onChange={onChangeNoise}
          min={0}
          max={0.5}
          step={0.01}
          disabled={loading}
        />
      </div>
      <button
        type="button"
        onClick={onTrain}
        className="w-full rounded-lg bg-cyan-600 px-4 py-3
             font-medium text-white transition-colors
             hover:bg-cyan-500 cursor-pointer"
      >
        {loading ? "Training..." : "Train Model"}
      </button>
    </aside>
  );
};

export default ControlPanel;
