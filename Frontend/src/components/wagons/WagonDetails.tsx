import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, ChevronRight, Eye, Maximize2, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WagonDetailsProps {
  streamId: number;
}

interface LiveWagonData {
  wagon_id: string;
  confidence: number;
  defects: string[];
  severity: "Low" | "Medium" | "High" | "None";
  entry_time?: string;
  speed?: string;
  source?: string;
  rawImg: string;
  enhancedImg: string;
  ocrCropImg: string;
}

const STREAM_DETAILS: Record<number, LiveWagonData> = {
  1: {
    wagon_id: "IN-473910928",
    confidence: 94.2,
    defects: ["Leaf Spring Crack", "Structural Corrosion"],
    severity: "High",
    entry_time: "19:12:04",
    speed: "14.8 kn",
    source: "North Yard Track 3",
    rawImg: "/wagons/R1.png",
    enhancedImg: "/wagons/resrult-detection.png",
    ocrCropImg: "/wagons/WagonNumber.png",
  },
  2: {
    wagon_id: "IN-182749382",
    confidence: 98.7,
    defects: ["Coupler Stress Alert"],
    severity: "Medium",
    entry_time: "19:11:45",
    speed: "15.2 kn",
    source: "Yard Central Track 2",
    rawImg: "/wagons/R4.png",
    enhancedImg: "/wagons/Result-detection-2.png",
    ocrCropImg: "/wagons/WagonNumber.png",
  },
  3: {
    wagon_id: "IN-928193829",
    confidence: 96.1,
    defects: [],
    severity: "None",
    entry_time: "19:10:02",
    speed: "15.0 kn",
    source: "Yard West Track 1",
    rawImg: "/wagons/R5.png",
    enhancedImg: "/wagons/Result-detection-3.png",
    ocrCropImg: "/wagons/WagonNumber.png",
  },
};

const WagonDetails: React.FC<WagonDetailsProps> = ({ streamId }) => {
  const [details, setDetails] = useState<LiveWagonData>(
    STREAM_DETAILS[streamId] || STREAM_DETAILS[1]
  );
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    setDetails(STREAM_DETAILS[streamId] || STREAM_DETAILS[1]);
  }, [streamId]);

  const hasDefects = details.defects.length > 0;
  const severityColor =
    details.severity === "High"
      ? "text-rose-500 border-rose-500/30 bg-rose-500/10"
      : details.severity === "Medium"
      ? "text-amber-500 border-amber-500/30 bg-amber-500/10"
      : "text-emerald-500 border-emerald-500/30 bg-emerald-500/10";

  return (
    <div className="space-y-4 font-sans">
      {/* 1. HEADER INFO */}
      <div className="flex justify-between items-start border-b border-border pb-3">
        <div>
          <h4 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
            {details.wagon_id}
            <span className="text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
              {details.confidence.toFixed(1)}% Logit
            </span>
          </h4>
          <p className="text-[10px] text-muted-foreground mt-1 font-mono">
            Time: {details.entry_time} • {details.speed} • {details.source}
          </p>
        </div>
        <div
          className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
            hasDefects
              ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
          }`}
        >
          {hasDefects ? "FLAGGED" : "PASSED"}
        </div>
      </div>

      {/* 2. DAMAGE ASSESSMENT */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">
          Damage Assessment
        </span>
        {hasDefects ? (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {details.defects.map((d, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded flex items-center gap-1 font-mono font-semibold"
                >
                  <AlertTriangle className="w-3 h-3 text-rose-400" /> {d}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs bg-rose-500/5 border border-rose-500/10 rounded-lg p-2 mt-1">
              <span className="text-muted-foreground font-mono text-[10px]">Severity Level:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${severityColor}`}>
                {details.severity}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-lg">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>All structural components, axle, and leaf spring certified normal.</span>
          </div>
        )}
      </div>

      {/* 3. VISUAL FORENSICS SECTION (REAL PROJECT IMAGES) */}
      <div className="space-y-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">
            Zero-DCE Visual Forensics
          </span>
          <span className="text-[9px] font-mono text-cyan-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            GAN Restored
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Zero-DCE Raw Input */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Zero-DCE (Input)
            </span>
            <div
              onClick={() => setSelectedImage({ src: details.rawImg, title: "Zero-DCE Raw Input (Low-Light Frame)" })}
              className="group relative w-full h-24 rounded-lg overflow-hidden border border-white/10 bg-black/40 cursor-pointer hover:border-cyan-500/50 transition-all shadow-md"
            >
              <img
                src={details.rawImg}
                alt="Zero-DCE Input"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                <span className="text-[8px] font-mono font-bold text-slate-300 bg-black/60 px-1.5 py-0.5 rounded">
                  RAW LOW-LIGHT
                </span>
                <Eye className="w-3.5 h-3.5 text-white/70 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Zero-DCE Enhanced Output */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Zero-DCE (Output)
            </span>
            <div
              onClick={() => setSelectedImage({ src: details.enhancedImg, title: "Zero-DCE Enhanced Output (YOLO Inference)" })}
              className="group relative w-full h-24 rounded-lg overflow-hidden border border-cyan-500/30 bg-black/40 cursor-pointer hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <img
                src={details.enhancedImg}
                alt="Zero-DCE Output"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                <span className="text-[8px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                  ENHANCED // AI
                </span>
                <Eye className="w-3.5 h-3.5 text-cyan-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. OCR REGION & MVIS FLAG */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* OCR Region */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              OCR Region Plate
            </span>
            <div
              onClick={() => setSelectedImage({ src: details.ocrCropImg, title: "Wagon Plate Crop Extraction" })}
              className="group relative w-full h-14 rounded-lg border border-border bg-black/50 overflow-hidden flex items-center justify-between px-2 cursor-pointer hover:border-cyan-500/40 transition"
            >
              <img
                src={details.ocrCropImg}
                alt="Wagon OCR Crop"
                className="w-16 h-10 object-contain rounded border border-white/10"
              />
              <div className="flex flex-col items-end">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {details.wagon_id}
                </span>
                <span className="text-[8px] font-mono text-slate-400">
                  {details.confidence.toFixed(1)}% Conf
                </span>
              </div>
            </div>
          </div>

          {/* MVIS Flag */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              MVIS Action Flag
            </span>
            <div
              className={`h-14 rounded-lg border flex flex-col items-center justify-center font-mono font-bold text-xs p-1 ${
                hasDefects
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              }`}
            >
              <span>{hasDefects ? "IMMEDIATE REPAIR" : "WAGON DEPLOYABLE"}</span>
              <span className="text-[9px] font-normal opacity-75 mt-0.5">
                {hasDefects ? "Route to Maintenance Siding" : "Cleared for Departure"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. IMAGE PREVIEW MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl w-full rounded-2xl border border-white/20 bg-[#070b18] p-4 shadow-2xl flex flex-col gap-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  {selectedImage.title}
                </h4>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="h-7 w-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center max-h-[70vh]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 pt-1">
                <span>Model: YOLOv11 + Zero-DCE GAN Restorer</span>
                <span className="text-cyan-400">Resolution: 1080p High-Resolution Frame</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WagonDetails;
