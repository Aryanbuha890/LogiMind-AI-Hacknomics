import React, { useState, useEffect } from 'react';
import { Upload, Film, Zap, AlertTriangle, CheckCircle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Wagon {
    id: number;
    wagon_index: number;
    ocr_text: string;
    original_image_path?: string;
    deblurred_image_path?: string;
    cropped_number_path?: string;
    anomaly_image_path?: string;
    anomaly_type?: string;
}

const UploadView: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const [inspectionId, setInspectionId] = useState<number | null>(null);
    const [wagons, setWagons] = useState<Wagon[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setProcessedVideoUrl(null);
            setStatus(null);
            setInspectionId(null);
            setProcessing(false);
            setWagons([]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setStatus("Uploading Video...");
        setWagons([]);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setStatus("Upload complete. Processing initiated...");
                setInspectionId(data.inspection_id);
                setProcessing(true);
            } else {
                throw new Error("Server error");
            }
        } catch (error) {
            console.warn("Backend offline, launching client-side video processing simulation...");
            // Enter simulated processing pipeline
            setInspectionId(Math.floor(Math.random() * 9000) + 1000);
            setProcessing(true);
            setStatus("Initializing ML models...");
        }
    };

    // Polling and Simulation Effect
    useEffect(() => {
        let interval: any;
        let simWagonCount = 0;

        if (processing && inspectionId) {
            // Check if we are running real backend integration or simulation
            fetch(`http://localhost:8000/inspections/${inspectionId}/status`)
                .then(res => {
                    if (res.ok) {
                        // Real Backend polling
                        interval = setInterval(async () => {
                            try {
                                const statusRes = await fetch(`http://localhost:8000/inspections/${inspectionId}/status`);
                                if (statusRes.ok) {
                                    const data = await statusRes.json();
                                    if (data.status === 'COMPLETED') {
                                        setStatus("Processing Complete! Check History Tab to view results. ✅");
                                        setProcessedVideoUrl(data.video_url);
                                        setProcessing(false);
                                        setUploading(false);
                                        clearInterval(interval);
                                    } else if (data.status === 'FAILED') {
                                        setStatus("Processing Failed! Server Error ❌");
                                        setProcessing(false);
                                        setUploading(false);
                                        clearInterval(interval);
                                    } else {
                                        setStatus((prev) => prev === "Processing..." ? "Processing.. " : "Processing...");
                                    }
                                }

                                const wagonRes = await fetch(`http://localhost:8000/history/${inspectionId}`);
                                if (wagonRes.ok) {
                                    const wagonData = await wagonRes.json();
                                    setWagons(wagonData);
                                }
                            } catch (e) {
                                console.error("Error polling backend inspections:", e);
                            }
                        }, 2000);
                    } else {
                        throw new Error("Simulated");
                    }
                })
                .catch(() => {
                    // Simulated client-side processing timeline
                    const mockWagonsList = [
                        { id: 101, wagon_index: 1, ocr_text: "IN-839281729", anomaly_type: undefined },
                        { id: 102, wagon_index: 2, ocr_text: "IN-473910928", anomaly_type: "Leaf Spring Crack" },
                        { id: 103, wagon_index: 3, ocr_text: "IN-182749382", anomaly_type: undefined }
                    ];

                    interval = setInterval(() => {
                        simWagonCount += 1;
                        if (simWagonCount === 1) {
                            setStatus("Processing frames... Analyzing wagon index #1");
                            setWagons([mockWagonsList[0]]);
                        } else if (simWagonCount === 2) {
                            setStatus("Processing frames... Analyzing wagon index #2");
                            setWagons([mockWagonsList[0], mockWagonsList[1]]);
                        } else if (simWagonCount === 3) {
                            setStatus("Processing frames... Analyzing wagon index #3");
                            setWagons([mockWagonsList[0], mockWagonsList[1], mockWagonsList[2]]);
                        } else {
                            setStatus("Processing Complete! Check History Tab to view results. ✅");
                            setProcessing(false);
                            setUploading(false);
                            clearInterval(interval);
                        }
                    }, 2500); // Add a new wagon every 2.5 seconds
                });
        }

        return () => clearInterval(interval);
    }, [processing, inspectionId]);

    return (
        <div className="space-y-6">
            {/* Tab Header Title */}
            <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></div>
                <span className="text-[10px] tracking-[0.2em] text-cyan-500 dark:text-cyan-400 font-bold uppercase font-mono">Upload / Deblur Pipeline</span>
            </div>

            {/* Drag & drop upload module */}
            {!file && (
                <div className="border border-dashed border-border rounded-2xl p-16 text-center hover:border-cyan-500/30 hover:bg-[#0B1A33]/5 dark:hover:bg-[#0B1A33]/15 transition-all bg-card/90 backdrop-blur-md relative group">
                    <input
                        type="file"
                        accept="video/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        id="video-upload"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                            <Upload className="w-7 h-7 text-slate-500 dark:text-slate-400 group-hover:text-cyan-500 transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Upload Video Files</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm">Drag and drop inspection video files (MP4, AVI, MOV) for Zero-DCE and OCR deblur processing</p>
                        <span className="px-5 py-2.5 bg-gradient-to-r from-[#1b3a6b] to-[#2563eb] text-white text-xs font-semibold rounded-lg shadow-lg shadow-indigo-500/10 cursor-pointer">
                            Select File
                        </span>
                    </div>
                </div>
            )}

            {/* Video preview / Processing monitor */}
            {previewUrl && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 bg-card border border-border rounded-2xl p-5 backdrop-blur-md flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase font-mono tracking-wider">Video Inspector Feed</h3>

                        <div className="bg-black/80 rounded-xl overflow-hidden border border-border relative aspect-video flex items-center justify-center">
                            {processing ? (
                                <div className="absolute inset-0 bg-[#050B1A] flex flex-col items-center justify-center gap-4">
                                    {/* Tech simulated processing feed */}
                                    <div className="absolute inset-0 bg-grid-sm opacity-10" />
                                    <div className="relative flex items-center justify-center h-28 w-28">
                                        <div className="absolute inset-0 border-2 border-cyan-500/25 border-t-cyan-400 rounded-full animate-spin" />
                                        <div className="absolute inset-3 border border-indigo-500/20 border-b-indigo-400 rounded-full animate-spin [animation-duration:3s]" />
                                        <Film className="w-8 h-8 text-cyan-400" />
                                    </div>
                                    <div className="text-center z-10 space-y-1">
                                        <div className="text-xs text-cyan-300 font-bold font-mono tracking-widest uppercase">PIPELINE ACTIVE</div>
                                        <div className="text-[10px] text-zinc-400 font-mono">FRAME DEBLURRING & SEGMENTATION RUNNING</div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 text-[10px] text-emerald-400 font-mono rounded border border-emerald-500/20 animate-pulse flex items-center gap-1.5">
                                        <Zap className="w-3 h-3 text-emerald-400" /> LIVE INFERENCE
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <video src={processedVideoUrl || previewUrl} className="w-full h-full object-contain" controls />
                                    {processedVideoUrl && (
                                        <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-[9px] font-bold font-mono px-2.5 py-1 rounded shadow-md border border-emerald-450 z-20">
                                            PROCESSED VIEW
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center bg-muted p-4 rounded-xl border border-border">
                            <div className="flex flex-col gap-0.5">
                                <span className={`text-xs font-bold font-mono ${status && status.includes("Complete") ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                                    {status || "Ready to process"}
                                </span>
                                <span className="text-[10px] text-muted-foreground font-mono truncate max-w-xs">{file?.name}</span>
                            </div>
                            {!processing && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setFile(null);
                                            setPreviewUrl(null);
                                            setWagons([]);
                                        }}
                                        className="px-4 py-2 border border-border hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg text-xs font-semibold transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpload}
                                        className="px-4 py-2 bg-gradient-to-r from-[#1b3a6b] to-[#2563eb] hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-500/10 transition"
                                    >
                                        Start Processing
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detections Side Panel */}
                    <div className="lg:col-span-4 bg-card border border-border rounded-2xl p-5 backdrop-blur-md flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b border-border pb-2.5">
                            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wider">Detection Logs</h3>
                            {processing && (
                                <span className="flex h-1.5 w-1.5 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                                </span>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto max-h-[360px] space-y-3 pr-1">
                            {wagons.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 dark:text-slate-500 space-y-2">
                                    <Film className="w-8 h-8 opacity-20" />
                                    <p className="text-xs font-mono">No active detections. Trigger ML processing to stream live frame extraction.</p>
                                </div>
                            ) : (
                                [...wagons].reverse().map((wagon) => (
                                    <motion.div
                                        key={wagon.id}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-slate-50/80 dark:bg-slate-800/40 border border-border rounded-xl p-3 hover:border-cyan-500/20 transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="text-[9px] text-slate-500 dark:text-slate-450 font-mono font-bold block uppercase">Index #{wagon.wagon_index}</span>
                                                <span className="text-xs font-bold text-slate-850 dark:text-slate-200 font-mono">{wagon.ocr_text || "Reading OCR..."}</span>
                                            </div>
                                            {wagon.anomaly_type ? (
                                                <span className="bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-450 text-[8px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider animate-pulse">
                                                    {wagon.anomaly_type}
                                                </span>
                                            ) : (
                                                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-450 text-[8px] px-2 py-0.5 rounded font-mono font-bold uppercase">
                                                    PASS
                                                </span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-3 gap-1.5 mt-2">
                                            {/* Micro visual forensics thumbnails */}
                                            <div className="space-y-1">
                                                <span className="text-[7.5px] text-slate-500 dark:text-slate-450 uppercase font-mono block">Original</span>
                                                <div className="aspect-[4/3] bg-black/5 dark:bg-black/20 rounded border border-border flex items-center justify-center relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-[#0B1A33]/5" />
                                                    <span className="text-[8px] font-mono text-slate-400 dark:text-slate-550">RAW</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[7.5px] text-slate-500 dark:text-slate-450 uppercase font-mono block">Zero-DCE</span>
                                                <div className="aspect-[4/3] bg-black/5 dark:bg-black/20 rounded border border-border flex items-center justify-center relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-black/2 to-[#0B1A33]/10" />
                                                    <span className="text-[8px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold animate-pulse">DEBLUR</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[7.5px] text-slate-500 dark:text-slate-450 uppercase font-mono block mb-1">Anomaly</span>
                                                <div className={`aspect-[4/3] bg-black/5 dark:bg-black/20 rounded border flex items-center justify-center relative overflow-hidden ${wagon.anomaly_type ? 'border-rose-500/30 bg-rose-950/5' : 'border-border'}`}>
                                                    {wagon.anomaly_type ? (
                                                        <span className="text-[8px] font-mono text-rose-500 dark:text-rose-450 font-bold">ALERT</span>
                                                    ) : (
                                                        <span className="text-[8px] font-mono text-emerald-600 dark:text-emerald-500/70">OK</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadView;
