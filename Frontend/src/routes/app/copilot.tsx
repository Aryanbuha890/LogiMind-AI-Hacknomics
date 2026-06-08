import { createFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Send,
  Mic,
  Paperclip,
  Plus,
  Sparkles,
  FileText,
  BookOpen,
  ChevronRight,
  Bot,
  User,
} from "lucide-react";

export const Route = createFileRoute("/app/copilot")({
  component: CopilotPage,
});

type Msg = {
  role: "user" | "ai";
  text: string;
  sources?: { title: string; src: string }[];
};

const suggested = [
  "Summarize today's safety violations and propose corrective actions",
  "When should Crane 4 be taken offline for maintenance?",
  "Which vessels arriving today carry IMDG class 3 cargo?",
  "Generate an OSHA-compliant incident report for the 14:32 PPE event",
];

const conversations = [
  { id: 1, t: "Crane 4 maintenance plan", time: "2h ago" },
  { id: 2, t: "Berth allocation for tomorrow", time: "Yesterday" },
  { id: 3, t: "IMDG hazardous cargo audit", time: "Tue" },
  { id: 4, t: "Q4 safety KPIs", time: "Last week" },
];

const knowledge = [
  { t: "IMO MSC.1/Circ.1216", s: "IMO Documents", c: "#2563EB" },
  { t: "OSHA 1917 — Marine Terminals", s: "OSHA Standards", c: "#15803D" },
  { t: "Port SOP · Berthing Operations", s: "Port SOPs", c: "#0D9488" },
  { t: "IMDG Code · Class 3 Liquids", s: "IMDG Regulations", c: "#D97706" },
  {
    t: "Konecranes RTG Maintenance Manual",
    s: "Maintenance Manuals",
    c: "#8B5CF6",
  },
];

function CopilotPage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hello, Arjun. I'm your PortMind Copilot. I can reason across operations, safety, equipment, vessels and the full knowledge base. What would you like to explore?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply: Msg = {
        role: "ai",
        text: `Based on real-time signals and the knowledge base:\n\n1. Crane 4 vibration at 4.2g — 2.3× baseline (high anomaly).\n2. Predictive model places estimated failure on Dec 20 with 93.4% confidence.\n3. Recommended window: Dec 14, 02:00–06:00 (low traffic, weather window holds).\n\nEstimated cost saved vs unplanned downtime: $184,200. I can draft the work order and notify the maintenance team.`,
        sources: [
          {
            title: "Predictive Maintenance Model v3.2",
            src: "Maintenance Manuals",
          },
          { title: "Port SOP · Crane Service Procedures", src: "Port SOPs" },
          { title: "OSHA 1917.45 — Crane safety", src: "OSHA Standards" },
        ],
      };
      setMsgs((m) => [...m, reply]);
      setTyping(false);
    }, 1100);
  };

  return (
    <div className="flex h-screen flex-col">
      <AppTopBar
        title="AI Copilot"
        subtitle="Multi-agent reasoning · RAG · Citations"
      />
      <div className="grid flex-1 grid-cols-12 overflow-hidden">
        {/* Left: Conversations */}
        <aside className="hidden md:flex md:col-span-3 xl:col-span-2 flex-col border-r border-border bg-card/40">
          <div className="p-3">
            <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> New chat
            </button>
          </div>
          <div className="px-3 pb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            History
          </div>
          <ul className="flex-1 overflow-y-auto px-2 space-y-0.5 text-sm">
            {conversations.map((c) => (
              <li key={c.id}>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-medium">{c.t}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {c.time}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-border p-3 text-[11px] text-muted-foreground">
            <div className="font-medium text-foreground mb-1">Active agent</div>
            <select className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs">
              <option>Operations Orchestrator</option>
              <option>Safety Specialist</option>
              <option>Equipment Engineer</option>
              <option>Vessel Coordinator</option>
            </select>
          </div>
        </aside>

        {/* Center: Chat */}
        <main className="col-span-12 md:col-span-6 xl:col-span-7 flex flex-col bg-background">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-white"}`}
                >
                  {m.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card border border-border rounded-tl-sm"}`}
                >
                  <div className="whitespace-pre-line leading-relaxed">
                    {m.text}
                  </div>
                  {m.sources && (
                    <div className="mt-3 border-t border-border/60 pt-2.5">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Sources
                      </div>
                      <ul className="mt-1.5 space-y-1">
                        {m.sources.map((s, j) => (
                          <li
                            key={j}
                            className="flex items-center gap-2 text-xs"
                          >
                            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                              {j + 1}
                            </span>
                            <span className="truncate">{s.title}</span>
                            <span className="ml-auto text-[10px] text-muted-foreground">
                              {s.src}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-card border border-border px-4 py-3">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          {msgs.length <= 1 && (
            <div className="px-6 pb-3">
              <div className="text-[11px] font-medium uppercase text-muted-foreground mb-2">
                Suggested prompts
              </div>
              <div className="flex flex-wrap gap-2">
                {suggested.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs hover:border-[color:var(--color-secondary)]/40 hover:bg-muted"
                  >
                    <Sparkles className="inline h-3 w-3 mr-1 text-[color:var(--color-secondary)]" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="border-t border-border p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 focus-within:border-[color:var(--color-secondary)]"
            >
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the command center anything…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            <div className="mt-2 text-[10px] text-muted-foreground">
              Responses grounded in your port's documents. Verify critical
              actions.
            </div>
          </div>
        </main>

        {/* Right: Knowledge */}
        <aside className="hidden xl:flex xl:col-span-3 flex-col border-l border-border bg-card/40">
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4" />
              Knowledge Base
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              ChromaDB · BGE embeddings · Reranker
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-3 space-y-2">
            {knowledge.map((k) => (
              <div
                key={k.t}
                className="rounded-lg border border-border bg-background p-3"
              >
                <div
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: k.c }}
                >
                  {k.s}
                </div>
                <div className="mt-1 text-sm font-medium">{k.t}</div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Indexed · 2.1MB</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
