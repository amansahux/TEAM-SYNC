import React from "react";
import { CheckSquare } from "lucide-react";

const EmployeeTaskHeader = ({ totalTasks = 0, completionRate = "0%" }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border)]">
      <div>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase mb-1">
          <span>Personal Workspace</span>
          <span className="text-[var(--text-disabled)]">/</span>
          <span className="text-[var(--primary)] font-semibold">My Tasks</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-[var(--text-primary)] tracking-tight leading-tight">
          My Assignments
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
          Review designated milestones, update task delivery status, and track your active sprints.
        </p>
      </div>

      {/* Stats Pill */}
      <div className="flex items-center gap-3 self-start md:self-auto bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" />
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            Assigned: <strong className="text-[var(--text-primary)] font-bold">{totalTasks}</strong>
          </span>
        </div>

        <div className="h-4 w-[1px] bg-[var(--border)]" />

        <div className="flex items-center gap-2">
          <CheckSquare className="w-3.5 h-3.5 text-[var(--primary)]" />
          <span className="text-xs text-[var(--text-secondary)]">
            Completion: <strong className="text-[var(--text-primary)] font-semibold">{completionRate}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTaskHeader;
