import Plot from "react-plotly.js";

const DatasetChart = ({ experimentResult, error }) => {
  if (!experimentResult) {
    return <p className="text-slate-400">No experiment yet.</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  const points = experimentResult.points;
  const boundary = experimentResult.decision_boundary;

  const class0 = points.filter((point) => point.label === 0);
  const class1 = points.filter((point) => point.label === 1);

  const traces = [
    {
      x: class0.map((point) => point.x),
      y: class0.map((point) => point.y),
      type: "scatter",
      mode: "markers",
      name: "Class 0",
      marker: { color: "#22d3ee", size: 8 },
    },
    {
      x: class1.map((point) => point.x),
      y: class1.map((point) => point.y),
      type: "scatter",
      mode: "markers",
      name: "Class 1",
      marker: { color: "#fb923c", size: 8 },
    },
  ];

  const boundaryTrace = boundary
    ? {
        type: "heatmap",
        x: boundary.x,
        y: boundary.y,
        z: boundary.z,
        colorscale: [
          [0, "#164e63"],
          [0.499, "#164e63"],
          [0.5, "#7c2d12"],
          [1, "#7c2d12"],
        ],
        opacity: 0.3,
        showscale: false,
        hoverinfo: "skip",
      }
    : null;

  return (
    <section className="rounded-xl bg-slate-800 border border-slate-700 p-6">
      <h2 className="text-lg font-semibold text-white">
        Dataset Visualization
      </h2>

      <Plot
        data={[...(boundaryTrace ? [boundaryTrace] : []), ...traces]}
        layout={{
          autosize: true,
          height: 400,
          paper_bgcolor: "#1e293b",
          plot_bgcolor: "#1e293b",
          font: { color: "#cbd5e1" },
          margin: { t: 30, b: 50, l: 50, r: 20 },
          xaxis: { title: { text: "Feature 1" } },
          yaxis: { title: { text: "Feature 2" } },
        }}
        useResizeHandler={true}
        style={{ width: "100%" }}
        config={{ responsive: true }}
      />
    </section>
  );
};

export default DatasetChart;
