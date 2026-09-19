import React from "react";
import { useDepartments } from "../../hooks/useDepartment";
import DepartmentHeader from "../components/DepartmentHeader";
import DepartmentMetrics from "../components/DepartmentMetrics";
import DepartmentCard from "../components/DepartmentCard";
import DepartmentSkeleton from "../components/DepartmentSkeleton";
import DepartmentError from "../components/DepartmentError";
import { GitFork } from "lucide-react";

const Department = () => {
  const {
    metrics,
    departments,
    totalDepartmentsCount,
    totalEmployeesCount,
    viewMode,
    isLoading,
    isFetching,
    isError,
    error,
    handleRetry,
    handleSwitchMode,
  } = useDepartments();

  // Partition departments into Row 1 (first 3: Common, Developer, Designer) and Row 2 (Manager, Marketer)
  const firstRowDepartments = departments.slice(0, 3);
  const secondRowDepartments = departments.slice(3);

  const isShowingSkeleton = viewMode === "skeleton" || (isLoading && viewMode === "live");
  const isShowingError = viewMode === "error" || (isError && viewMode === "live");

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <DepartmentHeader
        totalDepartments={totalDepartmentsCount}
        totalEmployees={totalEmployeesCount}
      />

      {/* Top Compact Overview Stats */}
      {isShowingSkeleton ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-[var(--card)] rounded-xl p-4 md:p-5 border border-[var(--border)] h-24"
            />
          ))}
        </div>
      ) : (
        <DepartmentMetrics metrics={metrics} />
      )}

      {/* Interactive State Switcher / Section Header */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
          <GitFork className="w-4 h-4 text-[var(--primary)]" />
          <span>Department Directory Nodes ({totalDepartmentsCount})</span>
        </div>

        {/* Executive preview toggle bar */}
        <div className="inline-flex p-1 bg-[var(--surface)] rounded-xl border border-[var(--border)] text-xs font-medium self-start sm:self-auto shadow-[var(--shadow-sm)]">
          <button
            type="button"
            onClick={() => handleSwitchMode("live")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === "live"
                ? "bg-[var(--card)] text-[var(--text-primary)] font-semibold shadow-[var(--shadow-sm)] border border-[var(--border-subtle)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            Live Overview ({totalDepartmentsCount})
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode("skeleton")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === "skeleton"
                ? "bg-[var(--card)] text-[var(--text-primary)] font-semibold shadow-[var(--shadow-sm)] border border-[var(--border-subtle)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            Loading Skeleton
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode("error")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === "error"
                ? "bg-[var(--card)] text-[var(--text-primary)] font-semibold shadow-[var(--shadow-sm)] border border-[var(--border-subtle)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            Error State
          </button>
        </div>
      </div>

      {/* Main State Canvas */}
      {isShowingSkeleton ? (
        <DepartmentSkeleton />
      ) : isShowingError ? (
        <DepartmentError
          error={error}
          onRetry={handleRetry}
          isFetching={isFetching}
        />
      ) : (
        <div className="space-y-5">
          {/* Row 1: 3 Columns Grid (Common, Developer, Designer) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {firstRowDepartments.map((dept) => (
              <DepartmentCard key={dept.id} dept={dept} />
            ))}
          </div>

          {/* Row 2: 2 Columns Balanced Grid (Manager, Marketer) */}
          {secondRowDepartments.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {secondRowDepartments.map((dept) => (
                <DepartmentCard key={dept.id} dept={dept} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Department;
