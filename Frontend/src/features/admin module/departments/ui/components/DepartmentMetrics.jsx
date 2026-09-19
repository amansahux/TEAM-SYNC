import React from "react";
import { ShieldCheck, BarChart3, Users, Activity } from "lucide-react";

const DepartmentMetrics = ({ metrics }) => {
  const {
    totalEmployees = 0,
    newThisMonth = 0,
    activeEmployees = 0,
    activeRate = "0.0%",
    configuredUnits = 5,
    averageTeamSize = "0.0",
  } = metrics || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Employees */}
      <div className="card p-5 relative overflow-hidden transition-all duration-300 hover:border-[var(--border-strong)]">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
            Total Employees
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[var(--primary-light)] text-[var(--primary)]">
            +{newThisMonth} this month
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {totalEmployees}
          </span>
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            Verified
          </span>
        </div>
      </div>

      {/* 2. Active Now */}
      <div className="card p-5 relative overflow-hidden transition-all duration-300 hover:border-[var(--border-strong)]">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
            Active Now
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {activeEmployees}
          </span>
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            Active ({activeRate})
          </span>
        </div>
      </div>

      {/* 3. Configured Units */}
      <div className="card p-5 relative overflow-hidden transition-all duration-300 hover:border-[var(--border-strong)]">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
            Configured Units
          </span>
          <ShieldCheck className="w-4 h-4 text-[var(--text-muted)]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {configuredUnits}
          </span>
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            Fully Operational
          </span>
        </div>
      </div>

      {/* 4. Average Team Size */}
      <div className="card p-5 relative overflow-hidden transition-all duration-300 hover:border-[var(--border-strong)]">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
            Average Team Size
          </span>
          <BarChart3 className="w-4 h-4 text-[var(--text-muted)]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {averageTeamSize}
          </span>
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            Members / Unit
          </span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentMetrics;
