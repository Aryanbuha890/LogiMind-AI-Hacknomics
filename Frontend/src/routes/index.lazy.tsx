import { createLazyFileRoute, Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Container,
  Wrench,
  Ship,
  ShieldAlert,
  CloudSun,
  Sparkles,
  Activity,
  CheckCircle2,
  Brain,
  Database,
  Eye,
  Cpu,
  Network,
  Users,
  Menu,
  X,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Trophy,
  Coins,
  Bot,
  TrendingUp,
  Compass,
  GraduationCap,
  School,
  UserCheck,
  Map,
  GanttChart,
  FlaskConical,
  Rocket,
  Briefcase,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  Train,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

export const Route = createLazyFileRoute("/")({
  component: Landing,
});

function Landing() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // Eagerly preload all critical landing page images to prevent scroll layout shifts / pop-ins
  useEffect(() => {
    const imagesToPreload = [
      "/LogiMind Logo.png",
      "/1.jpg",
      "/2.jpg",
      "/3.jpg",
      "/4.jpg",
      "/5.jpg",
      "/H1.jpg",
      "/H2.jpg",
      "/H3.jpg",
      "/H4.jpg",
      "/H5.jpg",
      "/c1.png",
      "/c2.png",
      "/c3.png",
      "/c4.png",
      "/DP World.png",
      "/MSC.png",
      "/PSA.png",
      "/CMA CGM.png",
      "/CONCOR.png",
      "/Maersk.png",
      "/Adani Ports.png",
      "/JNPT.png",
      "/Evergreen.png",
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#05060F] text-white antialiased overflow-x-clip">
      <Nav />
      <Hero />
      <DashboardSection />
      <Trust />
      <JourneySection />
      <HowItWorks />
      <GarudInspectionSection />
      <Ecosystem />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        paddingTop: scrolled ? 10 : 18,
        paddingBottom: scrolled ? 10 : 18,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6"
    >
      <motion.div
        initial={false}
        animate={{
          maxWidth: scrolled ? 860 : 1180,
          paddingLeft: scrolled ? 12 : 20,
          paddingRight: scrolled ? 6 : 10,
          paddingTop: scrolled ? 5 : 9,
          paddingBottom: scrolled ? 5 : 9,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(15,23,42,0.72) 0%, rgba(30,27,75,0.62) 45%, rgba(15,23,42,0.72) 100%)",
        }}
        className="relative mx-auto flex items-center gap-3 sm:gap-6 rounded-full border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_-20px_rgba(2,6,23,0.65),inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_-1px_0_0_rgba(255,255,255,0.04)]"
      >
        {/* Top gloss reflection sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-t-full opacity-60"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        {/* Soft colorful background glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(120% 80% at 10% 0%, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0) 55%), radial-gradient(120% 80% at 90% 100%, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0) 55%)",
          }}
        />
        {/* Gradient border ring */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-full"
          style={{
            background:
              "linear-gradient(120deg, rgba(56,189,248,0.55), rgba(37,99,235,0.4), rgba(99,102,241,0.5))",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
            opacity: 0.7,
          }}
        />
        {/* Logo */}
        <div className="relative flex items-center">
          <Logo size="sm" />
        </div>
        {/* Navigation Links */}
        <nav className="relative hidden md:flex items-center gap-0.5 text-sm">
          {[
            { hash: "how", t: "How" },
            { hash: "wagon", t: "Wagon" },
            { hash: "ecosystem", t: "Ecosystem" },
            { hash: "platform", t: "Modules" },
            { hash: "demo", t: "Demo" },
          ].map((i) => (
            <Link
              key={i.t}
              to="/"
              hash={i.hash}
              className="relative rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-white/70 transition-colors hover:text-white hover:bg-white/10"
            >
              {i.t}
            </Link>
          ))}
        </nav>
        {/* Call to Actions */}
        <div className="relative ml-auto flex items-center gap-1.5">
          <Link
            to="/auth/login"
            className="hidden md:inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10"
          >
            Sign in
          </Link>
          <Link
            to="/app"
            className="group relative hidden md:inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-full px-4 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,99,235,0.7),inset_0_1px_0_0_rgba(255,255,255,0.35)] transition-transform hover:-translate-y-px"
            style={{
              backgroundImage: "linear-gradient(120deg, #1b3a6b 0%, #2563eb 50%, #0d9488 110%)",
            }}
          >
            <span className="relative z-10">Launch Platform</span>
            <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            {/* Glossy hover shimmer */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>

          {/* Hamburger Menu Toggle on Mobile */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-3 p-6 rounded-3xl border border-white/10 backdrop-blur-3xl bg-[#07091a]/95 shadow-2xl flex flex-col gap-4 md:hidden z-50"
            >
              {[
                { hash: "how", t: "How" },
                { hash: "wagon", t: "Wagon" },
                { hash: "ecosystem", t: "Ecosystem" },
                { hash: "platform", t: "Modules" },
                { hash: "demo", t: "Demo" },
              ].map((i) => (
                <Link
                  key={i.t}
                  to="/"
                  hash={i.hash}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-semibold text-white/70 hover:text-white transition py-2 border-b border-white/5 last:border-b-0"
                >
                  {i.t}
                </Link>
              ))}
              <div className="flex flex-col gap-2.5 mt-2 pt-2">
                <Link
                  to="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-white/70 hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  to="/app"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold text-white"
                  style={{
                    backgroundImage: "linear-gradient(120deg, #1b3a6b 0%, #2563eb 50%, #0d9488 110%)",
                  }}
                >
                  Launch Platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const [wordIdx, setWordIdx] = useState(0);
  const rotatingWords = [
    { text: "Ports", gradient: "from-cyan-400 to-blue-500" },
    { text: "Rail", gradient: "from-emerald-400 to-cyan-500" },
    { text: "Yards", gradient: "from-blue-400 to-indigo-600" },
    { text: "Terminals", gradient: "from-violet-400 to-indigo-500" },
    { text: "Logistics", gradient: "from-cyan-400 to-indigo-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch((err) => {
        console.warn("Video autoplay prevented: ", err);
      });
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo);
    }

    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-white pt-24 pb-12"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 10%, rgba(37,99,235,0.32), transparent 60%), radial-gradient(900px 500px at 80% 0%, rgba(13,148,136,0.22), transparent 60%), radial-gradient(700px 400px at 10% 20%, rgba(139,92,246,0.15), transparent 60%), linear-gradient(180deg, #05060F 0%, #07091A 60%, #05060F 100%)",
      }}
    >
      {/* Cinematic Looping CGI Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4"
          className="w-full h-full object-cover opacity-100"
          autoPlay
          preload="auto"
          muted
          loop
          playsInline
        />
        {/* Cinematic overlays for depth and readability */}
        <div className="absolute inset-0 bg-[#05060F]/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060F]/5 via-transparent to-[#05060F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05060F]/10 via-transparent to-[#05060F]/10" />
        {/* Atmospheric glow matching the theme of the video */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_70%)]" />
      </div>

      {/* Grid + scanline overlays */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.6) 3px, transparent 4px)",
        }}
      />
      {/* Aurora radial backdrops */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.45),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.3),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.25),transparent)] blur-3xl" />      <style>{`

        @keyframes border-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .btn-liquid {
          position: relative;
          width: 250px;
          height: 48px;
          border-radius: 50px;
          overflow: hidden;
          padding: 1.5px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.35);
          transition: all 0.3s ease;
          text-decoration: none;
          cursor: pointer;
          background: transparent;
          border: none;
        }

        .btn-liquid:hover {
          box-shadow: 0 0 25px rgba(6, 182, 212, 0.7);
          transform: translateY(-2px) scale(1.02);
        }

        /* Spinning border glow background */
        .btn-liquid::before {
          content: '';
          position: absolute;
          width: 380px;
          height: 380px;
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            #06b6d4 25%,
            #3b82f6 50%,
            #00f2fe 75%,
            transparent 100%
          );
          animation: border-spin 3s linear infinite;
          z-index: 0;
        }

        .btn-liquid-inner {
          position: relative;
          width: 100%;
          height: 100%;
          background: #05060F;
          border-radius: 48px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .liquid {
          background-color: #2893eb;
          width: 100%;
          height: 48px;
          position: absolute;
          bottom: 0;
          left: 0;
          pointer-events: none;
          z-index: 1;
          box-shadow: inset 5px -5px 25px #104e81, inset -5px 0px 25px #104e81;
        }

        .liquid::after {
          content: '';
          width: 560px;
          height: 500px;
          background: #05060F;
          z-index: 2;
          position: absolute;
          left: -155px;
          top: -475px;
          border-radius: 45%;
          animation: liquid-animate 5s linear 2s infinite;
        }

        .liquid::before {
          content: '';
          width: 560px;
          height: 500px;
          background-color: rgb(68, 160, 235);
          z-index: 2;
          position: absolute;
          left: -155px;
          top: -475px;
          border-radius: 40%;
          animation: liquid-animate 5s linear 1.8s infinite;
        }

        .btn-liquid-txt {
          position: relative;
          z-index: 3;
          font-size: 11px;
          font-weight: 700;
          font-family: "Orbitron", sans-serif;
          letter-spacing: 1.5px;
          color: #fff;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        @keyframes liquid-animate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          pointer-events: none;
          z-index: 2;
          opacity: 0;
        }
        .bubble-1 {
          width: 6px;
          height: 6px;
          left: 30%;
          bottom: 5px;
          animation: bubble-rise 3s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        .bubble-2 {
          width: 4px;
          height: 4px;
          left: 50%;
          bottom: 2px;
          animation: bubble-rise 2.5s ease-in-out infinite;
          animation-delay: 1.2s;
        }
        .bubble-3 {
          width: 8px;
          height: 8px;
          left: 70%;
          bottom: 4px;
          animation: bubble-rise 3.5s ease-in-out infinite;
          animation-delay: 0.7s;
        }

        @keyframes bubble-rise {
          0% {
            transform: translateY(20px) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-50px) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes boat-bob {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-2.5px) rotate(-3deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        .boat-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          animation: boat-bob 3s ease-in-out infinite;
          margin-right: 8px;
          position: relative;
          z-index: 10;
        }

        .btn-space {
          position: relative;
          width: 250px;
          height: 48px;
          border-radius: 50px;
          overflow: hidden;
          padding: 1.5px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
          transition: all 0.3s ease;
          background: transparent;
          cursor: pointer;
          border: none;
        }

        .btn-space:hover {
          box-shadow: 0 0 25px rgba(6, 182, 212, 0.55);
          transform: translateY(-2px) scale(1.02);
        }

        /* Rotating cosmic border using web theme color palette */
        .btn-space::before {
          content: '';
          position: absolute;
          width: 380px;
          height: 380px;
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            #06b6d4 25%,
            #3b82f6 50%,
            #10b981 75%,
            transparent 100%
          );
          animation: border-spin 3.5s linear infinite;
          z-index: 0;
        }

        .btn-space-inner {
          position: relative;
          width: 100%;
          height: 100%;
          background: #05060F;
          border-radius: 48px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: background 0.3s ease;
        }

        .btn-space-strong {
          z-index: 3;
          font-family: "Orbitron", sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #ffffff;
          text-shadow: 0 0 4px white;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        #container-stars {
          position: absolute;
          z-index: 1;
          width: 100%;
          height: 100%;
          overflow: hidden;
          transition: 0.5s;
          backdrop-filter: blur(1rem);
          border-radius: 5rem;
          pointer-events: none;
          inset: 0;
        }

        #glow {
          position: absolute;
          display: flex;
          width: 12rem;
          z-index: 2;
          pointer-events: none;
          inset: 0;
        }

        .circle {
          position: absolute;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          filter: blur(25px);
        }

        .circle:nth-of-type(1) {
          background: rgba(6, 182, 212, 0.6);
          animation: orbit 8s linear infinite;
        }

        .circle:nth-of-type(2) {
          background: rgba(16, 185, 129, 0.7);
          animation: orbit 10s linear infinite;
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }

        #stars {
          position: relative;
          background: transparent;
          width: 200rem;
          height: 200rem;
        }

        #stars::after {
          content: "";
          position: absolute;
          top: -10rem;
          left: -100rem;
          width: 100%;
          height: 100%;
          animation: animStarRotate 90s linear infinite;
        }

        #stars::after {
          background-image: radial-gradient(#ffffff 1px, transparent 1%);
          background-size: 50px 50px;
        }

        #stars::before {
          content: "";
          position: absolute;
          top: 0;
          left: -50%;
          width: 170%;
          height: 500%;
          animation: animStar 60s linear infinite;
        }

        #stars::before {
          background-image: radial-gradient(#ffffff 1px, transparent 1%);
          background-size: 50px 50px;
          opacity: 0.5;
        }

        @keyframes animStar {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-135rem);
          }
        }

        @keyframes animStarRotate {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0);
          }
        }
      `}</style>

      <div className="relative w-full max-w-6xl px-6 flex flex-col justify-center items-center flex-1 z-10">
        <motion.div style={{ y }} className="mx-auto max-w-5xl text-center w-full flex flex-col items-center justify-center">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-6 tracking-tight text-white text-3xl sm:text-5xl md:text-6xl lg:text-[78px] xl:text-[90px] 2xl:text-[100px] leading-[1.1] text-center font-black"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="inline-block whitespace-nowrap">Autonomous Intelligence</span>
            <br />
            <span className="flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-4">
              <span className="text-white/90">For Global</span>
              <span className="relative inline-flex items-center justify-start w-[130px] sm:w-[180px] md:w-[230px] lg:w-[325px] xl:w-[380px] 2xl:w-[430px] h-[38px] sm:h-[54px] md:h-[66px] lg:h-[86px] xl:h-[98px] 2xl:h-[110px] overflow-visible">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIdx}
                    initial={{ y: 20, opacity: 0, filter: "blur(5px)", rotateX: -60 }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotateX: 0 }}
                    exit={{ y: -20, opacity: 0, filter: "blur(5px)", rotateX: 60 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      transformOrigin: "bottom center",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    className={`absolute left-0 text-left bg-clip-text text-transparent bg-gradient-to-r ${rotatingWords[wordIdx].gradient} font-black`}
                  >
                    {rotatingWords[wordIdx].text}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-8 max-w-3xl text-sm sm:text-base md:text-lg text-white/60 leading-relaxed text-center font-medium"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <span className="text-white font-semibold">LogiMind AI</span> combines{" "}
            <span className="text-white font-semibold">Computer Vision</span>,{" "}
            <span className="text-white font-semibold">Railway Yard Analytics</span>,{" "}
            <span className="text-white font-semibold">Predictive Maintenance</span>,{" "}
            <span className="text-white font-semibold">Multi-Agent AI</span>,{" "}
            <span className="text-white font-semibold">Vessel Intelligence</span>,{" "}
            <span className="text-white font-semibold">Weather Monitoring</span>, and{" "}
            <span className="text-white font-semibold">Operational Analytics</span> into one unified command center.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-6"
          >
            <Link to="/app" className="btn-liquid">
              <span className="btn-liquid-inner">
                <span className="liquid" />
                <span className="bubble bubble-1" />
                <span className="bubble bubble-2" />
                <span className="bubble bubble-3" />
                <span className="btn-liquid-txt">
                  <span className="boat-container">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 16h20l-2 3.5H4L2 16z" fill="rgba(34, 211, 238, 0.35)" stroke="#22d3ee" />
                      <rect x="5" y="11" width="3" height="5" fill="#3b82f6" stroke="#3b82f6" />
                      <rect x="9" y="9" width="4" height="7" fill="#10b981" stroke="#10b981" />
                      <rect x="14" y="12" width="3" height="4" fill="#a855f7" stroke="#a855f7" />
                      <path d="M18 12v4h2v-2.5h-2z" fill="#ffffff" />
                    </svg>
                  </span>
                  Launch Console
                  <ArrowRight className="h-4 w-4 shrink-0 relative z-10" />
                </span>
              </span>
            </Link>

            <button type="button" className="btn-space">
              <span className="btn-space-inner">
                <span className="btn-space-strong">
                  <PlayCircle className="h-4 w-4 shrink-0" />
                  Watch 90-sec Demo
                </span>
                <div id="container-stars">
                  <div id="stars" />
                </div>
                <div id="glow">
                  <div className="circle" />
                  <div className="circle" />
                </div>
              </span>
            </button>
          </motion.div>

          {/* HUD Status Widgets */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl px-4"
          >
            {/* System Pulse Widget */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.04] hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.15)] hover:-translate-y-0.5 select-none cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <span className="absolute flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">TELEMETRY // PM-OS</div>
                  <div className="text-xs font-semibold font-mono text-white/80 tracking-wide mt-0.5 uppercase">SYSTEM PULSE: ACTIVE</div>
                </div>
              </div>

              {/* Pulse Audio Ticker Waveform */}
              <div className="flex items-end gap-0.5 h-6">
                {[4, 10, 6, 14, 8, 4].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-emerald-400/70 rounded-full animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDuration: `${0.8 + i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* AI Agent Mesh Widget */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between backdrop-blur-2xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.04] hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.15)] hover:-translate-y-0.5 select-none cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                  <Bot className="h-5 w-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">AGENT MESH</div>
                  <div className="text-xs font-semibold font-mono text-white/80 tracking-wide mt-0.5 uppercase">9 AGENTS ONLINE</div>
                </div>
              </div>

              {/* Glowing active dots */}
              <div className="flex gap-1 select-none pr-1">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="h-1.5 w-1.5 rounded-full bg-cyan-400/80 animate-ping"
                    style={{
                      animationDuration: "1.5s",
                      animationDelay: `${idx * 200}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* AI Accuracy Widget */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between backdrop-blur-2xl transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.04] hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.15)] hover:-translate-y-0.5 select-none cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform duration-300">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">ACCURACY RATING</div>
                  <div className="text-xs font-semibold font-mono text-white/80 tracking-wide mt-0.5 uppercase">98.7% AI ACCURACY</div>
                </div>
              </div>

              {/* Radial Progress Mini-circle */}
              <div className="relative h-7 w-7 flex items-center justify-center">
                <svg className="h-7 w-7 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                    strokeDasharray="88"
                    strokeDashoffset={88 - 88 * 0.987}
                    strokeLinecap="round"
                    className="group-hover:stroke-amber-300 transition-colors duration-300"
                  />
                </svg>
                <span className="absolute text-[8px] font-mono font-bold text-amber-400/90 group-hover:scale-105 transition-transform">98%</span>
              </div>
            </div>

            {/* Savings Widget */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between backdrop-blur-2xl transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.04] hover:shadow-[0_15px_30px_-10px_rgba(139,92,246,0.15)] hover:-translate-y-0.5 select-none cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:translate-y-[-2px] transition-transform duration-300">
                  <Coins className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">OPERATIONAL ROI</div>
                  <div className="text-xs font-semibold font-mono text-white/80 tracking-wide mt-0.5 uppercase">$4.2M SAVED YTD</div>
                </div>
              </div>

              {/* Sparkline mini chart */}
              <svg className="h-5 w-12 text-violet-400/80 group-hover:text-violet-300 transition-colors duration-300" viewBox="0 0 50 20">
                <path d="M0,16 Q10,12 20,13 T40,6 T50,2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M0,16 Q10,12 20,13 T40,6 T50,2 L50,20 L0,20 Z" fill="currentColor" opacity="0.12" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface DashboardMockupCardProps {
  roleName: string;
  accentColor: string;
  accentColorClass: string;
  accentBgClass: string;
  successScore: number;
  successStatus: string;
  progressMetrics: { label: string; value: string; percentage: number; fromColor: string; toColor: string }[];
  chartTitle: string;
  chartValue: string;
  chartChange: string;
  chartAreaGradId: string;
  chartLineGradId: string;
  chartLinePath: string;
  chartAreaPath: string;
  chartTooltipTime: string;
  chartTooltipValue: string;
  chartTooltipChange: string;
  sparklines: { label: string; value: string; change: string; color: string; sparkPoints: number[] }[];
  liveEvents: { time: string; message: string; color: string; tag: string }[];
  sidebarItems: { icon: any; label: string; active?: boolean }[];
  floatingChips: { title: string; subtitle: string; icon: any; gradFrom: string; gradTo: string; xPosClass: string; yPosClass: string }[];
  copilotStatus: string;
}

function DashboardMockupCard({
  roleName,
  accentColor,
  accentColorClass,
  successScore,
  successStatus,
  progressMetrics,
  chartTitle,
  chartValue,
  chartChange,
  chartAreaGradId,
  chartLineGradId,
  chartLinePath,
  chartAreaPath,
  chartTooltipTime,
  chartTooltipValue,
  chartTooltipChange,
  sparklines,
  liveEvents,
  sidebarItems,
  floatingChips,
  copilotStatus,
}: DashboardMockupCardProps) {
  return (
    <div className="relative mx-auto max-w-5xl w-full">
      {/* Glow aura */}
      <div
        className="absolute -inset-x-16 -inset-y-10 -z-10 rounded-[44px] blur-3xl opacity-35 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`
        }}
      />

      {/* Outer gradient bordered window */}
      <div
        className="rounded-[20px] p-[1px]"
        style={{
          background: `linear-gradient(140deg, rgba(255,255,255,0.2) 0%, ${accentColor}40 30%, rgba(255,255,255,0.05) 100%)`,
        }}
      >
        <div
          className="overflow-hidden rounded-[19px] bg-[#070913]/95 backdrop-blur-2xl"
          style={{
            boxShadow: `0 45px 100px -25px rgba(0,0,0,0.95), 0 0 50px -10px ${accentColor}55`
          }}
        >
          {/* Top window browser bar */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-gradient-to-b from-[#090b16] to-[#05060f] px-4 py-2.5">
            <div className="flex items-center gap-1.5 w-[20%]">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840] shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)]" />
            </div>

            <div className="mx-auto flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono text-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              logimind.ai/command?role={roleName}
            </div>

            <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-white/40 w-[20%] justify-end">
              <span className="hidden items-center gap-1 md:inline-flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                LIVE
              </span>
            </div>
          </div>

          {/* Main workspace frame */}
          <div className="grid grid-cols-12 gap-px bg-white/5">
            {/* Sidebar */}
            <aside className="col-span-2 hidden flex-col gap-1.5 bg-[#05060F] p-3 lg:flex">
              {sidebarItems.map((it, i) => {
                const Ic = it.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[11px] font-medium transition-colors cursor-pointer ${it.active
                        ? "bg-white/10 text-white"
                        : "text-white/45 hover:text-white/80 hover:bg-white/5"
                      }`}
                  >
                    <Ic className="h-3.5 w-3.5" style={{ color: it.active ? accentColor : "currentColor" }} />
                    {it.label}
                  </div>
                );
              })}
            </aside>

            {/* Content panel */}
            <div className="col-span-12 grid grid-cols-12 gap-3 bg-[#070913] p-4 lg:col-span-10">
              {/* Success Score Gauge */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 sm:col-span-4 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/45">
                  <span>Risk Status</span>
                  <span style={{ color: accentColor }}>{successStatus}</span>
                </div>

                <div className="mt-3 flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0">
                    <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                      <defs>
                        <linearGradient id={`score-grad-${roleName}`} x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0%" stopColor={accentColor} />
                          <stop offset="100%" stopColor="#22D3EE" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="3"
                      />
                      <motion.circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke={`url(#score-grad-${roleName})`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="97"
                        initial={{ strokeDashoffset: 97 }}
                        animate={{ strokeDashoffset: 97 - (97 * successScore) / 100 }}
                        transition={{ duration: 1.6, delay: 0.6 }}
                      />
                    </svg>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <div className="font-display text-xl font-bold text-white">{successScore}</div>
                        <div className="text-[8px] font-mono uppercase text-white/40">/100</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {progressMetrics.map((pm, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="flex items-center justify-between text-[10px] text-white/60">
                          <span>{pm.label}</span>
                          <span className="font-mono" style={{ color: pm.toColor }}>{pm.value}</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pm.percentage}%`,
                              background: `linear-gradient(to right, ${pm.fromColor}, ${pm.toColor})`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Velocity Chart or Custom Layout based on Role */}
              <div className="col-span-12 sm:col-span-8">
                {roleName === "vessels" && (
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 h-full flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                          Live Vessel Traffic Queue
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[9px] font-mono text-cyan-300">
                          <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-pulse" />
                          8 arriving today
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-[11px]">
                          <thead>
                            <tr className="border-b border-white/5 text-white/45">
                              <th className="pb-2 font-medium">VESSEL</th>
                              <th className="pb-2 font-medium">BERTH</th>
                              <th className="pb-2 font-medium">ETA TIMELINE</th>
                              <th className="pb-2 font-medium">STATUS</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-white/80">
                            {[
                              { name: "MV-Atlas", berth: "Berth 3", eta: "15:22 (On Time)", status: "Berthed", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                              { name: "CMA CGM Orion", berth: "Berth 1", eta: "16:45 (On Time)", status: "Approaching", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
                              { name: "MSC Geneva", berth: "Berth 5", eta: "18:10 (Delayed)", status: "Speed Adjusted", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                            ].map((ship, idx) => (
                              <tr key={idx} className="hover:bg-white/[0.02]">
                                <td className="py-3.5 font-semibold flex items-center gap-2 text-white">
                                  <Ship className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                                  {ship.name}
                                </td>
                                <td className="py-3.5 text-white/70">{ship.berth}</td>
                                <td className="py-3.5 text-white/60 font-mono">{ship.eta}</td>
                                <td className="py-3.5">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium border ${ship.color}`}>
                                    {ship.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {roleName === "yard" && (
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 h-full flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                          Yard Block Capacity Grid
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-mono text-emerald-300">
                          <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" />
                          6 blocks active
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3.5 mt-2">
                        {[
                          { block: "Yard A", fill: 72, color: "#10B981" },
                          { block: "Yard B", fill: 91, color: "#EF4444" },
                          { block: "Yard C", fill: 45, color: "#3B82F6" },
                          { block: "Yard D", fill: 88, color: "#F59E0B" },
                          { block: "Yard E", fill: 34, color: "#10B981" },
                          { block: "Yard F", fill: 67, color: "#3B82F6" },
                        ].map((item, idx) => (
                          <div key={idx} className="rounded-lg border border-white/5 bg-[#05060F] p-3 flex flex-col justify-between hover:border-emerald-500/20 transition">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-semibold text-white/95">{item.block}</span>
                              <span className="text-[9.5px] font-mono text-white/40">{item.fill}%</span>
                            </div>
                            <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${item.fill}%`, backgroundColor: item.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {roleName === "rails" && (
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 h-full flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <div>
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                          Live Wagon Telemetry & OCR Scan Log
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[9px] font-mono text-amber-300">
                          <span className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-pulse" />
                          Train T-104 active scan
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-[11px]">
                          <thead>
                            <tr className="border-b border-white/5 text-white/45">
                              <th className="pb-2 font-medium">WAGON NO.</th>
                              <th className="pb-2 font-medium">CAM UNIT</th>
                              <th className="pb-2 font-medium">OCR VALUE (CONF)</th>
                              <th className="pb-2 font-medium">DEFECTS STATUS</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-white/80">
                            {[
                              { name: "CR-8812", unit: "Track 2 · Cam 01", ocr: "CR8812 (98.7%)", status: "Cleared", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                              { name: "IND-9271", unit: "Track 2 · Cam 02", ocr: "IND9271 (99.1%)", status: "Axle Anomaly Alert", color: "text-red-400 bg-red-500/10 border-red-500/20" },
                              { name: "ER-4402", unit: "Track 1 · Cam 03", ocr: "ER4402 (97.4%)", status: "Under Review", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                            ].map((wagon, idx) => (
                              <tr key={idx} className="hover:bg-white/[0.02]">
                                <td className="py-3.5 font-semibold flex items-center gap-2 text-white">
                                  <Train className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                  {wagon.name}
                                </td>
                                <td className="py-3.5 text-white/70">{wagon.unit}</td>
                                <td className="py-3.5 text-white/60 font-mono">{wagon.ocr}</td>
                                <td className="py-3.5">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium border ${wagon.color}`}>
                                    {wagon.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {roleName === "executive" && (
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                          {chartTitle}
                        </div>
                        <div className="mt-1 font-display text-2xl font-semibold text-white">
                          {chartValue} <span className="text-xs font-medium text-emerald-300">{chartChange}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-[10px] font-mono text-white/50">
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-white">24h</span>
                        <span className="px-2 py-0.5">7d</span>
                        <span className="px-2 py-0.5">30d</span>
                      </div>
                    </div>

                    <div className="relative mt-3">
                      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="h-32 w-full">
                        <defs>
                          <linearGradient id={chartAreaGradId} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={accentColor} stopOpacity="0.55" />
                            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id={chartLineGradId} x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor={accentColor} />
                            <stop offset="100%" stopColor="#22D3EE" />
                          </linearGradient>
                          <filter id={`glow-${roleName}`} x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2.5" result="b" />
                            <feMerge>
                              <feMergeNode in="b" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        {/* grid markers */}
                        {[20, 50, 80].map((yVal) => (
                          <line
                            key={yVal}
                            x1="0"
                            x2="400"
                            y1={yVal}
                            y2={yVal}
                            stroke="rgba(255,255,255,0.05)"
                            strokeDasharray="2 4"
                          />
                        ))}
                        {/* y ticks */}
                        {[
                          { y: 20, l: "15k" },
                          { y: 50, l: "10k" },
                          { y: 80, l: "5k" },
                        ].map((t) => (
                          <text
                            key={t.y}
                            x="4"
                            y={t.y - 2}
                            fill="rgba(255,255,255,0.25)"
                            fontSize="7"
                            fontFamily="ui-monospace,monospace"
                          >
                            {t.l}
                          </text>
                        ))}
                        <motion.path
                          d={chartAreaPath}
                          fill={`url(#${chartAreaGradId})`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.2, delay: 0.4 }}
                        />
                        <motion.path
                          d={chartLinePath}
                          fill="none"
                          stroke={`url(#${chartLineGradId})`}
                          strokeWidth="2"
                          filter={`url(#glow-${roleName})`}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.6 }}
                        />
                        {/* crosshair pointer */}
                        <line
                          x1="270"
                          x2="270"
                          y1="0"
                          y2="110"
                          stroke={`${accentColor}55`}
                          strokeDasharray="2 3"
                        />
                        <circle
                          cx="270"
                          cy="62"
                          r="5"
                          fill={accentColor}
                          stroke="#0A0E1F"
                          strokeWidth="2.5"
                        />
                        <circle cx="270" cy="62" r="9" fill="none" stroke={`${accentColor}55`} />
                        {/* labels */}
                        {["00:00", "06:00", "12:00", "18:00", "24:00"].map((lbl, idx) => (
                          <text
                            key={lbl}
                            x={idx * 100}
                            y="118"
                            fill="rgba(255,255,255,0.3)"
                            fontSize="7"
                            fontFamily="ui-monospace,monospace"
                            textAnchor={idx === 0 ? "start" : idx === 4 ? "end" : "middle"}
                          >
                            {lbl}
                          </text>
                        ))}
                      </svg>
                      {/* floating tooltip card */}
                      <div
                        className="pointer-events-none absolute"
                        style={{ left: "calc(67.5% - 56px)", top: "8%" }}
                      >
                        <div className="rounded-lg border border-white/10 bg-[#0B1024]/90 px-2.5 py-1.5 text-[10px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                          <div className="font-mono text-white/40">{chartTooltipTime}</div>
                          <div className="font-display text-sm font-semibold text-white">{chartTooltipValue}</div>
                          <div className="text-[9px]" style={{ color: accentColor }}>{chartTooltipChange}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sparkline cards */}
              {sparklines.map((k, i) => {
                const max = Math.max(...k.sparkPoints);
                const pts = k.sparkPoints
                  .map(
                    (val, idx) => `${(idx / (k.sparkPoints.length - 1)) * 100},${30 - (val / (max || 1)) * 24}`,
                  )
                  .join(" ");
                return (
                  <div
                    key={i}
                    className="col-span-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:col-span-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-white/45 uppercase tracking-wider">
                        {k.label}
                      </span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-mono"
                        style={{ background: `${k.color}1a`, color: k.color }}
                      >
                        {k.change}
                      </span>
                    </div>
                    <div className="mt-2 font-display text-xl font-semibold text-white">{k.value}</div>
                    <svg
                      viewBox="0 0 100 30"
                      preserveAspectRatio="none"
                      className="mt-2 h-6 w-full"
                    >
                      <polyline
                        points={pts}
                        fill="none"
                        stroke={k.color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.9"
                      />
                      <polyline points={`${pts} 100,30 0,30`} fill={k.color} opacity="0.12" />
                    </svg>
                  </div>
                );
              })}

              {/* Event Stream logs */}
              <div className="col-span-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Live Event Stream
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    streaming
                  </span>
                </div>

                <ul className="mt-3 grid gap-1.5 text-[11px] sm:grid-cols-3">
                  {liveEvents.map((evt, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5"
                    >
                      <span className="font-mono text-white/40">{evt.time}</span>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: evt.color }} />
                      <span className="flex-1 truncate text-white/80">{evt.message}</span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-mono uppercase"
                        style={{ background: `${evt.color}22`, color: evt.color }}
                      >
                        {evt.tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      {floatingChips.map((chip, idx) => {
        const ChipIcon = chip.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + idx * 0.15 }}
            className={`absolute z-20 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-xs text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl lg:flex ${chip.xPosClass} ${chip.yPosClass}`}
          >
            <div className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${chip.gradFrom} ${chip.gradTo}`}>
              <ChipIcon className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <div className="font-semibold">{chip.title}</div>
              <div className="text-[10px] text-white/50">{chip.subtitle}</div>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3 }}
        className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] text-white backdrop-blur-2xl md:inline-flex"
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-300 animate-pulse" />
        {copilotStatus}
      </motion.div>
    </div>
  );
}

const vesselOSProps: DashboardMockupCardProps = {
  roleName: "vessels",
  accentColor: "#38bdf8",
  accentColorClass: "text-[#38bdf8]",
  accentBgClass: "bg-[#38bdf8]",
  successScore: 96,
  successStatus: "Marine Operations: Exceptional",
  progressMetrics: [
    { label: "Active Vessels", value: "217", percentage: 88, fromColor: "#38BDF8", toColor: "#0284C7" },
    { label: "Berth Occupancy", value: "4 / 6 occupied", percentage: 66, fromColor: "#3B82F6", toColor: "#2563EB" },
    { label: "Pilot Efficiency", value: "98.2%", percentage: 98, fromColor: "#10B981", toColor: "#059669" },
  ],
  chartTitle: "Vessel Turnaround Time",
  chartValue: "42.8 hours",
  chartChange: "↓ 14.2% faster turnaround",
  chartAreaGradId: "vessels-area-grad",
  chartLineGradId: "vessels-line-grad",
  chartLinePath: "M0,80 C30,72 50,60 80,58 C110,56 130,30 170,35 C210,40 230,70 270,62 C310,55 340,22 400,28",
  chartAreaPath: "M0,80 C30,72 50,60 80,58 C110,56 130,30 170,35 C210,40 230,70 270,62 C310,55 340,22 400,28 L400,110 L0,110 Z",
  chartTooltipTime: "Shift B · June 18",
  chartTooltipValue: "42.8 hours avg",
  chartTooltipChange: "ETA accuracy at 98.7%",
  sparklines: [
    { label: "Vessel Arrivals", value: "48", change: "+8 vessels", color: "#38bdf8", sparkPoints: [32, 35, 30, 42, 38, 44, 45, 48] },
    { label: "Pilot Bookings", value: "24", change: "100%", color: "#3B82F6", sparkPoints: [18, 20, 19, 22, 21, 23, 24, 24] },
    { label: "Weather Risk", value: "Low", change: "stable", color: "#10B981", sparkPoints: [10, 12, 11, 10, 9, 8, 8, 8] },
    { label: "Tug Availability", value: "12/12", change: "active", color: "#F59E0B", sparkPoints: [12, 12, 11, 12, 12, 12, 12, 12] },
  ],
  liveEvents: [
    { time: "15:22", message: "MV-Atlas Docked at Berth 3 · ETA met", color: "#38bdf8", tag: "docked" },
    { time: "15:10", message: "Vessel speed restricted: Channel 2", color: "#F59E0B", tag: "caution" },
    { time: "14:45", message: "Pilot boat assigned to CMA CGM Orion", color: "#10B981", tag: "assigned" },
  ],
  sidebarItems: [
    { icon: Ship, label: "Vessel Command", active: true },
    { icon: MapPin, label: "Berth Planner" },
    { icon: CloudSun, label: "Marine Weather" },
    { icon: Users, label: "Pilot & Crew Scheduling" },
  ],
  floatingChips: [
    { title: "MV-Atlas Berthed", subtitle: "Berth 3 · unloading", icon: Ship, gradFrom: "from-sky-500", gradTo: "to-blue-600", xPosClass: "-left-6", yPosClass: "top-24" },
    { title: "Channel Speed: 8 kn", subtitle: "Traffic control restrictions", icon: Compass, gradFrom: "from-blue-500", gradTo: "to-indigo-600", xPosClass: "-right-6", yPosClass: "bottom-20" },
  ],
  copilotStatus: 'Copilot: "Optimized arrival window for MV-Atlas, saving 0.8 tons fuel."',
};

const yardOSProps: DashboardMockupCardProps = {
  roleName: "yard",
  accentColor: "#10B981",
  accentColorClass: "text-[#10B981]",
  accentBgClass: "bg-[#10B981]",
  successScore: 92,
  successStatus: "Yard Efficiency: Hyper",
  progressMetrics: [
    { label: "Yard Capacity", value: "66% active", percentage: 66, fromColor: "#34D399", toColor: "#10B981" },
    { label: "Gate Queue", value: "3 trucks avg", percentage: 88, fromColor: "#3B82F6", toColor: "#60A5FA" },
    { label: "Crane Move Rate", value: "28 moves/hr", percentage: 92, fromColor: "#A78BFA", toColor: "#8B5CF6" },
  ],
  chartTitle: "TEU Throughput",
  chartValue: "12,408 TEU",
  chartChange: "↑ 8.4% vs last week",
  chartAreaGradId: "yard-area-grad",
  chartLineGradId: "yard-line-grad",
  chartLinePath: "M0,95 C40,93 80,90 120,85 C160,78 200,68 240,54 C280,36 320,18 400,2",
  chartAreaPath: "M0,95 C40,93 80,90 120,85 C160,78 200,68 240,54 C280,36 320,18 400,2 L400,110 L0,110 Z",
  chartTooltipTime: "Daily total",
  chartTooltipValue: "12,408 TEU",
  chartTooltipChange: "98.7% document accuracy",
  sparklines: [
    { label: "Active Cranes", value: "8 / 10", change: "stable", color: "#10B981", sparkPoints: [7, 8, 8, 8, 8, 7, 8, 8] },
    { label: "Gate Queue Time", value: "4.2 min", change: "-12 min wait", color: "#EF4444", sparkPoints: [16, 15, 12, 10, 8, 6, 5, 4.2] },
    { label: "PPE Compliance", value: "99.8%", change: "+1.2% score", color: "#0EA5E9", sparkPoints: [98.5, 98.6, 99.0, 99.2, 99.4, 99.6, 99.8, 99.8] },
    { label: "Reefer Monitoring", value: "142 monitored", change: "active", color: "#8B5CF6", sparkPoints: [130, 132, 135, 138, 140, 142, 142, 142] },
  ],
  liveEvents: [
    { time: "15:15", message: "PPE safety violation resolved: Cam YB-03", color: "#10B981", tag: "resolved" },
    { time: "15:02", message: "Crane C-2 assigned to Berth 5 (discharge MV-Horizon)", color: "#3B82F6", tag: "assigned" },
    { time: "14:55", message: "Gate Lane 3 opened: automatic OCR check active", color: "#8B5CF6", tag: "gate" },
  ],
  sidebarItems: [
    { icon: Container, label: "Yard Operations", active: true },
    { icon: Wrench, label: "Crane Grid" },
    { icon: MapPin, label: "Gate Monitor" },
    { icon: Users, label: "Safety & PPE Detection" },
  ],
  floatingChips: [
    { title: "Lane 3 Open", subtitle: "Truck queue minimized", icon: MapPin, gradFrom: "from-emerald-500", gradTo: "to-emerald-600", xPosClass: "-left-6", yPosClass: "top-24" },
    { title: "PPE Cam Active", subtitle: "Real-time safety guard", icon: Users, gradFrom: "from-teal-500", gradTo: "to-cyan-600", xPosClass: "-right-6", yPosClass: "bottom-20" },
  ],
  copilotStatus: 'Copilot: "Auto-dispatched safety officer to Yard B for PPE compliance."',
};

const executiveOSProps: DashboardMockupCardProps = {
  roleName: "executive",
  accentColor: "#8B5CF6",
  accentColorClass: "text-[#8B5CF6]",
  accentBgClass: "bg-[#8B5CF6]",
  successScore: 94,
  successStatus: "Operational Savings: Hyper",
  progressMetrics: [
    { label: "Cost Savings YTD", value: "$4.2M", percentage: 94, fromColor: "#A78BFA", toColor: "#8B5CF6" },
    { label: "Vessel Waiting Costs", value: "↓ 23%", percentage: 80, fromColor: "#38BDF8", toColor: "#0EA5E9" },
    { label: "SLA Compliance", value: "98.7%", percentage: 98, fromColor: "#34D399", toColor: "#10B981" },
  ],
  chartTitle: "YTD Dollar Savings",
  chartValue: "$4.2M savings",
  chartChange: "↑ 18% vs projection",
  chartAreaGradId: "exec-area-grad",
  chartLineGradId: "exec-line-grad",
  chartLinePath: "M0,85 C40,78 80,74 120,62 C160,50 200,45 240,38 C280,30 320,20 400,10",
  chartAreaPath: "M0,85 C40,78 80,74 120,62 C160,50 200,45 240,38 C280,30 320,20 400,10 L400,110 L0,110 Z",
  chartTooltipTime: "Q2 Year-to-Date",
  chartTooltipValue: "$4.2M saved",
  chartTooltipChange: "Carbon reduction: 184 tons",
  sparklines: [
    { label: "Daily Savings", value: "$14.2k/day", change: "+12.4%", color: "#8B5CF6", sparkPoints: [11.2, 11.5, 12.0, 12.8, 13.0, 13.5, 14.0, 14.2] },
    { label: "Carbon Offsets", value: "184 tons", change: "vetted", color: "#10B981", sparkPoints: [120, 130, 140, 152, 164, 172, 180, 184] },
    { label: "SLA Violations", value: "0", change: "-100%", color: "#3B82F6", sparkPoints: [4, 3, 2, 2, 1, 0, 0, 0] },
    { label: "Partner Ports", value: "14 Live", change: "+3 new", color: "#F59E0B", sparkPoints: [8, 9, 10, 11, 11, 12, 13, 14] },
  ],
  liveEvents: [
    { time: "15:30", message: "Weekly efficiency report compiled for Mundra", color: "#8B5CF6", tag: "report" },
    { time: "14:40", message: "Acme Logistics SLA certified: 100% uptime", color: "#10B981", tag: "sla" },
    { time: "14:10", message: "Carbon credits validated: IMO certified", color: "#3B82F6", tag: "imo" },
  ],
  sidebarItems: [
    { icon: Activity, label: "Executive Dashboard", active: true },
    { icon: Coins, label: "Financial Analytics" },
    { icon: Trophy, label: "SLA Tracker" },
    { icon: ShieldAlert, label: "Carbon & Compliance" },
  ],
  floatingChips: [
    { title: "$4.2M Saved YTD", subtitle: "18% over target", icon: Trophy, gradFrom: "from-purple-500", gradTo: "to-indigo-500", xPosClass: "-left-6", yPosClass: "top-24" },
    { title: "SLA: 98.7%", subtitle: "Industry-leading efficiency", icon: UserCheck, gradFrom: "from-emerald-500", gradTo: "to-teal-600", xPosClass: "-right-6", yPosClass: "bottom-20" },
  ],
  copilotStatus: 'Copilot: "Generated weekly performance report, SLA compliance is at 98.7%."',
};

const railOSProps: DashboardMockupCardProps = {
  roleName: "rails",
  accentColor: "#f59e0b",
  accentColorClass: "text-[#f59e0b]",
  accentBgClass: "bg-[#f59e0b]",
  successScore: 99,
  successStatus: "Wagon Blur-Recovery: Active",
  progressMetrics: [
    { label: "Wagon Scanning Rate", value: "99.4% OCR", percentage: 99, fromColor: "#FBBF24", toColor: "#F59E0B" },
    { label: "Edge Latency (Jetson)", value: "12 ms / feed", percentage: 96, fromColor: "#10B981", toColor: "#059669" },
    { label: "Velocity Capacity", value: "80 km/h", percentage: 80, fromColor: "#38BDF8", toColor: "#2563EB" },
  ],
  chartTitle: "Wagon Processing Dwell Time",
  chartValue: "18.4 mins/train",
  chartChange: "↓ 21.5% dwell time reduction",
  chartAreaGradId: "rail-area-grad",
  chartLineGradId: "rail-line-grad",
  chartLinePath: "M0,90 C40,78 80,82 120,62 C160,42 200,50 240,32 C280,18 320,38 400,14",
  chartAreaPath: "M0,90 C40,78 80,82 120,62 C160,42 200,50 240,32 C280,18 320,38 400,14 L400,110 L0,110 Z",
  chartTooltipTime: "Daily summary",
  chartTooltipValue: "18.4 mins avg",
  chartTooltipChange: "GAN Deblur & Low-light Recovery: Active",
  sparklines: [
    { label: "Scanned Wagons", value: "142", change: "+14 wagons", color: "#F59E0B", sparkPoints: [110, 115, 120, 128, 130, 135, 140, 142] },
    { label: "Axle Alerts", value: "2", change: "resolved", color: "#EF4444", sparkPoints: [4, 3, 3, 2, 2, 2, 2, 2] },
    { label: "Spring Failures", value: "0", change: "-100%", color: "#10B981", sparkPoints: [1, 0, 0, 0, 0, 0, 0, 0] },
    { label: "Train Transits", value: "8 / day", change: "+2 transits", color: "#8B5CF6", sparkPoints: [5, 6, 6, 7, 7, 8, 8, 8] },
  ],
  liveEvents: [
    { time: "15:20", message: "Wagon ID plate CR-8812 scanned · OCR: 99.4% (deblurred)", color: "#F59E0B", tag: "ocr" },
    { time: "15:02", message: "Structural defect (door anomaly) flagged: Cam W-02", color: "#EF4444", tag: "defect" },
    { time: "14:40", message: "YOLOv8 + custom model inference verified - Train T-104", color: "#10B981", tag: "active" },
  ],
  sidebarItems: [
    { icon: Train, label: "Wagon Command", active: true },
    { icon: ShieldAlert, label: "Defect Analyzer" },
    { icon: Eye, label: "Visual Search" },
    { icon: Database, label: "OCR Records" },
  ],
  floatingChips: [
    { title: "Wagon ID: CR-8812", subtitle: "Defects: None · OCR 99.4%", icon: Train, gradFrom: "from-amber-500", gradTo: "to-orange-600", xPosClass: "-left-6", yPosClass: "top-24" },
    { title: "12ms Edge Deblur", subtitle: "Restoration pipeline active", icon: ShieldAlert, gradFrom: "from-red-500", gradTo: "to-rose-600", xPosClass: "-right-6", yPosClass: "bottom-20" },
  ],
  copilotStatus: 'Copilot: "Jetson AGX deblur model active on Cam 01. High-speed blur recovery at 3.4x gain."',
};

function DashboardSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-[#05060F] border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Command Center
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            One platform. <span className="text-white/50">Custom operating systems.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Scroll down to see the custom operating systems for Vessels, Yards, and Rails stack seamlessly.
          </p>
        </motion.div>

        <ScrollStack
          useWindowScroll={true}
          itemDistance={120}
          baseScale={0.86}
          itemScale={0.03}
          itemStackDistance={35}
          rotationAmount={0}
          blurAmount={0}
          stackPosition="12%"
        >
          <ScrollStackItem>
            <DashboardMockupCard {...vesselOSProps} />
          </ScrollStackItem>
          <ScrollStackItem>
            <DashboardMockupCard {...yardOSProps} />
          </ScrollStackItem>
          <ScrollStackItem>
            <DashboardMockupCard {...railOSProps} />
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
}

function Trust() {
  const leftLogoItems = [
    { src: "/DP World.png", alt: "DP World", h: "h-14" },
    { src: "/MSC.png", alt: "MSC", h: "h-14" },
    { src: "/PSA.png", alt: "PSA", h: "h-10" },
    { src: "/CMA CGM.png", alt: "CMA CGM", h: "h-14" },
    { src: "/CONCOR.png", alt: "CONCOR", h: "h-14" },
    { src: "/Maersk.png", alt: "Maersk", h: "h-14" },
    { src: "/Adani Ports.png", alt: "Adani Ports", h: "h-14" },
    { src: "/JNPT.png", alt: "JNPT", h: "h-14" },
    { src: "/Evergreen.png", alt: "Evergreen", h: "h-14" },
  ];

  const rightLogoItems = [
    { src: "/Maersk.png", alt: "Maersk", h: "h-14" },
    { src: "/Evergreen.png", alt: "Evergreen", h: "h-14" },
    { src: "/JNPT.png", alt: "JNPT", h: "h-14" },
    { src: "/Adani Ports.png", alt: "Adani Ports", h: "h-14" },
    { src: "/CONCOR.png", alt: "CONCOR", h: "h-14" },
    { src: "/MSC.png", alt: "MSC", h: "h-14" },
    { src: "/DP World.png", alt: "DP World", h: "h-14" },
    { src: "/PSA.png", alt: "PSA", h: "h-10" },
    { src: "/CMA CGM.png", alt: "CMA CGM", h: "h-14" },
  ];

  // Duplicating exactly twice for a seamless infinite loop translation
  const leftLogos = [...leftLogoItems, ...leftLogoItems];
  const rightLogosScroll = [...rightLogoItems, ...rightLogoItems];

  const stats = [
    {
      num: 1.8,
      decimals: 1,
      prefix: "",
      suffix: "M+",
      l: "Containers Tracked",
      icon: Container,
      color: "text-cyan-400",
      glow: "rgba(6, 182, 212, 0.15)",
      bg: "from-cyan-950/40 to-[#060814]/80",
      border: "border-cyan-500/25 group-hover:border-cyan-400/80",
      numGradient: "from-cyan-400 to-blue-500"
    },
    {
      num: 99.2,
      decimals: 1,
      prefix: "",
      suffix: "%",
      l: "Safety Compliance",
      icon: CheckCircle2,
      color: "text-emerald-400",
      glow: "rgba(16, 185, 129, 0.15)",
      bg: "from-emerald-950/40 to-[#060814]/80",
      border: "border-emerald-500/25 group-hover:border-emerald-400/80",
      numGradient: "from-emerald-400 to-teal-500"
    },
    {
      num: 217,
      decimals: 0,
      prefix: "",
      suffix: "",
      l: "Active Vessels",
      icon: Ship,
      color: "text-cyan-400",
      glow: "rgba(6, 182, 212, 0.15)",
      bg: "from-cyan-950/40 to-[#060814]/80",
      border: "border-cyan-500/25 group-hover:border-cyan-400/80",
      numGradient: "from-cyan-400 to-blue-500"
    },
    {
      num: 98.7,
      decimals: 1,
      prefix: "",
      suffix: "%",
      l: "AI Accuracy",
      icon: Brain,
      color: "text-emerald-400",
      glow: "rgba(16, 185, 129, 0.15)",
      bg: "from-emerald-950/40 to-[#060814]/80",
      border: "border-emerald-500/25 group-hover:border-emerald-400/80",
      numGradient: "from-emerald-400 to-teal-500"
    },
    {
      num: 14,
      decimals: 0,
      prefix: "",
      suffix: "",
      l: "Deployed Ports",
      icon: MapPin,
      color: "text-cyan-400",
      glow: "rgba(6, 182, 212, 0.15)",
      bg: "from-cyan-950/40 to-[#060814]/80",
      border: "border-cyan-500/25 group-hover:border-cyan-400/80",
      numGradient: "from-cyan-400 to-blue-500"
    },
    {
      num: 99.99,
      decimals: 2,
      prefix: "",
      suffix: "%",
      l: "System Uptime",
      icon: Activity,
      color: "text-emerald-400",
      glow: "rgba(16, 185, 129, 0.15)",
      bg: "from-emerald-950/40 to-[#060814]/80",
      border: "border-emerald-500/25 group-hover:border-emerald-400/80",
      numGradient: "from-emerald-400 to-teal-500"
    },
  ];

  return (
    <section className="bg-[#05060F] py-24 overflow-hidden relative border-y border-white/5">
      <style>{`
        @keyframes marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float-bob-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes float-bob-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        @keyframes float-bob-3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes cyber-rotate-cw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cyber-rotate-ccw {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes logo-glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.5));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.85));
            transform: scale(1.05);
          }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 42s linear infinite;
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 42s linear infinite;
        }
        .animate-float-bob-1 {
          animation: float-bob-1 4.5s ease-in-out infinite;
        }
        .animate-float-bob-2 {
          animation: float-bob-2 5.5s ease-in-out infinite;
        }
        .animate-float-bob-3 {
          animation: float-bob-3 5s ease-in-out infinite;
        }
        .animate-cyber-cw {
          animation: cyber-rotate-cw 20s linear infinite;
        }
        .animate-cyber-ccw {
          animation: cyber-rotate-ccw 15s linear infinite;
        }
        .animate-logo-glow {
          animation: logo-glow-pulse 4s ease-in-out infinite;
        }
      `}</style>

      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl px-6 text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Ecosystem Partners
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Trusted Across the Global Logistics Ecosystem
        </h2>
        <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl mx-auto">
          Connect seamlessly with shipping lines, freight forwarders, ports, warehouses, customs partners, and enterprise logistics providers through LogiMind.
        </p>
      </motion.div>

      {/* Centerpiece Logo Carousel Section */}
      <div className="mt-8 relative w-full flex items-center justify-center py-5">

        {/* Background center fading overlay to mask logos as they pass behind the center card */}
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-64 z-10 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0) 100%)"
          }}
        />

        {/* Horizontal Marquee strip (the rectangle part) with white background */}
        <div
          className="w-full h-32 sm:h-36 overflow-hidden relative before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-[#05060F] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-[#05060F] after:to-transparent"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.95) 15%, rgba(255, 255, 255, 0.95) 85%, transparent)"
          }}
        >
          {/* Left Carousel (LTR, scrolls to center) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1/2 overflow-hidden flex items-center justify-start"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            {/* 3D rotated wrapper */}
            <div
              style={{
                transform: "rotateY(16deg) translateZ(0)",
                transformOrigin: "right center",
                transformStyle: "preserve-3d",
                width: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center"
              }}
            >
              <div
                className="flex animate-marquee-ltr"
                style={{
                  width: "max-content",
                  gap: "64px",
                  alignItems: "center"
                }}
              >
                {leftLogos.map((logo, idx) => (
                  <div
                    key={idx}
                    className={`flex-shrink-0 animate-float-bob-${(idx % 3) + 1} flex items-center justify-center`}
                    style={{ width: "150px" }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      decoding="async"
                      className={`${logo.h} object-contain opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Carousel (RTL, scrolls to center) */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden flex items-center justify-start"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            {/* 3D rotated wrapper */}
            <div
              style={{
                transform: "rotateY(-16deg) translateZ(0)",
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                width: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center"
              }}
            >
              <div
                className="flex animate-marquee-rtl"
                style={{
                  width: "max-content",
                  gap: "64px",
                  alignItems: "center"
                }}
              >
                {rightLogosScroll.map((logo, idx) => (
                  <div
                    key={idx}
                    className={`flex-shrink-0 animate-float-bob-${(idx % 3) + 1} flex items-center justify-center`}
                    style={{ width: "150px" }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      decoding="async"
                      className={`${logo.h} object-contain opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Centerpiece highlighted LogiMind logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none select-none">
          {/* Rotating holographic backglow */}
          <div className="absolute h-40 w-40 sm:h-48 sm:w-48 rounded-full bg-[conic-gradient(from_0deg,rgba(6,182,212,0.25)_0%,rgba(99,102,241,0.1)_30%,rgba(168,85,247,0.15)_60%,rgba(6,182,212,0.25)_100%)] blur-xl opacity-80 animate-cyber-cw pointer-events-none" />

          {/* Outer cyber ring 1 (Dashed, Cyan, CW) */}
          <div className="absolute h-36 w-36 sm:h-44 sm:w-44 rounded-full border border-dashed border-cyan-500/40 animate-cyber-cw pointer-events-none" />

          {/* Inner cyber ring 2 (Dashed, Indigo, CCW) */}
          <div className="absolute h-30 w-30 sm:h-38 sm:w-38 rounded-full border border-dashed border-indigo-500/30 animate-cyber-ccw pointer-events-none" />

          {/* Crosshair grid overlay */}
          <div className="absolute h-26 w-26 sm:h-32 sm:w-32 rounded-full border border-white/5 flex items-center justify-center animate-pulse pointer-events-none">
            <div className="absolute top-0 bottom-0 w-px bg-cyan-500/10" />
            <div className="absolute left-0 right-0 h-px bg-cyan-500/10" />
          </div>

          {/* Main glassmorphic orb (interactive) */}
          <div className="relative group flex items-center justify-center h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br from-[#0a0f28]/95 to-[#060814]/98 border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.25)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:border-cyan-400/80 transition-all duration-500 pointer-events-auto cursor-pointer">
            {/* Inner glowing radial sweep */}
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_70%)] opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Pulsing ring inside border */}
            <span className="absolute inset-1 rounded-full border border-cyan-400/10 pointer-events-none" />

            {/* Glowing logo image */}
            <img
              src="/LogiMind Logo.png"
              alt="LogiMind AI centerpiece"
              className="h-12 w-12 sm:h-14 sm:w-14 object-contain animate-logo-glow group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

      </div>

      {/* Stats container */}
      <div className="mx-auto max-w-6xl px-6 mt-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative group overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#0a0f24]/70 to-[#05060f]/90 p-5 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-default select-none"
              >
                {/* Specific colored glow behind the card on hover */}
                <div
                  className="absolute -inset-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`
                  }}
                />

                {/* Subtle top border illumination */}
                <span className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300 group-hover:via-white/20" />

                {/* Cyber Card Inner Border (visible by default, flares on hover) */}
                <div className={`absolute inset-0 rounded-2xl border transition-all duration-500 ${s.border}`} />

                {/* Metric Icon top right */}
                <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/5 border border-white/5 text-neutral-400 transition-all duration-300">
                  <Icon className={`h-3.5 w-3.5 ${s.color}`} />
                </div>

                {/* Value representation */}
                <div className={`font-display text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${s.numGradient} mt-2`}>
                  <AnimatedCounter value={s.num} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                </div>

                {/* Label */}
                <div className="mt-2 text-xs text-white/50 font-medium group-hover:text-white/80 transition-colors duration-300">{s.l}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const journeyCards = [
    {
      badge: "STAGE 01",
      title: "Ingest & Perceive",
      subtitle: "Capture raw video feeds, ship AIS telemetries, crane sensors, and terminal weather statistics into a secure, low-latency data fabric.",
      price: "Real-time Telemetry Ingest",
      img: "/1.jpg",
    },
    {
      badge: "STAGE 02",
      title: "Reason & Predict",
      subtitle: "Execute YOLOv11 vision logs to extract container numbers, flag structural damages, estimate crane Remaining Useful Life, and forecast gate bottlenecks.",
      price: "Vision Reasoning Engine",
      img: "/2.jpg",
    },
    {
      badge: "STAGE 03",
      title: "Orchestrate & Act",
      subtitle: "Deploy LangGraph multi-agent runtimes to auto-dispatch safety crews, optimize yard crane movements, clear customs manifests, and guide container trucks.",
      price: "Closed-Loop Agent Runtimes",
      img: "/3.jpg",
    },
    {
      badge: "STAGE 04",
      title: "Predictive Safety",
      subtitle: "Run ML anomaly detection classifiers to forecast crane machine failure states and schedule proactive maintenance before breakdowns.",
      price: "Predictive Health & Safety",
      img: "/4.jpg",
    },
    {
      badge: "STAGE 05",
      title: "Autonomy Integration",
      subtitle: "Sync yard slots, terminal berth positions, gate entry lanes, and trucks into a single self-optimizing digital ecosystem.",
      price: "Full Closed-Loop Autonomy",
      img: "/5.jpg",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 360; // Card width + gap
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-24 bg-[#05060F] overflow-hidden">
      {/* subtle glowing background effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.08),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.06),transparent)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section heading with Navigation Arrows */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              System Phases
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl sm:whitespace-nowrap">
              Start your journey with LogiMind AI
            </h2>
          </motion.div>
          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-[#38bdf8]/30 transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-white/80" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-[#38bdf8]/30 transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-white/80" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll snap shelf */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
        >
          {journeyCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.08, type: "spring", stiffness: 80, damping: 15 }}
              className="flex-shrink-0 w-[285px] sm:w-[320px] md:w-[340px] snap-start rounded-[24px] border border-white/10 bg-[#0c0d16] overflow-hidden transition-shadow transition-colors duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:border-[#38bdf8]/30 cursor-default flex flex-col h-[450px] shadow-2xl"
            >
              {/* Card text content */}
              <div className="px-6 pt-6 pb-2">
                {card.badge && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#38bdf8] mb-1.5">
                    {card.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold tracking-[0.08em] leading-tight text-white font-mono uppercase">
                  {card.title}
                </h3>
                <p className="text-[12.5px] mt-1.5 leading-snug text-white/60 min-h-[38px]">
                  {card.subtitle}
                </p>
              </div>

              {/* Card product image */}
              <div className="flex-1 flex items-center justify-center px-4 pb-5 mt-2 relative overflow-hidden bg-transparent">
                <img
                  src={card.img}
                  alt={card.title}
                  loading="eager"
                  className="w-full h-full object-cover object-center rounded-2xl border border-white/5 shadow-sm"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="text-xs uppercase tracking-[0.22em] text-[#38bdf8] font-bold">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-white/60 text-sm sm:text-base">{sub}</p>}
    </motion.div>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      cat: "INGEST",
      t: "Multi-Source Ingest",
      d: "Continuous data ingestion from port CCTV, AIS signals, manifests, and weather feeds.",
      img: "/H1.jpg",
      i: Database,
    },
    {
      n: "02",
      cat: "PERCEIVE",
      t: "Vision Perception",
      d: "Deep learning models detect container numbers, gauge structures, and verify safety PPE.",
      img: "/H2.jpg",
      i: Eye,
    },
    {
      n: "03",
      cat: "REASON",
      t: "Agentic Reasoning",
      d: "LangGraph-powered AI agents plan yard movements, verify manifests, and trigger warning sirens.",
      img: "/H3.jpg",
      i: Brain,
    },
    {
      n: "04",
      cat: "PREDICT",
      t: "Predictive Safety",
      d: "ML classifiers forecast machine breakdown schedules and alert operations beforehand.",
      img: "/H4.jpg",
      i: ShieldAlert,
    },
    {
      n: "05",
      cat: "ACT",
      t: "Closed-Loop Action",
      d: "Automated routing logs clear gate entry, slots cranes, and optimizes truck turnarounds.",
      img: "/H5.jpg",
      i: Cpu,
    },
  ];
  return (
    <section id="how" className="py-28 bg-[#05060F]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="How it works" title="Five steps to closed-loop port autonomy." />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ n, cat, t, d, img }, idx) => (
            <motion.li
              key={n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
              className="relative group overflow-hidden rounded-[24px] h-[450px] p-[1.5px] bg-gradient-to-br from-white/40 via-cyan-500/25 to-blue-500/20 transition-all duration-300 hover:shadow-[0_0_35px_rgba(37,99,235,0.3)] hover:-translate-y-1 hover:from-white/80 hover:via-cyan-500/70 hover:to-blue-500/50 cursor-default select-none"
            >
              {/* Inner content container with dark background */}
              <div className="relative w-full h-full rounded-[22.5px] overflow-hidden flex flex-col justify-end p-6 bg-[#05060F]/85">

                <div className="absolute inset-0 z-0">
                  <img
                    src={img}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    alt={t}
                    loading="eager"
                    className="w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/70 to-transparent opacity-95" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
                  {/* Top Row: Center-aligned Stencil Stiled Number */}
                  <div className="flex justify-center w-full mt-2">
                    <span
                      className="text-6xl font-black text-white/95 select-none tracking-widest"
                      style={{ fontFamily: "'Big Shoulders Stencil Display', sans-serif" }}
                    >
                      {parseInt(n)}
                    </span>
                  </div>

                  {/* Bottom Row: Text Details with Fixed Height for Perfect Horizontal Alignment */}
                  <div className="text-left mt-auto h-[160px] flex flex-col justify-start">
                    <div className="text-[10px] font-bold tracking-[0.22em] text-cyan-400 uppercase mb-2">
                      {cat}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                      {t}
                    </h3>
                    <p className="mt-2 text-xs text-white/65 leading-relaxed font-sans line-clamp-4">
                      {d}
                    </p>
                  </div>
                </div>

              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Ecosystem() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [livePulse, setLivePulse] = useState<number>(84);

  // Periodic metrics update
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse((p) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(75, Math.min(99, p + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      id: 0,
      title: "Terminal Operators",
      index: "01",
      icon: Cpu,
      color: "#3B82F6", // Blue
      coreCode: "T-OPS",
      description: "Dynamic stacking distribution algorithms and density balancing.",
      metrics: [
        { label: "Yard Turnaround", value: "+32% Efficiency" },
        { label: "Berth Occupancy", value: "92% Capacity" },
        { label: "Dwell Times", value: "-25% Congestion" }
      ],
      agents: ["Block Allocator Bot", "Yard Density Balancer", "Reefer Guard AI"]
    },
    {
      id: 1,
      title: "Port Authorities",
      index: "02",
      icon: Ship,
      color: "#8B5CF6", // Purple
      coreCode: "AUTH",
      description: "Autonomous vessel berthing corridors, speed advisories, and tide scheduling.",
      metrics: [
        { label: "Vessel Queue", value: "1.2h Avg Waiting" },
        { label: "Carbon Offset", value: "-14% Emissions" },
        { label: "Uptime SLA", value: "99.99% Guaranteed" }
      ],
      agents: ["AIS Corridor Tracker", "Tide Window Optimizer", "Vessel Flow Agent"]
    },
    {
      id: 2,
      title: "Logistics Partners",
      index: "03",
      icon: Map,
      color: "#10B981", // Emerald
      coreCode: "LOGS",
      description: "Automatic inbound lane routing and queue dispatch synchronization.",
      metrics: [
        { label: "Gate Dwell Time", value: "14m Avg Dwell" },
        { label: "Truck Dispatch", value: "100% Synced" },
        { label: "Slot Match Index", value: "99.1% Accuracy" }
      ],
      agents: ["OCR Gate Identifier", "Lane Congestion Router", "Truck Flow Agent"]
    },
    {
      id: 3,
      title: "HSE Safety Teams",
      index: "04",
      icon: ShieldAlert,
      color: "#EF4444", // Red
      coreCode: "SAFE",
      description: "Real-time PPE compliance checking and thermal incident warnings.",
      metrics: [
        { label: "PPE Compliance", value: "99.2% Detected" },
        { label: "Active Hazards", value: "0 Open Incidents" },
        { label: "Fire Watch Mode", value: "Active 24/7" }
      ],
      agents: ["PPE Safety Vision", "Thermal Incidents Agent", "Lockdown Dispatcher"]
    },
    {
      id: 4,
      title: "Customs Officers",
      index: "05",
      icon: Database,
      color: "#F59E0B", // Amber
      coreCode: "CUST",
      description: "Instant customs clearing, document OCR parsing, and fraud alerts.",
      metrics: [
        { label: "Auto-Clearance Rate", value: "94% Handled" },
        { label: "HS Code Parsing", value: "99.8% Extraction" },
        { label: "Fraud Alert Log", value: "0 Latency Flag" }
      ],
      agents: ["Manifest Document AI", "HS Code Classifier", "DG Compliance Agent"]
    },
    {
      id: 5,
      title: "Maritime Executive",
      index: "06",
      icon: Coins,
      color: "#EC4899", // Pink
      coreCode: "EXEC",
      description: "Composite carbon composition, C-suite briefing summaries and direct savings.",
      metrics: [
        { label: "Operational Savings", value: "$4.2M Saved" },
        { label: "ROI Speed Index", value: "2.4x Multiplier" },
        { label: "ESG Score", value: "Tier 1 Compliant" }
      ],
      agents: ["Revenue Auditor", "ESG Scorekeeper", "SLA Guard AI"]
    }
  ];

  // Connection paths in the SVG viewport (0 0 960 700)
  const paths = [
    { d: "M 480 350 C 400 350, 320 110, 260 110", dur: "4.2s" }, // Card 1 (Top Left)
    { d: "M 480 350 C 400 362, 320 338, 260 350", dur: "3.6s" }, // Card 2 (Middle Left)
    { d: "M 480 350 C 400 350, 320 590, 260 590", dur: "4.8s" }, // Card 3 (Bottom Left)
    { d: "M 480 350 C 560 350, 640 110, 700 110", dur: "4.0s" }, // Card 4 (Top Right)
    { d: "M 480 350 C 560 338, 640 362, 700 350", dur: "3.8s" }, // Card 5 (Middle Right)
    { d: "M 480 350 C 560 350, 640 590, 700 590", dur: "4.5s" }  // Card 6 (Bottom Right)
  ];

  const activeNodeData = activeNode !== null ? cards[activeNode] : null;
  const themeColor = activeNodeData ? activeNodeData.color : "#38bdf8";

  return (
    <section id="ecosystem" className="border-t border-white/5 py-28 overflow-hidden bg-[#05060F] relative">
      <style>{`
        @keyframes marvel-rotate-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes marvel-rotate-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes marvel-pulse-ring {
          0% { r: 50px; opacity: 0.8; stroke-width: 2px; }
          100% { r: 125px; opacity: 0; stroke-width: 0.5px; }
        }
        @keyframes laser-flow {
          from { stroke-dashoffset: 240; }
          to { stroke-dashoffset: 0; }
        }
        .hud-rotate-cw {
          transform-origin: 480px 350px;
          animation: marvel-rotate-cw 15s linear infinite;
        }
        .hud-rotate-ccw {
          transform-origin: 480px 350px;
          animation: marvel-rotate-ccw 10s linear infinite;
        }
        .hud-core-rotate-cw {
          transform-origin: 110px 110px;
          animation: marvel-rotate-cw 15s linear infinite;
        }
        .hud-core-rotate-ccw {
          transform-origin: 110px 110px;
          animation: marvel-rotate-ccw 10s linear infinite;
        }
        .shockwave-ring {
          transform-origin: 480px 350px;
          animation: marvel-pulse-ring 3s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        .laser-flow-path {
          stroke-dasharray: 12 48;
          animation: laser-flow 3s linear infinite;
        }
        .laser-flow-path-active {
          stroke-dasharray: 24 36;
          animation: laser-flow 1.5s linear infinite;
        }
      `}</style>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Ambient light glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: activeNodeData
            ? `radial-gradient(closest-side, ${activeNodeData.color}15, transparent)`
            : "radial-gradient(closest-side, rgba(56, 189, 248, 0.1), transparent)"
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow="The Ecosystem"
          title="One agentic mesh. Every stakeholder aligned."
          sub="LogiMind AI connects marine, terminal, customs, safety, rail siding, and logistical systems into a single self-arbitrating digital ecosystem."
        />

        <div className="mt-16 relative min-h-[720px] lg:min-h-[700px] flex items-center justify-center">
          {/* Layout Container */}
          <div className="eco-layout-container w-full relative">

            {/* SVG Connections Layer (Visible on desktop) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
              viewBox="0 0 960 700"
              fill="none"
            >
              {paths.map((p, idx) => {
                const card = cards[idx];
                const isActive = activeNode === idx;

                return (
                  <g key={idx}>
                    {/* Shadow Glow Line (when active) */}
                    {isActive && (
                      <path
                        d={p.d}
                        stroke={card.color}
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="opacity-20"
                        style={{ filter: `drop-shadow(0 0 8px ${card.color})` }}
                      />
                    )}
                    {/* Core Line */}
                    <path
                      d={p.d}
                      stroke={isActive ? card.color : "rgba(255, 255, 255, 0.08)"}
                      strokeWidth={isActive ? 2 : 1.5}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                    {/* Glowing laser pulse overlay */}
                    <path
                      d={p.d}
                      stroke={isActive ? card.color : "rgba(56, 189, 248, 0.35)"}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      strokeLinecap="round"
                      fill="none"
                      className={isActive ? "laser-flow-path-active" : "laser-flow-path"}
                      style={{ filter: `drop-shadow(0 0 3px ${isActive ? card.color : "rgba(56, 189, 248, 0.2)"})` }}
                    />
                    {/* Animated Neon Flowing Dot */}
                    <circle r={isActive ? 4.5 : 3} fill={isActive ? card.color : "rgba(56, 189, 248, 0.4)"} style={{ filter: isActive ? `drop-shadow(0 0 6px ${card.color})` : "none" }}>
                      <animateMotion dur={isActive ? "2s" : p.dur} repeatCount="indefinite" path={p.d} />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* Central AI Core Wrapper */}
            <div className="eco-core-wrapper">
              {/* Rotating HUD loops around the core */}
              <svg
                className="absolute w-[220px] h-[220px] pointer-events-none z-0"
                viewBox="0 0 220 220"
                fill="none"
              >
                {/* Outer HUD circles wrapping the loop lines */}
                <circle
                  cx="110"
                  cy="110"
                  r="82"
                  fill="none"
                  stroke={themeColor}
                  strokeWidth="1"
                  strokeDasharray="45 25 15 25"
                  className="hud-core-rotate-cw"
                  opacity="0.3"
                  style={{ filter: `drop-shadow(0 0 2px ${themeColor})` }}
                />
                <circle
                  cx="110"
                  cy="110"
                  r="82"
                  fill="none"
                  stroke={themeColor}
                  strokeWidth="1"
                  strokeDasharray="6 12"
                  className="hud-core-rotate-ccw"
                  opacity="0.2"
                />

                {/* Two Rotating Loop Lines (Atomic Orbits) spinning in opposite directions */}
                <g className="hud-core-rotate-cw">
                  <path
                    d="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110"
                    stroke={themeColor}
                    strokeWidth="1.2"
                    fill="none"
                    opacity="0.35"
                    className="transition-colors duration-500"
                  />
                  <circle r="3" fill={themeColor} style={{ filter: `drop-shadow(0 0 2px ${themeColor})` }}>
                    <animateMotion dur="6s" repeatCount="indefinite" path="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110" />
                  </circle>
                </g>

                <g className="hud-core-rotate-ccw">
                  <path
                    d="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110"
                    stroke={themeColor}
                    strokeWidth="1.2"
                    fill="none"
                    opacity="0.35"
                    className="transition-colors duration-500"
                  />
                  <circle r="3" fill={themeColor} style={{ filter: `drop-shadow(0 0 2px ${themeColor})` }}>
                    <animateMotion dur="4s" repeatCount="indefinite" path="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110" />
                  </circle>
                </g>
              </svg>

              <div
                className="eco-core-glow-bg transition-all duration-500"
                style={{
                  background: activeNodeData
                    ? `radial-gradient(circle, ${activeNodeData.color}33 0%, ${activeNodeData.color}11 50%, transparent 70%)`
                    : "radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 70%)"
                }}
              />
              <div
                className="eco-core-sphere transition-all duration-500 cursor-pointer group"
                style={{
                  borderColor: activeNodeData ? activeNodeData.color : "rgba(56, 189, 248, 0.4)",
                  boxShadow: activeNodeData
                    ? `inset 0 4px 15px rgba(255, 255, 255, 0.2), inset 0 -8px 25px rgba(0, 0, 0, 0.8), 0 0 35px ${activeNodeData.color}50`
                    : "inset 0 4px 15px rgba(255, 255, 255, 0.25), inset 0 -8px 25px rgba(0, 0, 0, 0.8), 0 0 45px rgba(56, 189, 248, 0.4)"
                }}
              >
                <div className="eco-core-inner-glow" />
                <div className="z-10 text-center flex flex-col items-center select-none">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block">PM-OS</span>
                  <span className="font-display text-sm font-black tracking-tight text-white transition-all duration-300">
                    {activeNodeData ? activeNodeData.coreCode : "CORE"}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping mt-1 block" />
                </div>
              </div>
            </div>

            {/* Ecosystem Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:block gap-6">
              {cards.map((c, idx) => {
                const Icon = c.icon;
                const isActive = activeNode === idx;

                return (
                  <div
                    key={c.title}
                    className={`eco-glass-card card-${idx + 1} transition-all duration-300 group cursor-pointer`}
                    style={{
                      borderColor: isActive ? c.color : "rgba(255,255,255,0.08)",
                      boxShadow: isActive
                        ? `0 12px 35px rgba(0, 0, 0, 0.5), 0 0 20px ${c.color}25, 0 1px 0 rgba(255, 255, 255, 0.08) inset`
                        : "0 4px 20px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
                      transform: isActive ? "translateY(-4px)" : "none"
                    }}
                    onMouseEnter={() => setActiveNode(idx)}
                    onMouseLeave={() => setActiveNode(null)}
                  >
                    <div className="eco-card-header">
                      <div className="eco-card-title-group">
                        <span
                          className="eco-card-title-icon transition-colors"
                          style={{
                            color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                            backgroundColor: isActive ? c.color : "rgba(255, 255, 255, 0.05)",
                            borderColor: isActive ? c.color : "rgba(255, 255, 255, 0.1)"
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <span className="eco-card-title block">{c.title}</span>
                          <span className="text-[8px] text-white/30 uppercase tracking-widest font-mono block">
                            Status: Online
                          </span>
                        </div>
                      </div>
                      <span className="eco-card-index">{c.index}</span>
                    </div>

                    <div className="eco-card-divider" />

                    <div className="relative min-h-[72px] flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        {!isActive ? (
                          <motion.div
                            key="metrics"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="eco-card-body"
                          >
                            {c.metrics.map((m) => (
                              <div key={m.label} className="eco-card-metric">
                                <span className="eco-metric-label">{m.label}</span>
                                <span className="eco-metric-value">{m.value}</span>
                              </div>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="details"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex flex-col gap-2 text-left"
                          >
                            <p className="text-[11px] leading-normal text-white/70">
                              {c.description}
                            </p>
                            <div className="flex flex-col gap-1">
                              <span className="text-[8px] uppercase tracking-widest font-mono text-white/40 block">
                                Orchestrated Agents
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {c.agents.map((agent, i) => (
                                  <span key={i} className="text-[8.5px] font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-white/80 whitespace-nowrap">
                                    {agent}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


function Features() {
  const items = [
    {
      t: "Inference Ingestion",
      d: "Deep multi-source telemetry parsing of camera feeds, rail wagon logs, vessel location data, and weather streams in real time.",
      i: Database,
      accent: "#2563eb",
      accentGlow: "rgba(37,99,235,0.3)",
      featured: true,
    },
    {
      t: "Computer Vision OCR",
      d: "Deploy YOLOv11 OCR models to detect container IDs, identify damage anomalies, and audit yard slots.",
      i: Eye,
      accent: "#06b6d4",
      accentGlow: "rgba(6,182,212,0.3)",
      featured: true,
    },
    {
      t: "LangGraph Runtime",
      d: "Shared state routing connects specialized operator co-pilots.",
      i: Brain,
      accent: "#22d3ee",
      accentGlow: "rgba(34,211,238,0.3)",
    },
    {
      t: "Machinery Prognostics",
      d: "Classifiers calculate crane health logs and remaining useful life.",
      i: Wrench,
      accent: "#10b981",
      accentGlow: "rgba(16,185,129,0.3)",
    },
    {
      t: "Vessel ETA Engine",
      d: "Evaluate ETA timelines based on weather logs and queues.",
      i: Ship,
      accent: "#6366f1",
      accentGlow: "rgba(99,102,241,0.3)",
    },
    {
      t: "Safety Intrusion Alerts",
      d: "Audit site PPE compliance and automatically alert operators.",
      i: ShieldAlert,
      accent: "#ef4444",
      accentGlow: "rgba(239,68,68,0.3)",
    },
    {
      t: "Rail Yard Telemetry",
      d: "Deploy custom deblurring GANs, YOLOv8/v11, and Zero-DCE low-light models on NVIDIA Jetson AGX. Restore high-speed wagon feeds at 80 km/h, extract IDs with 99.4% accuracy, and detect 18 defect categories with 12ms latency.",
      i: Train,
      accent: "#d946ef",
      accentGlow: "rgba(217,70,239,0.3)",
    },
    {
      t: "Weather Alert System",
      d: "Evaluate wind speeds, visibility logs, and storm indicators.",
      i: CloudSun,
      accent: "#f59e0b",
      accentGlow: "rgba(245,158,11,0.3)",
    },
    {
      t: "Operator Copilot RAG",
      d: "Your natural-language assistant working across terminal systems — drafting dispatch orders, search manifests, and query logs.",
      i: Bot,
      accent: "#14b8a6",
      accentGlow: "rgba(20,184,166,0.3)",
      featured: true,
    },
    {
      t: "Real-time Executive Dashboards",
      d: "Consolidated operational ROI metrics, TEU counts, and carbon indexes accessible by shift leaders and port executives.",
      i: BarChart3,
      accent: "#ec4899",
      accentGlow: "rgba(236,72,153,0.3)",
      featured: true,
    },
  ];

  return (
    <section id="platform" className="py-28 bg-[#05060F] border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Platform" title="Ten systems. One operating model." />

        <div className="mt-14 platform-grid">
          {items.map(({ t, d, i: Icon, accent, accentGlow, featured }, idx) => (
            <div
              key={t}
              className={`platform-card${featured ? " featured" : ""} platform-card-${idx + 1}`}
              style={{
                "--card-accent-glow": accentGlow,
              } as React.CSSProperties}
            >
              <div className="platform-card-index">{String(idx + 1).padStart(2, "0")}</div>

              <div
                className="platform-card-icon"
                style={{
                  background: `${accent}18`,
                  border: `1px solid ${accent}30`,
                  color: accent,
                }}
              >
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="platform-card-title">{t}</h3>
              <p className="platform-card-desc">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GarudInspectionSection() {
  const items = [
    {
      title: "Wagon Number Detection & OCR",
      file: "/Wagon Number Detection & OCR.mp4",
      category: "Vision & Text Recognition",
      description: "Automated detection and OCR reading of wagon numbers with 11-digit Indian Railways format parsing. Uses a specialized localized post-processing model to achieve high confidence even under severe skew, dust, and high speeds.",
      model: "YOLOv8 + EasyOCR + Custom Checksum Validator",
      checklist: [
        "92.3% OCR Extraction Accuracy",
        "95.7% Character Recognition Rate",
        "98.1% Checksum Validation (11-Digit)",
        "High-Speed Processing under 500ms per Wagon",
        "Adaptive Skew, Rotation & Light Adjustments"
      ],
      tag: "GRD-AI-WGN-01",
      bgRadial: `radial-gradient(at 0% 64%, hsla(190, 93%, 56%, 0.15) 0px, transparent 85%),
                 radial-gradient(at 41% 94%, hsla(210, 100%, 80%, 0.1) 0px, transparent 85%),
                 radial-gradient(at 100% 99%, hsla(220, 100%, 57%, 0.15) 0px, transparent 85%)`,
      accentText: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      primaryColor: "hsl(190, 92%, 50%)",
      btnBgGradient: "linear-gradient(0deg, hsl(200, 95%, 45%) 0%, hsl(190, 95%, 65%) 100%)",
      btnText: "Analyze OCR Stream"
    },
    {
      title: "Night-Time Image Enhancement",
      file: "/Night-Time Detection.mp4",
      category: "Low-Light Restoration",
      description: "Low-light image enhancement powered by Zero-DCE (Deep Curve Estimation). Automatically restores dark, high-noise night video feeds to human-grade visibility, boosting night detection accuracy by over 34% without introducing artifacts.",
      model: "Zero-DCE (Deep learning curve estimator)",
      checklist: [
        "89.4% PSNR Quality Preservation",
        "Real-Time Inference under 200ms per Frame",
        "Boosts Night-Time Detection Accuracy by 34.2%",
        "Adaptive Scene & Illumination Matching",
        "Minimizes High-ISO Noise Injection"
      ],
      tag: "GRD-AI-WGN-02",
      bgRadial: `radial-gradient(at 0% 64%, hsla(263, 93%, 56%, 0.15) 0px, transparent 85%),
                 radial-gradient(at 41% 94%, hsla(284, 100%, 84%, 0.1) 0px, transparent 85%),
                 radial-gradient(at 100% 99%, hsla(306, 100%, 57%, 0.15) 0px, transparent 85%)`,
      accentText: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      primaryColor: "hsl(266, 92%, 58%)",
      btnBgGradient: "linear-gradient(0deg, rgba(94, 58, 238, 1) 0%, rgba(197, 107, 240, 1) 100%)",
      btnText: "Tune Low-Light Gain"
    },
    {
      title: "Fault & Anomaly Detection",
      file: "/Fault & Anomaly Detection.mp4",
      category: "Safety & Quality Audits",
      description: "Real-time identification of structural defects, mechanical damages, rust levels, and structural anomalies. Flagged defects trigger instant alerts and highlight the region of interest for railway inspectors.",
      model: "Custom CNN + ResNet Transfer Learning",
      checklist: [
        "91.7% Structural Defect Detection Rate",
        "Low 4.3% False Positive Ratio",
        "Identifies 12+ Categories of Rolling Damage",
        "Automated Bounding-Box Visual Alerts",
        "Configurable Inspection Confidence Thresholds"
      ],
      tag: "GRD-AI-WGN-03",
      bgRadial: `radial-gradient(at 0% 64%, hsla(340, 93%, 56%, 0.15) 0px, transparent 85%),
                 radial-gradient(at 41% 94%, hsla(20, 100%, 80%, 0.1) 0px, transparent 85%),
                 radial-gradient(at 100% 99%, hsla(10, 100%, 57%, 0.15) 0px, transparent 85%)`,
      accentText: "text-rose-400 border-rose-500/30 bg-rose-500/10",
      primaryColor: "hsl(340, 92%, 50%)",
      btnBgGradient: "linear-gradient(0deg, hsl(340, 95%, 45%) 0%, hsl(20, 100%, 60%) 100%)",
      btnText: "Inspect Defects Feed"
    }
  ];

  return (
    <section id="wagon" className="py-28 bg-[#05060F] border-t border-white/5 relative overflow-hidden">
      {/* Conic Border Animation Styles */}
      <style>{`
        .garud-card {
          position: relative;
          background-color: hsla(240, 15%, 9%, 0.9);
          border-radius: 2.5rem;
          box-shadow: 0px -16px 24px 0px rgba(255, 255, 255, 0.15) inset;
        }

        .garud-card-border {
          overflow: hidden;
          pointer-events: none;
          position: absolute;
          z-index: 0;
          inset: -1.5px;
          background-image: linear-gradient(
            0deg,
            hsl(0, 0%, 25%) -50%,
            hsl(0, 0%, 10%) 100%
          );
          border-radius: 2.5rem;
          padding: 1.5px;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .garud-card-border::before {
          content: "";
          pointer-events: none;
          position: absolute;
          z-index: 10;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          transform-origin: center center;
          animation: rotate-border 8s linear infinite;
        }

        .garud-card-border-0::before {
          background-image: conic-gradient(
            from 0deg,
            transparent 0%,
            hsl(190, 95%, 60%) 25%,
            transparent 50%,
            hsl(190, 95%, 60%) 75%,
            transparent 100%
          );
        }

        .garud-card-border-1::before {
          background-image: conic-gradient(
            from 0deg,
            transparent 0%,
            hsl(277, 95%, 60%) 25%,
            transparent 50%,
            hsl(277, 95%, 60%) 75%,
            transparent 100%
          );
        }

        .garud-card-border-2::before {
          background-image: conic-gradient(
            from 0deg,
            transparent 0%,
            hsl(345, 95%, 60%) 25%,
            transparent 50%,
            hsl(345, 95%, 60%) 75%,
            transparent 100%
          );
        }

        @keyframes rotate-border {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* 3D Holographic Layered Cards styles */
        .card-holo-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 900px;
          margin: 10px 0;
          flex-shrink: 0;
          max-width: 140px;
        }

        .card-holo {
          position: relative;
          width: 140px;
          height: 140px;
          border-radius: 26px;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          animation: card-holo-wobble 6.2s ease-in-out infinite;
        }

        @keyframes card-holo-wobble {
          0% {
            transform: rotateX(16deg) rotateY(-18deg);
          }
          50% {
            transform: rotateX(18deg) rotateY(18deg);
          }
          100% {
            transform: rotateX(16deg) rotateY(-18deg);
          }
        }

        .card-holo-layer {
          position: absolute;
          font-weight: 900;
          font-size: 108px;
          letter-spacing: -6px;
          line-height: 1;

          -webkit-text-stroke: 1px rgba(var(--holo-color-raw), 0.65);

          background: var(--holo-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;

          filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.55));
          opacity: 0.95;
          transform-style: preserve-3d;
        }

        .card-holo-layer--back {
          opacity: 0.18;
          filter: blur(1px);
          transform: translateZ(-70px);
          -webkit-text-stroke: 1px rgba(var(--holo-color-raw), 0.4);
        }
        .card-holo-layer--mid {
          opacity: 0.42;
          filter: blur(0.4px);
          transform: translateZ(-34px);
          -webkit-text-stroke: 1px rgba(var(--holo-color-raw), 0.5);
        }
        .card-holo-layer--front {
          opacity: 0.98;
          transform: translateZ(0px);
          -webkit-text-stroke: 1px rgba(var(--holo-color-raw), 0.72);
        }

        .card-holo::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 26px;
          background: radial-gradient(
            circle at 40% 35%,
            rgba(var(--holo-color-raw), 0.12),
            rgba(0, 0, 0, 0) 62%
          );
          filter: blur(8px);
          opacity: 0.9;
          transform: translateZ(-80px);
        }

        .card-holo::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 26px;
          border: 1px solid rgba(var(--holo-color-raw), 0.16);
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.01) 45%,
            rgba(0, 0, 0, 0)
          );
          opacity: 0.55;
          transform: translateZ(-45px);
        }

        @media (max-width: 600px) {
          .card-holo {
            width: 128px;
            height: 128px;
            border-radius: 24px;
          }
          .card-holo-layer {
            font-size: 96px;
            letter-spacing: -5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card-holo {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background aurora gradients */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(6,182,212,0.03),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.03),transparent)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <SectionHead
          eyebrow="WAGON INSPECTION SYSTEM"
          title="Automated Railway Wagon Analytics with Computer Vision & Deep Learning"
        />

        <div className="mt-24 space-y-24">
          {items.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className="garud-card relative flex flex-col lg:flex-row gap-10 lg:gap-16 items-center p-8 lg:p-12 overflow-visible text-left shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.005]"
              >
                {/* 3D Conic Glowing Border */}
                <div className={`garud-card-border garud-card-border-${idx}`} />

                {/* Glassy Radial Gradient Content Backdrop */}
                <div
                  className="absolute inset-[1px] rounded-[2.45rem] pointer-events-none z-10"
                  style={{
                    backgroundImage: `radial-gradient(at 88% 40%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
                                      radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
                                      radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
                                      ${item.bgRadial}`
                  }}
                />

                {/* Video Component */}
                <div className={`w-full lg:w-[48%] flex flex-col justify-center relative z-20 ${!isEven ? "lg:order-2" : ""}`}>
                  <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#05060f] shadow-[0_20px_45px_rgba(0,0,0,0.6)] flex flex-col">
                    
                    {/* Inner video container */}
                    <div className="relative aspect-video w-full overflow-hidden">
                      <video
                        src={item.file}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />

                      {/* Video glare layers */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] z-10" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent opacity-20 mix-blend-overlay z-10" />
                    </div>

                    {/* HUD console overlay info bar */}
                    <div className="bg-[#05060f]/95 backdrop-blur-md border-t border-white/10 px-5 py-3 flex items-center justify-between text-[11px] text-white/50 font-mono w-full">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white/30">STREAM:</span>
                        <span className="text-white font-bold">{item.tag}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white/30">ENGINE:</span>
                        <span className="text-white">{item.model.split(" ")[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="w-full lg:w-[48%] flex flex-col md:flex-row gap-8 items-center lg:items-start relative z-20 text-left">
                  {/* Holographic Index Card */}
                  <div
                    className="card-holo-container"
                    aria-hidden="true"
                    style={{
                      "--holo-color-raw": idx === 0 ? "6, 182, 212" : idx === 1 ? "168, 85, 247" : "244, 63, 94",
                      "--holo-gradient": idx === 0
                        ? "linear-gradient(90deg, rgba(6, 182, 212, 0.18) 0%, rgba(6, 182, 212, 0.86) 35%, rgba(165, 243, 252, 0.7) 60%, rgba(6, 182, 212, 0.22) 100%)"
                        : idx === 1
                        ? "linear-gradient(90deg, rgba(168, 85, 247, 0.18) 0%, rgba(168, 85, 247, 0.86) 35%, rgba(233, 213, 255, 0.7) 60%, rgba(168, 85, 247, 0.22) 100%)"
                        : "linear-gradient(90deg, rgba(244, 63, 94, 0.18) 0%, rgba(244, 63, 94, 0.86) 35%, rgba(254, 205, 211, 0.7) 60%, rgba(244, 63, 94, 0.22) 100%)",
                    } as React.CSSProperties}
                  >
                    <div className="card-holo">
                      <div className="card-holo-layer card-holo-layer--back">{idx + 1}</div>
                      <div className="card-holo-layer card-holo-layer--mid">{idx + 1}</div>
                      <div className="card-holo-layer card-holo-layer--front">{idx + 1}</div>
                    </div>
                  </div>

                  {/* Checklist & Text details */}
                  <div className="flex-1 space-y-6 text-left w-full">
                    <div className="space-y-3">
                      <span className={`text-[10px] uppercase font-mono tracking-[0.18em] font-extrabold ${item.accentText} border px-3 py-1 rounded-full w-fit block`}>
                        {item.category}
                      </span>
                      <h3 className="font-display text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/40 font-mono tracking-wide">
                        {item.model}
                      </p>
                    </div>

                    <hr className="w-full h-[1px] bg-[#1a1a24] border-none" />

                    {/* Checklist style stats list matching user wrapper */}
                    <ul className="space-y-3">
                      {item.checklist.map((text, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-[1.1rem] h-[1.1rem] rounded-full text-black shrink-0" style={{ backgroundColor: item.primaryColor }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-[0.8rem] h-[0.8rem] text-[#05060F]">
                              <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-xs sm:text-sm font-sans font-medium text-white/95">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is LogiMind AI?",
      answer: "LogiMind AI is a unified port and rail operating system designed to scale port terminal capacity, eliminate logistics bottlenecks, and protect site personnel. We integrate real-time computer vision, railway wagon telemetry, agentic AI scheduling runtimes, and predictive maintenance tools into a single digital twin command center."
    },
    {
      question: "How does the YOLOv11 Computer Vision work?",
      answer: "Our neural perception models ingest live security and operational cameras across the port and rail terminals to automatically read container ISO codes, track train wagon numbers, detect container or wagon damage, identify truck gate license plates, and flag PPE safety compliance violations in real-time."
    },
    {
      question: "What is the LangGraph Multi-Agent system?",
      answer: "We deploy LangGraph agent runtimes that operate in a closed-loop. These autonomous agents coordinate with each other to allocate yard stack blocks, clear customs manifests, auto-dispatch safety crews, and route container trucks to optimized crane slots."
    },
    {
      question: "How does predictive maintenance schedule repairs?",
      answer: "By monitoring crane structural stress and engine telemetry, our ML classifiers calculate the Remaining Useful Life (RUL) of quay and yard machinery, forecasting potential breakdown schedules weeks in advance so maintenance can be scheduled without interrupting terminal throughput."
    },
    {
      question: "Is LogiMind AI compatible with existing terminal operating systems (TOS)?",
      answer: "Yes. LogiMind AI is built as a modular integration layer. We connect directly with standard terminal databases, AIS radio streams, GPS telemetry, railway yard networks, and existing TOS providers like Navis N4, Sparcs, or custom legacy systems."
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#05060F] border-t border-white/5">
      {/* Glow details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

      {/* Side decorative assets (Canva bg-removed photos) framing the FAQ section */}
      <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden">
        {/* Left top image (c1.png) */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -8 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.1 }}
          className="absolute top-[8%] left-[-40px] lg:left-[2%] xl:left-[6%] w-[130px] lg:w-[180px] xl:w-[230px] z-10"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="/c1.png"
              alt="Maritime Terminal Automation"
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] opacity-70 hover:opacity-95 hover:scale-105 hover:drop-shadow-[0_20px_40px_rgba(6,182,212,0.35)] transition-all duration-500"
            />
          </motion.div>
        </motion.div>

        {/* Left bottom image (c2.png) */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: 5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.3 }}
          className="absolute bottom-[8%] left-[-20px] lg:left-[3%] xl:left-[7%] w-[120px] lg:w-[160px] xl:w-[210px] z-10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-teal-500/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="/c2.png"
              alt="Smart Container Fleet"
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] opacity-60 hover:opacity-90 hover:scale-105 hover:drop-shadow-[0_20px_40px_rgba(20,184,166,0.3)] transition-all duration-500"
            />
          </motion.div>
        </motion.div>

        {/* Right top image (c3.png) */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 8 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.2 }}
          className="absolute top-[16%] right-[-40px] lg:right-[2%] xl:right-[6%] w-[130px] lg:w-[180px] xl:w-[230px] z-10"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="/c3.png"
              alt="Rail Yard Telemetry"
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] opacity-70 hover:opacity-95 hover:scale-105 hover:drop-shadow-[0_20px_40px_rgba(59,130,246,0.35)] transition-all duration-500"
            />
          </motion.div>
        </motion.div>

        {/* Right bottom image (c4.png) */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: -5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.4 }}
          className="absolute bottom-[10%] right-[-20px] lg:right-[3%] xl:right-[7%] w-[120px] lg:w-[160px] xl:w-[210px] z-10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="/c4.png"
              alt="Autonomous Freight Logistics"
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] opacity-60 hover:opacity-90 hover:scale-105 hover:drop-shadow-[0_20px_40px_rgba(99,102,241,0.3)] transition-all duration-500"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl px-6 relative z-10 text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-xs font-semibold uppercase tracking-[0.2em] text-[#38bdf8]">
          FAQ
        </div>

        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          Frequently asked questions
        </h2>

        <p className="mt-4 text-neutral-400 text-sm sm:text-base">
          Haven't found what you're looking for?{" "}
          <a
            href="mailto:support@logimind.ai"
            className="text-[#38bdf8] hover:text-sky-300 transition-colors font-medium underline underline-offset-4 decoration-sky-500/30"
          >
            Contact us.
          </a>
        </p>

        <div className="mt-16 max-w-3xl mx-auto flex flex-col border-t border-white/5 text-left">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border-b border-white/5 py-6 sm:py-7">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer bg-transparent border-none p-0"
                >
                  <span className="text-base sm:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-200 tracking-tight">
                    {item.question}
                  </span>
                  <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                    {/* Horizontal line */}
                    <div className="absolute w-4.5 h-[1.5px] bg-neutral-600 group-hover:bg-neutral-400 transition-colors duration-200" />
                    {/* Vertical line */}
                    <motion.div
                      className="absolute w-[1.5px] h-4.5 bg-neutral-600 group-hover:bg-neutral-400 transition-colors duration-200"
                      animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1, scaleY: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    />
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-[90%] font-normal">
                    {item.answer}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      title: "Platform",
      links: [
        { label: "Command Center", href: "/app" },
        { label: "Container Vision", href: "/app" },
        { label: "Crane Health", href: "/app" },
        { label: "Vessel Tracker", href: "/app" },
        { label: "Safety System", href: "/app" },
        { label: "AI Copilot", href: "/app", badge: "New" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Terminal Operators", href: "#" },
        { label: "Port Authorities", href: "#" },
        { label: "Logistics Partners", href: "#" },
        { label: "HSE Safety Teams", href: "#" },
        { label: "Sustainability ESG", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "System Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Terminal Case Studies", href: "#" },
        { label: "Maritime Whitepapers", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "System Status", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About LogiMind", href: "#" },
        { label: "Careers", href: "#", badge: "Hiring" },
        { label: "Newsroom logs", href: "#" },
        { label: "Port Partners", href: "#" },
        { label: "Contact Sales", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#05060F] pt-16 pb-0 overflow-hidden text-white/70 relative border-t border-white/5">
      {/* glow + grid backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.18),transparent)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[260px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.12),transparent)]" />

      <div className="mx-auto max-w-[1380px] px-6 md:px-10 relative z-10">

        {/* Newsletter subscription box */}
        <div className="grid gap-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-10 backdrop-blur-xl mb-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              The LogiMind Report
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
              Operational intelligence for ports & rail yards — in your inbox monthly.
            </h3>
            <p className="mt-3 max-w-xl text-sm text-white/60">
              Field notes from terminal and rail yard deployments, multi-agent RAG studies, crane forecasting, wagon telemetry, and predictive maintenance benchmarks. No spam.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-stretch gap-3 self-center sm:flex-row w-full"
          >
            <label className="relative flex-1">
              <span className="sr-only">Work email</span>
              <input
                type="email"
                required
                placeholder="you@logisticsoperator.com"
                className="h-12 w-full rounded-full border border-white/10 bg-[#0A0E1F]/90 px-5 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 focus:bg-white/[0.06]"
              />
            </label>
            <button
              type="submit"
              className="group relative inline-flex h-12 items-center justify-center gap-1.5 overflow-hidden rounded-full px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.8)] transition-transform hover:-translate-y-px cursor-pointer"
              style={{
                backgroundImage: "linear-gradient(120deg, #1B3A6B 0%, #2563EB 55%, #0D9488 110%)",
              }}
            >
              <span className="relative z-10">Subscribe</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Information */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
            <Logo size="lg" />
            <p className="text-sm leading-relaxed text-white/60 mt-1 max-w-md">
              LogiMind AI is the unified operating system for smart ports and rail yards — combining computer vision, predictive maintenance, multi-agent reasoning, rail wagon telemetry, and vessel intelligence in one secure command center.
            </p>
            <div className="text-[13px] text-white/40 font-medium">
              LogiMind AI B.V.
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                SOC 2 Type II
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                ISO 27001
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
                IMO Compliant
              </span>
            </div>
          </div>

          {/* Contact Us */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contact Us</h3>
              <ul className="flex flex-col gap-3.5 text-[13.5px]">
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-white/80">Rotterdam · Singapore · Dubai</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                    <Mail className="h-4 w-4" />
                  </span>
                  <a href="mailto:hello@logimind.ai" className="text-white/80 hover:text-cyan-400 transition-colors">
                    hello@logimind.ai
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                    <Phone className="h-4 w-4" />
                  </span>
                  <a href="tel:+310108004221" className="text-white/80 hover:text-cyan-400 transition-colors">
                    +31 (0)10 800 4221
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="mt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3.5">Connect</h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                >
                  <GitHubIcon className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Sitemap Links */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Site Map</h3>
            <ul className="grid gap-2.5 text-[13.5px]">
              {[
                { to: "/", label: "Home" },
                { to: "/", hash: "how", label: "How It Works" },
                { to: "/", hash: "ecosystem", label: "Ecosystem" },
                { to: "/", hash: "platform", label: "Modules" },
                { to: "/app", label: "Launch Center" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    {...(link.hash ? { hash: link.hash } : {})}
                    className="text-white/75 hover:text-white hover:underline transition decoration-white/20 underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Legal / Copyright strip */}
      <div className="mx-auto max-w-[1380px] px-6 md:px-10 mt-16 pt-8 border-t border-dashed border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 relative z-10">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2.5">
          <Link to="/privacy-policy" target="_blank" className="hover:text-white transition-colors whitespace-nowrap">Privacy Policy</Link>
          <Link to="/terms-and-conditions" target="_blank" className="hover:text-white transition-colors whitespace-nowrap">Terms of Service</Link>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors whitespace-nowrap">Security Details</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors whitespace-nowrap">Manage Cookies</a>
        </div>
        <div className="whitespace-nowrap">
          © {year} LogiMind AI B.V. All rights reserved.
        </div>
      </div>

      {/* Giant Watermark Layer */}
      <div className="relative w-full pointer-events-none select-none z-0 h-[18vw] min-h-[140px] flex items-end justify-center mt-2 pb-0">
        {/* Vibrant cyan-blue background gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[120%] bg-gradient-to-t from-[#2563EB]/25 via-[#1E3A8A]/5 to-transparent pointer-events-none" />
        {/* Radial spotlight centered at the bottom to give that intense bright glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[160px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.45)_0%,rgba(37,99,235,0.18)_40%,transparent_70%)] blur-2xl pointer-events-none" />

        <h1 className="relative z-10 text-[9.2vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/25 via-white/5 to-transparent select-none uppercase font-sans whitespace-nowrap translate-y-[12%]">
          LogiMind AI
        </h1>
      </div>
    </footer>
  );
}

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
  </svg>
);
