const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchDataset = async (dataset, noise, samples = 200) => {
  const response = await fetch(
    `${API_BASE_URL}/datasets?type=${dataset}&noise=${noise}&samples=${samples}`,
  );

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return await response.json();
};

export const trainModel = async (dataset, model, noise, samples = 200) => {
  const response = await fetch("http://127.0.0.1:8000/train", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dataset,
      model,
      noise,
      samples,
    }),
  });

  if (!response.ok) {
    throw new Error(`Training failed: ${response.status}`);
  }

  return await response.json();
};
