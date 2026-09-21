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
    isLoading,
    isFetching,
    isError,
    error,
    handleRetry,
  } = useDepartments();

  // Partition departments into Row 1 (first 3: Common, Developer, Designer) and Row 2 (Manager, Marketer)
  const firstRowDepartments = departments.slice(0, 3);
  const secondRowDepartments = departments.slice(3);

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6 lg:py-12 px-6 lg:px-12">
      {/* Header */}
      <DepartmentHeader
        totalDepartments={totalDepartmentsCount}
        totalEmployees={totalEmployeesCount}
      />

      {/* Top Compact Overview Stats */}
      {isLoading ? (
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

      {/* Section Header */}
      <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider pb-1">
        <GitFork className="w-4 h-4 text-[var(--primary)]" />
        <span>Department Directory Nodes ({totalDepartmentsCount})</span>
      </div>

      {/* Main State Canvas */}
      {isLoading ? (
        <DepartmentSkeleton />
      ) : isError ? (
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

