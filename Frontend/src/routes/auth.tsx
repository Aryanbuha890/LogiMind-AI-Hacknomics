import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: () => <Outlet />,
});

export function AuthHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="space-y-1.5 text-center md:text-left mb-6">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
        {title}
      </h1>
      <p className="text-slate-600 text-xs">
        {sub}
      </p>
    </div>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="w-full h-9 sm:h-10 bg-white hover:bg-slate-100 text-black font-semibold rounded-full flex items-center justify-center transition duration-200 cursor-pointer shadow-lg shadow-white/5 pt-[1px] text-xs sm:text-sm"
    >
      {children}
    </button>
  );
}
