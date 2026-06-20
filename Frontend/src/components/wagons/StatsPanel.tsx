import React, { useEffect, useState } from 'react';
import { Activity, Container, Tag, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stats {
    total_wagons: number;
    last_wagon_id: string;
    defects_found: number;
    status: string;
}

const StatsPanel: React.FC = () => {
    const [stats, setStats] = useState<Stats>({
        total_wagons: 0,
        last_wagon_id: '---',
        defects_found: 0,
        status: 'Offline'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:8000/stats')
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error("Offline");
                })
                .then(data => setStats(data))
                .catch(() => {
                    // Fallback to high-quality simulated data when backend is offline
                    setStats({
                        total_wagons: 142,
                        last_wagon_id: 'IN-473910928',
                        defects_found: 14,
                        status: 'Operational (Simulated)'
                    });
                });
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const cards = [
        {
            label: "System Status",
            value: stats.status,
            icon: Activity,
            color: stats.status.includes('Operational') || stats.status === 'Processing' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400',
            bg: stats.status.includes('Operational') || stats.status === 'Processing' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20',
            desc: stats.status.includes('Simulated') ? 'Offline demo mode' : 'Real-time telemetry'
        },
        {
            label: "Wagons Counted",
            value: stats.total_wagons,
            icon: Container,
            color: 'text-cyan-600 dark:text-cyan-400',
            bg: 'bg-cyan-500/10 border-cyan-500/20',
            desc: 'Session Total'
        },
        {
            label: "Last Wagon ID",
            value: stats.last_wagon_id,
            icon: Tag,
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-500/10 border-purple-500/20',
            desc: 'Latest Scanned'
        },
        {
            label: "Defects Detected",
            value: stats.defects_found,
            icon: AlertTriangle,
            color: stats.defects_found > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-zinc-400',
            bg: stats.defects_found > 0 ? 'bg-rose-500/10 border-rose-500/20' : 'bg-zinc-500/10 border-zinc-500/20',
            desc: 'Needs Inspection'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {cards.map((card, i) => {
                const Icon = card.icon;
                return (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`rounded-xl border border-border bg-card/90 p-5 backdrop-blur-md flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition duration-300`}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                                {card.label}
                            </span>
                            <span className={`p-1.5 rounded-lg border ${card.bg} ${card.color}`}>
                                <Icon className="w-3.5 h-3.5" />
                            </span>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-none">
                                {card.value}
                            </h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-mono">{card.desc}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default StatsPanel;
