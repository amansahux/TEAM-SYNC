import React from "react";
import useAdminDashboard from "../../hooks/useAdminDashboard";
import AdminDashboardHeader from "../components/AdminDashboardHeader";
import AdminStatsGrid from "../components/AdminStatsGrid";
import RecentTasksWidget from "../components/RecentTasksWidget";
import RecentEmployeesWidget from "../components/RecentEmployeesWidget";
import DepartmentDistributionWidget from "../components/DepartmentDistributionWidget";
import AdminQuickActions from "../components/AdminQuickActions";
import { RefreshCw, AlertCircle } from "lucide-react";

const AdminDashboard = () => {
  const {
    employeeName,
    greeting,
    stats,
    tasks,
    employees,
    departments,
    totalEmployees,
    completionRate,
    isLoading,
    isError,
    refetchAll,
  } = useAdminDashboard();

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
      {/* 1. Header Section */}
      <AdminDashboardHeader
        greeting={greeting}
        employeeName={employeeName}
        totalEmployees={totalEmployees}
        completionRate={completionRate}
        onRefresh={refetchAll}
        isRefreshing={isLoading}
      />

      {/* 2. Loading / Error / Content */}
      {isLoading ? (
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="card p-6 h-32 bg-[var(--border-subtle)]" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6 h-80 bg-[var(--border-subtle)]" />
            <div className="card p-6 h-80 bg-[var(--border-subtle)]" />
          </div>
          <div className="card p-6 h-48 bg-[var(--border-subtle)]" />
        </div>
      ) : isError ? (
        <div className="card p-8 text-center space-y-4 border-[var(--danger)]/30">
          <div className="w-12 h-12 rounded-full bg-[var(--danger-light)] text-[var(--danger)] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Unable to sync admin data
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              There was an issue fetching the latest workforce telemetry.
            </p>
          </div>
          <button
            type="button"
            onClick={refetchAll}
            className="btn-primary inline-flex items-center gap-2 text-xs font-semibold py-2 px-4 rounded-xl cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 3. Stat Cards */}
          <AdminStatsGrid stats={stats} />

          {/* 4. Quick Actions */}
          <AdminQuickActions />

          {/* 5. Split Section: Tasks & Employees */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentTasksWidget tasks={tasks} />
            <RecentEmployeesWidget employees={employees} />
          </div>

          {/* 6. Department Health & Breakdown */}
          <DepartmentDistributionWidget departments={departments} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;