import { createLazyFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  Loader2,
} from "lucide-react";

export const Route = createLazyFileRoute("/app/copilot")({
  component: CopilotPage,
});

type Msg = {
  role: "user" | "ai";
  text: string;
  isError?: boolean;
};

const RAG_API = import.meta.env.VITE_RAG_API_URL || "http://localhost:8001";

const suggested = [
  "Summarize today's safety violations and propose corrective actions",
  "When should Crane 4 be taken offline for maintenance?",
  "Which vessels arriving today carry IMDG class 3 cargo?",
  "Generate an OSHA-compliant incident report for the 14:32 PPE event",
];

function CopilotPage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hello. I'm your LogiMind Copilot. I can reason across operations, safety, equipment, vessels, rail yards, and the full knowledge base. What would you like to explore?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const retryRef = useRef<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || "Port User";
        setMsgs((m) => {
          if (m.length === 1 && m[0].role === "ai") {
            return [{
              ...m[0],
              text: `Hello, ${fullName}. I'm your LogiMind Copilot. I can reason across operations, safety, equipment, vessels, rail yards, and the full knowledge base. What would you like to explore?`
            }];
          }
          return m;
        });
      }
    });
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = useCallback(
    async (text?: string) => {
      const t = (text ?? input).trim();
      if (!t || typing) return;

      setMsgs((m) => [...m, { role: "user", text: t }]);
      setInput("");
      setTyping(true);
      retryRef.current = t;

      try {
        const res = await fetch(`${RAG_API}/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: t, agent: null }),
        });

        if (!res.ok) {
          throw new Error(`API returned ${res.status}`);
        }

        const data = await res.json();

        const reply: Msg = {
          role: "ai",
          text: data.answer,
        };

        setMsgs((m) => [...m, reply]);
      } catch (err) {
        const errorMsg: Msg = {
          role: "ai",
          text: `⚠️ Could not reach the RAG backend at \`${RAG_API}\`. Make sure the server is running with:\n\n\`cd Backend/RAG && python -m src.main serve\`\n\nError: ${err instanceof Error ? err.message : "Unknown error"}`,
          isError: true,
        };
        setMsgs((m) => [...m, errorMsg]);
      } finally {
        setTyping(false);
      }
    },
    [input, typing],
  );

  const retry = () => {
    if (retryRef.current) {
      setMsgs((m) => {
        const last = m[m.length - 1];
        if (last?.isError) return m.slice(0, -1);
        return m;
      });
      send(retryRef.current);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <AppTopBar
        title="AI Copilot"
        subtitle="Multi-agent reasoning · RAG · Citations"
      />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col bg-background min-h-0">
          <div className="flex-1 overflow-y-auto min-h-0 px-6 py-6 space-y-5 max-w-4xl mx-auto w-full">
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${m.role === "user" ? "bg-[#0D9488] text-white" : "bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-white"}`}
                >
                  {m.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-[#E0F2F1] text-[#1A1A2E] rounded-tr-sm" : "bg-card border border-border rounded-tl-sm"} ${m.isError ? "border-red-500/40" : ""}`}
                >
                  {m.role === "user" ? (
                    <div className="whitespace-pre-line leading-relaxed text-[#1A1A2E]">
                      {m.text}
                    </div>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {m.text}
                      </ReactMarkdown>
                    </div>
                  )}
                  {m.isError && (
                    <button
                      onClick={retry}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium hover:bg-muted/80"
                    >
                      <RefreshCw className="h-3 w-3" /> Retry
                    </button>
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
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Searching knowledge base…</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          {msgs.length <= 1 && (
            <div className="px-6 pb-3 max-w-4xl mx-auto w-full">
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
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 focus-within:border-[color:var(--color-secondary)] max-w-4xl mx-auto w-full"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the command center anything…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={typing}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            <div className="mt-2 text-[10px] text-muted-foreground text-center">
              Responses grounded in your port's documents. Verify critical
              actions.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
