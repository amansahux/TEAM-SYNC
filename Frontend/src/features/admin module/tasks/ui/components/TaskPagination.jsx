import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TaskPagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  limit = 10,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border)] text-xs text-[var(--text-secondary)]">
      <div>
        Showing <strong className="text-[var(--text-primary)] font-semibold">{start}</strong> to{" "}
        <strong className="text-[var(--text-primary)] font-semibold">{end}</strong> of{" "}
        <strong className="text-[var(--text-primary)] font-semibold">{totalItems}</strong> entries
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-2 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--surface-hover)] disabled:opacity-40 disabled:pointer-events-none cursor-pointer text-[var(--text-primary)] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--surface-hover)] disabled:opacity-40 disabled:pointer-events-none cursor-pointer text-[var(--text-primary)] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskPagination;
