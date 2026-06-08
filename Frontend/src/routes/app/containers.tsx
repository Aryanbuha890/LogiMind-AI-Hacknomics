import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel, ChartTip } from "./index";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  X,
  Maximize2,
  Truck,
  User,
  Container as ContainerIcon,
  Gauge,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ScanLine,
} from "lucide-react";

export const Route = createFileRoute("/app/containers")({
  component: ContainersPage,
});

type CamFeed = {
  id: string;
  name: string;
  zone: string;
  status: "live" | "alert" | "idle";
  fps: number;
  container: {
    code: string;
    carrier: string;
    type: string;
    iso: string;
    weight: string;
    seal: string;
    ocr: number;
    damage: string;
    damageConf: number;
    tare: string;
    origin: string;
    destination: string;
  };
  truck: {
    plate: string;
    plateConf: number;
    make: string;
    color: string;
    axle: string;
    speed: string;
  };
  driver: {
    name: string;
    license: string;
    company: string;
    clearance: "VERIFIED" | "PENDING" | "FLAGGED";
    photo: string;
    phone: string;
    trips: number;
  };
  boxes: {
    x: number;
    y: number;
    w: number;
    h: number;
    label: string;
    conf: number;
    color: string;
  }[];
  bg: string;
};

const FEEDS: CamFeed[] = [
  {
    id: "CAM-04",
    name: "Gate 4 · Inbound",
    zone: "Primary OCR",
    status: "alert",
    fps: 62,
    container: {
      code: "MSCU 472938 7",
      carrier: "MSC",
      type: "40' HC",
      iso: "45G1",
      weight: "28,420 kg",
      seal: "MS-8821044",
      ocr: 0.96,
      damage: "Dent (R-side)",
      damageConf: 0.91,
      tare: "3,980 kg",
      origin: "Shanghai (CNSHA)",
      destination: "Mumbai (INNSA)",
    },
    truck: {
      plate: "MH 04 GA 7821",
      plateConf: 0.98,
      make: "Tata Prima 4928.S",
      color: "Blue",
      axle: "6x4",
      speed: "8 km/h",
    },
    driver: {
      name: "Rajesh Kulkarni",
      license: "MH04 20210084213",
      company: "Pegasus Logistics",
      clearance: "VERIFIED",
      photo: "RK",
      phone: "+91 98•••• 4421",
      trips: 1284,
    },
    boxes: [
      { x: 8, y: 18, w: 56, h: 54, label: "CONTAINER · 0.97", conf: 0.97, color: "#10B981" },
      { x: 12, y: 62, w: 42, h: 14, label: "PLATE · 0.98", conf: 0.98, color: "#67E8F9" },
      { x: 70, y: 38, w: 22, h: 30, label: "DAMAGE · 0.91", conf: 0.91, color: "#DC2626" },
    ],
    bg: "linear-gradient(135deg,#0B1A33,#1B3A6B 60%,#0F2547)",
  },
  {
    id: "CAM-05",
    name: "Gate 4 · Side",
    zone: "Damage Scan",
    status: "live",
    fps: 60,
    container: {
      code: "TCLU 818201 2",
      carrier: "TCL",
      type: "20' STD",
      iso: "22G1",
      weight: "19,210 kg",
      seal: "TC-9921884",
      ocr: 0.93,
      damage: "None",
      damageConf: 0.99,
      tare: "2,180 kg",
      origin: "Singapore (SGSIN)",
      destination: "Chennai (INMAA)",
    },
    truck: {
      plate: "TN 11 BR 4402",
      plateConf: 0.94,
      make: "Ashok Leyland 4019",
      color: "White",
      axle: "4x2",
      speed: "6 km/h",
    },
    driver: {
      name: "Suresh Iyer",
      license: "TN11 20180099124",
      company: "Coastal Freight",
      clearance: "VERIFIED",
      photo: "SI",
      phone: "+91 90•••• 7714",
      trips: 842,
    },
    boxes: [
      { x: 14, y: 22, w: 64, h: 56, label: "CONTAINER · 0.96", conf: 0.96, color: "#10B981" },
      { x: 22, y: 70, w: 36, h: 12, label: "PLATE · 0.94", conf: 0.94, color: "#67E8F9" },
    ],
    bg: "linear-gradient(135deg,#0F2547,#1B3A6B,#0B1A33)",
  },
  {
    id: "CAM-07",
    name: "Gate 7 · Outbound",
    zone: "Exit OCR",
    status: "live",
    fps: 58,
    container: {
      code: "MAEU 220447 8",
      carrier: "Maersk",
      type: "40' RF",
      iso: "45R1",
      weight: "31,840 kg",
      seal: "MK-7710022",
      ocr: 0.94,
      damage: "None",
      damageConf: 0.97,
      tare: "4,560 kg",
      origin: "Rotterdam (NLRTM)",
      destination: "Mundra (INMUN)",
    },
    truck: {
      plate: "GJ 06 AT 1190",
      plateConf: 0.92,
      make: "BharatBenz 4928",
      color: "Red",
      axle: "6x4",
      speed: "12 km/h",
    },
    driver: {
      name: "Amit Patel",
      license: "GJ06 20190044711",
      company: "Sahara Transport",
      clearance: "PENDING",
      photo: "AP",
      phone: "+91 99•••• 1180",
      trips: 612,
    },
    boxes: [
      { x: 10, y: 24, w: 58, h: 52, label: "CONTAINER · 0.95", conf: 0.95, color: "#10B981" },
      { x: 18, y: 68, w: 40, h: 14, label: "PLATE · 0.92", conf: 0.92, color: "#67E8F9" },
    ],
    bg: "linear-gradient(135deg,#1B3A6B,#0B1A33,#0F2547)",
  },
  {
    id: "CAM-09",
    name: "Yard A · Stack 12",
    zone: "Yard Scan",
    status: "live",
    fps: 30,
    container: {
      code: "CMAU 990213 5",
      carrier: "CMA CGM",
      type: "40' HC",
      iso: "45G1",
      weight: "26,110 kg",
      seal: "CM-3318099",
      ocr: 0.88,
      damage: "Scratch",
      damageConf: 0.84,
      tare: "3,920 kg",
      origin: "Le Havre (FRLEH)",
      destination: "Cochin (INCOK)",
    },
    truck: { plate: "—", plateConf: 0, make: "Yard mover", color: "—", axle: "—", speed: "0 km/h" },
    driver: {
      name: "Vikram Shetty",
      license: "KL07 20200012883",
      company: "Internal Ops",
      clearance: "VERIFIED",
      photo: "VS",
      phone: "+91 98•••• 0091",
      trips: 2104,
    },
    boxes: [
      { x: 6, y: 16, w: 42, h: 60, label: "CONTAINER · 0.92", conf: 0.92, color: "#10B981" },
      { x: 52, y: 20, w: 40, h: 56, label: "CONTAINER · 0.89", conf: 0.89, color: "#10B981" },
    ],
    bg: "linear-gradient(135deg,#0B1A33,#0F2547,#1B3A6B)",
  },
  {
    id: "CAM-11",
    name: "Weighbridge 2",
    zone: "Weight + OCR",
    status: "live",
    fps: 45,
    container: {
      code: "EVRU 661820 1",
      carrier: "Evergreen",
      type: "40' STD",
      iso: "42G1",
      weight: "24,980 kg",
      seal: "EV-5520078",
      ocr: 0.95,
      damage: "None",
      damageConf: 0.98,
      tare: "3,820 kg",
      origin: "Kaohsiung (TWKHH)",
      destination: "Vizag (INVTZ)",
    },
    truck: {
      plate: "AP 31 CX 8821",
      plateConf: 0.96,
      make: "Tata Signa 4825",
      color: "Green",
      axle: "6x4",
      speed: "0 km/h",
    },
    driver: {
      name: "Naveen Reddy",
      license: "AP31 20170088210",
      company: "BlueLine Carriers",
      clearance: "VERIFIED",
      photo: "NR",
      phone: "+91 90•••• 3320",
      trips: 941,
    },
    boxes: [
      { x: 12, y: 20, w: 62, h: 54, label: "CONTAINER · 0.97", conf: 0.97, color: "#10B981" },
      { x: 20, y: 68, w: 40, h: 14, label: "PLATE · 0.96", conf: 0.96, color: "#67E8F9" },
    ],
    bg: "linear-gradient(135deg,#0F2547,#0B1A33,#1B3A6B)",
  },
  {
    id: "CAM-14",
    name: "Rail Siding",
    zone: "Intermodal",
    status: "idle",
    fps: 25,
    container: {
      code: "HLXU 442100 9",
      carrier: "Hapag-Lloyd",
      type: "40' HC",
      iso: "45G1",
      weight: "27,650 kg",
      seal: "HL-1140022",
      ocr: 0.9,
      damage: "Corrosion",
      damageConf: 0.78,
      tare: "4,010 kg",
      origin: "Hamburg (DEHAM)",
      destination: "Nhava (INNSA)",
    },
    truck: { plate: "—", plateConf: 0, make: "Rail wagon", color: "—", axle: "—", speed: "0 km/h" },
    driver: {
      name: "—",
      license: "—",
      company: "Indian Railways",
      clearance: "VERIFIED",
      photo: "IR",
      phone: "—",
      trips: 0,
    },
    boxes: [
      { x: 8, y: 28, w: 30, h: 44, label: "CONTAINER · 0.90", conf: 0.9, color: "#10B981" },
      { x: 40, y: 28, w: 30, h: 44, label: "CONTAINER · 0.88", conf: 0.88, color: "#10B981" },
      { x: 72, y: 30, w: 22, h: 42, label: "RUST · 0.78", conf: 0.78, color: "#D97706" },
    ],
    bg: "linear-gradient(135deg,#1B3A6B,#0F2547,#0B1A33)",
  },
];

