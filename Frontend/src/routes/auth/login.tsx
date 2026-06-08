import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthHeader, SubmitButton } from "../auth";
import { Mail, KeyRound } from "lucide-react";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <AuthHeader
        title="Sign in to PortMind AI"
        sub="Welcome back, operator. Access your command center."
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/app" });
        }}
        className="space-y-3"
      >
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-card text-sm font-medium hover:bg-muted"
          >
            <SsoG /> Google
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-card text-sm font-medium hover:bg-muted"
          >
            <SsoM /> Microsoft
          </button>
        </div>
        <div className="my-2 flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or with email{" "}
          <span className="h-px flex-1 bg-border" />
        </div>
        <Field label="Work email" icon={Mail}>
          <input
            type="email"
            required
            defaultValue="operator@dpworld.com"
            className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-[color:var(--color-secondary)] focus:ring-2 focus:ring-[color:var(--color-secondary)]/20"
          />
        </Field>
        <Field
          label="Password"
          icon={KeyRound}
          right={
            <Link
              to="/auth/forgot-password"
              className="text-xs text-[color:var(--color-secondary)] hover:underline"
            >
              Forgot?
            </Link>
          }
        >
          <input
            type="password"
            required
            defaultValue="••••••••••"
            className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-[color:var(--color-secondary)] focus:ring-2 focus:ring-[color:var(--color-secondary)]/20"
          />
        </Field>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            defaultChecked
            className="h-3.5 w-3.5 rounded border-border"
          />
          Keep me signed in on this workstation
        </label>
        <SubmitButton>Launch command center</SubmitButton>
        <div className="mt-2 text-center text-xs text-muted-foreground">
          New to PortMind?{" "}
          <a
            className="text-[color:var(--color-secondary)] hover:underline"
            href="#"
          >
            Request access
          </a>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
  right,
}: {
  label: string;
  icon: any;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-xs font-medium text-foreground">{label}</label>
        {right}
      </div>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {children}
      </div>
    </div>
  );
}

function SsoG() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M22.5 12.27c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.55c2.08-1.92 3.23-4.74 3.23-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.27-2.65l-3.55-2.76c-.99.66-2.25 1.05-3.72 1.05a6.5 6.5 0 0 1-6.1-4.5H2.23v2.83A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.9 14.14a6.6 6.6 0 0 1 0-4.28V7.03H2.23a11 11 0 0 0 0 9.94l3.67-2.83Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.07.56 4.21 1.65l3.16-3.16C17.45 2.1 14.97 1 12 1A11 11 0 0 0 2.23 7.03L5.9 9.86A6.5 6.5 0 0 1 12 5.38Z"
      />
    </svg>
  );
}
function SsoM() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
      <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
      <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
      <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
    </svg>
  );
}
