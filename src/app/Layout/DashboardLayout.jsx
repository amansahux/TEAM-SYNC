import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import {
  Bell,
  CheckSquare,
  Grid2X2,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const navigationItems = [
  { label: "Dashboard", icon: Grid2X2 },
  { label: "Tasks", icon: CheckSquare },
  { label: "Team", icon: Users },
  { label: "Chat", icon: MessageSquare },
  { label: "Settings", icon: Settings },
];

const DashboardLayout = () => {
  const { mode } = useSelector((state) => state.theme);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  useEffect(() => {
    if (mode === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [mode]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
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
          {navigationItems.map(({ label, icon: Icon }, index) => (
            <a
              href="#"
              key={label}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                index === 0
                  ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="mt-auto flex items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] shadow-[var(--glow-primary)] transition-colors hover:bg-[var(--primary-hover)]"
        >
          <Plus size={17} />
          New Task
        </button>
      </aside>

      <section className="min-h-screen lg:pl-64">
        <nav className="sticky top-0 z-20 flex h-[60px] items-center gap-3 border-b border-[var(--border)] bg-[var(--navbar)]/95 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            aria-label="Open navigation"
            className="rounded-md p-2 text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <input
              type="search"
              placeholder="Search workspace..."
              aria-label="Search workspace"
              className="w-full rounded-md border border-[var(--input-border)] bg-[var(--input)] py-2 pl-9 pr-3 text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--input-focus)]"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <Grid2X2 size={14} />
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              aria-label="Notifications"
              className="relative rounded-md p-2 text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
            >
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--danger)]" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
              RK
            </div>
          </div>
        </nav>
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
