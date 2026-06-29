import { createLazyFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel, ChartTip } from "./index";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Brain,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export const Route = createLazyFileRoute("/app/decision-center")({
  component: DecisionCenterPage,
});

type Decision = {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  confidence: number;
  impact: string;
  metric: string;
  metricDelta: string;
  source: string;
  timestamp: string;
  status: "pending" | "approved" | "rejected" | "auto";
  reasoning: string;
};

const decisions: Decision[] = [
  {
    id: "DEC-001",
    title: "Open Gate Lane 3 to reduce congestion",
    severity: "critical",
    confidence: 94,
    impact: "-23 min avg waiting time",
    metric: "Gate Throughput",
    metricDelta: "+12%",
    source: "Gate Traffic Agent",
    timestamp: "2 min ago",
    status: "pending",
    reasoning:
      "Gate 1-2 queue exceeded 18 trucks (threshold: 12). Lane 3 has been idle for 45 min. Opening it will distribute load and reduce P95 wait from 34 min to 11 min.",
  },
  {
    id: "DEC-002",
    title: "Reroute Crane C-2 to Berth 5",
    severity: "high",
    confidence: 89,
    impact: "+18% crane utilization",
    metric: "Berth Turnaround",
    metricDelta: "-2.4h",
    source: "Crane Optimization Agent",
    timestamp: "8 min ago",
    status: "pending",
    reasoning:
      "MV-Geneva at Berth 5 has 840 TEU remaining. C-4 at Berth 5 is running at 62% health. Rerouting C-2 (96% health) from idle Berth 2 will complete discharge 2.4h earlier.",
  },
  {
    id: "DEC-003",
    title: "Pre-position 120 yard slots for MV-Horizon",
    severity: "medium",
    confidence: 97,
    impact: "Zero dwell overflow",
    metric: "Yard Capacity",
    metricDelta: "+120 slots",
    source: "Yard Planning Agent",
    timestamp: "14 min ago",
    status: "auto",
    reasoning:
      "MV-Horizon (ETA 16:30) carries 1,240 TEU. Current Yard Block D has 890 free slots. Pre-positioning 120 from Block E ensures zero overflow with 15% buffer.",
  },
  {
    id: "DEC-004",
    title: "Dispatch HSE team to Yard B — PPE violation",
    severity: "critical",
    confidence: 98,
    impact: "Compliance restored in ~4 min",
    metric: "Safety Score",
    metricDelta: "+3 pts",
    source: "Safety Vision Agent",
    timestamp: "1 min ago",
    status: "pending",
    reasoning:
      "Camera YB-03 detected 2 workers without hard hats near active crane zone. Nearest HSE officer is 180m away. Auto-dispatch will restore compliance within 4 minutes.",
  },
  {
    id: "DEC-005",
    title: "Reduce vessel speed — MV-Atlas approach",
    severity: "low",
    confidence: 91,
    impact: "-12% fuel consumption",
    metric: "Carbon Emissions",
    metricDelta: "-0.8 tons",
    source: "Marine Traffic Agent",
    timestamp: "22 min ago",
    status: "approved",
    reasoning:
      "Berth 3 won't be free for 2.1h. MV-Atlas current speed 14 kn. Reducing to 8 kn saves fuel without impacting berth availability. Captain notified via VDES.",
  },
  {
    id: "DEC-006",
    title: "Schedule Crane C-4 preventive maintenance",
    severity: "high",
    confidence: 93,
    impact: "Avoid $184K unplanned downtime",
    metric: "Equipment Health",
    metricDelta: "+22%",
    source: "Predictive Maintenance Agent",
    timestamp: "35 min ago",
    status: "approved",
    reasoning:
      "C-4 vibration at 4.2g (2.3× baseline). Predictive model estimates bearing failure by Dec 20 (93.4% confidence). Maintenance window: Dec 14 02:00-06:00 during low traffic.",
  },
];

