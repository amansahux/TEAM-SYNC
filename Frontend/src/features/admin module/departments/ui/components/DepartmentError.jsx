import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

const DepartmentError = ({ error, onRetry, isFetching }) => {
  return (
    <div className="bg-[var(--card)] border border-[var(--danger)]/30 rounded-xl p-8 md:p-12 text-center max-w-xl mx-auto shadow-[var(--shadow-md)] my-6">
      <div className="w-12 h-12 rounded-full bg-[var(--danger-light)] text-[var(--danger)] mx-auto flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] mb-2">
        Failed to synchronize department nodes
      </h3>

      <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6 leading-relaxed">
        {error?.response?.data?.message ||
          error?.message ||
          "The workspace governance service encountered an upstream timeout while querying department cluster state."}
      </p>

      <div className="inline-flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="btn-primary inline-flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
          <span>Retry Connection</span>
        </button>

        <button
          type="button"
          onClick={onRetry}
          className="btn-outline inline-flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider"
        >
          <span>Inspect Diagnostics</span>
        </button>
      </div>
    </div>
  );
};

export default DepartmentError;
