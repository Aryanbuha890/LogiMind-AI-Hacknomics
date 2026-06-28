import { createLazyFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Ship,
  Container,
  Wrench,
  Truck,
  Anchor,
  Eye,
  Layers,
  Thermometer,
  X,
} from "lucide-react";

export const Route = createLazyFileRoute("/app/digital-twin")({
  component: DigitalTwinPage,
});

type Entity = {
  id: string;
  type: "vessel" | "crane" | "container" | "truck";
  label: string;
  x: number;
  y: number;
  status: "active" | "idle" | "warning" | "moving";
  detail: string;
  rotation?: number;
};

const berths = [
  { id: "B1", x: 60, y: 80, w: 140, h: 40, label: "Berth 1", vessel: "MV-Horizon" },
  { id: "B2", x: 60, y: 140, w: 140, h: 40, label: "Berth 2", vessel: null },
  { id: "B3", x: 60, y: 200, w: 140, h: 40, label: "Berth 3", vessel: "MV-Atlas" },
  { id: "B4", x: 60, y: 260, w: 140, h: 40, label: "Berth 4", vessel: "MSC Geneva" },
  { id: "B5", x: 60, y: 320, w: 140, h: 40, label: "Berth 5", vessel: "MV-228" },
  { id: "B6", x: 60, y: 380, w: 140, h: 40, label: "Berth 6", vessel: null },
];

const yardBlocks = [
  { id: "YA", x: 320, y: 80, w: 90, h: 70, label: "Yard A", fill: 72 },
  { id: "YB", x: 420, y: 80, w: 90, h: 70, label: "Yard B", fill: 91 },
  { id: "YC", x: 520, y: 80, w: 90, h: 70, label: "Yard C", fill: 45 },
  { id: "YD", x: 320, y: 170, w: 90, h: 70, label: "Yard D", fill: 88 },
  { id: "YE", x: 420, y: 170, w: 90, h: 70, label: "Yard E", fill: 34 },
  { id: "YF", x: 520, y: 170, w: 90, h: 70, label: "Yard F", fill: 67 },
];

const gates = [
  { id: "G1", x: 680, y: 90, label: "Gate 1", queue: 4, status: "green" as const },
  { id: "G2", x: 680, y: 150, label: "Gate 2", queue: 12, status: "red" as const },
  { id: "G3", x: 680, y: 210, label: "Gate 3", queue: 7, status: "yellow" as const },
  { id: "G4", x: 680, y: 270, label: "Gate 4", queue: 2, status: "green" as const },
];

const entities: Entity[] = [
  { id: "V1", type: "vessel", label: "MV-Horizon", x: 100, y: 95, status: "active", detail: "Discharging · 640 TEU remaining" },
  { id: "V2", type: "vessel", label: "MV-Atlas", x: 100, y: 215, status: "active", detail: "Loading · 320 TEU loaded" },
  { id: "V3", type: "vessel", label: "MSC Geneva", x: 100, y: 275, status: "warning", detail: "Delayed · ETA slip 2.1h" },
  { id: "V4", type: "vessel", label: "MV-228", x: 100, y: 335, status: "active", detail: "Berthed · Customs clearance" },
  { id: "C1", type: "crane", label: "Crane C-1", x: 220, y: 90, status: "active", detail: "Operating · 96% health · 28 moves/hr" },
  { id: "C2", type: "crane", label: "Crane C-2", x: 220, y: 150, status: "idle", detail: "Idle · Awaiting vessel" },
  { id: "C3", type: "crane", label: "Crane C-3", x: 220, y: 210, status: "active", detail: "Operating · 88% health · 24 moves/hr" },
  { id: "C4", type: "crane", label: "Crane C-4", x: 220, y: 270, status: "warning", detail: "Warning · Vibration 4.2g · Maintenance due" },
  { id: "C5", type: "crane", label: "Crane C-5", x: 220, y: 330, status: "active", detail: "Operating · 94% health · 26 moves/hr" },
  { id: "T1", type: "truck", label: "TRK-4421", x: 640, y: 95, status: "moving", detail: "Inbound · Gate 1 · OCR verified" },
  { id: "T2", type: "truck", label: "TRK-7783", x: 640, y: 155, status: "warning", detail: "Queued · Gate 2 · 18 min wait" },
  { id: "T3", type: "truck", label: "TRK-2209", x: 640, y: 215, status: "moving", detail: "Inbound · Gate 3 · Processing" },
];

const iconMap = { vessel: Ship, crane: Wrench, container: Container, truck: Truck };
const statusColor = {
  active: "#15803D",
  idle: "#6B7280",
  warning: "#D97706",
  moving: "#2563EB",
};
const gateStatusColor = { green: "#15803D", yellow: "#D97706", red: "#DC2626" };