const impactTimeline = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, "0")}:00`,
  aiActions: Math.round(3 + Math.sin(i / 3) * 2 + Math.random() * 2),
  savings: Math.round(12000 + Math.sin(i / 4) * 8000 + Math.random() * 3000),
}));

const sevColors = {
  critical: "#DC2626",
  high: "#D97706",
  medium: "#2563EB",
  low: "#15803D",
};

function DecisionCenterPage() {
  const [items, setItems] = useState(decisions);
  const [autoApprove, setAutoApprove] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 847,
    approved: 812,
    rejected: 14,
    auto: 21,
  });

  const approve = (id: string) => {
    setItems((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "approved" as const } : d))
    );
    setStats((s) => ({ ...s, approved: s.approved + 1 }));
  };

  const reject = (id: string) => {
    setItems((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "rejected" as const } : d))
    );
    setStats((s) => ({ ...s, rejected: s.rejected + 1 }));
  };

  const selectedDecision = items.find((d) => d.id === selected);

  return (
    <div className="dark flex h-screen flex-col bg-[#070B19] text-white">
      <AppTopBar
        title="AI Decision Center"
        subtitle="Autonomous recommendations · Approval workflows · Impact tracking"
      />
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Decisions",
              value: stats.total,
              icon: Brain,
              color: "#8B5CF6",
              sub: "Today",
            },
            {
              label: "AI Approved",
              value: stats.approved,
              icon: CheckCircle2,
              color: "#15803D",
              sub: `${((stats.approved / stats.total) * 100).toFixed(1)}% rate`,
            },
            {
              label: "Human Rejected",
              value: stats.rejected,
              icon: XCircle,
              color: "#DC2626",
              sub: `${((stats.rejected / stats.total) * 100).toFixed(1)}% rate`,
            },
            {
              label: "Auto-Executed",
              value: stats.auto,
              icon: Zap,
              color: "#D97706",
              sub: "Low-risk auto",
            },
          ].map((k) => {
            const Icon = k.icon;
            return (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md"
                    style={{ background: `${k.color}15`, color: k.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {k.sub}
                  </span>
                </div>
                <div className="mt-3 font-display text-2xl font-semibold">
                  {k.value.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">{k.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Auto-approve Toggle */}
        <div className="flex items-center justify-between rounded-xl border border-border bg-card/90 p-4">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-amber-500" />
            <div>
              <div className="text-sm font-semibold">
                Auto-Approve Low-Risk Decisions
              </div>
              <div className="text-xs text-muted-foreground">
                Confidence ≥95% and severity = low/medium will execute
                automatically
              </div>
            </div>
          </div>
          <button
            onClick={() => setAutoApprove(!autoApprove)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              autoApprove ? "bg-emerald-500" : "bg-muted"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                autoApprove ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Decision Queue */}
          <div className="col-span-12 xl:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Live Decision Queue</h2>
              <span className="text-xs text-muted-foreground">
                {items.filter((d) => d.status === "pending").length} pending
              </span>
            </div>
            {items.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(d.id)}
                className={`group cursor-pointer rounded-xl border bg-card/90 p-4 transition hover:shadow-lg hover:border-[color:var(--color-secondary)]/30 ${
                  selected === d.id
                    ? "border-[color:var(--color-secondary)]/50 shadow-lg"
                    : "border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white text-[10px] font-bold"
                    style={{ background: sevColors[d.severity] }}
                  >
                    {d.severity[0].toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold truncate">
                        {d.title}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Brain className="h-3 w-3" /> {d.confidence}% confidence
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> {d.impact}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {d.timestamp}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-mono">
                        {d.source}
                      </span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-mono">
                        {d.metric}{" "}
                        <span
                          style={{
                            color: d.metricDelta.startsWith("+")
                              ? "#15803D"
                              : "#DC2626",
                          }}
                        >
                          {d.metricDelta}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {d.status === "pending" ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            approve(d.id);
                          }}
                          className="inline-flex h-8 items-center gap-1 rounded-md bg-emerald-500/10 px-3 text-xs font-medium text-emerald-500 hover:bg-emerald-500/20 transition"
                        >
                          <ThumbsUp className="h-3 w-3" /> Approve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            reject(d.id);
                          }}
                          className="inline-flex h-8 items-center gap-1 rounded-md bg-red-500/10 px-3 text-xs font-medium text-red-500 hover:bg-red-500/20 transition"
                        >
                          <ThumbsDown className="h-3 w-3" /> Reject
                        </button>
                      </>
                    ) : (
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          d.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : d.status === "auto"
                              ? "bg-amber-500/10 text-amber-500"
                              : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {d.status === "auto"
                          ? "⚡ Auto-Executed"
                          : d.status === "approved"
                            ? "✓ Approved"
                            : "✗ Rejected"}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="col-span-12 xl:col-span-5 space-y-4">
            {/* Detail Panel */}
            <AnimatePresence mode="wait">
              {selectedDecision && (
                <motion.div
                  key={selectedDecision.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <Panel title="AI Reasoning" subtitle={selectedDecision.id}>
                    <div className="space-y-4">
                      <div
                        className="rounded-lg border-l-4 bg-muted/50 p-4 text-sm leading-relaxed"
                        style={{
                          borderColor: sevColors[selectedDecision.severity],
                        }}
                      >
                        {selectedDecision.reasoning}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-border p-3 text-center">
                          <div className="text-2xl font-bold text-emerald-500">
                            {selectedDecision.confidence}%
                          </div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            Confidence
                          </div>
                        </div>
                        <div className="rounded-lg border border-border p-3 text-center">
                          <div className="text-2xl font-bold" style={{ color: sevColors[selectedDecision.severity] }}>
                            {selectedDecision.severity}
                          </div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            Severity
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-border p-3">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          Expected Impact
                        </div>
                        <div className="text-sm font-medium">
                          {selectedDecision.impact}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Metric: {selectedDecision.metric} → {selectedDecision.metricDelta}
                        </div>
                      </div>
                    </div>
                  </Panel>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Impact Over Time */}
            <Panel
              title="AI Impact Over Time"
              subtitle="Actions & cost savings · 24h"
            >
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={impactTimeline}>
                  <defs>
                    <linearGradient id="savg" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                      <stop
                        offset="100%"
                        stopColor="#8B5CF6"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="var(--color-border)"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="hour"
                    tick={{
                      fontSize: 10,
                      fill: "var(--color-muted-foreground)",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fontSize: 10,
                      fill: "var(--color-muted-foreground)",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTip />} />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fill="url(#savg)"
                    name="Savings ($)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
