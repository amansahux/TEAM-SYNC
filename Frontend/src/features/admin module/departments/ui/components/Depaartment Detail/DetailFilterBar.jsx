import React from "react";
import { Search, X, Filter } from "lucide-react";

const DetailFilterBar = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalCount,
  activeCount,
  inactiveCount,
  filteredCount,
  onClearFilters,
}) => {
  const tabs = [
    { key: "ALL", label: "All Personnel", count: totalCount },
    { key: "ACTIVE", label: "Active", count: activeCount },
    { key: "INACTIVE", label: "Inactive", count: inactiveCount },
  ];

  const isFiltered = searchQuery.trim() !== "" || statusFilter !== "ALL";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)] pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, role, or email..."
          className="w-full pl-10 pr-9 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-[var(--surface)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Tabs & Clear */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex p-1 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
          {tabs.map((tab) => {
            const isActive = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onStatusFilterChange(tab.key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[var(--surface)] text-[var(--foreground)] shadow-xs font-semibold"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                    isActive
                      ? "bg-[var(--primary)]/15 text-[var(--primary)] font-bold"
                      : "bg-[var(--surface)] text-[var(--muted-foreground)]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {isFiltered && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-elevated)] text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailFilterBar;
