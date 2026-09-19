import React from "react";

const DepartmentSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Metrics Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card p-5 h-28 flex flex-col justify-between">
            <div className="h-4 bg-[var(--surface-hover)] rounded w-28" />
            <div className="h-8 bg-[var(--surface-hover)] rounded w-20" />
          </div>
        ))}
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="card p-6 h-72 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[var(--surface-hover)] rounded-lg" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-5 bg-[var(--surface-hover)] rounded w-32" />
                  <div className="h-3 bg-[var(--surface-hover)] rounded w-24" />
                </div>
              </div>
              <div className="h-12 bg-[var(--surface-hover)] rounded w-full" />
            </div>
            <div className="h-6 bg-[var(--surface-hover)] rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentSkeleton;
