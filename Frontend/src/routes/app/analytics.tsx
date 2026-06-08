import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel, ChartTip } from "./index";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, ShieldCheck, DollarSign, Wrench, Activity } from "lucide-react";

export const Route = createFileRoute("/app/analytics")({
  component: AnalyticsPage,
});

const thirty = Array.from({ length: 30 }, (_, i) => ({
  d: `${i + 1}`,
  throughput: 8000 + Math.round(Math.sin(i / 4) * 1800 + Math.random() * 800),
  safety: 92 + Math.round(Math.cos(i / 5) * 4 + Math.random() * 2),
  uptime: 96 + Math.round(Math.sin(i / 6) * 3),
}));

const incidents = [
  { name: "PPE", v: 38, c: "#D97706" },
  { name: "Equipment", v: 24, c: "#DC2626" },
  { name: "Cyber", v: 8, c: "#7F1D1D" },
  { name: "Weather", v: 14, c: "#2563EB" },
  { name: "Other", v: 16, c: "#8B5CF6" },
];

const weatherImpact = Array.from({ length: 12 }, (_, i) => ({
  m: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  delay: Math.round(20 + Math.sin(i / 2) * 14 + Math.random() * 6),
}));

function AnalyticsPage() {
  return (
    <>
      <AppTopBar title="Analytics" subtitle="Executive reporting · 30-day rolling window" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Kpi
            icon={TrendingUp}
            label="Throughput"
            value={284120}
            suffix=" TEU"
            color="#2563EB"
            trend="+8.4%"
          />
          <Kpi
            icon={ShieldCheck}
            label="Safety"
            value={99.2}
            dec={1}
            suffix="%"
            color="#15803D"
            trend="+0.6pt"
          />
          <Kpi
            icon={DollarSign}
            label="Revenue Protected"
            value={2.4}
            dec={1}
            suffix="M"
            prefix="$"
            color="#0D9488"
            trend="+$420k"
          />
          <Kpi
            icon={Wrench}
            label="Equipment Health"
            value={94}
            suffix="%"
            color="#1B3A6B"
            trend="-1.4pt"
            warn
          />
          <Kpi
            icon={Activity}
            label="Operational Efficiency"
            value={91.7}
            dec={1}
            suffix="%"
            color="#D97706"
            trend="+3.1pt"
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <Panel title="30-Day Throughput vs Safety Compliance" className="col-span-12">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={thirty}>
                <defs>
                  <linearGradient id="th" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="sf" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#15803D" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#15803D" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                  yAxisId="l"
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="r"
                  orientation="right"
                  tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTip />} />
                <Area
                  yAxisId="l"
                  type="monotone"
                  dataKey="throughput"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fill="url(#th)"
                />
                <Area
                  yAxisId="r"
                  type="monotone"
                  dataKey="safety"
                  stroke="#15803D"
                  strokeWidth={2}
                  fill="url(#sf)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          <Panel
            title="Incident Categories"
            subtitle="Last 90 days"
            className="col-span-12 md:col-span-6 xl:col-span-4"
          >
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={incidents}
                  dataKey="v"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="none"
                >
                  {incidents.map((d) => (
                    <Cell key={d.name} fill={d.c} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-1 grid grid-cols-2 gap-1 text-xs">
              {incidents.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.c }} />
                  {d.name}
                  <span className="ml-auto font-mono">{d.v}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Predictive Maintenance Pipeline"
            className="col-span-12 md:col-span-6 xl:col-span-4"
          >
            <ul className="space-y-2 text-sm">
              {[
                ["Crane 4", "12 days", "#DC2626", 32],
                ["Crane 9", "38 days", "#D97706", 56],
                ["Reefer cluster 3", "62 days", "#D97706", 70],
                ["Yard tractor 22", "89 days", "#15803D", 84],
                ["Crane 1", "412 days", "#15803D", 96],
              ].map(([l, eta, c, pct]) => (
                <li key={l as string} className="rounded-lg border border-border p-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold">{l}</span>
                    <span style={{ color: c as string }} className="font-semibold">
                      {eta}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: c as string }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            title="Weather Impact"
            subtitle="Avg delay per month (minutes)"
            className="col-span-12 xl:col-span-4"
          >
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weatherImpact}>
                <CartesianGrid
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="m"
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
                <Bar dataKey="delay" radius={[4, 4, 0, 0]} fill="#0D9488" />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel
            title="Operational Performance Index"
            subtitle="Composite of throughput · safety · uptime"
            className="col-span-12"
          >
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={thirty}>
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
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="#1B3A6B"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="safety"
                  stroke="#15803D"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Panel>
        </div>
      </div>
    </>
  );
}

function Kpi({ icon: Icon, label, value, suffix, prefix, color, trend, warn, dec }: any) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4" style={{ color }} />
        <span
          className={`text-[10px] font-mono ${warn ? "text-[color:var(--color-warning)]" : "text-[color:var(--color-success)]"}`}
        >
          {trend}
        </span>
      </div>
      <div className="mt-3 font-display text-2xl font-semibold">
        <AnimatedCounter value={value} suffix={suffix} prefix={prefix} decimals={dec ?? 0} />
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
