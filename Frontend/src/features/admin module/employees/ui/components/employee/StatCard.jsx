import React from "react";

const StatCard = ({ label, value, trailing }) => (
  <div className="card p-6">
    <p className="label mb-2">{label}</p>
    <div className="flex items-end gap-3">
      <span className="text-3xl font-bold text-[var(--text-primary)]">
        {value}
      </span>
      {trailing}
    </div>
  </div>
);

export default StatCard;
