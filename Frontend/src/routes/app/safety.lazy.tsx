import { createLazyFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel, ChartTip } from "./index";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Flame, Heart, Beaker, Lock, Camera } from "lucide-react";

export const Route = createLazyFileRoute("/app/safety")({
  component: SafetyPage,
});

const trend = Array.from({ length: 14 }, (_, i) => ({
  d: `D-${14 - i}`,
  v: Math.max(1, 9 - i * 0.4 + Math.random() * 2),
}));

const cameras = [
  { id: "CAM-01", name: "Yard B · East", alert: "Container Ship Detected", count: 1 },
  { id: "CAM-02", name: "Gate 3", alert: "Ship Detected", count: 1 },
  { id: "CAM-03", name: "Pier 2", alert: "Worker Detected", count: 1 },
];

function SafetyPage() {
  const [modal, setModal] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const [isUploading, setIsUploading] = useState(false);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    event.target.value = '';

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8005/api/upload_inspect", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.video_url) {
        setProcessedVideoUrl(data.video_url);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <>
      <AppTopBar
        title="Safety Command Center"
        subtitle="Real-time monitoring · PPE · Fire · Intrusion · Incident response"
      />
      <div className="p-6 space-y-6">
        <div className="flex justify-end items-center">
          <input 
            type="file" 
            accept="video/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleUpload} 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50 shadow-md"
          >
            {isUploading ? (
               <>
                 <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></span>
                 Processing AI Models...
               </>
            ) : (
               <>
                 <Camera className="w-4 h-4" />
                 Upload & Inspect Video
               </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Feed 1: PPE Detection */}
          <Panel
            title="PPE Compliance Feed · CAM-01"
            className="col-span-12 xl:col-span-6"
            right={
              currentTime >= 8 && currentTime <= 10 ? (
                <span className="rounded bg-red-500/10 px-2 py-0.5 text-[11px] font-semibold text-red-500 flex items-center gap-1.5 animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  VIOLATION FLAG
                </span>
              ) : (
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-500 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  COMPLIANT
                </span>
              )
            }
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-black">
              <video
                src="/PPE VIDEO.mp4"
                autoPlay
                preload="metadata"
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              />

              {/* Red AI detection box overlaying the worker's head/body (Only visible between 8s and 10s) */}
              {currentTime >= 8 && currentTime <= 10 && (
                <div
                  className="absolute border-2 border-red-500 rounded animate-pulse"
                  style={{
                    left: "31%",
                    top: "32%",
                    width: "21%",
                    height: "52%",
                    boxShadow: "0 0 12px rgba(239, 68, 68, 0.7)"
                  }}
                >
                  <span className="absolute -top-5.5 left-0 rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-mono font-bold text-white whitespace-nowrap uppercase tracking-wider animate-bounce">
                    No Helmet · 94%
                  </span>
                </div>
              )}

              <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-1 text-[10px] font-mono text-white">
                CAM-01 · YARD-B-EAST
              </div>
              <div className={`absolute top-2 right-2 rounded bg-black/60 px-2 py-1 text-[10px] font-mono font-bold ${currentTime >= 8 && currentTime <= 10 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
                ● REC · {currentTime >= 8 && currentTime <= 10 ? 'VIOLATION' : 'NOMINAL'}
              </div>
              <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-[10px] font-mono text-white">
                YOLOv11 · 58 FPS · Edge Active
              </div>
            </div>
          </Panel>

          {/* Feed 2: Thermal Incident Detection */}
          <Panel
            title="Thermal Fire Incident Feed · CAM-14"
            className="col-span-12 xl:col-span-6"
            right={
              <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-500 flex items-center gap-1.5 animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                ACTIVE MONITOR
              </span>
            }
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-black">
              <video
                src="/FIRE VIDEO.mp4"
                autoPlay
                preload="metadata"
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-1 text-[10px] font-mono text-white">
                CAM-14 · BUNKER-ZONE
              </div>
              <div className="absolute top-2 right-2 rounded bg-black/60 px-2 py-1 text-[10px] font-mono text-amber-500">
                ● REC · LIVE
              </div>
              <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-[10px] font-mono text-white">
                YOLOv8-Thermal · 45 FPS · Active
              </div>
            </div>
          </Panel>
        </div>

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
                    className="rounded-lg border border-border bg-background p-4 text-left transition hover:border-[color:var(--color-secondary)]/40 hover:shadow-md cursor-pointer"
                  >
                    <Icon className="h-5 w-5" style={{ color: a.c }} />
                    <div className="mt-2 text-sm font-semibold">{a.l}</div>
                    <div className="text-[10px] text-muted-foreground">
                      Trigger response
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-md bg-muted/60 p-3 text-[11px] text-muted-foreground">
              All emergency actions auto-dispatch trained personnel, notify
              command, and create an immutable audit trail.
            </div>
          </Panel>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <Panel
            title="Violation Categories"
            className="col-span-12 xl:col-span-4"
          >
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
              <span className="font-semibold">Avg response time</span> · 4m 12s
              (↓ 38% YoY)
            </div>
          </Panel>

          <div className="col-span-12 xl:col-span-8">
            <Panel
              title="Camera Grid"
              subtitle="3 active streams · 3 with active alerts"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cameras.map((c) => (
                  <div
                    key={c.id}
                    className={`rounded-lg border bg-background p-2.5 ${c.alert ? "border-[color:var(--color-destructive)]/40" : "border-border"}`}
                  >
                    <div className="relative aspect-video overflow-hidden rounded bg-gradient-to-br from-[#0B1A33] to-[#1B3A6B]">
                      {c.id === "CAM-01" ? (
                        <video 
                          src="/ship.mp4" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : c.id === "CAM-02" ? (
                        <video 
                          src="/ship2.mp4" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : c.id === "CAM-03" ? (
                        <video 
                          src="/cam03.mp4" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-grid-sm opacity-20" />
                          <Camera className="absolute inset-0 m-auto h-6 w-6 text-white/30" />
                        </>
                      )}
                      <div className="absolute top-1 left-1 rounded bg-black/60 px-1 py-0.5 text-[9px] font-mono text-white">
                        {c.id}
                      </div>
                      {c.alert && (
                        <div className="absolute bottom-1 right-1 rounded bg-[color:var(--color-destructive)] px-1 py-0.5 text-[9px] font-bold text-white animate-pulse">
                          {c.alert}
                        </div>
                      )}
                    </div>
                    <div className="mt-2 truncate text-xs font-medium">
                      {c.name}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
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
            <h3 className="mt-1 font-display text-xl font-semibold">
              {modal} protocol
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This will immediately dispatch response teams, sound zone alarms,
              lock affected gates, and notify port command.
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

      {/* Video Modal Overlay */}
      {processedVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
              <h3 className="font-bold text-lg font-mono flex items-center gap-2">
                <Camera className="w-5 h-5 text-indigo-500" />
                Multi-Model AI Inspection Results
              </h3>
              <button 
                onClick={() => setProcessedVideoUrl(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted/80 transition-colors cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <video 
                src={processedVideoUrl} 
                autoPlay 
                controls 
                loop 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
