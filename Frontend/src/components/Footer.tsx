import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowRight, MapPin, Mail, Phone, Linkedin } from "lucide-react";

export function Footer() {
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
          <Link to="/privacy-policy" className="hover:text-white transition-colors whitespace-nowrap">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-white transition-colors whitespace-nowrap">Terms of Service</Link>
          <Link to="/security-details" className="hover:text-white transition-colors whitespace-nowrap">Security Details</Link>
          <Link to="/manage-cookies" className="hover:text-white transition-colors whitespace-nowrap">Manage Cookies</Link>
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