const trends = Array.from({ length: 12 }, (_, i) => ({
  h: `${i * 2}:00`,
  d: 80 + Math.round(Math.sin(i / 2) * 40 + Math.random() * 20),
}));
const damageCats = [
  { name: "None", value: 82, color: "#15803D" },
  { name: "Scratch", value: 8, color: "#D97706" },
  { name: "Dent", value: 6, color: "#DC2626" },
  { name: "Corrosion", value: 4, color: "#7F1D1D" },
];

function ContainersPage() {
  const [active, setActive] = useState<CamFeed>(FEEDS[0]);
  const [expanded, setExpanded] = useState<CamFeed | null>(null);

  return (
    <>
      <AppTopBar
        title="Container Intelligence"
        subtitle="YOLOv11 detection · PaddleOCR · ALPR · Driver verification"
      />
      <div className="p-6 space-y-6">
        {/* Hero: big active analyzer */}
        <div className="grid grid-cols-12 gap-4">
          <Panel
            title={`Primary Analysis · ${active.id} · ${active.name}`}
            subtitle={`${active.zone} · YOLOv11 + PaddleOCR + ALPR · ${active.fps} FPS`}
            className="col-span-12 xl:col-span-8"
            right={<LiveBadge status={active.status} />}
          >
            <FeedFrame feed={active} big onExpand={() => setExpanded(active)} />
            <div className="mt-3 grid grid-cols-4 gap-2 text-[10px] font-mono">
              {[
                ["FPS", active.fps],
                ["Latency", "38ms"],
                ["Detections", active.boxes.length],
                ["GPU", "61%"],
              ].map(([l, v]) => (
                <div key={l as string} className="rounded border border-border bg-background p-2">
                  <div className="text-muted-foreground">{l}</div>
                  <div className="text-sm font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Live Recognition"
            subtitle="Container · Truck · Driver"
            className="col-span-12 xl:col-span-4"
          >
            <AnalysisCards feed={active} />
          </Panel>
        </div>

        {/* Multi-camera grid */}
        <Panel
          title="Camera Wall"
          subtitle={`${FEEDS.length} active streams · click any feed to focus · expand for fullscreen analysis`}
          right={
            <span className="text-[10px] font-mono text-muted-foreground">
              SURVEILLANCE GRID · 1920×1080
            </span>
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {FEEDS.map((f) => {
              const isActive = f.id === active.id;
              return (
                <motion.button
                  key={f.id}
                  layout
                  onClick={() => setActive(f)}
                  onDoubleClick={() => setExpanded(f)}
                  className={`group relative text-left rounded-lg border bg-background overflow-hidden transition ${isActive ? "border-[color:var(--color-secondary)] shadow-[0_0_0_2px_color-mix(in_oklab,var(--color-secondary)_30%,transparent)]" : "border-border hover:border-[color:var(--color-secondary)]/40"}`}
                >
                  <FeedFrame feed={f} />
                  <div className="flex items-center justify-between px-2.5 py-2 text-[11px]">
                    <div className="min-w-0">
                      <div className="truncate font-semibold">{f.name}</div>
                      <div className="truncate font-mono text-[10px] text-muted-foreground">
                        {f.container.code}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(f);
                      }}
                      className="grid h-7 w-7 place-items-center rounded-md border border-border bg-card hover:bg-muted"
                      aria-label="Expand"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </Panel>

        {/* Trends */}
        <div className="grid grid-cols-12 gap-4">
          <Panel
            title="Detection Trends"
            subtitle="Containers detected per 2h window"
            className="col-span-12 xl:col-span-8"
          >
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="ct" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="h"
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
                  dataKey="d"
                  stroke="#2563EB"
                  strokeWidth={2}
                  fill="url(#ct)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>
          <Panel title="Damage Categories" className="col-span-12 xl:col-span-4">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={damageCats}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="none"
                >
                  {damageCats.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-1 grid grid-cols-2 gap-1 text-xs">
              {damageCats.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  {d.name}
                  <span className="ml-auto font-mono">{d.value}%</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <AnimatePresence>
        {expanded && <ExpandedModal feed={expanded} onClose={() => setExpanded(null)} />}
      </AnimatePresence>
    </>
  );
}

function LiveBadge({ status }: { status: CamFeed["status"] }) {
  const map = {
    live: { c: "var(--color-success)", l: "LIVE" },
    alert: { c: "var(--color-destructive)", l: "ALERT" },
    idle: { c: "var(--color-muted-foreground)", l: "IDLE" },
  } as const;
  const s = map[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-bold"
      style={{ background: `color-mix(in oklab, ${s.c} 12%, transparent)`, color: s.c }}
    >
      <span className="h-1.5 w-1.5 rounded-full pulse-ring" style={{ background: s.c }} />
      {s.l}
    </span>
  );
}

function FeedFrame({
  feed,
  big = false,
  onExpand,
}: {
  feed: CamFeed;
  big?: boolean;
  onExpand?: () => void;
}) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const now = new Date(Date.now() + tick * 1000);
  const ts = now.toISOString().slice(0, 19).replace("T", " ");
  return (
    <div
      className="relative aspect-[16/9] overflow-hidden rounded-md border border-border"
      style={{ background: feed.bg }}
    >
      <div className="absolute inset-0 bg-grid-sm opacity-15" />
      {/* scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        style={{ top: 0 }}
      />

      {/* synthetic scene shapes — truck + container silhouette */}
      <SyntheticScene />

      {/* detection boxes */}
      {feed.boxes.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.1 }}
          className="absolute rounded-sm border-2"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.w}%`,
            height: `${b.h}%`,
            borderColor: b.color,
            boxShadow: `0 0 0 1px color-mix(in oklab, ${b.color} 40%, transparent)`,
          }}
        >
          <span
            className="absolute -top-[18px] left-0 rounded-sm px-1.5 py-0.5 text-[9px] font-mono font-bold text-black whitespace-nowrap"
            style={{ background: b.color }}
          >
            {b.label}
          </span>
          {/* corner brackets */}
          {[
            { t: -1, l: -1, br: "tl" },
            { t: -1, r: -1, br: "tr" },
            { b: -1, l: -1, br: "bl" },
            { b: -1, r: -1, br: "br" },
          ].map((c, j) => (
            <span
              key={j}
              className="absolute h-2 w-2"
              style={{
                ...(c as any),
                borderColor: b.color,
                borderStyle: "solid",
                borderWidth: `${c.t !== undefined ? 2 : 0}px ${c.r !== undefined ? 2 : 0}px ${c.b !== undefined ? 2 : 0}px ${c.l !== undefined ? 2 : 0}px`,
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* HUD overlays */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded bg-black/70 px-2 py-1 text-[10px] font-mono text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> {feed.id} ·{" "}
        {feed.name.toUpperCase()}
      </div>
      <div className="absolute top-2 right-2 rounded bg-black/70 px-2 py-1 text-[10px] font-mono text-cyan-300">
        {ts}
      </div>
      <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-[10px] font-mono text-white/80">
        YOLOv11 · {feed.fps} FPS
      </div>
      <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-[10px] font-mono text-white/80">
        ND 1 · F 5.6 · 1080p
      </div>

      {big && onExpand && (
        <button
          onClick={onExpand}
          className="absolute top-2 right-32 grid h-7 w-7 place-items-center rounded bg-black/70 text-white/80 hover:text-white"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function SyntheticScene() {
  return (
    <svg
      viewBox="0 0 160 90"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full opacity-80"
    >
      <defs>
        <linearGradient id="road" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0B1A33" />
          <stop offset="100%" stopColor="#04101F" />
        </linearGradient>
        <linearGradient id="cont" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2A3F5F" />
          <stop offset="100%" stopColor="#16243D" />
        </linearGradient>
      </defs>
      <rect x="0" y="55" width="160" height="35" fill="url(#road)" />
      {/* lane dashes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={i * 22 + 4} y={72} width="10" height="1.5" fill="#FBBF24" opacity="0.5" />
      ))}
      {/* container body */}
      <rect
        x="20"
        y="22"
        width="90"
        height="38"
        rx="1.5"
        fill="url(#cont)"
        stroke="#3A5680"
        strokeWidth="0.5"
      />
      {/* corrugation */}
      {Array.from({ length: 16 }).map((_, i) => (
        <line
          key={i}
          x1={22 + i * 5.5}
          y1="24"
          x2={22 + i * 5.5}
          y2="58"
          stroke="#0B1A33"
          strokeWidth="0.4"
          opacity="0.7"
        />
      ))}
      {/* doors */}
      <rect
        x="100"
        y="24"
        width="10"
        height="34"
        fill="#1B2D4D"
        stroke="#3A5680"
        strokeWidth="0.3"
      />
      {/* cab */}
      <rect
        x="110"
        y="32"
        width="22"
        height="28"
        rx="2"
        fill="#1F3354"
        stroke="#3A5680"
        strokeWidth="0.5"
      />
      <rect x="113" y="36" width="14" height="9" fill="#67E8F9" opacity="0.35" />
      {/* wheels */}
      {[26, 46, 66, 86, 116, 128].map((x) => (
        <circle key={x} cx={x} cy={62} r="3" fill="#0A0F1A" stroke="#3A5680" strokeWidth="0.4" />
      ))}
      {/* plate */}
      <rect x="118" y="55" width="12" height="3.5" fill="#FBBF24" />
    </svg>
  );
}

function AnalysisCards({ feed }: { feed: CamFeed }) {
  return (
    <div className="space-y-3 text-xs">
      <Card icon={<ContainerIcon className="h-4 w-4" />} title="Container" accent="#10B981">
        <Row k="Code (OCR)" v={feed.container.code} mono confidence={feed.container.ocr} />
        <Row k="Carrier" v={feed.container.carrier} />
        <Row k="Type / ISO" v={`${feed.container.type} · ${feed.container.iso}`} />
        <Row k="Gross weight" v={feed.container.weight} />
        <Row k="Seal" v={feed.container.seal} mono />
        <Row
          k="Damage"
          v={`${feed.container.damage}`}
          badge={feed.container.damage === "None" ? "ok" : "warn"}
          confidence={feed.container.damageConf}
        />
        <Row
          k="Origin → Dest"
          v={`${feed.container.origin} → ${feed.container.destination}`}
          small
        />
      </Card>

      <Card icon={<Truck className="h-4 w-4" />} title="Truck / Vehicle" accent="#67E8F9">
        <Row k="Number plate" v={feed.truck.plate} mono big confidence={feed.truck.plateConf} />
        <Row k="Make / Model" v={feed.truck.make} />
        <Row k="Color · Axle" v={`${feed.truck.color} · ${feed.truck.axle}`} />
        <Row k="Speed" v={feed.truck.speed} />
      </Card>

      <Card icon={<User className="h-4 w-4" />} title="Driver" accent="#A78BFA">
        <div className="flex items-center gap-3 pb-2">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 text-xs font-bold text-white">
            {feed.driver.photo}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{feed.driver.name}</div>
            <div className="truncate text-[10px] text-muted-foreground">{feed.driver.company}</div>
          </div>
          <ClearanceBadge c={feed.driver.clearance} />
        </div>
        <Row k="License" v={feed.driver.license} mono />
        <Row k="Phone" v={feed.driver.phone} mono />
        <Row k="Trips logged" v={String(feed.driver.trips)} />
      </Card>
    </div>
  );
}

function ClearanceBadge({ c }: { c: CamFeed["driver"]["clearance"] }) {
  const map = {
    VERIFIED: { c: "var(--color-success)", I: ShieldCheck },
    PENDING: { c: "#D97706", I: Clock },
    FLAGGED: { c: "var(--color-destructive)", I: AlertTriangle },
  } as const;
  const s = map[c];
  const I = s.I;
  return (
    <span
      className="ml-auto inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-bold"
      style={{ background: `color-mix(in oklab, ${s.c} 14%, transparent)`, color: s.c }}
    >
      <I className="h-3 w-3" /> {c}
    </span>
  );
}

function Card({
  icon,
  title,
  accent,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className="mb-2 flex items-center gap-2">
        <span
          className="grid h-6 w-6 place-items-center rounded"
          style={{ background: `color-mix(in oklab, ${accent} 14%, transparent)`, color: accent }}
        >
          {icon}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider">{title}</span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Row({
  k,
  v,
  mono,
  big,
  small,
  confidence,
  badge,
}: {
  k: string;
  v: string;
  mono?: boolean;
  big?: boolean;
  small?: boolean;
  confidence?: number;
  badge?: "ok" | "warn";
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</span>
      <span
        className={`flex items-center gap-1.5 ${mono ? "font-mono" : ""} ${big ? "text-sm font-bold" : small ? "text-[11px]" : "text-xs font-medium"}`}
      >
        {badge && (
          <span
            className={`rounded px-1 py-0.5 text-[9px] font-bold ${badge === "ok" ? "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]" : "bg-[color:var(--color-destructive)]/15 text-[color:var(--color-destructive)]"}`}
          >
            {v}
          </span>
        )}
        {!badge && <span className="truncate">{v}</span>}
        {confidence !== undefined && confidence > 0 && (
          <span className="rounded bg-muted px-1 py-0.5 font-mono text-[9px] text-muted-foreground">
            {(confidence * 100).toFixed(0)}%
          </span>
        )}
      </span>
    </div>
  );
}

function ExpandedModal({ feed, onClose }: { feed: CamFeed; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="grid w-full max-w-7xl grid-cols-1 lg:grid-cols-3 gap-4 rounded-xl border border-border bg-card p-4 shadow-2xl"
      >
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Fullscreen Analysis
              </div>
              <h3 className="font-display text-lg font-semibold">
                {feed.id} · {feed.name}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <LiveBadge status={feed.status} />
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-md border border-border bg-background hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <FeedFrame feed={feed} />
          <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
            {[
              ["FPS", feed.fps],
              ["Latency", "38ms"],
              ["Detections", feed.boxes.length],
              [
                "Confidence",
                `${Math.round((feed.boxes.reduce((s, b) => s + b.conf, 0) / feed.boxes.length) * 100)}%`,
              ],
            ].map(([l, v]) => (
              <div key={l as string} className="rounded border border-border bg-background p-2">
                <div className="text-muted-foreground">{l}</div>
                <div className="text-sm font-semibold">{v}</div>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-border bg-background p-3">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
              <ScanLine className="h-3.5 w-3.5 text-cyan-400" /> Inference timeline
            </div>
            <div className="space-y-1.5 text-[11px]">
              {[
                ["14:32:18.041", "Vehicle entered ROI", "info"],
                ["14:32:18.214", `Plate detected · ${feed.truck.plate}`, "ok"],
                ["14:32:18.331", `Container OCR · ${feed.container.code}`, "ok"],
                [
                  "14:32:18.502",
                  `Damage classifier · ${feed.container.damage}`,
                  feed.container.damage === "None" ? "ok" : "warn",
                ],
                [
                  "14:32:18.611",
                  `Driver matched · ${feed.driver.name}`,
                  feed.driver.clearance === "VERIFIED" ? "ok" : "warn",
                ],
                ["14:32:18.702", "Gate workflow dispatched", "info"],
              ].map(([t, m, k]) => (
                <div key={t as string} className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">{t}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${k === "ok" ? "bg-[color:var(--color-success)]" : k === "warn" ? "bg-[color:var(--color-destructive)]" : "bg-cyan-400"}`}
                  />
                  <span className="flex-1">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[88vh] pr-1">
          <AnalysisCards feed={feed} />
          <Card icon={<MapPin className="h-4 w-4" />} title="Routing" accent="#C4B5FD">
            <Row k="Origin" v={feed.container.origin} small />
            <Row k="Destination" v={feed.container.destination} small />
            <Row k="Assigned bay" v="Yard A · Stack 12 · Tier 3" small />
            <Row k="ETA gate-out" v="14:48 IST" small />
          </Card>
          <Card icon={<Gauge className="h-4 w-4" />} title="Risk score" accent="#8B5CF6">
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span>Composite</span>
              <span className="font-mono font-bold">
                {feed.driver.clearance === "PENDING" ? "0.42" : "0.08"}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full"
                style={{
                  width: feed.driver.clearance === "PENDING" ? "42%" : "8%",
                  background:
                    feed.driver.clearance === "PENDING" ? "#D97706" : "var(--color-success)",
                }}
              />
            </div>
            <div className="mt-2 text-[10px] text-muted-foreground">
              Combines OCR confidence, damage class, driver clearance and historical incidents.
            </div>
          </Card>
          <button
            onClick={onClose}
            className="w-full rounded-md bg-[color:var(--color-primary)] py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Approve & dispatch
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
