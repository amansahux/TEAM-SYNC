import React from "react";
import DetailEmployeeCard from "./DetailEmployeeCard.jsx";
import { Users, UserPlus, AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";

const DetailEmployeeList = ({
  employees,
  isLoading,
  isError,
  error,
  onRetry,
  searchQuery,
  statusFilter,
  onClearFilters,
}) => {
  const navigate = useNavigate();

  // Loading skeleton state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface-elevated)]" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-[var(--surface-elevated)] rounded w-3/4" />
                <div className="h-3 bg-[var(--surface-elevated)] rounded w-1/2" />
              </div>
            </div>
            <div className="h-3 bg-[var(--surface-elevated)] rounded w-full" />
            <div className="h-3 bg-[var(--surface-elevated)] rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--foreground)]">Failed to load department members</h3>
          <p className="text-sm text-[var(--muted-foreground)] mt-1 max-w-md mx-auto">
            {error?.response?.data?.message || error?.message || "An unexpected network error occurred."}
          </p>
        </div>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-hover)] transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  // Empty state when filters match nothing
  if (!employees || employees.length === 0) {
    const isFiltered = searchQuery.trim() !== "" || statusFilter !== "ALL";

    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 flex items-center justify-center mx-auto">
          <Users className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">
            {isFiltered ? "No matching personnel found" : "No personnel in this department yet"}
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] mt-1.5 max-w-md mx-auto">
            {isFiltered
              ? `No members match search query "${searchQuery}" or status filter "${statusFilter}".`
              : "Start by assigning employees or inviting new personnel to this department node."}
          </p>
        </div>

        <div className="pt-2">
          {isFiltered ? (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-sm font-medium hover:bg-[var(--surface)] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          ) : (
            <button
              onClick={() => navigate("/dashboard/add-employee")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-hover)] transition-all shadow-md shadow-[var(--primary)]/20 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Add First Member
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {employees.map((emp) => (
        <DetailEmployeeCard key={emp._id || emp.id} employee={emp} />
      ))}
    </div>
  );
};

export default DetailEmployeeList;
