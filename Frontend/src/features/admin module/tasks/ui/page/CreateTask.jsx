import React from "react";
import { Link, useNavigate } from "react-router";
import { useCreateTask } from "../../hooks/useTask";
import {
  ArrowLeft,
  Plus,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Users,
  Flag,
  FileText,
  Sparkles,
} from "lucide-react";

const CreateTask = () => {
  const navigate = useNavigate();
  const {
    form,
    employees,
    isEmployeesLoading,
    onSubmit,
    isSubmitting,
    isSuccess,
    serverError,
    successMessage,
    resetForm,
  } = useCreateTask(() => {
    // Optional automatic navigation back to task list after brief delay
    setTimeout(() => {
      navigate("/dashboard/task");
    }, 1200);
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 lg:py-12 px-6 lg:px-12">
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border)]">
        <div>
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase mb-1">
            <Link
              to="/dashboard/task"
              className="hover:text-[var(--primary)] transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Task Registry</span>
            </Link>
            <span className="text-[var(--text-disabled)]">/</span>
            <span className="text-[var(--primary)] font-semibold">New Task</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-[var(--text-primary)] tracking-tight leading-tight">
            Create New Task
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            Dispatch actionable directives, assign team personnel, and set milestone priorities.
          </p>
        </div>

        <Link
          to="/dashboard/task"
          className="btn-outline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl self-start md:self-auto cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tasks</span>
        </Link>
      </div>

      {/* Status Messages */}
      {serverError && (
        <div className="p-4 rounded-xl bg-[var(--danger-light)] border border-[var(--danger)]/30 flex items-center gap-3 text-sm text-[var(--danger)] animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-[var(--primary-light)] border border-[var(--primary)]/30 flex items-center gap-3 text-sm text-[var(--primary)] animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage} Redirecting to task list...</span>
        </div>
      )}

      {/* Main Form Container */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-md)] overflow-hidden">
        {/* Card Header Bar */}
        <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--surface)] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span>Task Parameters &amp; Specifications</span>
          </div>
          <span className="text-xs text-[var(--text-muted)]">* Required fields</span>
        </div>

        <form onSubmit={onSubmit} className="p-6 md:p-8 space-y-6">
          {/* Section 1: Task Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>Task Title *</span>
              </label>
              <input
                type="text"
                {...register("title")}
                placeholder="e.g., Integrate OAuth 2.0 Identity Flow"
                className={`w-full bg-[var(--input)] border ${
                  errors.title
                    ? "border-[var(--danger)]"
                    : "border-[var(--input-border)]"
                } text-[var(--text-primary)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--text-muted)]`}
              />
              {errors.title && (
                <p className="text-xs text-[var(--danger)] mt-1.5 font-medium">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Detailed Scope / Description
              </label>
              <textarea
                rows={4}
                {...register("description")}
                placeholder="Provide comprehensive objectives, acceptance criteria, or relevant design documentation..."
                className="w-full bg-[var(--input)] border border-[var(--input-border)] text-[var(--text-primary)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--text-muted)] resize-none"
              />
            </div>
          </div>

          <div className="h-[1px] bg-[var(--border-subtle)]" />

          {/* Section 2: Assignment & Logistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assignee Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[var(--secondary)]" />
                <span>Assign To Employee *</span>
              </label>
              <select
                {...register("assignedTo")}
                disabled={isEmployeesLoading}
                className={`w-full bg-[var(--input)] border ${
                  errors.assignedTo
                    ? "border-[var(--danger)]"
                    : "border-[var(--input-border)]"
                } text-[var(--text-primary)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer`}
              >
                <option value="">
                  {isEmployeesLoading
                    ? "Loading employee roster..."
                    : "Choose team member..."}
                </option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} — {emp.department || "General"} ({emp.email})
                  </option>
                ))}
              </select>
              {errors.assignedTo && (
                <p className="text-xs text-[var(--danger)] mt-1.5 font-medium">
                  {errors.assignedTo.message}
                </p>
              )}
            </div>

            {/* Priority Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-[var(--warning)]" />
                <span>Execution Priority</span>
              </label>
              <select
                {...register("priority")}
                className="w-full bg-[var(--input)] border border-[var(--input-border)] text-[var(--text-primary)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
              >
                <option value="low">Low Priority (Maintenance / Backlog)</option>
                <option value="medium">Medium Priority (Standard Sprint)</option>
                <option value="high">High Priority (Urgent Deliverable)</option>
              </select>
            </div>

            {/* Initial Status */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Initial Pipeline Status
              </label>
              <select
                {...register("status")}
                className="w-full bg-[var(--input)] border border-[var(--input-border)] text-[var(--text-primary)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors cursor-pointer"
              >
                <option value="todo">To-Do (Queued)</option>
                <option value="in-progress">In Progress (Active)</option>
                <option value="completed">Completed (Delivered)</option>
              </select>
            </div>

            {/* Target Due Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--secondary)]" />
                <span>Target Due Date</span>
              </label>
              <input
                type="date"
                {...register("dueDate")}
                className="w-full bg-[var(--input)] border border-[var(--input-border)] text-[var(--text-primary)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-6 border-t border-[var(--border)] flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="btn-outline px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Clear Inputs
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? "Creating Task..." : "Dispatch Task"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;