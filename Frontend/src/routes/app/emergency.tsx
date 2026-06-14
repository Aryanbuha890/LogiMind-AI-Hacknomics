import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel } from "./index";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  AlertOctagon,
  ShieldAlert,
  Flame,
  Radio,
  UserCheck,
  Video,
  Play,
  Skull,
  Activity,
  AlertTriangle,
  Lock,
  Power,
  Volume2,
} from "lucide-react";

export const Route = createFileRoute("/app/emergency")({
  component: EmergencyPage,
});

type ThreatLevel = "nominal" | "warning" | "lockdown" | "critical";

type CameraFeed = {
  id: string;
  name: string;
  zone: string;
  status: "nominal" | "incident";
  hasFeed: boolean;
};

const initialCameras: CameraFeed[] = [
  { id: "CAM-01", name: "Pier 3 Entrance", zone: "Berth Zone", status: "nominal", hasFeed: true },
  { id: "CAM-02", name: "Yard B Stack 4", zone: "Yard Zone", status: "nominal", hasFeed: true },
  { id: "CAM-03", name: "Gate 2 Inbound", zone: "Gate Zone", status: "nominal", hasFeed: true },
  { id: "CAM-04", name: "Crane C-4 Cabin", zone: "Berth Zone", status: "incident", hasFeed: true },
  { id: "CAM-05", name: "Control Room West", zone: "Operations", status: "nominal", hasFeed: true },
  { id: "CAM-06", name: "Fueling Pier 1", zone: "Berth Zone", status: "nominal", hasFeed: false },
];

const mockEvents = [
  { time: "12:44:02", msg: "Crane C-4 bearing temperature exceeded critical thermal boundary (98.4°C).", level: "critical" },
  { time: "12:44:18", msg: "HSE automated dispatch triggered for Zone B nearest responders.", level: "warning" },
  { time: "12:45:00", msg: "Lockdown sirens engaged in Crane Gantry 4 corridor.", level: "lockdown" },
];

