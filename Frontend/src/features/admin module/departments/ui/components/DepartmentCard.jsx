import React from "react";
import { Link } from "react-router";
import {
  Network,
  Terminal,
  Palette,
  Building2,
  Megaphone,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const getIcon = (id) => {
  switch (id) {
    case "common":
      return Network;
    case "developer":
      return Terminal;
    case "designer":
      return Palette;
    case "manager":
      return Building2;
    case "marketer":
      return Megaphone;
    default:
      return Network;
  }
};

const getThemeClasses = (id) => {
  switch (id) {
    case "common":
      return {
        iconBg: "bg-slate-500/10 text-slate-400 border-slate-500/20",
        progressFill: "bg-slate-400",
        accentBorder: "hover:border-slate-400/40",
      };
    case "developer":
      return {
        iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        progressFill: "bg-emerald-500",
        accentBorder: "hover:border-emerald-500/40",
      };
    case "designer":
      return {
        iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        progressFill: "bg-amber-500",
        accentBorder: "hover:border-amber-500/40",
      };
    case "manager":
      return {
        iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        progressFill: "bg-blue-500",
        accentBorder: "hover:border-blue-500/40",
      };
    case "marketer":
      return {
        iconBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        progressFill: "bg-orange-500",
        accentBorder: "hover:border-orange-500/40",
      };
    default:
      return {
        iconBg: "bg-[var(--primary-light)] text-[var(--primary)] border-[var(--primary)]/20",
        progressFill: "bg-[var(--primary)]",
        accentBorder: "hover:border-[var(--primary)]/40",
      };
  }
};

const DepartmentCard = ({ dept }) => {
  const IconComponent = getIcon(dept.id);
  const theme = getThemeClasses(dept.id);
  const total = dept.membersCount || 0;
  const active = dept.activeCount || 0;
  const percentage = total > 0 ? Math.min(100, Math.round((active / total) * 100)) : 0;

  return (
    <div
      className={`card p-6 flex flex-col justify-between transition-all duration-300 ${theme.accentBorder} group shadow-sm hover:shadow-md`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 ${theme.iconBg}`}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-[var(--text-primary)] leading-tight">
                {dept.name}
              </h3>
              <p className="text-[11px] font-mono font-medium text-[var(--text-muted)] tracking-wider">
                {dept.path || `/DEPARTMENTS/${dept.id.toUpperCase()}`}
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--surface-hover)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{active} Active</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
          {dept.description}
        </p>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
            <Users className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            {total} Members
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {dept.onlineRatio || "0%"} Online Ratio
          </span>
        </div>
      </div>

      {/* Footer Area */}
      <div>
        {/* Staff Allocation Progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
            <span>Staff Allocation Ratio</span>
            <span className="font-mono text-[var(--text-primary)]">
              {active} / {total}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[var(--background-muted)] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${theme.progressFill}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Action Link & Node label */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] text-xs font-semibold">
          <span className="text-[11px] tracking-wider text-[var(--text-muted)] uppercase">
            {dept.cluster || "ORGANIZATION NODE"}
          </span>

          <Link
            to={`/dashboard/employees?department=${dept.id}`}
            className="inline-flex items-center gap-1 text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors group/link"
          >
            <span>View Department</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
