import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthHeader, SubmitButton } from "../auth";
import { KeyRound } from "lucide-react";

export const Route = createFileRoute("/auth/reset-password")({
  component: Reset,
});

function Reset() {
  return (
    <div>
      <AuthHeader
        title="Choose a new password"
        sub="Make it long, unique, and don't reuse it for other operator accounts."
      />
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        {["New password", "Confirm password"].map((l) => (
          <div key={l}>
            <label className="mb-1 block text-xs font-medium">{l}</label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                className="h-11 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-[color:var(--color-secondary)] focus:ring-2 focus:ring-[color:var(--color-secondary)]/20"
              />
            </div>
          </div>
        ))}
        <SubmitButton>Update password</SubmitButton>
        <div className="text-center text-xs text-muted-foreground">
          <Link
            to="/auth/login"
            className="text-[color:var(--color-secondary)] hover:underline"
          >
            Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
