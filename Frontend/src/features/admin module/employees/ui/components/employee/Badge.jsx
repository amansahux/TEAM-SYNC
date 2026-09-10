import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold leading-none badge-${variant} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
