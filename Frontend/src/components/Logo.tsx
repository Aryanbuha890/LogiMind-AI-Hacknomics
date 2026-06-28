import { Link } from "@tanstack/react-router";

export const LOGO_SRC = "/LogiMind Logo.png";

const sizeClasses = {
  sm: "h-10",
  md: "h-12",
  lg: "h-16",
  xl: "h-24",
} as const;

export function Logo({
  className = "",
  to = "/",
  size = "md",
  showName = false,
}: {
  className?: string;
  to?: string;
  size?: keyof typeof sizeClasses;
  showName?: boolean;
}) {
  if (showName) {
    return (
      <Link
        to={to}
        className={`inline-flex shrink-0 items-center gap-2.5 ${className}`}
      >
        <img
          src={LOGO_SRC}
          alt=""
          aria-hidden
          decoding="async"
          className="h-10 w-10 shrink-0 object-contain object-top"
        />
        <span className="font-display text-[15px] font-semibold tracking-tight text-slate-900 whitespace-nowrap">
          LogiMind <span className="text-red-500">AI</span>
        </span>
      </Link>
    );
  }

  return (
    <Link to={to} className={`inline-flex shrink-0 items-center ${className}`}>
      <img
        src={LOGO_SRC}
        alt="LogiMind AI"
        decoding="async"
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
    </Link>
  );
}
