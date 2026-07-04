"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Send, Sparkles, TrendingUp, Target, Activity } from "lucide-react";
import { ScrollReveal } from "@/components/beui/ScrollReveal";

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "";

type Message = {
  role: "user" | "nova";
  text: string;
  confidence?: number;
  sources?: string[];
  actions?: string[];
  followups?: string[];
  at: number;
};

export default function NovaPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "nova",
      text: "I'm Nova — the brain above the Hub. I can read your CRM, campaigns, lexicon, library, and trends. Ask me anything about your business.",
      at: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function ask(q?: string) {
    const question = (q ?? input).trim();
    if (!question || busy) return;
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", text: question, at: Date.now() }]);
    try {
      const r = await fetch(`${HUB_URL}/api/nova`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await r.json();
      if (data && !data.error) {
        setMessages((m) => [
          ...m,
          {
            role: "nova",
            text: data.answer,
            confidence: data.confidence,
            sources: data.sources,
            actions: data.actions,
            followups: data.followups,
            at: Date.now(),
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "nova",
            text: "Couldn't answer that right now. Make sure the Hub is running.",
            at: Date.now(),
          },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "nova",
          text: "Hub not reachable. Start the Marketing Hub on port 3010.",
          at: Date.now(),
        },
      ]);
    }
    setBusy(false);
  }

  const suggestions = [
    { label: "What's my win rate?", icon: Target },
    { label: "Which trends are growing?", icon: TrendingUp },
    { label: "What should I work on this week?", icon: Sparkles },
    { label: "Show me this week's digest", icon: Activity },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <ScrollReveal y={12}>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl grid place-items-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
          >
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="eyebrow-neutral">AI Reasoning Engine</p>
            <h1 className="font-display text-3xl font-medium text-foreground">Nova</h1>
            <p className="text-xs text-muted-foreground/60">
              The brain above the tools. Ask anything.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Chat */}
      <ScrollReveal y={16} delay={0.1}>
        <div className="rounded-2xl bg-primary border border-ink-800 overflow-hidden">
          <div className="p-4 space-y-3 max-h-[55vh] overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "nova" && (
                  <div
                    className="w-8 h-8 rounded-full grid place-items-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
                  >
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    m.role === "user" ? "bg-violet-600 text-white" : "bg-primary/90 text-foreground"
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
                  {m.role === "nova" &&
                    (m.sources?.length || m.actions?.length || m.followups?.length) && (
                      <div className="mt-2 space-y-2 text-xs">
                        {m.confidence != null && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground/60">Confidence:</span>
                            <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden max-w-[100px]">
                              <div
                                className="h-full bg-emerald-400"
                                style={{ width: `${m.confidence}%` }}
                              />
                            </div>
                            <span className="font-bold text-foreground">{m.confidence}%</span>
                          </div>
                        )}
                        {m.sources && m.sources.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-muted-foreground/60">Sources:</span>
                            {m.sources.map((s) => (
                              <span
                                key={s}
                                className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                        {m.actions && m.actions.length > 0 && (
                          <div>
                            <div className="text-muted-foreground/60">Actions:</div>
                            <ul className="mt-1 space-y-1">
                              {m.actions.map((a, j) => (
                                <li key={j}>• {a}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {m.followups && m.followups.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            <span className="text-muted-foreground/60">Try:</span>
                            {m.followups.map((f, j) => (
                              <button
                                key={j}
                                onClick={() => ask(f)}
                                className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-200 hover:bg-violet-500/30 text-[10px]"
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                </div>
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-muted grid place-items-center flex-shrink-0 text-white text-xs font-bold">
                    B
                  </div>
                )}
              </div>
            ))}
            {busy && (
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full grid place-items-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
                >
                  <Brain className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div className="rounded-2xl p-3 bg-primary/90 text-foreground text-sm">
                  <span className="inline-flex gap-1">
                    {[0, 0.2, 0.4].map((d, i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted/60 animate-pulse"
                        style={{ animationDelay: `${d}s` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-ink-800 p-3 flex gap-2">
            <input
              className="flex-1 bg-background border border-ink-800 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder-paper-500 focus:outline-none focus:border-border"
              placeholder="Ask Nova anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !busy) ask();
              }}
              disabled={busy}
            />
            <button
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent hover:bg-primary/90 disabled:opacity-50 text-white transition-colors"
              onClick={() => ask()}
              disabled={busy || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Quick suggestions */}
      <ScrollReveal y={12} delay={0.2}>
        <div>
          <div className="text-xs text-muted-foreground/60 mb-2">Quick questions:</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={i}
                  onClick={() => ask(s.label)}
                  disabled={busy}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/90 border border-ink-700 hover:border-border text-sm text-muted-foreground disabled:opacity-50 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" /> {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
