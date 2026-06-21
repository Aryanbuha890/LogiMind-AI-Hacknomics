import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Mail, AlertCircle, Ship
} from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign In — LogiMind AI" },
      { name: "description", content: "Access your LogiMind AI Command Center." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot password modal
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/app" });
    }, 1200);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotOpen(false);
      setForgotSent(false);
      setForgotEmail("");
      alert("Password reset code sent to " + forgotEmail);
    }, 1500);
  };

  return (
    <div className="relative h-screen w-full bg-[#05060F] text-white flex p-3 sm:p-4 md:p-6 lg:p-8 justify-center items-stretch overflow-hidden box-border md:flex-row-reverse">
      
      {/* Global CSS to hide the browser scrollbar track */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Visual Card Section (Right on Login) */}
      <section 
        className="relative hidden md:flex md:w-[42%] lg:w-[46%] rounded-[24px] lg:rounded-[32px] overflow-hidden border border-white/[0.04] p-8 lg:p-12 flex-col justify-between shadow-2xl shrink-0"
        style={{
          background: "linear-gradient(180deg, #091a33 0%, #05060f 100%)",
        }}
      >
        {/* Ambient glows inside card */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-600/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Dotted grid background overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Brand Header */}
        <div className="flex items-center gap-2.5 z-10">
          <Logo to="/" size="xl" />
        </div>

        {/* Mid Heading & Copy */}
        <div className="space-y-4 my-auto z-10 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-300 text-xs font-medium tracking-wide">
            <Ship className="h-3.5 w-3.5 text-sky-400" />
            <span>AI Port & Rail Operating System</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            Review, assess, and execute across marine berths and rail yards.
          </h2>
          <p className="text-slate-400/90 text-sm leading-relaxed">
            LogiMind AI combines computer vision telemetry, LangGraph multi-agent reasoning, and predictive maintenance scheduling.
          </p>
        </div>

        {/* Bottom Status Branding */}
        <div className="flex items-center gap-2 text-xs text-slate-500 z-10 font-mono">
          <span>✦ PLATFORM OPERATIONAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </section>

      {/* Form Section (Left on Login) */}
      <section className="flex-1 flex flex-col justify-center items-center py-4 px-4 md:px-8 z-10 overflow-hidden h-full">
        <div className="w-full max-w-[360px] sm:max-w-[380px] space-y-5 sm:space-y-6">

          <div className="flex justify-center md:hidden">
            <Logo to="/" size="xl" />
          </div>
          
          {/* Header */}
          <div className="space-y-1.5 text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Sign in to your account
            </h1>
            <p className="text-slate-400 text-xs">
              Welcome back! Please enter your details below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.07] p-2.5 text-[11px] text-red-300 font-medium">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-sky-500/80 rounded-lg h-9 sm:h-10 px-3 pr-10 focus:outline-none transition focus:ring-1 focus:ring-sky-500/80"
                />
                <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Password</label>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-xs text-sky-400 hover:text-sky-300 font-medium transition cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-sky-500/80 rounded-lg h-9 sm:h-10 px-3 pr-10 focus:outline-none transition focus:ring-1 focus:ring-sky-500/80"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-white/10 bg-white/[0.02] text-sky-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-sky-600"
              />
              <label htmlFor="remember-me" className="text-xs text-slate-400 select-none cursor-pointer">
                Remember me on this device
              </label>
            </div>

            {/* Sign in Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-9 sm:h-10 bg-white hover:bg-slate-100 text-black font-semibold rounded-full flex items-center justify-center transition duration-200 cursor-pointer shadow-lg shadow-white/5 pt-[1px] text-xs sm:text-sm"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-xs text-slate-400 pt-2">
            New to LogiMind?{" "}
            <Link to="/auth/signup" className="text-sky-400 hover:text-sky-300 font-semibold transition duration-200">
              Create account
            </Link>
          </div>

        </div>
      </section>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {forgotOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setForgotOpen(false)}
              className="fixed inset-0 z-45 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-sm relative rounded-[24px] overflow-hidden border border-sky-500/30"
              style={{
                boxShadow:
                  "0 40px 100px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(56,189,248,0.08)",
              }}
            >
              <div
                className="absolute inset-0 rounded-[24px]"
                style={{
                  background: "linear-gradient(170deg, rgba(9,26,51,0.95) 0%, rgba(5,6,15,0.98) 100%)",
                  backdropFilter: "blur(60px)",
                }}
              />
              <div
                className="absolute inset-x-0 top-0 h-[1px] rounded-t-[24px]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.35) 30%, rgba(200,230,255,0.55) 50%, rgba(56,189,248,0.35) 70%, transparent)",
                }}
              />

              <div className="relative p-7">
                <h3 className="text-lg font-bold text-white mb-1.5">Reset Password</h3>
                <p className="text-[12px] text-white/40 mb-5 leading-relaxed">
                  Enter your email and we'll send you a recovery link.
                </p>
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div className="relative group">
                    <label
                      className="absolute left-4 top-1.5 text-[9px] text-sky-400 font-mono uppercase tracking-widest pointer-events-none"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full text-[13px] text-white bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 pt-6 pb-2.5 focus:border-sky-500/40 focus:outline-none focus:shadow-[0_0_0_4px_rgba(56,189,248,0.08)] transition-all duration-300"
                    />
                  </div>
                  <div className="flex gap-3 justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => setForgotOpen(false)}
                      className="px-5 py-2.5 border border-white/[0.06] hover:bg-white/5 text-white text-xs font-semibold rounded-xl cursor-default transition"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 text-white text-xs font-semibold rounded-xl cursor-default transition"
                      style={{
                        backgroundImage: "linear-gradient(135deg, #1b3a6b, #2563eb, #0d9488)",
                        boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
                      }}
                    >
                      {forgotSent ? "Sending..." : "Send Reset Link"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
