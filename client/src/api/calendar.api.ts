import { api } from "@/lib/axios";

// Fetch all holidays
export const getHolidaysApi = () => {
  return api.get("/api/holidays");
};

// Fetch ALL employee leaves (Admin Level)
export const getAllLeavesApi = () => {
  return api.get("/api/leaves");
};
