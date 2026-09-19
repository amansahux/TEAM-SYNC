import React from "react";

const DepartmentSkeleton = () => {
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
              <div className="h-4 bg-[var(--surface-hover)] rounded w-16" />
            </div>
            <div className="h-7 bg-[var(--surface-hover)] rounded w-20" />
          </div>
        ))}
      </div>

      {/* Row 1: 3 Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[var(--card)] rounded-xl p-5 md:p-6 border border-[var(--border)] space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-[var(--surface-hover)]" />
                <div className="space-y-1.5">
                  <div className="w-24 h-4 rounded bg-[var(--surface-hover)]" />
                  <div className="w-16 h-2 rounded bg-[var(--surface-hover)]" />
                </div>
              </div>
              <div className="w-16 h-4 rounded-full bg-[var(--surface-hover)]" />
            </div>

            <div className="space-y-2 py-2">
              <div className="w-full h-3 rounded bg-[var(--surface-hover)]" />
              <div className="w-4/5 h-3 rounded bg-[var(--surface-hover)]" />
            </div>

            <div className="flex gap-2">
              <div className="w-20 h-6 rounded bg-[var(--surface-hover)]" />
              <div className="w-24 h-6 rounded bg-[var(--surface-hover)]" />
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
              <div className="w-full h-1.5 rounded-full bg-[var(--surface-hover)]" />
              <div className="flex justify-between">
                <div className="w-16 h-3 rounded bg-[var(--surface-hover)]" />
                <div className="w-20 h-3 rounded bg-[var(--surface-hover)]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: 2 Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[4, 5].map((i) => (
          <div
            key={i}
            className="bg-[var(--card)] rounded-xl p-5 md:p-6 border border-[var(--border)] space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-[var(--surface-hover)]" />
                <div className="space-y-1.5">
                  <div className="w-28 h-4 rounded bg-[var(--surface-hover)]" />
                  <div className="w-16 h-2 rounded bg-[var(--surface-hover)]" />
                </div>
              </div>
              <div className="w-16 h-4 rounded-full bg-[var(--surface-hover)]" />
            </div>

            <div className="space-y-2 py-2">
              <div className="w-full h-3 rounded bg-[var(--surface-hover)]" />
              <div className="w-3/4 h-3 rounded bg-[var(--surface-hover)]" />
            </div>

            <div className="flex gap-2">
              <div className="w-20 h-6 rounded bg-[var(--surface-hover)]" />
              <div className="w-24 h-6 rounded bg-[var(--surface-hover)]" />
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
              <div className="w-full h-1.5 rounded-full bg-[var(--surface-hover)]" />
              <div className="flex justify-between">
                <div className="w-16 h-3 rounded bg-[var(--surface-hover)]" />
                <div className="w-20 h-3 rounded bg-[var(--surface-hover)]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentSkeleton;
