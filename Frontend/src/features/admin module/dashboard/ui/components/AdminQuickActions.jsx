import React from "react";
import { Link } from "react-router";
import {
  Users,
  CheckSquare,
  Building2,
  MessageSquare,
  PlusCircle,
  FileSpreadsheet,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const quickLinks = [
  {
    label: "Add New Employee",
    desc: "Register a team member into the organization",
    to: "/dashboard/add-employee",
    icon: PlusCircle,
    color: "text-[var(--primary)]",
    bg: "bg-[var(--primary-light)]",
  },
  {
    label: "Create Task Deliverable",
    desc: "Assign deadlines, priority, and assignees",
    to: "/dashboard/create-task",
    icon: CheckSquare,
    color: "text-[var(--secondary)]",
    bg: "bg-[var(--secondary-light)]",
  },
  {
    label: "Manage Departments",
    desc: "View units, headcount, and allocate resources",
    to: "/dashboard/department",
    icon: Building2,
    color: "text-[#60A5FA]",
    bg: "bg-[#60A5FA]/15",
  },
  {
    label: "Team Live Chat",
    desc: "Collaborate and communicate across team channels",
    to: "/dashboard/chat",
    icon: MessageSquare,
    color: "text-[#FB923C]",
    bg: "bg-[#FB923C]/15",
  },
];

const AdminQuickActions = () => {
  return (
    <div className="card p-5 sm:p-6">
      <div className="border-b border-[var(--border-subtle)] pb-4 mb-4">
        <h3 className="text-base font-display font-bold text-[var(--text-primary)]">
          Executive Control & Actions
        </h3>
        <p className="text-xs text-[var(--text-muted)]">
          Fast lane navigation to core administrative operations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              className="group p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border)] transition-all flex items-start gap-3.5"
            >
              <div className={`h-10 w-10 shrink-0 rounded-xl ${item.bg} ${item.color} flex items-center justify-center border border-current/20 group-hover:scale-105 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                    {item.label}
                  </h4>
                  <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminQuickActions;
