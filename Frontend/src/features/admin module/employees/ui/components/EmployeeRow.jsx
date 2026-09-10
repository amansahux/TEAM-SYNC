import React from "react";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

const EmployeeRow = ({ emp }) => (
  <tr className="hover:bg-[var(--card-hover)] transition-colors group">
    <td className="px-6 py-4">
      <div className="flex items-center gap-4">
        <Avatar src={emp.avatar} name={emp.name} />
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--text-primary)] truncate">
            {emp.name}
          </p>
          <p className="text-sm text-[var(--text-secondary)] truncate">
            {emp.email}
          </p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <span className="inline-block px-2 py-1 bg-[var(--background-tertiary)] text-[var(--text-secondary)] rounded-lg text-xs font-semibold">
        {emp.role}
      </span>
    </td>
    <td className="px-6 py-4 text-sm text-[var(--text-primary)] capitalize">
      {emp.department}
    </td>
    <td className="px-6 py-4">
      <StatusBadge status={emp.status} />
    </td>
    <td className="px-6 py-4 text-sm text-[var(--text-secondary)] whitespace-nowrap">
      {formatDate(emp.createdAt)}
    </td>
    <td className="px-6 py-4">
      <ActionMenu emp={emp} />
    </td>
  </tr>
);

export default EmployeeRow;
