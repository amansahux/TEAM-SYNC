import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../apis/employees.api";

export const useEmployees = () => {
const {data, isPending, error} = useQuery({
queryKey:["employees"],
queryFn:getAllEmployees,
staleTime: 5 * 100000 , // 5 minutes
});
  return { data, isPending, error };
};
