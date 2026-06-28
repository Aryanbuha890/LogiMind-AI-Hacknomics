import { createLazyFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Container,
  Ship,
  ShieldAlert,
  Wrench,
  AlertOctagon,
  Users,
  Compass,
  Zap,
} from "lucide-react";
import { Panel, ChartTip } from "./index";
import { ReportGenerator } from "@/components/ReportGenerator";

export const Route = createLazyFileRoute("/app/")({
  component: CommandCenter,
});

const throughput = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, "0")}:00`,
  in: Math.round(280 + Math.sin(i / 3) * 120 + Math.random() * 50),
  out: Math.round(260 + Math.cos(i / 4) * 110 + Math.random() * 50),
}));

const safetyTrend = Array.from({ length: 14 }, (_, i) => ({
  d: `D-${14 - i}`,
  incidents: Math.max(0, Math.round(8 - i * 0.3 + Math.random() * 3)),
}));

const riskDist = [
  { name: "Low", value: 64, color: "#15803D" },
  { name: "Medium", value: 26, color: "#D97706" },
  { name: "High", value: 8, color: "#DC2626" },
  { name: "Critical", value: 2, color: "#7F1D1D" },
];

const craneHealth = [
  { c: "C-1", h: 96 },
  { c: "C-2", h: 92 },
  { c: "C-3", h: 88 },
  { c: "C-4", h: 61 },
  { c: "C-5", h: 94 },
];

const weatherData = Array.from({ length: 12 }, (_, i) => ({
  t: `${i * 2}:00`,
  wind: 12 + Math.sin(i / 2) * 6,
  vis: 8 + Math.cos(i / 3) * 2,
}));

const initialEvents = [
  {
    t: "14:32",
    msg: "No helmet detected · Yard B",
    sev: "warn",
    icon: ShieldAlert,
  },
  {
    t: "14:28",
    msg: "Crane 4 vibration spike (4.2g)",
    sev: "danger",
    icon: Wrench,
  },
  {
    t: "14:15",
    msg: "Vessel MV-228 arrived at Berth 7",
    sev: "ok",
    icon: Ship,
  },
  {
    t: "14:10",
    msg: "Container TCLU 818201 damage detected",
    sev: "warn",
    icon: Container,
  },
  {
    t: "14:02",
    msg: "Weather: wind gust 28 kn at Pier 3",
    sev: "warn",
    icon: Activity,
  },
  {
    t: "13:55",
    msg: "Auto-dispatched safety officer to Yard B",
    sev: "ok",
    icon: CheckCircle2,
  },
];

function CommandCenter() {
  const [events, setEvents] = useState(initialEvents);
  useEffect(() => {
    const id = setInterval(() => {
      setEvents((prev) =>
        [
          {
            t: new Date().toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            msg: [
              "Container detected · Gate 4",
              "Crane 2 cycle complete",
              "AIS update: ETA -8m",
              "PPE compliant zone clear",
            ][Math.floor(Math.random() * 4)],
            sev: "ok",
            icon: Activity,
          },
          ...prev,
        ].slice(0, 10),
      );
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <AppTopBar
        title="Command Center"
        subtitle="Port of Mundra · Real-time operational overview"
      />
      <div className="p-6 space-y-6">
        <div className="flex justify-end">
          <ReportGenerator 
            throughput={throughput}
            safetyTrend={safetyTrend}
            riskDist={riskDist}
            craneHealth={craneHealth}
            weatherData={weatherData}
            events={events}
          />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <RiskScore />
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Kpi
              icon={Ship}
              label="Active Vessels"
              value={217}
              accent="#2563EB"
              trend="+12"
              sparklinePath="M 0 20 Q 25 5, 50 18 T 100 8"
              subtext="14 inbound · 8 at berth"
            />
            <Kpi
              icon={Container}
              label="Containers Today"
              value={12408}
              accent="#0D9488"
              trend="+4.2%"
              sparklinePath="M 0 25 Q 25 12, 50 18 T 100 5"
              subtext="7,842 discharging"
            />
            <Kpi
              icon={ShieldAlert}
              label="Safety Alerts"
              value={3}
              accent="#DC2626"
              trend="-2"
              warn
              sparklinePath="M 0 10 Q 25 25, 50 12 T 100 20"
              subtext="1 critical · 2 warnings"
            />
            <Kpi
              icon={Wrench}
              label="Crane Health"
              value={94}
              suffix="%"
              accent="#15803D"
              trend="-1.4%"
              sparklinePath="M 0 12 Q 25 15, 50 8 T 100 12"
              subtext="4/5 cranes fully active"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <Panel
            title="Container Throughput"
            subtitle="Last 24h · TEU in/out"
            className="col-span-12 xl:col-span-8"
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={throughput}>
                <defs>
                  <linearGradient id="ai" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ao" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0D9488" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#0D9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTip />} />
                <Area
                  type="monotone"
                  dataKey="in"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fill="url(#ai)"
                />
                <Area
                  type="monotone"
                  dataKey="out"
                  stroke="#0D9488"
                  strokeWidth={2}
                  fill="url(#ao)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>
          <Panel
            title="Risk Distribution"
            subtitle="By active operation"
            className="col-span-12 md:col-span-6 xl:col-span-4"
          >
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={riskDist}
                  dataKey="value"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={3}
                  stroke="none"
                >
                  {riskDist.map((r) => (
                    <Cell key={r.name} fill={r.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              {riskDist.map((r) => (
                <div key={r.name} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: r.color }}
                  />
                  {r.name} <span className="ml-auto font-mono">{r.value}%</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Safety Trends"
            subtitle="Incidents · Last 14 days"
            className="col-span-12 md:col-span-6 xl:col-span-4"
          >
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={safetyTrend}>
                <CartesianGrid
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="d"
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="incidents" radius={[4, 4, 0, 0]} fill="#DC2626" />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel
            title="Weather Intelligence"
            subtitle="Wind speed · Visibility"
            className="col-span-12 md:col-span-6 xl:col-span-4"
          >
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weatherData}>
                <CartesianGrid
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="t"
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTip />} />
                <Line
                  type="monotone"
                  dataKey="wind"
                  stroke="#D97706"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="vis"
                  stroke="#0D9488"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Panel>

          <Panel
            title="Crane Health"
            subtitle="Live fleet health score"
            className="col-span-12 xl:col-span-4"
          >
            <div className="space-y-3">
              {craneHealth.map((c) => (
                <div
                  key={c.c}
                  className={`rounded-lg border p-3 ${c.c === "C-4" ? "border-[color:var(--color-warning)]/40 bg-[color:var(--color-warning)]/5" : "border-primary/45"}`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono font-semibold">{c.c}</span>
                    <span
                      className={
                        c.h < 70
                          ? "text-[color:var(--color-warning)] font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      {c.h}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.h}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          c.h < 70
                            ? "linear-gradient(90deg,#D97706,#DC2626)"
                            : "linear-gradient(90deg,#15803D,#0D9488)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Live Events"
            subtitle="Streaming · Auto-updating"
            className="col-span-12 xl:col-span-8"
          >
            <ul className="divide-y divide-border">
              {events.map((e, i) => {
                const Icon = e.icon;
                const color =
                  e.sev === "danger"
                    ? "#DC2626"
                    : e.sev === "warn"
                      ? "#D97706"
                      : "#15803D";
                return (
                  <motion.li
                    key={`${e.t}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 py-2.5"
                  >
                    <span className="font-mono text-xs text-muted-foreground w-12">
                      {e.t}
                    </span>
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md"
                      style={{ background: `${color}15`, color }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm">{e.msg}</span>
                    <span className="ml-auto text-[10px] font-mono text-muted-foreground uppercase">
                      {e.sev}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </Panel>

          {/* Quick Actions Panel next to Live Events to balance bottom space */}
          <Panel
            title="Operational Control Panel"
            subtitle="System manual override dispatch triggers"
            className="col-span-12 xl:col-span-4"
          >
            <div className="space-y-3">
              <button 
                onClick={() => alert("SYSTEM: Broadasting marine safety warnings regarding current wind metrics.")}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-yellow-200/50 bg-yellow-50/20 hover:bg-yellow-50/40 dark:border-yellow-500/20 dark:bg-yellow-500/[0.04] dark:hover:bg-yellow-500/[0.08] text-yellow-700 dark:text-yellow-400 transition cursor-pointer text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <AlertOctagon className="h-3.5 w-3.5" />
                  <span>Broadcast Storm Alert</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-yellow-500 animate-ping" />
              </button>

              <button 
                onClick={() => alert("SYSTEM: Safety officer auto-dispatched to Yard Zone B.")}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-blue-200/50 bg-blue-50/20 hover:bg-blue-50/40 dark:border-blue-500/20 dark:bg-blue-500/[0.04] dark:hover:bg-blue-500/[0.08] text-blue-700 dark:text-blue-400 transition cursor-pointer text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" />
                  <span>Dispatch Safety Officer</span>
                </div>
                <span className="text-[10px] font-mono text-blue-500/70 dark:text-blue-400/70">Yard B</span>
              </button>

              <button 
                onClick={() => alert("SYSTEM: Emergency crane shutdown. Quay locking mechanisms activated.")}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-red-200/50 bg-red-50/20 hover:bg-red-50/40 dark:border-red-500/20 dark:bg-red-500/[0.04] dark:hover:bg-red-500/[0.08] text-red-700 dark:text-red-400 transition cursor-pointer text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Wrench className="h-3.5 w-3.5" />
                  <span>Initialize Gantry Crane Lock</span>
                </div>
                <span className="text-[9px] uppercase font-mono px-1 rounded bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400">Lockout</span>
              </button>

              <button 
                onClick={() => alert("SYSTEM: Initiating SimPy rail freight scheduling optimizer.")}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-emerald-200/50 bg-emerald-50/20 hover:bg-emerald-50/40 dark:border-emerald-500/20 dark:bg-emerald-500/[0.04] dark:hover:bg-emerald-500/[0.08] text-emerald-700 dark:text-emerald-400 transition cursor-pointer text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Optimize Rail Dispatch</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">AI Optimize</span>
              </button>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  accent,
  trend,
  warn,
  suffix,
  sparklinePath,
  subtext,
}: {
  icon: any;
  label: string;
  value: number;
  accent: string;
  trend: string;
  warn?: boolean;
  suffix?: string;
  sparklinePath: string;
  subtext: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-1 rounded-xl border border-primary/45 bg-card p-4 flex flex-col justify-between h-44 shadow-sm"
    >
      <div>
        <div className="flex items-center justify-between">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-md"
            style={{ background: `${accent}15`, color: accent }}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span
            className={`text-[10px] font-mono ${warn ? "text-[color:var(--color-warning)] animate-pulse" : "text-[color:var(--color-success)]"}`}
          >
            {trend}
          </span>
        </div>
        <div className="mt-2.5 font-display text-2xl font-semibold">
          <AnimatedCounter value={value} suffix={suffix} />
        </div>
        <div className="text-[11px] text-muted-foreground font-medium">{label}</div>
      </div>

      {/* Subtext and mini sparkline trend graph to utilize empty space */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-200 flex items-center justify-between gap-1">
        <span className="text-[9px] text-muted-foreground/75 truncate w-[60%]">
          {subtext}
        </span>
        <div className="w-14 h-5 opacity-70 shrink-0">
          <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
            <path
              d={sparklinePath}
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function RiskScore() {
  const score = 82;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-12 lg:col-span-4 rounded-xl border border-primary/45 bg-gradient-to-br from-card to-[color:var(--color-muted)]/60 p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-sm font-semibold tracking-tight">
            Global Port Risk Score
          </h3>
          <p className="text-xs text-muted-foreground">
            Composite of 47 live signals
          </p>
        </div>
        <span className="rounded-full bg-[color:var(--color-success)]/10 px-2 py-0.5 text-[10px] font-semibold text-[color:var(--color-success)]">
          Healthy
        </span>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="var(--color-muted)"
              strokeWidth="3"
            />
            <motion.circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="url(#rg)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="97"
              initial={{ strokeDashoffset: 97 }}
              animate={{ strokeDashoffset: 97 - (97 * score) / 100 }}
              transition={{ duration: 1.6 }}
            />
            <defs>
              <linearGradient id="rg">
                <stop offset="0%" stopColor="#15803D" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="font-display text-3xl font-semibold">
                <AnimatedCounter value={score} />
              </div>
              <div className="text-[10px] uppercase text-muted-foreground">
                of 100
              </div>
            </div>
          </div>
        </div>
        <ul className="flex-1 space-y-1.5 text-xs">
          {[
            ["Safety compliance", 99, "ok"],
            ["Equipment health", 76, "warn"],
            ["Vessel flow", 88, "ok"],
            ["Weather risk", 64, "warn"],
            ["Cyber posture", 95, "ok"],
          ].map(([l, v, s]) => (
            <li key={l as string} className="flex items-center gap-2">
              <span className="flex-1 truncate text-muted-foreground">{l}</span>
              <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${v}%`,
                    background: s === "warn" ? "#D97706" : "#15803D",
                  }}
                />
              </div>
              <span className="font-mono tabular-nums">{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
