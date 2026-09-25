import { useState, useMemo, useCallback, useEffect } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../apis/task.api";
import { getAllEmployees } from "../../employees/apis/employees.api";

// Task Validation Schema for Create/Edit
export const taskFormSchema = z.object({
  title: z
    .string()
    .min(3, "Task title must be at least 3 characters")
    .max(120, "Title is too long"),
  description: z.string().optional().default(""),
  assignedTo: z.string().min(1, "Please assign this task to an employee"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  status: z.enum(["todo", "in-progress", "completed"]).default("todo"),
  dueDate: z.string().optional().default(""),
});

/**
 * Main hook for Admin Task Dashboard (All Tasks view)
 */
export const useTask = () => {
  const queryClient = useQueryClient();

  // Filters and Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assignedToFilter, setAssignedToFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Debounce search input changes (350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  // Query: Fetch All Tasks with debouncedSearch
  const {
    data,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "admin",
      "tasks",
      page,
      limit,
      debouncedSearch,
      statusFilter,
      priorityFilter,
      assignedToFilter,
    ],
    queryFn: () =>
      getAllTasks({
        page,
        limit,
        search: debouncedSearch,
        status: statusFilter,
        priority: priorityFilter,
        assignedTo: assignedToFilter,
      }),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });

  // Query: Fetch Employee Roster for assign filter / dropdowns
  const { data: employeeData, isLoading: isEmployeesLoading } = useQuery({
    queryKey: ["employees", "all-list"],
    queryFn: () => getAllEmployees(1, 100, "", "", "active"),
    staleTime: 5 * 60 * 1000,
  });

  const employees = useMemo(() => {
    return employeeData?.employees || [];
  }, [employeeData]);

  // Extract structured task metrics & listings
  const tasks = useMemo(() => data?.tasks || [], [data]);
  const metrics = useMemo(() => {
    const rawMetrics = data?.metrics || {};
    const total = data?.pagination?.total || data?.totalTasks || tasks.length;
    return {
      total,
      todo: rawMetrics.todo || 0,
      inProgress: rawMetrics.inProgress || 0,
      completed: rawMetrics.completed || 0,
      completionRate:
        total > 0
          ? `${Math.round(((rawMetrics.completed || 0) / total) * 100)}%`
          : "0%",
    };
  }, [data, tasks]);

  const pagination = useMemo(() => {
    return (
      data?.pagination || {
        total: 0,
        page: 1,
        totalPages: 1,
        limit: 10,
      }
    );
  }, [data]);

  // Mutation: Update Task
  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, taskData }) => updateTask(taskId, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "tasks"] });
      setIsEditModalOpen(false);
      setSelectedTask(null);
    },
    onError: (err) => {
      console.error(err?.response?.data?.message || "Failed to update task");
    },
  });

  // Mutation: Delete Task
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "tasks"] });
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    },
    onError: (err) => {
      console.error(err?.response?.data?.message || "Failed to delete task");
    },
  });

  // Handlers
  const handleSearchChange = useCallback((val) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleStatusFilter = useCallback((status) => {
    setStatusFilter(status);
    setPage(1);
  }, []);

  const handlePriorityFilter = useCallback((priority) => {
    setPriorityFilter(priority);
    setPage(1);
  }, []);

  const handleAssigneeFilter = useCallback((assigneeId) => {
    setAssignedToFilter(assigneeId);
    setPage(1);
  }, []);

  const handleOpenEdit = useCallback((task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setSelectedTask(null);
    setIsEditModalOpen(false);
  }, []);

  const handleOpenDelete = useCallback((task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  }, []);

  const handleCloseDelete = useCallback(() => {
    setTaskToDelete(null);
    setIsDeleteModalOpen(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (taskToDelete?._id) {
      deleteTaskMutation.mutate(taskToDelete._id);
    }
  }, [taskToDelete, deleteTaskMutation]);

  const handleQuickStatusChange = useCallback(
    (taskId, newStatus) => {
      updateTaskMutation.mutate({
        taskId,
        taskData: { status: newStatus },
      });
    },
    [updateTaskMutation]
  );

  return {
    // Data
    tasks,
    metrics,
    pagination,
    employees,
    // Loading & Error States
    isLoading,
    isPending,
    isFetching,
    isEmployeesLoading,
    isError,
    error,
    refetch,
    // Filter State & Setters
    page,
    setPage,
    limit,
    setLimit,
    search,
    debouncedSearch,
    setSearch: handleSearchChange,
    statusFilter,
    setStatusFilter: handleStatusFilter,
    priorityFilter,
    setPriorityFilter: handlePriorityFilter,
    assignedToFilter,
    setAssignedToFilter: handleAssigneeFilter,
    // Modal states & handlers
    selectedTask,
    isEditModalOpen,
    handleOpenEdit,
    handleCloseEdit,
    taskToDelete,
    isDeleteModalOpen,
    handleOpenDelete,
    handleCloseDelete,
    handleConfirmDelete,
    // Mutations & Actions
    updateTaskMutation,
    deleteTaskMutation,
    handleQuickStatusChange,
    isDeleting: deleteTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
  };
};

/**
 * Hook for Create Task Page
 */
export const useCreateTask = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch active employee list for selection
  const { data: employeeData, isLoading: isEmployeesLoading } = useQuery({
    queryKey: ["employees", "active-roster"],
    queryFn: () => getAllEmployees(1, 100, "", "", "active"),
    staleTime: 5 * 60 * 1000,
  });

  const employees = useMemo(() => {
    return employeeData?.employees || [];
  }, [employeeData]);

  // Form Instance
  const form = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
      priority: "medium",
      status: "todo",
      dueDate: "",
    },
  });

  // Mutation: Create Task
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "tasks"] });
      form.reset();
      setServerError("");
      setSuccessMessage("Task successfully created and dispatched to employee.");
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create task. Please review your inputs.";
      setServerError(msg);
      setSuccessMessage("");
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setServerError("");
    setSuccessMessage("");
    createTaskMutation.mutate(values);
  });

  return {
    form,
    employees,
    isEmployeesLoading,
    onSubmit,
    isSubmitting: createTaskMutation.isPending,
    isSuccess: createTaskMutation.isSuccess,
    serverError,
    successMessage,
    resetForm: () => {
      form.reset();
      setServerError("");
      setSuccessMessage("");
    },
  };
};
