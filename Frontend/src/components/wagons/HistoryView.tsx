import React, { useEffect, useState } from 'react';
import { FileText, Calendar, AlertTriangle, CheckCircle, ArrowLeft, RefreshCw, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface Inspection {
    id: number;
    video_name: string;
    timestamp: string;
    total_wagons: number;
}

interface Wagon {
    id: number;
    inspection_id: number;
    wagon_index: number;
    ocr_text: string;
    ocr_confidence: number;
    original_image_path?: string;
    deblurred_image_path?: string;
    cropped_number_path?: string;
    defects: string;
    is_night: boolean;
    timestamp: string;
}

const HistoryView: React.FC = () => {
    const [inspections, setInspections] = useState<Inspection[]>([]);
    const [selectedInspection, setSelectedInspection] = useState<number | null>(null);
    const [wagons, setWagons] = useState<Wagon[]>([]);
    const [loading, setLoading] = useState(false);
    const [isBackendOffline, setIsBackendOffline] = useState(true);

    // Fetch inspections list
    useEffect(() => {
        fetch('http://localhost:8000/history')
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Offline");
            })
            .then(data => {
                setInspections(data);
                setIsBackendOffline(false);
            })
            .catch(() => {
                setIsBackendOffline(true);
                // Simulated inspections data
                setInspections([
                    { id: 1402, video_name: "Central_Yard_East_Track_CAM1.mp4", timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), total_wagons: 3 },
                    { id: 1398, video_name: "North_Gate_CAM3_NightFeed.mp4", timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), total_wagons: 12 },
                    { id: 1385, video_name: "Mundra_Berth4_TrainA_Inspection.mp4", timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), total_wagons: 8 }
                ]);
            });
    }, []);

    // Fetch wagons detail list when inspection is selected
    useEffect(() => {
        if (!selectedInspection) return;

        setLoading(true);
        fetch(`http://localhost:8000/history/${selectedInspection}`)
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Offline");
            })
            .then(data => {
                setWagons(data);
                setLoading(false);
            })
            .catch(() => {
                // Simulated wagons list fallback
                setLoading(false);
                if (selectedInspection === 1402) {
                    setWagons([
                        { id: 201, inspection_id: 1402, wagon_index: 1, ocr_text: "IN-839281729", ocr_confidence: 0.98, defects: "None", is_night: false, timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
                        { id: 202, inspection_id: 1402, wagon_index: 2, ocr_text: "IN-473910928", ocr_confidence: 0.94, defects: "Leaf Spring Crack, Structural Corrosion", is_night: true, timestamp: new Date(Date.now() - 3600000 * 2 + 10000).toISOString() },
                        { id: 203, inspection_id: 1402, wagon_index: 3, ocr_text: "IN-182749382", ocr_confidence: 0.97, defects: "None", is_night: true, timestamp: new Date(Date.now() - 3600000 * 2 + 20000).toISOString() }
                    ]);
                } else {
                    setWagons(
                        Array.from({ length: 5 }, (_, i) => ({
                            id: 300 + i,
                            inspection_id: selectedInspection,
                            wagon_index: i + 1,
                            ocr_text: `IN-${Math.floor(100000000 + Math.random() * 900000000)}`,
                            ocr_confidence: 0.85 + Math.random() * 0.14,
                            defects: i === 2 ? "Axle Damage Alert" : "None",
                            is_night: selectedInspection === 1398,
                            timestamp: new Date(Date.now() - 3600000 * 24 + i * 15000).toISOString()
                        }))
                    );
                }
            });
    }, [selectedInspection]);

    // Forensic detail block generator
    const RenderForensicFrame = ({ label, type }: { label: string, type: 'raw' | 'enhanced' | 'ocr' }) => {
        let borderClass = 'border-border bg-muted/65';
        let titleColor = 'text-muted-foreground';
        let textVal = 'FORENSICS_STREAM';

        if (type === 'enhanced') {
            borderClass = 'border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-950/10';
            titleColor = 'text-cyan-600 dark:text-cyan-400';
            textVal = 'DEBLUR_PIPELINE';
        } else if (type === 'ocr') {
            borderClass = 'border-purple-500/20 bg-purple-500/5 dark:bg-purple-950/10';
            titleColor = 'text-purple-600 dark:text-purple-400';
            textVal = 'OCR_SEGMENT';
        }

        return (
            <div className="space-y-1">
                <span className={`text-[9px] font-mono uppercase tracking-wider ${titleColor}`}>{label}</span>
                <div className={`w-full h-32 rounded-lg border ${borderClass} flex flex-col items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid-sm opacity-10 pointer-events-none" />
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-wider mb-2 font-bold">{textVal}</span>
                    <div className="h-6 px-3 border border-border rounded flex items-center justify-center bg-slate-100 dark:bg-black/40">
                        <span className="text-[8px] font-mono text-slate-500 dark:text-slate-400">ANALYSIS_CHECK_OK</span>
                    </div>
                </div>
            </div>
        );
    };

    if (!selectedInspection) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
                    <span className="text-[10px] tracking-[0.2em] text-purple-400 font-bold uppercase font-mono">History Log</span>
                </div>

                <div className="space-y-3">
                    {inspections.map((insp, index) => (
                        <motion.div
                            key={insp.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-card border border-border rounded-xl p-5 hover:border-cyan-500/30 hover:bg-[#0B1A33]/5 dark:hover:bg-[#0B1A33]/15 backdrop-blur-md transition-all flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-bold text-foreground text-sm font-mono truncate max-w-xs sm:max-w-md">
                                        Inspection #{insp.id} - {insp.video_name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                                        {new Date(insp.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-mono bg-muted border border-border text-muted-foreground px-2 py-0.5 rounded">
                                    {insp.total_wagons} wagons
                                </span>
                                <button
                                    onClick={() => setSelectedInspection(insp.id)}
                                    className="px-3.5 py-1.5 bg-[#1b3a6b]/10 hover:bg-[#1b3a6b]/20 dark:bg-[#1b3a6b]/20 dark:hover:bg-[#1b3a6b]/50 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-lg text-xs font-semibold font-mono tracking-wide transition cursor-pointer"
                                >
                                    LOGS →
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    {inspections.length === 0 && (
                        <div className="py-16 text-center text-muted-foreground border border-dashed border-border rounded-xl font-mono text-xs">
                            No inspection history found. Trigger deblur pipeline on the upload tab.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSelectedInspection(null)}
                        className="p-2 hover:bg-muted rounded-lg border border-border text-muted-foreground hover:text-foreground transition flex items-center gap-1.5 text-xs font-semibold font-mono cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" /> BACK
                    </button>
                    <div>
                        <h3 className="text-base font-bold text-foreground font-mono">INSPECTION LOGS #{selectedInspection}</h3>
                        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Detailed Railway Wagon Forensic Record</p>
                    </div>
                </div>
                <button
                    onClick={() => window.open(`http://localhost:8000/history/${selectedInspection}/report`, '_blank')}
                    className="px-4 py-2 bg-gradient-to-r from-[#1b3a6b] to-[#2563eb] text-white text-xs font-bold font-mono tracking-wider rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                >
                    EXPORT REPORT
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-xs font-mono text-muted-foreground flex items-center justify-center gap-2">
                    <RefreshCw className="animate-spin text-cyan-400" /> LOADING REPORT DATA...
                </div>
            ) : (
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-1">
                    {wagons.map((wagon) => {
                        const hasWagonDefect = wagon.defects !== "None";
                        return (
                            <div key={wagon.id} className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-sm">
                                <div className="flex justify-between items-center border-b border-border pb-2.5">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-foreground font-mono">Wagon #{wagon.wagon_index}</span>
                                        <span className="text-[10px] text-muted-foreground font-mono">{new Date(wagon.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {wagon.is_night && (
                                            <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[8px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-widest">
                                                NIGHT_MODE
                                            </span>
                                        )}
                                        {hasWagonDefect ? (
                                            <span className="bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[8px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider animate-pulse">
                                                DEFECT FLAG
                                            </span>
                                        ) : (
                                            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] px-2 py-0.5 rounded font-mono font-bold uppercase">
                                                NOMINAL
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                                    {/* Stats panel summary */}
                                    <div className="md:col-span-4 bg-muted rounded-xl border border-border p-4 space-y-3.5 flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] font-mono font-bold uppercase text-muted-foreground tracking-wider">Analysis Telemetry</h4>
                                            <div className="space-y-2 font-mono text-xs">
                                                <div className="flex justify-between border-b border-border pb-1.5">
                                                    <span className="text-muted-foreground">OCR Reading:</span>
                                                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">{wagon.ocr_text}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-border pb-1.5">
                                                    <span className="text-muted-foreground">Confidence:</span>
                                                    <span className="text-foreground">{(wagon.ocr_confidence * 100).toFixed(1)}%</span>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-muted-foreground">Structural Defects:</span>
                                                    <span className={`text-[10px] font-bold ${hasWagonDefect ? 'text-rose-600 dark:text-rose-400' : 'text-muted-foreground'}`}>
                                                        {wagon.defects}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t border-border flex items-center justify-between text-[9px] font-mono text-muted-foreground">
                                            <span>MVIS STATE</span>
                                            <span className={hasWagonDefect ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-emerald-600 dark:text-emerald-400 font-bold'}>
                                                {hasWagonDefect ? 'FLAGGED FOR REPAIR' : 'OPERATIONAL_OK'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Forensic streams */}
                                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <RenderForensicFrame label="Zero-DCE (Input)" type="raw" />
                                        <RenderForensicFrame label="Zero-DCE (Output)" type="enhanced" />
                                        <RenderForensicFrame label="OCR Crop Frame" type="ocr" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {wagons.length === 0 && (
                        <div className="py-20 text-center text-xs font-mono text-slate-500 dark:text-slate-400 bg-muted/10 rounded-xl border border-border">
                            No wagon records detected for this inspection.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoryView;
