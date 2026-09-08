import { LogIn, UserPlus } from "lucide-react";

const loaderIcons = {
  login: LogIn,
  register: UserPlus,
};

const AuthLoader = ({ type = "login", title, message }) => {
  const Icon = loaderIcons[type] || LogIn;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-6 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="flex w-full max-w-xs flex-col items-center rounded-2xl border border-white/10 bg-[var(--card)] px-8 py-7 text-center text-white shadow-2xl">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--primary)]">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-[var(--primary)]/20 border-t-[var(--primary)]" />
          <Icon size={24} />
        </div>
        <p className="mt-5 text-base font-semibold">{title}</p>
        <p className="mt-1 text-sm text-zinc-400">{message}</p>
      </div>
    </div>
  );
};

export default AuthLoader;
