import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
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
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { AnimatedCounter } from "@/components/AnimatedCounter";

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
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-clip">
      <Nav />
      <Hero />
      <TrustedBy />
      <ProblemSection />
      <SolutionFlow />
      <ModulesBento />
      <AgentsGraph />
      <DemoPreview />
      <CTASection />
      <Footer />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
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
        className="relative mx-auto flex items-center gap-6 rounded-full border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_-20px_rgba(2,6,23,0.65),inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_-1px_0_0_rgba(255,255,255,0.04)]"
      >
        {/* top glossy sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-t-full opacity-60"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        {/* aurora wash */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(120% 80% at 10% 0%, rgba(167,139,250,0.22) 0%, rgba(167,139,250,0) 55%), radial-gradient(120% 80% at 90% 100%, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0) 55%)",
          }}
        />
        {/* gradient border ring */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-full"
          style={{
            background:
              "linear-gradient(120deg, rgba(167,139,250,0.55), rgba(34,211,238,0.4), rgba(99,102,241,0.5))",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
            opacity: 0.7,
          }}
        />

        <div className="relative flex items-center">
          <Logo />
        </div>
        <nav className="relative hidden md:flex items-center gap-0.5 text-sm">
          {[
            { h: "#modules", t: "Modules" },
            { h: "#agents", t: "AI Agents" },
            { h: "#solution", t: "Platform" },
            { h: "#demo", t: "Demo" },
          ].map((i) => (
            <a
              key={i.t}
              href={i.h}
              className="relative rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white hover:bg-white/10"
            >
              {i.t}
            </a>
          ))}
        </nav>
        <div className="relative ml-auto flex items-center gap-1.5">
          <Link
            to="/auth/login"
            className="hidden sm:inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
          >
            Sign in
          </Link>
          <Link
            to="/app"
            className="group relative inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-full px-4 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(99,102,241,0.7),inset_0_1px_0_0_rgba(255,255,255,0.35)] transition-transform hover:-translate-y-px"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #6366F1 0%, #8B5CF6 50%, #22D3EE 110%)",
            }}
          >
            <span className="relative z-10">Launch Platform</span>
            <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-white/5 text-white"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 10%, rgba(124,58,237,0.35), transparent 60%), radial-gradient(900px 500px at 80% 0%, rgba(37,99,235,0.25), transparent 60%), radial-gradient(700px 400px at 10% 20%, rgba(13,148,136,0.18), transparent 60%), linear-gradient(180deg, #05060F 0%, #07091A 60%, #05060F 100%)",
      }}
    >
      {/* Grid + scanline + noise overlays */}
      <div className="absolute inset-0 bg-grid opacity-[0.07]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.6) 3px, transparent 4px)",
        }}
      />
      {/* Aurora orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.55),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.4),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.32),transparent)] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pt-[136px] pb-24 lg:pt-[180px] lg:pb-32">
        <motion.div style={{ y }} className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-xl"
          >
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              New
            </span>
            Gen-3 multi-agent runtime — now live
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-[88px]"
          >
            Autonomous Intelligence
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #ffffff 0%, #C7D2FE 35%, #A78BFA 60%, #67E8F9 100%)",
              }}
            >
              for Modern Ports.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-base text-white/65 sm:text-lg"
          >
            PortMind AI combines Computer Vision, Predictive Maintenance,
            Multi-Agent AI, Vessel Intelligence, Weather Monitoring and
            Operational Analytics into one unified command center.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/app"
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold text-white shadow-[0_18px_40px_-12px_rgba(124,58,237,0.7)] transition-transform hover:-translate-y-0.5"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #1B3A6B 0%, #2563EB 45%, #7C3AED 100%)",
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

          {/* sub-trust micro-row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-white/45"
          >
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> SOC 2
              Type II
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> ISO
              27001
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Deployed
              in 14 ports
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> 99.99%
              uptime
            </span>
          </motion.div>
        </motion.div>

        <FloatingDashboard />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl lg:grid-cols-4"
        >
          {[
            { v: 847321, label: "Containers Processed" },
            { v: 99.2, dec: 1, suffix: "%", label: "Safety Compliance" },
            { v: 217, label: "Active Vessels" },
            { v: 98.7, dec: 1, suffix: "%", label: "AI Accuracy" },
          ].map((m, i) => (
            <div key={i} className="relative bg-transparent px-6 py-7">
              {i > 0 && (
                <span className="absolute inset-y-4 left-0 w-px bg-white/10" />
              )}
              <div className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                <AnimatedCounter
                  value={m.v}
                  decimals={m.dec ?? 0}
                  suffix={m.suffix ?? ""}
                />
              </div>
              <div className="mt-1 text-xs font-medium text-white/55">
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FloatingDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="relative mx-auto mt-16 max-w-6xl"
    >
      {/* halo */}
      <div className="absolute -inset-x-16 -inset-y-10 -z-10 rounded-[44px] bg-gradient-to-b from-violet-500/30 via-blue-500/15 to-transparent blur-3xl" />
      {/* gradient frame */}
      <div
        className="rounded-[20px] p-[1.5px]"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.4), rgba(139,92,246,0.5) 30%, rgba(37,99,235,0.4) 60%, rgba(255,255,255,0.08) 100%)",
        }}
      >
        <div className="overflow-hidden rounded-[18px] bg-[#0A0E1F]/95 backdrop-blur-2xl shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)]">
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-gradient-to-b from-[#0B1024] to-[#070A17] px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
            <div className="ml-3 hidden items-center gap-1 text-[10px] font-mono text-white/35 lg:flex">
              <span className="text-white/55">portmind</span>
              <span className="text-white/25">/</span>
              <span className="text-white/55">command</span>
              <span className="text-white/25">/</span>
              <span className="text-white/80">overview</span>
            </div>
            <div className="mx-auto flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono text-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              portmind.ai/command
              <span className="ml-1 text-white/25">·</span>
              <span className="text-white/40">mundra-port</span>
            </div>
            <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-white/40">
              <span className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 md:inline-flex">
                <span>⌘</span>
                <span>K</span>
              </span>
              <span className="hidden items-center gap-1 md:inline-flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                LIVE
              </span>
              <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-[9px] font-bold text-white shadow-[0_0_0_2px_rgba(255,255,255,0.06)]">
                AK
              </div>
            </div>
          </div>

          {/* body */}
          <div className="grid grid-cols-12 gap-px bg-white/5">
            {/* sidebar */}
            <aside className="col-span-2 hidden flex-col gap-1 bg-[#0A0E1F] p-3 lg:flex">
              {[
                { i: Cpu, l: "Overview", a: true },
                { i: Container, l: "Containers" },
                { i: Ship, l: "Vessels" },
                { i: Wrench, l: "Cranes" },
                { i: ShieldAlert, l: "Safety" },
                { i: Brain, l: "Copilot" },
                { i: Activity, l: "Analytics" },
              ].map((it, i) => {
                const Ic = it.i;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${it.a ? "bg-white/10 text-white" : "text-white/50"}`}
                  >
                    <Ic className="h-3.5 w-3.5" />
                    {it.l}
                  </div>
                );
              })}
            </aside>

            {/* main grid */}
            <div className="col-span-12 grid grid-cols-12 gap-3 bg-[#0A0E1F] p-4 lg:col-span-10">
              {/* Risk Score */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:col-span-4">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/40">
                  <span>Risk Score</span>
                  <span className="text-emerald-300">Healthy</span>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <div className="relative h-20 w-20">
                    <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                      <defs>
                        <linearGradient id="risk-g" x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0%" stopColor="#34D399" />
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
                        stroke="url(#risk-g)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="97"
                        initial={{ strokeDashoffset: 97 }}
                        animate={{ strokeDashoffset: 97 - 97 * 0.82 }}
                        transition={{ duration: 1.6, delay: 0.6 }}
                      />
                    </svg>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <div className="font-display text-xl font-semibold text-white">
                          82
                        </div>
                        <div className="text-[8px] font-mono uppercase text-white/40">
                          /100
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-white/60">
                      <span>Operations</span>
                      <span className="font-mono text-emerald-300">96</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-white/60">
                      <span>Safety</span>
                      <span className="font-mono text-cyan-300">74</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-white/60">
                      <span>Assets</span>
                      <span className="font-mono text-blue-300">88</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Throughput chart */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:col-span-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                      Container Throughput · 24h
                    </div>
                    <div className="mt-1 font-display text-2xl font-semibold text-white">
                      12,408{" "}
                      <span className="text-xs font-medium text-emerald-300">
                        ↑ 8.4%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-[10px] font-mono text-white/50">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-white">
                      24h
                    </span>
                    <span className="px-2 py-0.5">7d</span>
                    <span className="px-2 py-0.5">30d</span>
                  </div>
                </div>
                <div className="relative mt-3">
                  <svg
                    viewBox="0 0 400 120"
                    preserveAspectRatio="none"
                    className="h-32 w-full"
                  >
                    <defs>
                      <linearGradient id="ar1" x1="0" x2="0" y1="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#7C3AED"
                          stopOpacity="0.55"
                        />
                        <stop
                          offset="100%"
                          stopColor="#2563EB"
                          stopOpacity="0"
                        />
                      </linearGradient>
                      <linearGradient id="line1" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#A78BFA" />
                        <stop offset="100%" stopColor="#22D3EE" />
                      </linearGradient>
                      <filter
                        id="glow1"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                      >
                        <feGaussianBlur stdDeviation="2.5" result="b" />
                        <feMerge>
                          <feMergeNode in="b" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    {/* grid */}
                    {[20, 50, 80].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        x2="400"
                        y1={y}
                        y2={y}
                        stroke="rgba(255,255,255,0.05)"
                        strokeDasharray="2 4"
                      />
                    ))}
                    {/* y-axis ticks */}
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
                      d="M0,80 C30,72 50,60 80,58 C110,56 130,30 170,35 C210,40 230,70 270,62 C310,55 340,22 400,28 L400,110 L0,110 Z"
                      fill="url(#ar1)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.4 }}
                    />
                    <motion.path
                      d="M0,80 C30,72 50,60 80,58 C110,56 130,30 170,35 C210,40 230,70 270,62 C310,55 340,22 400,28"
                      fill="none"
                      stroke="url(#line1)"
                      strokeWidth="2"
                      filter="url(#glow1)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.6 }}
                    />
                    {/* tooltip crosshair */}
                    <line
                      x1="270"
                      x2="270"
                      y1="0"
                      y2="110"
                      stroke="rgba(167,139,250,0.35)"
                      strokeDasharray="2 3"
                    />
                    <circle
                      cx="270"
                      cy="62"
                      r="5"
                      fill="#A78BFA"
                      stroke="#0A0E1F"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="270"
                      cy="62"
                      r="9"
                      fill="none"
                      stroke="rgba(167,139,250,0.35)"
                    />
                    {/* x-axis labels */}
                    {["00:00", "06:00", "12:00", "18:00", "24:00"].map(
                      (l, i) => (
                        <text
                          key={l}
                          x={i * 100}
                          y="118"
                          fill="rgba(255,255,255,0.3)"
                          fontSize="7"
                          fontFamily="ui-monospace,monospace"
                          textAnchor={
                            i === 0 ? "start" : i === 4 ? "end" : "middle"
                          }
                        >
                          {l}
                        </text>
                      ),
                    )}
                  </svg>
                  {/* floating value card */}
                  <div
                    className="pointer-events-none absolute"
                    style={{ left: "calc(67.5% - 56px)", top: "8%" }}
                  >
                    <div className="rounded-lg border border-white/10 bg-[#0B1024]/90 px-2.5 py-1.5 text-[10px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      <div className="font-mono text-white/40">18:00</div>
                      <div className="font-display text-sm font-semibold text-white">
                        11,842
                      </div>
                      <div className="text-[9px] text-emerald-300">
                        +6.2% vs avg
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* KPI tiles */}
              {[
                {
                  l: "Active Vessels",
                  v: "217",
                  t: Ship,
                  c: "#60A5FA",
                  d: "+12",
                  spark: [6, 8, 7, 10, 9, 12, 11, 14],
                },
                {
                  l: "Containers Today",
                  v: "12,408",
                  t: Container,
                  c: "#A78BFA",
                  d: "+8.4%",
                  spark: [4, 6, 5, 8, 7, 9, 11, 13],
                },
                {
                  l: "Safety Alerts",
                  v: "3",
                  t: ShieldAlert,
                  c: "#67E8F9",
                  d: "-2",
                  spark: [9, 8, 10, 7, 6, 5, 4, 3],
                },
                {
                  l: "Crane Health",
                  v: "94%",
                  t: Wrench,
                  c: "#34D399",
                  d: "stable",
                  spark: [10, 11, 10, 12, 11, 12, 11, 12],
                },
              ].map((k, i) => {
                const Icon = k.t;
                const max = Math.max(...k.spark);
                const pts = k.spark
                  .map(
                    (v, idx) =>
                      `${(idx / (k.spark.length - 1)) * 100},${30 - (v / max) * 24}`,
                  )
                  .join(" ");
                return (
                  <div
                    key={i}
                    className="col-span-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:col-span-3"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="grid h-7 w-7 place-items-center rounded-md"
                        style={{
                          background: `${k.c}22`,
                          color: k.c,
                          boxShadow: `inset 0 0 0 1px ${k.c}30`,
                        }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-mono"
                        style={{ background: `${k.c}1a`, color: k.c }}
                      >
                        {k.d}
                      </span>
                    </div>
                    <div className="mt-2 font-display text-xl font-semibold text-white">
                      {k.v}
                    </div>
                    <div className="text-[10px] text-white/45">{k.l}</div>
                    <svg
                      viewBox="0 0 100 30"
                      preserveAspectRatio="none"
                      className="mt-2 h-6 w-full"
                    >
                      <polyline
                        points={pts}
                        fill="none"
                        stroke={k.c}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.9"
                      />
                      <polyline
                        points={`${pts} 100,30 0,30`}
                        fill={k.c}
                        opacity="0.12"
                      />
                    </svg>
                  </div>
                );
              })}

              {/* Live events feed */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Live Event Stream
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                    streaming
                  </span>
                </div>
                <ul className="mt-3 grid gap-1.5 text-[11px] sm:grid-cols-3">
                  {[
                    ["14:32", "No Helmet Detected · Yard B", "#67E8F9", "warn"],
                    ["14:28", "Crane 4 Vibration Spike", "#EF4444", "alert"],
                    ["14:15", "Vessel MV-228 Arrived", "#34D399", "ok"],
                  ].map(([t, msg, c, tag]) => (
                    <li
                      key={t as string}
                      className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5"
                    >
                      <span className="font-mono text-white/40">{t}</span>
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: c as string }}
                      />
                      <span className="flex-1 truncate text-white/80">
                        {msg}
                      </span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-mono uppercase"
                        style={{ background: `${c}22`, color: c as string }}
                      >
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating chips */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute -left-6 top-24 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-xs text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl lg:flex"
      >
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
          <Eye className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <div className="font-semibold">YOLOv11 · 62 FPS</div>
          <div className="text-[10px] text-white/50">
            Cam · Berth 04 · running
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.1 }}
        className="absolute -right-6 bottom-20 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-xs text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl lg:flex"
      >
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
          <Cpu className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <div className="font-semibold">Crane-4 · 12d to service</div>
          <div className="text-[10px] text-white/50">XGBoost · 96.2% conf.</div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] text-white backdrop-blur-2xl md:inline-flex"
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-300" />
        Copilot · "Auto-dispatched safety officer to Yard B"
      </motion.div>
    </motion.div>
  );
}

function TrustedBy() {
  const logos = [
    "DP World",
    "Maersk",
    "MSC",
    "Adani Ports",
    "PSA",
    "JNPT",
    "CMA CGM",
    "Evergreen",
  ];
  return (
    <section className="border-b border-border bg-card/40 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by maritime & logistics leaders worldwide
        </div>
        <div className="mt-8 overflow-hidden">
          <div className="flex w-[200%] scroll-marquee items-center gap-12">
            {[...logos, ...logos].map((l, i) => (
              <div
                key={i}
                className="font-display text-2xl font-semibold tracking-tight text-foreground/40 whitespace-nowrap hover:text-foreground/80 transition"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const cards = [
    {
      t: "Operational Inefficiency",
      pts: ["Manual inspections", "Delayed reporting", "Human errors"],
      i: Activity,
    },
    {
      t: "Safety Risks",
      pts: ["PPE violations", "Fire incidents", "Unauthorized access"],
      i: ShieldAlert,
    },
    {
      t: "Equipment Failures",
      pts: ["Crane downtime", "Unexpected breakdowns", "Maintenance costs"],
      i: Wrench,
    },
    {
      t: "Fragmented Data",
      pts: [
        "Multiple systems",
        "No centralized intelligence",
        "Poor visibility",
      ],
      i: Database,
    },
  ];
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>The problem</SectionLabel>
        <SectionHeading>
          Modern ports run on yesterday's systems.
        </SectionHeading>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Disconnected tools, manual workflows and blind spots quietly cost
          billions every year — in lost throughput, safety incidents and
          unplanned downtime.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const Icon = c.i;
            return (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-xl border border-border bg-card p-6 transition hover:border-[color:var(--color-secondary)]/40 hover:shadow-lg"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--color-destructive)]/10 text-[color:var(--color-destructive)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {c.t}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {c.pts.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />{" "}
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SolutionFlow() {
  const layers = [
    {
      t: "Data Sources",
      d: "Cameras · AIS · IoT · Sensors",
      from: "#1B3A6B",
      to: "#2563EB",
      Icon: Database,
      metric: "1.2M evt/s",
    },
    {
      t: "Computer Vision",
      d: "YOLOv11 · OpenCV · PaddleOCR",
      from: "#2563EB",
      to: "#06B6D4",
      Icon: Eye,
      metric: "42 ms",
    },
    {
      t: "Predictive Analytics",
      d: "XGBoost · ML pipelines",
      from: "#0D9488",
      to: "#10B981",
      Icon: Activity,
      metric: "98.4% F1",
    },
    {
      t: "AI Agents",
      d: "LangGraph multi-agent runtime",
      from: "#8B5CF6",
      to: "#6366F1",
      Icon: Brain,
      metric: "12 agents",
    },
    {
      t: "Knowledge System",
      d: "ChromaDB · BGE · Reranker",
      from: "#6366F1",
      to: "#67E8F9",
      Icon: Network,
      metric: "8.4M docs",
    },
    {
      t: "Command Center",
      d: "Unified operator workspace",
      from: "#15803D",
      to: "#22C55E",
      Icon: Cpu,
      metric: "real-time",
    },
  ];

  return (
    <section
      id="solution"
      className="relative overflow-hidden border-b border-white/5 py-28 text-white"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(37,99,235,0.25), transparent 60%), radial-gradient(900px 500px at 90% 110%, rgba(13,148,136,0.20), transparent 60%), linear-gradient(180deg, #050B1A 0%, #07112A 60%, #060D20 100%)",
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      {/* aurora blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.35),transparent)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.30),transparent)] blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel className="text-[color:var(--color-accent)]">
            The platform
          </SectionLabel>
          <SectionHeading className="text-white">
            From raw signal to operator decision in{" "}
            <span className="bg-gradient-to-r from-[#60A5FA] via-[#22D3EE] to-[#34D399] bg-clip-text text-transparent">
              milliseconds.
            </span>
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            A single intelligence stack that ingests every sensor in your port
            and surfaces decisions, not dashboards.
          </p>
        </div>

        {/* Pipeline pill */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/70 backdrop-blur-xl">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono">PIPELINE</span>
            <span className="text-white/30">·</span>
            <span>Ingest → Perceive → Reason → Act</span>
            <span className="text-white/30">·</span>
            <span className="font-mono text-emerald-300">42 ms p50</span>
          </div>
        </div>

        {/* 3D Grid */}
        <div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1600px" }}
        >
          {layers.map((l, i) => {
            const Icon = l.Icon;
            return (
              <motion.div
                key={l.t}
                initial={{ opacity: 0, y: 30, rotateX: -8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.06,
                  type: "spring",
                  stiffness: 80,
                  damping: 18,
                }}
                whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
                style={{ transformStyle: "preserve-3d" }}
                className="group relative"
              >
                {/* gradient border halo */}
                <div
                  aria-hidden
                  className="absolute -inset-px rounded-2xl opacity-70 blur-[2px] transition-opacity group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${l.from}, ${l.to}, transparent 70%)`,
                  }}
                />
                {/* card */}
                <div
                  className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 backdrop-blur-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* glossy top sheen */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-2xl opacity-60"
                    style={{
                      background: `radial-gradient(120% 100% at 50% 0%, ${l.to}33, transparent 60%)`,
                    }}
                  />
                  {/* faint corner glow */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full opacity-40 blur-2xl"
                    style={{ background: l.from }}
                  />

                  <div
                    className="relative flex items-start justify-between"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-[0_10px_25px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.25)]"
                        style={{
                          background: `linear-gradient(135deg, ${l.from}, ${l.to})`,
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="font-mono text-[11px] tracking-widest text-white/40">
                        {String(i + 1).padStart(2, "0")} / 06
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  </div>

                  <div
                    className="relative mt-6"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <div className="font-display text-xl font-semibold text-white">
                      {l.t}
                    </div>
                    <div className="mt-1.5 text-sm text-white/55">{l.d}</div>
                  </div>

                  {/* footer with metric + animated bar */}
                  <div
                    className="relative mt-7 border-t border-white/10 pt-4"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
                        throughput
                      </span>
                      <span className="font-mono text-xs text-white/80">
                        {l.metric}
                      </span>
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${65 + ((i * 7) % 30)}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.2,
                          delay: 0.2 + i * 0.06,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${l.from}, ${l.to})`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* bottom flow caption */}
        <div className="mt-12 flex items-center justify-center gap-4 text-xs text-white/50">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
          <span className="font-mono uppercase tracking-[0.2em]">
            closed-loop autonomy
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
        </div>
      </div>
    </section>
  );
}

function ModulesBento() {
  return (
    <section id="modules" className="border-b border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>AI modules</SectionLabel>
        <SectionHeading>
          Six intelligence layers. One operating system.
        </SectionHeading>
        <div className="mt-12 grid grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]">
          <BentoCard
            className="col-span-12 lg:col-span-6 lg:row-span-2"
            icon={Container}
            title="Container Intelligence"
            accent="#2563EB"
            tags={["Detect containers", "Read IDs", "Damage detection"]}
          >
            <ContainerVis />
          </BentoCard>
          <BentoCard
            className="col-span-12 md:col-span-6 lg:col-span-3"
            icon={Wrench}
            title="Crane Intelligence"
            accent="#0D9488"
            tags={[
              "Predict failures",
              "Remaining useful life",
              "Health monitoring",
            ]}
          >
            <CraneVis />
          </BentoCard>
          <BentoCard
            className="col-span-12 md:col-span-6 lg:col-span-3"
            icon={Ship}
            title="Vessel Intelligence"
            accent="#1B3A6B"
            tags={["AIS tracking", "ETA prediction", "Route analysis"]}
          />
          <BentoCard
            className="col-span-12 md:col-span-6 lg:col-span-4"
            icon={ShieldAlert}
            title="Safety Intelligence"
            accent="#DC2626"
            tags={["PPE detection", "Fire detection", "Intrusion detection"]}
          />
          <BentoCard
            className="col-span-12 md:col-span-6 lg:col-span-4"
            icon={CloudSun}
            title="Weather Intelligence"
            accent="#6366F1"
            tags={["Wind analysis", "Visibility monitoring", "Storm alerts"]}
          />
          <BentoCard
            className="col-span-12 lg:col-span-4"
            icon={Sparkles}
            title="AI Copilot"
            accent="#8B5CF6"
            tags={[
              "Natural language queries",
              "RAG search",
              "Operational guidance",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  className = "",
  icon: Icon,
  title,
  accent,
  tags,
  children,
}: {
  className?: string;
  icon: any;
  title: string;
  accent: string;
  tags: string[];
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:shadow-xl ${className}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />
      <div className="flex items-start justify-between">
        <div
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ background: `${accent}15`, color: accent }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-mono uppercase text-muted-foreground">
          module
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {tags.map((t) => (
          <li key={t} className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5" style={{ color: accent }} />
            {t}
          </li>
        ))}
      </ul>
      {children && <div className="mt-5">{children}</div>}
    </motion.div>
  );
}

function ContainerVis() {
  return (
    <div className="relative aspect-[16/7] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-[#0B1A33] to-[#1B3A6B]">
      <div className="absolute inset-0 bg-grid-sm opacity-20" />
      {[
        { x: 12, y: 22, w: 28, h: 18, id: "MSCU 472938", c: "#10B981" },
        { x: 50, y: 30, w: 28, h: 18, id: "TCLU 818201", c: "#67E8F9" },
        { x: 22, y: 60, w: 28, h: 18, id: "MAEU 220447", c: "#10B981" },
      ].map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.2 }}
          className="absolute rounded-sm border-2"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.w}%`,
            height: `${b.h}%`,
            borderColor: b.c,
          }}
        >
          <span className="absolute -top-5 left-0 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-mono text-white">
            {b.id} · 0.{96 - i}
          </span>
        </motion.div>
      ))}
      <div className="absolute bottom-2 right-3 rounded bg-black/60 px-2 py-1 text-[10px] font-mono text-white">
        YOLOv11 · 62 FPS
      </div>
    </div>
  );
}

