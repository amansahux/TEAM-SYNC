import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../apis/employees.api";

export const useEmployees = (page = 1,limit = 10) => {
const {data, isPending, error} = useQuery({
queryKey:["employees", page],
queryFn: () => getAllEmployees(page, limit),
staleTime: 5 * 100000 , // 5 minutes
keepPreviousData: true,
});
  return { data, isPending, error };
};
