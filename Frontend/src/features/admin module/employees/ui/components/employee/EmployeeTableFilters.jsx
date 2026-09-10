import React from "react";

const selectClasses =
  "w-full px-4 py-2.5 bg-[var(--input)] border border-[var(--input-border)] rounded-lg text-sm text-[var(--text-primary)] outline-none transition-colors focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] appearance-none cursor-pointer";

const EmployeeTableFilters = () => {
  return (
    <div className="p-4 sm:p-6 border-b border-[var(--border)] bg-[var(--background-secondary)]/50">
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
        <div className="flex-1 min-w-[180px]">
          <select className={selectClasses}>
            <option>All Roles</option>
            <option>Engineer</option>
            <option>Designer</option>
            <option>Manager</option>
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <select className={selectClasses}>
            <option>All Departments</option>
            <option>common</option>
            <option>developer</option>
            <option>designer</option>
            <option>manager</option>
            <option>marketer</option>
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <select className={selectClasses}>
            <option>Status: All</option>
            <option>Active</option>
            <option> Inactive</option>
          </select>
        </div>
        <button
          type="button"
          className="btn-outline rounded-lg text-sm cursor-pointer"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default EmployeeTableFilters;
