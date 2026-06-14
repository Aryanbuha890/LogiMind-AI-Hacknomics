import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  Container,
  Wrench,
  Ship,
  ShieldAlert,
  Sparkles,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  Brain,
  Map,
  Network,
  FlaskConical,
  TrendingUp,
  Briefcase,
  FileSearch,
  AlertOctagon,
} from "lucide-react";
import { Logo } from "./Logo";

type NavItem = { to: string; label: string; icon: any; exact?: boolean };

const opsItems: NavItem[] = [
  { to: "/app", label: "Command Center", icon: LayoutGrid, exact: true },
  { to: "/app/containers", label: "Containers", icon: Container },
  { to: "/app/cranes", label: "Cranes", icon: Wrench },
  { to: "/app/vessels", label: "Vessels", icon: Ship },
  { to: "/app/safety", label: "Safety", icon: ShieldAlert },
];

const aiItems: NavItem[] = [
  { to: "/app/decision-center", label: "Decision Center", icon: Brain },
  { to: "/app/digital-twin", label: "Digital Twin", icon: Map },
  { to: "/app/war-room", label: "War Room", icon: Network },
  { to: "/app/simulator", label: "Simulator", icon: FlaskConical },
  { to: "/app/predictions", label: "Predictions", icon: TrendingUp },
  { to: "/app/executive", label: "Executive", icon: Briefcase },
  { to: "/app/docs-ai", label: "Docs AI", icon: FileSearch },
  { to: "/app/emergency", label: "Emergency", icon: AlertOctagon },
];

const bottomItems: NavItem[] = [
  { to: "/app/copilot", label: "AI Copilot", icon: Sparkles },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  const renderItem = (it: NavItem) => {
    const Icon = it.icon;
    const active = isActive(it.to, it.exact);
    return (
      <Link
        key={it.to}
        to={it.to as any}
        className={`group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-all ${
          active
            ? "bg-gradient-to-r from-white/15 via-white/10 to-transparent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            : "text-white/70 hover:bg-white/5 hover:text-white"
        }`}
      >
        {active && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-gradient-to-b from-cyan-300 via-indigo-400 to-violet-500 shadow-[0_0_12px_2px_rgba(99,102,241,0.6)]" />
        )}
        <span
          className={`grid h-7 w-7 place-items-center rounded-md transition ${
            active
              ? "bg-white/10 text-cyan-300 ring-1 ring-white/15"
              : "text-white/55 group-hover:bg-white/5 group-hover:text-white/90"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="flex-1 truncate">{it.label}</span>
        {active && (
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_2px_rgba(103,232,249,0.7)]" />
        )}
      </Link>
    );
  };

  return (
    <aside className="relative z-20 hidden lg:flex w-[260px] shrink-0 flex-col text-white/90 overflow-hidden">
      {/* Dark base + ambient color blobs that the glass refracts */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1226] via-[#0D1530] to-[#070B18]" />
      <div className="pointer-events-none absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-24 h-[260px] w-[260px] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/4 h-[280px] w-[280px] rounded-full bg-violet-500/25 blur-3xl" />
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl backdrop-saturate-150" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_30%,transparent_70%,rgba(255,255,255,0.04)_100%)]" />

      <div className="relative px-5 pt-5 pb-4 border-b border-white/10">
        <Logo />
        <div className="mt-4 group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-xs text-white/60 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10">
          <Search className="h-3.5 w-3.5" />
          <span>Search…</span>
          <kbd className="ml-auto rounded border border-white/10 bg-white/10 px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </div>
      </div>

      <nav className="relative flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
        {/* Operations Group */}
        <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
          Operations
        </div>
        {opsItems.map(renderItem)}

        {/* AI Intelligence Group */}
        <div className="px-2 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 flex items-center gap-2">
          <span className="h-px flex-1 bg-white/10" />
          AI Intelligence
          <span className="h-px flex-1 bg-white/10" />
        </div>
        {aiItems.map(renderItem)}

        {/* System Group */}
        <div className="px-2 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 flex items-center gap-2">
          <span className="h-px flex-1 bg-white/10" />
          System
          <span className="h-px flex-1 bg-white/10" />
        </div>
        {bottomItems.map(renderItem)}
      </nav>

      <div className="relative border-t border-white/10 p-3">
        <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.04] p-2 backdrop-blur-md">
          <div className="relative">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-xs font-semibold text-white shadow-lg">
              AR
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0B1226]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold text-white">
              Arjun R.
            </div>
            <div className="truncate text-[10px] text-white/50">
              Port Operations Lead
            </div>
          </div>
          <Link
            to="/auth/login"
            className="grid h-7 w-7 place-items-center rounded-md text-white/40 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function AppTopBar({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/70 bg-background/70 px-6 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_0_rgba(255,255,255,0.04)]">
      <div className="min-w-0 flex-1">
        <h1 className="font-display text-lg font-semibold tracking-tight truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {right}
        <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/70 backdrop-blur transition hover:border-[color:var(--color-secondary)]/40 hover:bg-muted">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--color-warning)] shadow-[0_0_6px_rgba(217,119,6,0.7)]" />
        </button>
        <div className="flex items-center gap-2 rounded-lg border border-[color:var(--color-success)]/25 bg-[color:var(--color-success)]/10 px-2.5 py-1.5 backdrop-blur">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-[color:var(--color-success)] opacity-60 pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-success)]" />
          </span>
          <span className="text-xs font-medium text-[color:var(--color-success)]">
            All systems nominal
          </span>
        </div>
      </div>
    </header>
  );
}
