import React from "react";
import { Link } from "react-router";
import {
  Calendar,
  User,
  CheckCircle,
  Clock,
  CircleDot,
  ArrowRight,
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
    label: "Medium",
    bg: "bg-[var(--warning-light)]",
    text: "text-[var(--warning)]",
    border: "border-[var(--warning)]/30",
    dot: "bg-[var(--warning)]",
  },
  low: {
    label: "Low",
    bg: "bg-[#6B7280]/15",
    text: "text-[#9CA3AF]",
    border: "border-[#6B7280]/30",
    dot: "bg-[#9CA3AF]",
  },
};

// Status badge & styling configuration
const STATUS_CONFIG = {
  todo: {
    label: "To-Do",
    icon: CircleDot,
    bg: "bg-[#6B7280]/15",
    text: "text-[#D1D5DB]",
    border: "border-[#6B7280]/30",
    hairline: "bg-[#6B7280]",
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    bg: "bg-[#60A5FA]/15",
    text: "text-[#60A5FA]",
    border: "border-[#60A5FA]/30",
    hairline: "bg-[#60A5FA]",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    bg: "bg-[var(--primary)]/15",
    text: "text-[var(--primary)]",
    border: "border-[var(--primary)]/30",
    hairline: "bg-[var(--primary)]",
  },
};

const EmployeeTaskCard = ({ task, onStatusChange }) => {
  const priority = PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.medium;
  const status = STATUS_CONFIG[task.status] || STATUS_CONFIG.todo;
  const assignedBy = task.assignedBy || {};

  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No due date";

  return (
    <div className="group relative bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl p-5 md:p-6 transition-all duration-200 flex flex-col justify-between shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]">
      {/* Top Accent Hairline */}
      <div
        className={`absolute top-0 left-6 right-6 h-[2px] ${status.hairline} rounded-t-full opacity-60 group-hover:opacity-100 transition-opacity`}
      />

      <div className="space-y-4">
        {/* Header Badges & Interactive Status selector */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase border ${priority.bg} ${priority.text} ${priority.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
            {priority.label}
          </span>

          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md border ${status.bg} ${status.text} ${status.border} cursor-pointer focus:outline-none bg-transparent`}
          >
            <option value="todo" className="bg-[var(--card)] text-[var(--text-primary)]">
              To-Do
            </option>
            <option value="in-progress" className="bg-[var(--card)] text-[var(--text-primary)]">
              In Progress
            </option>
            <option value="completed" className="bg-[var(--card)] text-[var(--text-primary)]">
              Completed
            </option>
          </select>
        </div>

        {/* Title and Excerpt */}
        <div>
          <Link
            to={`/dashboard/my-task/${task._id}`}
            className="text-base md:text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors tracking-tight leading-snug line-clamp-2 block"
          >
            {task.title}
          </Link>
          {task.description ? (
            <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-1.5 line-clamp-3 leading-relaxed">
              {task.description}
            </p>
          ) : (
            <p className="text-xs text-[var(--text-muted)] mt-1.5 italic">
              No additional instructions attached.
            </p>
          )}
        </div>
      </div>

      {/* Footer Details: Assigned by admin + Due date + Detail link */}
      <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
          <User className="w-3.5 h-3.5 text-[var(--secondary)] shrink-0" />
          <span className="truncate">
            By: <strong className="text-[var(--text-primary)] font-medium">{assignedBy.name || "Admin"}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <Calendar className="w-3.5 h-3.5 text-[var(--secondary)]" />
            <span className="text-[11px] font-medium">{formattedDueDate}</span>
          </div>

          <Link
            to={`/dashboard/my-task/${task._id}`}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-hover)] transition-colors"
            title="Inspect Details"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTaskCard;
