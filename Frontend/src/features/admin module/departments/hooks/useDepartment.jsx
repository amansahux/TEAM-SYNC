import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../apis/departments.api";

// Department specific theme presets aligned with Stitch design tokens
const DEPARTMENT_THEMES = {
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

export const useDepartments = () => {
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
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
    isFetching,
    isError,
    error,

    // Actions & Handlers
    handleRetry,
    refetch,
  };
};
