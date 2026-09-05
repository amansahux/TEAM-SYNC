import React from "react";
import {
  Book,
  CheckSquare,
  Grid2X2,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  Users,
  X,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useDashboard } from "../../../features/dashboard/hooks/useDashboard";

const commonNavigationItems = [
  { label: "Dashboard", icon: Grid2X2, to: "/dashboard" },
  { label: "Chat", icon: MessageSquare, to: "/dashboard/chat" },
  { label: "Settings", icon: Settings, to: "/dashboard/setting" },
];

const roleNavigationItems = {
  employee: [
    { label: "Attendance", icon: Book, to: "/dashboard/home/attendance" },
    { label: "My Tasks", icon: CheckSquare, to: "/dashboard/home/my-task" },
    { label: "Profile", icon: Users, to: "/dashboard/home/profile" },
  ],
  admin: [
    { label: "Departments", icon: Users, to: "/dashboard/home/department" },
    { label: "Employees", icon: Users, to: "/dashboard/home/employee" },
    { label: "Documents", icon: CheckSquare, to: "/dashboard/home/document" },
    { label: "Tasks", icon: CheckSquare, to: "/dashboard/home/task" },
  ],
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { handleLogout, isLoggingOut } = useDashboard();
  const employee = useSelector((state) => state.auth.employee);
  const location = useLocation();
  const employeeRole = (
    employee?.user?.role ||
    employee?.role ||
    employee?.employee?.user?.role ||
    employee?.data?.user?.role ||
    ""
  ).toLowerCase();
  const navigationItems = [
    ...commonNavigationItems,
    ...(roleNavigationItems[employeeRole] || []),
  ];
  return (
    <>
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {isLoggingOut && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-6 backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <div className="flex w-full max-w-xs flex-col items-center rounded-2xl border border-white/10 bg-[var(--sidebar)] px-8 py-7 text-center shadow-2xl">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-[var(--accent)]/20 border-t-[var(--accent)]" />
              <LogOut size={24} />
            </div>
            <p className="mt-5 text-base font-semibold text-[var(--text-primary)]">
              Signing you out
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Securing your workspace...
            </p>
          </div>
        </div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[var(--border)] bg-[var(--sidebar)] px-3 py-5 shadow-[var(--shadow-lg)] transition-transform duration-300 lg:translate-x-0 lg:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between px-3 pb-8">
          <div>
            <p className="text-lg font-bold leading-none text-[var(--primary)]">
              TEAM SYNC
            </p>
            <p className="mt-1 text-[10px] font-medium tracking-wide text-[var(--text-secondary)]">
              Enterprise Workspace
            </p>
          </div>
          <button
            type="button"
            aria-label="Close navigation"
            className="rounded-md p-1 text-[var(--text-muted)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav aria-label="Main navigation" className="space-y-1">
          {navigationItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              to={to}
              key={label}
              end={to === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive || (to === "/dashboard" && location.pathname === "/dashboard")
                    ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-3 border-t border-[var(--border)] pt-4">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] shadow-[var(--glow-primary)] transition-colors hover:bg-[var(--primary-hover)]"
          >
            <Plus size={17} />
            New Task
          </button>
          <button
            onClick={handleLogout}
            type="button"
            disabled={isLoggingOut}
            className="group cursor-pointer flex w-full items-center justify-center gap-2 rounded-md border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-4 py-2.5 text-sm font-semibold text-[var(--accent)] shadow-[var(--glow-accent)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/20 hover:text-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          >
            <LogOut
              size={17}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            {isLoggingOut ? "Signing out..." : "Log out"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