function CraneVis() {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground">
        <span>Crane 4 — RUL</span>
        <span className="text-[color:var(--color-warning)]">12 days</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "32%" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-full bg-gradient-to-r from-[#6366F1] to-[#DC2626]"
        />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
        {[
          ["Temp", "78°C"],
          ["Vib", "4.2g"],
          ["Load", "82%"],
        ].map(([l, v]) => (
          <div key={l} className="rounded border border-border p-1.5">
            <div className="text-muted-foreground">{l}</div>
            <div className="font-semibold">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   INTELLIGENCE PIPELINE — port-themed infographic
   ============================================================ */
/* ============================================================
   PORTMIND AI OPERATING SYSTEM — premium architecture canvas
   ============================================================ */
function AgentsGraph() {
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
      className="relative overflow-hidden border-b border-white/5 bg-[#0B1A33] py-28"
    >
      {/* atmospheric layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 10%, rgba(255,122,0,0.18), transparent 60%), radial-gradient(50% 50% at 85% 90%, rgba(255,122,0,0.10), transparent 60%), radial-gradient(40% 40% at 50% 50%, rgba(251,191,36,0.05), transparent 70%)",
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
            className="absolute h-1 w-1 rounded-full bg-violet-400/70"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 41) % 100}%`,
              boxShadow: "0 0 12px rgba(255,122,0,0.9)",
              animation: `floatY ${6 + (i % 5)}s ease-in-out ${i * 0.4}s infinite alternate`,
            }}
          />
        ))}
      </div>
      <style>{`@keyframes floatY{from{transform:translateY(0) translateX(0)}to{transform:translateY(-30px) translateX(20px)}}`}</style>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/[0.08] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.24em] text-violet-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            AI Operating System · v3.0
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white md:text-6xl leading-[1.04]">
            PortMind AI{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#67E8F9] to-[#A78BFA] bg-clip-text text-transparent">
              Operating System.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">
            From vessel arrival to customs clearance, PortMind orchestrates a
            fleet of specialized AI agents that ingest, reason, predict, and act
            across every port operation — in real time.
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
              <span className="relative grid h-7 w-7 place-items-center rounded-md border border-violet-400/30 bg-violet-500/10">
                <span className="absolute inset-0 rounded-md border border-violet-400/30 animate-ping" />
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
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

        {/* === ROW A: INGESTION (Stages 1–3) === */}
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

        {/* === ROW B: ORCHESTRATOR (Stage 7 centerpiece) + IMPACT PANEL === */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* ORCHESTRATOR */}
          <div
            className="relative overflow-hidden rounded-3xl border border-violet-400/30 bg-gradient-to-b from-violet-500/[0.06] via-transparent to-transparent p-6 backdrop-blur-xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,122,0,0.18), 0 40px 100px -30px rgba(255,122,0,0.45)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] tracking-[0.22em] text-violet-300/90">
                  07 · CORE
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  PortMind Agent Orchestrator
                </div>
                <div className="text-[12px] text-white/55">
                  Multi-agent reasoning · shared memory · LangGraph runtime
                </div>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 font-mono text-[10px] text-violet-200 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />{" "}
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
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0E0907] to-[#070707] p-6 backdrop-blur-xl"
            style={{ boxShadow: "0 40px 100px -30px rgba(0,0,0,0.8)" }}
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative">
              <div className="font-mono text-[10px] tracking-[0.22em] text-violet-300/90">
                RUNTIME IMPACT
              </div>
              <div className="mt-1 text-lg font-semibold text-white">
                Every shift, measured.
              </div>
              <div className="text-[12px] text-white/55">
                Live across 184 partner ports
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {impact.map((k) => (
                  <div
                    key={k.l}
                    className="group relative overflow-hidden rounded-xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] to-transparent p-3 hover:border-violet-400/45 transition"
                    style={{ boxShadow: "inset 0 0 30px rgba(255,122,0,0.08)" }}
                  >
                    <div className="font-display text-2xl font-semibold tracking-tight text-white">
                      <span className="bg-gradient-to-br from-[#C4B5FD] to-[#8B5CF6] bg-clip-text text-transparent">
                        {k.v}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/70">
                      {k.l}
                    </div>
                    <div className="mt-1 font-mono text-[9px] tracking-wider text-violet-300/70">
                      {k.t}
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-5 inline-flex w-full items-center justify-between rounded-xl border border-violet-400/35 bg-violet-500/10 px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] text-violet-200 hover:bg-violet-500/20 transition">
                DOWNLOAD IMPACT REPORT <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* === ROW C: EXECUTION (Stages 4–6) === */}
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

        {/* === ROW D: EXECUTIVE DASHBOARD (Stage 8) === */}
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
              className="rounded-xl border border-white/10 bg-white/[0.02] p-3 backdrop-blur-xl hover:border-violet-400/40 transition"
            >
              <div className="font-mono text-[10px] tracking-[0.2em] text-violet-300/90">
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

/* ---------- shared layout helpers ---------- */
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
          className="grid h-9 w-9 place-items-center rounded-lg border border-violet-400/40 bg-gradient-to-br from-violet-500/30 to-indigo-700/10 font-mono text-[11px] font-bold text-violet-200"
          style={{ boxShadow: "inset 0 0 20px rgba(255,122,0,0.25)" }}
        >
          {n}
        </span>
        <div>
          <div className="font-mono text-[11px] font-semibold tracking-[0.22em] text-violet-300">
            {title}
          </div>
          <div className="text-[11px] text-white/45">{sub}</div>
        </div>
      </div>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-violet-500/30 via-violet-500/10 to-transparent md:block" />
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
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
          <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
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
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-400/50"
      style={{ boxShadow: "0 20px 60px -25px rgba(0,0,0,0.8)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(255,122,0,0.18), transparent 70%)",
        }}
      />
      <div
        className="relative h-36 w-full overflow-hidden rounded-xl border border-violet-400/20 bg-gradient-to-br from-[#0F2547] to-[#0B1A33]"
        style={{ boxShadow: "inset 0 0 40px rgba(255,122,0,0.18)" }}
      >
        {stage.art}
        <div className="absolute left-2 top-2 rounded-md border border-violet-400/30 bg-[#0B1A33]/80 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.18em] text-violet-200">
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
            <div className="font-display text-[12px] font-semibold text-violet-200">
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
    <div className="rounded-lg border border-violet-400/25 bg-gradient-to-b from-violet-500/[0.08] to-transparent px-3 py-2 text-center">
      <div className="font-display text-base font-semibold text-violet-200">
        {v}
      </div>
      <div className="font-mono text-[9px] tracking-[0.18em] text-white/45">
        {l}
      </div>
    </div>
  );
}

/* ---------- Orchestrator Hub (glowing core + agent constellation) ---------- */
function OrchestratorHub({ agents }: { agents: { n: string; a: number }[] }) {
  const R = 38; // percent radius
  return (
    <div className="relative h-full w-full">
      {/* concentric rings */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="coreG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="1" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
          </radialGradient>
          <filter id="hubGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <linearGradient id="spoke" x1="0" x2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* orbit rings */}
        {[180, 140, 100].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="rgba(255,122,0,0.18)"
            strokeDasharray="2 4"
          />
        ))}
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="rgba(255,122,0,0.08)"
        />
        {/* rotating ring */}
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
            stroke="rgba(255,122,0,0.3)"
            strokeDasharray="4 12"
          />
        </g>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

        {/* spokes to agents */}
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
              <circle r="3" fill="#A78BFA">
                <animateMotion
                  dur={`${3 + i * 0.4}s`}
                  repeatCount="indefinite"
                  path={`M 200 200 L ${x} ${y}`}
                />
              </circle>
              <circle r="3" fill="#8B5CF6">
                <animateMotion
                  dur={`${3.4 + i * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M ${x} ${y} L 200 200`}
                />
              </circle>
            </g>
          );
        })}

        {/* core halo */}
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
          stroke="rgba(255,122,0,0.6)"
          strokeWidth="1.5"
        />
        <circle
          cx="200"
          cy="200"
          r="46"
          fill="none"
          stroke="#A78BFA"
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
          fill="#A78BFA"
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

      {/* HTML agent nodes overlay */}
      {agents.map((ag, i) => {
        const rad = (ag.a * Math.PI) / 180;
        const left = 50 + R * Math.cos(rad);
        const top = 50 + R * Math.sin(rad);
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-violet-400/40 bg-[#0F2547]/95 px-2.5 py-1.5 font-mono text-[10px] text-violet-100 backdrop-blur transition hover:scale-105"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              boxShadow:
                "0 10px 30px -10px rgba(255,122,0,0.6), inset 0 0 12px rgba(255,122,0,0.18)",
            }}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
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

/* ---------- Executive Dashboard (Stage 8) ---------- */
function ExecutiveDashboard() {
  const bars = [62, 78, 45, 92, 68, 84, 55, 71, 88, 96, 73, 81];
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.005] p-5 backdrop-blur-xl md:p-6"
      style={{ boxShadow: "0 40px 100px -30px rgba(255,122,0,0.25)" }}
    >
      {/* window chrome */}
      <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-[10px] text-white/40">
            portmind / command / executive.dashboard
          </span>
        </div>
        <div className="font-mono text-[10px] text-violet-300/80">
          streaming · last 24h
        </div>
      </div>

      {/* KPI row */}
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
              <span className="font-mono text-[9px] text-violet-300">
                {k.t}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* charts row */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr]">
        {/* throughput line + area */}
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
            <span className="rounded-md border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] text-violet-200">
              +12.4%
            </span>
          </div>
          <svg viewBox="0 0 600 180" className="mt-3 h-44 w-full">
            <defs>
              <linearGradient id="thG" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
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
              stroke="#8B5CF6"
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
                  fill="#A78BFA"
                />
              ),
            )}
          </svg>
        </div>

        {/* port utilization bars */}
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
                className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-700 via-violet-500 to-cyan-300"
                style={{
                  height: `${b}%`,
                  boxShadow: "0 -2px 12px rgba(255,122,0,0.45)",
                }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[8.5px] text-white/40">
            <span>B-01</span>
            <span>B-12</span>
          </div>
        </div>

        {/* risk heatmap */}
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
                  ? "#8B5CF6"
                  : v > 0.5
                    ? "#67E8F9"
                    : v > 0.25
                      ? "#1E1B4B"
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
              <span className="flex-1 bg-[#1E1B4B]" />
              <span className="flex-1 bg-[#67E8F9]" />
              <span className="flex-1 bg-[#8B5CF6]" />
            </div>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* live events ticker */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0F2547]">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/50">
            LIVE EVENT STREAM
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />{" "}
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
                className={`h-1.5 w-1.5 rounded-full ${s === "warn" ? "bg-violet-400" : "bg-emerald-400"}`}
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

