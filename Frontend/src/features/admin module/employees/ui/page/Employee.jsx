import React, { useState, useRef, useEffect } from "react";
import { useEmployees } from "../../hooks/useEmployee";
import Skeleton from "../components/Skeleton";
import ErrorState from "../components/ErrorState";
import Pagination from "../components/Pagination";
import { UserRoundPlus, MoreVertical, Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import { Link } from "react-router";

/* ── helpers ─────────────────────────────────────────────── */

const thClasses =
  "px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider whitespace-nowrap";

const selectClasses =
  "w-full px-4 py-2.5 bg-[var(--input)] border border-[var(--input-border)] rounded-lg text-sm text-[var(--text-primary)] outline-none transition-colors focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] appearance-none cursor-pointer";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/* ── stat card ───────────────────────────────────────────── */

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

/* ── avatar ──────────────────────────────────────────────── */

const Avatar = ({ src, name }) =>
  src ? (
    <img
      src={src}
      alt={name}
      className="size-10 shrink-0 rounded-full object-cover bg-[var(--border)]"
    />
  ) : (
    <div className="size-10 shrink-0 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-bold text-sm">
      {name.charAt(0).toUpperCase()}
    </div>
  );

/* ── status badge ────────────────────────────────────────── */

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

/* ── skeleton rows ───────────────────────────────────────── */

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

/* ── action menu ──────────────────────────────────────────── */

const ActionMenu = ({ emp }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const isActive = emp.status === "active";

  const menuItems = [
    {
      label: "Edit",
      icon: Pencil,
      onClick: () => console.log("Edit", emp._id),
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: () => console.log("Delete", emp._id),
      danger: true,
    },
    {
      label: isActive ? "Mark Inactive" : "Mark Active",
      icon: isActive ? UserX : UserCheck,
      onClick: () => console.log("Toggle status", emp._id),
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] transition-colors"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-lg)] py-1 z-30 animate-in fade-in">
          {menuItems.map(({ label, icon: Icon, onClick, danger }) => (
            <button
              key={label}
              onClick={() => {
                onClick();
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                danger
                  ? "text-[var(--danger)] hover:bg-[var(--danger-light)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── employee row ────────────────────────────────────────── */

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

/* ── main component ──────────────────────────────────────── */

const Employee = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useEmployees(page, limit=10);

  const pagination = data?.pagination || {
    total: data?.length || 0,
    page,
    limit: 10,
    totalPages: Math.ceil((data?.length || 0) / 10) || 1,
  };

  const employees = data?.employees || data || [];

  const handlePageChange = (newPage) => setPage(newPage);

  /* ── render helpers ──────────────────────────────────── */

  const renderContent = () => {
    if (error)
      return (
        <ErrorState message={error.message || "Failed to load employees."} />
      );
    if (isPending) return <SkeletonTable />;

    return (
      <div className="card overflow-hidden">
        {/* Filters */}
        <div className="p-4 sm:p-6 border-b border-[var(--border)] bg-[var(--background-secondary)]/50">
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
            <div className="flex-1 min-w-[180px]">
              <select className={selectClasses}>
                <option>All Roles</option>
                <option>Engineer</option>
                <option>Designer</option>
                <option>Manager</option>
              </select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <select className={selectClasses}>
                <option>All Departments</option>
                <option>Product</option>
                <option>Engineering</option>
                <option>Operations</option>
              </select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <select className={selectClasses}>
                <option>Status: All</option>
                <option>Status: Active</option>
                <option>Status: Inactive</option>
              </select>
            </div>
            <button className="btn-outline rounded-lg text-sm">
              Clear Filters
            </button>
          </div>
        </div>

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
                employees.map((emp) => <EmployeeRow key={emp._id} emp={emp} />)
              ) : (
                <tr>
                  <td
                    colSpan="5"
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

  /* ── page shell ──────────────────────────────────────── */

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)]">
      {/* Header */}
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
          <button className="btn-outline rounded-xl text-sm gap-2 hidden sm:flex">
            <span className="material-symbols-outlined text-[20px]">
              ios_share
            </span>
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
          label="New Hires (MoM)"
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
