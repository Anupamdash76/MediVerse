import api from "./api";

export async function getProfile() {
  const response = await api.get("/profile");
  return response.data;
}

export async function createProfile(data) {
  const response = await api.post("/profile", data);
  return response.data;
}

export async function updateProfile(data) {
  const response = await api.put("/profile", data);
  return response.data;
}