/* ---------- Stage hero art (cinematic SVG illustrations) ---------- */
function IngestArt() {
  return (
    <svg viewBox="0 0 320 144" className="h-full w-full">
      <defs>
        <linearGradient id="seaG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0F2547" />
          <stop offset="100%" stopColor="#1A0F08" />
        </linearGradient>
        <linearGradient id="shipG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>
      </defs>
      <rect width="320" height="144" fill="url(#seaG)" />
      {/* sky lines */}
      {[20, 40, 60].map((y, i) => (
        <line
          key={i}
          x1="0"
          y1={y}
          x2="320"
          y2={y}
          stroke="rgba(255,122,0,0.08)"
          strokeDasharray="2 6"
        />
      ))}
      {/* satellite */}
      <g transform="translate(40,18)">
        <rect width="14" height="6" fill="#A78BFA" />
        <rect x="-10" y="1" width="8" height="4" fill="#8B5CF6" />
        <rect x="16" y="1" width="8" height="4" fill="#8B5CF6" />
        <path
          d="M7 8 L7 30"
          stroke="#A78BFA"
          strokeWidth="0.5"
          strokeDasharray="1 2"
        />
      </g>
      {/* signal arcs from satellite */}
      <path
        d="M47 30 Q120 60 220 110"
        stroke="rgba(255,122,0,0.5)"
        fill="none"
        strokeDasharray="2 4"
      />
      {/* ship */}
      <g transform="translate(160,72)">
        <path
          d="M0 40 L150 40 L138 60 L12 60 Z"
          fill="#0F172A"
          stroke="#8B5CF6"
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
        <rect x="100" y="8" width="26" height="14" fill="#8B5CF6" />
        <rect x="112" y="-4" width="4" height="12" fill="#A78BFA" />
        {/* wake */}
        <path
          d="M-20 56 Q40 50 80 56 T160 56"
          stroke="rgba(255,122,0,0.4)"
          fill="none"
        />
      </g>
      {/* IoT/CCTV chips */}
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
            stroke="#8B5CF6"
            strokeWidth="0.5"
          />
          <text
            x="6"
            y="8.5"
            fontSize="6.5"
            fill="#A78BFA"
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
      {/* docs flowing in */}
      {[10, 30, 50, 70, 90].map((y, i) => (
        <g key={i} transform={`translate(${10 + i * 6},${y})`}>
          <rect
            width="32"
            height="22"
            rx="2"
            fill="#14305C"
            stroke="#8B5CF6"
            strokeWidth="0.5"
          />
          {[5, 10, 15].map((ly) => (
            <line
              key={ly}
              x1="4"
              x2="28"
              y1={ly + 1}
              y2={ly + 1}
              stroke="#A78BFA"
              strokeOpacity="0.6"
              strokeWidth="0.4"
            />
          ))}
        </g>
      ))}
      {/* flow lines */}
      <path
        d="M60 60 C 110 60, 130 72, 160 72"
        stroke="#8B5CF6"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M60 80 C 110 80, 130 78, 160 75"
        stroke="#A78BFA"
        strokeWidth="0.8"
        fill="none"
      />
      {/* brain */}
      <g transform="translate(150,40)">
        <ellipse
          cx="40"
          cy="35"
          rx="44"
          ry="34"
          fill="url(#brainG)"
          stroke="#8B5CF6"
          strokeWidth="0.8"
        />
        <defs>
          <radialGradient id="brainG">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* neural lines */}
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
            stroke="#A78BFA"
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
          <circle key={i} cx={cx} cy={cy} r="1.8" fill="#8B5CF6" />
        ))}
      </g>
      {/* JSON output */}
      <g transform="translate(250,38)">
        <rect
          width="60"
          height="68"
          rx="3"
          fill="#0B1A33"
          stroke="#8B5CF6"
          strokeWidth="0.6"
        />
        <text x="6" y="13" fontSize="7" fontFamily="monospace" fill="#A78BFA">
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
        <text x="6" y="64" fontSize="7" fontFamily="monospace" fill="#A78BFA">
          {"}"}
        </text>
      </g>
      {/* token dust */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          cx={90 + i * 10}
          cy={70 + (i % 3) * 8}
          r="0.9"
          fill="#A78BFA"
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
      {/* container stacks */}
      {[
        [10, 90, "#1E1B4B", 23],
        [44, 90, "#8B5CF6", 67],
        [78, 90, "#67E8F9", 89],
        [112, 90, "#1E1B4B", 31],
        [146, 90, "#8B5CF6", 76],
        [180, 90, "#67E8F9", 12],
        [214, 90, "#1E1B4B", 54],
        [248, 90, "#8B5CF6", 92],
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
              x1={x + dx}
              x2={x + dx}
              y1={y - 28}
              y2={y - 16}
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="0.3"
            />
          ))}
          {/* risk badge */}
          {score > 60 && (
            <g>
              <rect
                x={x - 2}
                y={y - 44}
                width="34"
                height="11"
                rx="2"
                fill="#8B5CF6"
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
      {/* scan laser */}
      <line
        x1="0"
        y1="58"
        x2="320"
        y2="58"
        stroke="#8B5CF6"
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
      <rect x="0" y="0" width="320" height="2" fill="#A78BFA">
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
        stroke="rgba(255,122,0,0.4)"
        strokeDasharray="2 4"
      />
    </svg>
  );
}

