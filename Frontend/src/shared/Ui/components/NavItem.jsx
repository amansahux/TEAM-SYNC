import { NavLink, useLocation } from "react-router";

const NavItem = ({ label, icon: Icon, to, onClick, alsoActiveFor = [] }) => {
  const { pathname } = useLocation();
  const isForceActive = alsoActiveFor.some((path) => pathname.startsWith(path));

  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive || isForceActive
            ? "bg-[var(--primary)]/20 text-[var(--primary)]"
            : "text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
        }`
      }
      onClick={onClick}
    >
      <Icon size={17} strokeWidth={1.8} />
      {label}
    </NavLink>
  );
};

export default NavItem;

