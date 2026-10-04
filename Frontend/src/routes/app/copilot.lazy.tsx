import { createLazyFileRoute } from "@tanstack/react-router";
import { AppTopBar } from "@/components/AppSidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  Loader2,
  Key,
  Check,
  Copy,
  Settings2,
  Zap,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export const Route = createLazyFileRoute("/app/copilot")({
  component: CopilotPage,
});

type Msg = {
  role: "user" | "ai";
  text: string;
  source?: string;
  sourcesList?: string[];
  confidence?: string;
  isError?: boolean;
};

const RAG_API = import.meta.env.VITE_RAG_API_URL || "http://localhost:8001";
const DEFAULT_GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
const DEFAULT_GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || "openai/gpt-oss-20b";

const suggested = [
  "Summarize today's safety violations and propose corrective actions",
  "When should Crane 4 be taken offline for maintenance?",
  "Which vessels arriving today carry IMDG class 3 cargo?",
  "Generate an OSHA-compliant incident report for the 14:32 PPE event",
];

const availableModels = [
  { id: "openai/gpt-oss-20b", label: "Neural Engine Core (Fast & Optimized)", badge: "Primary" },
  { id: "qwen/qwen3.6-27b", label: "Deep Reasoning & Compliance Engine", badge: "Advanced" },
  { id: "qwen/qwen3.8-27b", label: "Complex Multimodal & Telemetry Engine", badge: "Extended" },
  { id: "llama-3.1-8b-instant", label: "Ultra-Low Latency Stream", badge: "Instant" },
];

