import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel } from "./index";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FileSearch,
  UploadCloud,
  FileText,
  Sparkles,
  Search,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Download,
  Terminal,
} from "lucide-react";

export const Route = createFileRoute("/app/docs-ai")({
  component: DocsAiPage,
});

type DocTemplate = {
  id: string;
  name: string;
  category: string;
  description: string;
  fields: string[];
};

const templates: DocTemplate[] = [
  {
    id: "TMP-001",
    name: "Customs Declaration (Inbound Cargo)",
    category: "Customs",
    description: "Standard HS-Code compliant manifest validation form.",
    fields: ["Vessel IMO", "Consignee details", "Total TEU count", "Declared Cargo Value", "HS Codes"],
  },
  {
    id: "TMP-002",
    name: "Dangerous Goods Manifest (IMDG)",
    category: "Safety",
    description: "Class 1-9 hazardous cargo pre-positioning checklist.",
    fields: ["IMDG Hazard class", "UN numbers", "Stowage position", "Emergency action code"],
  },
  {
    id: "TMP-003",
    name: "Port Maintenance Work Order",
    category: "Maintenance",
    description: "Equipment breakdown repair authorization log.",
    fields: ["Crane ID", "Failure Symptom", "Assigned Team", "Priority Level"],
  },
];

type ParsedField = {
  key: string;
  value: string;
  confidence: number;
  status: "verified" | "flagged";
};

function DocsAiPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("TMP-001");
  const [dragActive, setDragActive] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedField[] | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0].name);
    }
  };

  const selectMockFile = (name: string) => {
    processFile(name);
  };

  const processFile = (name: string) => {
    setFileName(name);
    setFileUploaded(true);
    setIsParsing(true);
    setParsedData(null);

    // Simulate OCR OCR/Parsing
    setTimeout(() => {
      setIsParsing(false);
      setParsedData([
        { key: "Vessel Identity", value: "MV-Geneva (IMO 9823019)", confidence: 99, status: "verified" },
        { key: "Origin Port", value: "Rotterdam (NLRTM)", confidence: 98, status: "verified" },
        { key: "Cargo Category", value: "Industrial Spares / Electronics", confidence: 94, status: "verified" },
        { key: "Hazardous Materials", value: "Lithium Ion Cells (UN 3480) - Class 9", confidence: 97, status: "flagged" },
        { key: "Total Declared Value", value: "$4,290,100 USD", confidence: 89, status: "verified" },
        { key: "Customs Entry Ref", value: "IN-MUN-2026-X8", confidence: 95, status: "verified" },
      ]);
    }, 1800);
  };

  const activeTemplate = templates.find((t) => t.id === selectedTemplate) || templates[0];

  return (
    <div className="dark flex h-screen flex-col bg-[#070B19] text-white">
      <AppTopBar
        title="Smart Documentation AI"
        subtitle="Automatic Bill of Lading parsing · Dangerous goods verification · Customs OCR automation"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-12 gap-6">
          {/* File Upload Panel */}
          <div className="col-span-12 lg:col-span-6">
            <Panel
              title="Manifest Parser & OCR Upload"
              subtitle="Drag and drop logistics PDF manifest files for automatic neural processing"
            >
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl h-60 text-center p-6 transition ${
                  dragActive
                    ? "border-cyan-400 bg-cyan-400/[0.03]"
                    : fileUploaded
                      ? "border-indigo-500/50 bg-[#0d162d]/50"
                      : "border-white/10 hover:border-white/20 bg-white/[0.01]"
                }`}
              >
                <UploadCloud
                  className={`h-12 w-12 mb-3 transition ${
                    fileUploaded ? "text-indigo-400" : "text-white/20"
                  }`}
                />
                {fileUploaded ? (
                  <div>
                    <h4 className="text-sm font-semibold text-white/80">{fileName}</h4>
                    <p className="mt-1 text-xs text-white/40">File loaded successfully.</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-sm font-semibold text-white/70">Drag manifest file here</h4>
                    <p className="mt-1 text-xs text-white/40">Or click to select from local storage</p>
                  </div>
                )}

                {/* Prebuilt simulation manifest files */}
                {!fileUploaded && (
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => selectMockFile("bill_of_lading_998.pdf")}
                      className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1.5 text-[10px] text-white/60 hover:bg-white/10 hover:text-white transition"
                    >
                      Use BoL_998.pdf (Sample)
                    </button>
                    <button
                      onClick={() => selectMockFile("safety_hazard_IMDG_manifest.pdf")}
                      className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1.5 text-[10px] text-white/60 hover:bg-white/10 hover:text-white transition"
                    >
                      Use IMDG_Manifest.pdf (Sample)
                    </button>
                  </div>
                )}

                {fileUploaded && (
                  <button
                    onClick={() => {
                      setFileUploaded(false);
                      setParsedData(null);
                    }}
                    className="mt-4 text-xs text-red-400 hover:text-red-300 transition"
                  >
                    Clear uploaded file
                  </button>
                )}
              </div>
            </Panel>

            {/* Template Library */}
            <div className="mt-6">
              <Panel title="Document Form Templates" subtitle="Choose standardized format libraries for AI validation">
                <div className="space-y-3">
                  {templates.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={`cursor-pointer rounded-xl border p-3.5 transition ${
                        selectedTemplate === t.id
                          ? "border-[color:var(--color-secondary)] bg-gradient-to-r from-card to-[color:var(--color-secondary)]/5"
                          : "border-white/5 bg-card/60"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xs font-semibold">{t.name}</h4>
                          <p className="mt-0.5 text-[10px] text-white/40">{t.description}</p>
                        </div>
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-white/50">
                          {t.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>

          {/* AI Parser Output Details */}
          <div className="col-span-12 lg:col-span-6">
            <AnimatePresence mode="wait">
              {isParsing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-[#0a1124]/90 h-[500px]"
                >
                  <Sparkles className="h-10 w-10 text-cyan-400 animate-pulse mb-3" />
                  <div className="text-xs font-semibold text-white/80">Parsing manifest entries via AI OCR...</div>
                  <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      animate={{ left: ["-100%", "100%"] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="relative h-full w-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                    />
                  </div>
                </motion.div>
              ) : parsedData ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <Panel
                    title="AI Entity Extraction Results"
                    subtitle="Neural parsed fields matched against compliance checklists"
                  >
                    <div className="space-y-3.5">
                      {parsedData.map((field) => {
                        const isFlagged = field.status === "flagged";
                        return (
                          <div
                            key={field.key}
                            className={`rounded-xl border p-3 flex items-start justify-between gap-3 ${
                              isFlagged
                                ? "border-amber-500/30 bg-amber-500/[0.02]"
                                : "border-white/5 bg-white/[0.01]"
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] text-white/40 font-mono block uppercase">
                                {field.key}
                              </span>
                              <span className="text-xs font-semibold text-white/85 block mt-0.5">
                                {field.value}
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="text-[10px] font-mono text-white/40 block">
                                Conf: {field.confidence}%
                              </span>
                              {isFlagged ? (
                                <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-semibold text-amber-400">
                                  <AlertCircle className="h-3 w-3" /> Hazardous Flag
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-semibold text-emerald-400">
                                  <CheckCircle className="h-3 w-3" /> Auto-verified
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Panel>

                  {/* Manifest action options */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => alert("Manifest Approved and sent to customs.")}
                      className="flex-1 flex h-10 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 font-semibold text-white hover:bg-emerald-500 transition text-xs"
                    >
                      <CheckCircle className="h-4 w-4" /> Approve Manifest
                    </button>
                    <button
                      onClick={() => alert("Hazard declaration exported.")}
                      className="flex-1 flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition text-xs"
                    >
                      <Download className="h-4 w-4" /> Export Report
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.01] p-6 text-center text-white/40 h-[500px]">
                  <FileText className="h-12 w-12 text-white/20 mb-3" />
                  <h4 className="text-sm font-semibold text-white/70">Extraction Stream Idle</h4>
                  <p className="mt-1 text-xs max-w-xs leading-relaxed">
                    Upload a cargo manifest PDF or select a template sample to begin extraction.
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
