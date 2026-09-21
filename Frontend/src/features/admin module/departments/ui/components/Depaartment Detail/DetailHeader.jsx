import React from "react";
import { useNavigate } from "react-router";
import { Download, UserPlus, Sparkles, Building2, Terminal, Palette, Megaphone, Network } from "lucide-react";

const ICON_MAP = {
  Terminal,
  Palette,
  Building2,
  Megaphone,
  Network,
};

const DetailHeader = ({ departmentName, theme, totalEmployeesCount, onExport }) => {
  const navigate = useNavigate();

  const IconComponent = ICON_MAP[theme?.icon] || Network;

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]/60">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
              theme?.iconBgClass || "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20"
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--muted-foreground)]">
                {theme?.clusterLabel || "Department Node"}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--muted-foreground)]">
                <Sparkles className="w-3 h-3 text-[var(--primary)]" /> System Active
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight capitalize text-[var(--foreground)] mt-0.5">
              {departmentName} <span className="text-[var(--muted-foreground)] font-normal text-2xl">Department</span>
            </h1>
          </div>
        </div>
        <p className="text-sm text-[var(--muted-foreground)] max-w-2xl pl-14">
          {theme?.description || `Overview, management, and roster of all members in the ${departmentName} department.`}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-elevated)] hover:border-[var(--border-hover)] text-sm font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4 text-[var(--muted-foreground)]" />
          Export Roster
        </button>

        <button
          onClick={() => navigate("/dashboard/add-employee")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-semibold transition-all shadow-md shadow-[var(--primary)]/20 active:scale-95 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          Add Member
        </button>
      </div>
    </div>
  );
};

export default DetailHeader;
