import React from "react";
import { User } from "lucide-react";

const PersonalInformationSection = ({ register, errors }) => {
  return (
    <section className="bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-sm p-6 sm:p-8 transition-all">
      {/* Section Title & Icon */}
      <div className="flex items-center space-x-3 pb-5 border-b border-[var(--border)]/50">
        <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
          <User size={19} />
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold text-[var(--text-primary)] tracking-wide">
            Personal Information
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Core identity credentials and public profile information.
          </p>
        </div>
      </div>

      {/* Fields Container */}
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
          >
            Full Name <span className="text-[var(--danger)]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="e.g. Aman Sahu"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-[var(--danger)]" : "border-[var(--input-border)]"
              } bg-[var(--input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] shadow-xs`}
            />
          </div>
          {errors.name ? (
            <p className="text-[11px] text-[var(--danger)] mt-1.5">{errors.name.message}</p>
          ) : (
            <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
              Official legal name as registered in identity documents.
            </p>
          )}
        </div>

        {/* Email Address Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2"
          >
            Email Address <span className="text-[var(--danger)]">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="employee@company.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-[var(--danger)]" : "border-[var(--input-border)]"
              } bg-[var(--input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] shadow-xs`}
            />
          </div>
          {errors.email ? (
            <p className="text-[11px] text-[var(--danger)] mt-1.5">{errors.email.message}</p>
          ) : (
            <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
              Primary email address used for SSO access and notifications.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonalInformationSection;
