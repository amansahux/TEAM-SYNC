import React from "react";
import { Plus, UserPlus, FileSpreadsheet, RefreshCw } from "lucide-react";
import { Link } from "react-router";

const AdminDashboardHeader = ({
  greeting,
  employeeName,
  totalEmployees,
  completionRate,
  onRefresh,
  isRefreshing,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-[var(--border-subtle)] pb-6">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary-light)] px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[var(--primary)] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            Admin Overview
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">
          {greeting}, <span className="text-[var(--primary)]">{employeeName}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Manage workspace personnel, deliverable lifecycles, and operational units in real-time.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh Dashboard Data"
          className="btn-outline flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer hover:bg-[var(--card-hover)] transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[var(--primary)]" : ""}`} />
          <span className="hidden sm:inline">Sync</span>
        </button>

        <Link
          to="/dashboard/add-employee"
          className="btn-outline flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl cursor-pointer hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add Employee</span>
        </Link>

        <Link
          to="/dashboard/create-task"
          className="btn-primary flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl cursor-pointer shadow-[var(--shadow-sm)]"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