function scrubModelMentions(text: string): string {
  if (!text) return "";
  return text
    .replace(/\b(?:powered by\s+)?(?:Groq\s+)?Llama[- ]?(?:3(?:\.[0-9])?|2)?(?:[- ][0-9]+b)?(?:-versatile|-instant)?\b/gi, "LogiMind Copilot")
    .replace(/\b(?:powered by\s+)?(?:OpenAI\s+)?GPT[- ]?OSS(?:\s*[-0-9a-z]+)?\b/gi, "LogiMind Copilot")
    .replace(/\b(?:powered by\s+)?Qwen(?:\s*[-0-9a-z.]+)?\b/gi, "LogiMind Copilot")
    .replace(/\b(?:powered by\s+)?Groq(?:\s+Cloud)?\b/gi, "LogiMind Copilot")
    .replace(/\b(?:OpenAI GPT-OSS & Qwen|OpenAI GPT-OSS \/ Qwen)\b/gi, "LogiMind Copilot")
    .replace(/powered by LogiMind Copilot/gi, "LogiMind Copilot")
    .replace(/I'm your LogiMind Copilot LogiMind Copilot/gi, "I'm your LogiMind Copilot")
    .replace(/LogiMind Copilot LogiMind Copilot/gi, "LogiMind Copilot");
}

function CopilotPage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hello. I'm your LogiMind Copilot. I can reason across port operations, equipment maintenance, vessel scheduling, rail yard defect telemetry, and international safety compliance. What would you like to explore?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // API Key and Model configuration
  const [groqKey, setGroqKey] = useState<string>(() => {
    return localStorage.getItem("logimind_groq_key") || DEFAULT_GROQ_KEY;
  });
  const [groqModel, setGroqModel] = useState<string>(() => {
    const saved = localStorage.getItem("logimind_groq_model");
    if (!saved || saved.includes("llama-3.3") || saved.includes("llama-3.1")) {
      return "openai/gpt-oss-20b";
    }
    return saved;
  });
  const [tempKey, setTempKey] = useState(groqKey);
  const [keySaved, setKeySaved] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const retryRef = useRef<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then((res: any) => {
      const user = res?.data?.user;
      if (user) {
        const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Port User";
        setMsgs((m) => {
          if (m.length === 1 && m[0].role === "ai") {
            return [
              {
                ...m[0],
                text: `Hello, ${fullName}. I'm your LogiMind Copilot. I can reason across operations, safety, equipment, vessels, rail yards, and the full knowledge base. What would you like to explore?`,
              },
            ];
          }
          return m;
        });
      }
    });
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const saveSettings = () => {
    const cleanKey = tempKey.trim();
    setGroqKey(cleanKey);
    localStorage.setItem("logimind_groq_key", cleanKey);
    localStorage.setItem("logimind_groq_model", groqModel);
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowSettings(false);
    }, 1200);
  };

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const send = useCallback(
    async (text?: string) => {
      const t = (text ?? input).trim();
      if (!t || typing) return;

      const userMsg: Msg = { role: "user", text: t };
      setMsgs((m) => [...m, userMsg]);
      setInput("");
      setTyping(true);
      retryRef.current = t;

      let gotAnswer = false;

      // ── Step 1: Attempt local Python RAG server (ChromaDB + Groq) with short timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2200);

        const res = await fetch(`${RAG_API}/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: t, agent: null }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && data.answer) {
            const reply: Msg = {
              role: "ai",
              text: scrubModelMentions(data.answer),
              sourcesList: data.sources || [],
              confidence: data.confidence || "High",
            };
            setMsgs((m) => [...m, reply]);
            gotAnswer = true;
          }
        }
      } catch {
        // Local server offline or timed out -> proceed to direct inference
      }

      if (gotAnswer) {
        setTyping(false);
        return;
      }

      // ── Step 2: High-speed direct API inference
      try {
        const activeKey = groqKey || DEFAULT_GROQ_KEY;
        if (!activeKey) {
          throw new Error("No API key configured. Please configure your key in settings.");
        }

        // Build recent chat history
        const recentHistory = msgs.slice(-4).map((m) => ({
          role: m.role === "user" ? ("user" as const) : ("assistant" as const),
          content: m.text,
        }));

        const systemPrompt = `You are LogiMind Copilot, an elite AI maritime operations & intelligence assistant for port directors, vessel traffic controllers, and rail yard managers.
You have authoritative knowledge across:
- Port Operations & Logistics: Berth allocation, STS quay cranes (target: 35-45 TEU/hr), turn-around cycles, straddle carriers, AGVs.
- Safety & Regulatory: OSHA Maritime Standards (29 CFR 1917/1918), SOLAS Convention, IMDG Code dangerous goods segregation classes, HazMat containment, automated PPE detection.
- Rail Yard & Wagon Defect Telemetry: AI-based wagon number OCR, Zero-DCE low-light enhancement, cracked leaf springs, structural corrosion, acoustic hot-axle bearing alerts.
- Weather & Predictive Simulations: Beaufort scale impacts, wind shutdown thresholds (>20 m/s for quay cranes), visibility restrictions, storm delay mitigation.

CRITICAL IDENTITY RULES:
- You are LogiMind Copilot, developed exclusively by LogiMind AI.
- NEVER mention ANY underlying AI model names, providers, or vendor platforms (such as Groq, Llama, Meta, OpenAI, GPT, Qwen, DeepSeek, Google Gemini, Anthropic, Claude, Mistral, etc.) under ANY circumstances.
- DO NOT say "I am powered by Groq", "powered by Llama", "powered by OpenAI", or similar phrases.
- If asked who you are, what model or technology powers you, or who built you, respond ONLY that you are LogiMind Copilot, an autonomous maritime operations and port intelligence assistant designed by LogiMind AI.
- Answer with crisp, structured, professional markdown. Use headers, bullet points, and data-driven recommendations where appropriate.`;

        // Resilient candidate list: try chosen model, and auto-fallback if account lacks access
        const candidateModels = Array.from(
          new Set([
            groqModel,
            "openai/gpt-oss-20b",
            "qwen/qwen3.6-27b",
            "qwen/qwen3.8-27b",
            "llama-3.1-8b-instant",
          ]),
        );

        let content = "";
        let successfulModel = groqModel;
        let lastError = "";

        for (const targetModel of candidateModels) {
          try {
            const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${activeKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: targetModel,
                messages: [
                  { role: "system", content: systemPrompt },
                  ...recentHistory,
                  { role: "user", content: t },
                ],
                temperature: 0.3,
                max_tokens: 1500,
              }),
            });

            if (groqRes.ok) {
              const groqData = await groqRes.json();
              content = groqData.choices?.[0]?.message?.content || "";
              if (content) {
                successfulModel = targetModel;
                if (targetModel !== groqModel) {
                  setGroqModel(targetModel);
                  localStorage.setItem("logimind_groq_model", targetModel);
                }
                break;
              }
            } else {
              const errData = await groqRes.json().catch(() => null);
              const errMsg = errData?.error?.message || `HTTP ${groqRes.status}`;
              lastError = errMsg;
              // If the model does not exist or account lacks access, test next candidate model
              if (
                errMsg.includes("does not exist") ||
                errMsg.includes("do not have access") ||
                groqRes.status === 404
              ) {
                continue;
              }
              throw new Error(errMsg);
            }
          } catch (fetchErr: any) {
            if (
              fetchErr.message &&
              (fetchErr.message.includes("does not exist") ||
                fetchErr.message.includes("do not have access"))
            ) {
              lastError = fetchErr.message;
              continue;
            }
            throw fetchErr;
          }
        }

        if (!content) {
          throw new Error(lastError || "Failed to receive response from intelligence server.");
        }

        const reply: Msg = {
          role: "ai",
          text: scrubModelMentions(content),
          confidence: "High",
        };
        setMsgs((m) => [...m, reply]);
      } catch (err) {
        const errorMsg: Msg = {
          role: "ai",
          text: `⚠️ **AI Copilot Connection Issue**\n\n${err instanceof Error ? err.message : "Unable to reach intelligence server."}\n\n*Please verify your API key in the Copilot Settings or ensure the local service is active:* \n\`cd Backend/RAG && python -m src.main serve\``,
          isError: true,
        };
        setMsgs((m) => [...m, errorMsg]);
      } finally {
        setTyping(false);
      }
    },
    [input, typing, groqKey, groqModel, msgs],
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
    <div className="flex h-screen flex-col bg-background">
      <AppTopBar
        title="AI Copilot"
        subtitle="Autonomous Maritime Intelligence · Safety & Port Operations"
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
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${
                    m.role === "user"
                      ? "bg-[#0D9488] text-white"
                      : "bg-gradient-to-br from-cyan-600 via-indigo-600 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  }`}
                >
                  {m.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm relative group ${
                    m.role === "user"
                      ? "bg-[#E0F2F1] text-[#1A1A2E] rounded-tr-sm shadow-sm"
                      : "bg-card border border-border/80 rounded-tl-sm shadow-sm"
                  } ${m.isError ? "border-red-500/50 bg-red-500/5" : ""}`}
                >
                  {m.role === "user" ? (
                    <div className="whitespace-pre-line leading-relaxed text-[#1A1A2E] font-medium">
                      {m.text}
                    </div>
                  ) : (
                    <>
                      <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.text}
                        </ReactMarkdown>
                      </div>

                      {/* Citations & Copy Button */}
                      {m.sourcesList && m.sourcesList.length > 0 ? (
                        <div className="mt-2.5 pt-1.5 border-t border-border/40 flex items-center justify-between gap-2 text-[10px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-cyan-600 dark:text-cyan-400">
                            <BookOpen className="h-2.5 w-2.5" />
                            {m.sourcesList.join(", ")}
                          </span>
                          <button
                            onClick={() => copyText(m.text, i)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded hover:bg-muted"
                          >
                            {copiedIdx === i ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="mt-1 flex justify-end">
                          <button
                            onClick={() => copyText(m.text, i)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded hover:bg-muted"
                          >
                            {copiedIdx === i ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {m.isError && (
                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        onClick={retry}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium hover:bg-muted/80"
                      >
                        <RefreshCw className="h-3 w-3" /> Retry
                      </button>
                      <button
                        onClick={() => setShowSettings(true)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2.5 py-1 text-xs font-medium hover:bg-cyan-500/20"
                      >
                        <Key className="h-3 w-3" /> Update Key
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {typing && (
              <div className="flex gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-card border border-border px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-500" />
                    <span>Reasoning across port operations & safety knowledge base…</span>
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
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs hover:border-cyan-500/40 hover:bg-muted transition-colors"
                  >
                    <Sparkles className="inline h-3 w-3 mr-1 text-cyan-500" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-border p-4 bg-card/40 backdrop-blur-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500/20 max-w-4xl mx-auto w-full shadow-sm"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask LogiMind Copilot anything about port operations, safety, or wagons…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={typing || !input.trim()}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-40 transition-colors shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            <div className="mt-2 text-[10px] text-muted-foreground text-center">
              Autonomous Maritime Intelligence. Responses grounded in port knowledge base. Verify critical maritime actions.
            </div>
          </div>
        </main>
      </div>

      {/* Floating Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-cyan-500" />
                <span className="font-semibold text-sm">Copilot Engine Settings</span>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] font-mono text-muted-foreground block mb-1">
                  Engine Access Key
                </label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-mono outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-muted-foreground block mb-1">
                  Engine Optimization Mode
                </label>
                <select
                  value={groqModel}
                  onChange={(e) => setGroqModel(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-mono outline-none focus:border-cyan-500"
                >
                  {availableModels.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label} ({m.badge})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
              <button
                onClick={() => setTempKey(DEFAULT_GROQ_KEY)}
                className="px-3 py-1 text-xs border border-border rounded-lg text-muted-foreground hover:text-foreground"
              >
                Reset
              </button>
              <button
                onClick={saveSettings}
                className="inline-flex items-center gap-1.5 px-4 py-1 text-xs bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors"
              >
                {keySaved ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Saved!
                  </>
                ) : (
                  "Save & Apply"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