function CustomsArt() {
  return (
    <svg viewBox="0 0 320 144" className="h-full w-full">
      <rect width="320" height="144" fill="#0F2547" />
      {/* officer silhouette */}
      <g transform="translate(30,30)">
        <circle cx="22" cy="16" r="11" fill="#A78BFA" />
        <rect x="10" y="28" width="24" height="32" rx="3" fill="#8B5CF6" />
        <rect x="14" y="34" width="16" height="8" fill="#0F2547" />
        {/* badge */}
        <rect
          x="15"
          y="44"
          width="14"
          height="6"
          rx="1"
          fill="#0F2547"
          stroke="#A78BFA"
          strokeWidth="0.4"
        />
      </g>
      {/* decision engine */}
      <g transform="translate(110,28)">
        <rect
          width="120"
          height="78"
          rx="6"
          fill="#0B1A33"
          stroke="#8B5CF6"
          strokeWidth="0.6"
        />
        <text x="8" y="14" fontSize="8" fontFamily="monospace" fill="#A78BFA">
          RULE ENGINE
        </text>
        {[
          ["HS 8517.62", "#22c55e", "PASS"],
          ["DUTIES 12%", "#22c55e", "PASS"],
          ["DG CHECK", "#8B5CF6", "REVIEW"],
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
      {/* decision output */}
      <g transform="translate(244,52)">
        <circle
          cx="22"
          cy="22"
          r="22"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="0.6"
          strokeDasharray="3 3"
        />
        <circle cx="22" cy="22" r="14" fill="#8B5CF6" />
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
      {/* flow */}
      <path
        d="M60 70 L110 70"
        stroke="#8B5CF6"
        strokeWidth="1"
        fill="none"
        markerEnd="url(#arr)"
      />
      <path d="M230 70 L246 74" stroke="#8B5CF6" strokeWidth="1" fill="none" />
      <defs>
        <marker
          id="arr"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#8B5CF6" />
        </marker>
      </defs>
    </svg>
  );
}

function OpsArt() {
  return (
    <svg viewBox="0 0 320 144" className="h-full w-full">
      <rect width="320" height="144" fill="#0F2547" />
      {/* crane */}
      <g transform="translate(20,12)">
        <line
          x1="40"
          y1="120"
          x2="40"
          y2="20"
          stroke="#8B5CF6"
          strokeWidth="2.5"
        />
        <line
          x1="40"
          y1="20"
          x2="160"
          y2="20"
          stroke="#A78BFA"
          strokeWidth="2.5"
        />
        <line
          x1="40"
          y1="20"
          x2="140"
          y2="120"
          stroke="rgba(255,122,0,0.4)"
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
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
        </defs>
        <rect x="20" y="118" width="140" height="6" fill="#1E1B4B" />
      </g>
      {/* truck routes */}
      <g transform="translate(180,40)">
        {/* route grid */}
        {[0, 25, 50, 75].map((y) => (
          <line
            key={y}
            x1="0"
            x2="130"
            y1={y}
            y2={y}
            stroke="rgba(255,122,0,0.15)"
          />
        ))}
        {/* truck */}
        <g>
          <rect x="0" y="20" width="18" height="10" fill="#A78BFA" />
          <rect x="-6" y="22" width="6" height="8" fill="#8B5CF6" />
          <circle cx="2" cy="32" r="1.8" fill="#0F2547" />
          <circle cx="14" cy="32" r="1.8" fill="#0F2547" />
        </g>
        {/* optimization path */}
        <path
          d="M20 25 C 50 25, 60 60, 110 60"
          stroke="#8B5CF6"
          strokeWidth="1.4"
          fill="none"
          strokeDasharray="4 2"
        />
        <circle r="2.5" fill="#A78BFA">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M20 25 C 50 25, 60 60, 110 60"
          />
        </circle>
        {/* yard slot */}
        <rect
          x="100"
          y="55"
          width="22"
          height="14"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
      </g>
      {/* kpi chips */}
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
            stroke="#8B5CF6"
            strokeWidth="0.5"
          />
          <text
            x="21"
            y="10"
            fontSize="8"
            fontFamily="monospace"
            fill="#A78BFA"
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
      {/* world arc */}
      <ellipse
        cx="160"
        cy="180"
        rx="180"
        ry="80"
        fill="none"
        stroke="rgba(255,122,0,0.25)"
      />
      <ellipse
        cx="160"
        cy="180"
        rx="140"
        ry="60"
        fill="none"
        stroke="rgba(255,122,0,0.15)"
      />
      {/* dot continents */}
      <g fill="rgba(255,122,0,0.55)">
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
      {/* route */}
      <path
        d="M40 62 Q 160 10 260 62"
        stroke="#8B5CF6"
        strokeWidth="1.4"
        fill="none"
        strokeDasharray="3 3"
      />
      <circle r="3" fill="#A78BFA">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M40 62 Q 160 10 260 62"
        />
      </circle>
      {/* eta card */}
      <g transform="translate(94,98)">
        <rect
          width="132"
          height="36"
          rx="4"
          fill="#0B1A33"
          stroke="#8B5CF6"
          strokeWidth="0.6"
        />
        <text x="8" y="14" fontSize="7" fontFamily="monospace" fill="#A78BFA">
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
          <rect width="38" height="12" rx="2" fill="#8B5CF6" />
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
    <section id="demo" className="border-b border-border py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>The product</SectionLabel>
        <SectionHeading>Built for operators, not analysts.</SectionHeading>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {screens.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-md"
            >
              <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                <span className="h-2 w-2 rounded-full bg-[#28C840]" />
                <div className="ml-2 text-[10px] font-mono text-muted-foreground">
                  portmind.ai
                </div>
              </div>
              <div className="relative aspect-[4/3] bg-gradient-to-br from-background to-card p-4">
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: s.color }}
                />
                <div className="font-display text-sm font-semibold">
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
      <div className="h-2 w-1/2 rounded bg-muted" />
      <div className="h-16 rounded border border-border bg-background/60" />
      <div className="grid grid-cols-3 gap-2">
        <div className="h-10 rounded border border-border bg-background/60" />
        <div className="h-10 rounded border border-border bg-background/60" />
        <div className="h-10 rounded border border-border bg-background/60" />
      </div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-ink)] py-24 text-white">
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="absolute -bottom-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.35),transparent)]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Ready to transform port operations?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          Deploy PortMind AI in your control room in under 30 days. SOC 2, IEC
          62443 and IMO compliant.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/app"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-[color:var(--color-ink)] hover:bg-white/90"
          >
            Launch Platform <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="inline-flex h-11 items-center gap-2 rounded-md border border-white/20 px-5 text-sm font-semibold hover:bg-white/10">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const cols: {
    title: string;
    links: { label: string; href: string; badge?: string }[];
  }[] = [
    {
      title: "Platform",
      links: [
        { label: "Command Center", href: "/app" },
        { label: "Container Intelligence", href: "/app/containers" },
        { label: "Crane Intelligence", href: "/app/cranes" },
        { label: "Vessel Intelligence", href: "/app/vessels" },
        { label: "Safety Center", href: "/app/safety" },
        { label: "AI Copilot", href: "/app/copilot", badge: "New" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "For Terminal Operators", href: "#" },
        { label: "For Port Authorities", href: "#" },
        { label: "For Logistics Partners", href: "#" },
        { label: "For HSE Teams", href: "#" },
        { label: "Sustainability & ESG", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "Whitepapers", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#", badge: "Hiring" },
        { label: "Newsroom", href: "#" },
        { label: "Partners", href: "#" },
        { label: "Contact Sales", href: "#" },
      ],
    },
  ];

  const socials = [
    {
      label: "LinkedIn",
      path: "M4.98 3.5a2.5 2.5 0 11.02 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.97-1.8-2.97-1.8 0-2.08 1.4-2.08 2.87V21h-4V9z",
    },
    {
      label: "X",
      path: "M18.244 2H21l-6.52 7.45L22 22h-6.4l-4.65-6.05L5.5 22H2.74l6.97-7.97L2 2h6.55l4.2 5.55L18.244 2zm-2.24 18h1.78L8.04 4H6.18l9.823 16z",
    },
    {
      label: "GitHub",
      path: "M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z",
    },
    {
      label: "YouTube",
      path: "M23.5 6.5a3 3 0 00-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 00.5 6.5 31 31 0 000 12a31 31 0 00.5 5.5 3 3 0 002.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.5zM9.75 15.5v-7l6.5 3.5-6.5 3.5z",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0A1428] text-white/80">
      {/* glow + grid backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.30),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[260px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.25),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10">
        {/* Newsletter strip */}
        <div className="grid gap-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-10 backdrop-blur-xl">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
              The Berth Report
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
              Operational intelligence for modern ports — in your inbox monthly.
            </h3>
            <p className="mt-3 max-w-xl text-sm text-white/60">
              Field notes from terminal deployments, multi-agent research, AIS
              analytics, and predictive maintenance benchmarks. No fluff.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-stretch gap-3 self-center sm:flex-row"
          >
            <label className="relative flex-1">
              <span className="sr-only">Work email</span>
              <input
                type="email"
                required
                placeholder="you@portoperator.com"
                className="h-12 w-full rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 focus:bg-white/[0.06]"
              />
            </label>
            <button
              type="submit"
              className="group relative inline-flex h-12 items-center justify-center gap-1.5 overflow-hidden rounded-full px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.8)] transition-transform hover:-translate-y-px"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #1B3A6B 0%, #2563EB 55%, #0D9488 110%)",
              }}
            >
              <span className="relative z-10">Subscribe</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>
        </div>

        {/* Main grid */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_2.7fr]">
          {/* Brand block */}
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              PortMind AI is the unified operating system for smart ports —
              combining computer vision, predictive maintenance, multi-agent
              reasoning, and vessel intelligence in one command center.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                SOC 2 Type II
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                ISO 27001
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                GDPR
              </span>
            </div>

            <div className="mt-6 space-y-1.5 text-xs text-white/55">
              <div>HQ · Rotterdam · Singapore · Dubai</div>
              <a
                href="mailto:hello@portmind.ai"
                className="block hover:text-white"
              >
                hello@portmind.ai
              </a>
              <div>+31 (0)10 800 4221</div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  {c.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                      >
                        <span>{l.label}</span>
                        {l.badge && (
                          <span className="rounded-full bg-[color:var(--color-accent)]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[color:var(--color-accent)]">
                            {l.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/50">
            <span>© {year} PortMind AI B.V. · All rights reserved.</span>
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Security
            </a>
            <a href="#" className="hover:text-white">
              DPA
            </a>
            <a href="#" className="hover:text-white">
              Cookies
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-70 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              All systems operational
            </span>
            <div className="flex items-center gap-1.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div
          aria-hidden
          className="pointer-events-none mt-12 select-none bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-center font-display text-[18vw] font-bold leading-none tracking-tighter text-transparent sm:text-[14vw]"
        >
          PortMind AI
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-secondary)] ${className}`}
    >
      {children}
    </div>
  );
}
function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}
