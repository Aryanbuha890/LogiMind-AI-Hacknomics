import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Eye, EyeOff, Mail, User, AlertCircle, Ship, X
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { supabase } from "@/lib/supabase";

export const Route = createLazyFileRoute("/auth/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service.");
      return;
    }

    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      alert("Account created successfully! You can now log in.");
      navigate({ to: "/auth/login" });
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#05060F] text-white flex p-3 sm:p-4 md:p-6 lg:p-8 justify-center items-stretch overflow-hidden box-border">
      
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

      {/* Visual Card Section (Left on Signup) */}
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
            Build your autonomous logistics command center.
          </h2>
          <p className="text-slate-400/90 text-sm leading-relaxed">
            Join leading terminal and rail operators tracking vessel fleets, monitoring railway wagon telemetry, optimizing stack density, and executing closed-loop autonomous dispatch routes.
          </p>
        </div>

        {/* Bottom Status Branding */}
        <div className="flex items-center gap-2 text-xs text-slate-500 z-10 font-mono">
          <span>✦ PLATFORM OPERATIONAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </section>

      {/* Form Section (Right on Signup) */}
      <section className="flex-1 flex flex-col justify-center items-center py-4 px-4 md:px-8 z-10 overflow-hidden h-full">
        <div className="w-full max-w-[360px] sm:max-w-[380px] space-y-4 sm:space-y-5">

          <div className="flex justify-center md:hidden">
            <Logo to="/" size="xl" />
          </div>
          
          {/* Header */}
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Create an account
            </h1>
            <p className="text-slate-400 text-xs">
              Enter your details below to get started.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/15 bg-red-500/[0.07] p-2 text-[10px] text-red-300 font-medium">
                <AlertCircle className="h-3 w-3 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-sky-500/80 rounded-lg h-9 sm:h-10 px-3 pr-10 focus:outline-none transition focus:ring-1 focus:ring-sky-500/80"
                />
                <User className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
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
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create password (min. 6 chars)"
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

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-xs text-white bg-white/[0.02] border border-white/[0.08] hover:border-white/15 focus:border-sky-500/80 rounded-lg h-9 sm:h-10 px-3 pr-10 focus:outline-none transition focus:ring-1 focus:ring-sky-500/80"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Agree to Terms */}
            <div className="flex items-start gap-2.5 pt-0.5">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-white/10 bg-white/[0.02] text-sky-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-sky-600"
              />
              <label htmlFor="agree-terms" className="text-[10.5px] text-slate-400 leading-normal select-none cursor-pointer">
                I agree to the{" "}
                <button 
                  type="button"
                  onClick={() => setModalType("terms")}
                  className="text-sky-400 hover:text-sky-300 transition-colors focus:outline-none cursor-pointer underline"
                >
                  Terms
                </button>{" "}
                and{" "}
                <button 
                  type="button"
                  onClick={() => setModalType("privacy")}
                  className="text-sky-400 hover:text-sky-300 transition-colors focus:outline-none cursor-pointer underline"
                >
                  Privacy Policy
                </button>.
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-9 sm:h-10 bg-white hover:bg-slate-100 text-black font-semibold rounded-full flex items-center justify-center transition duration-200 cursor-pointer shadow-lg shadow-white/5 pt-[1px] text-xs sm:text-sm"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-xs text-slate-400 pt-2">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-sky-400 hover:text-sky-300 font-semibold transition duration-200">
              Sign In
            </Link>
          </div>

        </div>
      </section>

      {/* Modal Overlay for Terms / Privacy */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-[#05060F]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="relative w-full max-w-lg rounded-[24px] border border-white/10 bg-gradient-to-br from-[#0c1a30] to-[#05060f] p-6 sm:p-8 shadow-2xl flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 shrink-0">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {modalType === "terms" ? "Terms of Service" : "Privacy Policy"}
              </h3>
              <button 
                type="button"
                onClick={() => setModalType(null)}
                className="h-8 w-8 rounded-full border border-white/5 bg-white/[0.02] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4 text-xs text-slate-300/90 leading-relaxed font-sans pr-1">
              {modalType === "terms" ? (
                <>
                  <p className="font-semibold text-white">Last updated: June 22, 2026</p>
                  <p>Welcome to LogiMind AI. By creating an account or using our port and rail operating system (the "Platform"), you agree to be bound by these Terms of Service. Please read them carefully.</p>
                  
                  <h4 className="font-bold text-white uppercase tracking-wider text-[10px] pt-2">1. Use of the Platform</h4>
                  <p>LogiMind AI provides real-time logistics analytics, CCTV PPE detection (including safety helmet enforcement), railway wagon OCR processing, and closed-loop vessel coordinates tracking. You agree to use the Platform only for authorized operational purposes in compliance with local port authority regulations.</p>

                  <h4 className="font-bold text-white uppercase tracking-wider text-[10px] pt-2">2. User Account & Operator Credentials</h4>
                  <p>You must maintain the security of your password and credentials. You are responsible for all activities and automated dispatch rules executed under your account. LogiMind AI is not liable for unauthorized access resulting from negligent credential management.</p>

                  <h4 className="font-bold text-white uppercase tracking-wider text-[10px] pt-2">3. Automated Actions & AI Suggestions</h4>
                  <p>The Platform provides AI-driven suggestions (via LangGraph agents and vision classifiers) for stack optimization, gate controls, and crew dispatches. Operators retain full responsibility for verifying critical actions before safety overrides or automated executions take place.</p>

                  <h4 className="font-bold text-white uppercase tracking-wider text-[10px] pt-2">4. Disclaimers & Limitation of Liability</h4>
                  <p>The Platform and its AI telemetry models are provided "as is" and "as available". We do not guarantee 100% accuracy of OCR or machine breakdown predictions. In no event shall LogiMind AI be liable for port delays, machine downtime, or cargo bottlenecks.</p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-white">Last updated: June 22, 2026</p>
                  <p>LogiMind AI respects your privacy and is committed to protecting your terminal data. This Privacy Policy details how we collect, process, and secure operational information within our application.</p>
                  
                  <h4 className="font-bold text-white uppercase tracking-wider text-[10px] pt-2">1. Information We Collect</h4>
                  <p>We process data necessary to provide autonomous port operations, including: CCTV streams (for safety gear checks), railway telemetries, crane coordinates, vessel ETAs, manifest logs, and user credentials (full name, email, and audit logs).</p>

                  <h4 className="font-bold text-white uppercase tracking-wider text-[10px] pt-2">2. How We Use Data</h4>
                  <p>Collected feeds and statistics are processed at the edge to calculate safety compliance rates, route autonomous trucks, coordinate yard cranes, detect incident fires, and improve AI model inferences. We do not sell or monetize your terminal metrics to third parties.</p>

                  <h4 className="font-bold text-white uppercase tracking-wider text-[10px] pt-2">3. Data Retention & Secure Storage</h4>
                  <p>Video feeds are analyzed in memory at the edge and are not retained long-term unless flagged for active safety violations. Database logs, wagon telemetry history, and user activity records are securely stored using end-to-end industry encryption standards.</p>

                  <h4 className="font-bold text-white uppercase tracking-wider text-[10px] pt-2">4. Third-Party Integrations</h4>
                  <p>Our platform integrates with port operating systems (TOS) via secure APIs. Data exchange is strictly limited to authorized requests required to resolve gate dispatches or crane tasks.</p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/5 flex justify-end shrink-0">
              <button 
                type="button"
                onClick={() => {
                  if (modalType === "terms") setAgreed(true);
                  setModalType(null);
                }}
                className="px-5 h-9 bg-white text-black font-semibold rounded-full hover:bg-slate-100 transition-colors text-xs cursor-pointer"
              >
                {modalType === "terms" ? "I Accept Terms" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
