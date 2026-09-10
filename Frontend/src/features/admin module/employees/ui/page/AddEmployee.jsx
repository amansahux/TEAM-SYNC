import React from "react";
import { Link } from "react-router";
import { UserPlus } from "lucide-react";
import { useAddEmployeeForm } from "../../hooks/useEmployee";
import PersonalInformationSection from "../components/add-employee/PersonalInformationSection";
import EmploymentDetailsSection from "../components/add-employee/EmploymentDetailsSection";
import AddEmployeeLoading from "../components/add-employee/AddEmployeeLoading";
import AddEmployeeSuccess from "../components/add-employee/AddEmployeeSuccess";

const AddEmployee = () => {
  const { form, onSubmit, addEmployeeMutation } = useAddEmployeeForm();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const handleAddAnother = () => {
    addEmployeeMutation.reset();
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-[var(--background)]">
      {/* Loading Overlay */}
      {addEmployeeMutation.isPending && <AddEmployeeLoading />}

      <main className="flex-1 px-4 sm:px-6 md:px-10 lg:px-14 py-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[var(--text-muted)] mb-3">
          <Link
            to="/dashboard/employee"
            className="hover:text-[var(--primary)] transition-colors"
          >
            Employees
          </Link>
          <span className="text-[var(--border)]">/</span>
          <span className="text-[var(--text-primary)] font-medium">Add Employee</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Add Employee
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1 font-sans">
              Create a new employee profile and configure enterprise workspace access.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-secondary)] bg-[var(--background-secondary)] px-3 py-1.5 rounded-md border border-[var(--border)] self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
            <span>Role: Administrator</span>
          </div>
        </div>

        {/* Success View or Employee Creation Form */}
        {addEmployeeMutation.isSuccess ? (
          <AddEmployeeSuccess onAddAnother={handleAddAnother} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
            <PersonalInformationSection register={register} errors={errors} />

            <EmploymentDetailsSection
              register={register}
              watch={watch}
              setValue={setValue}
            />

            {/* Form Action Buttons */}
            <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-3.5">
              {/* Cancel Button */}
              <Link
                to="/dashboard/employee"
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--card)] font-medium text-sm transition-colors text-center block"
              >
                Cancel
              </Link>

              {/* Submit Primary CTA */}
              <button
                type="submit"
                disabled={addEmployeeMutation.isPending}
                className="w-full sm:w-auto px-8 py-3 cursor-pointer rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center space-x-2 group active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <UserPlus
                  size={19}
                  className={`transition-transform ${
                    !addEmployeeMutation.isPending && "group-hover:translate-x-0.5"
                  }`}
                />
                <span>
                  {addEmployeeMutation.isPending
                    ? "Creating Employee..."
                    : "Create Employee"}
                </span>
              </button>
            </div>
          </form>
        )}

        {/* Compliance & Security Assurance Footer Notice */}
        <footer className="mt-14 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[15px] text-[var(--secondary)]">
              verified
            </span>
            <span>TEAM_SYNC Enterprise Protocol • ISO 27001 & SOC-2 Type II Validated</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:underline cursor-pointer">Security & Compliance</span>
            <span className="hover:underline cursor-pointer">Audit Logs</span>
            <span className="hover:underline cursor-pointer">Sign In Help</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AddEmployee;