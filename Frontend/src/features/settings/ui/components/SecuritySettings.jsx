import React, { useState, useMemo } from "react";
import {
  ShieldAlert,
  Check,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Laptop,
  KeyRound,
} from "lucide-react";
import PasswordField from "./PasswordField.jsx";
import { useDashboard } from "../../../dashboard/hooks/useDashboard";

const SecuritySettings = () => {
  const { handleLogout, isLoggingOut } = useDashboard();

  // Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [updateStatus, setUpdateStatus] = useState("idle"); // 'idle' | 'updating' | 'updated'

  // Password Requirements Evaluation
  const passwordRequirements = useMemo(() => {
    return [
      { label: "At least 8 characters", met: newPassword.length >= 8 },
      { label: "Contains a lowercase letter", met: /[a-z]/.test(newPassword) },
      { label: "Contains an uppercase letter", met: /[A-Z]/.test(newPassword) },
      { label: "Contains a number or symbol", met: /[\d\W]/.test(newPassword) },
    ];
  }, [newPassword]);

  // Password Strength Score (0 to 4)
  const strengthScore = useMemo(() => {
    if (!newPassword) return 0;
    return passwordRequirements.filter((req) => req.met).length;
  }, [passwordRequirements, newPassword]);

  const strengthMeta = useMemo(() => {
    switch (strengthScore) {
      case 0:
        return { label: "", color: "bg-transparent", text: "" };
      case 1:
        return { label: "Weak", color: "bg-red-500", text: "text-red-400" };
      case 2:
        return { label: "Fair", color: "bg-yellow-500", text: "text-yellow-400" };
      case 3:
        return { label: "Good", color: "bg-blue-400", text: "text-blue-400" };
      case 4:
        return { label: "Strong", color: "bg-[var(--primary)]", text: "text-[var(--primary)]" };
      default:
        return { label: "", color: "bg-transparent", text: "" };
    }
  }, [strengthScore]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setUpdateStatus("updating");
    setTimeout(() => {
      setUpdateStatus("updated");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setUpdateStatus("idle"), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)]">
          Security
        </h2>
        <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-0.5">
          Manage your password and account security.
        </p>
      </div>

      {/* Change Password Card */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 md:p-7 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
          <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-semibold text-[var(--text-primary)]">
              Change Password
            </h3>
            <p className="text-[11px] md:text-xs text-[var(--text-muted)]">
              Ensure your account is using a long and random password to stay secure.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          {/* Current Password */}
          <PasswordField
            id="currentPassword"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              if (errors.currentPassword) {
                setErrors((prev) => ({ ...prev, currentPassword: null }));
              }
            }}
            placeholder="Enter your current password"
            error={errors.currentPassword}
          />

          {/* New Password */}
          <PasswordField
            id="newPassword"
            label="New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (errors.newPassword) {
                setErrors((prev) => ({ ...prev, newPassword: null }));
              }
            }}
            placeholder="Enter your new password"
            error={errors.newPassword}
          />

          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="space-y-2 p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)]">Password Strength</span>
                <span className={`font-semibold ${strengthMeta.text}`}>
                  {strengthMeta.label}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full rounded-full transition-all duration-300 ${
                      step <= strengthScore ? strengthMeta.color : "bg-[var(--border)]"
                    }`}
                  />
                ))}
              </div>

              {/* Requirement Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2">
                {passwordRequirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px]">
                    {req.met ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-[var(--border)] shrink-0 flex items-center justify-center" />
                    )}
                    <span
                      className={
                        req.met ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                      }
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirm New Password */}
          <PasswordField
            id="confirmPassword"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) {
                setErrors((prev) => ({ ...prev, confirmPassword: null }));
              }
            }}
            placeholder="Re-enter your new password"
            error={errors.confirmPassword}
          />

          {/* Action Row */}
          <div className="pt-4 border-t border-[var(--border)] flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={updateStatus === "updating"}
              className="px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              {updateStatus === "updating" ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[var(--primary-foreground)] border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : updateStatus === "updated" ? (
                <>
                  <Check className="w-4 h-4" />
                  Password Updated
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Account Session Card */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 md:p-7 shadow-xs space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] flex items-center justify-center shrink-0 mt-0.5">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-semibold text-[var(--text-primary)]">
                Account Session
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                You are currently signed in to this device.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  Active Session • Windows (Chrome)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-[var(--text-muted)] max-w-sm">
            Sign out of your account on this device or invalidate all active workspace sessions.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-500 border border-red-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            {isLoggingOut ? "Signing out..." : "Log Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
