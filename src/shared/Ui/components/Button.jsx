const Button = ({
  children,
  icon: Icon,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  ariaLabel,
  fullWidth = true,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`flex ${fullWidth ? "w-full" : ""} cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {Icon && <Icon size={17} />}
      {children}
    </button>
  );
};

export default Button;
