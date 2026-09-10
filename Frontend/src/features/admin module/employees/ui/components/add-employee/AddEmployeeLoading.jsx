import React from "react";
import { Loader2, ShieldCheck, UserCheck, KeyRound } from "lucide-react";

const AddEmployeeLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 px-4">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 sm:p-10 max-w-md w-full shadow-[var(--shadow-xl)] flex flex-col items-center text-center">
        {/* Animated Loading Spinner Ring */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-[var(--primary)]/20 animate-ping absolute inset-0"></div>
          <div className="w-20 h-20 rounded-full border-4 border-[var(--primary)] border-t-transparent animate-spin flex items-center justify-center">
            <Loader2 className="text-[var(--primary)] animate-spin" size={32} />
          </div>
        </div>

        {/* Loading Titles */}
        <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)] tracking-wide">
          Provisioning Employee Profile
        </h3>
        <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
          Please wait while TEAM_SYNC securely provisions workspace credentials and assigns security scopes.
        </p>

        {/* Progress Checklist Badges */}
        <div className="w-full mt-6 pt-6 border-t border-[var(--border)]/60 space-y-3 text-left">
          <div className="flex items-center space-x-3 text-xs text-[var(--text-secondary)]">
            <ShieldCheck size={16} className="text-[var(--primary)] flex-shrink-0 animate-pulse" />
            <span>Verifying ISO 27001 compliance standards</span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-[var(--text-secondary)]">
            <UserCheck size={16} className="text-[var(--primary)] flex-shrink-0 animate-pulse" />
            <span>Configuring department workspace channels</span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-[var(--text-secondary)]">
            <KeyRound size={16} className="text-[var(--primary)] flex-shrink-0 animate-pulse" />
            <span>Encrypting authentication passkey</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeLoading;
