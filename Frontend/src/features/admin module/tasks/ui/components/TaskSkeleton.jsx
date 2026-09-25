import React from "react";

const TaskSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Metrics Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[var(--card)] rounded-xl p-4 md:p-5 border border-[var(--border)] h-24 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 bg-[var(--surface-hover)] rounded w-24" />
              <div className="h-7 w-7 bg-[var(--surface-hover)] rounded-lg" />
            </div>
            <div className="h-6 bg-[var(--surface-hover)] rounded w-16" />
          </div>
        ))}
      </div>

      {/* Filters Bar Skeleton */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 md:p-5 h-16" />

      {/* Grid of 6 Task Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-[var(--card)] rounded-xl p-5 md:p-6 border border-[var(--border)] space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-20 h-5 rounded bg-[var(--surface-hover)]" />
                <div className="w-20 h-5 rounded bg-[var(--surface-hover)]" />
              </div>
              <div className="w-8 h-4 rounded bg-[var(--surface-hover)]" />
            </div>

            <div className="space-y-2 py-2">
              <div className="w-3/4 h-5 rounded bg-[var(--surface-hover)]" />
              <div className="w-full h-3 rounded bg-[var(--surface-hover)]" />
              <div className="w-2/3 h-3 rounded bg-[var(--surface-hover)]" />
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--surface-hover)]" />
                <div className="w-20 h-3 rounded bg-[var(--surface-hover)]" />
              </div>
              <div className="w-20 h-3 rounded bg-[var(--surface-hover)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSkeleton;
