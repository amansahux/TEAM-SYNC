import React from "react";
import SettingsNavigation from "./SettingsNavigation.jsx";

const SettingsLayout = ({
  activeTab,
  onSelectTab,
  children,
}) => {
  return (
    <div className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[var(--text-muted)] uppercase">
        <span>Governance & Identity</span>
        <span className="text-[var(--border)]">•</span>
        <span className="text-[var(--text-secondary)]">Configuration</span>
      </div>

      {/* ── Main Page Title & Subtitle ── */}
      <div className="border-b border-[var(--border)] pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
          Manage your profile, security, and appearance.
        </p>
      </div>

      {/* ── Two-Column Layout: Left Navigation + Right Content ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Settings Navigation */}
        <aside className="md:col-span-4 lg:col-span-3 sticky top-20">
          <SettingsNavigation
            activeTab={activeTab}
            onSelectTab={onSelectTab}
          />
        </aside>

        {/* Right Column: Active Settings Content */}
        <main className="md:col-span-8 lg:col-span-9 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;
