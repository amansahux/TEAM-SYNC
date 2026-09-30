import React from "react";
import useEmployeeDashboard from "../../hooks/useEmployeeDashboard";
import EmployeeDashboardHeader from "../components/EmployeeDashboardHeader";
import EmployeeStatsGrid from "../components/EmployeeStatsGrid";
import EmployeeTasksWidget from "../components/EmployeeTasksWidget";
import EmployeeProfileWidget from "../components/EmployeeProfileWidget";
import { RefreshCw, AlertCircle } from "lucide-react";

const EmployeeDashboard = () => {
  const {
    employeeName,
    userEmail,
    userDepartment,
    userDesignation,
    userStatus,
    initials,
    greeting,
    stats,
    tasks,
    activeTasks,
    totalTasks,
    completedTasks,
    completionRate,
    isLoading,
    isError,
    refetch,
    handleQuickStatusChange,
    isUpdatingStatus,
  } = useEmployeeDashboard();

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
      {/* 1. Header Section */}
      <EmployeeDashboardHeader
        greeting={greeting}
        employeeName={employeeName}
        userDepartment={userDepartment}
        userDesignation={userDesignation}
        onRefresh={refetch}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-6 h-96 bg-[var(--border-subtle)]" />
            <div className="card p-6 h-96 bg-[var(--border-subtle)]" />
          </div>
        </div>
      ) : isError ? (
        <div className="card p-8 text-center space-y-4 border-[var(--danger)]/30">
          <div className="w-12 h-12 rounded-full bg-[var(--danger-light)] text-[var(--danger)] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Unable to sync workspace
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              There was an issue fetching your personal tasks and metrics.
            </p>
          </div>
          <button
            type="button"
            onClick={refetch}
            className="btn-primary inline-flex items-center gap-2 text-xs font-semibold py-2 px-4 rounded-xl cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 3. Stat Cards */}
          <EmployeeStatsGrid stats={stats} />

          {/* 4. Split Section: Tasks Board (2 col) + Member Profile & Performance (1 col) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EmployeeTasksWidget
                tasks={activeTasks.length > 0 ? activeTasks : tasks.slice(0, 5)}
                onQuickStatusChange={handleQuickStatusChange}
                isUpdatingStatus={isUpdatingStatus}
              />
            </div>
            <div>
              <EmployeeProfileWidget
                employeeName={employeeName}
                userEmail={userEmail}
                userDepartment={userDepartment}
                userDesignation={userDesignation}
                userStatus={userStatus}
                initials={initials}
                completionRate={completionRate}
                completedTasks={completedTasks}
                totalTasks={totalTasks}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;