import React from "react";
import { useEmployeeTasks } from "../../hooks/useTask";
import EmployeeTaskHeader from "../components/EmployeeTaskHeader";
import EmployeeTaskFilters from "../components/EmployeeTaskFilters";
import EmployeeTaskCard from "../components/EmployeeTaskCard";
import TaskMetrics from "../../../admin module/tasks/ui/components/TaskMetrics";
import TaskSkeleton from "../../../admin module/tasks/ui/components/TaskSkeleton";
import TaskError from "../../../admin module/tasks/ui/components/TaskError";
import TaskPagination from "../../../admin module/tasks/ui/components/TaskPagination";
import { ClipboardCheck } from "lucide-react";

const MyTask = () => {
  const {
    tasks,
    metrics,
    pagination,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
    page,
    setPage,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    handleStatusChange,
  } = useEmployeeTasks();

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6 lg:py-12 px-6 lg:px-12">
      {/* Header */}
      <EmployeeTaskHeader
        totalTasks={metrics.total}
        completionRate={metrics.completionRate}
      />

      {/* Main State Canvas */}
      {isLoading ? (
        <TaskSkeleton />
      ) : isError ? (
        <TaskError error={error} onRetry={refetch} isFetching={isFetching} />
      ) : (
        <div className="space-y-6">
          {/* Metrics summary */}
          <TaskMetrics metrics={metrics} />

          {/* Filters */}
          <EmployeeTaskFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />

          {/* Task Grid or Empty State */}
          {tasks.length === 0 ? (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 text-center shadow-[var(--shadow-sm)]">
              <div className="w-14 h-14 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--text-muted)]">
                <ClipboardCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-semibold text-[var(--text-primary)]">
                No assignments found
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1.5 max-w-md mx-auto">
                You have no tasks assigned matching your current search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {tasks.map((task) => (
                  <EmployeeTaskCard
                    key={task._id}
                    task={task}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>

              {/* Pagination */}
              <TaskPagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                totalItems={pagination.total}
                limit={pagination.limit}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyTask;
