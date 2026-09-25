import React from "react";
import { useTask } from "../../hooks/useTask";
import TaskHeader from "../components/TaskHeader";
import TaskMetrics from "../components/TaskMetrics";
import TaskFilters from "../components/TaskFilters";
import TaskCard from "../components/TaskCard";
import TaskSkeleton from "../components/TaskSkeleton";
import TaskError from "../components/TaskError";
import TaskPagination from "../components/TaskPagination";
import EditTaskModal from "../components/EditTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";
import { ClipboardList, Plus } from "lucide-react";
import { Link } from "react-router";

const Task = () => {
  const {
    tasks,
    metrics,
    pagination,
    employees,
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
    assignedToFilter,
    setAssignedToFilter,
    selectedTask,
    isEditModalOpen,
    handleOpenEdit,
    handleCloseEdit,
    taskToDelete,
    isDeleteModalOpen,
    handleOpenDelete,
    handleCloseDelete,
    handleConfirmDelete,
    updateTaskMutation,
    handleQuickStatusChange,
    isDeleting,
    isUpdating,
  } = useTask();

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-6 lg:py-12 px-6 lg:px-12">
      {/* Header */}
      <TaskHeader
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
          {/* Top Metric Cards */}
          <TaskMetrics metrics={metrics} />

          {/* Filtering and Search Controls */}
          <TaskFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            assignedToFilter={assignedToFilter}
            setAssignedToFilter={setAssignedToFilter}
            employees={employees}
          />

          {/* Task Grid or Empty State */}
          {tasks.length === 0 ? (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 text-center shadow-[var(--shadow-sm)]">
              <div className="w-14 h-14 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4 text-[var(--text-muted)]">
                <ClipboardList className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display font-semibold text-[var(--text-primary)]">
                No tasks match your criteria
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1.5 max-w-md mx-auto">
                No active task deliverables found under the selected filters or search query.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  to="/dashboard/create-task"
                  className="btn-primary inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create First Task</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onOpenEdit={handleOpenEdit}
                    onOpenDelete={handleOpenDelete}
                    onQuickStatusChange={handleQuickStatusChange}
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

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        task={selectedTask}
        employees={employees}
        onSave={({ taskId, taskData }) => {
          updateTaskMutation.mutate({ taskId, taskData });
        }}
        isSaving={isUpdating}
      />

      {/* Delete Confirmation Modal */}
      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDelete}
        task={taskToDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Task;
