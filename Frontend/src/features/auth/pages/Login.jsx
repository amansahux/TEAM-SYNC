import { Link } from "react-router";
import useAuth, { loginSchema } from "../hooks/useAuth";
import AuthLoader from "../components/AuthLoader";
import { Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const { handleSubmit, register, handleLogin, errors, isLoggingIn } = useAuth(loginSchema);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-[#F5F5F0] text-[#1a1c19] font-inter antialiased overflow-hidden">
        
        {isLoggingIn && (
          <AuthLoader
            type="login"
            title="Signing you in"
            message="Connecting to your workspace..."
          />
        )}

        {/* Left Architectural Hero Panel */}
        <section className="relative lg:w-[44%] w-full min-h-[420px] lg:min-h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-[#2f312e] text-white">
          <img 
            alt="Corporate Workspace" 
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-[1.02] filter contrast-[1.05] brightness-[0.92]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT6975E87A7ZTHn9GSFkUr8At9XzAd9bz079aZo14ED7YP1kFXW4VrYqN57rko-4q4_H_WkIQvRiRe3feWeXRouK3QLilvWoNlX_gYn-eXJfu6o_sVdwTjWeqFZqk6RBf4UuvkTuw0gpaAox_pdG8-7GWrHWr1Uyrk3jiKrH5nehhJtJyp6owHMq89XVVXrA_APy3ww4IB06TmQhPtzVSuX_OVAAsCqrOl0vpGpUx8RRHB8ZRCUncf"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/70 backdrop-blur-[1.5px]"></div>
          
          {/* Top Vignette Content */}
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#2f312e]/60 border border-[#C2A68C]/20 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-[#5D866C] animate-pulse"></div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E6D8C3]">Employee Management Platform</span>
            </div>
          </div>

          {/* Bottom Poetic Editorial Typography */}
          <div className="relative z-10 max-w-lg space-y-6 pt-8 mt-auto">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight font-garamond">
                Built for teams that move with purpose.
              </h1>
              <p className="text-base text-gray-300 max-w-md font-light leading-relaxed">
                Manage people, work, and institutional governance from one unified, tranquil workspace.
              </p>
            </div>
            <div className="pt-3 border-t border-white/20 flex flex-wrap items-center gap-4 text-xs text-gray-300/75">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C2A68C]" />
                <span>SOC2 Type II Certified</span>
              </div>
              <span className="text-white/40">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C2A68C]" />
                <span>ISO 27001 Validated</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Authentication Panel */}
        <section className="lg:w-[56%] w-full bg-[#F5F5F0] flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 relative">
          
          {/* Top Header/Logo area for mobile & desktop consistency */}
          <div className="absolute top-6 left-6 md:top-8 md:left-12 flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#5D866C] flex items-center justify-center text-white font-garamond text-lg font-bold">
              <span className="tracking-tighter">§</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1a1c19]">TEAM_SYNC</span>
          </div>

          <div className="w-full max-w-md space-y-8 mt-16 lg:mt-0">
            
            <div className="bg-white border border-[#C2A68C]/30 rounded-xl p-6 md:p-10 shadow-[0_20px_48px_-12px_rgba(28,25,23,0.07)]">
              
              <div className="text-center space-y-2 mb-8">
                <div className="mx-auto w-12 h-12 rounded-lg bg-[#F5F5F0] border border-gray-200 flex items-center justify-center p-2 relative group">
                  <div className="absolute inset-1.5 rounded border border-[#5D866C]/30"></div>
                  <div className="w-4 h-4 bg-[#5D866C] rounded-sm transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
                </div>
                <h2 className="text-3xl font-medium text-[#1a1c19] pt-2 font-garamond">
                  Welcome back
                </h2>
                <p className="text-sm text-gray-500">
                  Sign in to your workplace ecosystem
                </p>
              </div>

              <form onSubmit={handleSubmit(handleLogin)} className="space-y-5" noValidate>
                
                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-xs uppercase tracking-wider text-gray-600 font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#F5F5F0] border \${errors?.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#5D866C] focus:border-[#5D866C]'} text-[#1a1c19] placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all duration-150`}
                    />
                  </div>
                  {errors?.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs uppercase tracking-wider text-gray-600 font-medium">
                      Password
                    </label>
                    <button type="button" className="text-xs text-[#5D866C] hover:underline transition-colors duration-150">
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-3.5 py-2.5 pr-10 text-sm rounded-lg bg-[#F5F5F0] border ${errors?.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#5D866C] focus:border-[#5D866C]'} text-[#1a1c19] placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-all duration-150`}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors?.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded text-[#5D866C] focus:ring-[#5D866C] border-gray-300 cursor-pointer accent-[#5D866C]"
                    />
                    <span className="text-sm text-gray-600">Stay signed in</span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full mt-2 bg-[#5D866C] text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-[#4a6b56] active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{isLoggingIn ? "Signing in..." : "Sign In"}</span>
                  {!isLoggingIn && <ArrowRight size={16} />}
                </button>
              </form>

              {/* Register */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an enterprise account?{" "}
                  <Link to="/register" className="font-semibold text-[#5D866C] hover:underline ml-1">
                    Sign Up
                  </Link>
                </p>
              </div>
              
            </div>
            
            {/* Trust Banner */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center justify-center gap-1.5 text-xs text-gray-500">
                <ShieldCheck size={14} />
                <span>Enterprise-grade 256-bit encryption • Sovereign governance protocol</span>
              </div>
            </div>

          </div>
          
          {/* Footer */}
          <div className="mt-auto pt-8 w-full max-w-md text-center text-xs text-gray-500">
            <p>© 2024 TEAM_SYNC. Enterprise Intelligence Platforms.</p>
            <div className="flex justify-center gap-4 mt-2">
              <button className="hover:text-gray-700 hover:underline">Privacy Policy</button>
              <button className="hover:text-gray-700 hover:underline">Terms of Service</button>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}
