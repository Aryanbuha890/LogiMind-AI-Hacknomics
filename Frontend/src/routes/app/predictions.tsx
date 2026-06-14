import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel, ChartTip } from "./index";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  ShieldAlert,
  RefreshCw,
  Activity,
  CheckCircle2,
  TrendingUp,
  Clock,
  AlertTriangle,
  Compass,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/app/predictions")({
  component: PredictionsPage,
});

type PredictVessel = {
  id: string;
  name: string;
  route: string;
  scheduledEta: string;
  predictedEta: string;
  predictedDelayMin: number;
  confidence: number;
  status: "delayed" | "on-time" | "early";
  causalFactor: string;
};

const initialVessels: PredictVessel[] = [
  {
    id: "VSL-101",
    name: "MV-Geneva",
    route: "Rotterdam - Mundra",
    scheduledEta: "16:30",
    predictedEta: "16:12",
    predictedDelayMin: -18,
    confidence: 94,
    status: "early",
    causalFactor: "Favorable ocean currents & high tailwinds in Arabian Sea.",
  },
  {
    id: "VSL-102",
    name: "MV-Oceanic-Bravo",
    route: "Singapore - Mundra",
    scheduledEta: "18:45",
    predictedEta: "19:38",
    predictedDelayMin: 53,
    confidence: 89,
    status: "delayed",
    causalFactor: "Congestion at Malacca Strait departure corridors.",
  },
  {
    id: "VSL-103",
    name: "MV-Horizon-Asia",
    route: "Shanghai - Mundra",
    scheduledEta: "21:00",
    predictedEta: "21:05",
    predictedDelayMin: 5,
    confidence: 96,
    status: "on-time",
    causalFactor: "Normal weather conditions and channel clearance.",
  },
  {
    id: "VSL-104",
    name: "MV-Centaurus",
    route: "Jebel Ali - Mundra",
    scheduledEta: "23:15",
    predictedEta: "00:08 (+1d)",
    predictedDelayMin: 53,
    confidence: 91,
    status: "delayed",
    causalFactor: "Custom clearance delay at port of origin.",
  },
  {
    id: "VSL-105",
    name: "MV-Northern-Star",
    route: "Durban - Mundra",
    scheduledEta: "02:30",
    predictedEta: "02:22",
    predictedDelayMin: -8,
    confidence: 85,
    status: "early",
    causalFactor: "Speed adjustment optimization to hit tide window.",
  },
];

const historicalAccuracy = [
  { day: "D-7", mlModel: 92, ruleBased: 76 },
  { day: "D-6", mlModel: 94, ruleBased: 74 },
  { day: "D-5", mlModel: 93, ruleBased: 78 },
  { day: "D-4", mlModel: 95, ruleBased: 75 },
  { day: "D-3", mlModel: 97, ruleBased: 79 },
  { day: "D-2", mlModel: 96, ruleBased: 77 },
  { day: "D-1", mlModel: 98, ruleBased: 75 },
];

