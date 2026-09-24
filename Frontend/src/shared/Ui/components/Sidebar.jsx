import { useState } from "react";
import { AlertTriangle, LogOut, Settings, X } from "lucide-react";
import { useDashboard } from "../../../features/dashboard/hooks/useDashboard";
import Button from "./Button";
import NavItem from "./NavItem";
import { useShared } from "../../hooks/useShared";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { handleLogout, isLoggingOut } = useDashboard();
  const { navigationItems } = useShared();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

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

      {/* Confirmation Modal for Logout */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowLogoutModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
                <AlertTriangle size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  Confirm Logout
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Are you sure you want to log out? You will need to enter your
                  credentials to sign in again.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="cursor-pointer rounded-xl border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="cursor-pointer flex items-center gap-1.5 rounded-xl bg-red-500 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-red-600 transition-colors"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </div>
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
          <Button
            icon={X}
            ariaLabel="Close navigation"
            fullWidth={false}
            className="rounded-md p-1 text-[var(--text-muted)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <nav aria-label="Main navigation" className="space-y-1">
          {navigationItems.map(({ label, icon: Icon, to, alsoActiveFor }) => (
            <NavItem
              label={label}
              icon={Icon}
              to={to}
              key={label}
              alsoActiveFor={alsoActiveFor}
              onClick={() => setIsSidebarOpen(false)}
            />
          ))}
        </nav>

        <div className="mt-auto space-y-2  pt-4">
          <NavItem
            label="Settings"
            icon={Settings}
            to="/dashboard/setting"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <div className="mt-auto space-y-2 border-t border-[var(--border)] pt-4">
          <Button
            icon={LogOut}
            onClick={() => setShowLogoutModal(true)}
            disabled={isLoggingOut}
            className="group border border-[var(--accent)]/35 bg-[var(--accent)]/10 text-[var(--accent)] shadow-[var(--glow-accent)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/20 hover:text-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          >
            {isLoggingOut ? "Signing out..." : "Log out"}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