function EmergencyPage() {
  const [threat, setThreat] = useState<ThreatLevel>("warning");
  const [cameras, setCameras] = useState<CameraFeed[]>(initialCameras);
  const [events, setEvents] = useState(mockEvents);
  const [lockdownSirens, setLockdownSirens] = useState(false);
  const [allStopActivated, setAllStopActivated] = useState(false);

  // Auto add events when emergency is raised
  const triggerEmergency = (level: ThreatLevel) => {
    setThreat(level);
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];

    let newMsg = "";
    if (level === "critical") {
      newMsg = "DEFCON-1: Extreme operational integrity compromise. All physical movements suspended.";
      setAllStopActivated(true);
      setLockdownSirens(true);
    } else if (level === "lockdown") {
      newMsg = "Lockdown engaged. Closing yard blocks D/E safety corridors.";
      setLockdownSirens(true);
    } else {
      newMsg = "Threat level updated to: " + level.toUpperCase();
    }

    setEvents((prev) => [{ time: timeStr, msg: newMsg, level }, ...prev]);
  };

  return (
    <div className="dark flex h-screen flex-col bg-[#070B19] text-white">
      <AppTopBar
        title="AI Emergency Command Center"
        subtitle="Critical disaster protocol · Physical hardware shutdowns · Incident dispatch center"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* DEFCON threat indicator strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { level: "nominal", label: "DEFCON-4 (Nominal)", color: "#10B981" },
            { level: "warning", label: "DEFCON-3 (Warning)", color: "#3B82F6" },
            { level: "lockdown", label: "DEFCON-2 (Lockdown)", color: "#F59E0B" },
            { level: "critical", label: "DEFCON-1 (Critical)", color: "#EF4444" },
          ].map((def) => {
            const isCurrent = threat === def.level;
            return (
              <button
                key={def.level}
                onClick={() => triggerEmergency(def.level as ThreatLevel)}
                className={`relative rounded-xl border p-4 text-center transition ${
                  isCurrent
                    ? "border-current shadow-lg"
                    : "border-white/5 bg-[#0d162d]/40 opacity-50 hover:opacity-85"
                }`}
                style={{
                  color: isCurrent ? def.color : "inherit",
                  borderColor: isCurrent ? def.color : "transparent",
                  boxShadow: isCurrent ? `0 0 20px -2px ${def.color}35` : "none",
                }}
              >
                {isCurrent && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: def.color }} />
                    <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: def.color }} />
                  </span>
                )}
                <div className="font-display font-semibold text-xs">{def.label}</div>
              </button>
            );
          })}
        </div>

        {/* Global alarm alert banner if DEFCON is high */}
        {(threat === "lockdown" || threat === "critical") && (
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-2xl border border-red-500/30 bg-red-950/25 p-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-6 w-6 text-red-500 animate-bounce" />
              <div>
                <h4 className="text-sm font-bold text-red-400">CRITICAL SAFETY INCIDENT REPORTED</h4>
                <p className="text-xs text-red-300">
                  Crane Gantry C-4 emergency stop sensors triggered. Evacuate zone.
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-mono uppercase tracking-widest font-bold">
              Sirens Active
            </span>
          </motion.div>
        )}

        <div className="grid grid-cols-12 gap-6">
          {/* Action Protocols & Timeline */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <Panel title="Disaster Mitigation Control" subtitle="Hard triggers for emergency actuators">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setLockdownSirens(!lockdownSirens)}
                  className={`flex h-20 flex-col items-center justify-center gap-1.5 rounded-xl border transition ${
                    lockdownSirens
                      ? "border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                      : "border-white/5 bg-[#0a1124]/90 hover:border-white/10"
                  }`}
                >
                  <Volume2 className="h-5 w-5" />
                  <span className="text-xs font-semibold">
                    {lockdownSirens ? "Siren Active" : "Trigger Sirens"}
                  </span>
                </button>

                <button
                  onClick={() => setAllStopActivated(!allStopActivated)}
                  className={`flex h-20 flex-col items-center justify-center gap-1.5 rounded-xl border transition ${
                    allStopActivated
                      ? "border-red-600 bg-red-600/15 text-red-400 shadow-[0_0_12px_rgba(220,38,38,0.25)]"
                      : "border-white/5 bg-[#0a1124]/90 hover:border-white/10"
                  }`}
                >
                  <Power className="h-5 w-5 animate-pulse" />
                  <span className="text-xs font-semibold">
                    {allStopActivated ? "ALL-STOP ENGAGED" : "Engage All-Stop"}
                  </span>
                </button>
              </div>
            </Panel>

            <Panel title="Incident Log Stream" subtitle="Timestamped safety events log">
              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin">
                {events.map((e, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2.5 text-xs border-b border-white/5 pb-2.5 last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-white/40">{e.time}</span>
                    <span className="text-white/80">{e.msg}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* CCTV Feeds */}
          <div className="col-span-12 lg:col-span-7">
            <Panel
              title="Tactical Security CCTV Stream"
              subtitle="Closed-circuit live grid cameras feeding neural object hazard recognition"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cameras.map((c) => {
                  const hasIncident = c.status === "incident";
                  return (
                    <div
                      key={c.id}
                      className={`relative rounded-xl overflow-hidden border aspect-video flex flex-col justify-between p-3 ${
                        hasIncident
                          ? "border-red-500 bg-red-950/20"
                          : "border-white/5 bg-[#0d162d]/60"
                      }`}
                    >
                      {/* Grid scanning effect */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_4px,6px_100%]" />

                      <div className="flex items-center justify-between z-10">
                        <span className="font-mono text-[9px] text-white/55">{c.id}</span>
                        <span className="flex items-center gap-1 text-[9px]">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              hasIncident ? "bg-red-500 animate-pulse" : "bg-emerald-400"
                            }`}
                          />
                          <span className={hasIncident ? "text-red-400" : "text-emerald-400 font-mono"}>
                            {hasIncident ? "HAZARD" : "NOMINAL"}
                          </span>
                        </span>
                      </div>

                      {/* Mock CCTV view */}
                      <div className="my-auto flex flex-col items-center justify-center py-2">
                        <Video className={`h-8 w-8 ${hasIncident ? "text-red-500 animate-pulse" : "text-white/10"}`} />
                        {hasIncident && (
                          <div className="mt-1 text-[9px] font-mono text-red-400 text-center uppercase tracking-wider font-bold">
                            Warning: Hot Bearing
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-end z-10">
                        <span className="text-[10px] font-semibold truncate max-w-[70px]">
                          {c.name}
                        </span>
                        <span className="text-[8px] bg-white/5 text-white/40 px-1 rounded">
                          {c.zone}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
