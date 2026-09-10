import React, { useState } from "react";
import { useEmployees } from "../../hooks/useEmployee";
import SkeletonTable from "../components/employee/SkeletonTable";
import ErrorState from "../components/employee/ErrorState";
import Pagination from "../components/employee/Pagination";
import StatCard from "../components/employee/StatCard";
import EmployeeDirectoryHeader from "../components/employee/EmployeeDirectoryHeader";
import EmployeeTableFilters from "../components/employee/EmployeeTableFilters";
import EmployeeRow from "../components/employee/EmployeeRow";

const thClasses =
  "px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap";

const Employee = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
  });

  const { data, isPending, error } = useEmployees(
    page,
    10,
    filters.search,
    filters.department,
    filters.status
  );

  const pagination = data?.pagination || {
    total: data?.length || 0,
    page,
    limit: 10,
    totalPages: Math.ceil((data?.length || 0) / 10) || 1,
  };

  const employees = data?.employees || data || [];

  const handlePageChange = (newPage) => setPage(newPage);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to page 1 on filter change
  };

  const renderContent = () => {
    if (error)
      return (
        <ErrorState message={error.message || "Failed to load employees."} />
      );
    if (isPending) return <SkeletonTable />;

    return (
      <div className="card overflow-hidden">
        {/* Filters */}
        <EmployeeTableFilters onFilterChange={handleFilterChange} />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-[var(--background-secondary)]">
              <tr className="border-b border-[var(--border)]">
                <th className={thClasses}>Employee</th>
                <th className={thClasses}>Role</th>
                <th className={thClasses}>Department</th>
                <th className={thClasses}>Status</th>
                <th className={thClasses}>Joined Date</th>
                <th className={thClasses}>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <EmployeeRow key={emp._id || emp.email} emp={emp} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-[var(--text-secondary)]"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {employees.length > 0 && (
          <Pagination
            total={pagination.total}
            page={pagination.page}
            limit={pagination.limit}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <EmployeeDirectoryHeader />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard label="Total Employees" value={pagination.total} />
        <StatCard
          label="Active Now"
          value={Math.floor(pagination.total)}
          trailing={
            <span className="size-2 rounded-full bg-[var(--success)] mb-2" />
          }
        />
        <StatCard
          label="Open Positions"
          value={24}
          trailing={
            <span className="text-sm font-medium text-[var(--warning)] mb-1">
              Critical
            </span>
          }
        />
        <StatCard
          label="New Hires"
          value={42}
          trailing={
            <span className="text-sm font-medium text-[var(--text-secondary)] mb-1">
              Target: 50
            </span>
          }
        />
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default Employee;
