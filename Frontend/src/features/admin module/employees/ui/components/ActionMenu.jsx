import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Trash2, UserCheck, UserX } from "lucide-react";

const ActionMenu = ({ emp }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const isActive = emp?.status === "active";

  const menuItems = [
    {
      label: "Edit",
      icon: Pencil,
      onClick: () => console.log("Edit", emp?._id),
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: () => console.log("Delete", emp?._id),
      danger: true,
    },
    {
      label: isActive ? "Mark Inactive" : "Mark Active",
      icon: isActive ? UserX : UserCheck,
      onClick: () => console.log("Toggle status", emp?._id),
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
          {menuItems.map(({ label, icon: Icon, onClick, danger }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                onClick();
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                danger
                  ? "text-[var(--danger)] hover:bg-[var(--danger-light)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
