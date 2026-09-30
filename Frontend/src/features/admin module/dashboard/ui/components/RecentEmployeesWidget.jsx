import React from "react";
import { Link } from "react-router";
import { ArrowRight, UserCheck, Shield } from "lucide-react";

const RecentEmployeesWidget = ({ employees = [] }) => {
  return (
    <div className="card p-5 sm:p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-4">
          <div>
            <h3 className="text-base font-display font-bold text-[var(--text-primary)]">
              Team Personnel
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Recently active employees & status
            </p>
          </div>
          <Link
            to="/dashboard/employees"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
          >
            <span>View roster</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {employees.length === 0 ? (
          <div className="py-8 text-center text-xs text-[var(--text-muted)]">
            No employee records found.
          </div>
        ) : (
          <div className="space-y-3">
            {employees.map((emp) => {
              const name = emp.name || emp.user?.name || "Unnamed";
              const email = emp.email || emp.user?.email || "No email";
              const department = emp.department || "General";
              const role = emp.role || emp.user?.role || "Employee";
              const status = emp.status || "active";
              const isActive = status === "active";

              const initials = name
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map((n) => n.charAt(0).toUpperCase())
                .join("") || "?";

              return (
                <div
                  key={emp._id}
                  className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div className="h-9 w-9 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center text-xs font-bold border border-[var(--primary)]/30">
                        {initials}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--card)] ${
                          isActive ? "bg-[var(--success)]" : "bg-[var(--text-disabled)]"
                        }`}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                          {name}
                        </p>
                        {role === "admin" && (
                          <Shield className="w-3 h-3 text-[var(--secondary)]" />
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] truncate">
                        {department.charAt(0).toUpperCase() + department.slice(1)} • {email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isActive
                        ? "text-[var(--success)] bg-[var(--success-light)]"
                        : "text-[var(--text-muted)] bg-[var(--surface-hover)]"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentEmployeesWidget;
