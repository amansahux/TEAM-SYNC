import { useState, useMemo, useCallback, useEffect } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getEmployeeTasks,
  getEmployeeTaskDetail,
  updateEmployeeTaskStatus,
} from "../apis/task.api";

/**
 * Main hook for Employee Task Dashboard (My Tasks)
 */
export const useEmployeeTasks = () => {
  const queryClient = useQueryClient();

  // Filters and Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Debounce search input changes (350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  // Query: Fetch Assigned Employee Tasks
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
      "employee",
      "my-tasks",
      page,
      limit,
      debouncedSearch,
      statusFilter,
      priorityFilter,
    ],
    queryFn: () =>
      getEmployeeTasks({
        page,
        limit,
        search: debouncedSearch,
        status: statusFilter,
        priority: priorityFilter,
      }),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });

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

  // Mutation: Update Task Status
  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, status }) =>
      updateEmployeeTaskStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee", "my-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["employee", "task-detail"] });
    },
    onError: (err) => {
      console.error(
        err?.response?.data?.message || "Failed to update task status"
      );
    },
  });

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

  const handleStatusChange = useCallback(
    (taskId, newStatus) => {
      updateStatusMutation.mutate({ taskId, status: newStatus });
    },
    [updateStatusMutation]
  );

  return {
    // Data
    tasks,
    metrics,
    pagination,
    // Loading & Error States
    isLoading,
    isPending,
    isFetching,
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
    // Actions & Mutations
    updateStatusMutation,
    handleStatusChange,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
};

/**
 * Hook for Individual Employee Task Detail Page
 */
export const useEmployeeTaskDetail = (taskId) => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["employee", "task-detail", taskId],
    queryFn: () => getEmployeeTaskDetail(taskId),
    enabled: !!taskId,
    staleTime: 60 * 1000,
  });

  const task = useMemo(() => data?.task || data, [data]);

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus) => updateEmployeeTaskStatus(taskId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee", "task-detail", taskId] });
      queryClient.invalidateQueries({ queryKey: ["employee", "my-tasks"] });
    },
    onError: (err) => {
      console.error(err?.response?.data?.message || "Failed to update task status");
    },
  });

  const handleStatusChange = useCallback(
    (newStatus) => {
      updateStatusMutation.mutate(newStatus);
    },
    [updateStatusMutation]
  );

  return {
    task,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
    handleStatusChange,
    isUpdatingStatus: updateStatusMutation.isPending,
  };
};

export const useTask = useEmployeeTasks;

