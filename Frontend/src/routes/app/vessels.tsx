import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel } from "./index";
import { motion } from "framer-motion";
import { useState } from "react";
import { Ship, Search, MapPin, Anchor, Navigation2 } from "lucide-react";

export const Route = createFileRoute("/app/vessels")({
  component: VesselsPage,
});

const vessels = [
  {
    id: "MV-228",
    name: "Maersk Halifax",
    flag: "DK",
    status: "Berthing",
    eta: "14:45",
    risk: "Low",
    speed: 4.2,
    head: 218,
    dest: "Berth 7",
    x: 62,
    y: 58,
  },
  {
    id: "MV-441",
    name: "MSC Aurora",
    flag: "PA",
    status: "Inbound",
    eta: "16:20",
    risk: "Medium",
    speed: 12.1,
    head: 142,
    dest: "Berth 12",
    x: 78,
    y: 32,
  },
  {
    id: "MV-117",
    name: "Ever Glory",
    flag: "TW",
    status: "Anchored",
    eta: "—",
    risk: "Low",
    speed: 0.0,
    head: 90,
    dest: "Anchorage A",
    x: 22,
    y: 24,
  },
  {
    id: "MV-908",
    name: "CMA Beirut",
    flag: "FR",
    status: "Outbound",
    eta: "Departing",
    risk: "Low",
    speed: 8.4,
    head: 310,
    dest: "Open sea",
    x: 14,
    y: 70,
  },
  {
    id: "MV-562",
    name: "ONE Bluebird",
    flag: "JP",
    status: "Inbound",
    eta: "18:05",
    risk: "High",
    speed: 14.8,
    head: 188,
    dest: "Berth 4",
    x: 86,
    y: 78,
  },
  {
    id: "MV-330",
    name: "Adani Spirit",
    flag: "IN",
    status: "Berthed",
    eta: "—",
    risk: "Low",
    speed: 0.0,
    head: 0,
    dest: "Berth 9",
    x: 48,
    y: 50,
  },
];

const riskColor = (r: string) =>
  r === "High" ? "#DC2626" : r === "Medium" ? "#D97706" : "#15803D";

function VesselsPage() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(vessels[0]);
  const filtered = vessels.filter(
    (v) =>
      v.name.toLowerCase().includes(q.toLowerCase()) ||
      v.id.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <AppTopBar title="Vessel Intelligence" subtitle="Live AIS · 217 vessels in monitored zone" />
      <div className="p-6 grid grid-cols-12 gap-4">
        <Panel
          title="Operational Map"
          subtitle="AIS · Berth zones · Risk overlays"
          className="col-span-12 xl:col-span-8"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-gradient-to-br from-[#0B1A33] via-[#0F2547] to-[#1B3A6B]">
            <div className="absolute inset-0 bg-grid opacity-20" />
            {/* Stylized coastline */}
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
            {/* Risk zone */}
            <div
              className="absolute"
              style={{
                left: "80%",
                top: "70%",
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "radial-gradient(closest-side, rgba(220,38,38,0.35), transparent)",
              }}
            />
            {/* Vessels */}
            {vessels.map((v) => (
              <button
                key={v.id}
                onClick={() => setSel(v)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${v.x}%`, top: `${v.y}%` }}
              >
                <div className="relative">
                  <span
                    className="absolute inset-0 rounded-full pulse-ring"
                    style={{ background: riskColor(v.risk), opacity: 0.4 }}
                  />
                  <Navigation2
                    className="relative h-4 w-4 text-white drop-shadow"
                    style={{ transform: `rotate(${v.head}deg)`, color: riskColor(v.risk) }}
                  />
                </div>
                <div
                  className={`mt-1 hidden group-hover:block absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-mono text-white ${sel.id === v.id ? "!block" : ""}`}
                >
                  {v.id} · {v.name}
                </div>
              </button>
            ))}
            <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-[10px] font-mono text-white">
              Port of Mundra · 22.83°N 69.71°E
            </div>
            <div className="absolute top-2 right-2 flex gap-2 text-[10px] font-mono">
              {[
                ["Low", "#15803D"],
                ["Medium", "#D97706"],
                ["High", "#DC2626"],
              ].map(([l, c]) => (
                <span
                  key={l}
                  className="inline-flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                  {l}
                </span>
              ))}
            </div>
          </div>
        </Panel>

        <Panel
          title="Vessel Details"
          subtitle={`${sel.id} · ${sel.name}`}
          className="col-span-12 xl:col-span-4"
        >
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-lg font-semibold">{sel.name}</div>
                <div className="text-xs text-muted-foreground">Flag · {sel.flag}</div>
              </div>
              <span
                className="rounded px-2 py-0.5 text-[10px] font-semibold"
                style={{ background: `${riskColor(sel.risk)}15`, color: riskColor(sel.risk) }}
              >
                {sel.risk} risk
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {[
                ["Status", sel.status],
                ["ETA", sel.eta],
                ["Speed", `${sel.speed} kn`],
                ["Heading", `${sel.head}°`],
                ["Destination", sel.dest],
                ["Cargo", "Containers · 4,820 TEU"],
              ].map(([l, v]) => (
                <div key={l} className="rounded border border-border p-2">
                  <div className="text-muted-foreground">{l}</div>
                  <div className="font-medium">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-md bg-muted/60 p-2.5 text-[11px]">
              <div className="font-semibold flex items-center gap-1.5">
                <Anchor className="h-3 w-3" />
                AI Prediction
              </div>
              <div className="mt-1 text-muted-foreground">
                Berthing window optimal at 14:42 · weather window holds for 6h · no conflicting
                vessels in approach lane.
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Vessel List" subtitle="All monitored AIS contacts" className="col-span-12">
          <div className="mb-3 flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search vessel or IMO…"
                className="h-9 w-full rounded-md border border-border bg-background pl-8 pr-3 text-sm outline-none focus:border-[color:var(--color-secondary)]"
              />
            </div>
            {["All", "Inbound", "Berthed", "Anchored", "Outbound"].map((s) => (
              <button
                key={s}
                className="rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:bg-muted"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-muted-foreground">
                <tr className="border-b border-border">
                  {["ID", "Vessel", "Flag", "Status", "Speed", "ETA", "Destination", "Risk"].map(
                    (h) => (
                      <th key={h} className="py-2 px-3 text-left font-medium">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((v, i) => (
                  <motion.tr
                    key={v.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`cursor-pointer hover:bg-muted/40 ${sel.id === v.id ? "bg-muted/30" : ""}`}
                    onClick={() => setSel(v)}
                  >
                    <td className="py-2.5 px-3 font-mono text-xs">{v.id}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <Ship className="h-3.5 w-3.5 text-muted-foreground" />
                        {v.name}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-xs">{v.flag}</td>
                    <td className="py-2.5 px-3 text-xs">{v.status}</td>
                    <td className="py-2.5 px-3 font-mono text-xs">{v.speed} kn</td>
                    <td className="py-2.5 px-3 font-mono text-xs">{v.eta}</td>
                    <td className="py-2.5 px-3 text-xs">
                      <MapPin className="inline h-3 w-3 mr-1 text-muted-foreground" />
                      {v.dest}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                        style={{ background: `${riskColor(v.risk)}15`, color: riskColor(v.risk) }}
                      >
                        {v.risk}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  );
}
