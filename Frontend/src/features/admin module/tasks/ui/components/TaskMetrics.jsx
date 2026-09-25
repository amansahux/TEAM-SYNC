import React from "react";
import { CheckCircle2, Clock, ListTodo, Layers } from "lucide-react";

const TaskMetrics = ({ metrics }) => {
  const cards = [
    {
      title: "Total Operations",
      value: metrics.total ?? 0,
      icon: Layers,
      color: "text-[var(--text-primary)]",
      bg: "bg-[var(--surface)]",
      border: "border-[var(--border)]",
      subtext: "Across all pipelines",
    },
    {
      title: "Pending / To-Do",
      value: metrics.todo ?? 0,
      icon: ListTodo,
      color: "text-[#9CA3AF]",
      bg: "bg-[#6B7280]/10",
      border: "border-[#6B7280]/20",
      subtext: "Awaiting execution",
    },
    {
      title: "In Active Progress",
      value: metrics.inProgress ?? 0,
      icon: Clock,
      color: "text-[#60A5FA]",
      bg: "bg-[#60A5FA]/10",
      border: "border-[#60A5FA]/20",
      subtext: "Currently engaged",
    },
    {
      title: "Delivered & Closed",
      value: metrics.completed ?? 0,
      icon: CheckCircle2,
      color: "text-[var(--primary)]",
      bg: "bg-[var(--primary)]/10",
      border: "border-[var(--primary)]/20",
      subtext: `${metrics.completionRate} completion rate`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-[var(--card)] rounded-xl p-4 md:p-5 border border-[var(--border)] shadow-[var(--shadow-sm)] flex flex-col justify-between hover:border-[var(--border-hover)] transition-colors duration-200"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                {card.title}
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border ${card.bg} ${card.border}`}
              >
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>

            <div>
              <span className="text-2xl md:text-3xl font-display font-semibold text-[var(--text-primary)] tracking-tight">
                {card.value}
              </span>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskMetrics;
