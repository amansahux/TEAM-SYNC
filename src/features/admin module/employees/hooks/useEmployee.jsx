import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../apis/employees.api";

export const useEmployees = (page = 1) => {
const {data, isPending, error} = useQuery({
queryKey:["employees", page],
queryFn: () => getAllEmployees(page),
staleTime: 5 * 100000 , // 5 minutes
});
  return { data, isPending, error };
};
