import React from "react";
import { Users, UserCheck, CheckCircle2, Building2, TrendingUp } from "lucide-react";

const iconMap = {
  Users: Users,
  UserCheck: UserCheck,
  CheckCircle2: CheckCircle2,
  Building2: Building2,
};

const AdminStatsGrid = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((item) => {
        const IconComponent = iconMap[item.icon] || TrendingUp;

        return (
          <div
            key={item.id}
            className="card p-5 sm:p-6 relative overflow-hidden group hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-md)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--border)] group-hover:bg-[var(--primary)] transition-colors duration-300" />

            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-[var(--text-secondary)] font-ui">
                {item.label}
              </span>
              <div className="h-9 w-9 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)] group-hover:scale-105 transition-transform">
                <IconComponent className="w-4.5 h-4.5" />
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <div className="text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">
                {item.value}
              </div>
              <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5 font-medium">
                {item.change ? (
                  <span className="text-[var(--primary)] font-semibold">{item.change}</span>
                ) : (
                  <span>{item.subtext}</span>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStatsGrid;
