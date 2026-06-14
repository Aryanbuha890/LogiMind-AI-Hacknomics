import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel, ChartTip } from "./index";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Briefcase,
  TrendingUp,
  FileText,
  DollarSign,
  Download,
  CheckCircle,
  HelpCircle,
  Leaf,
} from "lucide-react";

export const Route = createFileRoute("/app/executive")({
  component: ExecutivePage,
});

const monthlyRevenue = [
  { month: "Jan", revenue: 14.2, savings: 1.1 },
  { month: "Feb", revenue: 15.1, savings: 1.2 },
  { month: "Mar", revenue: 16.5, savings: 1.4 },
  { month: "Apr", revenue: 15.9, savings: 1.3 },
  { month: "May", revenue: 17.8, savings: 1.6 },
  { month: "Jun", revenue: 18.4, savings: 1.8 },
];

const esgData = [
  { name: "Electrified Cranes", value: 45, color: "#10B981" },
  { name: "Biofuel Vessels", value: 25, color: "#3B82F6" },
  { name: "Grid Solar Power", value: 20, color: "#F59E0B" },
  { name: "Diesel Backups", value: 10, color: "#EF4444" },
];

function ExecutivePage() {
  const [isExporting, setIsExporting] = useState(false);

  const triggerExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Executive PDF Report generated & downloaded successfully (simulated).");
    }, 1500);
  };

  return (
    <div className="dark flex h-screen flex-col bg-[#070B19] text-white">
      <AppTopBar
        title="Executive AI Boardroom"
        subtitle="C-suite overview · Financial optimization models · ESG sustainability audits"
        right={
          <button
            onClick={triggerExport}
            disabled={isExporting}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 text-xs font-semibold hover:bg-indigo-500 transition disabled:opacity-50 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Exporting PDF..." : "Export Q2 Briefing"}
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Executive Summary Briefing */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl border border-white/5 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-card p-6 shadow-xl overflow-hidden"
        >
          {/* Glowing purple ambient aura */}
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <FileText className="h-4 w-4" />
            <span>AI-Generated Daily Executive Briefing</span>
          </div>

          <p className="mt-3 text-sm md:text-base leading-relaxed text-white/90">
            Today the Port of Mundra processed <span className="font-bold text-cyan-300">12,408 TEUs</span> (+4.2% vs. baseline). Vessel queues were reduced by <span className="font-bold text-cyan-300">22.4%</span> through AI Decision Center lane openings. Smart crane reallocation saved approximately <span className="font-bold text-emerald-400">$34,800</span> in energy and maintenance overheads. Net operations margin remains healthy at <span className="font-bold text-indigo-400">82.3%</span> with ESG environmental compliance score auditing at <span className="font-bold text-emerald-400">92/100</span>.
          </p>
        </motion.div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Q2 Net Revenue", val: "$18.4M", icon: DollarSign, color: "#3B82F6", trend: "+8.4%" },
            { label: "Cost per TEU Handled", val: "$142", icon: Briefcase, color: "#8B5CF6", trend: "-6.2%" },
            { label: "AI Resource Savings", val: "$184.2K", icon: TrendingUp, color: "#10B981", trend: "+12.1%" },
            { label: "ESG Carbon Footprint", val: "1.24 T/TEU", icon: Leaf, color: "#F59E0B", trend: "-14%" },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-xl border border-white/5 bg-card p-4">
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-8 w-8 place-items-center rounded-lg"
                    style={{ background: `${card.color}15`, color: card.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">{card.trend}</span>
                </div>
                <div className="mt-3 font-display text-2xl font-bold">{card.val}</div>
                <div className="text-xs text-white/50">{card.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Revenue Performance Chart */}
          <div className="col-span-12 xl:col-span-8">
            <Panel
              title="Financial Performance & AI Savings ($M)"
              subtitle="Monthly cargo processing revenue compared with automated resource cost savings"
            >
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTip />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    name="Revenue ($M)"
                    dot={{ fill: "#3B82F6" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="#10B981"
                    strokeWidth={3}
                    name="AI Savings ($M)"
                    dot={{ fill: "#10B981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Panel>
          </div>

          {/* ESG Compliance Score Ring Chart */}
          <div className="col-span-12 xl:col-span-4">
            <Panel
              title="ESG Carbon Grid Mix"
              subtitle="Real-time audit of power source composition per crane/terminal"
            >
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={esgData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {esgData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTip />} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 grid grid-cols-2 gap-3 w-full text-xs">
                  {esgData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-white/60 truncate">{item.name}</span>
                      <span className="font-bold ml-auto font-mono">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
