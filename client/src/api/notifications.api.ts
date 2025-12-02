import { api } from "../lib/axios";

export const getMyNotificationsApi = () =>
  api.get("/api/notifications/me");

export const markNotificationReadApi = (id: number) =>
  api.post(`/api/notifications/me/${id}/read`);

export const createNotificationApi = (data: any) =>
  api.post("/api/notifications", data);
