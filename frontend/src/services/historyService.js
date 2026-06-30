import api from "./api";

export async function getHistory() {
  const response = await api.get("/history");
  return response.data;
}

export async function getHistoryById(id) {
  const response = await api.get(`/history/${id}`);
  return response.data;
}

export async function deleteHistory(id) {
  await api.delete(`/history/${id}`);
}