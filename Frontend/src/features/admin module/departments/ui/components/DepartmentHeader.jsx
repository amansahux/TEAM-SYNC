import React from "react";
import { Users } from "lucide-react";

const DepartmentHeader = ({ totalDepartments = 5, totalEmployees = 0 }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border)]">
      <div>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase mb-1">
          <span>Governance &amp; Organization</span>
          <span className="text-[var(--text-disabled)]">/</span>
          <span className="text-[var(--primary)] font-semibold">Departments</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-[var(--text-primary)] tracking-tight leading-tight">
          Departments
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
          Organize and manage employees across your departments.
        </p>
      </div>

      {/* Header Right Stats Pill */}
      <div className="flex items-center gap-3 self-start md:self-auto bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" />
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            Total Departments: <strong className="text-[var(--text-primary)] font-bold">{totalDepartments}</strong>
          </span>
        </div>

        <div className="h-4 w-[1px] bg-[var(--border)]" />

        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-[var(--secondary)]" />
          <span className="text-xs text-[var(--text-secondary)]">
            Total Employees: <strong className="text-[var(--text-primary)] font-semibold">{totalEmployees}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHeader;
