import { User, Mail, Lock, ShieldCheck, Network } from "lucide-react";
import { Link } from "react-router";
import useAuth, { registerSchema } from "../hooks/useAuth";
import AuthLoader from "../components/AuthLoader";

export default function Signup() {
  const {
    register,
    handleSubmit,
    handleRegister,
    errors,
    isRegistering,
  } = useAuth(registerSchema);

  return (
    <div className="min-h-screen bg-[#07050E] text-white flex flex-col">
      {isRegistering && (
        <AuthLoader
          type="register"
          title="Creating your account"
          message="Setting up your workspace..."
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side */}
        <div className="hidden lg:flex w-1/2 relative border-r border-white/10 overflow-hidden">
          <img
            src="/signup-bg.jpg"
            alt="AI Background"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#07132F]/30 to-[#07050E]/80" />

          <div className="relative z-10 flex flex-col justify-between h-full p-12">
            <h1 className="text-3xl font-bold">TEAM_SYNC</h1>

            <div>
              <div className="flex items-center gap-2 text-sm tracking-[4px] uppercase text-violet-300 mb-5">
                <ShieldCheck size={16} />
                Next-Gen Intelligence
              </div>

              <h2 className="text-5xl font-bold leading-tight max-w-lg">
                Accelerate your team's intelligence.
              </h2>

              <p className="mt-6 text-zinc-300 max-w-md text-lg">
                Connect your enterprise data to our specialized AI models and
                unlock unparalleled strategic insights in seconds.
              </p>

              <div className="flex gap-12 mt-10">
                <div>
                  <h3 className="text-3xl font-bold">99.9%</h3>
                  <p className="text-zinc-400">Uptime SLA</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">ISO</h3>
                  <p className="text-zinc-400">27001 Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-xl">
            <h1 className="text-5xl font-bold mb-3">Create your account</h1>

            <p className="text-zinc-400 mb-10">
              Experience the future of collaborative data intelligence.
            </p>

            <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block mb-2 text-sm text-zinc-300">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="w-full bg-[#11101A] border border-white/10 rounded-xl h-14 pl-12 pr-4 outline-none focus:border-violet-500"
                  />
                </div>

                {errors.name && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm text-zinc-300">
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
                    className="w-full bg-[#11101A] border border-white/10 rounded-xl h-14 pl-12 pr-4 outline-none focus:border-violet-500"
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm text-zinc-300">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    type="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className="w-full bg-[#11101A] border border-white/10 rounded-xl h-14 pl-12 pr-4 outline-none focus:border-violet-500"
                  />
                </div>

                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}

                {/* Password Strength */}
                <div className="mt-4">
                  <div className="flex gap-2">
                    <div className="h-1 flex-1 rounded bg-violet-400" />
                    <div className="h-1 flex-1 rounded bg-violet-400" />
                    <div className="h-1 flex-1 rounded bg-white/10" />
                    <div className="h-1 flex-1 rounded bg-white/10" />
                  </div>

                  <p className="text-sm text-violet-300 mt-2">
                    Strong password
                  </p>
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border border-white/20 bg-transparent"
                />

                <span className="text-zinc-400 text-sm">
                  I agree to the Terms of Service and Privacy Policy.
                </span>
              </label>

              {/* Button */}
              <button
                type="submit"
                disabled={isRegistering}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-violet-600 to-violet-300 text-black font-semibold text-lg hover:opacity-90 transition"
              >
                {isRegistering ? "Creating account..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-zinc-500 text-sm">OR CONTINUE WITH</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-4">
              <button className="h-14 border border-white/10 rounded-xl flex items-center justify-center gap-3 hover:bg-white/5">
                <Mail size={18} />
                Google
              </button>

              <button className="h-14 border border-white/10 rounded-xl flex items-center justify-center gap-3 hover:bg-white/5">
                <Network size={18} />
                SSO
              </button>
            </div>

            <p className="text-center text-zinc-400 mt-10">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-violet-300 font-medium cursor-pointer"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="border-t border-white/10 px-8 py-5 flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
        <h2 className="font-semibold text-white">TEAM_SYNC</h2>

        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security</span>
          <span>System Status</span>
        </div>

        <p>© 2024 TEAM_SYNC. Enterprise Intelligence Platforms.</p>
      </footer> */}
    </div>
  );
}
