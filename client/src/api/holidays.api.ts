import { api } from "@/lib/axios";

export const getHolidaysApi = () => {
  return api.get("/api/holidays");
};

export const createHolidayApi = (data: { name: string; date: string }) => {
  return api.post("/api/holidays", data);
};

export const updateHolidayApi = (id: number, data: any) => {
  return api.put(`/api/holidays/${id}`, data);
};

export const deleteHolidayApi = (id: number) => {
  return api.delete(`/api/holidays/${id}`);
};
