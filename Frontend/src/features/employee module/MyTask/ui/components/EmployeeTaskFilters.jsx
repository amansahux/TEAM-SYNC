import React from "react";
import { Search, Filter, AlertCircle, X } from "lucide-react";

const EmployeeTaskFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  const hasActiveFilters =
    search || statusFilter !== "all" || priorityFilter !== "all";

  const handleReset = () => {
    setSearch("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 md:p-5 shadow-[var(--shadow-sm)] space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search my tasks by title or detail..."
            className="w-full bg-[var(--input)] border border-[var(--input-border)] text-[var(--text-primary)] rounded-lg pl-9 pr-3 py-2 text-xs md:text-sm focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[var(--input)] border border-[var(--input-border)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer appearance-none"
          >
            <option value="all">Status: All Statuses</option>
            <option value="todo">To-Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <Filter className="w-3.5 h-3.5 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Priority Filter */}
        <div className="relative">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full bg-[var(--input)] border border-[var(--input-border)] text-[var(--text-primary)] rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer appearance-none"
          >
            <option value="all">Priority: All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <AlertCircle className="w-3.5 h-3.5 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-xs">
          <span className="text-[var(--text-muted)]">
            Filtered results active
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="text-[var(--primary)] hover:underline inline-flex items-center gap-1 cursor-pointer font-medium"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeTaskFilters;
