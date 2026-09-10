import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addEmployee, deleteEmployee, getAllEmployees, toggleEmployeeStatus, updateEmployee } from "../apis/employees.api";
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

export const useEmployees = (
  page = 1,
  limit = 10,
  search = "",
  department = "",
  status = "",
) => {
  const queryClient = useQueryClient();

  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["employees", page, limit, search, department, status],
    queryFn: () => getAllEmployees(page, limit, search, department, status),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: keepPreviousData,
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
  const handleExport = (employees) => {
    if (!employees || employees.length === 0) {
      alert("No employee data to export.");
      return;
    }
    const dataStr = JSON.stringify(employees, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `employees_export_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const updateStatusMutation = useMutation({
    mutationFn: ({ employeeId, status }) => toggleEmployeeStatus(employeeId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to update status");
    },
  });
  const updateEmployeeMutation = useMutation({
    mutationFn: ({ employeeId, ...data }) => updateEmployee(employeeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to update employee");
    },
  })
  const deleteEmployeeMutation = useMutation({
    mutationFn: (employeeId) => deleteEmployee(employeeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error(error?.response?.data?.message || "Failed to delete employee");
    },
  })
  const updateEmployeeForm = useForm({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      department: "common",
      status: "active",
      role: "employee",
    },
  })
  return {
    data,
    isPending,
    error,
    addEmployeeMutation,
    handleCreatingEmployee,
    handleExport,
    form,
    updateEmployeeMutation,
    deleteEmployeeMutation,
    updateEmployeeForm,
    updateStatusMutation,
    
  };
};
