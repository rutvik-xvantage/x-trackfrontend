import { api } from "../lib/axios";
export const getMyReportsApi = () => api.get("/api/daily-reports/me");

export const createReportApi = (data: any) =>
  api.post("/api/daily-reports", data);

export const updateReportApi = (id: number, data: any) =>
  api.put(`/api/daily-reports/${id}`, data);

export const getDailyReportsApi = () => {
  return api.get("/api/daily-reports");
};

export const approveDailyReportApi = (id: number) => {
  return api.post(`/api/daily-reports/${id}/approve`);
};

export const rejectDailyReportApi = (id: number) => {
  return api.post(`/api/daily-reports/${id}/reject`);
};