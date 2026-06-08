import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthHeader, SubmitButton } from "../auth";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/auth/forgot-password")({
  component: Forgot,
});

function Forgot() {
  return (
    <div>
      <AuthHeader
        title="Reset your password"
        sub="We'll send a secure recovery link to your work email."
      />
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="email"
            required
            placeholder="you@portoperator.com"
            className="h-11 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-[color:var(--color-secondary)] focus:ring-2 focus:ring-[color:var(--color-secondary)]/20"
          />
        </div>
        <SubmitButton>Send recovery link</SubmitButton>
        <div className="text-center text-xs text-muted-foreground">
          Remembered it?{" "}
          <Link to="/auth/login" className="text-[color:var(--color-secondary)] hover:underline">
            Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
