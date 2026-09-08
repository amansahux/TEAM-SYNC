import { LogOut, Plus, X } from "lucide-react";
import { useDashboard } from "../../../features/dashboard/hooks/useDashboard";
import Button from "./Button";
import NavItem from "./NavItem";
import { useShared } from "../../hooks/useShared";


const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { handleLogout, isLoggingOut } = useDashboard();
  const { navigationItems } = useShared();
 

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

        <div className="mt-auto space-y-3 border-t border-[var(--border)] pt-4">
          <Button
            icon={Plus}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] shadow-[var(--glow-primary)] transition-colors hover:bg-[var(--primary-hover)]"
          >
            New Task
          </Button>
          <Button
            icon={LogOut}
            onClick={handleLogout}
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
