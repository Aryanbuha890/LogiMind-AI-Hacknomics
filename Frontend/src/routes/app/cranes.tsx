import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel, ChartTip } from "./index";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Calendar,
  DollarSign,
  Brain,
  Thermometer,
  Vibrate,
  Gauge,
  Weight,
} from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export const Route = createFileRoute("/app/cranes")({
  component: CranesPage,
});

const fleet = [
  { id: "C-1", status: "Optimal", health: 96, rul: 412 },
  { id: "C-2", status: "Good", health: 92, rul: 380 },
  { id: "C-3", status: "Good", health: 88, rul: 305 },
  { id: "C-4", status: "At Risk", health: 61, rul: 12 },
  { id: "C-5", status: "Optimal", health: 94, rul: 388 },
];

const statusColor: Record<string, string> = {
  Optimal: "#15803D",
  Good: "#2563EB",
  Monitor: "#D97706",
  "At Risk": "#DC2626",
};

const vibration = Array.from({ length: 30 }, (_, i) => ({
  t: i,
  v: 1.8 + Math.sin(i / 3) * 0.7 + (i > 22 ? (i - 22) * 0.4 : 0),
}));

const sensors = [
  {
    l: "Temperature",
    v: 78,
    unit: "°C",
    max: 95,
    icon: Thermometer,
    c: "#D97706",
  },
  { l: "Vibration", v: 4.2, unit: "g", max: 5, icon: Vibrate, c: "#DC2626" },
  { l: "Load", v: 82, unit: "%", max: 100, icon: Weight, c: "#2563EB" },
  { l: "Pressure", v: 187, unit: "bar", max: 250, icon: Gauge, c: "#0D9488" },
];

