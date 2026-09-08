import { useMutation, useQuery } from "@tanstack/react-query";
import { addEmployee, getAllEmployees } from "../apis/employees.api";

export const useEmployees = (page = 1,limit = 10) => {
const {data, isPending, error} = useQuery({
queryKey:["employees", page],
queryFn: () => getAllEmployees(page, limit),
staleTime: 5 * 100000 , // 5 minutes
keepPreviousData: true,
});


const addEmployeeMutation = useMutation({
  mutationFn: addEmployee,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["employees", page] });
    toast.success("Employee added successfully");
  },
  onError: (error) => {
    toast.error(error.response.data.message);
  },
});
  return { data, isPending, error, addEmployeeMutation };
};
