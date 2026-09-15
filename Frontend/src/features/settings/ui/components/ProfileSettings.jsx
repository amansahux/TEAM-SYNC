import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Lock, ShieldCheck, User } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar.jsx";

const ProfileSettings = ({ employeeData }) => {
  const user = employeeData?.data?.user || employeeData?.user || {};

  const defaultName = user.name || "Alex Morgan";
  const defaultEmail = user.email || "alex.morgan@teamsync.internal";
  const employeeId = user.employeeId || user._id ? `EMP-${String(user._id || "98421").slice(-6).toUpperCase()}` : "EMP-98421";
  const department = user.department || "Engineering";
  const role = user.role || "Developer";

  const initials = defaultName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const [saveStatus, setSaveStatus] = useState("idle"); // 'idle' | 'saving' | 'saved'

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      fullName: defaultName,
    },
  });

  const onSubmit = (data) => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">
          Profile
        </h2>
        <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-0.5">
          Manage your personal information and profile photo.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 md:p-7 shadow-xs space-y-7">
        {/* 1. Profile Avatar */}
        <ProfileAvatar
          name={defaultName}
          initials={initials}
          currentAvatar={user.avatar?.url || user.avatar || null}
          onAvatarChange={(file) => {
            // Frontend-only handler ready for future API integration
          }}
        />

        {/* 2. Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name (Editable) */}
          <div className="space-y-1.5">
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold text-[var(--text-primary)]"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                placeholder="Enter your full name"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-[var(--input)] border text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all ${
                  errors.fullName
                    ? "border-red-500 focus:border-red-500"
                    : "border-[var(--input-border)] focus:border-[var(--primary)]"
                }`}
              />
              <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            </div>
            {errors.fullName && (
              <p className="text-[11px] text-red-400 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Address (Read-only SSO Managed) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[var(--text-primary)]"
              >
                Email Address
              </label>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-2 py-0.5 rounded-md">
                <ShieldCheck className="w-3 h-3" />
                SSO Managed
              </span>
            </div>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={defaultEmail}
                readOnly
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] cursor-not-allowed select-none opacity-80"
              />
              <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Managed by your organization single sign-on directory.
            </p>
          </div>

          {/* Read-only metadata grid: Employee ID, Department, Role */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Employee ID */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[var(--text-primary)]">
                  Employee ID
                </label>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] px-1.5 py-0.5 rounded">
                  IMMUTABLE
                </span>
              </div>
              <input
                type="text"
                value={employeeId}
                readOnly
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] font-mono cursor-not-allowed opacity-80"
              />
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[var(--text-primary)]">
                Department
              </label>
              <input
                type="text"
                value={department}
                readOnly
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] capitalize cursor-not-allowed opacity-80"
              />
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[var(--text-primary)]">
                Role
              </label>
              <input
                type="text"
                value={role}
                readOnly
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl text-xs md:text-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] capitalize cursor-not-allowed opacity-80"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[var(--border)] flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={saveStatus === "saving"}
              className="px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              {saveStatus === "saving" ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[var(--primary-foreground)] border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : saveStatus === "saved" ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved Changes
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
