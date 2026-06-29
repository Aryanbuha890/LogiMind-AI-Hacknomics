import React, { useState, useEffect, useRef } from 'react';
import { Camera, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';

interface VideoFeedProps {
    streamId: number;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ streamId }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isBackendOffline, setIsBackendOffline] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [streamError, setStreamError] = useState(false);

    const toggleProcessing = async () => {
        try {
            if (isProcessing) {
                await fetch('http://localhost:8000/live/stop', { method: 'POST' });
                setIsProcessing(false);
            } else {
                await fetch(`http://localhost:8000/live/start?stream_id=${streamId}`, { method: 'POST' });
                setIsProcessing(true);
            }
        } catch (error) {
            console.warn("Failed to toggle processing in backend, switching simulated state:", error);
            setIsProcessing(!isProcessing);
        }
    };

    // Check status on mount
    useEffect(() => {
        fetch('http://localhost:8000/live/status')
            .then(res => res.json())
            .then(data => {
                if (data.is_running) setIsProcessing(true);
                setIsBackendOffline(false);
            })
            .catch(() => {
                setIsBackendOffline(true);
                // Keep default simulated processing for unit 1 to make it look alive
                if (streamId === 1) setIsProcessing(true);
            });
    }, [streamId]);

    // HTML5 Canvas Animation for Simulated Feed (when backend is offline or stream fails)
    useEffect(() => {
        if (!isBackendOffline && !streamError) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let scanLineY = 0;
        let scanDirection = 1;
        let boxTime = 0;

        // Generate target coordinates for bounding boxes
        const boxes = [
            { x: 100, y: 150, w: 220, h: 120, label: "Wagon Body", conf: 0.96 },
            { x: 140, y: 230, w: 50, h: 50, label: "Spring Ass. 1", conf: 0.94, defect: streamId === 1 },
            { x: 230, y: 230, w: 50, h: 50, label: "Spring Ass. 2", conf: 0.92, defect: false }
        ];

        const render = () => {
            // Background
            ctx.fillStyle = '#050a15';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Tech Grid
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
            ctx.lineWidth = 1;
            const gridSize = 30;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Radar Circle in Corner
            ctx.beginPath();
            ctx.arc(canvas.width - 50, 50, 30, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(canvas.width - 50, 50, 15, 0, 2 * Math.PI);
            ctx.stroke();
            // Radar sweeping line
            const radarAngle = (Date.now() / 1000) % (Math.PI * 2);
            ctx.beginPath();
            ctx.moveTo(canvas.width - 50, 50);
            ctx.lineTo(
                canvas.width - 50 + Math.cos(radarAngle) * 30,
                50 + Math.sin(radarAngle) * 30
            );
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.stroke();

            // Text info
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.font = '10px monospace';
            ctx.fillText(`CAM_UNIT_0${streamId}`, 15, 25);
            ctx.fillText(`MODE: ${isProcessing ? 'AI_PIPELINE' : 'PASSIVE_STREAM'}`, 15, 40);
            ctx.fillText(`FPS: 30.00`, 15, 55);
            ctx.fillText(`DEVICE: SIM_GPU_01`, 15, 70);

            // Bounding Boxes (if processing is active)
            if (isProcessing) {
                boxTime += 0.02;
                boxes.forEach((box, index) => {
                    // Make them bob slightly
                    const offset = Math.sin(boxTime + index) * 3;
                    const bx = box.x + offset;
                    const by = box.y;

                    ctx.lineWidth = 1.5;
                    if (box.defect) {
                        ctx.strokeStyle = '#f43f5e'; // Red for defect
                        ctx.fillStyle = 'rgba(244, 63, 94, 0.08)';
                    } else {
                        ctx.strokeStyle = '#06b6d4'; // Cyan for standard
                        ctx.fillStyle = 'rgba(6, 182, 212, 0.05)';
                    }

                    // Draw Rect
                    ctx.fillRect(bx, by, box.w, box.h);
                    ctx.strokeRect(bx, by, box.w, box.h);

                    // Corner accents
                    ctx.fillStyle = box.defect ? '#f43f5e' : '#06b6d4';
                    const cornerLen = 10;
                    ctx.fillRect(bx - 2, by - 2, cornerLen, 3);
                    ctx.fillRect(bx - 2, by - 2, 3, cornerLen);
                    ctx.fillRect(bx + box.w - cornerLen + 2, by - 2, cornerLen, 3);
                    ctx.fillRect(bx + box.w - 1, by - 2, 3, cornerLen);
                    ctx.fillRect(bx - 2, by + box.h - 1, cornerLen, 3);
                    ctx.fillRect(bx - 2, by + box.h - cornerLen + 2, 3, cornerLen);
                    ctx.fillRect(bx + box.w - cornerLen + 2, by + box.h - 1, cornerLen, 3);
                    ctx.fillRect(bx + box.w - 1, by + box.h - cornerLen + 2, 3, cornerLen);

                    // Bounding Box Header label
                    ctx.font = 'bold 9px monospace';
                    ctx.fillText(`${box.label} [${(box.conf * 100).toFixed(0)}%]`, bx + 4, by - 5);
                });

                // Laser scan line
                scanLineY += 1.8 * scanDirection;
                if (scanLineY > canvas.height - 20 || scanLineY < 20) {
                    scanDirection *= -1;
                }
                const grad = ctx.createLinearGradient(0, scanLineY - 10, 0, scanLineY + 10);
                grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
                grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.35)');
                grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
                ctx.fillStyle = grad;
                ctx.fillRect(0, scanLineY - 10, canvas.width, 20);

                ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, scanLineY);
                ctx.lineTo(canvas.width, scanLineY);
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isBackendOffline, isProcessing, streamError, streamId]);

    // Handle image load error
    const handleStreamError = () => {
        setStreamError(true);
    };

    return (
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden border border-white/5">
            {/* Live Indicator */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                <span className="text-[10px] font-bold font-mono text-red-400 tracking-wider">LIVE</span>
            </div>

            {/* AI Control Buttons */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <button
                    onClick={toggleProcessing}
                    className={`
                        flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide transition-all border
                        ${isProcessing
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'}
                    `}
                >
                    {isProcessing ? (
                        <>
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                            STOP PIPELINE
                        </>
                    ) : (
                        <>
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                            RUN AI ENGINE
                        </>
                    )}
                </button>
            </div>

            {/* Main Video element */}
            {streamId === 1 ? (
                <video
                    src="/wagon.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-fill"
                />
            ) : !isBackendOffline && !streamError ? (
                <img
                    src={`http://localhost:8000/video_feed/${streamId}`}
                    alt={`Stream ${streamId}`}
                    className="w-full h-full object-fill"
                    onError={handleStreamError}
                />
            ) : (
                <canvas
                    ref={canvasRef}
                    width={480}
                    height={350}
                    className="w-full h-full object-cover"
                />
            )}

        </div>
    );
};

export default VideoFeed;
