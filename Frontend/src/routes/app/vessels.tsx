import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel } from "./index";
import { motion } from "framer-motion";
import { useState } from "react";
import { Ship, Search, MapPin, Anchor, Radio, Maximize2, Minimize2 } from "lucide-react";
import { ClientOnly } from "@/components/ClientOnly";
import MapComponent, { RiskZone, Vessel } from "@/components/MapComponent";
import { useAISStream } from "@/hooks/useAISStream";

export const Route = createFileRoute("/app/vessels")({
  component: VesselsPage,
});

const mockRisks: RiskZone[] = [
  {
    id: "R-1",
    risk_type: "PIRACY",
    latitude: 22.42,
    longitude: 69.38,
    radius_km: 18,
    description: "Restricted entry corridor - Gulf of Kutch"
  },
  {
    id: "R-2",
    risk_type: "WEATHER",
    latitude: 22.76,
    longitude: 69.85,
    radius_km: 10,
    description: "High wave swells (>2.5m) approaching outer harbor"
  },
  {
    id: "R-3",
    risk_type: "CONGESTION",
    latitude: 22.75,
    longitude: 69.71,
    radius_km: 5,
    description: "Berth queue holds at berths 7-9"
  }
];

const riskColor = (r?: string) =>
  r === "High" ? "#DC2626" : r === "Medium" ? "#D97706" : "#15803D";

function MapPlaceholder() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border border-border bg-gradient-to-br from-[#0B1A33] via-[#0F2547] to-[#1B3A6B]">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <svg
        viewBox="0 0 100 60"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 Q25,30 40,42 T70,38 T100,32 L100,60 L0,60 Z"
          fill="rgba(13, 148, 136, 0.15)"
          stroke="rgba(13, 148, 136, 0.4)"
          strokeWidth="0.3"
        />
        <path
          d="M30,42 L30,46 L46,46 L46,42 Z M48,42 L48,46 L62,46 L62,42 Z"
          fill="rgba(37,99,235,0.4)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 backdrop-blur-[2px]">
        <div className="flex flex-col items-center gap-2 text-slate-400 font-mono text-xs">
          <span className="h-4 w-4 animate-spin rounded-full border border-slate-600 border-t-cyan-500" />
          <span>Mounting spatial grid...</span>
        </div>
      </div>
    </div>
  );
}

