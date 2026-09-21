import { useMemo, useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDepartments, getDepartmentDetail } from "../apis/departments.api";
import { toggleEmployeeStatus, deleteEmployee, updateEmployee } from "../../employees/apis/employees.api";

// Department specific theme presets aligned with design tokens
export const DEPARTMENT_THEMES = {
  common: {
    accentColor: "#6B7280",
    hairlineClass: "bg-[#6B7280]",
    iconBgClass: "bg-[#6B7280]/10 text-[#9CA3AF] border-[#6B7280]/25 group-hover:bg-[#6B7280]/20",
    progressBarClass: "bg-[#6B7280]",
    hoverBorder: "hover:border-[#6B7280]/40",
    clusterLabel: "Cluster Alpha",
    icon: "Network",
    description: "General enterprise pool, shared operations, and unassigned personnel.",
  },
  developer: {
    accentColor: "var(--primary)",
    hairlineClass: "bg-[var(--primary)]",
    iconBgClass: "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/25 group-hover:bg-[var(--primary)]/20",
    progressBarClass: "bg-[var(--primary)]",
    hoverBorder: "hover:border-[var(--primary)]/40",
    clusterLabel: "Primary Engineering",
    icon: "Terminal",
    description: "Manage and view employees in the Developer department.",
  },
  designer: {
    accentColor: "var(--secondary)",
    hairlineClass: "bg-[var(--secondary)]",
    iconBgClass: "bg-[var(--secondary)]/15 text-[var(--secondary)] border-[var(--secondary)]/30 group-hover:bg-[var(--secondary)]/25",
    progressBarClass: "bg-[var(--secondary)]",
    hoverBorder: "hover:border-[var(--secondary)]/40",
    clusterLabel: "Creative Suite",
    icon: "Palette",
    description: "Creative systems, UI/UX architecture and visual experience design.",
  },
  manager: {
    accentColor: "#4B6B94",
    hairlineClass: "bg-[#4B6B94]",
    iconBgClass: "bg-[#4B6B94]/15 text-[#60A5FA] border-[#4B6B94]/30 group-hover:bg-[#4B6B94]/25",
    progressBarClass: "bg-[#4B6B94]",
    hoverBorder: "hover:border-[#4B6B94]/40",
    clusterLabel: "Leadership Node",
    icon: "Building2",
    description: "Resource governance, sprint alignment, and cross-functional leadership.",
  },
  marketer: {
    accentColor: "#B46E46",
    hairlineClass: "bg-[#B46E46]",
    iconBgClass: "bg-[#B46E46]/15 text-[#FB923C] border-[#B46E46]/30 group-hover:bg-[#B46E46]/25",
    progressBarClass: "bg-[#B46E46]",
    hoverBorder: "hover:border-[#B46E46]/40",
    clusterLabel: "Outreach Division",
    icon: "Megaphone",
    description: "Growth strategy, product positioning, and institutional communications.",
  },
};

export const DEPARTMENT_LIST = ["developer", "designer", "manager", "marketer", "common"];

/**
 * Hook to fetch and compute aggregate data for all departments
 */
export const useDepartments = () => {
  const { data, isLoading, isPending, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["admin", "departments"],
    queryFn: getDepartments,
    staleTime: 60 * 1000,
  });

  // Enriched business data calculations
  const { metrics, departments, totalDepartmentsCount, totalEmployeesCount } =
    useMemo(() => {
      const rawMetrics = data?.metrics || {};
      const rawDepartments = data?.departments || [];

      const totalEmployees = rawMetrics.totalEmployees || 0;
      const activeEmployees = rawMetrics.activeEmployees || 0;
      const newThisMonth = rawMetrics.newThisMonth ?? 0;
      const configuredUnits = rawMetrics.configuredUnits || rawDepartments.length || 5;
      const averageTeamSize =
        rawMetrics.averageTeamSize ||
        (configuredUnits > 0 ? (totalEmployees / configuredUnits).toFixed(1) : "0.0");
      const activeRate =
        rawMetrics.activeRate ||
        (totalEmployees > 0 ? `${((activeEmployees / totalEmployees) * 100).toFixed(1)}%` : "0.0%");

      const formattedMetrics = {
        totalEmployees,
        newThisMonth,
        activeEmployees,
        activeRate,
        configuredUnits,
        averageTeamSize,
      };

      const enrichedDepartments = rawDepartments.map((dept) => {
        const theme = DEPARTMENT_THEMES[dept.id] || DEPARTMENT_THEMES.common;
        const membersCount = dept.membersCount || 0;
        const activeCount = dept.activeCount || 0;
        const percentage =
          membersCount > 0 ? Math.min(100, Math.round((activeCount / membersCount) * 100)) : 0;

        return {
          ...dept,
          theme,
          membersCount,
          activeCount,
          percentage,
          onlineRatio: dept.onlineRatio || `${percentage}%`,
          staffAllocationRatio: `${activeCount} / ${membersCount}`,
          cluster: dept.cluster || theme.clusterLabel,
          path: dept.path || `/departments/${dept.id.toLowerCase()}`,
        };
      });

      return {
        metrics: formattedMetrics,
        departments: enrichedDepartments,
        totalDepartmentsCount: configuredUnits,
        totalEmployeesCount: totalEmployees,
      };
    }, [data]);

  const handleRetry = () => {
    refetch();
  };

  return {
    // Data & state
    metrics,
    departments,
    totalDepartmentsCount,
    totalEmployeesCount,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,

    // Actions & Handlers
    handleRetry,
    refetch,
  };
};

