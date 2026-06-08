import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
} from "lucide-react";

export const Route = createFileRoute("/app/")({
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
        <div className="grid grid-cols-12 gap-4">
          <RiskScore />
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Kpi
              icon={Ship}
              label="Active Vessels"
              value={217}
              accent="#2563EB"
              trend="+12"
            />
            <Kpi
              icon={Container}
              label="Containers Today"
              value={12408}
              accent="#0D9488"
              trend="+4.2%"
            />
            <Kpi
              icon={ShieldAlert}
              label="Safety Alerts"
              value={3}
              accent="#DC2626"
              trend="-2"
              warn
            />
            <Kpi
              icon={Wrench}
              label="Crane Health"
              value={94}
              suffix="%"
              accent="#15803D"
              trend="-1.4%"
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
                  className={`rounded-lg border p-3 ${c.c === "C-4" ? "border-[color:var(--color-warning)]/40 bg-[color:var(--color-warning)]/5" : "border-border"}`}
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
        </div>
      </div>
    </>
  );
}

export function Panel({
  title,
  subtitle,
  children,
  className = "",
  right,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  right?: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative rounded-xl border border-border bg-card/90 p-5 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_8px_24px_-12px_rgba(15,23,42,0.18)] transition hover:shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_16px_40px_-16px_rgba(79,70,229,0.25)] hover:border-[color:var(--color-secondary)]/30 ${className}`}
    >
      {/* subtle gradient sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-secondary)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <header className="mb-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-sm font-semibold tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {right}
      </header>
      {children}
    </motion.section>
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
}: {
  icon: any;
  label: string;
  value: number;
  accent: string;
  trend: string;
  warn?: boolean;
  suffix?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-1 rounded-xl border border-border bg-card p-4"
    >
      <div className="flex items-center justify-between">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-md"
          style={{ background: `${accent}15`, color: accent }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span
          className={`text-[10px] font-mono ${warn ? "text-[color:var(--color-warning)]" : "text-[color:var(--color-success)]"}`}
        >
          {trend}
        </span>
      </div>
      <div className="mt-3 font-display text-2xl font-semibold">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}

function RiskScore() {
  const score = 82;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-12 lg:col-span-4 rounded-xl border border-border bg-gradient-to-br from-card to-[color:var(--color-muted)]/60 p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-sm font-semibold">
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

export function ChartTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-card/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
      {label && (
        <div className="mb-1 font-mono text-muted-foreground">{label}</div>
      )}
      {payload.map((p: any) => (
        <div key={p.dataKey ?? p.name} className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: p.color || p.payload?.color }}
          />
          <span className="capitalize">{p.name}</span>
          <span className="ml-auto font-mono font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
}
