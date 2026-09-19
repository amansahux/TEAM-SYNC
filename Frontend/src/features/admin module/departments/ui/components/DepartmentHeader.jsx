import React from "react";
import { Users, Building } from "lucide-react";

const DepartmentHeader = ({ totalDepartments = 5, totalEmployees = 0 }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase mb-1">
          <span>Governance & Organization</span>
          <span>/</span>
          <span className="text-[var(--primary)]">Departments</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
          Departments
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Organize and manage employees across your departments.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
          <span>Total Departments: <strong className="text-[var(--text-primary)]">{totalDepartments}</strong></span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)] shadow-sm">
          <Users className="w-3.5 h-3.5 text-[var(--primary)]" />
          <span>Total Employees: <strong className="text-[var(--text-primary)]">{totalEmployees}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHeader;
