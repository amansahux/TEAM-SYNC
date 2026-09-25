import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

const DeleteTaskModal = ({
  isOpen,
  onClose,
  task,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl p-6 space-y-4">
        <div className="w-12 h-12 rounded-full bg-[var(--danger-light)] text-[var(--danger)] flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="text-center space-y-1.5">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Delete Task Assignment?
          </h3>
          <p className="text-xs md:text-sm text-[var(--text-secondary)]">
            Are you sure you want to permanently remove{" "}
            <strong className="text-[var(--text-primary)] font-semibold">
              "{task.title}"
            </strong>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-3 border-t border-[var(--border-subtle)]">
          <button
            type="button"
            onClick={onClose}
            className="btn-outline px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="btn-danger inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? "Deleting..." : "Confirm Delete"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
