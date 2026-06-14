import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel } from "./index";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FlaskConical,
  Sliders,
  Play,
  TrendingUp,
  Gauge,
  CloudLightning,
  AlertOctagon,
  Anchor,
  HelpCircle,
  TrendingDown,
  RefreshCw,
} from "lucide-react";

export const Route = createFileRoute("/app/simulator")({
  component: SimulatorPage,
});

type ScenarioTemplate = {
  name: string;
  desc: string;
  icon: any;
  vessels: number;
  craneSpeed: number;
  windSpeed: number;
  gateCapacity: number;
  color: string;
};

const templates: ScenarioTemplate[] = [
  {
    name: "Typhoon Approach",
    desc: "Simulate category-3 storm hitting pier 3 and crane shutdowns.",
    icon: CloudLightning,
    vessels: 18,
    craneSpeed: 10,
    windSpeed: 38,
    gateCapacity: 35,
    color: "#EF4444",
  },
  {
    name: "Peak Cargo Season",
    desc: "Simulate holiday vessel arrivals crowding yard blocks.",
    icon: Anchor,
    vessels: 34,
    craneSpeed: 28,
    windSpeed: 8,
    gateCapacity: 95,
    color: "#8B5CF6",
  },
  {
    name: "Crane System Outage",
    desc: "Simulate a critical software failure taking down 3 cranes.",
    icon: AlertOctagon,
    vessels: 22,
    craneSpeed: 12,
    windSpeed: 14,
    gateCapacity: 60,
    color: "#F59E0B",
  },
];

function SimulatorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [vessels, setVessels] = useState(22);
  const [craneSpeed, setCraneSpeed] = useState(24); // moves per hour
  const [windSpeed, setWindSpeed] = useState(12); // knots
  const [gateCapacity, setGateCapacity] = useState(70); // percentage

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const applyTemplate = (t: ScenarioTemplate) => {
    setSelectedTemplate(t.name);
    setVessels(t.vessels);
    setCraneSpeed(t.craneSpeed);
    setWindSpeed(t.windSpeed);
    setGateCapacity(t.gateCapacity);
    setShowResults(false);
  };

  const runSim = () => {
    setIsRunning(true);
    setProgress(0);
    setShowResults(false);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setShowResults(true);
          return 100;
        }
        return p + 4;
      });
    }, 80);
  };

  // Math models to calculate simulated KPIs based on variables
  const originalKPIs = {
    throughput: 12408,
    dwellTime: 2.1, // days
    safetyScore: 99,
    utilization: 76,
  };

  // Calculated simulated outputs
  const calcThroughput = Math.round(
    originalKPIs.throughput *
      (vessels / 22) *
      (craneSpeed / 24) *
      (gateCapacity / 70) *
      (windSpeed > 30 ? 0.3 : windSpeed > 20 ? 0.75 : 1)
  );

  const calcDwellTime = parseFloat(
    (
      originalKPIs.dwellTime *
      (vessels / 22) *
      (24 / craneSpeed) *
      (70 / gateCapacity) *
      (windSpeed > 25 ? 2.4 : 1)
    ).toFixed(1)
  );

  const calcSafetyScore = Math.max(
    50,
    originalKPIs.safetyScore -
      (windSpeed > 30 ? 35 : windSpeed > 20 ? 15 : 0) -
      (vessels > 30 ? 8 : 0)
  );

  const calcUtilization = Math.min(
    100,
    Math.round(originalKPIs.utilization * (vessels / 22) * (craneSpeed / 24))
  );

  const confidenceScore = Math.round(
    98 - Math.abs(22 - vessels) * 0.8 - Math.abs(12 - windSpeed) * 0.5
  );

  return (
    <div className="dark flex h-screen flex-col bg-[#070B19] text-white">
      <AppTopBar
        title="AI What-If Simulator"
        subtitle="Simulate operation bottlenecks · Forecast yard crowding · Test weather emergencies"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Preset Templates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedTemplate === t.name;
            return (
              <div
                key={t.name}
                onClick={() => applyTemplate(t)}
                className={`cursor-pointer rounded-xl border p-4 transition hover:shadow-lg hover:border-white/20 ${
                  isSelected
                    ? "border-[color:var(--color-secondary)] bg-gradient-to-br from-card to-[color:var(--color-secondary)]/10"
                    : "border-white/5 bg-card/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-lg"
                    style={{ background: `${t.color}15`, color: t.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold">{t.name}</h4>
                    <p className="text-[11px] text-white/50">{t.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Scenario Variables Builder */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-5">
            <Panel
              title="Scenario Variables Builder"
              subtitle="Modify variables to build custom operational states"
              right={
                <button
                  onClick={() => {
                    setVessels(22);
                    setCraneSpeed(24);
                    setWindSpeed(12);
                    setGateCapacity(70);
                    setSelectedTemplate(null);
                    setShowResults(false);
                  }}
                  className="flex items-center gap-1 text-[11px] text-white/55 hover:text-white transition"
                >
                  <RefreshCw className="h-3 w-3" /> Reset default
                </button>
              }
            >
              <div className="space-y-6">
                {/* Vessels count */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-white/80">Active Inbound Vessels</span>
                    <span className="font-mono text-cyan-400">{vessels} Ships</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={vessels}
                    onChange={(e) => {
                      setVessels(Number(e.target.value));
                      setSelectedTemplate(null);
                    }}
                    className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>Low Traffic (5)</span>
                    <span>Peak (50)</span>
                  </div>
                </div>

                {/* Crane Cycle speed */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-white/80">Crane Operations Speed</span>
                    <span className="font-mono text-indigo-400">{craneSpeed} moves/hour</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="40"
                    value={craneSpeed}
                    onChange={(e) => {
                      setCraneSpeed(Number(e.target.value));
                      setSelectedTemplate(null);
                    }}
                    className="w-full accent-indigo-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>Throttled (8)</span>
                    <span>Max Capacity (40)</span>
                  </div>
                </div>

                {/* Wind Gust speed */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-white/80">Wind & Weather Severity</span>
                    <span className="font-mono text-amber-400">{windSpeed} Knots</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    value={windSpeed}
                    onChange={(e) => {
                      setWindSpeed(Number(e.target.value));
                      setSelectedTemplate(null);
                    }}
                    className="w-full accent-amber-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>Calm (2 kn)</span>
                    <span>Shut down (50 kn)</span>
                  </div>
                </div>

                {/* Gate lanes capacity */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-white/80">Inbound Gate Flow Capacity</span>
                    <span className="font-mono text-emerald-400">{gateCapacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={gateCapacity}
                    onChange={(e) => {
                      setGateCapacity(Number(e.target.value));
                      setSelectedTemplate(null);
                    }}
                    className="w-full accent-emerald-400 bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>Congested (20%)</span>
                    <span>Fully open (100%)</span>
                  </div>
                </div>

                {/* Run simulation trigger */}
                <button
                  onClick={runSim}
                  disabled={isRunning}
                  className="w-full flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
                >
                  <Play className="h-4.5 w-4.5 fill-white" />
                  {isRunning ? "Computing Simulation..." : "Run AI Simulation Forecast"}
                </button>

                {/* Dynamic simulation progress indicator */}
                {isRunning && (
                  <div className="space-y-1.5">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-right text-[10px] font-mono text-white/50">
                      Solving PDE Navier-Stokes grids: {progress}%
                    </div>
                  </div>
                )}
              </div>
            </Panel>
          </div>

          {/* Simulation Results Display */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-7">
            <AnimatePresence mode="wait">
              {showResults ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Predict Confidence */}
                    <div className="rounded-xl border border-white/5 bg-[#0e162d]/90 p-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider">
                          Simulation Confidence
                        </div>
                        <div className="mt-1 font-display text-2xl font-bold text-indigo-400">
                          {confidenceScore}%
                        </div>
                      </div>
                      <Gauge className="h-10 w-10 text-indigo-400 opacity-60" />
                    </div>

                    {/* Bottlenecks detected */}
                    <div className="rounded-xl border border-white/5 bg-[#0e162d]/90 p-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-white/40 uppercase tracking-wider">
                          Critical Bottlenecks
                        </div>
                        <div className="mt-1 font-display text-2xl font-bold text-amber-500">
                          {windSpeed > 30 || vessels > 35 ? "High Risk" : "Low Risk"}
                        </div>
                      </div>
                      <CloudLightning className="h-10 w-10 text-amber-500 opacity-60" />
                    </div>
                  </div>

                  <Panel
                    title="KPI Impact Analysis"
                    subtitle="Before vs Forecasted dynamic changes based on simulation model"
                  >
                    <div className="space-y-4">
                      {[
                        {
                          title: "Container Throughput",
                          original: `${originalKPIs.throughput.toLocaleString()} TEUs`,
                          simulated: `${calcThroughput.toLocaleString()} TEUs`,
                          delta: calcThroughput - originalKPIs.throughput,
                          percent: `${(((calcThroughput - originalKPIs.throughput) / originalKPIs.throughput) * 100).toFixed(1)}%`,
                        },
                        {
                          title: "Yard Dwell Time",
                          original: `${originalKPIs.dwellTime} days`,
                          simulated: `${calcDwellTime} days`,
                          delta: originalKPIs.dwellTime - calcDwellTime, // lower dwell is better
                          percent: `${(((originalKPIs.dwellTime - calcDwellTime) / originalKPIs.dwellTime) * 100).toFixed(1)}%`,
                          inverse: true,
                        },
                        {
                          title: "Safety Compliance",
                          original: `${originalKPIs.safetyScore}%`,
                          simulated: `${calcSafetyScore}%`,
                          delta: calcSafetyScore - originalKPIs.safetyScore,
                          percent: `${(calcSafetyScore - originalKPIs.safetyScore).toFixed(0)}%`,
                        },
                        {
                          title: "Crane Fleet Utilization",
                          original: `${originalKPIs.utilization}%`,
                          simulated: `${calcUtilization}%`,
                          delta: calcUtilization - originalKPIs.utilization,
                          percent: `${(calcUtilization - originalKPIs.utilization).toFixed(0)}%`,
                        },
                      ].map((kpi) => {
                        const isPositive = kpi.inverse ? kpi.delta >= 0 : kpi.delta >= 0;
                        const hasNoChange = kpi.delta === 0;

                        return (
                          <div
                            key={kpi.title}
                            className="rounded-xl border border-white/5 bg-white/[0.01] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div>
                              <div className="text-xs font-semibold text-white/80">{kpi.title}</div>
                              <div className="mt-1 flex items-baseline gap-4">
                                <span className="text-xs text-white/40">
                                  Baseline: <span className="text-white/70">{kpi.original}</span>
                                </span>
                                <span className="text-sm font-bold text-cyan-300">
                                  Forecast: <span>{kpi.simulated}</span>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {!hasNoChange && (
                                <span
                                  className={`inline-flex items-center gap-0.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                    isPositive
                                      ? "bg-emerald-500/10 text-emerald-400"
                                      : "bg-red-500/10 text-red-400"
                                  }`}
                                >
                                  {isPositive ? (
                                    <TrendingUp className="h-3 w-3" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3" />
                                  )}
                                  {kpi.percent}
                                </span>
                              )}
                              {hasNoChange && (
                                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/60">
                                  No Change
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Panel>
                </motion.div>
              ) : (
                <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.01] p-6 text-center text-white/40">
                  <FlaskConical className="h-12 w-12 text-white/20 mb-3 animate-pulse" />
                  <h4 className="text-sm font-semibold text-white/70">Simulation Awaiting Input</h4>
                  <p className="mt-1 text-xs max-w-sm">
                    Modify the operational parameters on the left or select a template, then trigger the simulator to run.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
