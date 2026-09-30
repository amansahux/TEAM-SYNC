import React from "react";
import { Link } from "react-router";
import { ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--success)] bg-[var(--success-light)] px-2.5 py-0.5 rounded-md">
          <CheckCircle2 className="w-3 h-3" />
          Completed
        </span>
      );
    case "in_progress":
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--info)] bg-[var(--info-light)] px-2.5 py-0.5 rounded-md">
          <Clock className="w-3 h-3 animate-pulse" />
          In Progress
        </span>
      );
    case "pending":
    default:
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--warning)] bg-[var(--warning-light)] px-2.5 py-0.5 rounded-md">
          <AlertCircle className="w-3 h-3" />
          Pending
        </span>
      );
  }
};

const getPriorityBadge = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--danger)] bg-[var(--danger-light)] border border-[var(--danger)]/20 px-2 py-0.5 rounded">
          High
        </span>
      );
    case "medium":
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--warning)] bg-[var(--warning-light)] border border-[var(--warning)]/20 px-2 py-0.5 rounded">
          Med
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

const RecentTasksWidget = ({ tasks = [] }) => {
  return (
    <div className="card p-5 sm:p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-4">
          <div>
            <h3 className="text-base font-display font-bold text-[var(--text-primary)]">
              Active Deliverables
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Latest tasks across departments and personnel
            </p>
          </div>
          <Link
            to="/dashboard/task"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {tasks.length === 0 ? (
          <div className="py-8 text-center text-xs text-[var(--text-muted)]">
            No active deliverables currently recorded.
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => {
              const assignedPerson =
                task.assignedTo?.name ||
                task.assignedTo?.user?.name ||
                "Unassigned";

              const dueDate = task.dueDate || task.deadline;
              const formattedDate = dueDate
                ? new Date(dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "No deadline";

              return (
                <div
                  key={task._id}
                  className="group p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border)] transition-all flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--primary)] transition-colors">
                        {task.title}
                      </span>
                      {getPriorityBadge(task.priority)}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
                      <span>Assigned: {assignedPerson}</span>
                      <span>•</span>
                      <span>Due {formattedDate}</span>
                    </div>
                  </div>

                  <div className="shrink-0">{getStatusBadge(task.status)}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTasksWidget;
