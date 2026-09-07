import { Mail, Lock, Cloud, LogIn, Network } from "lucide-react";
import useAuth, { loginSchema } from "../hooks/useAuth";
import { Link } from "react-router";
import AuthLoader from "../components/AuthLoader";

export default function Login() {
  const { handleSubmit, register, handleLogin, errors, isLoggingIn } = useAuth(loginSchema);
  return (
    <div className="min-h-screen bg-[#090711] relative overflow-hidden flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute left-[-200px] bottom-[-200px] h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-[120px]" />
      <div className="absolute right-[-150px] top-[-150px] h-[400px] w-[400px] rounded-full bg-indigo-700/10 blur-[120px]" />

      {isLoggingIn && (
        <AuthLoader
          type="login"
          title="Signing you in"
          message="Connecting to your workspace..."
        />
      )}

      {/* Floating Decoration */}
      <div className="hidden lg:block absolute bottom-20 right-20">
        <div className="w-64 h-64 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/5 flex items-center justify-center">
          <img src="/orb.png" alt="orb" className="w-40 opacity-50" />
        </div>
      </div>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-[#15121D]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl bg-violet-600 flex items-center justify-center mb-5">
              <Network size={24} />
            </div>

            <h1 className="text-4xl font-bold text-white">TEAM_SYNC</h1>

            <p className="text-zinc-400 mt-2">Sign in to your workspace</p>
          </div>
          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button className="h-12 rounded-xl border border-white/10 bg-[#24202D] hover:bg-[#2c2738] transition flex items-center justify-center gap-2 text-white font-medium">
              <Cloud size={18} />
              GOOGLE
            </button>

            <button className="h-12 rounded-xl border border-white/10 bg-[#24202D] hover:bg-[#2c2738] transition flex items-center justify-center gap-2 text-white font-medium">
              GITHUB
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-zinc-400 text-sm">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  {...register("email")}
                  placeholder="name@company.com"
                  className="w-full h-12 rounded-xl bg-[#090711] border border-white/10 pl-11 pr-4 text-white outline-none focus:border-violet-500"
                />
              </div>

              {errors?.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-zinc-300">
                  Password
                </label>

                <button type="button" className="text-violet-300 text-sm">
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl bg-[#090711] border border-white/10 pl-11 pr-4 text-white outline-none focus:border-violet-500"
                />
              </div>

              {errors?.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-violet-600" />

              <span className="text-zinc-300">Stay signed in</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-500 transition text-white font-medium flex items-center justify-center gap-2"
            >
              {isLoggingIn ? "Signing in..." : "Sign In"}
              {!isLoggingIn && <LogIn size={18} />}
            </button>
          </form>

          {/* Footer */}
          <div className="border-t border-white/10 mt-8 pt-8">
            <p className="text-center text-zinc-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-violet-300 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center mt-8 text-zinc-500 text-sm space-y-3">
          <p>© 2024 TEAM_SYNC. Enterprise Intelligence Platforms.</p>

          <div className="flex justify-center gap-6">
            <button>Privacy Policy</button>
            <button>Terms of Service</button>
          </div>
        </div>
      </div>
    </div>
  );
}
