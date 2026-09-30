import React from "react";
import { Link } from "react-router";
import {
  User,
  Mail,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const EmployeeProfileWidget = ({
  employeeName,
  userEmail,
  userDepartment,
  userDesignation,
  userStatus,
  initials,
  completionRate,
  completedTasks,
  totalTasks,
}) => {
  return (
    <div className="card p-5 sm:p-6 flex flex-col justify-between h-full">
      <div>
        <div className="border-b border-[var(--border-subtle)] pb-4 mb-4">
          <h3 className="text-base font-display font-bold text-[var(--text-primary)]">
            Member Profile & Performance
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Your enterprise identity and operational track record
          </p>
        </div>

        {/* User Card */}
        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center text-sm font-bold border border-[var(--primary)]/30 shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-[var(--text-primary)] truncate">
                {employeeName}
              </h4>
              <p className="text-xs text-[var(--text-muted)] truncate">
                {userDesignation} • <span className="capitalize">{userDepartment}</span>
              </p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--success)] bg-[var(--success-light)] px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
              {userStatus}
            </span>
          </div>

          <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email
              </span>
              <span className="font-medium text-[var(--text-primary)] truncate max-w-[180px]">
                {userEmail}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Department
              </span>
              <span className="font-medium text-[var(--text-primary)] capitalize">
                {userDepartment}
              </span>
            </div>
          </div>
        </div>

        {/* Efficiency Gauge */}
        <div className="mt-4 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
              Efficiency Score
            </span>
            <span className="text-xs font-bold text-[var(--primary)]">
              {completionRate}%
            </span>
          </div>
          <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-[11px] text-[var(--text-muted)]">
            {completedTasks} completed out of {totalTasks} total deliverables assigned.
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
        <Link
          to="/dashboard/chat"
          className="btn-outline flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Open Chat</span>
        </Link>
        <Link
          to="/dashboard/setting"
          className="btn-outline flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl"
        >
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeProfileWidget;
