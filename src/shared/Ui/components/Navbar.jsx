
import {
  Bell,
  Grid2X2,
  Menu,
  Moon,
  Sun,
} from "lucide-react";


import { useDashboard } from '../../../features/dashboard/hooks/useDashboard';
const Navbar = ({ setIsSidebarOpen }) => {
  const { initials, handleChangeTheme , theme} = useDashboard();


  return (
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
            onClick={handleChangeTheme}
              type="button"
              aria-label="Notifications"
              className="relative rounded-md p-2 cursor-pointer text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
            >
             {theme !== "dark" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              type="button"
              aria-label="Notifications"
              className="relative rounded-md p-2 text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
            >
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--danger)]" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
              {initials}
            </div>
          </div>
        </nav>
  )
}

export default Navbar
