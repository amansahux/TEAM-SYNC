import React from "react";
import { Link } from "react-router";
import { ArrowRight, Terminal, Palette, Building2, Megaphone, Network } from "lucide-react";

const getDeptIcon = (id) => {
  switch (id?.toLowerCase()) {
    case "developer":
      return <Terminal className="w-4 h-4 text-[var(--primary)]" />;
    case "designer":
      return <Palette className="w-4 h-4 text-[var(--secondary)]" />;
    case "manager":
      return <Building2 className="w-4 h-4 text-[#60A5FA]" />;
    case "marketer":
      return <Megaphone className="w-4 h-4 text-[#FB923C]" />;
    default:
      return <Network className="w-4 h-4 text-[var(--text-muted)]" />;
  }
};

const DepartmentDistributionWidget = ({ departments = [] }) => {
  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-4">
        <div>
          <h3 className="text-base font-display font-bold text-[var(--text-primary)]">
            Department Performance
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Operational headcount & engagement ratios
          </p>
        </div>
        <Link
          to="/dashboard/department"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
        >
          <span>Explore units</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {departments.map((dept) => {
          const membersCount = dept.membersCount || 0;
          const activeCount = dept.activeCount || 0;
          const percentage =
            membersCount > 0 ? Math.round((activeCount / membersCount) * 100) : 100;

          return (
            <Link
              key={dept.id || dept.name}
              to={`/dashboard/department/${dept.id?.toLowerCase()}`}
              className="group p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-8 w-8 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center">
                  {getDeptIcon(dept.id)}
                </div>
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  {membersCount} <span className="text-[10px] text-[var(--text-muted)]">members</span>
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                  {dept.name}
                </h4>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                    <span>Active</span>
                    <span className="font-semibold text-[var(--text-secondary)]">{activeCount} ({percentage}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentDistributionWidget;
