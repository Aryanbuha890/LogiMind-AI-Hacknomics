import { createLazyFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel, ChartTip } from "./index";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  RefreshCw,
  Activity,
  TrendingUp,
  Compass,
  Sparkles,
  CloudLightning,
  Eye,
  CloudRain,
  Thermometer,
  Anchor,
  Terminal,
  Database,
  Cpu,
  BadgeAlert,
  Percent,
  Settings2,
  Clock,
} from "lucide-react";

export const Route = createLazyFileRoute("/app/predictions")({
  component: PredictionsPage,
});

type PredictVessel = {
  id: string;
  name: string;
  route: string;
  vessel_type: string;
  cargo_teu: number;
  scheduled_eta: string;
  predicted_eta: string;
  delay_minutes: number;
  confidence: number;
  status: "delayed" | "on-time" | "early";
  causal_factor: string;
};

const defaultHistoricalAccuracy = [
  { day: "D-7", mlModel: 95.8, ruleBased: 76 },
  { day: "D-6", mlModel: 96.2, ruleBased: 74 },
  { day: "D-5", mlModel: 96.3, ruleBased: 78 },
  { day: "D-4", mlModel: 96.5, ruleBased: 75 },
  { day: "D-3", mlModel: 96.7, ruleBased: 79 },
  { day: "D-2", mlModel: 96.6, ruleBased: 77 },
  { day: "D-1", mlModel: 96.8, ruleBased: 75 },
];

const BACKEND_URL = "http://127.0.0.1:8000";

