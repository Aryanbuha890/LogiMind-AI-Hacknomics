import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Container,
  Wrench,
  Ship,
  ShieldAlert,
  CloudSun,
  Sparkles,
  Activity,
  CheckCircle2,
  Brain,
  Database,
  Eye,
  Cpu,
  Network,
  Users,
  Menu,
  X,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Trophy,
  Coins,
  Bot,
  TrendingUp,
  Compass,
  GraduationCap,
  School,
  UserCheck,
  Map,
  GanttChart,
  FlaskConical,
  Rocket,
  Briefcase,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PortMind AI — Autonomous Intelligence for Modern Ports" },
      {
        name: "description",
        content:
          "Unified AI command center combining computer vision, predictive maintenance, multi-agent AI, vessel intelligence and operational analytics.",
      },
      {
        property: "og:title",
        content: "PortMind AI — Autonomous Intelligence for Modern Ports",
      },
      {
        property: "og:description",
        content: "The operating system for smart ports.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-[#05060F] text-white antialiased overflow-x-clip">
      <Nav />
      <Hero />
      <DashboardSection />
      <Trust />
      <JourneySection />
      <HowItWorks />
      <Ecosystem />
      <AgentsOSSection />
      <Features />
      <Footer />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        paddingTop: scrolled ? 10 : 18,
        paddingBottom: scrolled ? 10 : 18,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6"
    >
      <motion.div
        initial={false}
        animate={{
          maxWidth: scrolled ? 860 : 1180,
          paddingLeft: scrolled ? 12 : 20,
          paddingRight: scrolled ? 6 : 10,
          paddingTop: scrolled ? 5 : 9,
          paddingBottom: scrolled ? 5 : 9,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(15,23,42,0.72) 0%, rgba(30,27,75,0.62) 45%, rgba(15,23,42,0.72) 100%)",
        }}
        className="relative mx-auto flex items-center gap-3 sm:gap-6 rounded-full border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_-20px_rgba(2,6,23,0.65),inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_-1px_0_0_rgba(255,255,255,0.04)]"
      >
        {/* Top gloss reflection sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-t-full opacity-60"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        {/* Soft colorful background glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(120% 80% at 10% 0%, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0) 55%), radial-gradient(120% 80% at 90% 100%, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0) 55%)",
          }}
        />
        {/* Gradient border ring */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-full"
          style={{
            background:
              "linear-gradient(120deg, rgba(56,189,248,0.55), rgba(37,99,235,0.4), rgba(99,102,241,0.5))",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
            opacity: 0.7,
          }}
        />
        {/* Logo */}
        <div className="relative flex items-center">
          <Logo />
        </div>
        {/* Navigation Links */}
        <nav className="relative hidden md:flex items-center gap-0.5 text-sm">
          {[
            { hash: "how", t: "How" },
            { hash: "ecosystem", t: "Ecosystem" },
            { hash: "agents", t: "AI OS" },
            { hash: "platform", t: "Modules" },
            { hash: "demo", t: "Demo" },
          ].map((i) => (
            <Link
              key={i.t}
              to="/"
              hash={i.hash}
              className="relative rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white hover:bg-white/10"
            >
              {i.t}
            </Link>
          ))}
        </nav>
        {/* Call to Actions */}
        <div className="relative ml-auto flex items-center gap-1.5">
          <Link
            to="/auth/login"
            className="hidden md:inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
          >
            Sign in
          </Link>
          <Link
            to="/app"
            className="group relative hidden md:inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-full px-4 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,99,235,0.7),inset_0_1px_0_0_rgba(255,255,255,0.35)] transition-transform hover:-translate-y-px"
            style={{
              backgroundImage: "linear-gradient(120deg, #1b3a6b 0%, #2563eb 50%, #0d9488 110%)",
            }}
          >
            <span className="relative z-10">Launch Platform</span>
            <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            {/* Glossy hover shimmer */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>

          {/* Hamburger Menu Toggle on Mobile */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-3 p-6 rounded-3xl border border-white/10 backdrop-blur-3xl bg-[#07091a]/95 shadow-2xl flex flex-col gap-4 md:hidden z-50"
            >
              {[
                { hash: "how", t: "How" },
                { hash: "ecosystem", t: "Ecosystem" },
                { hash: "agents", t: "AI OS" },
                { hash: "platform", t: "Modules" },
                { hash: "demo", t: "Demo" },
              ].map((i) => (
                <Link
                  key={i.t}
                  to="/"
                  hash={i.hash}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-semibold text-white/70 hover:text-white transition py-2 border-b border-white/5 last:border-b-0"
                >
                  {i.t}
                </Link>
              ))}
              <div className="flex flex-col gap-2.5 mt-2 pt-2">
                <Link
                  to="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-white/70 hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  to="/app"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold text-white"
                  style={{
                    backgroundImage: "linear-gradient(120deg, #1b3a6b 0%, #2563eb 50%, #0d9488 110%)",
                  }}
                >
                  Launch Platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-white pt-24 pb-12"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 10%, rgba(37,99,235,0.32), transparent 60%), radial-gradient(900px 500px at 80% 0%, rgba(13,148,136,0.22), transparent 60%), radial-gradient(700px 400px at 10% 20%, rgba(139,92,246,0.15), transparent 60%), linear-gradient(180deg, #05060F 0%, #07091A 60%, #05060F 100%)",
      }}
    >
      {/* Grid + scanline overlays */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.6) 3px, transparent 4px)",
        }}
      />
      {/* Aurora radial backdrops */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.45),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.3),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.25),transparent)] blur-3xl" />

      <div className="relative w-full max-w-6xl px-6 flex flex-col justify-center items-center flex-1">
        <motion.div style={{ y }} className="mx-auto max-w-5xl text-center w-full flex flex-col items-center justify-center">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[82px] md:leading-[1.05]"
          >
            Autonomous Intelligence
            <br className="hidden sm:inline" />{" "}
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-300"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #ffffff 0%, #C7D2FE 35%, #60A5FA 65%, #22D3EE 100%)",
              }}
            >
              for Modern Ports.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-base text-white/65 sm:text-lg"
          >
            PortMind AI combines Computer Vision, Predictive Maintenance, Multi-Agent AI, Vessel Intelligence, Weather Monitoring and Operational Analytics into one unified command center.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/app"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold text-white shadow-[0_18px_40px_-12px_rgba(37,99,235,0.7)] transition-transform hover:-translate-y-0.5"
              style={{
                backgroundImage: "linear-gradient(120deg, #1b3a6b 0%, #2563eb 45%, #0d9488 100%)",
              }}
            >
              <span className="relative z-10">Launch Command Center</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <button className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium text-white/85 backdrop-blur-xl hover:bg-white/[0.08]">
              <PlayCircle className="h-4 w-4" /> Watch 90-sec Demo
            </button>
          </motion.div>

          {/* HUD Status Widgets */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl px-4"
          >
            {/* System Pulse Widget */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.15)] hover:-translate-y-0.5 select-none cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <span className="absolute flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">TELEMETRY // PM-OS</div>
                  <div className="text-xs font-semibold font-mono text-white/80 tracking-wide mt-0.5 uppercase">SYSTEM PULSE: ACTIVE</div>
                </div>
              </div>

              {/* Pulse Audio Ticker Waveform */}
              <div className="flex items-end gap-0.5 h-6">
                {[4, 10, 6, 14, 8, 4].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-emerald-400/70 rounded-full animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDuration: `${0.8 + i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* AI Agent Mesh Widget */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between backdrop-blur-2xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.04] hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.15)] hover:-translate-y-0.5 select-none cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                  <Bot className="h-5 w-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">AGENT MESH</div>
                  <div className="text-xs font-semibold font-mono text-white/80 tracking-wide mt-0.5 uppercase">9 AGENTS ONLINE</div>
                </div>
              </div>

              {/* Glowing active dots */}
              <div className="flex gap-1 select-none pr-1">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="h-1.5 w-1.5 rounded-full bg-cyan-400/80 animate-ping"
                    style={{
                      animationDuration: "1.5s",
                      animationDelay: `${idx * 200}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* AI Accuracy Widget */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between backdrop-blur-2xl transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.04] hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.15)] hover:-translate-y-0.5 select-none cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform duration-300">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">ACCURACY RATING</div>
                  <div className="text-xs font-semibold font-mono text-white/80 tracking-wide mt-0.5 uppercase">98.7% AI ACCURACY</div>
                </div>
              </div>

              {/* Radial Progress Mini-circle */}
              <div className="relative h-7 w-7 flex items-center justify-center">
                <svg className="h-7 w-7 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                    strokeDasharray="88"
                    strokeDashoffset={88 - 88 * 0.987}
                    strokeLinecap="round"
                    className="group-hover:stroke-amber-300 transition-colors duration-300"
                  />
                </svg>
                <span className="absolute text-[8px] font-mono font-bold text-amber-400/90 group-hover:scale-105 transition-transform">98%</span>
              </div>
            </div>

            {/* Savings Widget */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between backdrop-blur-2xl transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.04] hover:shadow-[0_15px_30px_-10px_rgba(139,92,246,0.15)] hover:-translate-y-0.5 select-none cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:translate-y-[-2px] transition-transform duration-300">
                  <Coins className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">OPERATIONAL ROI</div>
                  <div className="text-xs font-semibold font-mono text-white/80 tracking-wide mt-0.5 uppercase">$4.2M SAVED YTD</div>
                </div>
              </div>

              {/* Sparkline mini chart */}
              <svg className="h-5 w-12 text-violet-400/80 group-hover:text-violet-300 transition-colors duration-300" viewBox="0 0 50 20">
                <path d="M0,16 Q10,12 20,13 T40,6 T50,2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M0,16 Q10,12 20,13 T40,6 T50,2 L50,20 L0,20 Z" fill="currentColor" opacity="0.12" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface DashboardMockupCardProps {
  roleName: string;
  accentColor: string;
  accentColorClass: string;
  accentBgClass: string;
  successScore: number;
  successStatus: string;
  progressMetrics: { label: string; value: string; percentage: number; fromColor: string; toColor: string }[];
  chartTitle: string;
  chartValue: string;
  chartChange: string;
  chartAreaGradId: string;
  chartLineGradId: string;
  chartLinePath: string;
  chartAreaPath: string;
  chartTooltipTime: string;
  chartTooltipValue: string;
  chartTooltipChange: string;
  sparklines: { label: string; value: string; change: string; color: string; sparkPoints: number[] }[];
  liveEvents: { time: string; message: string; color: string; tag: string }[];
  sidebarItems: { icon: any; label: string; active?: boolean }[];
  floatingChips: { title: string; subtitle: string; icon: any; gradFrom: string; gradTo: string; xPosClass: string; yPosClass: string }[];
  copilotStatus: string;
}

