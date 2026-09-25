import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

const TaskError = ({ error, onRetry, isFetching }) => {
  return (
    <div className="bg-[var(--card)] border border-[var(--danger)]/30 rounded-xl p-8 md:p-12 text-center max-w-xl mx-auto shadow-[var(--shadow-md)] my-6">
      <div className="w-12 h-12 rounded-full bg-[var(--danger-light)] text-[var(--danger)] mx-auto flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] mb-2">
        Failed to fetch task registry
      </h3>

      <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6 leading-relaxed">
        {error?.response?.data?.message ||
          error?.message ||
          "The task orchestration service encountered an unexpected error. Please check your network or try again."}
      </p>

      <div className="inline-flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="btn-primary inline-flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
          <span>Retry Loading</span>
        </button>
      </div>
    </div>
  );
};

export default TaskError;
