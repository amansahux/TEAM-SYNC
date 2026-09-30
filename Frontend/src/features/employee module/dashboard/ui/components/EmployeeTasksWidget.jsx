import React from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, Calendar, CheckCircle2, ChevronRight } from "lucide-react";

const getPriorityBadge = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--danger)] bg-[var(--danger-light)] border border-[var(--danger)]/20 px-2 py-0.5 rounded">
          High Priority
        </span>
      );
    case "medium":
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--warning)] bg-[var(--warning-light)] border border-[var(--warning)]/20 px-2 py-0.5 rounded">
          Medium
        </span>
      );
    case "low":
    default:
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--surface-hover)] border border-[var(--border)] px-2 py-0.5 rounded">
          Low
        </span>
      );
  }
};

const EmployeeTasksWidget = ({
  tasks = [],
  onQuickStatusChange,
  isUpdatingStatus,
}) => {
  return (
    <div className="card p-5 sm:p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-4">
          <div>
            <h3 className="text-base font-display font-bold text-[var(--text-primary)]">
              Assigned Tasks & Action Items
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Deliverables awaiting your execution or update
            </p>
          </div>
          <Link
            to="/dashboard/my-task"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
          >
            <span>Full Task Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
              All caught up!
            </h4>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              You have no active pending tasks right now.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => {
              const dueDate = task.dueDate || task.deadline;
              const formattedDate = dueDate
                ? new Date(dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "No deadline";

              const isCompleted = task.status === "completed";
              const isInProgress = task.status === "in_progress";

              return (
                <div
                  key={task._id}
                  className="group p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to={`/dashboard/my-task/${task._id}`}
                        className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors line-clamp-1"
                      >
                        {task.title}
                      </Link>
                      {getPriorityBadge(task.priority)}
                    </div>
                    {task.description && (
                      <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-[11px] text-[var(--text-secondary)] font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[var(--text-muted)]" />
                        Due {formattedDate}
                      </span>
                      <span>•</span>
                      <span className="capitalize">Status: {task.status.replace("_", " ")}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border-subtle)]">
                    <select
                      value={task.status}
                      disabled={isUpdatingStatus}
                      onChange={(e) => onQuickStatusChange(task._id, e.target.value)}
                      className="text-xs font-semibold rounded-lg bg-[var(--card)] border border-[var(--border)] px-2.5 py-1.5 text-[var(--text-primary)] outline-none focus:border-[var(--primary)] cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>

                    <Link
                      to={`/dashboard/my-task/${task._id}`}
                      className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      title="View Task Details"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTasksWidget;