function DashboardMockupCard({
  roleName,
  accentColor,
  accentColorClass,
  successScore,
  successStatus,
  progressMetrics,
  chartTitle,
  chartValue,
  chartChange,
  chartAreaGradId,
  chartLineGradId,
  chartLinePath,
  chartAreaPath,
  chartTooltipTime,
  chartTooltipValue,
  chartTooltipChange,
  sparklines,
  liveEvents,
  sidebarItems,
  floatingChips,
  copilotStatus,
}: DashboardMockupCardProps) {
  return (
    <div className="relative mx-auto max-w-5xl w-full">
      {/* Glow aura */}
      <div 
        className="absolute -inset-x-16 -inset-y-10 -z-10 rounded-[44px] blur-3xl opacity-35 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`
        }}
      />

      {/* Outer gradient bordered window */}
      <div
        className="rounded-[20px] p-[1px]"
        style={{
          background: `linear-gradient(140deg, rgba(255,255,255,0.2) 0%, ${accentColor}40 30%, rgba(255,255,255,0.05) 100%)`,
        }}
      >
        <div 
          className="overflow-hidden rounded-[19px] bg-[#070913]/95 backdrop-blur-2xl"
          style={{
            boxShadow: `0 45px 100px -25px rgba(0,0,0,0.95), 0 0 50px -10px ${accentColor}55`
          }}
        >
          {/* Top window browser bar */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-gradient-to-b from-[#090b16] to-[#05060f] px-4 py-2.5">
            <div className="flex items-center gap-1.5 w-[20%]">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
            </div>

            <div className="mx-auto flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono text-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              portmind.ai/command?role={roleName}
            </div>

            <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-white/40 w-[20%] justify-end">
              <span className="hidden items-center gap-1 md:inline-flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                LIVE
              </span>
            </div>
          </div>

          {/* Main workspace frame */}
          <div className="grid grid-cols-12 gap-px bg-white/5">
            {/* Sidebar */}
            <aside className="col-span-2 hidden flex-col gap-1.5 bg-[#05060F] p-3 lg:flex">
              {sidebarItems.map((it, i) => {
                const Ic = it.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[11px] font-medium transition-colors cursor-pointer ${
                      it.active
                        ? "bg-white/10 text-white"
                        : "text-white/45 hover:text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <Ic className="h-3.5 w-3.5" style={{ color: it.active ? accentColor : "currentColor" }} />
                    {it.label}
                  </div>
                );
              })}
            </aside>

            {/* Content panel */}
            <div className="col-span-12 grid grid-cols-12 gap-3 bg-[#070913] p-4 lg:col-span-10">
              {/* Success Score Gauge */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:col-span-4 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/45">
                  <span>Risk Status</span>
                  <span style={{ color: accentColor }}>{successStatus}</span>
                </div>

                <div className="mt-3 flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0">
                    <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                      <defs>
                        <linearGradient id={`score-grad-${roleName}`} x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0%" stopColor={accentColor} />
                          <stop offset="100%" stopColor="#22D3EE" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="3"
                      />
                      <motion.circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke={`url(#score-grad-${roleName})`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="97"
                        initial={{ strokeDashoffset: 97 }}
                        animate={{ strokeDashoffset: 97 - (97 * successScore) / 100 }}
                        transition={{ duration: 1.6, delay: 0.6 }}
                      />
                    </svg>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <div className="font-display text-xl font-bold text-white">{successScore}</div>
                        <div className="text-[8px] font-mono uppercase text-white/40">/100</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {progressMetrics.map((pm, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="flex items-center justify-between text-[10px] text-white/60">
                          <span>{pm.label}</span>
                          <span className="font-mono" style={{ color: pm.toColor }}>{pm.value}</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pm.percentage}%`,
                              background: `linear-gradient(to right, ${pm.fromColor}, ${pm.toColor})`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Velocity Chart or Custom Layout based on Role */}
              <div className="col-span-12 sm:col-span-8">
                {roleName === "vessels" && (
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 h-full flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                          Live Vessel Traffic Queue
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[9px] font-mono text-cyan-300">
                          <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-pulse" />
                          8 arriving today
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-[11px]">
                          <thead>
                            <tr className="border-b border-white/5 text-white/45">
                              <th className="pb-2 font-medium">VESSEL</th>
                              <th className="pb-2 font-medium">BERTH</th>
                              <th className="pb-2 font-medium">ETA TIMELINE</th>
                              <th className="pb-2 font-medium">STATUS</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-white/80">
                            {[
                              { name: "MV-Atlas", berth: "Berth 3", eta: "15:22 (On Time)", status: "Berthed", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                              { name: "CMA CGM Orion", berth: "Berth 1", eta: "16:45 (On Time)", status: "Approaching", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
                              { name: "MSC Geneva", berth: "Berth 5", eta: "18:10 (Delayed)", status: "Speed Adjusted", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                            ].map((ship, idx) => (
                              <tr key={idx} className="hover:bg-white/[0.02]">
                                <td className="py-3.5 font-semibold flex items-center gap-2 text-white">
                                  <Ship className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                                  {ship.name}
                                </td>
                                <td className="py-3.5 text-white/70">{ship.berth}</td>
                                <td className="py-3.5 text-white/60 font-mono">{ship.eta}</td>
                                <td className="py-3.5">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium border ${ship.color}`}>
                                    {ship.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {roleName === "yard" && (
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 h-full flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                          Yard Block Capacity Grid
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-mono text-emerald-300">
                          <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" />
                          6 blocks active
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3.5 mt-2">
                        {[
                          { block: "Yard A", fill: 72, color: "#10B981" },
                          { block: "Yard B", fill: 91, color: "#EF4444" },
                          { block: "Yard C", fill: 45, color: "#3B82F6" },
                          { block: "Yard D", fill: 88, color: "#F59E0B" },
                          { block: "Yard E", fill: 34, color: "#10B981" },
                          { block: "Yard F", fill: 67, color: "#3B82F6" },
                        ].map((item, idx) => (
                          <div key={idx} className="rounded-lg border border-white/5 bg-[#05060F] p-3 flex flex-col justify-between hover:border-emerald-500/20 transition">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-semibold text-white/95">{item.block}</span>
                              <span className="text-[9.5px] font-mono text-white/40">{item.fill}%</span>
                            </div>
                            <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${item.fill}%`, backgroundColor: item.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {roleName === "executive" && (
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                          {chartTitle}
                        </div>
                        <div className="mt-1 font-display text-2xl font-semibold text-white">
                          {chartValue} <span className="text-xs font-medium text-emerald-300">{chartChange}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-[10px] font-mono text-white/50">
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-white">24h</span>
                        <span className="px-2 py-0.5">7d</span>
                        <span className="px-2 py-0.5">30d</span>
                      </div>
                    </div>

                    <div className="relative mt-3">
                      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="h-32 w-full">
                        <defs>
                          <linearGradient id={chartAreaGradId} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={accentColor} stopOpacity="0.55" />
                            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id={chartLineGradId} x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor={accentColor} />
                            <stop offset="100%" stopColor="#22D3EE" />
                          </linearGradient>
                          <filter id={`glow-${roleName}`} x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2.5" result="b" />
                            <feMerge>
                              <feMergeNode in="b" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        {/* grid markers */}
                        {[20, 50, 80].map((yVal) => (
                          <line
                            key={yVal}
                            x1="0"
                            x2="400"
                            y1={yVal}
                            y2={yVal}
                            stroke="rgba(255,255,255,0.05)"
                            strokeDasharray="2 4"
                          />
                        ))}
                        {/* y ticks */}
                        {[
                          { y: 20, l: "15k" },
                          { y: 50, l: "10k" },
                          { y: 80, l: "5k" },
                        ].map((t) => (
                          <text
                            key={t.y}
                            x="4"
                            y={t.y - 2}
                            fill="rgba(255,255,255,0.25)"
                            fontSize="7"
                            fontFamily="ui-monospace,monospace"
                          >
                            {t.l}
                          </text>
                        ))}
                        <motion.path
                          d={chartAreaPath}
                          fill={`url(#${chartAreaGradId})`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.2, delay: 0.4 }}
                        />
                        <motion.path
                          d={chartLinePath}
                          fill="none"
                          stroke={`url(#${chartLineGradId})`}
                          strokeWidth="2"
                          filter={`url(#glow-${roleName})`}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.6 }}
                        />
                        {/* crosshair pointer */}
                        <line
                          x1="270"
                          x2="270"
                          y1="0"
                          y2="110"
                          stroke={`${accentColor}55`}
                          strokeDasharray="2 3"
                        />
                        <circle
                          cx="270"
                          cy="62"
                          r="5"
                          fill={accentColor}
                          stroke="#0A0E1F"
                          strokeWidth="2.5"
                        />
                        <circle cx="270" cy="62" r="9" fill="none" stroke={`${accentColor}55`} />
                        {/* labels */}
                        {["00:00", "06:00", "12:00", "18:00", "24:00"].map((lbl, idx) => (
                          <text
                            key={lbl}
                            x={idx * 100}
                            y="118"
                            fill="rgba(255,255,255,0.3)"
                            fontSize="7"
                            fontFamily="ui-monospace,monospace"
                            textAnchor={idx === 0 ? "start" : idx === 4 ? "end" : "middle"}
                          >
                            {lbl}
                          </text>
                        ))}
                      </svg>
                      {/* floating tooltip card */}
                      <div
                        className="pointer-events-none absolute"
                        style={{ left: "calc(67.5% - 56px)", top: "8%" }}
                      >
                        <div className="rounded-lg border border-white/10 bg-[#0B1024]/90 px-2.5 py-1.5 text-[10px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                          <div className="font-mono text-white/40">{chartTooltipTime}</div>
                          <div className="font-display text-sm font-semibold text-white">{chartTooltipValue}</div>
                          <div className="text-[9px]" style={{ color: accentColor }}>{chartTooltipChange}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sparkline cards */}
              {sparklines.map((k, i) => {
                const max = Math.max(...k.sparkPoints);
                const pts = k.sparkPoints
                  .map(
                    (val, idx) => `${(idx / (k.sparkPoints.length - 1)) * 100},${30 - (val / (max || 1)) * 24}`,
                  )
                  .join(" ");
                return (
                  <div
                    key={i}
                    className="col-span-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:col-span-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-white/45 uppercase tracking-wider">
                        {k.label}
                      </span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-mono"
                        style={{ background: `${k.color}1a`, color: k.color }}
                      >
                        {k.change}
                      </span>
                    </div>
                    <div className="mt-2 font-display text-xl font-semibold text-white">{k.value}</div>
                    <svg
                      viewBox="0 0 100 30"
                      preserveAspectRatio="none"
                      className="mt-2 h-6 w-full"
                    >
                      <polyline
                        points={pts}
                        fill="none"
                        stroke={k.color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.9"
                      />
                      <polyline points={`${pts} 100,30 0,30`} fill={k.color} opacity="0.12" />
                    </svg>
                  </div>
                );
              })}

              {/* Event Stream logs */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Live Event Stream
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    streaming
                  </span>
                </div>

                <ul className="mt-3 grid gap-1.5 text-[11px] sm:grid-cols-3">
                  {liveEvents.map((evt, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5"
                    >
                      <span className="font-mono text-white/40">{evt.time}</span>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: evt.color }} />
                      <span className="flex-1 truncate text-white/80">{evt.message}</span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-mono uppercase"
                        style={{ background: `${evt.color}22`, color: evt.color }}
                      >
                        {evt.tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      {floatingChips.map((chip, idx) => {
        const ChipIcon = chip.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + idx * 0.15 }}
            className={`absolute z-20 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-xs text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl lg:flex ${chip.xPosClass} ${chip.yPosClass}`}
          >
            <div className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${chip.gradFrom} ${chip.gradTo}`}>
              <ChipIcon className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <div className="font-semibold">{chip.title}</div>
              <div className="text-[10px] text-white/50">{chip.subtitle}</div>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3 }}
        className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] text-white backdrop-blur-2xl md:inline-flex"
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-300 animate-pulse" />
        {copilotStatus}
      </motion.div>
    </div>
  );
}

const vesselOSProps: DashboardMockupCardProps = {
  roleName: "vessels",
  accentColor: "#38bdf8",
  accentColorClass: "text-[#38bdf8]",
  accentBgClass: "bg-[#38bdf8]",
  successScore: 96,
  successStatus: "Marine Operations: Exceptional",
  progressMetrics: [
    { label: "Active Vessels", value: "217", percentage: 88, fromColor: "#38BDF8", toColor: "#0284C7" },
    { label: "Berth Occupancy", value: "4 / 6 occupied", percentage: 66, fromColor: "#3B82F6", toColor: "#2563EB" },
    { label: "Pilot Efficiency", value: "98.2%", percentage: 98, fromColor: "#10B981", toColor: "#059669" },
  ],
  chartTitle: "Vessel Turnaround Time",
  chartValue: "42.8 hours",
  chartChange: "↓ 14.2% faster turnaround",
  chartAreaGradId: "vessels-area-grad",
  chartLineGradId: "vessels-line-grad",
  chartLinePath: "M0,80 C30,72 50,60 80,58 C110,56 130,30 170,35 C210,40 230,70 270,62 C310,55 340,22 400,28",
  chartAreaPath: "M0,80 C30,72 50,60 80,58 C110,56 130,30 170,35 C210,40 230,70 270,62 C310,55 340,22 400,28 L400,110 L0,110 Z",
  chartTooltipTime: "Shift B · June 18",
  chartTooltipValue: "42.8 hours avg",
  chartTooltipChange: "ETA accuracy at 98.7%",
  sparklines: [
    { label: "Vessel Arrivals", value: "48", change: "+8 vessels", color: "#38bdf8", sparkPoints: [32, 35, 30, 42, 38, 44, 45, 48] },
    { label: "Pilot Bookings", value: "24", change: "100%", color: "#3B82F6", sparkPoints: [18, 20, 19, 22, 21, 23, 24, 24] },
    { label: "Weather Risk", value: "Low", change: "stable", color: "#10B981", sparkPoints: [10, 12, 11, 10, 9, 8, 8, 8] },
    { label: "Tug Availability", value: "12/12", change: "active", color: "#F59E0B", sparkPoints: [12, 12, 11, 12, 12, 12, 12, 12] },
  ],
  liveEvents: [
    { time: "15:22", message: "MV-Atlas Docked at Berth 3 · ETA met", color: "#38bdf8", tag: "docked" },
    { time: "15:10", message: "Vessel speed restricted: Channel 2", color: "#F59E0B", tag: "caution" },
    { time: "14:45", message: "Pilot boat assigned to CMA CGM Orion", color: "#10B981", tag: "assigned" },
  ],
  sidebarItems: [
    { icon: Ship, label: "Vessel Command", active: true },
    { icon: MapPin, label: "Berth Planner" },
    { icon: CloudSun, label: "Marine Weather" },
    { icon: Users, label: "Pilot & Crew Scheduling" },
  ],
  floatingChips: [
    { title: "MV-Atlas Berthed", subtitle: "Berth 3 · unloading", icon: Ship, gradFrom: "from-sky-500", gradTo: "to-blue-600", xPosClass: "-left-6", yPosClass: "top-24" },
    { title: "Channel Speed: 8 kn", subtitle: "Traffic control restrictions", icon: Compass, gradFrom: "from-blue-500", gradTo: "to-indigo-600", xPosClass: "-right-6", yPosClass: "bottom-20" },
  ],
  copilotStatus: 'Copilot: "Optimized arrival window for MV-Atlas, saving 0.8 tons fuel."',
};

const yardOSProps: DashboardMockupCardProps = {
  roleName: "yard",
  accentColor: "#10B981",
  accentColorClass: "text-[#10B981]",
  accentBgClass: "bg-[#10B981]",
  successScore: 92,
  successStatus: "Yard Efficiency: Hyper",
  progressMetrics: [
    { label: "Yard Capacity", value: "66% active", percentage: 66, fromColor: "#34D399", toColor: "#10B981" },
    { label: "Gate Queue", value: "3 trucks avg", percentage: 88, fromColor: "#3B82F6", toColor: "#60A5FA" },
    { label: "Crane Move Rate", value: "28 moves/hr", percentage: 92, fromColor: "#A78BFA", toColor: "#8B5CF6" },
  ],
  chartTitle: "TEU Throughput",
  chartValue: "12,408 TEU",
  chartChange: "↑ 8.4% vs last week",
  chartAreaGradId: "yard-area-grad",
  chartLineGradId: "yard-line-grad",
  chartLinePath: "M0,95 C40,93 80,90 120,85 C160,78 200,68 240,54 C280,36 320,18 400,2",
  chartAreaPath: "M0,95 C40,93 80,90 120,85 C160,78 200,68 240,54 C280,36 320,18 400,2 L400,110 L0,110 Z",
  chartTooltipTime: "Daily total",
  chartTooltipValue: "12,408 TEU",
  chartTooltipChange: "98.7% document accuracy",
  sparklines: [
    { label: "Active Cranes", value: "8 / 10", change: "stable", color: "#10B981", sparkPoints: [7, 8, 8, 8, 8, 7, 8, 8] },
    { label: "Gate Queue Time", value: "4.2 min", change: "-12 min wait", color: "#EF4444", sparkPoints: [16, 15, 12, 10, 8, 6, 5, 4.2] },
    { label: "PPE Compliance", value: "99.8%", change: "+1.2% score", color: "#0EA5E9", sparkPoints: [98.5, 98.6, 99.0, 99.2, 99.4, 99.6, 99.8, 99.8] },
    { label: "Reefer Monitoring", value: "142 monitored", change: "active", color: "#8B5CF6", sparkPoints: [130, 132, 135, 138, 140, 142, 142, 142] },
  ],
  liveEvents: [
    { time: "15:15", message: "PPE safety violation resolved: Cam YB-03", color: "#10B981", tag: "resolved" },
    { time: "15:02", message: "Crane C-2 assigned to Berth 5 (discharge MV-Horizon)", color: "#3B82F6", tag: "assigned" },
    { time: "14:55", message: "Gate Lane 3 opened: automatic OCR check active", color: "#8B5CF6", tag: "gate" },
  ],
  sidebarItems: [
    { icon: Container, label: "Yard Operations", active: true },
    { icon: Wrench, label: "Crane Grid" },
    { icon: MapPin, label: "Gate Monitor" },
    { icon: Users, label: "Safety & PPE Detection" },
  ],
  floatingChips: [
    { title: "Lane 3 Open", subtitle: "Truck queue minimized", icon: MapPin, gradFrom: "from-emerald-500", gradTo: "to-emerald-600", xPosClass: "-left-6", yPosClass: "top-24" },
    { title: "PPE Cam Active", subtitle: "Real-time safety guard", icon: Users, gradFrom: "from-teal-500", gradTo: "to-cyan-600", xPosClass: "-right-6", yPosClass: "bottom-20" },
  ],
  copilotStatus: 'Copilot: "Auto-dispatched safety officer to Yard B for PPE compliance."',
};

const executiveOSProps: DashboardMockupCardProps = {
  roleName: "executive",
  accentColor: "#8B5CF6",
  accentColorClass: "text-[#8B5CF6]",
  accentBgClass: "bg-[#8B5CF6]",
  successScore: 94,
  successStatus: "Operational Savings: Hyper",
  progressMetrics: [
    { label: "Cost Savings YTD", value: "$4.2M", percentage: 94, fromColor: "#A78BFA", toColor: "#8B5CF6" },
    { label: "Vessel Waiting Costs", value: "↓ 23%", percentage: 80, fromColor: "#38BDF8", toColor: "#0EA5E9" },
    { label: "SLA Compliance", value: "98.7%", percentage: 98, fromColor: "#34D399", toColor: "#10B981" },
  ],
  chartTitle: "YTD Dollar Savings",
  chartValue: "$4.2M savings",
  chartChange: "↑ 18% vs projection",
  chartAreaGradId: "exec-area-grad",
  chartLineGradId: "exec-line-grad",
  chartLinePath: "M0,85 C40,78 80,74 120,62 C160,50 200,45 240,38 C280,30 320,20 400,10",
  chartAreaPath: "M0,85 C40,78 80,74 120,62 C160,50 200,45 240,38 C280,30 320,20 400,10 L400,110 L0,110 Z",
  chartTooltipTime: "Q2 Year-to-Date",
  chartTooltipValue: "$4.2M saved",
  chartTooltipChange: "Carbon reduction: 184 tons",
  sparklines: [
    { label: "Daily Savings", value: "$14.2k/day", change: "+12.4%", color: "#8B5CF6", sparkPoints: [11.2, 11.5, 12.0, 12.8, 13.0, 13.5, 14.0, 14.2] },
    { label: "Carbon Offsets", value: "184 tons", change: "vetted", color: "#10B981", sparkPoints: [120, 130, 140, 152, 164, 172, 180, 184] },
    { label: "SLA Violations", value: "0", change: "-100%", color: "#3B82F6", sparkPoints: [4, 3, 2, 2, 1, 0, 0, 0] },
    { label: "Partner Ports", value: "14 Live", change: "+3 new", color: "#F59E0B", sparkPoints: [8, 9, 10, 11, 11, 12, 13, 14] },
  ],
  liveEvents: [
    { time: "15:30", message: "Weekly efficiency report compiled for Mundra", color: "#8B5CF6", tag: "report" },
    { time: "14:40", message: "Acme Logistics SLA certified: 100% uptime", color: "#10B981", tag: "sla" },
    { time: "14:10", message: "Carbon credits validated: IMO certified", color: "#3B82F6", tag: "imo" },
  ],
  sidebarItems: [
    { icon: Activity, label: "Executive Dashboard", active: true },
    { icon: Coins, label: "Financial Analytics" },
    { icon: Trophy, label: "SLA Tracker" },
    { icon: ShieldAlert, label: "Carbon & Compliance" },
  ],
  floatingChips: [
    { title: "$4.2M Saved YTD", subtitle: "18% over target", icon: Trophy, gradFrom: "from-purple-500", gradTo: "to-indigo-500", xPosClass: "-left-6", yPosClass: "top-24" },
    { title: "SLA: 98.7%", subtitle: "Industry-leading efficiency", icon: UserCheck, gradFrom: "from-emerald-500", gradTo: "to-teal-600", xPosClass: "-right-6", yPosClass: "bottom-20" },
  ],
  copilotStatus: 'Copilot: "Generated weekly performance report, SLA compliance is at 98.7%."',
};

function DashboardSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-[#05060F] border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Command Center</span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            One platform. <span className="text-white/50">Custom operating systems.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Scroll down to see the custom operating systems for Vessels, Yards, and Executives stack seamlessly.
          </p>
        </div>

        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={120} 
          baseScale={0.86} 
          itemScale={0.03}
          itemStackDistance={35}
          rotationAmount={0}
          blurAmount={1.5}
          stackPosition="12%"
        >
          <ScrollStackItem>
            <DashboardMockupCard {...vesselOSProps} />
          </ScrollStackItem>
          <ScrollStackItem>
            <DashboardMockupCard {...yardOSProps} />
          </ScrollStackItem>
          <ScrollStackItem>
            <DashboardMockupCard {...executiveOSProps} />
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
}

function Trust() {
  const logoItems = [
    { src: "/DP World.png", alt: "DP World", h: "h-14" },
    { src: "/Maersk.png", alt: "Maersk", h: "h-14" },
    { src: "/MSC.png", alt: "MSC", h: "h-14" },
    { src: "/Adani Ports.png", alt: "Adani Ports", h: "h-14" },
    { src: "/PSA.png", alt: "PSA", h: "h-10" },
    { src: "/JNPT.png", alt: "JNPT", h: "h-14" },
    { src: "/CMA CGM.png", alt: "CMA CGM", h: "h-14" },
    { src: "/Evergreen.png", alt: "Evergreen", h: "h-14" },
  ];

  const scrollLogos = [...logoItems, ...logoItems, ...logoItems];

  const stats = [
    { num: 1.8, decimals: 1, prefix: "", suffix: "M+", l: "Containers Tracked" },
    { num: 99.2, decimals: 1, prefix: "", suffix: "%", l: "Safety Compliance" },
    { num: 217, decimals: 0, prefix: "", suffix: "", l: "Active Vessels" },
    { num: 98.7, decimals: 1, prefix: "", suffix: "%", l: "AI Accuracy" },
    { num: 14, decimals: 0, prefix: "", suffix: "", l: "Deployed Ports" },
    { num: 99.99, decimals: 2, prefix: "", suffix: "%", l: "System Uptime" },
  ];

  return (
    <section className="bg-surface-2 py-20 overflow-hidden relative border-y border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="text-center text-xs uppercase tracking-[0.2em] font-bold text-white/60">
          Trusted across the global maritime logistics ecosystem
        </h3>
      </div>

      {/* Infinite Logo Carousel */}
      <div
        className="mt-8 relative w-full overflow-hidden py-5 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-[#05060F] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-[#05060F] after:to-transparent"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.95) 15%, rgba(255, 255, 255, 0.95) 85%, transparent)"
        }}
      >
        <div className="flex w-max gap-16 animate-logo-scroll cursor-pointer">
          {scrollLogos.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center min-w-[200px] h-18">
              <img
                src={logo.src}
                alt={logo.alt}
                className={`${logo.h} object-contain opacity-90 hover:opacity-100 transition-all duration-300`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-6">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-[#0A0E1F]/60 p-6 text-center">
              <div className="font-display text-3xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                <AnimatedCounter value={s.num} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-white/50">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const journeyCards = [
    {
      badge: "STAGE 01",
      title: "Ingest & Perceive",
      subtitle: "Capture raw video feeds, ship AIS telemetries, crane sensors, and terminal weather statistics into a secure, low-latency data fabric.",
      price: "Real-time Telemetry Ingest",
      img: "/1.jpg",
    },
    {
      badge: "STAGE 02",
      title: "Reason & Predict",
      subtitle: "Execute YOLOv11 vision logs to extract container numbers, flag structural damages, estimate crane Remaining Useful Life, and forecast gate bottlenecks.",
      price: "Vision Reasoning Engine",
      img: "/2.jpg",
    },
    {
      badge: "STAGE 03",
      title: "Orchestrate & Act",
      subtitle: "Deploy LangGraph multi-agent runtimes to auto-dispatch safety crews, optimize yard crane movements, clear customs manifests, and guide container trucks.",
      price: "Closed-Loop Agent Runtimes",
      img: "/3.jpg",
    },
    {
      badge: "STAGE 04",
      title: "Predictive Safety",
      subtitle: "Run ML anomaly detection classifiers to forecast crane machine failure states and schedule proactive maintenance before breakdowns.",
      price: "Predictive Health & Safety",
      img: "/4.jpg",
    },
    {
      badge: "STAGE 05",
      title: "Autonomy Integration",
      subtitle: "Sync yard slots, terminal berth positions, gate entry lanes, and trucks into a single self-optimizing digital ecosystem.",
      price: "Full Closed-Loop Autonomy",
      img: "/5.jpg",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 360; // Card width + gap
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-24 bg-[#05060F] overflow-hidden">
      {/* subtle glowing background effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.08),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.06),transparent)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section heading with Navigation Arrows */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#38bdf8]">System Phases</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Start your journey with PortMind AI
            </h2>
          </div>
          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-[#38bdf8]/30 transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-white/80" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-[#38bdf8]/30 transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-white/80" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll snap shelf */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
        >
          {journeyCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.08, type: "spring", stiffness: 80, damping: 15 }}
              className="flex-shrink-0 w-[285px] sm:w-[320px] md:w-[340px] snap-start rounded-[24px] border border-white/10 bg-[#0c0d16] overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:border-[#38bdf8]/30 cursor-default flex flex-col h-[450px] shadow-2xl"
            >
              {/* Card text content */}
              <div className="px-6 pt-6 pb-2">
                {card.badge && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#38bdf8] mb-1.5">
                    {card.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold tracking-[0.08em] leading-tight text-white font-mono uppercase">
                  {card.title}
                </h3>
                <p className="text-[12.5px] mt-1.5 leading-snug text-white/60 min-h-[38px]">
                  {card.subtitle}
                </p>
              </div>

              {/* Card product image */}
              <div className="flex-1 flex items-center justify-center px-4 pb-5 mt-2 relative overflow-hidden bg-transparent">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover object-center rounded-2xl border border-white/5 shadow-sm"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs uppercase tracking-[0.22em] text-[#38bdf8] font-bold">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-white/60 text-sm sm:text-base">{sub}</p>}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Multi-Source Ingest",
      d: "Continuous data ingestion from port CCTV, AIS signals, manifests, and weather feeds.",
      i: Database,
    },
    {
      n: "02",
      t: "Vision Perception",
      d: "Deep learning models detect container numbers, gauge structures, and verify safety PPE.",
      i: Eye,
    },
    {
      n: "03",
      t: "Agentic Reasoning",
      d: "LangGraph-powered AI agents plan yard movements, verify manifests, and trigger warning sirens.",
      i: Brain,
    },
    {
      n: "04",
      t: "Predictive Safety",
      d: "ML classifiers forecast machine breakdown schedules and alert operations beforehand.",
      i: ShieldAlert,
    },
    {
      n: "05",
      t: "Closed-Loop Action",
      d: "Automated routing logs clear gate entry, slots cranes, and optimizes truck turnarounds.",
      i: Cpu,
    },
  ];
  return (
    <section id="how" className="py-28 bg-[#05060F]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="How it works" title="Five steps to closed-loop port autonomy." />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ n, t, d, i: Icon }) => (
            <li key={n} className="premium-white-window-card group">
              {/* macOS-style window tools bar */}
              <div className="window-tools">
                <div className="window-dots">
                  <span className="window-dot red" />
                  <span className="window-dot yellow" />
                  <span className="window-dot green" />
                </div>
                <span className="window-step">Step {n}</span>
              </div>

              {/* Card content body */}
              <div className="card-body">
                <div className="card-icon-wrapper">
                  <Icon className="h-5.5 w-5.5" />
                </div>

                <h3 className="card-title-white">
                  {t}
                </h3>
                <p className="card-desc-white">
                  {d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Ecosystem() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [livePulse, setLivePulse] = useState<number>(84);

  // Periodic metrics update
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse((p) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(75, Math.min(99, p + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      id: 0,
      title: "Terminal Operators",
      index: "01",
      icon: Cpu,
      color: "#3B82F6", // Blue
      coreCode: "T-OPS",
      description: "Dynamic stacking distribution algorithms and density balancing.",
      metrics: [
        { label: "Yard Turnaround", value: "+32% Efficiency" },
        { label: "Berth Occupancy", value: "92% Capacity" },
        { label: "Dwell Times", value: "-25% Congestion" }
      ],
      agents: ["Block Allocator Bot", "Yard Density Balancer", "Reefer Guard AI"]
    },
    {
      id: 1,
      title: "Port Authorities",
      index: "02",
      icon: Ship,
      color: "#8B5CF6", // Purple
      coreCode: "AUTH",
      description: "Autonomous vessel berthing corridors, speed advisories, and tide scheduling.",
      metrics: [
        { label: "Vessel Queue", value: "1.2h Avg Waiting" },
        { label: "Carbon Offset", value: "-14% Emissions" },
        { label: "Uptime SLA", value: "99.99% Guaranteed" }
      ],
      agents: ["AIS Corridor Tracker", "Tide Window Optimizer", "Vessel Flow Agent"]
    },
    {
      id: 2,
      title: "Logistics Partners",
      index: "03",
      icon: Map,
      color: "#10B981", // Emerald
      coreCode: "LOGS",
      description: "Automatic inbound lane routing and queue dispatch synchronization.",
      metrics: [
        { label: "Gate Dwell Time", value: "14m Avg Dwell" },
        { label: "Truck Dispatch", value: "100% Synced" },
        { label: "Slot Match Index", value: "99.1% Accuracy" }
      ],
      agents: ["OCR Gate Identifier", "Lane Congestion Router", "Truck Flow Agent"]
    },
    {
      id: 3,
      title: "HSE Safety Teams",
      index: "04",
      icon: ShieldAlert,
      color: "#EF4444", // Red
      coreCode: "SAFE",
      description: "Real-time PPE compliance checking and thermal incident warnings.",
      metrics: [
        { label: "PPE Compliance", value: "99.2% Detected" },
        { label: "Active Hazards", value: "0 Open Incidents" },
        { label: "Fire Watch Mode", value: "Active 24/7" }
      ],
      agents: ["PPE Safety Vision", "Thermal Incidents Agent", "Lockdown Dispatcher"]
    },
    {
      id: 4,
      title: "Customs Officers",
      index: "05",
      icon: Database,
      color: "#F59E0B", // Amber
      coreCode: "CUST",
      description: "Instant customs clearing, document OCR parsing, and fraud alerts.",
      metrics: [
        { label: "Auto-Clearance Rate", value: "94% Handled" },
        { label: "HS Code Parsing", value: "99.8% Extraction" },
        { label: "Fraud Alert Log", value: "0 Latency Flag" }
      ],
      agents: ["Manifest Document AI", "HS Code Classifier", "DG Compliance Agent"]
    },
    {
      id: 5,
      title: "Maritime Executive",
      index: "06",
      icon: Coins,
      color: "#EC4899", // Pink
      coreCode: "EXEC",
      description: "Composite carbon composition, C-suite briefing summaries and direct savings.",
      metrics: [
        { label: "Operational Savings", value: "$4.2M Saved" },
        { label: "ROI Speed Index", value: "2.4x Multiplier" },
        { label: "ESG Score", value: "Tier 1 Compliant" }
      ],
      agents: ["Revenue Auditor", "ESG Scorekeeper", "SLA Guard AI"]
    }
  ];

  // Connection paths in the SVG viewport (0 0 960 700)
  const paths = [
    { d: "M 480 350 C 400 350, 320 110, 260 110", dur: "4.2s" }, // Card 1 (Top Left)
    { d: "M 480 350 C 400 362, 320 338, 260 350", dur: "3.6s" }, // Card 2 (Middle Left)
    { d: "M 480 350 C 400 350, 320 590, 260 590", dur: "4.8s" }, // Card 3 (Bottom Left)
    { d: "M 480 350 C 560 350, 640 110, 700 110", dur: "4.0s" }, // Card 4 (Top Right)
    { d: "M 480 350 C 560 338, 640 362, 700 350", dur: "3.8s" }, // Card 5 (Middle Right)
    { d: "M 480 350 C 560 350, 640 590, 700 590", dur: "4.5s" }  // Card 6 (Bottom Right)
  ];

  const activeNodeData = activeNode !== null ? cards[activeNode] : null;
  const themeColor = activeNodeData ? activeNodeData.color : "#38bdf8";

  return (
    <section id="ecosystem" className="border-t border-white/5 py-28 overflow-hidden bg-[#05060F] relative">
      <style>{`
        @keyframes marvel-rotate-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes marvel-rotate-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes marvel-pulse-ring {
          0% { r: 50px; opacity: 0.8; stroke-width: 2px; }
          100% { r: 125px; opacity: 0; stroke-width: 0.5px; }
        }
        @keyframes laser-flow {
          from { stroke-dashoffset: 240; }
          to { stroke-dashoffset: 0; }
        }
        .hud-rotate-cw {
          transform-origin: 480px 350px;
          animation: marvel-rotate-cw 15s linear infinite;
        }
        .hud-rotate-ccw {
          transform-origin: 480px 350px;
          animation: marvel-rotate-ccw 10s linear infinite;
        }
        .hud-core-rotate-cw {
          transform-origin: 110px 110px;
          animation: marvel-rotate-cw 15s linear infinite;
        }
        .hud-core-rotate-ccw {
          transform-origin: 110px 110px;
          animation: marvel-rotate-ccw 10s linear infinite;
        }
        .shockwave-ring {
          transform-origin: 480px 350px;
          animation: marvel-pulse-ring 3s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        .laser-flow-path {
          stroke-dasharray: 12 48;
          animation: laser-flow 3s linear infinite;
        }
        .laser-flow-path-active {
          stroke-dasharray: 24 36;
          animation: laser-flow 1.5s linear infinite;
        }
      `}</style>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Ambient light glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-3xl pointer-events-none transition-all duration-700" 
        style={{
          background: activeNodeData 
            ? `radial-gradient(closest-side, ${activeNodeData.color}15, transparent)` 
            : "radial-gradient(closest-side, rgba(56, 189, 248, 0.1), transparent)"
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHead 
          eyebrow="The Ecosystem" 
          title="One agentic mesh. Every stakeholder aligned." 
          sub="PortMind AI connects marine, terminal, customs, safety, and logistical systems into a single self-arbitrating digital ecosystem." 
        />

        <div className="mt-16 relative min-h-[720px] lg:min-h-[700px] flex items-center justify-center">
          {/* Layout Container */}
          <div className="eco-layout-container w-full relative">
            
            {/* SVG Connections Layer (Visible on desktop) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
              viewBox="0 0 960 700"
              fill="none"
            >
              {/* Definitions for glowing filter shadows */}
              <defs>
                <filter id="glow-filter-eco" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="marvel-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {paths.map((p, idx) => {
                const card = cards[idx];
                const isActive = activeNode === idx;

                return (
                  <g key={idx}>
                    {/* Shadow Glow Line (when active) */}
                    {isActive && (
                      <path
                        d={p.d}
                        stroke={card.color}
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="opacity-20"
                        style={{ filter: "url(#glow-filter-eco)" }}
                      />
                    )}
                    {/* Core Line */}
                    <path
                      d={p.d}
                      stroke={isActive ? card.color : "rgba(255, 255, 255, 0.08)"}
                      strokeWidth={isActive ? 2 : 1.5}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                    {/* Glowing laser pulse overlay */}
                    <path
                      d={p.d}
                      stroke={isActive ? card.color : "rgba(56, 189, 248, 0.35)"}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      strokeLinecap="round"
                      fill="none"
                      className={isActive ? "laser-flow-path-active" : "laser-flow-path"}
                      style={{ filter: "url(#marvel-glow)" }}
                    />
                    {/* Animated Neon Flowing Dot */}
                    <circle r={isActive ? 4.5 : 3} fill={isActive ? card.color : "rgba(56, 189, 248, 0.4)"} style={{ filter: isActive ? `drop-shadow(0 0 6px ${card.color})` : "none" }}>
                      <animateMotion dur={isActive ? "2s" : p.dur} repeatCount="indefinite" path={p.d} />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* Central AI Core Wrapper */}
            <div className="eco-core-wrapper">
              {/* Rotating HUD loops around the core */}
              <svg
                className="absolute w-[220px] h-[220px] pointer-events-none z-0"
                viewBox="0 0 220 220"
                fill="none"
              >
                <defs>
                  <filter id="marvel-glow-core" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer HUD circles wrapping the loop lines */}
                <circle 
                  cx="110" 
                  cy="110" 
                  r="82" 
                  fill="none" 
                  stroke={themeColor} 
                  strokeWidth="1" 
                  strokeDasharray="45 25 15 25" 
                  className="hud-core-rotate-cw" 
                  opacity="0.3" 
                  style={{ filter: "url(#marvel-glow-core)" }} 
                />
                <circle 
                  cx="110" 
                  cy="110" 
                  r="82" 
                  fill="none" 
                  stroke={themeColor} 
                  strokeWidth="1" 
                  strokeDasharray="6 12" 
                  className="hud-core-rotate-ccw" 
                  opacity="0.2" 
                />

                {/* Two Rotating Loop Lines (Atomic Orbits) spinning in opposite directions */}
                <g className="hud-core-rotate-cw">
                  <path
                    d="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110"
                    stroke={themeColor}
                    strokeWidth="1.2"
                    fill="none"
                    opacity="0.35"
                    className="transition-colors duration-500"
                  />
                  <circle r="3" fill={themeColor} style={{ filter: "url(#marvel-glow-core)" }}>
                    <animateMotion dur="6s" repeatCount="indefinite" path="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110" />
                  </circle>
                </g>

                <g className="hud-core-rotate-ccw">
                  <path
                    d="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110"
                    stroke={themeColor}
                    strokeWidth="1.2"
                    fill="none"
                    opacity="0.35"
                    className="transition-colors duration-500"
                  />
                  <circle r="3" fill={themeColor} style={{ filter: "url(#marvel-glow-core)" }}>
                    <animateMotion dur="4s" repeatCount="indefinite" path="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110" />
                  </circle>
                </g>
              </svg>

              <div 
                className="eco-core-glow-bg transition-all duration-500" 
                style={{
                  background: activeNodeData 
                    ? `radial-gradient(circle, ${activeNodeData.color}33 0%, ${activeNodeData.color}11 50%, transparent 70%)`
                    : "radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 70%)"
                }}
              />
              <div 
                className="eco-core-sphere transition-all duration-500 cursor-pointer group"
                style={{
                  borderColor: activeNodeData ? activeNodeData.color : "rgba(56, 189, 248, 0.4)",
                  boxShadow: activeNodeData
                    ? `inset 0 4px 15px rgba(255, 255, 255, 0.2), inset 0 -8px 25px rgba(0, 0, 0, 0.8), 0 0 35px ${activeNodeData.color}50`
                    : "inset 0 4px 15px rgba(255, 255, 255, 0.25), inset 0 -8px 25px rgba(0, 0, 0, 0.8), 0 0 45px rgba(56, 189, 248, 0.4)"
                }}
              >
                <div className="eco-core-inner-glow" />
                <div className="z-10 text-center flex flex-col items-center select-none">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block">PM-OS</span>
                  <span className="font-display text-sm font-black tracking-tight text-white transition-all duration-300">
                    {activeNodeData ? activeNodeData.coreCode : "CORE"}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping mt-1 block" />
                </div>
              </div>
            </div>

            {/* Ecosystem Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:block gap-6">
              {cards.map((c, idx) => {
                const Icon = c.icon;
                const isActive = activeNode === idx;

                return (
                  <div 
                    key={c.title} 
                    className={`eco-glass-card card-${idx + 1} transition-all duration-300 group cursor-pointer`}
                    style={{
                      borderColor: isActive ? c.color : "rgba(255,255,255,0.08)",
                      boxShadow: isActive 
                        ? `0 12px 35px rgba(0, 0, 0, 0.5), 0 0 20px ${c.color}25, 0 1px 0 rgba(255, 255, 255, 0.08) inset`
                        : "0 4px 20px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
                      transform: isActive ? "translateY(-4px)" : "none"
                    }}
                    onMouseEnter={() => setActiveNode(idx)}
                    onMouseLeave={() => setActiveNode(null)}
                  >
                    <div className="eco-card-header">
                      <div className="eco-card-title-group">
                        <span 
                          className="eco-card-title-icon transition-colors"
                          style={{
                            color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                            backgroundColor: isActive ? c.color : "rgba(255, 255, 255, 0.05)",
                            borderColor: isActive ? c.color : "rgba(255, 255, 255, 0.1)"
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <span className="eco-card-title block">{c.title}</span>
                          <span className="text-[8px] text-white/30 uppercase tracking-widest font-mono block">
                            Status: Online
                          </span>
                        </div>
                      </div>
                      <span className="eco-card-index">{c.index}</span>
                    </div>

                    <div className="eco-card-divider" />

                    <div className="relative min-h-[72px] flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        {!isActive ? (
                          <motion.div
                            key="metrics"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="eco-card-body"
                          >
                            {c.metrics.map((m) => (
                              <div key={m.label} className="eco-card-metric">
                                <span className="eco-metric-label">{m.label}</span>
                                <span className="eco-metric-value">{m.value}</span>
                              </div>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="details"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex flex-col gap-2 text-left"
                          >
                            <p className="text-[11px] leading-normal text-white/70">
                              {c.description}
                            </p>
                            <div className="flex flex-col gap-1">
                              <span className="text-[8px] uppercase tracking-widest font-mono text-white/40 block">
                                Orchestrated Agents
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {c.agents.map((agent, i) => (
                                  <span key={i} className="text-[8.5px] font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-white/80 whitespace-nowrap">
                                    {agent}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


function AgentsOSSection() {
  const ingest = [
    {
      tag: "01 · INGESTION",
      title: "Live Port Data Fabric",
      sub: "CCTV · AIS · Satellite · IoT · Manifests · Weather",
      art: <IngestArt />,
      metrics: [
        ["2.3M", "Containers"],
        ["120", "Ports"],
        ["98.7%", "Accuracy"],
      ],
    },
    {
      tag: "02 · DOCUMENT AI",
      title: "Document Intelligence Agent",
      sub: "BoL · Invoices · Manifests · HS · Customs",
      art: <DocAIArt />,
      metrics: [
        ["14k", "Pages/hr"],
        ["JSON", "Output"],
        ["99.1%", "OCR"],
      ],
    },
    {
      tag: "03 · RISK",
      title: "Container Risk Detection",
      sub: "Fraud · DG · Routing · Missing docs",
      art: <RiskArt />,
      metrics: [
        ["Laser", "Scan"],
        ["3-tier", "Risk"],
        ["1.4s", "P95"],
      ],
    },
  ];
  const execute = [
    {
      tag: "04 · CUSTOMS",
      title: "Customs Compliance Agent",
      sub: "HS codes · duties · regulatory checks",
      art: <CustomsArt />,
      metrics: [
        ["94%", "Auto-cleared"],
        ["3-state", "Decision"],
        ["EU/US/AE", "Rules"],
      ],
    },
    {
      tag: "05 · OPERATIONS",
      title: "Port Optimization Agent",
      sub: "Berth · crane · yard · truck routing",
      art: <OpsArt />,
      metrics: [
        ["+32%", "Turnaround"],
        ["-25%", "Congestion"],
        ["+18%", "Throughput"],
      ],
    },
    {
      tag: "06 · ETA",
      title: "Predictive ETA Engine",
      sub: "Weather · congestion · history · fuel",
      art: <EtaArt />,
      metrics: [
        ["97.2%", "Confidence"],
        ["±42m", "Window"],
        ["Live", "Track"],
      ],
    },
  ];
  const orchestratorAgents = [
    { n: "Document", a: -90 },
    { n: "Risk", a: -30 },
    { n: "Customs", a: 30 },
    { n: "ETA", a: 90 },
    { n: "Port Ops", a: 150 },
    { n: "Analytics", a: 210 },
  ];
  const impact = [
    { v: "98.7%", l: "Document accuracy", t: "+2.1 vs Q3" },
    { v: "65%", l: "Faster clearance", t: "vs manual" },
    { v: "40%", l: "Reduced delays", t: "across hubs" },
    { v: "24/7", l: "AI monitoring", t: "184 ports" },
    { v: "$4.2M", l: "Operational savings", t: "annualized" },
    { v: "1.8M+", l: "Containers managed", t: "this quarter" },
  ];

  return (
    <section
      id="agents"
      className="relative overflow-hidden border-t border-white/5 bg-[#0B1A33] py-28"
    >
      {/* atmospheric layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 10%, rgba(56,189,248,0.15), transparent 60%), radial-gradient(50% 50% at 85% 90%, rgba(37,99,235,0.08), transparent 60%), radial-gradient(40% 40% at 50% 50%, rgba(56,189,248,0.05), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 90%)",
        }}
      />

      {/* drifting particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-400/60"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 41) % 100}%`,
              boxShadow: "0 0 10px rgba(56,189,248,0.8)",
              animation: `floatY ${6 + (i % 5)}s ease-in-out ${i * 0.4}s infinite alternate`,
            }}
          />
        ))}
      </div>
      <style>{`@keyframes floatY{from{transform:translateY(0) translateX(0)}to{transform:translateY(-30px) translateX(20px)}}`}</style>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/[0.08] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-cyan-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI Operating System · v3.0
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white md:text-6xl leading-[1.04]">
            PortMind AI{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-blue-400">
              Operating System.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">
            From vessel arrival to customs clearance, PortMind orchestrates a fleet of specialized AI agents that ingest, reason, predict, and act across every port operation — in real time.
          </p>
        </div>

        {/* SYSTEM STATUS STRIP */}
        <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur-xl md:grid-cols-4">
          {[
            ["SYSTEMS", "All operational", "ok"],
            ["INGEST RATE", "12.4k ev/s", "ok"],
            ["AGENT MESH", "9 / 9 online", "ok"],
            ["INCIDENTS", "0 open · 2 auto-resolved", "ok"],
          ].map(([l, v]) => (
            <div
              key={l}
              className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-[#0F2547] px-3 py-2"
            >
              <span className="relative grid h-7 w-7 place-items-center rounded-md border border-cyan-400/30 bg-cyan-500/10">
                <span className="absolute inset-0 rounded-md border border-cyan-400/30 animate-ping" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              <div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-white/45">
                  {l}
                </div>
                <div className="text-[11px] font-semibold text-white">{v}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ROW A: INGESTION (Stages 1–3) */}
        <RowLabel
          n="I"
          title="INGESTION & PERCEPTION"
          sub="Multi-source signals enter the platform"
        />
        <div className="relative grid gap-5 md:grid-cols-3">
          <ConnectorRow />
          {ingest.map((s, i) => (
            <StageCard key={s.tag} stage={s} delay={i * 0.08} />
          ))}
        </div>

        {/* ROW B: ORCHESTRATOR centerpiece */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* ORCHESTRATOR */}
          <div
            className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-b from-cyan-500/[0.06] via-transparent to-transparent p-6 backdrop-blur-xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(34,211,238,0.18), 0 40px 100px -30px rgba(37,99,235,0.45)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] tracking-[0.22em] text-cyan-300/90">
                  07 · CORE
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  PortMind Agent Orchestrator
                </div>
                <div className="text-[12px] text-white/55">
                  Multi-agent reasoning · shared memory · LangGraph runtime
                </div>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 font-mono text-[10px] text-cyan-200 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />{" "}
                Live mesh
              </div>
            </div>

            <div className="relative mx-auto mt-6 aspect-square w-full max-w-[520px]">
              <OrchestratorHub agents={orchestratorAgents} />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <CorePill v="1.2k/s" l="DECISIONS" />
              <CorePill v="42 ms" l="P50 LATENCY" />
              <CorePill v="94.6%" l="AUTO-RESOLVED" />
            </div>
          </div>

          {/* IMPACT PANEL */}
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B1A33] to-[#05060F] p-6 backdrop-blur-xl"
            style={{ boxShadow: "0 40px 100px -30px rgba(0,0,0,0.8)" }}
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="relative">
              <div className="font-mono text-[10px] tracking-[0.22em] text-cyan-300/90">
                RUNTIME IMPACT
              </div>
              <div className="mt-1 text-lg font-semibold text-white">
                Every shift, measured.
              </div>
              <div className="text-[12px] text-white/55">
                Live across 14 partner ports
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {impact.map((k) => (
                  <div
                    key={k.l}
                    className="group relative overflow-hidden rounded-xl border border-cyan-400/15 bg-gradient-to-br from-cyan-500/[0.08] to-transparent p-3 hover:border-cyan-400/45 transition"
                    style={{ boxShadow: "inset 0 0 30px rgba(56,189,248,0.08)" }}
                  >
                    <div className="font-display text-2xl font-semibold tracking-tight text-white">
                      <span className="bg-gradient-to-br from-[#c8f2ff] to-[#38bdf8] bg-clip-text text-transparent">
                        {k.v}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/70">
                      {k.l}
                    </div>
                    <div className="mt-1 font-mono text-[9px] tracking-wider text-cyan-300/70">
                      {k.t}
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 inline-flex w-full items-center justify-between rounded-xl border border-cyan-400/35 bg-cyan-500/10 px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] text-cyan-200 hover:bg-cyan-500/20 transition cursor-pointer">
                DOWNLOAD IMPACT REPORT <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ROW C: EXECUTION */}
        <div className="mt-14">
          <RowLabel
            n="II"
            title="EXECUTION & OPTIMIZATION"
            sub="Specialist agents act on the world"
          />
          <div className="relative grid gap-5 md:grid-cols-3">
            <ConnectorRow />
            {execute.map((s, i) => (
              <StageCard key={s.tag} stage={s} delay={i * 0.08} />
            ))}
          </div>
        </div>

        {/* ROW D: EXECUTIVE DASHBOARD */}
        <div className="mt-14">
          <RowLabel
            n="III"
            title="EXECUTIVE COMMAND"
            sub="Unified picture for operators & C-suite"
          />
          <ExecutiveDashboard />
        </div>

        {/* CAPABILITY PILLS */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["PRIVACY-FIRST", "Edge inference · zero PII leak"],
            ["EXPLAINABLE", "Transparent reasoning · audit log"],
            ["REAL-TIME", "Sub-second decisions at scale"],
            ["CONTINUOUSLY LEARNING", "Smarter with every shift"],
          ].map(([t, s]) => (
            <div
              key={t}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur-xl hover:border-cyan-400/40 transition"
            >
              <div className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/90">
                {t}
              </div>
              <div className="mt-1 text-[11px] text-white/55">{s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RowLabel({
  n,
  title,
  sub,
}: {
  n: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3">
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-400/40 bg-gradient-to-br from-cyan-500/30 to-blue-700/10 font-mono text-[11px] font-bold text-cyan-200"
          style={{ boxShadow: "inset 0 0 20px rgba(56,189,248,0.25)" }}
        >
          {n}
        </span>
        <div>
          <div className="font-mono text-[11px] font-semibold tracking-[0.22em] text-cyan-300">
            {title}
          </div>
          <div className="text-[11px] text-white/45">{sub}</div>
        </div>
      </div>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-cyan-500/30 via-cyan-500/10 to-transparent md:block" />
    </div>
  );
}

function ConnectorRow() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 hidden h-px w-full md:block"
      viewBox="0 0 1000 4"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="connRow" x1="0" x2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
          <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line
        x1="0"
        y1="2"
        x2="1000"
        y2="2"
        stroke="url(#connRow)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function StageCard({ stage, delay }: { stage: any; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/50"
      style={{ boxShadow: "0 20px 60px -25px rgba(0,0,0,0.8)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(56,189,248,0.18), transparent 70%)",
        }}
      />
      <div
        className="relative h-36 w-full overflow-hidden rounded-xl border border-cyan-400/20 bg-gradient-to-br from-[#0F2547] to-[#0B1A33]"
        style={{ boxShadow: "inset 0 0 40px rgba(56,189,248,0.18)" }}
      >
        {stage.art}
        <div className="absolute left-2 top-2 rounded-md border border-cyan-400/30 bg-[#0B1A33]/80 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.18em] text-cyan-200">
          {stage.tag}
        </div>
      </div>
      <div className="relative mt-3">
        <div className="text-[14px] font-semibold text-white">
          {stage.title}
        </div>
        <div className="mt-0.5 truncate font-mono text-[10.5px] text-white/55">
          {stage.sub}
        </div>
      </div>
      <div className="relative mt-3 grid grid-cols-3 gap-1.5">
        {stage.metrics.map(([v, l]: any) => (
          <div
            key={l}
            className="rounded-md border border-white/10 bg-[#0F2547] px-2 py-1.5 text-center"
          >
            <div className="font-display text-[12px] font-semibold text-cyan-200">
              {v}
            </div>
            <div className="font-mono text-[8.5px] tracking-wider text-white/40">
              {l}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CorePill({ v, l }: { v: string; l: string }) {
  return (
    <div className="rounded-lg border border-cyan-400/25 bg-gradient-to-b from-cyan-500/[0.08] to-transparent px-3 py-2 text-center">
      <div className="font-display text-base font-semibold text-cyan-200">
        {v}
      </div>
      <div className="font-mono text-[9px] tracking-[0.18em] text-white/45">
        {l}
      </div>
    </div>
  );
}

function OrchestratorHub({ agents }: { agents: { n: string; a: number }[] }) {
  const R = 38;
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="coreG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="1" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0B1A33" stopOpacity="0" />
          </radialGradient>
          <filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <linearGradient id="spoke" x1="0" x2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {[180, 140, 100].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="rgba(56,189,248,0.18)"
            strokeDasharray="2 4"
          />
        ))}
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="rgba(56,189,248,0.08)"
        />
        <g
          style={{
            transformOrigin: "200px 200px",
            animation: "spin 24s linear infinite",
          }}
        >
          <circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="rgba(56,189,248,0.3)"
            strokeDasharray="4 12"
          />
        </g>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

        {agents.map((ag, i) => {
          const rad = (ag.a * Math.PI) / 180;
          const x = 200 + 160 * Math.cos(rad);
          const y = 200 + 160 * Math.sin(rad);
          return (
            <g key={i}>
              <line
                x1="200"
                y1="200"
                x2={x}
                y2={y}
                stroke="url(#spoke)"
                strokeWidth="1.2"
              />
              <circle r="3" fill="#22D3EE">
                <animateMotion
                  dur={`${3 + i * 0.4}s`}
                  repeatCount="indefinite"
                  path={`M 200 200 L ${x} ${y}`}
                />
              </circle>
              <circle r="3" fill="#2563EB">
                <animateMotion
                  dur={`${3.4 + i * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M ${x} ${y} L 200 200`}
                />
              </circle>
            </g>
          );
        })}

        <circle
          cx="200"
          cy="200"
          r="80"
          fill="url(#coreG)"
          filter="url(#hubGlow)"
          opacity="0.85"
        />
        <circle
          cx="200"
          cy="200"
          r="46"
          fill="#0F2547"
          stroke="rgba(56,189,248,0.6)"
          strokeWidth="1.5"
        />
        <circle
          cx="200"
          cy="200"
          r="46"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="0.6"
        >
          <animate
            attributeName="r"
            values="46;58;46"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.9;0;0.9"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x="200"
          y="198"
          textAnchor="middle"
          fill="#22D3EE"
          fontSize="11"
          fontFamily="monospace"
          fontWeight="700"
        >
          PORTMIND
        </text>
        <text
          x="200"
          y="212"
          textAnchor="middle"
          fill="rgba(255,255,255,0.55)"
          fontSize="8"
          fontFamily="monospace"
          letterSpacing="2"
        >
          ORCHESTRATOR
        </text>
      </svg>

      {agents.map((ag, i) => {
        const rad = (ag.a * Math.PI) / 180;
        const left = 50 + R * Math.cos(rad);
        const top = 50 + R * Math.sin(rad);
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-cyan-400/40 bg-[#0F2547]/95 px-2.5 py-1.5 font-mono text-[10px] text-cyan-100 backdrop-blur transition hover:scale-105 animate-pulse"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              boxShadow:
                "0 10px 30px -10px rgba(56,189,248,0.6), inset 0 0 12px rgba(56,189,248,0.18)",
            }}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-semibold tracking-wider">{ag.n}</span>
            </div>
            <div className="font-mono text-[8px] tracking-[0.16em] text-white/45">
              AGENT
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ExecutiveDashboard() {
  const bars = [62, 78, 45, 92, 68, 84, 55, 71, 88, 96, 73, 81];
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.005] p-5 backdrop-blur-xl md:p-6"
      style={{ boxShadow: "0 40px 100px -30px rgba(56,189,248,0.25)" }}
    >
      <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-[10px] text-white/40">
            portmind / command / executive.dashboard
          </span>
        </div>
        <div className="font-mono text-[10px] text-cyan-300/80">
          streaming · last 24h
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        {[
          { v: "12,408", l: "Containers", t: "+4.2%" },
          { v: "217", l: "Vessels", t: "+12" },
          { v: "3", l: "Risk alerts", t: "-2" },
          { v: "94%", l: "Crane health", t: "-1.4%" },
          { v: "98.7%", l: "Doc accuracy", t: "+2.1" },
          { v: "$4.2M", l: "Savings YTD", t: "+18%" },
        ].map((k) => (
          <div
            key={k.l}
            className="rounded-xl border border-white/10 bg-[#0F2547] p-3"
          >
            <div className="font-mono text-[9px] tracking-[0.18em] text-white/45">
              {k.l.toUpperCase()}
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="font-display text-lg font-semibold text-white">
                {k.v}
              </span>
              <span className="font-mono text-[9px] text-cyan-300">
                {k.t}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-[#0F2547] p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-white/50">
                CONTAINER THROUGHPUT
              </div>
              <div className="mt-0.5 text-[12px] text-white/70">
                Last 12 hours · TEU processed
              </div>
            </div>
            <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-200">
              +12.4%
            </span>
          </div>
          <svg viewBox="0 0 600 180" className="mt-3 h-44 w-full">
            <defs>
              <linearGradient id="thG" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((g) => (
              <line
                key={g}
                x1="0"
                x2="600"
                y1={40 * (g + 1)}
                y2={40 * (g + 1)}
                stroke="rgba(255,255,255,0.06)"
              />
            ))}
            <polyline
              points="0,120 50,100 100,110 150,70 200,90 250,55 300,68 350,38 400,55 450,28 500,40 550,18 600,30"
              stroke="#38bdf8"
              strokeWidth="2"
              fill="none"
            />
            <polyline
              points="0,120 50,100 100,110 150,70 200,90 250,55 300,68 350,38 400,55 450,28 500,40 550,18 600,30 600,180 0,180"
              fill="url(#thG)"
            />
            {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600].map(
              (x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={
                    [120, 100, 110, 70, 90, 55, 68, 38, 55, 28, 40, 18, 30][i]
                  }
                  r="2.5"
                  fill="#22D3EE"
                />
              ),
            )}
          </svg>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0F2547] p-4">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/50">
            PORT UTILIZATION
          </div>
          <div className="mt-0.5 text-[12px] text-white/70">
            Per berth · live
          </div>
          <div className="mt-4 flex h-32 items-end gap-1.5">
            {bars.map((b, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-700 via-cyan-500 to-emerald-300"
                style={{
                  height: `${b}%`,
                  boxShadow: "0 -2px 12px rgba(56,189,248,0.45)",
                }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[8.5px] text-white/40">
            <span>B-01</span>
            <span>B-12</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0F2547] p-4">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/50">
            RISK HEATMAP
          </div>
          <div className="mt-0.5 text-[12px] text-white/70">Yards × shifts</div>
          <div className="mt-3 grid grid-cols-8 gap-1">
            {Array.from({ length: 40 }).map((_, i) => {
              const v = ((i * 37) % 100) / 100;
              const bg =
                v > 0.75
                  ? "#2563EB"
                  : v > 0.5
                    ? "#22D3EE"
                    : v > 0.25
                      ? "#0B1A33"
                      : "#0F2547";
              return (
                <div
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{ background: bg, opacity: 0.4 + v * 0.6 }}
                />
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-white/45">
            <span>Low</span>
            <div className="flex h-1.5 flex-1 mx-2 overflow-hidden rounded-full">
              <span className="flex-1 bg-[#0F2547]" />
              <span className="flex-1 bg-[#0B1A33]" />
              <span className="flex-1 bg-[#22D3EE]" />
              <span className="flex-1 bg-[#2563EB]" />
            </div>
            <span>High</span>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0F2547]">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/50">
            LIVE EVENT STREAM
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />{" "}
            streaming
          </span>
        </div>
        <ul className="divide-y divide-white/5 text-[12px] text-white/70">
          {[
            ["14:32", "PPE violation auto-dispatched · Yard B · CAM-04", "ok"],
            [
              "14:28",
              "Crane C-4 vibration spike (4.2g) · maintenance window 02:40",
              "warn",
            ],
            [
              "14:15",
              "Vessel MV-228 docked at Berth 7 · ETA met within ±3m",
              "ok",
            ],
            [
              "14:10",
              "Container TCLU 818201 · damage flagged 87% · review queued",
              "warn",
            ],
          ].map(([t, m, s], i) => (
            <li key={i} className="flex items-center gap-3 px-4 py-2.5">
              <span className="font-mono text-[10px] text-white/40 w-12">
                {t as string}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${s === "warn" ? "bg-cyan-400" : "bg-emerald-400"}`}
              />
              <span className="flex-1 truncate">{m}</span>
              <span className="font-mono text-[9px] tracking-wider text-white/35">
                {s === "warn" ? "REVIEW" : "AUTO"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function IngestArt() {
  return (
    <svg viewBox="0 0 320 144" className="h-full w-full">
      <defs>
        <linearGradient id="seaG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0F2547" />
          <stop offset="100%" stopColor="#1A0F08" />
        </linearGradient>
        <linearGradient id="shipG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#0B1A33" />
        </linearGradient>
      </defs>
      <rect width="320" height="144" fill="url(#seaG)" />
      {[20, 40, 60].map((y, i) => (
        <line
          key={i}
          x1="0"
          y1={y}
          x2="320"
          y2={y}
          stroke="rgba(56,189,248,0.08)"
          strokeDasharray="2 6"
        />
      ))}
      <g transform="translate(40,18)">
        <rect width="14" height="6" fill="#67E8F9" />
        <rect x="-10" y="1" width="8" height="4" fill="#2563EB" />
        <rect x="16" y="1" width="8" height="4" fill="#2563EB" />
        <path
          d="M7 8 L7 30"
          stroke="#67E8F9"
          strokeWidth="0.5"
          strokeDasharray="1 2"
        />
      </g>
      <path
        d="M47 30 Q120 60 220 110"
        stroke="rgba(56,189,248,0.5)"
        fill="none"
        strokeDasharray="2 4"
      />
      <g transform="translate(160,72)">
        <path
          d="M0 40 L150 40 L138 60 L12 60 Z"
          fill="#0F172A"
          stroke="#2563EB"
          strokeWidth="0.8"
        />
        <rect
          x="14"
          y="22"
          width="110"
          height="18"
          fill="#1B3A6B"
          stroke="#67E8F9"
          strokeWidth="0.5"
        />
        {[16, 32, 48, 64, 80, 96, 112].map((x) => (
          <g key={x}>
            <rect x={x} y="24" width="14" height="7" fill="url(#shipG)" />
            <rect
              x={x}
              y="31.5"
              width="14"
              height="7"
              fill="#67E8F9"
              opacity="0.85"
            />
          </g>
        ))}
        <rect x="100" y="8" width="26" height="14" fill="#2563EB" />
        <rect x="112" y="-4" width="4" height="12" fill="#67E8F9" />
        <path
          d="M-20 56 Q40 50 80 56 T160 56"
          stroke="rgba(34,211,238,0.4)"
          fill="none"
        />
      </g>
      {[
        [10, 110, "CCTV"],
        [70, 124, "AIS"],
        [130, 122, "IoT"],
        [240, 18, "SAT"],
        [280, 116, "API"],
      ].map(([x, y, t]: any) => (
        <g key={t} transform={`translate(${x},${y})`}>
          <rect
            width="34"
            height="12"
            rx="2"
            fill="#0F2547"
            stroke="#2563EB"
            strokeWidth="0.5"
          />
          <text
            x="6"
            y="8.5"
            fontSize="6.5"
            fill="#67E8F9"
            fontFamily="monospace"
          >
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}

function DocAIArt() {
  return (
    <svg viewBox="0 0 320 144" className="h-full w-full">
      <rect width="320" height="144" fill="#0F2547" />
      {[10, 30, 50, 70, 90].map((y, i) => (
        <g key={i} transform={`translate(${10 + i * 6},${y})`}>
          <rect
            width="32"
            height="22"
            rx="2"
            fill="#14305C"
            stroke="#2563EB"
            strokeWidth="0.5"
          />
          {[5, 10, 15].map((ly) => (
            <line
              key={ly}
              x1="4"
              x2="28"
              y1={ly + 1}
              y2={ly + 1}
              stroke="#67E8F9"
              strokeOpacity="0.6"
              strokeWidth="0.4"
            />
          ))}
        </g>
      ))}
      <path
        d="M60 60 C 110 60, 130 72, 160 72"
        stroke="#2563EB"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M60 80 C 110 80, 130 78, 160 75"
        stroke="#67E8F9"
        strokeWidth="0.8"
        fill="none"
      />
      <g transform="translate(150,40)">
        <ellipse
          cx="40"
          cy="35"
          rx="44"
          ry="34"
          fill="url(#brainG)"
          stroke="#2563EB"
          strokeWidth="0.8"
        />
        <defs>
          <radialGradient id="brainG">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[
          "M15,30 Q40,10 65,30",
          "M15,40 Q40,25 65,40",
          "M20,50 Q40,40 60,50",
          "M22,20 Q40,5 58,20",
          "M18,60 Q40,55 62,60",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="#67E8F9"
            strokeWidth="0.6"
            fill="none"
            opacity="0.8"
          />
        ))}
        {[
          [15, 30],
          [65, 30],
          [15, 40],
          [65, 40],
          [40, 10],
          [40, 55],
          [20, 50],
          [60, 50],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.8" fill="#2563EB" />
        ))}
      </g>
      <g transform="translate(250,38)">
        <rect
          width="60"
          height="68"
          rx="3"
          fill="#0B1A33"
          stroke="#2563EB"
          strokeWidth="0.6"
        />
        <text x="6" y="13" fontSize="7" fontFamily="monospace" fill="#67E8F9">
          {"{"}
        </text>
        <text
          x="10"
          y="24"
          fontSize="6"
          fontFamily="monospace"
          fill="#fff"
          opacity="0.7"
        >
          "id":"TCLU…"
        </text>
        <text
          x="10"
          y="34"
          fontSize="6"
          fontFamily="monospace"
          fill="#fff"
          opacity="0.7"
        >
          "cargo":"…"
        </text>
        <text
          x="10"
          y="44"
          fontSize="6"
          fontFamily="monospace"
          fill="#fff"
          opacity="0.7"
        >
          "weight":…
        </text>
        <text
          x="10"
          y="54"
          fontSize="6"
          fontFamily="monospace"
          fill="#fff"
          opacity="0.7"
        >
          "hs":"8517…"
        </text>
        <text x="6" y="64" fontSize="7" fontFamily="monospace" fill="#67E8F9">
          {"}"}
        </text>
      </g>
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          cx={90 + i * 10}
          cy={70 + (i % 3) * 8}
          r="0.9"
          fill="#67E8F9"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

function RiskArt() {
  return (
    <svg viewBox="0 0 320 144" className="h-full w-full">
      <rect width="320" height="144" fill="#0F2547" />
      {[
        [10, 90, "#1E1B4B", 23],
        [44, 90, "#2563EB", 67],
        [78, 90, "#67E8F9", 89],
        [112, 90, "#1E1B4B", 31],
        [146, 90, "#2563EB", 76],
        [180, 90, "#67E8F9", 12],
        [214, 90, "#1E1B4B", 54],
        [248, 90, "#2563EB", 92],
        [282, 90, "#67E8F9", 18],
      ].map(([x, y, c, score]: any, i) => (
        <g key={i}>
          <rect
            x={x}
            y={y - 30}
            width="30"
            height="14"
            fill={c}
            stroke="rgba(0,0,0,0.5)"
          />
          <rect
            x={x}
            y={y - 14}
            width="30"
            height="14"
            fill={c}
            opacity="0.8"
            stroke="rgba(0,0,0,0.5)"
          />
          {[4, 10, 16, 22].map((dx) => (
            <line
              key={dx}
              x={x + dx}
              x2={x + dx}
              y1={y - 28}
              y2={y - 16}
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="0.3"
            />
          ))}
          {score > 60 && (
            <g>
              <rect
                x={x - 2}
                y={y - 44}
                width="34"
                height="11"
                rx="2"
                fill="#2563EB"
              />
              <text
                x={x + 15}
                y={y - 36}
                fontSize="7"
                fontFamily="monospace"
                fill="#0F2547"
                textAnchor="middle"
                fontWeight="700"
              >
                {score}%
              </text>
            </g>
          )}
        </g>
      ))}
      <line
        x1="0"
        y1="58"
        x2="320"
        y2="58"
        stroke="#2563EB"
        strokeWidth="0.6"
        strokeDasharray="3 3"
      >
        <animate
          attributeName="y1"
          values="40;110;40"
          dur="3.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y2"
          values="40;110;40"
          dur="3.6s"
          repeatCount="indefinite"
        />
      </line>
      <rect x="0" y="0" width="320" height="2" fill="#67E8F9">
        <animate
          attributeName="y"
          values="40;110;40"
          dur="3.6s"
          repeatCount="indefinite"
        />
      </rect>
      <line
        x1="0"
        y1="120"
        x2="320"
        y2="120"
        stroke="rgba(34,211,238,0.4)"
        strokeDasharray="2 4"
      />
    </svg>
  );
}

function CustomsArt() {
  return (
    <svg viewBox="0 0 320 144" className="h-full w-full">
      <rect width="320" height="144" fill="#0F2547" />
      <g transform="translate(30,30)">
        <circle cx="22" cy="16" r="11" fill="#67E8F9" />
        <rect x="10" y="28" width="24" height="32" rx="3" fill="#2563EB" />
        <rect x="14" y="34" width="16" height="8" fill="#0F2547" />
        <rect
          x="15"
          y="44"
          width="14"
          height="6"
          rx="1"
          fill="#0F2547"
          stroke="#67E8F9"
          strokeWidth="0.4"
        />
      </g>
      <g transform="translate(110,28)">
        <rect
          width="120"
          height="78"
          rx="6"
          fill="#0B1A33"
          stroke="#2563EB"
          strokeWidth="0.6"
        />
        <text x="8" y="14" fontSize="8" fontFamily="monospace" fill="#67E8F9">
          RULE ENGINE
        </text>
        {[
          ["HS 8517.62", "#22c55e", "PASS"],
          ["DUTIES 12%", "#22c55e", "PASS"],
          ["DG CHECK", "#2563EB", "REVIEW"],
          ["EU CE MARK", "#22c55e", "PASS"],
        ].map((r, i) => (
          <g key={i} transform={`translate(8,${22 + i * 13})`}>
            <rect
              width="104"
              height="10"
              rx="1.5"
              fill="#0F2547"
              stroke="rgba(255,255,255,0.08)"
            />
            <text
              x="4"
              y="7.5"
              fontSize="6.5"
              fontFamily="monospace"
              fill="#fff"
              opacity="0.7"
            >
              {r[0]}
            </text>
            <rect
              x="70"
              y="2"
              width="30"
              height="6"
              rx="1"
              fill={r[1] as string}
              opacity="0.85"
            />
            <text
              x="85"
              y="6.8"
              fontSize="5.5"
              fontFamily="monospace"
              fill="#0F2547"
              fontWeight="700"
              textAnchor="middle"
            >
              {r[2]}
            </text>
          </g>
        ))}
      </g>
      <g transform="translate(244,52)">
        <circle
          cx="22"
          cy="22"
          r="22"
          fill="none"
          stroke="#2563EB"
          strokeWidth="0.6"
          strokeDasharray="3 3"
        />
        <circle cx="22" cy="22" r="14" fill="#2563EB" />
        <text
          x="22"
          y="20"
          textAnchor="middle"
          fontSize="7"
          fontFamily="monospace"
          fill="#0F2547"
          fontWeight="700"
        >
          REVIEW
        </text>
        <text
          x="22"
          y="28"
          textAnchor="middle"
          fontSize="6"
          fontFamily="monospace"
          fill="#0F2547"
        >
          76%
        </text>
      </g>
      <path
        d="M60 70 L110 70"
        stroke="#2563EB"
        strokeWidth="1"
        fill="none"
        markerEnd="url(#arr)"
      />
      <path d="M230 70 L246 74" stroke="#2563EB" strokeWidth="1" fill="none" />
      <defs>
        <marker
          id="arr"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#2563EB" />
        </marker>
      </defs>
    </svg>
  );
}

function OpsArt() {
  return (
    <svg viewBox="0 0 320 144" className="h-full w-full">
      <rect width="320" height="144" fill="#0F2547" />
      <g transform="translate(20,12)">
        <line
          x1="40"
          y1="120"
          x2="40"
          y2="20"
          stroke="#2563EB"
          strokeWidth="2.5"
        />
        <line
          x1="40"
          y1="20"
          x2="160"
          y2="20"
          stroke="#67E8F9"
          strokeWidth="2.5"
        />
        <line
          x1="40"
          y1="20"
          x2="140"
          y2="120"
          stroke="rgba(34,211,238,0.4)"
          strokeDasharray="3 3"
        />
        <line
          x1="110"
          y1="20"
          x2="110"
          y2="60"
          stroke="#67E8F9"
          strokeWidth="1.2"
        />
        <rect
          x="100"
          y="60"
          width="22"
          height="14"
          fill="url(#crCont)"
          stroke="rgba(0,0,0,0.4)"
        />
        <defs>
          <linearGradient id="crCont" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0B1A33" />
          </linearGradient>
        </defs>
        <rect x="20" y="118" width="140" height="6" fill="#0B1A33" />
      </g>
      <g transform="translate(180,40)">
        {[0, 25, 50, 75].map((y) => (
          <line
            key={y}
            x1="0"
            x2="130"
            y1={y}
            y2={y}
            stroke="rgba(34,211,238,0.15)"
          />
        ))}
        <g>
          <rect x="0" y="20" width="18" height="10" fill="#67E8F9" />
          <rect x="-6" y="22" width="6" height="8" fill="#2563EB" />
          <circle cx="2" cy="32" r="1.8" fill="#0F2547" />
          <circle cx="14" cy="32" r="1.8" fill="#0F2547" />
        </g>
        <path
          d="M20 25 C 50 25, 60 60, 110 60"
          stroke="#2563EB"
          strokeWidth="1.4"
          fill="none"
          strokeDasharray="4 2"
        />
        <circle r="2.5" fill="#67E8F9">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M20 25 C 50 25, 60 60, 110 60"
          />
        </circle>
        <rect
          x="100"
          y="55"
          width="22"
          height="14"
          fill="none"
          stroke="#2563EB"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
      </g>
      {[
        ["+32%", 230, 14],
        ["-25%", 270, 14],
        ["+18%", 230, 130],
      ].map(([t, x, y]: any, i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <rect
            width="42"
            height="14"
            rx="2"
            fill="#0F2547"
            stroke="#2563EB"
            strokeWidth="0.5"
          />
          <text
            x="21"
            y="10"
            fontSize="8"
            fontFamily="monospace"
            fill="#67E8F9"
            textAnchor="middle"
            fontWeight="700"
          >
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}

function EtaArt() {
  return (
    <svg viewBox="0 0 320 144" className="h-full w-full">
      <rect width="320" height="144" fill="#0F2547" />
      <ellipse
        cx="160"
        cy="180"
        rx="180"
        ry="80"
        fill="none"
        stroke="rgba(34,211,238,0.25)"
      />
      <ellipse
        cx="160"
        cy="180"
        rx="140"
        ry="60"
        fill="none"
        stroke="rgba(34,211,238,0.15)"
      />
      <g fill="rgba(34,211,238,0.55)">
        {[
          [40, 60],
          [50, 55],
          [60, 62],
          [70, 58],
          [80, 66],
          [55, 72],
          [70, 76],
          [130, 40],
          [140, 46],
          [150, 42],
          [160, 50],
          [150, 58],
          [200, 60],
          [220, 55],
          [240, 62],
          [260, 58],
          [220, 72],
          [245, 76],
          [265, 70],
          [180, 90],
          [190, 96],
          [200, 92],
          [210, 100],
          [195, 108],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.4" />
        ))}
      </g>
      <path
        d="M40 62 Q 160 10 260 62"
        stroke="#2563EB"
        strokeWidth="1.4"
        fill="none"
        strokeDasharray="3 3"
      />
      <circle r="3" fill="#67E8F9">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M40 62 Q 160 10 260 62"
        />
      </circle>
      <g transform="translate(94,98)">
        <rect
          width="132"
          height="36"
          rx="4"
          fill="#0B1A33"
          stroke="#2563EB"
          strokeWidth="0.6"
        />
        <text x="8" y="14" fontSize="7" fontFamily="monospace" fill="#67E8F9">
          PREDICTED ARRIVAL
        </text>
        <text
          x="8"
          y="27"
          fontSize="10"
          fontFamily="monospace"
          fill="#fff"
          fontWeight="700"
        >
          14 Jun · 09:45
        </text>
        <g transform="translate(86,18)">
          <rect width="38" height="12" rx="2" fill="#2563EB" />
          <text
            x="19"
            y="9"
            fontSize="7"
            fontFamily="monospace"
            fill="#0F2547"
            textAnchor="middle"
            fontWeight="700"
          >
            97.2%
          </text>
        </g>
      </g>
    </svg>
  );
}

function DemoPreview() {
  const screens = [
    {
      title: "Command Center",
      color: "#2563EB",
      icon: LayoutChip("Risk · KPIs · Live feed"),
    },
    {
      title: "Crane Monitoring",
      color: "#0D9488",
      icon: LayoutChip("RUL · Sensors · Alerts"),
    },
    {
      title: "AI Copilot",
      color: "#8B5CF6",
      icon: LayoutChip("RAG · Citations · Agents"),
    },
  ];
  return (
    <section id="demo" className="border-t border-white/5 py-28 bg-[#05060F]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="The product" title="Built for operators, not analysts." />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {screens.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#0A0E1F]/60 shadow-md"
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                <span className="h-2 w-2 rounded-full bg-[#28C840]" />
                <div className="ml-2 text-[10px] font-mono text-white/40">
                  portmind.ai
                </div>
              </div>
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#0B1A33] to-[#0A0E1F] p-4">
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: s.color }}
                />
                <div className="font-display text-sm font-semibold text-white/90">
                  {s.title}
                </div>
                {s.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LayoutChip(label: string) {
  return (
    <div className="mt-4 space-y-2">
      <div className="h-2 w-1/2 rounded bg-white/5" />
      <div className="h-16 rounded border border-white/5 bg-white/[0.02]" />
      <div className="grid grid-cols-3 gap-2">
        <div className="h-10 rounded border border-white/5 bg-white/[0.02]" />
        <div className="h-10 rounded border border-white/5 bg-white/[0.02]" />
        <div className="h-10 rounded border border-white/5 bg-white/[0.02]" />
      </div>
      <div className="text-[10px] text-white/45 font-mono uppercase tracking-wider">{label}</div>
    </div>
  );
}

function Features() {
  const items = [
    {
      t: "Inference Ingestion",
      d: "Deep multi-source telemetry parsing of camera feeds, vessel location data, and weather streams in real time.",
      i: Database,
      accent: "#2563eb",
      accentGlow: "rgba(37,99,235,0.3)",
      featured: true,
    },
    {
      t: "Computer Vision OCR",
      d: "Deploy YOLOv11 OCR models to detect container IDs, identify damage anomalies, and audit yard slots.",
      i: Eye,
      accent: "#06b6d4",
      accentGlow: "rgba(6,182,212,0.3)",
      featured: true,
    },
    {
      t: "LangGraph Runtime",
      d: "Shared state routing connects specialized operator co-pilots.",
      i: Brain,
      accent: "#22d3ee",
      accentGlow: "rgba(34,211,238,0.3)",
    },
    {
      t: "Machinery Prognostics",
      d: "Classifiers calculate crane health logs and remaining useful life.",
      i: Wrench,
      accent: "#10b981",
      accentGlow: "rgba(16,185,129,0.3)",
    },
    {
      t: "Vessel ETA Engine",
      d: "Evaluate ETA timelines based on weather logs and queues.",
      i: Ship,
      accent: "#6366f1",
      accentGlow: "rgba(99,102,241,0.3)",
    },
    {
      t: "Safety Intrusion Alerts",
      d: "Audit site PPE compliance and automatically alert operators.",
      i: ShieldAlert,
      accent: "#ef4444",
      accentGlow: "rgba(239,68,68,0.3)",
    },
    {
      t: "Customs Compliance AI",
      d: "Extract BOL manifests, query HS codes, and flag fraud risk.",
      i: Database,
      accent: "#d946ef",
      accentGlow: "rgba(217,70,239,0.3)",
    },
    {
      t: "Weather Alert System",
      d: "Evaluate wind speeds, visibility logs, and storm indicators.",
      i: CloudSun,
      accent: "#f59e0b",
      accentGlow: "rgba(245,158,11,0.3)",
    },
    {
      t: "Operator Copilot RAG",
      d: "Your natural-language assistant working across terminal systems — drafting dispatch orders, search manifests, and query logs.",
      i: Bot,
      accent: "#14b8a6",
      accentGlow: "rgba(20,184,166,0.3)",
      featured: true,
    },
    {
      t: "Real-time Executive Dashboards",
      d: "Consolidated operational ROI metrics, TEU counts, and carbon indexes accessible by shift leaders and port executives.",
      i: BarChart3,
      accent: "#ec4899",
      accentGlow: "rgba(236,72,153,0.3)",
      featured: true,
    },
  ];

  return (
    <section id="platform" className="py-28 bg-[#05060F] border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Platform" title="Ten systems. One operating model." />

        <div className="mt-14 platform-grid">
          {items.map(({ t, d, i: Icon, accent, accentGlow, featured }, idx) => (
            <div
              key={t}
              className={`platform-card${featured ? " featured" : ""} platform-card-${idx + 1}`}
              style={{
                "--card-accent-glow": accentGlow,
              } as React.CSSProperties}
            >
              <div className="platform-card-index">{String(idx + 1).padStart(2, "0")}</div>

              <div
                className="platform-card-icon"
                style={{
                  background: `${accent}18`,
                  border: `1px solid ${accent}30`,
                  color: accent,
                }}
              >
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="platform-card-title">{t}</h3>
              <p className="platform-card-desc">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      title: "Platform",
      links: [
        { label: "Command Center", href: "/app" },
        { label: "Container Vision", href: "/app" },
        { label: "Crane Health", href: "/app" },
        { label: "Vessel Tracker", href: "/app" },
        { label: "Safety System", href: "/app" },
        { label: "AI Copilot", href: "/app", badge: "New" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Terminal Operators", href: "#" },
        { label: "Port Authorities", href: "#" },
        { label: "Logistics Partners", href: "#" },
        { label: "HSE Safety Teams", href: "#" },
        { label: "Sustainability ESG", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "System Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Terminal Case Studies", href: "#" },
        { label: "Maritime Whitepapers", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "System Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About PortMind", href: "#" },
        { label: "Careers", href: "#", badge: "Hiring" },
        { label: "Newsroom logs", href: "#" },
        { label: "Port Partners", href: "#" },
        { label: "Contact Sales", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#05060F] pt-16 pb-0 overflow-hidden text-white/70 relative border-t border-white/5">
      {/* glow + grid backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.18),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[260px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.12),transparent)]" />

      <div className="mx-auto max-w-[1380px] px-6 md:px-10 relative z-10">

        {/* Newsletter subscription box */}
        <div className="grid gap-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-10 backdrop-blur-xl mb-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              The Berth Report
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
              Operational intelligence for modern ports — in your inbox monthly.
            </h3>
            <p className="mt-3 max-w-xl text-sm text-white/60">
              Field notes from terminal deployments, multi-agent RAG studies, crane forecasting, and predictive maintenance benchmarks. No spam.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-stretch gap-3 self-center sm:flex-row w-full"
          >
            <label className="relative flex-1">
              <span className="sr-only">Work email</span>
              <input
                type="email"
                required
                placeholder="you@portoperator.com"
                className="h-12 w-full rounded-full border border-white/10 bg-[#0A0E1F]/90 px-5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 focus:bg-white/[0.06]"
              />
            </label>
            <button
              type="submit"
              className="group relative inline-flex h-12 items-center justify-center gap-1.5 overflow-hidden rounded-full px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.8)] transition-transform hover:-translate-y-px cursor-pointer"
              style={{
                backgroundImage: "linear-gradient(120deg, #1B3A6B 0%, #2563EB 55%, #0D9488 110%)",
              }}
            >
              <span className="relative z-10">Subscribe</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Information */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-white/60 mt-1 max-w-md">
              PortMind AI is the unified operating system for smart ports — combining computer vision, predictive maintenance, multi-agent reasoning, and vessel intelligence in one secure command center.
            </p>
            <div className="text-[13px] text-white/40 font-medium">
              PortMind AI B.V.
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                SOC 2 Type II
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                ISO 27001
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                IMO Compliant
              </span>
            </div>
          </div>

          {/* Contact Us */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contact Us</h3>
              <ul className="flex flex-col gap-3.5 text-[13.5px]">
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-white/80">Rotterdam · Singapore · Dubai</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                    <Mail className="h-4 w-4" />
                  </span>
                  <a href="mailto:hello@portmind.ai" className="text-white/80 hover:text-cyan-400 transition-colors">
                    hello@portmind.ai
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                    <Phone className="h-4 w-4" />
                  </span>
                  <a href="tel:+310108004221" className="text-white/80 hover:text-cyan-400 transition-colors">
                    +31 (0)10 800 4221
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="mt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3.5">Connect</h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                >
                  <GitHubIcon className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Sitemap Links */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Site Map</h3>
            <ul className="grid gap-2.5 text-[13.5px]">
              {[
                { to: "/", label: "Home" },
                { to: "/", hash: "how", label: "How It Works" },
                { to: "/", hash: "ecosystem", label: "Ecosystem" },
                { to: "/", hash: "agents", label: "AI OS" },
                { to: "/", hash: "platform", label: "Modules" },
                { to: "/app", label: "Launch Center" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    hash={link.hash}
                    className="text-white/75 hover:text-white hover:underline transition decoration-white/20 underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Legal / Copyright strip */}
      <div className="mx-auto max-w-[1380px] px-6 md:px-10 mt-16 pt-8 border-t border-dashed border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 relative z-10">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2.5">
          <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Security Details</a>
          <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Manage Cookies</a>
        </div>
        <div className="whitespace-nowrap">
          © {year} PortMind AI B.V. All rights reserved.
        </div>
      </div>

      {/* Giant Watermark Layer */}
      <div className="relative w-full pointer-events-none select-none z-0 h-[18vw] min-h-[140px] flex items-end justify-center mt-2 pb-0">
        {/* Vibrant cyan-blue background gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[120%] bg-gradient-to-t from-[#2563EB]/25 via-[#1E3A8A]/5 to-transparent pointer-events-none" />
        {/* Radial spotlight centered at the bottom to give that intense bright glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[160px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.45)_0%,rgba(37,99,235,0.18)_40%,transparent_70%)] blur-2xl pointer-events-none" />

        <h1 className="relative z-10 text-[9.2vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/25 via-white/5 to-transparent select-none uppercase font-sans whitespace-nowrap translate-y-[12%]">
          PortMind AI
        </h1>
      </div>
    </footer>
  );
}

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
  </svg>
);
