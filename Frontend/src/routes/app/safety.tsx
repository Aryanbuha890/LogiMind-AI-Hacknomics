import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel, ChartTip } from "./index";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Flame, Heart, Beaker, Lock, Camera } from "lucide-react";

export const Route = createFileRoute("/app/safety")({
  component: SafetyPage,
});

const trend = Array.from({ length: 14 }, (_, i) => ({
  d: `D-${14 - i}`,
  v: Math.max(1, 9 - i * 0.4 + Math.random() * 2),
}));

const cameras = [
  { id: "CAM-01", name: "Yard B · East", alert: "No Helmet", count: 1 },
  { id: "CAM-02", name: "Gate 3", alert: null, count: 0 },
  { id: "CAM-05", name: "Pier 2", alert: null, count: 0 },
  { id: "CAM-08", name: "Warehouse A", alert: "Unauthorized", count: 1 },
  { id: "CAM-11", name: "Crane 4", alert: null, count: 0 },
  { id: "CAM-14", name: "Bunker Zone", alert: null, count: 0 },
];

function SafetyPage() {
  const [modal, setModal] = useState<string | null>(null);
  return (
    <>
      <AppTopBar
        title="Safety Command Center"
        subtitle="Real-time monitoring · PPE · Fire · Intrusion · Incident response"
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-12 gap-4">
          <Panel
            title="Primary Feed · Yard B"
            className="col-span-12 xl:col-span-8"
            right={
              <span className="rounded bg-[color:var(--color-destructive)]/10 px-2 py-0.5 text-[11px] font-semibold text-[color:var(--color-destructive)]">
                VIOLATION
              </span>
            }
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-[#0B1A33] to-[#1B3A6B]">
              <div className="absolute inset-0 bg-grid-sm opacity-15" />
              {/* fake person boxes */}
              {[
                { x: 18, y: 30, w: 14, h: 36, ok: true, label: "Worker · PPE OK" },
                { x: 44, y: 38, w: 12, h: 32, ok: false, label: "No Helmet · 0.94" },
                { x: 68, y: 28, w: 13, h: 38, ok: true, label: "Worker · PPE OK" },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="absolute rounded border-2"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    width: `${b.w}%`,
                    height: `${b.h}%`,
                    borderColor: b.ok ? "#10B981" : "#DC2626",
                  }}
                >
                  <span className="absolute -top-5 left-0 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-mono text-white whitespace-nowrap">
                    {b.label}
                  </span>
                </motion.div>
              ))}
              <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-1 text-[10px] font-mono text-white">
                CAM-01 · YARD-B-EAST
              </div>
              <div className="absolute top-2 right-2 rounded bg-black/60 px-2 py-1 text-[10px] font-mono text-[color:var(--color-destructive)]">
                ● REC · 14:32:18
              </div>
              <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-[10px] font-mono text-white">
                YOLOv11 · 58 FPS
              </div>
            </div>
          </Panel>

          <Panel
            title="Emergency Actions"
            subtitle="One-tap response workflows"
            className="col-span-12 xl:col-span-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: "Fire", icon: Flame, c: "#DC2626" },
                { l: "Medical", icon: Heart, c: "#0D9488" },
                { l: "Chemical Leak", icon: Beaker, c: "#D97706" },
                { l: "Security Lockdown", icon: Lock, c: "#1B3A6B" },
              ].map((a) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.l}
                    onClick={() => setModal(a.l)}
                    className="rounded-lg border border-border bg-background p-4 text-left transition hover:border-[color:var(--color-secondary)]/40 hover:shadow-md"
                  >
                    <Icon className="h-5 w-5" style={{ color: a.c }} />
                    <div className="mt-2 text-sm font-semibold">{a.l}</div>
                    <div className="text-[10px] text-muted-foreground">Trigger response</div>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-md bg-muted/60 p-3 text-[11px] text-muted-foreground">
              All emergency actions auto-dispatch trained personnel, notify command, and create an
              immutable audit trail.
            </div>
          </Panel>
        </div>

        <Panel title="Camera Grid" subtitle="14 active streams · 3 with active alerts">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {cameras.map((c) => (
              <div
                key={c.id}
                className={`rounded-lg border bg-background p-2.5 ${c.alert ? "border-[color:var(--color-destructive)]/40" : "border-border"}`}
              >
                <div className="relative aspect-video overflow-hidden rounded bg-gradient-to-br from-[#0B1A33] to-[#1B3A6B]">
                  <div className="absolute inset-0 bg-grid-sm opacity-20" />
                  <Camera className="absolute inset-0 m-auto h-6 w-6 text-white/30" />
                  <div className="absolute top-1 left-1 rounded bg-black/60 px-1 py-0.5 text-[9px] font-mono text-white">
                    {c.id}
                  </div>
                  {c.alert && (
                    <div className="absolute bottom-1 right-1 rounded bg-[color:var(--color-destructive)] px-1 py-0.5 text-[9px] font-bold text-white animate-pulse">
                      {c.alert}
                    </div>
                  )}
                </div>
                <div className="mt-2 truncate text-xs font-medium">{c.name}</div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid grid-cols-12 gap-4">
          <Panel
            title="Violation Trends"
            subtitle="Last 14 days"
            className="col-span-12 xl:col-span-8"
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={trend}>
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
                <Bar dataKey="v" radius={[4, 4, 0, 0]} fill="#DC2626" />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Violation Categories" className="col-span-12 xl:col-span-4">
            <ul className="space-y-2 text-sm">
              {[
                ["PPE Non-compliance", 58, "#D97706"],
                ["Unauthorized Access", 22, "#DC2626"],
                ["Smoking in Zone", 12, "#2563EB"],
                ["Slip / Fall Risk", 8, "#0D9488"],
              ].map(([l, v, c]) => (
                <li key={l as string}>
                  <div className="flex justify-between text-xs">
                    <span>{l}</span>
                    <span className="font-mono">{v}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${v}%` }}
                      viewport={{ once: true }}
                      className="h-full rounded-full"
                      style={{ background: c as string }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-md bg-muted/60 p-3 text-xs">
              <span className="font-semibold">Avg response time</span> · 4m 12s (↓ 38% YoY)
            </div>
          </Panel>
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          onClick={() => setModal(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl"
          >
            <div className="text-xs font-semibold uppercase text-[color:var(--color-destructive)]">
              Confirm emergency response
            </div>
            <h3 className="mt-1 font-display text-xl font-semibold">{modal} protocol</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This will immediately dispatch response teams, sound zone alarms, lock affected gates,
              and notify port command.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setModal(null)}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => setModal(null)}
                className="rounded-md bg-[color:var(--color-destructive)] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[color:var(--color-destructive)]/90"
              >
                Confirm & Dispatch
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
