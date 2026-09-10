import React from "react";
import Skeleton from "./Skeleton";

const SkeletonTable = () => (
  <div className="card overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[var(--background-secondary)]">
          <tr className="border-b border-[var(--border)]">
            <th className="px-6 py-4">
              <Skeleton width="100px" />
            </th>
            <th className="px-6 py-4">
              <Skeleton width="80px" />
            </th>
            <th className="px-6 py-4">
              <Skeleton width="120px" />
            </th>
            <th className="px-6 py-4">
              <Skeleton width="60px" />
            </th>
            <th className="px-6 py-4">
              <Skeleton width="90px" />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <Skeleton variant="circular" width="40px" height="40px" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="120px" />
                    <Skeleton width="160px" />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Skeleton width="100px" />
              </td>
              <td className="px-6 py-4">
                <Skeleton width="100px" />
              </td>
              <td className="px-6 py-4">
                <Skeleton width="60px" />
              </td>
              <td className="px-6 py-4">
                <Skeleton width="80px" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SkeletonTable;
