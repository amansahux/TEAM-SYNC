import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Search, X, RotateCcw } from "lucide-react";

const selectClasses =
  "w-full px-4 py-2.5 bg-[var(--input)] border border-[var(--input-border)] rounded-lg text-sm text-[var(--text-primary)] outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 appearance-none cursor-pointer";

const EmployeeTableFilters = ({ onFilterChange }) => {
  const { register, watch, reset, setValue } = useForm({
    defaultValues: {
      search: "",
      department: "all",
      status: "all",
    },
  });

  const searchVal = watch("search");
  const departmentVal = watch("department");
  const statusVal = watch("status");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFilterChange) {
        onFilterChange({
          search: searchVal,
          department: departmentVal === "all" ? "" : departmentVal,
          status: statusVal === "all" ? "" : statusVal,
        });
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchVal, departmentVal, statusVal, onFilterChange]);

  const handleClearFilters = () => {
    reset({
      search: "",
      department: "all",
      status: "all",
    });
  };

  return (
    <div className="p-4 sm:p-6 border-b border-[var(--border)] bg-[var(--background-secondary)]/50">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3.5">
        {/* Search Input Field with Icon */}
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
          />
          <input
            type="text"
            {...register("search")}
            placeholder="Search employee by name or email..."
            className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-[var(--input-border)] bg-[var(--input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] shadow-xs"
          />
          {searchVal && (
            <button
              type="button"
              onClick={() => setValue("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters Group (Departments, Status, Clear) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Department Select */}
          <div className="min-w-[150px] flex-1 sm:flex-initial">
            <select {...register("department")} className={selectClasses}>
              <option value="all">All Departments</option>
              <option value="common">Common</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
              <option value="marketer">Marketer</option>
            </select>
          </div>

          {/* Status Select */}
          <div className="min-w-[130px] flex-1 sm:flex-initial">
            <select {...register("status")} className={selectClasses}>
              <option value="all">Status: All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <button
            type="button"
            onClick={handleClearFilters}
            className="btn-outline rounded-lg text-sm px-4 py-2.5 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw size={15} />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTableFilters;
