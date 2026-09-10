import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Trash2, UserCheck, UserX, Loader2 } from "lucide-react";
import { useEmployees } from "../../../hooks/useEmployee";
import UpdateEmployeeModal from "./UpdateEmployeeModal";

const ActionMenu = ({ emp }) => {
  const [open, setOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const { deleteEmployeeMutation, updateStatusMutation } = useEmployees();

  const isActive = emp?.status === "active";

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployeeMutation.mutate(emp._id, {
        onSuccess: () => setOpen(false),
      });
    }
  };

  const handleToggleStatus = () => {
    const newStatus = isActive ? "inactive" : "active";
    updateStatusMutation.mutate(
      { employeeId: emp._id, status: newStatus },
      { onSuccess: () => setOpen(false) }
    );
  };

  const menuItems = [
    {
      label: "Edit",
      icon: Pencil,
      onClick: () => setIsEditModalOpen(true),
      isLoading: false,
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: handleDelete,
      danger: true,
      isLoading: deleteEmployeeMutation.isPending,
    },
    {
      label: isActive ? "Mark Inactive" : "Mark Active",
      icon: isActive ? UserX : UserCheck,
      onClick: handleToggleStatus,
      isLoading: updateStatusMutation.isPending,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-lg)] py-1 z-30 animate-in fade-in">
          {menuItems.map(({ label, icon: Icon, onClick, danger, isLoading }) => (
            <button
              key={label}
              type="button"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                if (!isLoading) {
                  onClick();
                }
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              } ${
                danger
                  ? "text-[var(--danger)] hover:bg-[var(--danger-light)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Icon size={16} />
              )}
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <UpdateEmployeeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        emp={emp}
      />
    </div>
  );
};

export default ActionMenu;
