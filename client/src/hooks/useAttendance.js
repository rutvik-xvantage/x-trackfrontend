import { useQuery } from "@tanstack/react-query";
import { getMyAttendanceApi } from "../api/attendance.api";

export const useMyAttendance = () =>
  useQuery({
    queryKey: ["myAttendance"],
    queryFn: async () => (await getMyAttendanceApi()).data.data,
  });
