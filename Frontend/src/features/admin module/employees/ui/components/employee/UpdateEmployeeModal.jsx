import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, X } from "lucide-react";
import { useEmployees } from "../../../hooks/useEmployee";

const updateEmployeeSchema = z.object({
  name: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Invalid email address"),
  department: z.enum(["developer", "designer", "manager", "marketer", "common"]),
  status: z.enum(["active", "inactive"]),
});

const UpdateEmployeeModal = ({ isOpen, onClose, emp }) => {
  const { updateEmployeeMutation } = useEmployees();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "common",
      status: "active",
    },
  });

  useEffect(() => {
    if (emp && isOpen) {
      reset({
        name: emp.name || "",
        email: emp.email || "",
        department: emp.department || "common",
        status: emp.status || "active",
      });
    }
  }, [emp, isOpen, reset]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    updateEmployeeMutation.mutate(
      { employeeId: emp._id, ...data },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-xl)] w-full max-w-md overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--border)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Update Employee</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Full Name
            </label>
            <input
              {...register("name")}
              type="text"
              className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-[var(--danger)]">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-[var(--danger)]">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Department
            </label>
            <select
              {...register("department")}
              className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow cursor-pointer"
            >
              <option value="common">Common</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
              <option value="marketer">Marketer</option>
            </select>
            {errors.department && (
              <p className="mt-1 text-sm text-[var(--danger)]">{errors.department.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow cursor-pointer"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-[var(--danger)]">{errors.status.message}</p>
            )}
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-transparent hover:bg-[var(--card-hover)] rounded-lg transition-colors cursor-pointer"
              disabled={updateEmployeeMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateEmployeeMutation.isPending}
              className="btn-primary rounded-lg text-sm px-5 py-2 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateEmployeeMutation.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
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

export default UpdateEmployeeModal;
