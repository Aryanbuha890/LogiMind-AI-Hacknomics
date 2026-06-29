import { createLazyFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel } from "./index";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Network,
  Ship,
  Container,
  Wrench,
  Navigation,
  MessageSquare,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  RefreshCw,
  Cpu,
  UserCheck,
} from "lucide-react";

export const Route = createLazyFileRoute("/app/war-room")({
  component: WarRoomPage,
});

type Agent = {
  id: string;
  name: string;
  role: "marine" | "yard" | "crane" | "gate";
  status: "idle" | "busy" | "alert";
  health: number;
  task: string;
  icon: any;
  color: string;
};

type LogMessage = {
  id: string;
  timestamp: string;
  sender: string;
  receiver: string;
  message: string;
  type: "info" | "decision" | "alert" | "conflict";
};

type Conflict = {
  id: string;
  title: string;
  agentA: string;
  agentB: string;
  issue: string;
  resolution: string;
  status: "resolved" | "resolving";
};

const initialAgents: Agent[] = [
  {
    id: "AGT-MAR",
    name: "Marine Traffic Agent",
    role: "marine",
    status: "busy",
    health: 98,
    task: "Optimizing MV-Geneva approach corridor",
    icon: Ship,
    color: "#3B82F6",
  },
  {
    id: "AGT-YRD",
    name: "Yard Allocation Agent",
    role: "yard",
    status: "busy",
    health: 95,
    task: "Balancing Block D stack distribution",
    icon: Container,
    color: "#8B5CF6",
  },
  {
    id: "AGT-CRN",
    name: "Crane Dispatch Agent",
    role: "crane",
    status: "idle",
    health: 89,
    task: "C-2 turnaround completion tracking",
    icon: Wrench,
    color: "#10B981",
  },
  {
    id: "AGT-GTE",
    name: "Gate Coordination Agent",
    role: "gate",
    status: "alert",
    health: 94,
    task: "Re-routing lane 3 incoming queues",
    icon: Navigation,
    color: "#F59E0B",
  },
];

const initialLogs: LogMessage[] = [
  {
    id: "MSG-001",
    timestamp: "10:42:01",
    sender: "Marine Traffic Agent",
    receiver: "Yard Allocation Agent",
    message: "MV-Geneva arriving early by 18 minutes. Requesting immediate berth yard buffer pre-allocation.",
    type: "info",
  },
  {
    id: "MSG-002",
    timestamp: "10:42:15",
    sender: "Yard Allocation Agent",
    receiver: "Marine Traffic Agent",
    message: "Allocating 120 slot buffers in Yard Block D. Syncing crane requirements.",
    type: "decision",
  },
  {
    id: "MSG-003",
    timestamp: "10:43:10",
    sender: "Yard Allocation Agent",
    receiver: "Crane Dispatch Agent",
    message: "Requested discharge speed: 32 moves/hour. C-4 is at 61% health; load-sharing required.",
    type: "info",
  },
  {
    id: "MSG-004",
    timestamp: "10:43:40",
    sender: "Crane Dispatch Agent",
    receiver: "Yard Allocation Agent",
    message: "Conflict detected: C-4 duty cycle capacity limited. C-2 reallocated to support load.",
    type: "conflict",
  },
  {
    id: "MSG-005",
    timestamp: "10:44:12",
    sender: "Gate Coordination Agent",
    receiver: "Yard Allocation Agent",
    message: "Inbound truck peak starting. Requesting priority export-stack slots near Gate 2.",
    type: "info",
  },
];

const initialConflicts: Conflict[] = [
  {
    id: "CON-001",
    title: "C-4 Health Constraints vs Loading Speed",
    agentA: "Crane Dispatch Agent",
    agentB: "Yard Allocation Agent",
    issue: "Yard requested 35 moves/hour on C-4, but vibration threshold limits safety limit to 25 moves/hour.",
    resolution: "AI resolved: Re-routed Crane C-2 to assist. C-4 speed throttled to 22 moves/hour.",
    status: "resolved",
  },
  {
    id: "CON-002",
    title: "Gate Congestion vs Yard Block D Access",
    agentA: "Gate Coordination Agent",
    agentB: "Yard Allocation Agent",
    issue: "Yard block crane maintenance blocking primary corridor for Gate Lane 3 inbound trucks.",
    resolution: "Resolving: Recalculating detour corridors through Block C; dynamic safety boundary shifts in progress.",
    status: "resolving",
  },
];

