import React from "react";
import { User, Shield, Palette, ChevronRight } from "lucide-react";

export const SETTINGS_TABS = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal details & photo",
    icon: User,
  },
  {
    id: "security",
    label: "Security",
    description: "Password & sessions",
    icon: Shield,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Light & dark theme",
    icon: Palette,
  },
];

const SettingsNavigation = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="flex flex-row md:flex-col gap-1.5 p-1.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
      {SETTINGS_TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`group flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer flex-1 md:flex-none ${
              isActive
                ? "bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30 shadow-xs font-semibold"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isActive
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                    : "bg-[var(--surface)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:bg-[var(--card-hover)]"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-left hidden sm:block">
                <span className="block truncate leading-none">{tab.label}</span>
                <span className="text-[10px] text-[var(--text-muted)] hidden md:block mt-1 font-normal">
                  {tab.description}
                </span>
              </div>
              {/* Mobile text */}
              <span className="sm:hidden block truncate">{tab.label}</span>
            </div>

            <ChevronRight
              className={`w-4 h-4 shrink-0 transition-transform duration-200 hidden md:block ${
                isActive
                  ? "text-[var(--primary)] translate-x-0.5"
                  : "text-[var(--text-muted)] opacity-0 group-hover:opacity-100"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default SettingsNavigation;