function DigitalTwinPage() {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="dark flex h-screen flex-col bg-white text-slate-900">
      <AppTopBar
        title="Digital Twin"
        subtitle="Live interactive port map · Real-time entity tracking"
        right={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                showHeatmap
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <Thermometer className="h-3 w-3" />
              Heatmap
            </button>
            <div className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs">
              <Eye className="h-3 w-3 text-muted-foreground" />
              <span className="font-mono text-muted-foreground">
                {entities.length} entities
              </span>
            </div>
          </div>
        }
      />
      <div className="flex-1 overflow-hidden p-6">
        <div className="grid h-full grid-cols-12 gap-4">
          {/* Main Map */}
          <div className="col-span-12 xl:col-span-9 rounded-xl border border-border bg-card/90 p-4 relative overflow-hidden">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <svg viewBox="0 0 800 460" className="w-full h-full" style={{ minHeight: 400 }}>
              {/* Water / Channel */}
              <rect x="0" y="60" width="50" height="380" rx="4" fill="#0C4A6E" opacity="0.3" />
              <text x="25" y="50" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="600" opacity="0.6">
                CHANNEL
              </text>

              {/* Berths */}
              {berths.map((b) => (
                <g key={b.id}>
                  <rect
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    rx="4"
                    fill={b.vessel ? "#1E3A5F" : "#1a1f2e"}
                    stroke={b.vessel ? "#2563EB" : "#333"}
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  <text x={b.x + 8} y={b.y + 16} fill="#94a3b8" fontSize="8" fontWeight="500">
                    {b.label}
                  </text>
                  {b.vessel && (
                    <text x={b.x + 8} y={b.y + 28} fill="#38bdf8" fontSize="7" fontFamily="monospace">
                      {b.vessel}
                    </text>
                  )}
                </g>
              ))}

              {/* Quay Wall */}
              <line x1="210" y1="70" x2="210" y2="430" stroke="#475569" strokeWidth="3" strokeDasharray="8 4" />
              <text x="215" y="440" fill="#64748b" fontSize="7" fontWeight="600">QUAY WALL</text>

              {/* Yard Blocks */}
              {yardBlocks.map((y) => {
                const fillColor = showHeatmap
                  ? y.fill > 85 ? "#DC2626" : y.fill > 60 ? "#D97706" : "#15803D"
                  : "#1E293B";
                return (
                  <g key={y.id}>
                    <rect
                      x={y.x}
                      y={y.y}
                      width={y.w}
                      height={y.h}
                      rx="6"
                      fill={fillColor}
                      opacity={showHeatmap ? 0.25 : 0.5}
                      stroke={showHeatmap ? fillColor : "#334155"}
                      strokeWidth="1"
                    />
                    {/* Container stacks visualization */}
                    {Array.from({ length: Math.floor(y.fill / 20) }, (_, i) => (
                      <rect
                        key={i}
                        x={y.x + 6 + i * 16}
                        y={y.y + y.h - 8 - Math.random() * 30}
                        width="12"
                        height={8 + Math.floor(y.fill / 25) * 4}
                        rx="1"
                        fill="#0D9488"
                        opacity={0.3 + (i * 0.1)}
                      />
                    ))}
                    <text x={y.x + 8} y={y.y + 15} fill="#94a3b8" fontSize="9" fontWeight="600">
                      {y.label}
                    </text>
                    <text x={y.x + y.w - 8} y={y.y + 15} textAnchor="end" fill={y.fill > 85 ? "#D97706" : "#64748b"} fontSize="8" fontFamily="monospace">
                      {y.fill}%
                    </text>
                  </g>
                );
              })}

              {/* Roads */}
              <rect x="620" y="70" width="6" height="370" rx="3" fill="#334155" opacity="0.5" />
              <text x="623" y="450" textAnchor="middle" fill="#64748b" fontSize="7">ROAD</text>

              {/* Gates */}
              {gates.map((g) => (
                <g key={g.id}>
                  <rect
                    x={g.x}
                    y={g.y}
                    width="80"
                    height="40"
                    rx="6"
                    fill="#1a1f2e"
                    stroke={gateStatusColor[g.status]}
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                  <circle cx={g.x + 12} cy={g.y + 14} r="4" fill={gateStatusColor[g.status]} opacity="0.8">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x={g.x + 22} y={g.y + 17} fill="#e2e8f0" fontSize="8" fontWeight="600">
                    {g.label}
                  </text>
                  <text x={g.x + 12} y={g.y + 32} fill="#94a3b8" fontSize="7" fontFamily="monospace">
                    Queue: {g.queue}
                  </text>
                </g>
              ))}

              {/* Entities (animated markers) */}
              {entities.map((e) => {
                const color = statusColor[e.status];
                return (
                  <g
                    key={e.id}
                    onClick={() => setSelectedEntity(e)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Pulse ring */}
                    <circle cx={e.x} cy={e.y} r="10" fill={color} opacity="0.15">
                      <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.2;0.05;0.2" dur="3s" repeatCount="indefinite" />
                    </circle>
                    {/* Marker */}
                    <circle cx={e.x} cy={e.y} r="6" fill={color} stroke="#0f172a" strokeWidth="2" />
                    {/* Label */}
                    <text x={e.x + 10} y={e.y + 3} fill="#e2e8f0" fontSize="7" fontWeight="500">
                      {e.label}
                    </text>
                  </g>
                );
              })}

              {/* Compass */}
              <g transform="translate(770, 430)">
                <circle r="14" fill="#1a1f2e" stroke="#e2e8f0" strokeWidth="1" />
                <text textAnchor="middle" y="-3" fill="#38bdf8" fontSize="8" fontWeight="700">N</text>
                <text textAnchor="middle" y="9" fill="#64748b" fontSize="6">S</text>
              </g>

              {/* Legend */}
              <g transform="translate(320, 290)">
                <rect width="300" height="140" rx="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" opacity="0.95" />
                <text x="12" y="20" fill="#94a3b8" fontSize="8" fontWeight="700" letterSpacing="0.1em">LEGEND</text>
                {Object.entries(statusColor).map(([key, val], i) => (
                  <g key={key} transform={`translate(${12 + (i % 2) * 140}, ${36 + Math.floor(i / 2) * 20})`}>
                    <circle r="4" cx="4" cy="0" fill={val} />
                    <text x="14" fill="#94a3b8" fontSize="7" dominantBaseline="central" style={{ textTransform: "capitalize" }}>
                      {key}
                    </text>
                  </g>
                ))}
                <text x="12" y="90" fill="#64748b" fontSize="7">
                  Click any entity for details
                </text>
                <text x="12" y="105" fill="#64748b" fontSize="7">
                  Port of Mundra · Live Feed · {new Date().toLocaleTimeString()}
                </text>
                {showHeatmap && (
                  <g transform="translate(12, 115)">
                    <rect width="20" height="8" rx="2" fill="#15803D" opacity="0.5" />
                    <text x="24" fill="#64748b" fontSize="6" dominantBaseline="central" y="4">Low</text>
                    <rect x="60" width="20" height="8" rx="2" fill="#D97706" opacity="0.5" />
                    <text x="84" fill="#64748b" fontSize="6" dominantBaseline="central" y="4">Med</text>
                    <rect x="120" width="20" height="8" rx="2" fill="#DC2626" opacity="0.5" />
                    <text x="144" fill="#64748b" fontSize="6" dominantBaseline="central" y="4">High</text>
                  </g>
                )}
              </g>
            </svg>
          </div>

          {/* Entity Detail Panel */}
          <div className="col-span-12 xl:col-span-3 space-y-4">
            {selectedEntity ? (
              <motion.div
                key={selectedEntity.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl border border-border bg-card/90 p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md"
                      style={{
                        background: `${statusColor[selectedEntity.status]}20`,
                        color: statusColor[selectedEntity.status],
                      }}
                    >
                      {(() => {
                        const Icon = iconMap[selectedEntity.type];
                        return <Icon className="h-4 w-4" />;
                      })()}
                    </span>
                    <div>
                      <div className="text-sm font-semibold">
                        {selectedEntity.label}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {selectedEntity.type} · {selectedEntity.id}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEntity(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div
                  className="rounded-lg p-3 border-l-4"
                  style={{
                    borderColor: statusColor[selectedEntity.status],
                    background: `${statusColor[selectedEntity.status]}08`,
                  }}
                >
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Status
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: statusColor[selectedEntity.status] }}
                    />
                    <span className="text-sm font-medium capitalize">
                      {selectedEntity.status}
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Details
                  </div>
                  <div className="text-sm">{selectedEntity.detail}</div>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Position
                  </div>
                  <div className="font-mono text-xs">
                    X: {selectedEntity.x} · Y: {selectedEntity.y}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-card/40 p-8 text-center">
                <Anchor className="mx-auto h-8 w-8 text-muted-foreground/40 mb-3" />
                <div className="text-sm text-muted-foreground">
                  Click any entity on the map to inspect
                </div>
              </div>
            )}

            {/* Zone Summary */}
            <div className="rounded-xl border border-border bg-card/90 p-4 space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
                Zone Summary
              </h3>
              {[
                { label: "Berths Occupied", value: "4 / 6", pct: 66, color: "#2563EB" },
                { label: "Yard Utilization", value: "66% avg", pct: 66, color: "#0D9488" },
                { label: "Gate Throughput", value: "142 trucks/hr", pct: 71, color: "#15803D" },
                { label: "Crane Activity", value: "4 / 5 active", pct: 80, color: "#D97706" },
              ].map((z) => (
                <div key={z.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{z.label}</span>
                    <span className="font-mono">{z.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${z.pct}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full"
                      style={{ background: z.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
