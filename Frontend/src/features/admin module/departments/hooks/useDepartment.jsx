import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDepartments, getDepartmentDetail } from "../apis/departments.api";

// Department specific theme presets aligned with design tokens
export const DEPARTMENT_THEMES = {
  common: {
    accentColor: "#6B7280",
    hairlineClass: "bg-[#6B7280]",
    iconBgClass: "bg-[#6B7280]/10 text-[#9CA3AF] border-[#6B7280]/25 group-hover:bg-[#6B7280]/20",
    progressBarClass: "bg-[#6B7280]",
    hoverBorder: "hover:border-[#6B7280]/40",
    clusterLabel: "Cluster Alpha",
  },
  developer: {
    accentColor: "var(--primary)",
    hairlineClass: "bg-[var(--primary)]",
    iconBgClass: "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/25 group-hover:bg-[var(--primary)]/20",
    progressBarClass: "bg-[var(--primary)]",
    hoverBorder: "hover:border-[var(--primary)]/40",
    clusterLabel: "Primary Engineering",
  },
  designer: {
    accentColor: "var(--secondary)",
    hairlineClass: "bg-[var(--secondary)]",
    iconBgClass: "bg-[var(--secondary)]/15 text-[var(--secondary)] border-[var(--secondary)]/30 group-hover:bg-[var(--secondary)]/25",
    progressBarClass: "bg-[var(--secondary)]",
    hoverBorder: "hover:border-[var(--secondary)]/40",
    clusterLabel: "Creative Suite",
  },
  manager: {
    accentColor: "#4B6B94",
    hairlineClass: "bg-[#4B6B94]",
    iconBgClass: "bg-[#4B6B94]/15 text-[#60A5FA] border-[#4B6B94]/30 group-hover:bg-[#4B6B94]/25",
    progressBarClass: "bg-[#4B6B94]",
    hoverBorder: "hover:border-[#4B6B94]/40",
    clusterLabel: "Leadership Node",
  },
  marketer: {
    accentColor: "#B46E46",
    hairlineClass: "bg-[#B46E46]",
    iconBgClass: "bg-[#B46E46]/15 text-[#FB923C] border-[#B46E46]/30 group-hover:bg-[#B46E46]/25",
    progressBarClass: "bg-[#B46E46]",
    hoverBorder: "hover:border-[#B46E46]/40",
    clusterLabel: "Outreach Division",
  },
};

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
 */
export const useDepartmentDetail = (department) => {
  const normalizedDept = department?.toLowerCase();

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

  return {
    data,
    metrics,
    employees,
    activeEmployees,
    inactiveEmployees,
    totalEmployeesCount,
    activeEmployeesCount,
    theme,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,
    handleRetry,
    refetch,
    handleExport,
  };
};

// Default alias export for convenience
export const useDepartment = useDepartmentDetail;
export default useDepartments;
