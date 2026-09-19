import React, { useState } from "react";
import { useDepartments } from "../../hooks/useDepartment";
import DepartmentHeader from "../components/DepartmentHeader";
import DepartmentMetrics from "../components/DepartmentMetrics";
import DepartmentCard from "../components/DepartmentCard";
import DepartmentSkeleton from "../components/DepartmentSkeleton";
import { GitFork, RefreshCw, AlertCircle } from "lucide-react";

const Department = () => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useDepartments();
  const [viewMode, setViewMode] = useState("live"); // 'live' | 'skeleton' | 'error'

  const metrics = data?.metrics;
  const departments = data?.departments || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <DepartmentHeader
        totalDepartments={metrics?.configuredUnits || departments.length || 5}
        totalEmployees={metrics?.totalEmployees || 0}
      />

      {/* Top Metrics Cards */}
      {viewMode === "skeleton" || (isLoading && viewMode === "live") ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-5 h-24 bg-[var(--card)]" />
          ))}
        </div>
      ) : (
        <DepartmentMetrics metrics={metrics} />
      )}

      {/* Directory Section Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
        <div className="flex items-center gap-2 text-[var(--text-primary)]">
          <GitFork className="w-5 h-5 text-[var(--primary)]" />
          <h2 className="text-lg font-semibold tracking-tight">
            Department Directory Nodes ({departments.length || 5})
          </h2>
        </div>

        {/* View Switchers (Live Overview / Skeleton / Error State) */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("live")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              viewMode === "live"
                ? "bg-[var(--card)] text-[var(--text-primary)] shadow-sm font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Live Overview ({departments.length || 5})
          </button>
          <button
            type="button"
            onClick={() => setViewMode("skeleton")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              viewMode === "skeleton"
                ? "bg-[var(--card)] text-[var(--text-primary)] shadow-sm font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Loading Skeleton
          </button>
          <button
            type="button"
            onClick={() => setViewMode("error")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              viewMode === "error"
                ? "bg-[var(--card)] text-[var(--text-primary)] shadow-sm font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Error State
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "skeleton" || (isLoading && viewMode === "live") ? (
        <DepartmentSkeleton />
      ) : viewMode === "error" || isError ? (
        <div className="card p-8 text-center max-w-lg mx-auto my-8 border-red-500/20 bg-red-500/5">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
            Failed to Load Departments
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            {error?.response?.data?.message ||
              error?.message ||
              "An unexpected error occurred while communicating with the department service."}
          </p>
          <button
            type="button"
            onClick={() => {
              setViewMode("live");
              refetch();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold hover:bg-[var(--primary-hover)] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
            <span>Retry Connection</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <DepartmentCard key={dept.id} dept={dept} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Department;
