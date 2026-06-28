import { createLazyFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel } from "./index";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
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

export const Route = createLazyFileRoute("/app/docs-ai")({
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
  source?: string;
};

const BACKEND_URL = "http://127.0.0.1:8000";

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
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const selectMockFile = (name: string) => {
    // Generate text content in memory to simulate uploading a manifest
    let dummyText = "";
    if (name.includes("safety_hazard")) {
      dummyText = `
        DANGEROUS GOODS MANIFEST (IMDG)
        Vessel Name: MV-Oceanic-Bravo
        IMO Number: IMO 9987625
        IMDG Hazard class: Class 9 (Miscellaneous Dangerous Goods)
        UN numbers: UN 3480 (Lithium Ion Cells)
        Stowage position: Bay 14 Row 02 Tier 06
        Emergency action code: F-A, S-I (Spill Schedule Code)
        Cargo Description: High-Voltage Lithium Ion Battery Pack Modules
      `;
    } else {
      dummyText = `
        CUSTOMS DECLARATION
        Vessel Identity: MV-Geneva (IMO 9823019)
        Origin Port: Rotterdam (NLRTM)
        Cargo Category: Industrial Spares / Electronics
        Consignee: Mundra Terminal Logistics Ltd.
        Total TEU count: 2800 TEUs
        Declared Cargo Value: $4,290,100 USD
        HS Codes: 8504.40.90, 8507.60.00
      `;
    }

    const blob = new Blob([dummyText], { type: "text/plain" });
    const file = new File([blob], name, { type: "text/plain" });
    processFile(file);
  };

  const processFile = async (file: File) => {
    setFileName(file.name);
    setFileUploaded(true);
    setIsParsing(true);
    setParsedData(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("template_id", selectedTemplate);

    try {
      const res = await fetch(`${BACKEND_URL}/api/docs-ai/parse`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const response = await res.json();
      if (response.status === "success") {
        setParsedData(response.fields);
        toast.success(`Parsed manifest file: ${file.name}`);
      } else {
        toast.error(response.message || "Failed to parse document");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(`Error connecting to Python FastAPI backend: ${err.message}. Make sure server is running on port 8000!`);
      setFileUploaded(false);
    } finally {
      setIsParsing(false);
    }
  };

  const activeTemplate = templates.find((t) => t.id === selectedTemplate) || templates[0];

  const handleExport = () => {
    if (!parsedData) return;
    const content = JSON.stringify({
      filename: fileName,
      template_id: selectedTemplate,
      template_name: activeTemplate.name,
      extracted_at: new Date().toISOString(),
      fields: parsedData
    }, null, 2);
    
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `extracted_manifest_${fileName.replace(/\.[^/.]+$/, "")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Extraction report exported as JSON.");
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50 text-slate-900 overflow-hidden">
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
                onClick={() => !fileUploaded && document.getElementById("file-upload")?.click()}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl h-60 text-center p-6 transition ${
                  dragActive
                    ? "border-cyan-400 bg-cyan-400/[0.03]"
                    : fileUploaded
                      ? "border-indigo-500/50 bg-slate-1000"
                      : "border-slate-200 hover:border-slate-200 bg-transparent cursor-pointer"
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept=".pdf,.txt,.csv,.json"
                  className="hidden"
                />
                
                <UploadCloud
                  className={`h-12 w-12 mb-3 transition ${
                    fileUploaded ? "text-indigo-400" : "text-slate-400"
                  }`}
                />
                {fileUploaded ? (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700">{fileName}</h4>
                    <p className="mt-1 text-xs text-slate-500">File loaded and parsed locally.</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700">Drag manifest file here</h4>
                    <p className="mt-1 text-xs text-slate-500">Or click to select from local storage</p>
                  </div>
                )}



                {fileUploaded && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFileUploaded(false);
                      setParsedData(null);
                    }}
                    className="mt-4 text-xs text-red-400 hover:text-red-300 transition cursor-pointer"
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
                      onClick={() => {
                        setSelectedTemplate(t.id);
                        if (fileUploaded) {
                          setFileUploaded(false);
                          setParsedData(null);
                        }
                      }}
                      className={`cursor-pointer rounded-xl border p-3.5 transition ${
                        selectedTemplate === t.id
                          ? "border-cyan-500 bg-white"
                          : "border-slate-200 bg-white/45 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xs font-semibold">{t.name}</h4>
                          <p className="mt-0.5 text-[10px] text-slate-500">{t.description}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] text-slate-500">
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
                  className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white/90 h-[500px]"
                >
                  <Sparkles className="h-10 w-10 text-cyan-400 animate-pulse mb-3" />
                  <div className="text-xs font-semibold text-slate-700">Parsing manifest entries via local DPD-NEE NLP Model...</div>
                  <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-slate-100">
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
                    <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                      {parsedData.map((field) => {
                        const isFlagged = field.status === "flagged";
                        return (
                          <div
                            key={field.key}
                            className={`rounded-xl border p-3 flex items-start justify-between gap-3 ${
                              isFlagged
                                ? "border-amber-500/30 bg-amber-500/[0.02]"
                                : "border-slate-200 bg-transparent"
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <span className="text-[9px] text-slate-500 font-mono block uppercase">
                                {field.key}
                              </span>
                              <span className="text-xs font-semibold text-white/85 block mt-0.5">
                                {field.value}
                              </span>
                              {field.source && (
                                <span className="text-[7.5px] font-mono text-slate-400 block mt-0.5 uppercase">
                                  Rule match: {field.source}
                                </span>
                              )}
                            </div>

                            <div className="text-right">
                              <span className="text-[10px] font-mono text-slate-500 block">
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
                      onClick={() => {
                        toast.success("Manifest approved and sent to customs clearance.");
                      }}
                      className="flex-1 flex h-10 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 font-semibold text-slate-900 hover:bg-emerald-500 transition text-xs cursor-pointer"
                    >
                      <CheckCircle className="h-4 w-4" /> Approve Manifest
                    </button>
                    <button
                      onClick={handleExport}
                      className="flex-1 flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-100 transition text-xs cursor-pointer"
                    >
                      <Download className="h-4 w-4" /> Export Report
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-transparent p-6 text-center text-slate-500 h-[500px]">
                  <FileText className="h-12 w-12 text-slate-400 mb-3" />
                  <h4 className="text-sm font-semibold text-slate-700">Extraction Stream Idle</h4>
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
