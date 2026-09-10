import React from "react";
import { Link } from "react-router";
import { Share, UserRoundPlus } from "lucide-react";
import { useEmployees } from "../../../hooks/useEmployee";

const EmployeeDirectoryHeader = ({ employees = [] }) => {
  const { handleExport } = useEmployees();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tracking-tight">
          Employee Directory
        </h2>
        <p className="mt-1 text-sm sm:text-base text-[var(--text-secondary)]">
          Manage your organization's workforce and roles.
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => {
            handleExport(employees);
          }}
          className="btn-outline rounded-xl text-sm gap-2 hidden sm:flex cursor-pointer hover:bg-[var(--background-secondary)]"
        >
          <Share size={20} />
          Export
        </button>
        <Link
          to="/dashboard/add-employee"
          className="btn-primary rounded-xl text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <UserRoundPlus size={18} />
          Add Employee
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDirectoryHeader;
