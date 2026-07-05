"use client";

import { useEffect, useState } from "react";
import { Newspaper, TrendingUp, BookOpen, Library, Activity, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/beui/ScrollReveal";

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "";

interface ArticleItem {
  title: string;
  url: string;
  source?: string;
  author?: string;
  published_at?: string;
}

interface TrendItem {
  name?: string;
  term?: string;
  label?: string;
}

interface LexiconItem {
  term?: string;
  name?: string;
  definition?: string;
  def?: string;
}

interface LibraryItem {
  name: string;
  category: string;
}

interface TriangleStatus {
  ok: boolean;
  pipeline_value?: number;
  enrollments_active?: number;
  triangle_velocity?: number;
}

export default function IntelligencePage() {
  const [dive, setDive] = useState<ArticleItem[]>([]);
  const [wire, setWire] = useState<ArticleItem[]>([]);
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [lexicon, setLexicon] = useState<LexiconItem[]>([]);
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [triangle, setTriangle] = useState<TriangleStatus | null>(null);

  useEffect(() => {
    async function load() {
      const [d, w, tm, lx, lb, tr] = await Promise.all([
        fetch(`${HUB_URL}/api/dive/articles?limit=6`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
        fetch(`${HUB_URL}/api/wire/articles?limit=6`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
        fetch(`${HUB_URL}/api/trends?view=macro`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
        fetch(`${HUB_URL}/api/lexicon?limit=6`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
        fetch(`${HUB_URL}/api/library?limit=6`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
        fetch(`${HUB_URL}/api/triangle/health`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ]);
      setDive(d?.rows || d?.articles || []);
      setWire(w?.rows || w?.articles || []);
      setTrends(tm?.macro || tm?.rows || []);
      setLexicon(lx?.rows || lx?.terms || []);
      setLibrary(lb?.rows || lb?.frameworks || []);
      setTriangle(tr);
    }
    load();
    const t = setInterval(load, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <ScrollReveal y={12}>
        <div>
          <p className="eyebrow-neutral mb-2">Free Content Archive</p>
          <h1 className="font-display text-3xl font-medium text-foreground">Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Live data from the Marketing Hub — industry news, trends, marketing lexicon, and
            frameworks. All free, all archived, all ours.
          </p>
        </div>
      </ScrollReveal>

      {/* Triangle status */}
      {triangle && (
        <ScrollReveal y={12} delay={0.1}>
          <div className="rounded-2xl bg-primary border border-border p-4 flex items-center gap-4">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div className="flex-1">
              <span className="text-foreground font-medium">
                Triangle Loop: {triangle.ok ? "ALIVE" : "WARMING"}
              </span>
              <span className="text-muted-foreground/60 text-sm ml-3">
                ${Math.round(triangle.pipeline_value || 0).toLocaleString()} pipeline ·{" "}
                {triangle.enrollments_active || 0} active ·{" "}
                {(triangle.triangle_velocity || 0).toFixed(2)} wins/day
              </span>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Marketing Dive */}
      {dive.length > 0 && (
        <ScrollReveal y={16} delay={0.15}>
          <Section
            icon={Newspaper}
            title="Marketing Dive"
            desc="Industry news, ingested daily from marketingdive.com"
          >
            {dive.map((a, i) => (
              <ArticleRow
                key={i}
                title={a.title}
                url={a.url}
                source="Marketing Dive"
                date={a.published_at}
              />
            ))}
          </Section>
        </ScrollReveal>
      )}

      {/* Wire */}
      {wire.length > 0 && (
        <ScrollReveal y={16} delay={0.2}>
          <Section
            icon={Newspaper}
            title="The Wire"
            desc="Seth Godin, Schwartz, and industry bloggers — scored and ranked"
          >
            {wire.map((a, i) => (
              <ArticleRow key={i} title={a.title} url={a.url} source={a.source ?? "The Wire"} author={a.author} />
            ))}
          </Section>
        </ScrollReveal>
      )}

      {/* Trends */}
      {trends.length > 0 && (
        <ScrollReveal y={16} delay={0.25}>
          <Section
            icon={TrendingUp}
            title="Macro Trends"
            desc="What's rising in marketing — adoption and momentum"
          >
            <div className="flex flex-wrap gap-2">
              {trends.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-primary/90 border border-ink-700 hover:border-border text-sm text-muted-foreground transition-colors"
                >
                  {t.name || t.term || t.label || JSON.stringify(t).slice(0, 30)}
                </span>
              ))}
            </div>
          </Section>
        </ScrollReveal>
      )}

      {/* Lexicon */}
      {lexicon.length > 0 && (
        <ScrollReveal y={16} delay={0.3}>
          <Section
            icon={BookOpen}
            title="Marketing Lexicon"
            desc="Terms, definitions, and who coined them"
          >
            {lexicon.map((t, i) => (
              <div key={i} className="border-b border-ink-800 pb-3 mb-3 last:border-0">
                <p className="font-display text-base font-medium text-foreground">
                  {t.term || t.name}
                </p>
                <p className="text-sm text-muted-foreground/60 mt-1">
                  {(t.definition || t.def || "").slice(0, 120)}
                </p>
              </div>
            ))}
          </Section>
        </ScrollReveal>
      )}

      {/* Library */}
      {library.length > 0 && (
        <ScrollReveal y={16} delay={0.35}>
          <Section
            icon={Library}
            title="Framework Library"
            desc="Marketing formulas and frameworks — CAC, LTV, AIDA, STP, and more"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {library.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-primary/90 border border-ink-700 p-4 hover:border-border transition-colors"
                >
                  <p className="font-display text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{item.category}</p>
                </div>
              ))}
            </div>
          </Section>
        </ScrollReveal>
      )}
    </div>
  );
}

type IconType = React.ComponentType<{ className?: string }>;

function Section({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: IconType;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-primary border border-ink-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-foreground" />
        <h2 className="font-display text-xl font-medium text-foreground">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground/60 mb-4">{desc}</p>
      {children}
    </div>
  );
}

function ArticleRow({
  title,
  url,
  source,
  author,
  date,
}: {
  title: string;
  url: string;
  source: string;
  author?: string;
  date?: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group block border-b border-ink-800 py-3 last:border-0 hover:bg-primary/90/50 -mx-2 px-2 rounded-lg transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground group-hover:text-foreground transition-colors">
            {title}
          </p>
          <p className="text-xs text-foreground0 mt-1">
            {source}
            {author ? ` · ${author}` : ""}
            {date ? ` · ${new Date(date).toLocaleDateString()}` : ""}
          </p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-foreground0 group-hover:text-foreground flex-shrink-0 mt-1 transition-colors" />
      </div>
    </a>
  );
}
