import api from "./api";

export async function predictDisease(symptoms) {
 const response = await api.post("/predict", {
  symptoms,
  });

  return response.data;
}