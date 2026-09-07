import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <button className={`inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