function VesselsPage() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>("MV-228");
  const [isMaximized, setIsMaximized] = useState(false);

  // Get live streaming or simulated vessel telemetry
  const { vessels: liveVessels, isLive, connectionStatus, messageCount, toggleLiveMode } = useAISStream();

  // Find the selected vessel, fallback if not found
  const sel = liveVessels.find((v) => v.id === selectedId) || liveVessels[0] || {
    id: "N/A",
    name: "No Vessel Selected",
    flag: "—",
    status: "—",
    eta: "—",
    risk: "Low",
    speed: 0,
    course: 0,
    dest: "—",
    last_position_lat: 22.8,
    last_position_lon: 69.7,
    type: "Cargo"
  };

  // Filter logic
  const filtered = liveVessels.filter((v) => {
    const matchesSearch = 
      v.name.toLowerCase().includes(q.toLowerCase()) ||
      v.id.toLowerCase().includes(q.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "All" || 
      v.status?.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <AppTopBar
        title="Vessel Intelligence"
        subtitle={isLive ? `Live AIS Stream · Connected` : `Simulated AIS Feed · ${liveVessels.length} vessels in zone`}
      />
      <div className="p-6 grid grid-cols-12 gap-4">
        
        {/* Operational Map Panel */}
        <Panel
          title="Operational Map"
          subtitle="AIS telemetry · Berth zones · Risk overlays"
          className={isMaximized ? "fixed inset-0 z-[50] bg-background/95 backdrop-blur-lg p-6 flex flex-col !col-span-12 !m-0 !rounded-none" : "col-span-12 xl:col-span-8 transition-all duration-300"}
          right={
            <div className="flex items-center gap-3">
              {isLive && (
                <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {messageCount} packets
                </span>
              )}
              {connectionStatus === "CONNECTING" && (
                <span className="text-[10px] font-mono text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded animate-pulse">
                  Connecting...
                </span>
              )}
              
              {/* AIS Connection toggle */}
              <button
                onClick={() => toggleLiveMode(!isLive)}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border font-medium cursor-pointer transition ${
                  isLive
                    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20"
                    : "bg-background text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                }`}
              >
                <Radio className={`h-3 w-3 ${isLive ? "animate-pulse" : ""}`} />
                <span>{isLive ? "Disconnect AIS" : "Connect Live AIS"}</span>
              </button>

              {/* Maximize toggle */}
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="flex items-center justify-center p-1 rounded-md border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition"
                title={isMaximized ? "Minimize View" : "Maximize View"}
              >
                {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          }
        >
          <div className={`relative w-full overflow-hidden rounded-lg border border-border transition-all duration-300 ${isMaximized ? "h-[calc(100vh-140px)] flex-1" : "h-[500px]"}`}>
            <ClientOnly fallback={<MapPlaceholder />}>
              <MapComponent
                center={isLive ? [20.0, 0.0] : [22.72, 69.71]}
                zoom={isLive ? 2 : (isMaximized ? 9 : 10)}
                vessels={liveVessels}
                risks={isLive ? [] : mockRisks}
                selectedVesselId={selectedId}
                onSelectVessel={setSelectedId}
                showFiltersInline={true}
              />
            </ClientOnly>
          </div>
        </Panel>

        {/* Vessel Details Panel */}
        <Panel
          title="Vessel Details"
          subtitle={`${sel.id} · ${sel.name}`}
          className={isMaximized ? "col-span-12 h-fit transition-all duration-300" : "col-span-12 xl:col-span-4 h-fit transition-all duration-300"}
        >
          <div className="rounded-lg border border-border bg-background p-4 flex flex-col gap-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-lg font-semibold text-foreground">
                    {sel.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Flag · {sel.flag}
                  </div>
                </div>
                <span
                  className="rounded px-2 py-0.5 text-[10px] font-bold uppercase"
                  style={{
                    background: `${riskColor(sel.risk)}15`,
                    color: riskColor(sel.risk),
                    border: `1px solid ${riskColor(sel.risk)}25`
                  }}
                >
                  {sel.risk || "Low"} risk
                </span>
              </div>
              
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-2.5 text-xs">
                {[
                  ["Status", sel.status || "Underway"],
                  ["ETA", sel.eta || "—"],
                  ["Speed", `${(sel.speed ?? 0).toFixed(1)} kn`],
                  ["Heading", `${sel.course ?? 0}°`],
                  ["Destination", sel.dest || "Mundra Port"],
                  ["Type", sel.type || "Cargo"],
                ].map(([l, v]) => (
                  <div key={l} className="rounded border border-border p-2 bg-muted/65">
                    <div className="text-muted-foreground text-[10px] uppercase font-mono">{l}</div>
                    <div className="font-bold text-foreground mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        {/* Vessel List Panel */}
        <Panel
          title="Vessel List"
          subtitle="All active AIS contacts in sector"
          className="col-span-12"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search vessel by Name or MMSI..."
                className="h-9 w-full rounded-md border border-border bg-background pl-8 pr-3 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20"
              />
            </div>
            <div className="flex gap-1.5">
              {["All", "Inbound", "Berthed", "Anchored", "Outbound"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-md border px-3 py-1 text-xs font-semibold cursor-pointer transition ${
                    statusFilter === s
                      ? "bg-slate-800 text-white border-slate-700 dark:bg-slate-200 dark:text-slate-900"
                      : "bg-background text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm border-collapse">
              <thead className="text-[11px] uppercase text-muted-foreground bg-muted">
                <tr className="border-b border-border">
                  {[
                    "MMSI / ID",
                    "Vessel Name",
                    "Flag",
                    "Status",
                    "Speed",
                    "Heading",
                    "Destination",
                    "Risk",
                  ].map((h) => (
                    <th key={h} className="py-2.5 px-4 text-left font-bold tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-muted-foreground font-mono text-xs">
                      No matching vessels found in current sector.
                    </td>
                  </tr>
                ) : (
                  filtered.map((v, i) => (
                    <motion.tr
                      key={v.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: Math.min(i * 0.02, 0.3) }}
                      className={`cursor-pointer hover:bg-muted/40 transition duration-100 ${selectedId === v.id ? "bg-muted font-bold text-foreground" : "text-muted-foreground"}`}
                      onClick={() => setSelectedId(v.id)}
                    >
                      <td className="py-3 px-4 font-mono text-xs text-cyan-600 dark:text-cyan-400 font-semibold">{v.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Ship className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="text-foreground">{v.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs text-foreground/90">{v.flag}</td>
                      <td className="py-3 px-4 text-xs text-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            v.status === "Berthed" ? "bg-cyan-500" :
                            v.status === "Berthing" ? "bg-emerald-500" :
                            v.status === "Anchored" ? "bg-amber-500" : "bg-blue-500"
                          }`} />
                          {v.status || "Underway"}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-foreground/90">
                        {(v.speed ?? 0).toFixed(1)} kn
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-foreground/90">
                        {v.course ?? 0}°
                      </td>
                      <td className="py-3 px-4 text-xs">
                        <div className="flex items-center gap-1.5 text-foreground/90">
                          <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span className="truncate max-w-[150px]">{v.dest || "Mundra Port"}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="rounded px-2 py-0.5 text-[10px] font-bold"
                          style={{
                            background: `${riskColor(v.risk)}15`,
                            color: riskColor(v.risk),
                            border: `1px solid ${riskColor(v.risk)}25`
                          }}
                        >
                          {v.risk || "Low"}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  );
}
