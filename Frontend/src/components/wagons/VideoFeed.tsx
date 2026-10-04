import React, { useState, useEffect, useRef } from "react";
import { Camera, Zap, AlertTriangle, ShieldCheck, Play, Pause, RefreshCw, Eye, Maximize2 } from "lucide-react";

interface VideoFeedProps {
  streamId: number;
}

const STREAM_CONFIGS: Record<
  number,
  {
    title: string;
    videoSrc: string;
    fallbackImg: string;
    badge: string;
    badgeColor: string;
    model: string;
    boxes: { label: string; conf: string; boxClass: string; isAnomaly?: boolean }[];
  }
> = {
  1: {
    title: "CAM_01 · Yard East Track Entry",
    videoSrc: "/wagon-ocr.mp4",
    fallbackImg: "/wagons/resrult-detection.png",
    badge: "Wagon OCR Active",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    model: "YOLOv11-OCR + GAN Deblur",
    boxes: [
      {
        label: "IN-473910928",
        conf: "99.4%",
        boxClass: "top-[25%] left-[20%] w-[35%] h-[20%] border-cyan-400 bg-cyan-400/10",
      },
      {
        label: "Spring Ass. 01 [CRACK]",
        conf: "94.2%",
        boxClass: "top-[60%] left-[28%] w-[16%] h-[22%] border-rose-500 bg-rose-500/15 animate-pulse",
        isAnomaly: true,
      },
      {
        label: "Axle Box 02",
        conf: "97.8%",
        boxClass: "top-[62%] left-[62%] w-[15%] h-[20%] border-emerald-400 bg-emerald-400/10",
      },
    ],
  },
  2: {
    title: "CAM_02 · Yard Central Track",
    videoSrc: "/wagon-faults.mp4",
    fallbackImg: "/wagons/Result-detection-2.png",
    badge: "Anomaly Detection",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    model: "Defect-Vision-V2 (Axle/Spring)",
    boxes: [
      {
        label: "Wagon Coupler",
        conf: "98.1%",
        boxClass: "top-[30%] left-[10%] w-[25%] h-[30%] border-emerald-400 bg-emerald-400/10",
      },
      {
        label: "Structural Door Anomaly",
        conf: "91.6%",
        boxClass: "top-[20%] left-[45%] w-[30%] h-[40%] border-rose-500 bg-rose-500/15",
        isAnomaly: true,
      },
    ],
  },
  3: {
    title: "CAM_03 · Yard West Track",
    videoSrc: "/wagon-night.mp4",
    fallbackImg: "/wagons/Result-detection-3.png",
    badge: "Night-Vision / Zero-DCE",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    model: "Zero-DCE Low-Light Enhancer",
    boxes: [
      {
        label: "Zero-DCE Enhanced Frame",
        conf: "Restored",
        boxClass: "top-[15%] left-[15%] w-[70%] h-[65%] border-purple-400/50 bg-purple-500/5",
      },
      {
        label: "Plate IN-182749382",
        conf: "98.7%",
        boxClass: "top-[35%] left-[30%] w-[40%] h-[22%] border-cyan-400 bg-cyan-400/10",
      },
    ],
  },
};

const VideoFeed: React.FC<VideoFeedProps> = ({ streamId }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [useFallbackImg, setUseFallbackImg] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const config = STREAM_CONFIGS[streamId] || STREAM_CONFIGS[1];

  const toggleProcessing = () => {
    setIsProcessing((prev) => !prev);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    setUseFallbackImg(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy or video load issue
        console.warn("Video autoplay prevented or source not ready yet");
      });
    }
  }, [streamId]);

  return (
    <div className="relative w-full h-full bg-[#050914] rounded-xl overflow-hidden border border-white/10 group select-none shadow-2xl">
      {/* 1. TOP STATUS OVERLAY */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="text-[10px] font-bold font-mono text-red-400 tracking-wider">LIVE FEED</span>
        </div>

        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border backdrop-blur-md hidden sm:inline-flex ${config.badgeColor}`}>
          {config.badge}
        </span>
      </div>

      {/* 2. TOP RIGHT CONTROLS */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
        <button
          onClick={toggleProcessing}
          className={`
            flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide transition-all border shadow-lg cursor-pointer backdrop-blur-md
            ${
              isProcessing
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
            }
          `}
        >
          {isProcessing ? (
            <>
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              <span>STOP PIPELINE</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span>RUN AI ENGINE</span>
            </>
          )}
        </button>

        <button
          onClick={togglePlay}
          className="h-7 w-7 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition cursor-pointer backdrop-blur-md"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* 3. MAIN VIDEO OR FALLBACK IMAGE */}
      {!useFallbackImg ? (
        <video
          ref={videoRef}
          src={config.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onError={() => {
            console.warn(`Video ${config.videoSrc} failed, falling back to real image ${config.fallbackImg}`);
            setUseFallbackImg(true);
          }}
          className="w-full h-full object-cover sm:object-contain bg-black"
        />
      ) : (
        <div className="relative w-full h-full bg-black flex items-center justify-center">
          <img
            src={config.fallbackImg}
            alt={config.title}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* 4. AI HUD OVERLAY (When AI Pipeline is Active) */}
      {isProcessing && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Subtle Tech Grid Lines */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Laser Scanline Sweep */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse"
               style={{
                 top: "40%",
                 animationDuration: "3s"
               }}
          />

          {/* AI Bounding Boxes */}
          {config.boxes.map((b, idx) => (
            <div
              key={idx}
              className={`absolute rounded border-2 shadow-lg transition-all ${b.boxClass}`}
            >
              {/* Corner brackets */}
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />

              {/* Tag Label */}
              <span
                className={`absolute -top-5 left-0 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase tracking-wider text-white shadow-md ${
                  b.isAnomaly ? "bg-rose-600" : "bg-cyan-600"
                }`}
              >
                {b.label} • {b.conf}
              </span>
            </div>
          ))}

          {/* Telemetry Corner Info */}
          <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[9px] font-mono text-slate-300 space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">MODEL:</span>
              <span>{config.model}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span>FPS: 30.0</span>
              <span>RESOLUTION: 1920x1080</span>
              <span className="text-emerald-400">INFERENCE: 14ms</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
