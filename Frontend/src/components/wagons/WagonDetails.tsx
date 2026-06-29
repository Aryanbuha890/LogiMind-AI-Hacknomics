import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WagonDetailsProps {
    streamId: number;
}

interface LiveWagonData {
    wagon_id: string;
    confidence: number;
    defects: string[];
    severity: 'Low' | 'Medium' | 'High' | 'None';
    entry_time?: string;
    speed?: string;
    source?: string;
}

const WagonDetails: React.FC<WagonDetailsProps> = ({ streamId }) => {
    const [details, setDetails] = useState<LiveWagonData | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`http://localhost:8000/live/wagon_details/${streamId}`)
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error("Offline");
                })
                .then(data => setDetails(data))
                .catch(() => {
                    // Simulated telemetry fallback
                    if (streamId === 1) {
                        setDetails({
                            wagon_id: 'IN-473910928',
                            confidence: 94.2,
                            defects: ['Leaf Spring Crack', 'Structural Corrosion'],
                            severity: 'High',
                            entry_time: '19:12:04',
                            speed: '14.8 kn',
                            source: 'North Yard Track 3'
                        });
                    } else if (streamId === 2) {
                        setDetails({
                            wagon_id: 'IN-182749382',
                            confidence: 98.7,
                            defects: [],
                            severity: 'None',
                            entry_time: '19:11:45',
                            speed: '15.2 kn',
                            source: 'North Yard Track 3'
                        });
                    } else {
                        setDetails({
                            wagon_id: 'IN-928193829',
                            confidence: 96.1,
                            defects: [],
                            severity: 'None',
                            entry_time: '19:10:02',
                            speed: '15.0 kn',
                            source: 'North Yard Track 3'
                        });
                    }
                });
        }, 3000);

        return () => clearInterval(interval);
    }, [streamId]);

    const hasDefects = details && details.defects.length > 0;
    const severityColor = details
        ? details.severity === 'High'
            ? 'text-rose-600 border-rose-500/30 bg-rose-500/10 dark:text-rose-400'
            : details.severity === 'Medium'
            ? 'text-amber-600 border-amber-500/30 bg-amber-500/10 dark:text-amber-400'
            : 'text-emerald-600 border-emerald-500/30 bg-emerald-500/10 dark:text-emerald-400'
        : 'text-muted-foreground border-border bg-muted/50';

    // Premium visual forensic widget
    const ForensicPlaceholder = ({ label, isEnhanced = false }: { label: string, isEnhanced?: boolean }) => {
        return (
            <div className="space-y-1.5">
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isEnhanced ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-muted-foreground'}`}>{label}</span>
                <div className={`relative w-full h-24 rounded-lg overflow-hidden border ${isEnhanced ? 'border-cyan-500/20 bg-[#0B1A33]/50' : 'border-border bg-muted/60'} flex items-center justify-center`}>
                    {/* Simulated tech design graphic */}
                    <div className="absolute inset-0 bg-grid-sm opacity-10 pointer-events-none" />
                    
                    {isEnhanced ? (
                        <div className="flex flex-col items-center gap-1 z-10 text-center px-2">
                            <span className="text-[10px] font-semibold text-cyan-300 font-mono tracking-wider">ZERO-DCE PRO</span>
                            <div className="w-16 h-8 border border-cyan-500/30 rounded flex items-center justify-center bg-cyan-900/10 relative overflow-hidden">
                                <span className="text-[8px] font-mono text-cyan-400">ENHANCED</span>
                                <div className="absolute inset-y-0 right-1/4 w-0.5 bg-cyan-400/40 animate-pulse" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-1 z-10 text-center px-2">
                            <span className="text-[9px] text-zinc-500 dark:text-zinc-600 font-mono">RAW_INPUT</span>
                            <div className="w-16 h-8 border border-border rounded flex items-center justify-center bg-black/10 opacity-60">
                                <span className="text-[8px] font-mono text-muted-foreground">LOW_LIGHT</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-border pb-3">
                <div>
                    <h4 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
                        {details?.wagon_id || '---'}
                        {details && (
                            <span className="text-[10px] font-normal bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                                {details.confidence.toFixed(1)}% Logit
                            </span>
                        )}
                    </h4>
                    <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                        Time: {details?.entry_time || 'N/A'} • {details?.speed || 'N/A'} • {details?.source || 'N/A'}
                    </p>
                </div>
                <div className={`px-2.5 py-1 rounded text-[10px] font-bold border ${details ? (hasDefects ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 dark:text-rose-400' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400') : 'bg-muted border-border text-muted-foreground'}`}>
                    {details ? (hasDefects ? 'FLAGGED' : 'PASSED') : 'AWAITING'}
                </div>
            </div>

            {/* Damage assessment info */}
            <div className="space-y-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">Damage Assessment</span>
                {details && hasDefects ? (
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                            {details.defects.map((d, i) => (
                                <span key={i} className="text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded flex items-center gap-1 font-mono">
                                    <AlertTriangle className="w-3 h-3" /> {d}
                                </span>
                            ))}
                        </div>
                        <div className="flex justify-between items-center text-xs bg-rose-500/5 border border-rose-500/10 rounded-lg p-2 mt-1">
                            <span className="text-muted-foreground font-mono text-[10px]">Severity Level:</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${severityColor}`}>{details.severity}</span>
                        </div>
                    </div>
                ) : details && !hasDefects ? (
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-lg">
                        <CheckCircle className="w-4 h-4" /> Brakes, axles, and suspension OK
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
                        <ChevronRight className="w-4 h-4 text-zinc-450" /> Awaiting extraction feed...
                    </div>
                )}
            </div>

            {/* Visual Forensics Section */}
            <div className="space-y-3 pt-3 border-t border-border">
                <div className="grid grid-cols-2 gap-3">
                    <ForensicPlaceholder label="Zero-DCE (Input)" />
                    <ForensicPlaceholder label="Zero-DCE (Output)" isEnhanced />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">OCR Region</span>
                        <div className="w-full h-14 bg-muted/65 rounded-lg border border-border flex items-center justify-center font-mono font-bold text-foreground text-sm tracking-widest relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid-sm opacity-5" />
                            {details ? (
                                <span className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded border border-cyan-500/20 shadow-inner">
                                    {details.wagon_id}
                                </span>
                            ) : (
                                <span className="text-muted-foreground text-xs italic">Awaiting OCR</span>
                            )}
                        </div>
                    </div>
                    <div className="space-y-1.5 flex flex-col justify-end">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">MVIS Flag</span>
                        <div className={`h-14 rounded-lg border flex items-center justify-center font-mono font-bold text-xs ${details ? (hasDefects ? 'bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20') : 'bg-muted border-border text-muted-foreground'}`}>
                            {details ? (hasDefects ? 'IMMEDIATE REPAIR' : 'WAGON DEPLOYABLE') : 'PENDING'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WagonDetails;
