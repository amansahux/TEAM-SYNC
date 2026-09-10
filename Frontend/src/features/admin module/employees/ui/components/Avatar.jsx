import React from "react";

const Avatar = ({ src, name }) =>
  src ? (
    <img
      src={src}
      alt={name}
      className="size-10 shrink-0 rounded-full object-cover bg-[var(--border)]"
    />
  ) : (
    <div className="size-10 shrink-0 rounded-full bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-bold text-sm">
      {name ? name.charAt(0).toUpperCase() : "U"}
    </div>
  );

export default Avatar;
