import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const DetailBreadcrumb = ({ departmentName }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
      <div className="flex items-center gap-2 text-sm">
        <Link
          to="/dashboard/department"
          className="inline-flex items-center gap-1.5 text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Departments</span>
        </Link>
        <span className="text-[var(--text-muted)]">/</span>
        <span className="text-[var(--text-muted)]">Workspace</span>
        <span className="text-[var(--text-muted)]">/</span>
        <span className="text-[var(--text-muted)]">Departments</span>
        <span className="text-[var(--text-muted)]">/</span>
        <span className="text-[var(--text-primary)] font-medium capitalize">
          {departmentName}
        </span>
      </div>
    </div>
  );
};

export default DetailBreadcrumb;
