import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutEmployee } from "../../../auth/state/auth/AuthAction.jsx";
import { toggleTheme } from "../../../../shared/state/Theme.slice.jsx";
import {
  getEmployeeTasks,
  updateEmployeeTaskStatus,
} from "../../MyTask/apis/task.api.jsx";

export const useEmployeeDashboard = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { employee, isLoggingOut, error: authError } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

  const handleLogout = () => {
    dispatch(LogoutEmployee());
  };

  const user = employee?.user || employee?.data?.user || employee?.employee || employee || {};
  const employeeName = user?.name || "Team Member";
  const userEmail = user?.email || "employee@teamsync.io";
  const userDepartment = user?.department || "General Member";
  const userDesignation = user?.designation || user?.role || "Associate";
  const userStatus = user?.status || "active";

  const initials =
    employeeName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((namePart) => namePart.charAt(0).toUpperCase())
      .join("") || "EM";

  const handleChangeTheme = () => {
    dispatch(toggleTheme());
  };

  // 1. Fetch Employee Tasks
  const {
    data: tasksData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["employee", "dashboard", "tasks"],
    queryFn: () => getEmployeeTasks({ page: 1, limit: 10 }),
    staleTime: 60 * 1000,
  });

  // 2. Mutation for status update from quick actions
  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, status }) => updateEmployeeTaskStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee", "dashboard", "tasks"] });
      queryClient.invalidateQueries({ queryKey: ["employee", "tasks"] });
    },
  });

  const handleQuickStatusChange = (taskId, newStatus) => {
    updateStatusMutation.mutate({ taskId, status: newStatus });
  };

  // Compute processed metrics & tasks
  const dashboardData = useMemo(() => {
    const rawTasks = tasksData?.tasks || [];
    const metrics = tasksData?.metrics || {};

    const totalTasks = metrics.total ?? rawTasks.length ?? 0;
    const completedTasks = metrics.completed ?? rawTasks.filter((t) => t.status === "completed").length ?? 0;
    const inProgressTasks = metrics.inProgress ?? rawTasks.filter((t) => t.status === "in_progress").length ?? 0;
    const pendingTasks = metrics.pending ?? rawTasks.filter((t) => t.status === "pending").length ?? 0;
    const completionRate =
      metrics.completionRate ??
      (totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0);

    const highPriorityTasks = rawTasks.filter((t) => t.priority === "high" && t.status !== "completed");
    const urgentTasksCount = highPriorityTasks.length;

    // Upcoming or Due Tasks (pending/in_progress sorted by deadline)
    const activeTasks = rawTasks
      .filter((t) => t.status !== "completed")
      .sort((a, b) => new Date(a.dueDate || a.deadline || 0) - new Date(b.dueDate || b.deadline || 0));

    // Recent Completed Tasks
    const completedList = rawTasks.filter((t) => t.status === "completed");

    // Stats Card representation
    const stats = [
      {
        id: "assigned_tasks",
        label: "Assigned Deliverables",
        value: totalTasks,
        subtext: `${inProgressTasks} currently in progress`,
        trend: "neutral",
        color: "primary",
        icon: "CheckSquare",
      },
      {
        id: "completed_tasks",
        label: "Completed Tasks",
        value: completedTasks,
        subtext: `${completionRate}% efficiency rate`,
        trend: "up",
        color: "success",
        icon: "CheckCircle2",
      },
      {
        id: "pending_review",
        label: "Pending Start",
        value: pendingTasks,
        subtext: "Waiting to initiate",
        trend: "neutral",
        color: "warning",
        icon: "Clock",
      },
      {
        id: "urgent_tasks",
        label: "Priority Actions",
        value: urgentTasksCount,
        subtext: urgentTasksCount > 0 ? "Requires immediate attention" : "All priorities managed",
        trend: urgentTasksCount > 0 ? "down" : "up",
        color: urgentTasksCount > 0 ? "danger" : "secondary",
        icon: "Flame",
      },
    ];

    return {
      stats,
      tasks: rawTasks,
      activeTasks: activeTasks.slice(0, 5),
      completedList: completedList.slice(0, 5),
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      completionRate,
      urgentTasksCount,
    };
  }, [tasksData]);

  // Greeting helper based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return {
    // Auth & Profile
    employee,
    employeeName,
    userEmail,
    userDepartment,
    userDesignation,
    userStatus,
    initials,
    isLoggingOut,
    authError,
    handleLogout,
    handleChangeTheme,
    theme,
    greeting: getGreeting(),

    // Async states
    isLoading,
    isFetching,
    isError,
    error,
    refetch,

    // Actions
    handleQuickStatusChange,
    isUpdatingStatus: updateStatusMutation.isPending,

    // Processed Data
    ...dashboardData,
  };
};

export const useDashboard = useEmployeeDashboard;
export default useEmployeeDashboard;
