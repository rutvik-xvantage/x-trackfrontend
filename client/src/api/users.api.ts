import { api } from "../lib/axios";

export const getUsersApi = () => api.get("/api/users");
export const getUserApi = (id: number) => api.get(`/api/users/${id}`);
export const createUserApi = (data: any) => api.post("/api/users", data);
export const updateUserApi = (id: number, data: any) => api.put(`/api/users/${id}`, data);
export const deleteUserApi = (id: number) => api.delete(`/api/users/${id}`);