const simulatedMessages = [
  { sender: "Marine Traffic Agent", receiver: "Yard Allocation Agent", msg: "MV-Geneva speed adjusted to 12 knots. Dynamic ETA locked.", type: "info" },
  { sender: "Yard Allocation Agent", receiver: "Crane Dispatch Agent", msg: "Yard buffer Block D-4 ready. Aligning cranes.", type: "info" },
  { sender: "Crane Dispatch Agent", receiver: "Gate Coordination Agent", msg: "Outbound queue cleared. Loading completion signal sent.", type: "decision" },
  { sender: "Gate Coordination Agent", receiver: "Marine Traffic Agent", msg: "Gate lanes normal. Truck turnaround down to 14 minutes.", type: "info" },
  { sender: "Crane Dispatch Agent", receiver: "Yard Allocation Agent", msg: "Pre-positioning conflict: Block E crane capacity overload risk.", type: "conflict" },
  { sender: "Yard Allocation Agent", receiver: "Crane Dispatch Agent", msg: "Resolution active: Load-balanced Block E to F. Crisis averted.", type: "decision" },
];

function WarRoomPage() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [logs, setLogs] = useState<LogMessage[]>(initialLogs);
  const [conflicts, setConflicts] = useState<Conflict[]>(initialConflicts);
  const [isPlaying, setIsPlaying] = useState(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Simulate live communication stream
      const randMsg = simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const newMsg: LogMessage = {
        id: `MSG-${Date.now()}`,
        timestamp: timeStr,
        sender: randMsg.sender,
        receiver: randMsg.receiver,
        message: randMsg.msg,
        type: randMsg.type as any,
      };

      setLogs((prev) => [...prev.slice(-30), newMsg]);

      // Randomly update agent status
      setAgents((prev) =>
        prev.map((a) => {
          if (a.name === randMsg.sender) {
            return {
              ...a,
              status: randMsg.type === "conflict" ? "alert" : "busy",
              task: randMsg.msg,
            };
          }
          return a;
        })
      );

      // Randomly trigger new conflict
      if (randMsg.type === "conflict") {
        const hasActiveConflict = conflicts.some((c) => c.status === "resolving");
        if (!hasActiveConflict) {
          const newConflict: Conflict = {
            id: `CON-${Date.now()}`,
            title: `Capacity Conflict: Yard vs ${randMsg.sender.split(" ")[0]}`,
            agentA: randMsg.sender,
            agentB: randMsg.receiver,
            issue: randMsg.msg + " Potential queue build up expected in operations corridor.",
            resolution: "Resolving: Auto-negotiating buffer allocations with AI mesh controller...",
            status: "resolving",
          };
          setConflicts((prev) => [newConflict, ...prev.slice(0, 4)]);
        }
      } else if (randMsg.type === "decision") {
        // Resolve ongoing conflicts
        setConflicts((prev) =>
          prev.map((c) =>
            c.status === "resolving"
              ? {
                  ...c,
                  status: "resolved",
                  resolution: "AI resolved: Dynamically load balanced operations mesh and modified task scheduling.",
                }
              : c
          )
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, conflicts]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const triggerReset = () => {
    setLogs(initialLogs);
    setConflicts(initialConflicts);
    setAgents(initialAgents);
  };

  return (
    <div className="dark flex h-screen flex-col bg-[#070B19] text-white">
      <AppTopBar
        title="Multi-Agent War Room"
        subtitle="Orchestrating autonomous agents · Dynamic consensus protocols · Conflict resolution"
        right={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold backdrop-blur transition ${
                isPlaying
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5" /> Pause Simulation
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" /> Resume Simulation
                </>
              )}
            </button>
            <button
              onClick={triggerReset}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-white/70 hover:text-white"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Agent Orchestration Mesh - Visual DAG */}
        <Panel
          title="Multi-Agent Collaboration DAG"
          subtitle="Real-time consensus negotiation flows and message token passes"
        >
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-12 rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
            {/* Animated network grid background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

            {agents.map((agt, idx) => {
              const Icon = agt.icon;
              return (
                <div key={agt.id} className="relative flex flex-col items-center">
                  <motion.div
                    animate={{
                      boxShadow:
                        agt.status === "alert"
                          ? "0 0 20px 4px rgba(245, 158, 11, 0.4)"
                          : agt.status === "busy"
                            ? "0 0 15px 2px rgba(59, 130, 246, 0.3)"
                            : "0 0 10px 0px rgba(16, 185, 129, 0.2)",
                    }}
                    className="relative flex h-20 w-20 flex-col items-center justify-center rounded-2xl border bg-[#0d162d]/90 z-10 transition-colors"
                    style={{
                      borderColor:
                        agt.status === "alert"
                          ? "#F59E0B"
                          : agt.status === "busy"
                            ? "#3B82F6"
                            : "#10B981",
                    }}
                  >
                    <Icon className="h-7 w-7" style={{ color: agt.color }} />
                    <span className="mt-1 text-[9px] font-mono text-white/50">{agt.id}</span>

                    {/* Dynamic pulsing indicator */}
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          agt.status === "alert"
                            ? "bg-amber-400"
                            : agt.status === "busy"
                              ? "bg-blue-400"
                              : "bg-emerald-400"
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-3.5 w-3.5 border border-[#070B19] ${
                          agt.status === "alert"
                            ? "bg-amber-500"
                            : agt.status === "busy"
                              ? "bg-blue-500"
                              : "bg-emerald-500"
                        }`}
                      />
                    </span>
                  </motion.div>

                  <div className="mt-3 text-center">
                    <div className="text-xs font-semibold">{agt.name}</div>
                    <div className="text-[10px] text-white/40 capitalize">{agt.role} Agent</div>
                  </div>

                  {/* Connecting Arrows with pulses */}
                  {idx < agents.length - 1 && (
                    <div className="hidden md:block absolute left-[105%] top-1/2 -translate-y-1/2 w-[calc(100vw/5_-_120px)] max-w-[100px] h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500">
                      <span className="absolute top-1/2 right-0 -translate-y-1/2 border-t-4 border-b-4 border-l-[6px] border-t-transparent border-b-transparent border-l-cyan-400" />
                      <motion.div
                        animate={{ left: ["0%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,1)]"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Panel>

        <div className="grid grid-cols-12 gap-6">
          {/* Live Agent Communication Feed */}
          <div className="col-span-12 xl:col-span-8">
            <Panel
              title="Agent-to-Agent Consensus Feed"
              subtitle="Pulsing network traffic data streams showing collaborative negotiation logs"
              right={
                <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-2.5 py-1 text-[10px] font-mono text-white/50">
                  <Activity className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                  <span>Mesh Active</span>
                </div>
              }
            >
              <div ref={logContainerRef} className="h-[350px] overflow-y-auto space-y-3 rounded-lg border border-white/5 bg-[#0a1124]/90 p-4 scrollbar-thin">
                <AnimatePresence initial={false}>
                  {logs.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 rounded-lg border border-white/[0.04] bg-white/[0.01] p-3 transition hover:bg-white/[0.03]"
                    >
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded bg-white/5 font-mono text-[9px] text-white/60">
                        {m.timestamp.slice(3)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-x-2 text-xs">
                          <span className="font-semibold text-cyan-400">{m.sender}</span>
                          <span className="text-white/40">➔</span>
                          <span className="font-semibold text-indigo-400">{m.receiver}</span>
                        </div>
                        <p className="mt-1 text-sm text-white/80 leading-relaxed font-mono">
                          {m.message}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase ${
                          m.type === "conflict"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : m.type === "decision"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {m.type}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Panel>
          </div>

          {/* Right Column: Agents Status & Conflicts */}
          <div className="col-span-12 xl:col-span-4 space-y-6">
            {/* Agent Health & Load status */}
            <Panel title="Agent Status Panel" subtitle="Operational metrics per mesh node">
              <div className="space-y-3.5">
                {agents.map((agt) => {
                  const Icon = agt.icon;
                  return (
                    <div
                      key={agt.id}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0a1124]/70 p-3"
                    >
                      <div
                        className="grid h-9 w-9 place-items-center rounded-lg"
                        style={{ background: `${agt.color}15`, color: agt.color }}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold truncate">{agt.name}</span>
                          <span className="text-[10px] font-mono text-white/50">{agt.health}% HP</span>
                        </div>
                        {/* HP bar */}
                        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${agt.health}%`,
                              background:
                                agt.health > 95
                                  ? "#10B981"
                                  : agt.health > 85
                                    ? "#3B82F6"
                                    : "#F59E0B",
                            }}
                          />
                        </div>
                        <div className="mt-1 text-[10px] text-white/40 truncate">{agt.task}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* Conflict Resolution Board */}
            <Panel title="Conflict Resolution Log" subtitle="Dynamic arbitration and consensus logs">
              <div className="space-y-3">
                {conflicts.map((c) => (
                  <div
                    key={c.id}
                    className={`rounded-xl border p-3.5 space-y-2.5 transition-colors ${
                      c.status === "resolving"
                        ? "border-amber-500/30 bg-amber-500/[0.02]"
                        : "border-emerald-500/20 bg-emerald-500/[0.01]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white/90">{c.title}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-mono font-semibold ${
                          c.status === "resolving"
                            ? "bg-amber-500/10 text-amber-400 animate-pulse"
                            : "bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        {c.status === "resolving" ? "● Resolving" : "✓ Resolved"}
                      </span>
                    </div>

                    <div className="text-[11px] leading-relaxed text-white/60">
                      <div className="font-mono text-white/40 mb-0.5">Issue:</div>
                      {c.issue}
                    </div>

                    <div className="rounded-lg bg-black/35 p-2 text-[11px] leading-relaxed font-mono">
                      <div className="text-cyan-400 mb-0.5">Resolution Protocol:</div>
                      {c.resolution}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