/**
 * Hook to fetch detailed data, metrics, and member lists for a specific department
 * Includes mutations for employee actions (edit, delete, toggle status)
 */
export const useDepartmentDetail = (department) => {
  const normalizedDept = department?.toLowerCase();
  const queryClient = useQueryClient();

  // --- Local UI State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // --- Core Query ---
  const {
    data,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin", "department", normalizedDept],
    queryFn: () => getDepartmentDetail(normalizedDept),
    enabled: Boolean(normalizedDept),
    staleTime: 60 * 1000,
  });

  const theme = DEPARTMENT_THEMES[normalizedDept] || DEPARTMENT_THEMES.common;

  // --- Computed Data ---
  const {
    metrics,
    employees,
    activeEmployees,
    inactiveEmployees,
    totalEmployeesCount,
    activeEmployeesCount,
  } = useMemo(() => {
    const rawMetrics = data?.metrics || {};
    const rawEmployees = data?.employees || [];

    const totalEmployees = rawMetrics.totalEmployees ?? rawEmployees.length;
    const activeEmployeesList = rawEmployees.filter((emp) => emp.status === "active");
    const inactiveEmployeesList = rawEmployees.filter((emp) => emp.status === "inactive");

    const activeCount = rawMetrics.activeEmployees ?? activeEmployeesList.length;
    const inactiveCount = rawMetrics.inactiveEmployees ?? inactiveEmployeesList.length;
    const activeRate =
      rawMetrics.activeRate ||
      (totalEmployees > 0 ? `${((activeCount / totalEmployees) * 100).toFixed(1)}%` : "0.0%");

    const formattedMetrics = {
      totalEmployees,
      activeEmployees: activeCount,
      inactiveEmployees: inactiveCount,
      activeRate: typeof activeRate === "number" ? `${activeRate}%` : activeRate,
      configuredUnits: rawMetrics.configuredUnits ?? totalEmployees,
      averageTeamSize: rawMetrics.averageTeamSize ?? (totalEmployees > 0 ? "1.0" : "0.0"),
    };

    return {
      metrics: formattedMetrics,
      employees: rawEmployees,
      activeEmployees: activeEmployeesList,
      inactiveEmployees: inactiveEmployeesList,
      totalEmployeesCount: totalEmployees,
      activeEmployeesCount: activeCount,
    };
  }, [data]);

  // --- Filtered Employees (search + status filter) ---
  const filteredEmployees = useMemo(() => {
    let result = employees;

    if (statusFilter !== "ALL") {
      result = result.filter(
        (emp) => emp.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (emp) =>
          emp.name?.toLowerCase().includes(q) ||
          emp.email?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [employees, searchQuery, statusFilter]);

  // --- Invalidation helper ---
  const invalidateDeptQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["admin", "department", normalizedDept] });
    queryClient.invalidateQueries({ queryKey: ["admin", "departments"] });
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  }, [queryClient, normalizedDept]);

  // --- Mutations ---
  const toggleStatusMutation = useMutation({
    mutationFn: ({ employeeId, status }) => toggleEmployeeStatus(employeeId, status),
    onSuccess: invalidateDeptQueries,
    onError: (err) => {
      console.error(err?.response?.data?.message || "Failed to toggle status");
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: (employeeId) => deleteEmployee(employeeId),
    onSuccess: invalidateDeptQueries,
    onError: (err) => {
      console.error(err?.response?.data?.message || "Failed to delete employee");
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: ({ employeeId, ...data }) => updateEmployee(employeeId, data),
    onSuccess: () => {
      invalidateDeptQueries();
      setEditModalOpen(false);
      setEditingEmployee(null);
    },
    onError: (err) => {
      console.error(err?.response?.data?.message || "Failed to update employee");
    },
  });

  // --- Action Handlers ---
  const handleToggleStatus = useCallback((emp) => {
    const newStatus = emp.status === "active" ? "inactive" : "active";
    toggleStatusMutation.mutate({ employeeId: emp._id, status: newStatus });
  }, [toggleStatusMutation]);

  const handleDeleteEmployee = useCallback((emp) => {
    if (window.confirm(`Are you sure you want to delete ${emp.name}?`)) {
      deleteEmployeeMutation.mutate(emp._id);
    }
  }, [deleteEmployeeMutation]);

  const handleOpenEditModal = useCallback((emp) => {
    setEditingEmployee(emp);
    setEditModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditModalOpen(false);
    setEditingEmployee(null);
  }, []);

  const handleRetry = () => {
    refetch();
  };

  const handleExport = (exportList = employees) => {
    if (!exportList || exportList.length === 0) {
      alert("No employee data to export.");
      return;
    }
    const dataStr = JSON.stringify(exportList, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${normalizedDept || "department"}_employees_export_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setStatusFilter("ALL");
  }, []);

  return {
    // Data
    data,
    metrics,
    employees,
    filteredEmployees,
    activeEmployees,
    inactiveEmployees,
    totalEmployeesCount,
    activeEmployeesCount,
    theme,

    // Query states
    isLoading,
    isPending,
    isFetching,
    isError,
    error,

    // Filters
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    handleClearFilters,

    // Edit modal state
    editModalOpen,
    editingEmployee,
    handleOpenEditModal,
    handleCloseEditModal,

    // Mutations
    toggleStatusMutation,
    deleteEmployeeMutation,
    updateEmployeeMutation,

    // Action handlers
    handleToggleStatus,
    handleDeleteEmployee,

    // Utility
    handleRetry,
    refetch,
    handleExport,
  };
};

// Default alias export for convenience
export const useDepartment = useDepartmentDetail;
export default useDepartments;