function PredictionsPage() {
  const [vessels, setVessels] = useState(initialVessels);
  const [selectedVessel, setSelectedVessel] = useState<string>(initialVessels[1].id);

  const currentVessel = vessels.find((v) => v.id === selectedVessel) || vessels[1];

  // Cascading delays simulation waterfall data
  const cascadeData = [
    { name: "Ocean Passage Delay", val: currentVessel.predictedDelayMin > 0 ? currentVessel.predictedDelayMin : 0, color: "#3B82F6" },
    { name: "Berth Entry Wait Queue", val: currentVessel.predictedDelayMin > 0 ? Math.round(currentVessel.predictedDelayMin * 0.4) : 0, color: "#8B5CF6" },
    { name: "Crane Re-alloc Overheads", val: currentVessel.predictedDelayMin > 0 ? 15 : 0, color: "#EF4444" },
    { name: "Outbound Truck Wait Increase", val: currentVessel.predictedDelayMin > 0 ? Math.round(currentVessel.predictedDelayMin * 0.3) : 0, color: "#F59E0B" },
  ];

  return (
    <div className="dark flex h-screen flex-col bg-[#070B19] text-white">
      <AppTopBar
        title="Delay Prediction Engine"
        subtitle="Vessel ETA neural forecast · Cascading delay waterfall analysis · Accuracy auditing"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/5 bg-[#0d162d]/90 p-4">
            <div className="text-[10px] text-white/40 uppercase tracking-wider">
              ML Model ETA Accuracy
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-emerald-400">96.8%</div>
            <div className="text-[10px] text-white/50">±3.2 minutes avg deviation</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#0d162d]/90 p-4">
            <div className="text-[10px] text-white/40 uppercase tracking-wider">
              Active Delay Warnings
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-red-500">2 Vessels</div>
            <div className="text-[10px] text-white/50">Predicted delay exceeds 30 minutes</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#0d162d]/90 p-4">
            <div className="text-[10px] text-white/40 uppercase tracking-wider">
              Mitigated Cost impact
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-cyan-400">$42,900</div>
            <div className="text-[10px] text-white/50">Via dynamic yard pre-positioning</div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Vessel Predicted ETA Timeline */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-7">
            <Panel
              title="Vessel ETA Delay Timeline"
              subtitle="Live neural net estimations vs static shipping schedules"
            >
              <div className="space-y-3">
                {vessels.map((v) => {
                  const isDelayed = v.status === "delayed";
                  const isEarly = v.status === "early";
                  const isSelected = selectedVessel === v.id;

                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVessel(v.id)}
                      className={`cursor-pointer rounded-xl border p-4 transition hover:shadow-lg ${
                        isSelected
                          ? "border-[color:var(--color-secondary)] bg-gradient-to-r from-card to-[color:var(--color-secondary)]/5"
                          : "border-white/5 bg-[#0a1124]/90"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold ${
                              isDelayed
                                ? "bg-red-500/10 text-red-400"
                                : isEarly
                                  ? "bg-cyan-500/10 text-cyan-400"
                                  : "bg-emerald-500/10 text-emerald-400"
                            }`}
                          >
                            <Compass className="h-4 w-4 animate-spin-slow" />
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold">{v.name}</h4>
                              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-white/50">
                                {v.route}
                              </span>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40 font-mono">
                              <span className="flex items-center gap-1">
                                Scheduled: <span className="text-white/70">{v.scheduledEta}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                Neural Forecast: <span className="text-cyan-300 font-bold">{v.predictedEta}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              isDelayed
                                ? "bg-red-500/10 text-red-400"
                                : isEarly
                                  ? "bg-cyan-500/10 text-cyan-400"
                                  : "bg-emerald-500/10 text-emerald-400"
                            }`}
                          >
                            {isDelayed
                              ? `+${v.predictedDelayMin} min delay`
                              : isEarly
                                ? `${v.predictedDelayMin} min early`
                                : "On-Time"}
                          </span>
                          <div className="mt-1 text-[10px] text-white/40">
                            Confidence: {v.confidence}%
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>

          {/* Causal Analysis & Cascading delay waterfall */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-5 space-y-6">
            <Panel
              title={`Cascading Impact: ${currentVessel.name}`}
              subtitle="Chain reaction timelines generated by AI prediction simulator"
            >
              <div className="space-y-4">
                <div className="rounded-lg border-l-4 border-amber-500 bg-white/[0.02] p-3 text-xs leading-relaxed text-white/80">
                  <div className="font-mono text-white/40 mb-1">Causal Attribution:</div>
                  {currentVessel.causalFactor}
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">
                    Cascading Delay Waterfall (min)
                  </div>
                  {cascadeData.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white/60">{item.name}</span>
                        <span className="font-bold" style={{ color: item.color }}>
                          {item.val} min
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (item.val / 60) * 100)}%` }}
                          transition={{ duration: 0.8 }}
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-white/5 bg-[#0c1328] p-3 text-center">
                  <div className="text-[10px] text-white/40 uppercase">Total Cascading Delay</div>
                  <div className="text-xl font-bold text-red-400">
                    {cascadeData.reduce((acc, c) => acc + c.val, 0)} minutes
                  </div>
                </div>
              </div>
            </Panel>

            {/* Model Comparison Chart */}
            <Panel
              title="ETA Prediction Model Accuracy"
              subtitle="Neural Network model vs traditional static calculations"
            >
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={historicalAccuracy}>
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 9, fill: "rgba(255,255,255,0.4)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[60, 100]}
                    tick={{ fontSize: 9, fill: "rgba(255,255,255,0.4)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="mlModel" fill="#8B5CF6" name="Neural Network Model (%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ruleBased" fill="rgba(255,255,255,0.15)" name="Rule-Based Static (%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
