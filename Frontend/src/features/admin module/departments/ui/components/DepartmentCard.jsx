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

const getDepartmentIcon = (id) => {
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

const DepartmentCard = ({ dept }) => {
  const IconComponent = getDepartmentIcon(dept.id);
  const theme = dept.theme || {};

  return (
    <div
      className={`group bg-[var(--card)] rounded-xl p-5 md:p-6 border border-[var(--border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] ${theme.hoverBorder} transition-all duration-200 flex flex-col justify-between relative overflow-hidden`}
    >
      {/* Subtle accent hairline top edge */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2.5px] ${theme.hairlineClass || "bg-[var(--primary)]"}`}
      />

      <div>
        {/* Top Row: Icon + Title + Path + Active badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                theme.iconBgClass || "bg-[var(--primary-light)] text-[var(--primary)] border-[var(--primary)]/20"
              }`}
            >
              <IconComponent className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[var(--text-primary)] tracking-tight group-hover:text-[var(--primary)] transition-colors">
                {dept.name}
              </h3>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                {dept.path || `/departments/${dept.id}`}
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] shrink-0"
            title={`${dept.activeCount} Active`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
            <span className="text-[11px] font-semibold text-[var(--text-secondary)]">
              {dept.activeCount} Active
            </span>
          </div>
        </div>

        {/* Middle: Description */}
        <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
          {dept.description}
        </p>

        {/* Metadata pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)]">
            <Users className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>{dept.membersCount} Members</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>{dept.onlineRatio} Online Ratio</span>
          </span>
        </div>
      </div>

      {/* Bottom Row: Staff Allocation Progress bar & Action */}
      <div className="pt-4 border-t border-[var(--border-subtle)]">
        <div className="flex justify-between items-center text-xs text-[var(--text-muted)] mb-1.5 font-medium">
          <span>Staff Allocation Ratio</span>
          <span className="font-mono text-[var(--text-primary)] font-semibold">
            {dept.staffAllocationRatio}
          </span>
        </div>

        {/* Ratio Bar */}
        <div className="w-full h-1.5 rounded-full bg-[var(--background-muted)] overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-500 ${theme.progressBarClass || "bg-[var(--primary)]"}`}
            style={{ width: `${dept.percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            {dept.cluster}
          </span>

          <Link
            to={`/dashboard/department/${dept.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors group/link"
          >
            <span>View Department</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/link:translate-x-1 text-[var(--primary)]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