function PredictionsPage() {
  // Input parameters (Weather & Operations)
  const [windSpeed, setWindSpeed] = useState(4.2);
  const [visibility, setVisibility] = useState(10000);
  const [precipitation, setPrecipitation] = useState(0.0);
  const [temperature, setTemperature] = useState(16.5);
  const [vesselQueue, setVesselQueue] = useState(3);
  const [yardOccupancy, setYardOccupancy] = useState(65.0);
  const [isHoliday, setIsHoliday] = useState<number>(0);
  const [city, setCity] = useState("Rotterdam");

  // Output prediction state variables
  const [predictions, setPredictions] = useState<any>({
    crane_efficiency_teu_hour: 42.0,
    vessel_turnaround_hours: 14.0,
    rail_dispatch_delay_mins: 15.0,
    eta_delay_minutes: 0.0,
  });
  const [vessels, setVessels] = useState<PredictVessel[]>([]);
  const [aiReport, setAiReport] = useState<string>("");
  const [kpis, setKpis] = useState<any>({
    model_accuracy: 96.8,
    delay_warnings: 0,
    cost_impact_usd: 0,
  });
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // Redesign state: Toggle between telemetry display and manual sliders override
  const [showOverrides, setShowOverrides] = useState(false);
  const [secondsToNextRefresh, setSecondsToNextRefresh] = useState(15);
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(true);

  // Load predictions on mount
  useEffect(() => {
    fetchPredictions(true); // silent fetch on load
  }, []);

  // Automated background refresh cycle simulating real-time inference polling
  useEffect(() => {
    if (!isAutoSyncEnabled) return;

    const timer = setInterval(() => {
      // Freeze sync countdown if browser tab is in background
      if (document.hidden) return;

      setSecondsToNextRefresh((prev) => {
        if (prev <= 1) {
          fetchPredictions(true); // run background fetch
          return 15; // reset timer to 15 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoSyncEnabled, windSpeed, visibility, precipitation, temperature, vesselQueue, yardOccupancy, isHoliday]);

  const fetchPredictions = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wind_speed: windSpeed,
          visibility: visibility,
          precipitation: precipitation,
          temperature: temperature,
          vessel_queue: vesselQueue,
          yard_occupancy: yardOccupancy,
          is_holiday: isHoliday,
        }),
      });

      if (!res.ok) {
        let errorDetail = `HTTP ${res.status}`;
        try {
          const errData = await res.json();
          if (errData && errData.detail) {
            errorDetail = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
          }
        } catch (_) {}
        throw new Error(errorDetail);
      }

      const response = await res.json();
      if (response.status === "success") {
        setPredictions(response.predictions);
        setVessels(response.vessels);
        setAiReport(response.ai_report);
        setKpis(response.kpis);

        if (response.vessels.length > 0) {
          const exists = response.vessels.some((v: any) => v.id === selectedVessel);
          if (!exists) {
            setSelectedVessel(response.vessels[0].id);
          }
        }
        if (!silent) {
          toast.success("ML predictive model calculations complete!");
        }
      } else {
        toast.error("Prediction failed: " + (response.message || "Unknown error"));
      }
    } catch (err: any) {
      console.error(err);
      if (!silent) {
        toast.error(`Error connecting to Python backend: ${err.message}. Make sure server is running on port 8000!`);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const syncWeather = async () => {
    setWeatherLoading(true);
    const toastId = toast.loading(`Importing live weather telemetry for ${city}...`);
    try {
      const res = await fetch(`${BACKEND_URL}/api/weather`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          vessels: vesselQueue,
          yard: yardOccupancy,
        }),
      });

      toast.dismiss(toastId);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const response = await res.json();
      if (response.status === "success") {
        const { weather } = response;
        setWindSpeed(Number(weather.wind_speed.toFixed(1)));
        setVisibility(Number(weather.visibility.toFixed(0)));
        setPrecipitation(Number(weather.precipitation.toFixed(1)));
        setTemperature(Number(weather.temperature.toFixed(1)));
        toast.success(`Weather synced for ${city}!`);

        // Automatically run predictions after sync completes
        setLoading(true);
        const predictRes = await fetch(`${BACKEND_URL}/api/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wind_speed: weather.wind_speed,
            visibility: weather.visibility,
            precipitation: weather.precipitation,
            temperature: weather.temperature,
            vessel_queue: vesselQueue,
            yard_occupancy: yardOccupancy,
            is_holiday: isHoliday,
          }),
        });
        const predictData = await predictRes.json();
        if (predictData.status === "success") {
          setPredictions(predictData.predictions);
          setVessels(predictData.vessels);
          setAiReport(predictData.ai_report);
          setKpis(predictData.kpis);
          if (predictData.vessels.length > 0) {
            setSelectedVessel(predictData.vessels[0].id);
          }
          toast.success("Predictions computed with synced weather metrics!");
          setSecondsToNextRefresh(15);
        }
      } else {
        toast.error(`Weather sync failed: ${response.message || "Unknown error"}`);
      }
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(`Error connecting to weather API: ${err.message}`);
    } finally {
      setWeatherLoading(false);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setWindSpeed(4.2);
    setVisibility(10000);
    setPrecipitation(0.0);
    setTemperature(16.5);
    setVesselQueue(3);
    setYardOccupancy(65.0);
    setIsHoliday(0);
    toast.success("Parameters reset to default baseline");
    setSecondsToNextRefresh(15);
  };

  const currentVessel = vessels.find((v) => v.id === selectedVessel) || vessels[0] || {
    id: "VSL-101",
    name: "MV-Geneva",
    route: "Rotterdam → Mundra",
    vessel_type: "Container",
    cargo_teu: 2800,
    scheduled_eta: "16:30",
    predicted_eta: "16:30",
    delay_minutes: 0.0,
    confidence: 95,
    status: "on-time",
    causal_factor: "Normal operations."
  };

  const cascadeData = [
    { name: "Ocean Passage Delay", val: currentVessel.delay_minutes > 0 ? Math.round(currentVessel.delay_minutes) : 0, color: "#3B82F6" },
    { name: "Berth Entry Wait Queue", val: currentVessel.delay_minutes > 0 ? Math.round(currentVessel.delay_minutes * 0.4) : 0, color: "#8B5CF6" },
    { name: "Crane Re-alloc Overheads", val: currentVessel.delay_minutes > 0 ? 15 : 0, color: "#EF4444" },
    { name: "Outbound Truck Wait Increase", val: currentVessel.delay_minutes > 0 ? Math.round(currentVessel.delay_minutes * 0.3) : 0, color: "#F59E0B" },
  ];

  // Logic to determine status style of live port conditions
  const sensorStatus = (label: string, val: number) => {
    if (label === "Wind") {
      if (val > 22) return { text: "CRITICAL", color: "text-red-400 bg-red-500/10 border-red-500/20" };
      if (val > 12) return { text: "ALERT", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
      return { text: "OPTIMAL", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    }
    if (label === "Visibility") {
      if (val < 1500) return { text: "CRITICAL", color: "text-red-400 bg-red-500/10 border-red-500/20 animate-pulse" };
      if (val < 4000) return { text: "ALERT", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
      return { text: "CLEAR", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    }
    if (label === "Precipitation") {
      if (val > 8.0) return { text: "HEAVY", color: "text-red-400 bg-red-500/10 border-red-500/20" };
      if (val > 2.0) return { text: "MODERATE", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
      return { text: "DRY", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    }
    if (label === "Vessel Queue") {
      if (val > 8) return { text: "CONGESTED", color: "text-red-400 bg-red-500/10 border-red-500/20" };
      if (val > 4) return { text: "WARNING", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
      return { text: "NORMAL", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    }
    if (label === "Yard Occupancy") {
      if (val > 85) return { text: "CRITICAL", color: "text-red-400 bg-red-500/10 border-red-500/20" };
      if (val > 70) return { text: "WARNING", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
      return { text: "OPTIMAL", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    }
    return { text: "NOMINAL", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
  };

  return (
    <div className="dark flex h-screen flex-col bg-white text-slate-900 overflow-hidden">
      <AppTopBar
        title="Delay Prediction Engine"
        subtitle="Vessel ETA neural forecast · Cascading delay waterfall analysis · Accuracy auditing"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Live AI Inference Active Indicator Bar */}
        <div className="relative overflow-hidden rounded-xl border border-indigo-500/10 bg-indigo-500/[0.02] p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-450 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <div className="text-xs font-semibold text-white/90 flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-indigo-400 animate-spin" />
                <span>AI Live Inference Active</span>
                <span className="rounded bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 text-[8.5px] font-mono text-indigo-300">XGBoost & RF Regressors</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Continuous schedule forecasting and cascade delays recalculating dynamically.</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 self-end md:self-auto">
            <button
              onClick={() => setIsAutoSyncEnabled(!isAutoSyncEnabled)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                isAutoSyncEnabled 
                  ? "bg-emerald-50 text-emerald-400 border-emerald-500/20 hover:bg-emerald-100" 
                  : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${isAutoSyncEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'}`} />
              {isAutoSyncEnabled ? "Auto-Sync: Active" : "Auto-Sync: Paused"}
            </button>

            {isAutoSyncEnabled && (
              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                Sync in: <span className="text-cyan-400 font-bold w-4 text-center">{secondsToNextRefresh}s</span>
              </span>
            )}
            <button
              onClick={() => {
                fetchPredictions(false);
                setSecondsToNextRefresh(15);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:text-white hover:bg-slate-100 transition cursor-pointer font-semibold"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Force Recalculate
            </button>
          </div>
        </div>

        {/* TOP STATUS BAR: Live Telemetry Feeds */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 bg-white/60 border border-white/[0.06] rounded-xl p-3 shadow-md">
          {/* Active Port City */}
          <div className="flex flex-col justify-center px-3 py-1 border-r border-slate-200 last:border-none">
            <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">ACTIVE PORT</span>
            <span className="text-xs font-bold text-cyan-400 mt-0.5 truncate uppercase flex items-center gap-1">
              <Anchor className="h-3 w-3" />
              {city}
            </span>
          </div>

          {/* Wind Speed */}
          <div className="flex flex-col justify-center px-3 py-1 border-r border-slate-200 last:border-none">
            <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">WIND SPEED</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-mono font-bold text-white/90">{windSpeed} m/s</span>
              <span className={`px-1.5 py-0.2 rounded text-[7px] font-bold font-mono tracking-wider ${sensorStatus("Wind", windSpeed).color}`}>
                {sensorStatus("Wind", windSpeed).text}
              </span>
            </div>
          </div>

          {/* Visibility */}
          <div className="flex flex-col justify-center px-3 py-1 border-r border-slate-200 last:border-none">
            <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">VISIBILITY</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-mono font-bold text-white/90">{visibility.toLocaleString()} m</span>
              <span className={`px-1.5 py-0.2 rounded text-[7px] font-bold font-mono tracking-wider ${sensorStatus("Visibility", visibility).color}`}>
                {sensorStatus("Visibility", visibility).text}
              </span>
            </div>
          </div>

          {/* Precipitation */}
          <div className="flex flex-col justify-center px-3 py-1 border-r border-slate-200 last:border-none">
            <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">RAIN/SNOW</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-mono font-bold text-white/90">{precipitation} mm/h</span>
              <span className={`px-1.5 py-0.2 rounded text-[7px] font-bold font-mono tracking-wider ${sensorStatus("Precipitation", precipitation).color}`}>
                {sensorStatus("Precipitation", precipitation).text}
              </span>
            </div>
          </div>

          {/* Temperature */}
          <div className="flex flex-col justify-center px-3 py-1 border-r border-slate-200 last:border-none">
            <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">TEMPERATURE</span>
            <span className="text-xs font-mono font-bold text-white/90 mt-0.5">{temperature}°C</span>
          </div>

          {/* Vessel Queue */}
          <div className="flex flex-col justify-center px-3 py-1 border-r border-slate-200 last:border-none">
            <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">VESSEL QUEUE</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-mono font-bold text-white/90">{vesselQueue} ships</span>
              <span className={`px-1.5 py-0.2 rounded text-[7px] font-bold font-mono tracking-wider ${sensorStatus("Vessel Queue", vesselQueue).color}`}>
                {sensorStatus("Vessel Queue", vesselQueue).text}
              </span>
            </div>
          </div>

          {/* Yard Occupancy */}
          <div className="flex flex-col justify-center px-3 py-1 border-r border-slate-200 last:border-none">
            <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">YARD FILL</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-mono font-bold text-white/90">{yardOccupancy}%</span>
              <span className={`px-1.5 py-0.2 rounded text-[7px] font-bold font-mono tracking-wider ${sensorStatus("Yard Occupancy", yardOccupancy).color}`}>
                {sensorStatus("Yard Occupancy", yardOccupancy).text}
              </span>
            </div>
          </div>

          {/* Override Action */}
          <div className="flex items-center justify-end px-3 py-1 last:border-none col-span-2 md:col-span-4 lg:col-span-1">
            <button
              onClick={() => setShowOverrides(true)}
              className="flex items-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-400 hover:text-white hover:bg-cyan-600 transition cursor-pointer font-bold shadow-[0_0_12px_rgba(6,182,212,0.1)]"
            >
              <Settings2 className="h-3.5 w-3.5" />
              <span>Overrides</span>
            </button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white/90 p-5 shadow-lg">
            <div className="absolute right-3 top-3 text-emerald-400 opacity-20"><Percent className="h-10 w-10" /></div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              ML Model ETA Accuracy
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-emerald-400">{kpis.model_accuracy}%</div>
            <div className="text-[10px] text-slate-500 mt-1">Average validation test R² score</div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white/90 p-5 shadow-lg">
            <div className="absolute right-3 top-3 text-red-500 opacity-20"><BadgeAlert className="h-10 w-10" /></div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Active Delay Warnings
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-red-500">{kpis.delay_warnings} Vessels</div>
            <div className="text-[10px] text-slate-500 mt-1">Predicted delay exceeds 30 minutes</div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white/90 p-5 shadow-lg">
            <div className="absolute right-3 top-3 text-cyan-400 opacity-20"><TrendingUp className="h-10 w-10" /></div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              Mitigated Cost Impact
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-cyan-400">
              ${kpis.cost_impact_usd.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Dynamic yard pre-positioning savings</div>
          </div>
        </div>

        {/* Live Operational Speeds Bar */}
        <div className="grid grid-cols-3 gap-3.5 border border-slate-200 bg-slate-1000 rounded-xl p-3.5 shadow-md animate-pulse-subtle">
          <div className="text-center p-2.5 rounded-lg bg-white">
            <div className="text-[9px] text-slate-500 uppercase">Crane Efficiency</div>
            <div className="text-lg font-bold text-amber-400 mt-0.5 font-display">
              {loading ? "..." : `${predictions.crane_efficiency_teu_hour.toFixed(1)} TEU/hr`}
            </div>
          </div>
          <div className="text-center p-2.5 rounded-lg bg-white">
            <div className="text-[9px] text-slate-500 uppercase">Vessel Turnaround</div>
            <div className="text-lg font-bold text-cyan-400 mt-0.5 font-display">
              {loading ? "..." : `${predictions.vessel_turnaround_hours.toFixed(1)} hrs`}
            </div>
          </div>
          <div className="text-center p-2.5 rounded-lg bg-white">
            <div className="text-[9px] text-slate-500 uppercase">Rail Dispatch Delay</div>
            <div className="text-lg font-bold text-purple-400 mt-0.5 font-display">
              {loading ? "..." : `${predictions.rail_dispatch_delay_mins.toFixed(0)} min`}
            </div>
          </div>
        </div>

        {/* Main Interface Layout - 3 Column Command Dashboard */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* COLUMN 1: Vessel ETA Delay Timeline (col-span-4) */}
          <div className="col-span-12 lg:col-span-4">
            <Panel
              title="Vessel ETA Delay Timeline"
              subtitle="Live neural net estimations vs static shipping schedules"
            >
              <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                {loading ? (
                  [1, 2, 3, 4].map((n) => (
                    <div key={n} className="animate-pulse rounded-xl border border-slate-200 bg-white/90 p-4 space-y-2">
                      <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  ))
                ) : vessels.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-xs">
                    No vessels calculated.
                  </div>
                ) : (
                  vessels.map((v) => {
                    const isDelayed = v.status === "delayed";
                    const isEarly = v.status === "early";
                    const isSelected = selectedVessel === v.id;

                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVessel(v.id)}
                        className={`cursor-pointer rounded-xl border p-4 transition duration-200 hover:shadow-lg ${
                          isSelected
                            ? "border-cyan-500/50 bg-white/80 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                            : "border-slate-200 bg-white/90 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <span
                              className={`mt-0.5 inline-flex h-6.5 w-6.5 items-center justify-center rounded-lg text-[10px] font-bold ${
                                isDelayed
                                  ? "bg-red-500/10 text-red-400"
                                  : isEarly
                                    ? "bg-cyan-500/10 text-cyan-400"
                                    : "bg-emerald-500/10 text-emerald-400"
                                }`}
                            >
                              <Compass className="h-3.5 w-3.5" />
                            </span>
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="text-xs font-bold text-slate-900">{v.name}</h4>
                                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[8.5px] text-slate-500 font-medium">
                                  {v.route}
                                </span>
                              </div>
                              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10.5px] text-slate-500 font-mono">
                                <span>Sched: <span className="text-slate-600">{v.scheduled_eta}</span></span>
                                <span>Neural: <span className="text-cyan-300 font-bold">{v.predicted_eta}</span></span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                isDelayed
                                  ? "bg-red-500/10 text-red-400 border border-red-500/25"
                                  : isEarly
                                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/25"
                                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                              }`}
                            >
                              {isDelayed
                                ? `+${v.delay_minutes.toFixed(0)} min`
                                : isEarly
                                  ? `${v.delay_minutes.toFixed(0)} min`
                                  : "ON-TIME"}
                            </span>
                            <div className="mt-1 text-[9px] text-slate-500 font-mono">
                              {v.confidence}% Conf
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Panel>
          </div>

          {/* COLUMN 2: Selected Vessel Cascading Impact (col-span-4) */}
          <div className="col-span-12 lg:col-span-4">
            <Panel
              title={`Cascading Impact: ${currentVessel.name}`}
              subtitle="Timeline ripple effects calculated from operational parameters"
            >
              <div className="space-y-5">
                <div className="rounded-lg border-l-4 border-amber-500 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 font-mono">
                  <div className="text-[10px] text-slate-500 mb-1">Causal Attribution:</div>
                  {loading ? "Calculating..." : currentVessel.causal_factor}
                </div>

                <div className="space-y-3.5">
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                    Cascading Delay Waterfall (min)
                  </div>
                  {cascadeData.map((item) => (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-600">{item.name}</span>
                        <span className="font-bold" style={{ color: item.color }}>
                          {loading ? "..." : `${item.val} min`}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: loading ? "0%" : `${Math.min(100, (item.val / 60) * 100)}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
                  <div className="text-[9px] text-slate-500 uppercase font-semibold">Total Cascading Delay</div>
                  <div className="text-2xl font-bold text-red-400 font-display mt-0.5">
                    {loading ? "..." : `${cascadeData.reduce((acc, c) => acc + c.val, 0)} minutes`}
                  </div>
                </div>
              </div>
            </Panel>
          </div>

          {/* COLUMN 3: AI Intelligence Dossier & Model Accuracy Chart (col-span-4) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* AI Operational Analysis report (Gemini) */}
            <Panel
              title="AI Operational Intelligence Dossier"
              subtitle="Generative real-time cascade reasoning & mitigation analysis"
            >
              <div className="relative overflow-hidden rounded-xl border border-indigo-500/20 bg-white p-4.5 font-mono text-xs leading-relaxed min-h-[220px] max-h-[340px] overflow-y-auto shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.005] to-transparent pointer-events-none opacity-50 bg-[length:100%_4px]" />
                
                <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2.5 mb-3.5">
                  <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-bold tracking-widest uppercase">
                    <Terminal className="h-4 w-4 animate-pulse text-indigo-400" />
                    <span>SYSTEM ANALYST REPORT // LOGIMIND_AI</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    <span className="text-[8.5px] text-slate-500 uppercase font-semibold">Gemini-2.0-Flash // SECURE</span>
                  </div>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-10 space-y-3.5">
                    <RefreshCw className="h-6 w-6 text-indigo-400 animate-spin" />
                    <span className="text-[10px] text-slate-500 tracking-wider font-semibold">GENERATING AI INTELLIGENCE...</span>
                  </div>
                ) : aiReport ? (
                  <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none text-white/85 font-mono text-[11px] space-y-4">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {aiReport}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-slate-500 text-center py-10">
                    No report generated. Trigger predictions to load.
                  </div>
                )}
              </div>
            </Panel>

            {/* Model Comparison Accuracy Chart */}
            <Panel
              title="ETA Prediction Model Accuracy"
              subtitle="Trained neural regression framework vs legacy static timetable estimations"
            >
              <div className="pt-2">
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={defaultHistoricalAccuracy}>
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
                    <Bar dataKey="ruleBased" fill="rgba(255,255,255,0.12)" name="Rule-Based Static (%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>

          </div>

        </div>
      </div>

      {/* OVERRIDES SLIDE-OUT SIDE DRAWER */}
      <AnimatePresence>
        {showOverrides && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOverrides(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] bg-slate-50 border-l border-slate-200 shadow-2xl p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-cyan-400" />
                    Inference Overrides
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Tweak variables to feed the neural forecast</p>
                </div>
                <button
                  onClick={() => setShowOverrides(false)}
                  className="rounded-lg p-1.5 text-slate-500 hover:text-white hover:bg-slate-100 transition font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Content Area */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-6">
                
                {/* Section 1: Weather Telemetry Syncer */}
                <div className="space-y-3 rounded-xl border border-slate-200 bg-transparent p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Live Weather Sync
                    </span>
                    <span className="text-[8px] font-mono text-slate-500">OPENWEATHER_API</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter port city..."
                      className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 placeholder-white/30 focus:outline-none focus:border-cyan-500 flex-1"
                    />
                    <button
                      disabled={weatherLoading || loading}
                      onClick={syncWeather}
                      className="bg-cyan-600 hover:bg-cyan-500 text-slate-900 rounded-lg px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-40 cursor-pointer"
                    >
                      {weatherLoading ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Anchor className="h-3.5 w-3.5" />}
                      <span>Sync</span>
                    </button>
                  </div>
                </div>

                {/* Section 2: Overrides Sliders */}
                <div className="space-y-5">
                  {/* Wind Speed Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                        <CloudLightning className="h-3.5 w-3.5 text-amber-400" />
                        Wind Speed
                      </span>
                      <span className="font-mono text-amber-400 font-bold">{windSpeed} m/s</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="32"
                      step="0.5"
                      value={windSpeed}
                      onChange={(e) => setWindSpeed(Number(e.target.value))}
                      className="w-full accent-amber-400 bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                      <span>Calm (0)</span>
                      <span>Storm Lockout (22+)</span>
                    </div>
                  </div>

                  {/* Visibility Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                        <Eye className="h-3.5 w-3.5 text-cyan-400" />
                        Visibility
                      </span>
                      <span className="font-mono text-cyan-400 font-bold">{visibility} m</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="10000"
                      step="100"
                      value={visibility}
                      onChange={(e) => setVisibility(Number(e.target.value))}
                      className="w-full accent-cyan-400 bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                      <span>Fog (100)</span>
                      <span>Clear (10000)</span>
                    </div>
                  </div>

                  {/* Precipitation Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                        <CloudRain className="h-3.5 w-3.5 text-blue-400" />
                        Precipitation
                      </span>
                      <span className="font-mono text-blue-400 font-bold">{precipitation} mm/hr</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      step="0.2"
                      value={precipitation}
                      onChange={(e) => setPrecipitation(Number(e.target.value))}
                      className="w-full accent-blue-400 bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Temperature Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                        <Thermometer className="h-3.5 w-3.5 text-red-400" />
                        Temperature
                      </span>
                      <span className="font-mono text-red-400 font-bold">{temperature}°C</span>
                    </div>
                    <input
                      type="range"
                      min="-10"
                      max="45"
                      step="1"
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="w-full accent-red-400 bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Vessel Queue Slider */}
                  <div className="space-y-1.5 border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                        <Compass className="h-3.5 w-3.5 text-indigo-400" />
                        Vessel Queue
                      </span>
                      <span className="font-mono text-indigo-400 font-bold">{vesselQueue} ships</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      step="1"
                      value={vesselQueue}
                      onChange={(e) => setVesselQueue(Number(e.target.value))}
                      className="w-full accent-indigo-400 bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Yard Occupancy Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                        <Database className="h-3.5 w-3.5 text-purple-400" />
                        Yard Occupancy
                      </span>
                      <span className="font-mono text-purple-400 font-bold">{yardOccupancy}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="95"
                      step="1"
                      value={yardOccupancy}
                      onChange={(e) => setYardOccupancy(Number(e.target.value))}
                      className="w-full accent-purple-400 bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Holiday Toggle */}
                  <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs">
                    <span className="text-slate-700 font-medium">Holiday Operations Mode</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isHoliday === 1}
                        onChange={(e) => setIsHoliday(e.target.checked ? 1 : 0)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="border-t border-slate-200 pt-4 mt-4 flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-slate-100 hover:bg-slate-100 text-slate-900 rounded-lg py-2.5 text-xs font-semibold border border-slate-200 transition cursor-pointer"
                >
                  Reset Default
                </button>
                <button
                  disabled={loading}
                  onClick={() => {
                    fetchPredictions(false);
                    setShowOverrides(false);
                  }}
                  className="flex-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg py-2.5 font-semibold text-xs tracking-wider flex items-center justify-center gap-1.5 transition active:scale-95 disabled:opacity-50 border border-indigo-400/20 cursor-pointer"
                >
                  <Cpu className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                  <span>Run Predictive Intelligence</span>
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
