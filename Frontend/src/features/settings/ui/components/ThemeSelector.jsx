import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Check, Sun, Moon } from "lucide-react";
import { toggleTheme } from "../../../../shared/state/Theme.slice.jsx";

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  const isDark = mode === "dark";
  const isLight = mode === "light";

  const handleSelectTheme = (selectedMode) => {
    if (selectedMode !== mode) {
      dispatch(toggleTheme());
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">
          Appearance
        </h2>
        <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-0.5">
          Choose how Team_sync looks on your device.
        </p>
      </div>

      {/* Main Appearance Card */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 md:p-7 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* LIGHT THEME OPTION */}
          <button
            type="button"
            onClick={() => handleSelectTheme("light")}
            className={`group relative flex flex-col p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
              isLight
                ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-2 ring-[var(--primary)]/20 shadow-md"
                : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-light)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            {/* Visual Mini Preview: Light */}
            <div className="w-full h-36 rounded-xl border border-[#dcdcd5] bg-[#f5f5f0] p-3 flex flex-col justify-between overflow-hidden shadow-xs relative">
              {/* Mini Header */}
              <div className="flex items-center justify-between border-b border-[#dcdcd5] pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-md bg-[#5d866c]" />
                  <div className="h-2 w-14 rounded bg-[#303833]/70" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#dcdcd5]" />
                  <div className="w-3 h-3 rounded-full bg-[#5d866c]" />
                </div>
              </div>

              {/* Mini Content Grid */}
              <div className="flex gap-2 flex-1 pt-2">
                {/* Mini Left Nav */}
                <div className="w-1/4 space-y-1.5 border-r border-[#dcdcd5] pr-1.5">
                  <div className="h-2 w-full rounded bg-[#5d866c]/30" />
                  <div className="h-2 w-3/4 rounded bg-[#dcdcd5]" />
                  <div className="h-2 w-4/5 rounded bg-[#dcdcd5]" />
                </div>
                {/* Mini Cards */}
                <div className="flex-1 space-y-1.5">
                  <div className="h-7 w-full rounded bg-[#ffffff] border border-[#dcdcd5] p-1.5 flex items-center justify-between shadow-2xs">
                    <div className="h-2 w-1/2 rounded bg-[#303833]/50" />
                    <div className="h-2 w-4 rounded bg-[#5d866c]" />
                  </div>
                  <div className="h-7 w-full rounded bg-[#ffffff] border border-[#dcdcd5] p-1.5 flex items-center justify-between shadow-2xs">
                    <div className="h-2 w-2/3 rounded bg-[#303833]/50" />
                    <div className="h-2 w-4 rounded bg-[#b98222]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Info */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isLight
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "bg-[var(--card)] text-[var(--text-muted)] border border-[var(--border)]"
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs md:text-sm font-semibold text-[var(--text-primary)] block">
                    LIGHT
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] block">
                    Crisp surfaces & gentle contrast
                  </span>
                </div>
              </div>

              {/* Radio check indicator */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                  isLight
                    ? "bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                    : "border-[var(--border)] bg-[var(--card)]"
                }`}
              >
                {isLight && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          </button>

          {/* DARK THEME OPTION */}
          <button
            type="button"
            onClick={() => handleSelectTheme("dark")}
            className={`group relative flex flex-col p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
              isDark
                ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-2 ring-[var(--primary)]/20 shadow-md"
                : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-light)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            {/* Visual Mini Preview: Dark */}
            <div className="w-full h-36 rounded-xl border border-[#303531] bg-[#121212] p-3 flex flex-col justify-between overflow-hidden shadow-xs relative">
              {/* Mini Header */}
              <div className="flex items-center justify-between border-b border-[#303531] pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-md bg-[#34d399]" />
                  <div className="h-2 w-14 rounded bg-[#e5e7eb]/70" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#303531]" />
                  <div className="w-3 h-3 rounded-full bg-[#34d399]" />
                </div>
              </div>

              {/* Mini Content Grid */}
              <div className="flex gap-2 flex-1 pt-2">
                {/* Mini Left Nav */}
                <div className="w-1/4 space-y-1.5 border-r border-[#303531] pr-1.5">
                  <div className="h-2 w-full rounded bg-[#34d399]/30" />
                  <div className="h-2 w-3/4 rounded bg-[#303531]" />
                  <div className="h-2 w-4/5 rounded bg-[#303531]" />
                </div>
                {/* Mini Cards */}
                <div className="flex-1 space-y-1.5">
                  <div className="h-7 w-full rounded bg-[#181a19] border border-[#303531] p-1.5 flex items-center justify-between shadow-2xs">
                    <div className="h-2 w-1/2 rounded bg-[#e5e7eb]/40" />
                    <div className="h-2 w-4 rounded bg-[#34d399]" />
                  </div>
                  <div className="h-7 w-full rounded bg-[#181a19] border border-[#303531] p-1.5 flex items-center justify-between shadow-2xs">
                    <div className="h-2 w-2/3 rounded bg-[#e5e7eb]/40" />
                    <div className="h-2 w-4 rounded bg-[#fbbf24]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Info */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isDark
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "bg-[var(--card)] text-[var(--text-muted)] border border-[var(--border)]"
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs md:text-sm font-semibold text-[var(--text-primary)] block">
                    DARK
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] block">
                    Deep tones & high performance
                  </span>
                </div>
              </div>

              {/* Radio check indicator */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                  isDark
                    ? "bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                    : "border-[var(--border)] bg-[var(--card)]"
                }`}
              >
                {isDark && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          </button>
        </div>

        {/* Auto-save helper notice */}
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            Your appearance preference is saved automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
