import React, { useState, useRef, useEffect } from "react";
import { Briefcase, ChevronDown, Lock, Check } from "lucide-react";

const DEPARTMENT_OPTIONS = [
  { value: "common", label: "Common (General)" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "manager", label: "Manager" },
  { value: "marketer", label: "Marketer" },
];

const EmploymentDetailsSection = ({ register, watch, setValue }) => {
  const currentStatus = watch("status");
  const currentDepartment = watch("department") || "common";

  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDeptOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedDeptObj =
    DEPARTMENT_OPTIONS.find((d) => d.value === currentDepartment) ||
    DEPARTMENT_OPTIONS[0];

  return (
    <section className="bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-sm p-6 sm:p-8 transition-all">
      {/* Section Title & Icon */}
      <div className="flex items-center space-x-3 pb-5 border-b border-[var(--border)]/50">
        <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
          <Briefcase size={19} />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-[var(--text-primary)] tracking-wide">
            Employment Details
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Organizational alignment, platform permissions, and activation status.
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-6">
        {/* Department and Role in a 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department Custom Dropdown */}
          <div ref={dropdownRef}>
            <label
              htmlFor="department"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
            >
              Department <span className="text-[var(--danger)]">*</span>
            </label>
            
            {/* Hidden native select for react-hook-form */}
            <select id="department" {...register("department")} className="hidden">
              {DEPARTMENT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDeptOpen((prev) => !prev)}
                className="input text-sm flex items-center justify-between w-full cursor-pointer select-none text-left"
              >
                <span>{selectedDeptObj.label}</span>
                <ChevronDown
                  size={18}
                  className={`text-[var(--text-muted)] transition-transform duration-200 ${
                    isDeptOpen ? "rotate-180 text-[var(--primary)]" : ""
                  }`}
                />
              </button>

              {isDeptOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[var(--card-elevated)] border border-[var(--border)] rounded-xl shadow-[var(--shadow-lg)] py-1.5 z-50 overflow-hidden">
                  {DEPARTMENT_OPTIONS.map((dept) => {
                    const isSelected = dept.value === currentDepartment;
                    return (
                      <button
                        key={dept.value}
                        type="button"
                        onClick={() => {
                          setValue("department", dept.value, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                          setIsDeptOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors text-left ${
                          isSelected
                            ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                            : "text-[var(--text-primary)] hover:bg-[var(--card-hover)]"
                        }`}
                      >
                        <span>{dept.label}</span>
                        {isSelected && (
                          <Check size={16} className="text-[var(--primary)] ml-2 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
              Assigns default workspace channels and permission scopes.
            </p>
          </div>

          {/* Role (Read-Only) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="role"
                className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
              >
                Assigned Role
              </label>
              <span className="text-[10px] font-mono uppercase bg-[var(--background)] px-2 py-0.5 rounded text-[var(--text-muted)]">
                Read-Only
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                id="role"
                value="Employee"
                readOnly
                className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] text-[var(--text-secondary)] text-sm cursor-not-allowed select-none font-medium"
              />
              <Lock
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                title="Role fixed to standard Employee"
              />
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
              Admin roles are provisioned exclusively via Executive Governance.
            </p>
          </div>
        </div>

        {/* Status Segmented Control */}
        <div className="pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
            Employment Status <span className="text-[var(--danger)]">*</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
            {/* Active Option */}
            <label
              className={`relative flex items-center p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                currentStatus === "active"
                  ? "border-[var(--primary)] bg-[var(--primary)]/5"
                  : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--text-muted)]"
              }`}
            >
              <input
                type="radio"
                value="active"
                {...register("status")}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                  currentStatus === "active"
                    ? "border-[var(--primary)]"
                    : "border-[var(--text-muted)]"
                }`}
              >
                {currentStatus === "active" && (
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-bold ${
                      currentStatus === "active"
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    Active
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[var(--success)]"></span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Immediate workspace access & email passkey
                </p>
              </div>
            </label>

            {/* Inactive Option */}
            <label
              className={`relative flex items-center p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                currentStatus === "inactive"
                  ? "border-[var(--primary)] bg-[var(--primary)]/5"
                  : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--text-muted)]"
              }`}
            >
              <input
                type="radio"
                value="inactive"
                {...register("status")}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                  currentStatus === "inactive"
                    ? "border-[var(--primary)]"
                    : "border-[var(--text-muted)]"
                }`}
              >
                {currentStatus === "inactive" && (
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-bold ${
                      currentStatus === "inactive"
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    Inactive
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]"></span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Profile preserved, authentication suspended
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmploymentDetailsSection;
