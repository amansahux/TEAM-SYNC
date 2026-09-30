import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { LogoutEmployee } from "../../../auth/state/auth/AuthAction.jsx";
import { toggleTheme } from "../../../../shared/state/Theme.slice.jsx";
import { getAllEmployees } from "../../employees/apis/employees.api.jsx";
import { getAllTasks } from "../../tasks/apis/task.api.jsx";
import { getDepartments } from "../../departments/apis/departments.api.jsx";

export const useAdminDashboard = () => {
  const dispatch = useDispatch();
  const { employee, isLoggingOut, error: authError } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

  const handleLogout = () => {
    dispatch(LogoutEmployee());
  };

  const employeeName =
    employee?.user?.name ||
    employee?.name ||
    employee?.employee?.user?.name ||
    employee?.employee?.name ||
    employee?.data?.user?.name ||
    employee?.data?.name ||
    "Administrator";

  const userEmail =
    employee?.user?.email ||
    employee?.email ||
    employee?.employee?.user?.email ||
    "admin@teamsync.io";

  const userRole =
    employee?.user?.role ||
    employee?.role ||
    employee?.employee?.user?.role ||
    "Admin";

  const initials =
    employeeName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((namePart) => namePart.charAt(0).toUpperCase())
      .join("") || "AD";

  const handleChangeTheme = () => {
    dispatch(toggleTheme());
  };

  // 1. Fetch Employees Data
  const {
    data: employeesData,
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
    refetch: refetchEmployees,
  } = useQuery({
    queryKey: ["admin", "dashboard", "employees"],
    queryFn: () => getAllEmployees(1, 10),
    staleTime: 60 * 1000,
  });

  // 2. Fetch Tasks Data & Metrics
  const {
    data: tasksData,
    isLoading: isTasksLoading,
    isError: isTasksError,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["admin", "dashboard", "tasks"],
    queryFn: () => getAllTasks({ page: 1, limit: 10 }),
    staleTime: 60 * 1000,
  });

  // 3. Fetch Departments
  const {
    data: departmentsData,
    isLoading: isDepartmentsLoading,
    isError: isDepartmentsError,
    refetch: refetchDepartments,
  } = useQuery({
    queryKey: ["admin", "dashboard", "departments"],
    queryFn: getDepartments,
    staleTime: 60 * 1000,
  });

  const isLoading = isEmployeesLoading || isTasksLoading || isDepartmentsLoading;
  const isError = isEmployeesError || isTasksError || isDepartmentsError;

  const refetchAll = () => {
    refetchEmployees();
    refetchTasks();
    refetchDepartments();
  };

  // Compute Metrics & Processed Data
  const dashboardData = useMemo(() => {
    const rawEmployees = employeesData?.employees || [];
    const empPagination = employeesData?.pagination || {};

    const rawTasks = tasksData?.tasks || [];
    const taskMetrics = tasksData?.metrics || {};

    const rawDepartments = departmentsData?.departments || [];
    const deptMetrics = departmentsData?.metrics || {};

    // Counts
    const totalEmployees =
      empPagination.total ??
      deptMetrics.totalEmployees ??
      rawEmployees.length ??
      0;
    const activeEmployees =
      empPagination.activeEmployees ??
      deptMetrics.activeEmployees ??
      rawEmployees.filter((e) => e.status === "active").length ??
      0;
    const inactiveEmployees =
      empPagination.inactiveEmployees ??
      deptMetrics.inactiveEmployees ??
      (totalEmployees - activeEmployees);
    const newEmployees =
      empPagination.newEmployees ??
      deptMetrics.newThisMonth ??
      0;

    const totalTasks = taskMetrics.total ?? tasksData?.pagination?.total ?? rawTasks.length ?? 0;
    const completedTasks = taskMetrics.completed ?? rawTasks.filter((t) => t.status === "completed").length ?? 0;
    const inProgressTasks = taskMetrics.inProgress ?? rawTasks.filter((t) => t.status === "in_progress").length ?? 0;
    const pendingTasks = taskMetrics.pending ?? rawTasks.filter((t) => t.status === "pending").length ?? 0;
    const completionRate = taskMetrics.completionRate ?? (totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0);

    const activeRate = totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 100;

    // Stat cards payload
    const stats = [
      {
        id: "total_employees",
        label: "Total Workforce",
        value: totalEmployees,
        change: `+${newEmployees} new this month`,
        trend: "up",
        color: "primary",
        icon: "Users",
      },
      {
        id: "active_rate",
        label: "Active Attendance",
        value: `${activeRate}%`,
        subtext: `${activeEmployees} active / ${inactiveEmployees} inactive`,
        trend: "up",
        color: "success",
        icon: "UserCheck",
      },
      {
        id: "task_completion",
        label: "Task Completion",
        value: `${completionRate}%`,
        subtext: `${completedTasks} of ${totalTasks} completed`,
        trend: completionRate >= 50 ? "up" : "neutral",
        color: "secondary",
        icon: "CheckCircle2",
      },
      {
        id: "departments_count",
        label: "Operational Units",
        value: rawDepartments.length || 5,
        subtext: `${inProgressTasks} ongoing deliverables`,
        trend: "neutral",
        color: "warning",
        icon: "Building2",
      },
    ];

    // Priority Task Distribution
    const tasksByPriority = {
      high: rawTasks.filter((t) => t.priority === "high").length,
      medium: rawTasks.filter((t) => t.priority === "medium").length,
      low: rawTasks.filter((t) => t.priority === "low").length,
    };

    return {
      stats,
      employees: rawEmployees.slice(0, 5),
      tasks: rawTasks.slice(0, 6),
      departments: rawDepartments,
      totalEmployees,
      activeEmployees,
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      completionRate,
      tasksByPriority,
    };
  }, [employeesData, tasksData, departmentsData]);

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
    userRole,
    initials,
    isLoggingOut,
    authError,
    handleLogout,
    handleChangeTheme,
    theme,
    greeting: getGreeting(),

    // Async states
    isLoading,
    isEmployeesLoading,
    isTasksLoading,
    isDepartmentsLoading,
    isError,
    refetchAll,

    // Processed Data
    ...dashboardData,
  };
};

export default useAdminDashboard;
