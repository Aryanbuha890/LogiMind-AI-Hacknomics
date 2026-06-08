import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Ship, ShieldCheck, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left visual */}
      <div className="relative hidden lg:flex flex-col justify-between bg-[color:var(--color-ink)] text-white p-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.07]" />
        <div className="absolute -top-40 -left-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.35),transparent)]" />
        <div className="absolute -bottom-40 -right-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.25),transparent)]" />
        <div className="relative">
          <Logo />
        </div>
        <div className="relative max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs">
            <Ship className="h-3.5 w-3.5 text-[color:var(--color-accent)]" />{" "}
            Maritime command suite
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight">
            The operating system for the world's smartest ports.
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Trusted by operations leads across DP World, Adani Ports, PSA
            Singapore and Maersk.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              ["847K+", "Containers / day"],
              ["217", "Active vessels"],
              ["99.2%", "Compliance"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <div className="font-display text-xl font-semibold">{v}</div>
                <div className="text-[10px] text-white/50">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex items-center gap-2 text-xs text-white/50">
          <ShieldCheck className="h-3.5 w-3.5" /> SOC 2 Type II · IEC 62443 ·
          IMO compliant
        </div>
      </div>
      {/* Right form */}
      <div className="flex flex-col p-6 lg:p-10">
        <div className="lg:hidden mb-8">
          <Logo />
        </div>
        <div className="m-auto w-full max-w-sm">
          <Outlet />
        </div>
        <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            ← Back to site
          </Link>
          <span className="inline-flex items-center gap-1">
            <Lock className="h-3 w-3" /> End-to-end encrypted
          </span>
        </div>
      </div>
    </div>
  );
}

export function AuthHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="mt-2 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-md bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">
      {children} <ArrowRight className="h-4 w-4" />
    </button>
  );
}
