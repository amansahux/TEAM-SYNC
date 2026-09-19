import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../apis/departments.api";

export const useDepartments = () => {
  return useQuery({
    queryKey: ["admin", "departments"],
    queryFn: getDepartments,
    staleTime: 60 * 1000, // 1 minute
  });
};
