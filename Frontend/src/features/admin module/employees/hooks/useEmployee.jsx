import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addEmployee, getAllEmployees } from "../apis/employees.api";
import { toast } from "react-hot-toast"; // assuming react-hot-toast is used
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const useEmployees = (page = 1, limit = 10) => {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["employees", page],
    queryFn: () => getAllEmployees(page, limit),
    staleTime: 5 * 100000, // 5 minutes
    keepPreviousData: true,
  });

  const addEmployeeMutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees", page] });
      toast.success("Employee added successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add employee");
    },
  });

  return { data, isPending, error, addEmployeeMutation };
};

const addEmployeeSchema = z.object({
  name: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Invalid email address"),
  department: z.enum(["developer", "designer", "manager", "marketer", "common"]),
  status: z.enum(["active", "inactive"]),
});

export const useAddEmployeeForm = () => {
  const queryClient = useQueryClient();
  
  const addEmployeeMutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee added successfully");
      form.reset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add employee");
    },
  });

  const form = useForm({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "common",
      status: "active",
      role: "employee", // sent but read-only
    },
  });

  const onSubmit = (data) => {
    addEmployeeMutation.mutate({
      ...data,
      role: "employee" // enforce role
    });
  };

  return { form, onSubmit, addEmployeeMutation };
};
