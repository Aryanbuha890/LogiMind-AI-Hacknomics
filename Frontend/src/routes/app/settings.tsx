import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { Panel } from "./index";
import { useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Bot,
  Shield,
  Plug,
  KeyRound,
  Activity,
  History,
  ChevronRight,
  Copy,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

const sections = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "agents", label: "AI Agents", icon: Bot },
  { id: "security", label: "Security", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "api", label: "API Keys", icon: KeyRound },
  { id: "health", label: "System Health", icon: Activity },
  { id: "audit", label: "Audit Logs", icon: History },
];

function SettingsPage() {
  const [tab, setTab] = useState("general");
  return (
    <>
      <AppTopBar
        title="Settings"
        subtitle="Workspace · PortMind Mundra Operations"
      />
      <div className="p-6 grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-3 xl:col-span-2">
          <nav className="rounded-xl border border-border bg-card p-1.5">
            {sections.map((s) => {
              const Icon = s.icon;
              const active = tab === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setTab(s.id)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${active ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted/60"}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {s.label}
                  {active && <ChevronRight className="ml-auto h-3 w-3" />}
                </button>
              );
            })}
          </nav>
        </aside>
        <div className="col-span-12 md:col-span-9 xl:col-span-10 space-y-4">
          {tab === "general" && <GeneralPanel />}
          {tab === "notifications" && <NotificationsPanel />}
          {tab === "agents" && <AgentsPanel />}
          {tab === "security" && <SecurityPanel />}
          {tab === "integrations" && <IntegrationsPanel />}
          {tab === "api" && <ApiKeysPanel />}
          {tab === "health" && <HealthPanel />}
          {tab === "audit" && <AuditPanel />}
        </div>
      </div>
    </>
  );
}