function CranesPage() {
  const [sel, setSel] = useState("C-4");
  const crane = fleet.find((c) => c.id === sel)!;
  return (
    <>
      <AppTopBar
        title="Crane Intelligence"
        subtitle="Predictive maintenance · XGBoost · Remaining useful life"
      />
      <div className="p-6 space-y-6">
        {/* Fleet Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {fleet.map((c) => {
            const active = c.id === sel;
            const risk = c.status === "At Risk";
            return (
              <motion.button
                key={c.id}
                onClick={() => setSel(c.id)}
                whileHover={{ y: -2 }}
                className={`text-left rounded-xl border bg-card p-4 transition relative ${
                  active
                    ? "border-[color:var(--color-secondary)] ring-2 ring-[color:var(--color-secondary)]/20"
                    : "border-border"
                } ${risk ? "shadow-[0_0_0_1px_rgba(220,38,38,0.25)]" : ""}`}
              >
                {risk && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-[color:var(--color-destructive)] px-2 py-0.5 text-[10px] font-bold text-white">
                    AT RISK
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold">
                    {c.id}
                  </span>
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-3 font-display text-2xl font-semibold">
                  {c.health}
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: statusColor[c.status] }}
                  />
                  <span
                    style={{ color: statusColor[c.status] }}
                    className="font-semibold"
                  >
                    {c.status}
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-muted-foreground">
                  RUL: <span className="font-mono">{c.rul}d</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="grid grid-cols-12 gap-4">
          <Panel
            title={`${crane.id} · Health Detail`}
            subtitle="Live telemetry · Updated 3s ago"
            className="col-span-12 xl:col-span-8"
          >
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Metric
                label="Health Score"
                value={crane.health}
                suffix="%"
                color={crane.health < 70 ? "#DC2626" : "#15803D"}
              />
              <Metric
                label="Failure Probability"
                value={crane.health < 70 ? 73 : 8}
                suffix="%"
                color="#DC2626"
              />
              <Metric
                label="Remaining Useful Life"
                value={crane.rul}
                suffix="d"
                color="#D97706"
              />
            </div>
            <div className="text-xs font-medium text-muted-foreground mb-2">
              Vibration trend (last 30 cycles)
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={vibration}>
                <defs>
                  <linearGradient id="vg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#DC2626" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#DC2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#DC2626"
                  strokeWidth={2}
                  fill="url(#vg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          <Panel
            title="Sensor Readings"
            subtitle="Real-time IoT telemetry"
            className="col-span-12 xl:col-span-4"
          >
            <div className="space-y-3">
              {sensors.map((s) => {
                const Icon = s.icon;
                const pct = (s.v / s.max) * 100;
                return (
                  <div
                    key={s.l}
                    className="rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <Icon className="h-3.5 w-3.5" style={{ color: s.c }} />
                        <span className="font-medium">{s.l}</span>
                      </div>
                      <div className="font-mono text-sm font-semibold">
                        {s.v}
                        {s.unit}
                      </div>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full"
                        style={{ background: s.c }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        <Panel
          title="AI Maintenance Recommendations"
          subtitle="Generated by LogiMind Predictive Engine · XGBoost v3.2"
          right={
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[color:var(--color-warning)]/10 px-2 py-1 text-[11px] font-medium text-[color:var(--color-warning)]">
              <AlertTriangle className="h-3 w-3" />
              Action required
            </span>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <RecCard
              icon={Calendar}
              label="Estimated Failure"
              value="Dec 20, 2026"
              sub="In ~12 days"
              color="#DC2626"
            />
            <RecCard
              icon={DollarSign}
              label="Cost Savings"
              value="$184,200"
              sub="vs unplanned downtime"
              color="#15803D"
            />
            <RecCard
              icon={Activity}
              label="Maintenance Window"
              value="Dec 14 · 02:00–06:00"
              sub="Low-traffic period"
              color="#2563EB"
            />
            <RecCard
              icon={CheckCircle2}
              label="Confidence"
              value="93.4%"
              sub="Model certainty"
              color="#0D9488"
            />
          </div>
          <div className="mt-4 rounded-lg border border-border bg-background p-4">
            <div className="text-xs font-semibold text-foreground mb-2">
              Recommended Actions
            </div>
            <ol className="space-y-2 text-sm">
              {[
                "Inspect main hoist gearbox bearings (vibration anomaly at 4.2g, 2.3× baseline)",
                "Replace temperature sensor T-04 (drift detected over 72h)",
                "Schedule lubrication cycle on slewing assembly",
                "Run full diagnostic on PLC unit during next maintenance window",
              ].map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </div>
        </Panel>

        <div className="grid grid-cols-12 gap-4">
          <Panel
            title="Maintenance Timeline"
            subtitle="Past & predicted events"
            className="col-span-12 xl:col-span-8"
          >
            <div className="relative pl-6 space-y-3">
              <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
              {[
                { d: "Nov 02", t: "Routine inspection", s: "done" },
                { d: "Nov 18", t: "Lubrication cycle", s: "done" },
                { d: "Dec 04", t: "Sensor drift detected · T-04", s: "alert" },
                {
                  d: "Dec 14",
                  t: "Predicted maintenance window",
                  s: "planned",
                },
                { d: "Dec 20", t: "Estimated failure date", s: "danger" },
              ].map((e, i) => {
                const c =
                  e.s === "done"
                    ? "#15803D"
                    : e.s === "alert"
                      ? "#D97706"
                      : e.s === "danger"
                        ? "#DC2626"
                        : "#2563EB";
                return (
                  <div key={i} className="relative">
                    <span
                      className="absolute -left-[18px] top-1.5 h-3 w-3 rounded-full border-2 border-background"
                      style={{ background: c }}
                    />
                    <div className="flex items-center gap-3 rounded-md border border-border bg-background p-2.5">
                      <span className="font-mono text-xs text-muted-foreground w-16">
                        {e.d}
                      </span>
                      <span className="text-sm">{e.t}</span>
                      <span
                        className="ml-auto rounded px-1.5 py-0.5 text-[10px] font-medium uppercase"
                        style={{ background: `${c}15`, color: c }}
                      >
                        {e.s}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
          <Panel
            title="Model Information"
            subtitle="Predictive Maintenance v3.2"
            className="col-span-12 xl:col-span-4"
          >
            <dl className="space-y-2 text-xs">
              {[
                ["Model", "XGBoost + Survival Analysis"],
                ["Dataset", "847K crane cycles · 2018–2026"],
                ["Accuracy", "93.4%"],
                ["RMSE", "2.8 days"],
                ["Last trained", "Nov 21, 2026"],
                [
                  "Top features",
                  "Vibration variance · Temp drift · Cycle count",
                ],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-3 border-b border-border/60 py-1.5"
                >
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 rounded-md bg-muted/60 p-2.5 text-[11px]">
              <div className="flex items-center gap-1.5 font-medium">
                <Brain className="h-3 w-3" />
                Explainability (SHAP)
              </div>
              <div className="mt-2 space-y-1.5">
                {[
                  ["Vibration variance", 0.42],
                  ["Temp drift", 0.27],
                  ["Cycle count", 0.18],
                  ["Load peaks", 0.13],
                ].map(([l, v]) => (
                  <div key={l as string} className="flex items-center gap-2">
                    <span className="w-24 truncate text-muted-foreground">
                      {l}
                    </span>
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-background">
                      <div
                        className="h-full rounded-full bg-[color:var(--color-secondary)]"
                        style={{ width: `${(v as number) * 100}%` }}
                      />
                    </div>
                    <span className="font-mono">
                      {((v as number) * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function Metric({
  label,
  value,
  suffix,
  color,
}: {
  label: string;
  value: number;
  suffix?: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div
        className="mt-1 font-display text-2xl font-semibold"
        style={{ color }}
      >
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
    </div>
  );
}

function RecCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <Icon className="h-4 w-4" style={{ color }} />
      <div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 font-display text-base font-semibold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}
