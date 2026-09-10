import React from "react";

const StatusBadge = ({ status }) => {
  const isActive = status === "active";
  return (
    <div className="flex items-center gap-2">
      <span
        className={`size-2 rounded-full ${
          isActive ? "bg-[var(--success)]" : "bg-[var(--border)]"
        }`}
      />
      <span
        className={`text-xs font-semibold ${
          isActive ? "text-[var(--success)]" : "text-[var(--text-secondary)]"
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
};

export default StatusBadge;
