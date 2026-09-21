import React from "react";
import { Users, CheckCircle2, Activity, UserX } from "lucide-react";

const DetailMetricsGrid = ({ metrics, theme }) => {
  const cards = [
    {
      title: "Total Personnel",
      value: metrics?.totalEmployees ?? 0,
      subtext: "Assigned team members",
      icon: Users,
      accent: "from-blue-500/10 to-indigo-500/5 text-blue-500 border-blue-500/20",
    },
    {
      title: "Operational Active",
      value: metrics?.activeEmployees ?? 0,
      subtext: "Deployed & online",
      icon: CheckCircle2,
      accent: "from-emerald-500/10 to-teal-500/5 text-emerald-500 border-emerald-500/20",
    },
    {
      title: "Activity Rate",
      value: metrics?.activeRate ?? "100%",
      subtext: "Capacity utilization",
      icon: Activity,
      accent: "from-violet-500/10 to-purple-500/5 text-violet-500 border-violet-500/20",
    },
    {
      title: "Inactive / Standby",
      value: metrics?.inactiveEmployees ?? 0,
      subtext: "Inactive members",
      icon: UserX,
      accent: "from-amber-500/10 to-orange-500/5 text-amber-500 border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface-elevated)] to-[var(--surface)] p-5 transition-all hover:border-[var(--border-hover)] hover:shadow-lg group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                {card.title}
              </span>
              <div
                className={`p-2.5 rounded-xl border bg-gradient-to-br ${card.accent} transition-transform group-hover:scale-110`}
              >
                <IconComponent className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
                {card.value}
              </div>
            </div>

            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
              {card.subtext}
            </p>

            {/* Subtle bottom highlight indicator line */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
                idx === 0
                  ? "from-blue-500 to-indigo-500"
                  : idx === 1
                  ? "from-emerald-500 to-teal-500"
                  : idx === 2
                  ? "from-violet-500 to-purple-500"
                  : "from-amber-500 to-orange-500"
              } opacity-0 group-hover:opacity-100 transition-opacity`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DetailMetricsGrid;
