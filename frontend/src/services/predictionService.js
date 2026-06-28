import api from "./api";

export async function predictDisease(symptoms) {
  const response = await api.post("/api/v1/predict", {
    symptoms,
  });

  return response.data;
}