function Row({
  label,
  children,
  sub,
}: {
  label: string;
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border py-4 last:border-b-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
function Input(props: any) {
  return (
    <input
      {...props}
      className="h-9 w-64 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-[color:var(--color-secondary)]"
    />
  );
}
function Toggle({ on }: { on?: boolean }) {
  const [v, setV] = useState(!!on);
  return (
    <button
      onClick={() => setV(!v)}
      className={`relative h-5 w-9 rounded-full transition ${v ? "bg-[color:var(--color-secondary)]" : "bg-muted"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${v ? "left-[18px]" : "left-0.5"}`}
      />
    </button>
  );
}

function GeneralPanel() {
  return (
    <Panel title="General" subtitle="Workspace identity and locale">
      <Row label="Workspace name" sub="Displayed across the platform">
        <Input defaultValue="PortMind · Mundra" />
      </Row>
      <Row label="Default port" sub="Primary operations site">
        <Input defaultValue="Mundra, India" />
      </Row>
      <Row label="Time zone">
        <Input defaultValue="Asia/Kolkata (UTC+5:30)" />
      </Row>
      <Row label="Units" sub="Distance and weight system">
        <Input defaultValue="Metric · SI" />
      </Row>
    </Panel>
  );
}

function NotificationsPanel() {
  const items = [
    ["Safety violations", "All PPE, fire and intrusion events", true],
    ["Equipment alerts", "Predictive failure & sensor anomalies", true],
    ["Vessel events", "Arrivals, departures, ETA changes", false],
    ["Weather warnings", "Wind, visibility, storm advisories", true],
    ["Daily executive digest", "Morning rollup at 07:00 local", true],
  ] as const;
  return (
    <Panel title="Notifications" subtitle="Routing & subscriptions">
      {items.map(([l, s, on]) => (
        <Row key={l} label={l} sub={s}>
          <Toggle on={on as boolean} />
        </Row>
      ))}
    </Panel>
  );
}

function AgentsPanel() {
  return (
    <Panel title="AI Agents" subtitle="Multi-agent runtime configuration">
      {[
        [
          "Operations Orchestrator",
          "Routes tasks across the agent network",
          true,
        ],
        ["Safety Agent", "Monitors PPE, intrusion, fire", true],
        ["Container Agent", "Detection, OCR, damage classification", true],
        ["Crane Agent", "Predictive maintenance recommendations", true],
        ["Vessel Agent", "AIS, ETA, berth assignment", true],
        ["Weather Agent", "Forecast ingestion and risk", true],
        ["Security Agent", "Cyber + physical perimeter", true],
        ["Emergency Agent", "Incident response workflows", true],
        ["Knowledge Agent", "RAG over SOPs, IMO, OSHA", true],
      ].map(([l, s, on]) => (
        <Row key={l as string} label={l as string} sub={s as string}>
          <Toggle on={on as boolean} />
        </Row>
      ))}
    </Panel>
  );
}

function SecurityPanel() {
  return (
    <Panel title="Security" subtitle="Authentication & access">
      <Row label="Single Sign-On (SAML)" sub="okta.portmind.ai">
        <span className="rounded-md bg-[color:var(--color-success)]/10 px-2 py-0.5 text-xs font-medium text-[color:var(--color-success)]">
          Connected
        </span>
      </Row>
      <Row label="Multi-factor authentication" sub="Required for all operators">
        <Toggle on />
      </Row>
      <Row label="IP allowlist" sub="Restrict console to known networks">
        <Toggle />
      </Row>
      <Row label="Session timeout" sub="Auto sign-out after inactivity">
        <Input defaultValue="30 minutes" />
      </Row>
      <Row label="Audit retention">
        <Input defaultValue="7 years" />
      </Row>
    </Panel>
  );
}

function IntegrationsPanel() {
  const list = [
    ["Slack", "Alerts & digests", true, "#4A154B"],
    ["PagerDuty", "Incident escalation", true, "#06AC38"],
    ["Splunk", "Log forwarding", false, "#ED0000"],
    ["SAP", "Cargo manifest sync", true, "#0FAAFF"],
    ["AIS Live", "Vessel tracking provider", true, "#2563EB"],
    ["Konecranes", "Crane telemetry", true, "#E60012"],
  ] as const;
  return (
    <Panel title="Integrations" subtitle="Connected systems">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {list.map(([n, s, on, c]) => (
          <div
            key={n}
            className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-md text-white text-xs font-bold"
              style={{ background: c }}
            >
              {(n as string).slice(0, 2)}
            </span>
            <div className="flex-1">
              <div className="text-sm font-medium">{n}</div>
              <div className="text-xs text-muted-foreground">{s}</div>
            </div>
            <Toggle on={on as boolean} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ApiKeysPanel() {
  return (
    <Panel
      title="API Keys"
      subtitle="Programmatic access"
      right={
        <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
          Generate key
        </button>
      }
    >
      <div className="space-y-2">
        {[
          [
            "Production · Operations",
            "pmk_live_••••••••2f91",
            "Created Oct 04",
          ],
          ["Staging · CV Pipeline", "pmk_test_••••••••a830", "Created Sep 12"],
        ].map(([l, k, d]) => (
          <div
            key={l}
            className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
          >
            <KeyRound className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{l}</div>
              <div className="text-xs text-muted-foreground font-mono">{k}</div>
            </div>
            <div className="text-xs text-muted-foreground hidden md:block">
              {d}
            </div>
            <button className="rounded border border-border p-1.5 hover:bg-muted">
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function HealthPanel() {
  return (
    <Panel title="System Health" subtitle="Runtime status">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          ["Inference Cluster", "Healthy", "#15803D", "62ms p95"],
          ["Vector DB · ChromaDB", "Healthy", "#15803D", "12ms"],
          ["AIS Stream", "Degraded", "#D97706", "184ms"],
          ["Camera Mesh (14)", "Healthy", "#15803D", "58 FPS avg"],
        ].map(([l, s, c, sub]) => (
          <div
            key={l}
            className="rounded-lg border border-border bg-background p-3"
          >
            <div className="text-xs text-muted-foreground">{l}</div>
            <div className="mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" style={{ color: c }} />
              <span className="text-sm font-semibold">{s}</span>
            </div>
            <div className="mt-1 font-mono text-[10px] text-muted-foreground">
              {sub}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AuditPanel() {
  const rows = [
    [
      "14:32:18",
      "arjun@dpworld.com",
      "Triggered Safety dispatch · CAM-01",
      "INFO",
    ],
    ["14:18:02", "system", "Predictive model run · Crane fleet", "INFO"],
    ["13:55:44", "priya@dpworld.com", "Updated MFA policy", "AUDIT"],
    ["12:01:10", "system", "Auto-archived 412 events (>30d)", "INFO"],
    [
      "09:22:39",
      "rajesh@adani.com",
      "Approved access · vessel ops dashboard",
      "AUDIT",
    ],
  ];
  return (
    <Panel title="Audit Logs" subtitle="Last 24h · 1,408 events">
      <table className="w-full text-sm">
        <thead className="text-[11px] uppercase text-muted-foreground">
          <tr className="border-b border-border">
            {["Time", "Actor", "Event", "Type"].map((h) => (
              <th key={h} className="py-2 px-3 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-muted/40">
              <td className="py-2.5 px-3 font-mono text-xs">{r[0]}</td>
              <td className="py-2.5 px-3 text-xs">{r[1]}</td>
              <td className="py-2.5 px-3 text-xs">{r[2]}</td>
              <td className="py-2.5 px-3">
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono">
                  {r[3]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}
