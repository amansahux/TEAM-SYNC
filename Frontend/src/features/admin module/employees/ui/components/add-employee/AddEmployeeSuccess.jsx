import React from "react";
import { Link } from "react-router";
import { CheckCircle2, UserPlus, Users, ArrowRight } from "lucide-react";

const AddEmployeeSuccess = ({ onAddAnother }) => {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 sm:p-12 shadow-[var(--shadow-lg)] max-w-2xl mx-auto w-full text-center mt-6 animate-in zoom-in-95 duration-200">
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-full bg-[var(--success-light)] border border-[var(--success)]/30 flex items-center justify-center text-[var(--success)] mx-auto mb-6 shadow-[var(--glow-primary)]">
        <CheckCircle2 size={36} />
      </div>

      {/* Success Title */}
      <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)] tracking-tight">
        Employee Profile Created!
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-md mx-auto leading-relaxed">
        The new employee has been successfully added to TEAM_SYNC and workspace permissions have been provisioned.
      </p>

      {/* Info Badge Box */}
      <div className="mt-8 p-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-xs text-[var(--text-muted)] flex items-center justify-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-[var(--success)]"></span>
        <span>Account active & ready for SSO sign-in</span>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={onAddAnother}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[var(--card-hover)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-primary)] font-medium text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <UserPlus size={18} />
          <span>Add Another Employee</span>
        </button>

        <Link
          to="/dashboard/employee"
          className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-semibold text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Users size={18} />
          <span>View All Employees</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default AddEmployeeSuccess;
