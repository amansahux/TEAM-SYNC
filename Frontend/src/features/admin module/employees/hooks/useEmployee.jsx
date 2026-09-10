import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addEmployee, getAllEmployees } from "../apis/employees.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const addEmployeeSchema = z.object({
  name: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  department: z.enum([
    "developer",
    "designer",
    "manager",
    "marketer",
    "common",
  ]),
  status: z.enum(["active", "inactive"]),
});

export const useEmployees = (page = 1, limit = 10) => {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["employees", page],
    queryFn: () => getAllEmployees(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });

  const form = useForm({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      department: "common",
      status: "active",
      role: "employee",
    },
  });

  const addEmployeeMutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      form.reset();
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to add employee");
    },
  });

  const handleCreatingEmployee = (data) => {
    addEmployeeMutation.mutate({
      ...data,
      role: "employee", // enforce role
    });
  };

  return {
    data,
    isPending,
    error,
    addEmployeeMutation,
    handleCreatingEmployee,
    form,
  };
};

