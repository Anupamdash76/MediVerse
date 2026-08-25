import api from "./api";

export async function register(data) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function login(data) {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}

export async function forgotPassword(email) {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
}

export async function verifyOTP(email, otp) {
  const response = await api.post("/auth/verify-otp", { email, otp });
  return response.data;
}

export async function resetPassword(email, otp, new_password) {
  const response = await api.post("/auth/reset-password", { email, otp, new_password });
  return response.data;
}