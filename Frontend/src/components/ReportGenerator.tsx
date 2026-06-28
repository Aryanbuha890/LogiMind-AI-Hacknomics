import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PieChart,
  Pie,
  XAxis,
  YAxis,
} from "recharts";
import { Download, Loader2 } from "lucide-react";

interface ReportGeneratorProps {
  throughput: any[];
  safetyTrend: any[];
  riskDist: any[];
  craneHealth: any[];
  weatherData: any[];
  events: any[];
}

export function ReportGenerator({
  throughput,
  safetyTrend,
  riskDist,
  craneHealth,
  weatherData,
  events,
}: ReportGeneratorProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdf = async () => {
    if (!reportRef.current) return;
    try {
      setIsGenerating(true);
      // html-to-image uses the browser's native rendering via SVG foreignObject, which supports all modern CSS including oklch
      const dataUrl = await toPng(reportRef.current, {
        quality: 1,
        pixelRatio: 2, // High resolution
        cacheBust: true,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => { img.onload = resolve; });

      let finalPdfHeight = (img.height * pdfWidth) / img.width;
      let finalPdfWidth = pdfWidth;
      let marginX = 0;

      // If the report flows longer than an A4 page, scale it down to fit perfectly on one page
      if (finalPdfHeight > pdfPageHeight) {
        finalPdfHeight = pdfPageHeight;
        finalPdfWidth = (img.width * pdfPageHeight) / img.height;
        marginX = (pdfWidth - finalPdfWidth) / 2; // Center horizontally
      }

      pdf.addImage(dataUrl, "PNG", marginX, 0, finalPdfWidth, finalPdfHeight);
      
      const dateStr = new Date().toISOString().replace(/[:.]/g, "-");
      pdf.save(`Portmind_Global_Report_${dateStr}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={generatePdf}
        disabled={isGenerating}
        className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-semibold text-sm transition-colors shadow-sm disabled:opacity-50"
      >
        {isGenerating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {isGenerating ? "Generating Report..." : "Generate Global Report"}
      </button>

      {/* Hidden container for the report */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px", zIndex: -10 }}>
        <div
          ref={reportRef}
          className="bg-white text-slate-900 w-[1000px] min-h-[1414px] p-12 flex flex-col gap-8 font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center gap-4">
              {/* Ensure logo path is correct from public folder */}
              <img src="/LogiMind Logo.png" alt="LogiMind Logo" className="h-16" crossOrigin="anonymous" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Global Operations Report
                </h1>
                <p className="text-slate-500 font-medium text-sm mt-1">
                  Portmind AI — Real-Time Maritime & Logistics Intelligence
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-700">Date Generated</p>
              <p className="text-slate-500 text-sm">
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3 mb-4">
              1. Executive Summary & KPIs
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-50 border p-4 rounded-lg">
                <p className="text-sm text-slate-500">Active Vessels</p>
                <p className="text-2xl font-bold text-blue-700">217</p>
              </div>
              <div className="bg-slate-50 border p-4 rounded-lg">
                <p className="text-sm text-slate-500">Containers Today</p>
                <p className="text-2xl font-bold text-teal-700">12,408</p>
              </div>
              <div className="bg-slate-50 border p-4 rounded-lg">
                <p className="text-sm text-slate-500">Safety Alerts</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <div className="bg-slate-50 border p-4 rounded-lg">
                <p className="text-sm text-slate-500">Global Risk Score</p>
                <p className="text-2xl font-bold text-emerald-700">82 / 100</p>
              </div>
            </div>
          </div>

          {/* Section 2: AI Analytics & Predictions */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 border-l-4 border-indigo-500 pl-3 mb-4">
                2. Container Throughput (24h)
              </h2>
              <div className="bg-slate-50 border p-4 rounded-lg flex items-center justify-center">
                <AreaChart width={420} height={220} data={throughput}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Area type="monotone" dataKey="in" stroke="#2563EB" fill="#3B82F6" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="out" stroke="#0D9488" fill="#14B8A6" fillOpacity={0.2} />
                </AreaChart>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 border-l-4 border-orange-500 pl-3 mb-4">
                3. Risk Distribution
              </h2>
              <div className="bg-slate-50 border p-4 rounded-lg flex items-center justify-center">
                <PieChart width={420} height={220}>
                  <Pie data={riskDist} dataKey="value" innerRadius={60} outerRadius={90}>
                    {riskDist.map((r, i) => (
                      <Cell key={`cell-${i}`} fill={r.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>

          {/* Section 3: AI Modules Overview */}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-slate-800 border-l-4 border-purple-500 pl-3 mb-4">
              4. AI Modules Status (Wagon, PPE, RAG, What-If)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <h3 className="font-bold text-slate-700">Wagon Number Detection (YOLO)</h3>
                <p className="text-sm text-slate-600 mt-2">Active scanning on Rail Gates 1 & 2. 99.4% OCR Accuracy recorded over the last 24 hours. Automated container mapping active.</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <h3 className="font-bold text-slate-700">PPE Safety Guardrails</h3>
                <p className="text-sm text-slate-600 mt-2">Real-time surveillance active across all 14 zones. 3 infractions caught today. Safety officer dispatch protocol functioning nominally.</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <h3 className="font-bold text-slate-700">What-If Monte Carlo Simulator</h3>
                <p className="text-sm text-slate-600 mt-2">Latest simulation run for 'Storm Scenario C' indicates 12% delay risk for inbound vessels. Rail dispatch optimized to mitigate yard congestion.</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <h3 className="font-bold text-slate-700">Docs AI (Groq RAG Copilot)</h3>
                <p className="text-sm text-slate-600 mt-2">124 operator queries handled today. Average inference speed: 45ms. All maritime protocols and hazard manuals successfully indexed.</p>
              </div>
            </div>
          </div>

          {/* Section 4: Event Logs */}
          <div className="mt-4 flex-1">
            <h2 className="text-xl font-bold text-slate-800 border-l-4 border-rose-500 pl-3 mb-4">
              5. Recent Critical Events Log
            </h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Severity</th>
                    <th className="px-4 py-3">Event Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {events.slice(0, 8).map((e, idx) => (
                    <tr key={idx} className="bg-white">
                      <td className="px-4 py-3 font-mono">{e.t}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${e.sev === 'danger' ? 'bg-red-100 text-red-700' : e.sev === 'warn' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                          {e.sev}
                        </span>
                      </td>
                      <td className="px-4 py-3">{e.msg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-auto text-center pt-8 border-t text-slate-600 text-xs font-mono">
            CONFIDENTIAL - Internal Operations Use Only • Generated by Portmind AI
          </div>
        </div>
      </div>
    </>
  );
}
