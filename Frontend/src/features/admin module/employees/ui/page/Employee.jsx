import React, { useState } from 'react';
import { useEmployees } from '../../hooks/useEmployee';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import Pagination from '../components/Pagination';

const Employee = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useEmployees(page);

  // Fallback pagination data if API doesn't provide it yet
  const pagination = data?.pagination || {
    total: data?.length || 0,
    page: page,
    limit: 10,
    totalPages: Math.ceil((data?.length || 0) / 10) || 1
  };
  
  const employees = data?.employees || data || [];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderContent = () => {
    if (error) {
      return <ErrorState message={error.message || "Failed to load employees."} />;
    }

    if (isPending) {
      return (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[var(--background-secondary)]">
                <tr className="border-b border-[var(--border)]">
                  <th className="px-6 py-4"><Skeleton width="100px" /></th>
                  <th className="px-6 py-4"><Skeleton width="80px" /></th>
                  <th className="px-6 py-4"><Skeleton width="120px" /></th>
                  <th className="px-6 py-4"><Skeleton width="60px" /></th>
                  <th className="px-6 py-4"><Skeleton width="90px" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 flex gap-4 items-center">
                      <Skeleton variant="circular" width="40px" height="40px" />
                      <div className="flex-1 space-y-2">
                        <Skeleton width="120px" />
                        <Skeleton width="160px" />
                      </div>
                    </td>
                    <td className="px-6 py-4"><Skeleton width="100px" /></td>
                    <td className="px-6 py-4"><Skeleton width="100px" /></td>
                    <td className="px-6 py-4"><Skeleton width="60px" /></td>
                    <td className="px-6 py-4"><Skeleton width="80px" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Filters Bar */}
        <div className="p-6 border-b border-[var(--border)] bg-[var(--background-secondary)]/50 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <select className="w-full pl-12 pr-4 py-2 bg-[var(--input)] border border-[var(--input-border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] appearance-none">
              <option>All Roles</option>
              <option>Engineer</option>
              <option>Designer</option>
              <option>Manager</option>
            </select>
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <select className="w-full px-4 py-2 bg-[var(--input)] border border-[var(--input-border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] appearance-none">
              <option>All Departments</option>
              <option>Product</option>
              <option>Engineering</option>
              <option>Operations</option>
            </select>
          </div>
          <div className="relative flex-1 min-w-[200px]">
            <select className="w-full px-4 py-2 bg-[var(--input)] border border-[var(--input-border)] rounded-lg text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] appearance-none">
              <option>Status: All</option>
              <option>Status: Active</option>
              <option>Status: Inactive</option>
            </select>
          </div>
          <button className="px-6 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-[var(--text-secondary)] text-sm font-medium hover:bg-[var(--card-hover)] transition-colors">
            Clear Filters
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--background-secondary)] sticky top-0 z-10">
              <tr className="border-b border-[var(--border)]">
                <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Joined Date</th>
                {/* <th className="px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider text-right">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {employees.length > 0 ? employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-[var(--card-hover)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {emp.avatar ? (
                        <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover bg-[var(--border)]" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-bold">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{emp.name}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[var(--background-tertiary)] text-[var(--text-secondary)] rounded-lg text-xs font-semibold">
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-primary)] capitalize">{emp.department}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${emp.status === 'active' ? 'bg-[var(--success)]' : 'bg-[var(--border)]'}`}></span>
                      <span className={`text-xs font-semibold ${emp.status === 'active' ? 'text-[var(--success)]' : 'text-[var(--text-secondary)]'}`}>
                        {emp.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                    {new Date(emp.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  {/* <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-[var(--card-elevated)] transition-colors text-[var(--text-secondary)]">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                  </td> */}
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[var(--text-secondary)]">
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
    <div className="p-8 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-[var(--text-primary)] mb-2 tracking-tight">Employee Directory</h2>
          <p className="text-[var(--text-secondary)]">Manage your organization's workforce and roles.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 border border-[var(--border)] rounded-xl text-[var(--text-primary)] text-sm font-medium hover:bg-[var(--card-hover)] transition-colors bg-[var(--card)]">
            <span className="material-symbols-outlined text-[20px]">ios_share</span>
            Export
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl text-sm font-medium hover:bg-[var(--primary-hover)] active:scale-[0.98] transition-all shadow-md">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">Total Employees</p>
          <div className="flex items-end gap-4">
            <span className="text-3xl font-bold text-[var(--text-primary)]">{pagination.total}</span>
          </div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">Active Now</p>
          <div className="flex items-end gap-4">
            <span className="text-3xl font-bold text-[var(--text-primary)]">{Math.floor(pagination.total * 0.9)}</span>
            <span className="w-2 h-2 rounded-full bg-[var(--success)] mb-2"></span>
          </div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">Open Positions</p>
          <div className="flex items-end gap-4">
            <span className="text-3xl font-bold text-[var(--text-primary)]">24</span>
            <span className="text-sm font-medium text-[var(--warning)] mb-1">Critical</span>
          </div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">New Hires (MoM)</p>
          <div className="flex items-end gap-4">
            <span className="text-3xl font-bold text-[var(--text-primary)]">42</span>
            <span className="text-sm font-medium text-[var(--text-secondary)] mb-1">Target: 50</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {renderContent()}
    </div>
  );
};

export default Employee;
