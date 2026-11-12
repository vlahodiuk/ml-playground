import Plot from "react-plotly.js";

const ConfusionMatrix = ({ experimentResult }) => {
  if (!experimentResult) {
    return null;
  }

  const matrix = experimentResult.confusion_matrix;

  const trace = {
    type: "heatmap",
    z: matrix,
    x: ["Predicted 0", "Predicted 1"],
    y: ["Actual 0", "Actual 1"],
    colorscale: [
      [0, "#1e293b"],
      [0.5, "#155e75"],
      [1, "#22d3ee"],
    ],
    // Color range
    zmin: 0,
    zmax: Math.max(...matrix.flat(), 1),
    // Text displayed inside cells
    text: matrix,
    texttemplate: "%{text}",
    textfont: {
      color: "#ffffff",
      size: 18,
    },
    showscale: false,
  };

  return (
    <section className="rounded-xl border border-slate-700 bg-slate-800 p-6">
      <h2 className="text-lg font-semibold text-white">Confusion Matrix</h2>

      <Plot
        data={[trace]}
        layout={{
          autosize: true,
          height: 350,
          paper_bgcolor: "#1e293b",
          plot_bgcolor: "#1e293b",
          font: { color: "#cbd5e1" },
          margin: { t: 30, b: 60, l: 90, r: 20 },
          yaxis: { autorange: "reversed" },
        }}
        useResizeHandler={true}
        style={{ width: "100%" }}
        config={{ responsive: true }}
      />
    </section>
  );
};

export default ConfusionMatrix;
