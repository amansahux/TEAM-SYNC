import React from "react";
import { ShieldCheck, BarChart2 } from "lucide-react";

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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {/* 1. Total Employees */}
      <div className="bg-[var(--card)] rounded-xl p-4 md:p-5 border border-[var(--border)] shadow-[var(--shadow-sm)] hover:border-[var(--border-light)] transition-all duration-200">
        <div className="flex items-center justify-between text-[var(--text-muted)] mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider">
            Total Employees
          </span>
          <span className="text-[11px] font-medium text-[var(--primary)] bg-[var(--primary-light)] px-1.5 py-0.5 rounded">
            +{newThisMonth} this month
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)] tracking-tight">
            {totalEmployees}
          </span>
          <span className="text-xs text-[var(--text-secondary)]">Verified</span>
        </div>
      </div>

      {/* 2. Active Now */}
      <div className="bg-[var(--card)] rounded-xl p-4 md:p-5 border border-[var(--border)] shadow-[var(--shadow-sm)] hover:border-[var(--border-light)] transition-all duration-200">
        <div className="flex items-center justify-between text-[var(--text-muted)] mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider">
            Active Now
          </span>
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)] tracking-tight">
            {activeEmployees}
          </span>
          <span className="text-xs text-[var(--text-secondary)]">
            Active ({activeRate})
          </span>
        </div>
      </div>

      {/* 3. Configured Units */}
      <div className="bg-[var(--card)] rounded-xl p-4 md:p-5 border border-[var(--border)] shadow-[var(--shadow-sm)] hover:border-[var(--border-light)] transition-all duration-200">
        <div className="flex items-center justify-between text-[var(--text-muted)] mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider">
            Configured Units
          </span>
          <ShieldCheck className="w-4 h-4 text-[var(--text-muted)]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)] tracking-tight">
            {configuredUnits}
          </span>
          <span className="text-xs text-[var(--text-secondary)]">
            Fully Operational
          </span>
        </div>
      </div>

      {/* 4. Average Team Size */}
      <div className="bg-[var(--card)] rounded-xl p-4 md:p-5 border border-[var(--border)] shadow-[var(--shadow-sm)] hover:border-[var(--border-light)] transition-all duration-200">
        <div className="flex items-center justify-between text-[var(--text-muted)] mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider">
            Average Team Size
          </span>
          <BarChart2 className="w-4 h-4 text-[var(--text-muted)]" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)] tracking-tight">
            {averageTeamSize}
          </span>
          <span className="text-xs text-[var(--text-secondary)]">
            Members / Unit
          </span>
        </div>
      </div>
    </section>
  );
};

export default DepartmentMetrics;
