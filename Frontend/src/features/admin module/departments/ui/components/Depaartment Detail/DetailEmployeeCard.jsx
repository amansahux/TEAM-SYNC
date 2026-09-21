import React from "react";
import { Mail, Shield, Calendar, Sparkles } from "lucide-react";
import ActionMenu from "../../../../employees/ui/components/employee/ActionMenu";

const DetailEmployeeCard = ({ employee, onEdit, onToggleStatus, onDelete }) => {
  const isActive = employee?.status === "active";

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "manager":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "designer":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "developer":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    }
  };

  const getInitials = (name) => {
    if (!name) return "TS";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:border-[var(--primary)]/40 hover:shadow-xl hover:shadow-[var(--primary)]/5 hover:-translate-y-0.5 flex flex-col justify-between">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar with online status */}
            <div className="relative">
              {employee?.avatar ? (
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[var(--border)]"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 border border-[var(--primary)]/25 flex items-center justify-center font-bold text-sm text-[var(--primary)]">
                  {getInitials(employee?.name)}
                </div>
              )}
              {/* Online/Active status dot indicator */}
              <span
                className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--surface)] ${
                  isActive ? "bg-emerald-500 shadow-xs shadow-emerald-500/50" : "bg-zinc-400"
                }`}
                title={isActive ? "Active / Online" : "Inactive / Offline"}
              />
            </div>

            <div>
              <h3 className="font-bold text-base text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                {employee?.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border capitalize ${getRoleBadgeColor(
                    employee?.role
                  )}`}
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {employee?.role || "Team Member"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Menu (Edit, Toggle, Delete) */}
          <ActionMenu emp={employee} />
        </div>

        {/* Info Grid */}
        <div className="mt-4 space-y-2 pt-3 border-t border-[var(--border)]/50">
          <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
            <Mail className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
            <span className="truncate">{employee?.email}</span>
          </div>

          {employee?.employeeId && (
            <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
              <span className="font-mono text-[11px] opacity-75">ID: #{employee.employeeId}</span>
              <span className="capitalize text-[11px] px-2 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border)]">
                {employee?.department}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="mt-4 pt-3 border-t border-[var(--border)]/40 flex items-center justify-between text-xs">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
            isActive
              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
              : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isActive ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"
            }`}
          />
          {isActive ? "Active Node" : "Standby"}
        </span>

        {employee?.createdAt && (
          <span className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)]">
            <Calendar className="w-3 h-3" />
            {new Date(employee.createdAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default DetailEmployeeCard;
