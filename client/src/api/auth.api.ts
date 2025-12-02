import { api } from "../lib/axios";

export const loginApi = (payload: { username: string; password: string }) =>
  api.post("/api/auth/login", payload);

export const getMeApi = () => api.get("/api/auth/me");
