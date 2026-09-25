import React from "react";
import { useParams, Link } from "react-router";
import { useEmployeeTaskDetail } from "../../hooks/useTask";
import TaskError from "../../../admin module/tasks/ui/components/TaskError";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  CircleDot,
  Building,
  Flag,
  Sparkles,
  FileText,
} from "lucide-react";

// Priority badge configuration
const PRIORITY_BADGES = {
  high: {
    label: "High Priority",
    bg: "bg-[var(--danger-light)]",
    text: "text-[var(--danger)]",
    border: "border-[var(--danger)]/30",
    dot: "bg-[var(--danger)]",
  },
  medium: {
    label: "Medium Priority",
    bg: "bg-[var(--warning-light)]",
    text: "text-[var(--warning)]",
    border: "border-[var(--warning)]/30",
    dot: "bg-[var(--warning)]",
  },
  low: {
    label: "Low Priority",
    bg: "bg-[#6B7280]/15",
    text: "text-[#9CA3AF]",
    border: "border-[#6B7280]/30",
    dot: "bg-[#9CA3AF]",
  },
};

const STATUS_CONFIG = {
  todo: {
    label: "To-Do (Queued)",
    icon: CircleDot,
    bg: "bg-[#6B7280]/15",
    text: "text-[#D1D5DB]",
    border: "border-[#6B7280]/30",
  },
  "in-progress": {
    label: "In Progress (Active)",
    icon: Clock,
    bg: "bg-[#60A5FA]/15",
    text: "text-[#60A5FA]",
    border: "border-[#60A5FA]/30",
  },
  completed: {
    label: "Completed (Delivered)",
    icon: CheckCircle2,
    bg: "bg-[var(--primary)]/15",
    text: "text-[var(--primary)]",
    border: "border-[var(--primary)]/30",
  },
};

const TaskDetail = () => {
  const { id } = useParams();
  const {
    task,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
    handleStatusChange,
    isUpdatingStatus,
  } = useEmployeeTaskDetail(id);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-6 lg:py-12 px-6 lg:px-12 animate-pulse">
        <div className="h-6 w-32 bg-[var(--surface-hover)] rounded" />
        <div className="h-10 w-3/4 bg-[var(--surface-hover)] rounded" />
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl h-80" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto py-6 lg:py-12 px-6 lg:px-12">
        <TaskError error={error} onRetry={refetch} isFetching={isFetching} />
      </div>
    );
  }

  if (!task) {
    return null;
  }

  const priority = PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.medium;
  const status = STATUS_CONFIG[task.status] || STATUS_CONFIG.todo;
  const assignedBy = task.assignedBy || {};
  const assignedTo = task.assignedTo || {};

  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No deadline specified";

  const formattedCreatedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 lg:py-12 px-6 lg:px-12">
      {/* Header & Back Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border)]">
        <div>
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase mb-1">
            <Link
              to="/dashboard/my-task"
              className="hover:text-[var(--primary)] transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>My Tasks</span>
            </Link>
            <span className="text-[var(--text-disabled)]">/</span>
            <span className="text-[var(--primary)] font-semibold">
              Task #{task._id.slice(-6).toUpperCase()}
            </span>
          </nav>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-[var(--text-primary)] tracking-tight leading-tight">
            {task.title}
          </h1>
        </div>

        <Link
          to="/dashboard/my-task"
          className="btn-outline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl self-start md:self-auto cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assignments</span>
        </Link>
      </div>

      {/* Main Content Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scope & Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-[var(--shadow-sm)] space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] pb-2 border-b border-[var(--border-subtle)]">
              <FileText className="w-4 h-4 text-[var(--primary)]" />
              <span>Assignment Scope &amp; Details</span>
            </div>

            <div className="prose prose-invert max-w-none text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
              {task.description ? (
                <p className="whitespace-pre-line">{task.description}</p>
              ) : (
                <p className="italic text-[var(--text-muted)]">
                  No additional written specifications were provided for this task.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Status Switcher & Meta sidebar */}
        <div className="space-y-6">
          {/* Status Control Card */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-[var(--shadow-sm)] space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Update Delivery Status
            </div>

            <div className="space-y-2">
              {["todo", "in-progress", "completed"].map((stKey) => {
                const conf = STATUS_CONFIG[stKey];
                const Icon = conf.icon;
                const isSelected = task.status === stKey;

                return (
                  <button
                    key={stKey}
                    type="button"
                    onClick={() => handleStatusChange(stKey)}
                    disabled={isUpdatingStatus}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? `${conf.bg} ${conf.text} ${conf.border} ring-1 ring-[var(--primary)]/40`
                        : "bg-[var(--input)] text-[var(--text-secondary)] border-[var(--input-border)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{conf.label}</span>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logistics Metadata Card */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-[var(--shadow-sm)] space-y-4 text-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] pb-2 border-b border-[var(--border-subtle)]">
              Logistics &amp; Attribution
            </div>

            {/* Priority */}
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-[var(--warning)]" />
                Priority
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold tracking-wide uppercase border ${priority.bg} ${priority.text} ${priority.border}`}
              >
                {priority.label}
              </span>
            </div>

            {/* Due Date */}
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--secondary)]" />
                Due Date
              </span>
              <span className="text-[var(--text-primary)] font-medium">
                {formattedDueDate}
              </span>
            </div>

            {/* Assigned By */}
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[var(--secondary)]" />
                Assigned By
              </span>
              <span className="text-[var(--text-primary)] font-medium">
                {assignedBy.name || "Administrator"}
              </span>
            </div>

            {/* Assigned Date */}
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--secondary)]" />
                Assigned On
              </span>
              <span className="text-[var(--text-primary)] font-medium">
                {formattedCreatedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;