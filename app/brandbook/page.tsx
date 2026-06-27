import { Metadata } from 'next';
import { Section, Eyebrow, SectionHeading } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { buildMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Brandbook',
  description:
    'The BAZ brand system: visual, verbal, and experiential language. Real tokens, real voice rules, downloadable.',
  path: '/brandbook',
});

// ─── Real BAZ brand values (sourced from tailwind.config.ts) ──────────────
const PALETTE = [
  {
    name: 'Accent',
    hex: '#ff3b2f',
    usage: 'Primary action color. CTAs, focus states, marquee.',
    textOn: 'white',
  },
  {
    name: 'Ink 900',
    hex: '#0e0e10',
    usage: 'Headings, body on light backgrounds, dark mode surface.',
    textOn: 'white',
  },
  {
    name: 'Ink 700',
    hex: '#2a2a28',
    usage: 'Secondary text, subtle borders.',
    textOn: 'white',
  },
  {
    name: 'Ink 400',
    hex: '#7e7e79',
    usage: 'Tertiary text, captions, footer.',
    textOn: 'white',
  },
  {
    name: 'Paper',
    hex: '#f5f1ea',
    usage: 'Page background — warm off-white. Default canvas.',
    textOn: 'ink',
  },
  {
    name: 'Paper 50',
    hex: '#fdfcf9',
    usage: 'Cards, elevated surfaces.',
    textOn: 'ink',
  },
  {
    name: 'Success',
    hex: '#3ddc97',
    usage: 'Positive deltas, "on" states, growth metrics.',
    textOn: 'white',
  },
  {
    name: 'Warning',
    hex: '#ffb020',
    usage: 'Caution, attention required, not-yet states.',
    textOn: 'white',
  },
  {
    name: 'Info',
    hex: '#4f7cff',
    usage: 'Informational accents, links in dense copy.',
    textOn: 'white',
  },
];

const TYPE = [
  {
    name: 'Display',
    family: 'Fraunces',
    cssVar: 'font-display',
    usage: 'Editorial moments, H1/H2, hero copy, big numbers.',
    weight: '500–700',
    style: 'normal',
    sample: 'Make growth predictable.',
  },
  {
    name: 'Body',
    family: 'Inter',
    cssVar: 'font-sans',
    usage: 'Paragraphs, UI, buttons, navigation.',
    weight: '400–600',
    style: 'normal',
    sample: 'BAZ is a senior-only growth partner that builds and manages your owned, earned, paid, and data channels.',
  },
  {
    name: 'Mono',
    family: 'JetBrains Mono',
    cssVar: 'font-mono',
    usage: 'Eyebrows, technical labels, code, metric values.',
    weight: '400–500',
    style: 'normal',
    sample: 'BUILT 2026 · V4.0 · OWNED BY BAZ ASLAN',
  },
];

const LOGO_VARIATIONS = [
  { bg: '#ff3b2f', label: 'PRIMARY · COLOR', textColor: 'white', variant: 'color' },
  { bg: '#0e0e10', label: 'PRIMARY · BLACK', textColor: '#f5f1ea', variant: 'color' },
  { bg: '#fdfcf9', label: 'PRIMARY · WHITE', textColor: '#0e0e10', border: true, variant: 'color' },
  { bg: '#f5f1ea', label: 'PRIMARY · PAPER', textColor: '#0e0e10', variant: 'color' },
];

const VOICE_DOS = [
  'Confident, not arrogant',
  'Direct, not blunt',
  'Creative, not precious',
  'Optimistic, not naïve',
  'Specific, not vague',
];

const VOICE_DONTS = [
  'Synergy',
  'Best-in-class',
  'Disruptive',
  '"Leverage" (as a verb)',
  'Exclamation marks used liberally',
];

const TEMPLATES = [
  { name: 'Brief intake', desc: 'First-touch contact form. 7 fields, single CTA.', count: 3 },
  { name: 'Case study', desc: 'Hero · metrics · strategy · result · testimonial.', count: 6 },
  { name: 'Editorial post', desc: 'Long-form article. Markdown body, author, CTA.', count: 11 },
  { name: 'Service page', desc: 'Hero · process · deliverables · proof · FAQ.', count: 18 },
  { name: 'Industry page', desc: 'Hero · challenges · outcomes · related services.', count: 6 },
  { name: 'Email — weekly', desc: 'Plain text + one link. No graphics.', count: 1 },
];

export default function BrandbookPage() {
  return (
    <>
      {/* ────────────────────────── Hero ────────────────────────── */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: '#c5281a' }}
      >
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden
          style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto py-24 md:py-36 relative">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Brandbook' }]} />
          <div className="max-w-4xl">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] mb-6 text-white/80">
              — BAZ Brand System · v4.0
            </p>
            <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em] text-white">
              Our <em className="not-italic font-display italic">brand.</em>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
              The visual, verbal, and experiential language we use to make BAZ unmistakable —
              across every surface, channel, and moment.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="/brandbook#logo"
                className="inline-flex items-center gap-2 bg-paper text-ink-900 hover:bg-white transition-colors px-5 h-11 rounded-full font-medium border border-ink-200">
                Read the book <span aria-hidden>→</span>
              </a>
              <DownloadButton />
            </div>
            <div className="mt-10 text-xs font-mono uppercase tracking-[0.15em] text-white/70">
              Last updated · June 23, 2026 · Owned by BAZ · Marketing Agency
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── Logo ────────────────────────── */}
      <Section tone="paper" size="lg" id="logo">
        <Eyebrow>01 · Logo</Eyebrow>
        <SectionHeading>The wordmark is the mark.</SectionHeading>
        <p className="mt-4 text-lg text-ink-700 max-w-2xl">
          BAZ is a wordmark — bold, minimal, built for legibility. We don&apos;t use a separate
          symbol. The whole name <em>is</em> the logo. Three B variants cover every surface.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LOGO_VARIATIONS.map((v) => (
            <div key={v.label}
              className={`aspect-[4/3] rounded-2xl flex flex-col items-center justify-center p-6 ${v.border ? 'border border-ink-200' : ''}`}
              style={{ background: v.bg, color: v.textColor }}>
              <div className="flex items-center gap-2">
                <span className="grid place-items-center w-10 h-10 rounded-xl font-display font-bold text-2xl"
                  style={{ background: v.textColor, color: v.bg }}>B</span>
                <span className="font-display font-bold text-2xl tracking-[-0.02em]">AZ</span>
              </div>
              <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">{v.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-sm text-ink-700">
          <div><b className="text-ink-900">Minimum size</b><br/>24px height on screen / 8mm in print.</div>
          <div><b className="text-ink-900">Clear space</b><br/>Padding equal to the cap height of &quot;B&quot; on every side.</div>
          <div><b className="text-ink-900">Don&apos;t</b><br/>Stretch, skew, recolor outside palette, place on busy imagery without scrim.</div>
        </div>
      </Section>

      {/* ────────────────────────── Color ────────────────────────── */}
      <Section tone="white" size="lg" id="color">
        <Eyebrow>02 · Color</Eyebrow>
        <SectionHeading>A short, opinionated palette.</SectionHeading>
        <p className="mt-4 text-lg text-ink-700 max-w-2xl">
          Accent does the heavy lifting on action. Ink and Paper do everything else. We use the
          full rainbow only when the surface demands it.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PALETTE.map((c) => (
            <div key={c.hex} className="rounded-2xl overflow-hidden border border-ink-100">
              <div className="aspect-[16/9] flex items-end p-5 font-mono text-xs"
                style={{ background: c.hex, color: c.textOn === 'white' ? '#fff' : '#0e0e10' }}>
                {c.hex.toUpperCase()}
              </div>
              <div className="p-5 bg-paper-50">
                <b className="text-ink-900">{c.name}</b>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ────────────────────────── Typography ───────────────────── */}
      <Section tone="paper" size="lg" id="type">
        <Eyebrow>03 · Typography</Eyebrow>
        <SectionHeading>Three families, three jobs.</SectionHeading>
        <p className="mt-4 text-lg text-ink-700 max-w-2xl">
          Display for editorial moments. Body for everything. Mono for technical labels and code.
        </p>
        <div className="mt-12 space-y-4">
          {TYPE.map((t) => (
            <div key={t.family} className="bg-paper-50 rounded-2xl border border-ink-100 p-6 md:p-8">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div>
                  <div className="font-mono uppercase tracking-[0.15em] text-[11px] text-ink-500">{t.usage}</div>
                  <div className="mt-1 font-display text-2xl font-medium tracking-[-0.02em]">{t.family}</div>
                </div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-100 text-xs font-medium">{t.weight}</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-100 text-xs font-medium">{t.style}</span>
                </div>
              </div>
              <div className={`${t.cssVar === 'font-display' ? 'font-display' : t.cssVar === 'font-mono' ? 'font-mono' : 'font-sans'} text-2xl md:text-3xl text-ink-900 leading-tight`}>
                {t.sample}
              </div>
              <div className="mt-6 pt-4 border-t border-ink-100 grid sm:grid-cols-3 gap-2 text-xs font-mono text-ink-500">
                <span>WEIGHT {t.weight}</span>
                <span>FAMILY {t.family.toUpperCase()}</span>
                <span>USAGE: {t.usage.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ────────────────────────── Voice ───────────────────────── */}
      <Section tone="white" size="lg" id="voice">
        <Eyebrow>04 · Voice &amp; tone</Eyebrow>
        <SectionHeading>We sound like a senior person at a great agency.</SectionHeading>
        <p className="mt-4 text-lg text-ink-700 max-w-2xl">
          Direct, creative, and allergic to jargon.
        </p>
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-ink-100 bg-paper p-6 md:p-8">
            <h3 className="font-display text-xl font-medium tracking-[-0.02em] mb-5">We are</h3>
            <ul className="space-y-3 text-[15px] text-ink-700">
              {VOICE_DOS.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span aria-hidden className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-success" />
                  {d}
                </li>
              ))}
            </ul>
            <h3 className="font-display text-xl font-medium tracking-[-0.02em] mt-8 mb-5">We avoid</h3>
            <ul className="space-y-3 text-[15px] text-ink-700">
              {VOICE_DONTS.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span aria-hidden className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
                  <span><s className="opacity-70">{d}</s></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 md:p-8">
            <h3 className="font-display text-xl font-medium tracking-[-0.02em] mb-5">In practice</h3>
            <div className="space-y-3">
              <div className="rounded-xl bg-ink-50 p-4 border-l-2 border-accent">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-1.5">Don&apos;t write</div>
                <p className="text-ink-700 text-[15px]">&ldquo;We synergize disruptive solutions to disrupt the industry.&rdquo;</p>
              </div>
              <div className="rounded-xl bg-ink-50 p-4 border-l-2 border-success">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-success mb-1.5">Write</div>
                <p className="text-ink-900 text-[15px] font-medium">&ldquo;We build brands that move markets.&rdquo;</p>
              </div>
              <div className="rounded-xl bg-ink-50 p-4 border-l-2 border-accent">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-1.5">Don&apos;t write</div>
                <p className="text-ink-700 text-[15px]">&ldquo;Best-in-class digital marketing agency.&rdquo;</p>
              </div>
              <div className="rounded-xl bg-ink-50 p-4 border-l-2 border-success">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-success mb-1.5">Write</div>
                <p className="text-ink-900 text-[15px] font-medium">&ldquo;The agency for teams who refuse to be a footnote.&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ────────────────────────── Templates ───────────────────── */}
      <Section tone="paper" size="lg" id="templates">
        <Eyebrow>05 · Templates</Eyebrow>
        <SectionHeading>Pre-approved starting points.</SectionHeading>
        <p className="mt-4 text-lg text-ink-700 max-w-2xl">
          Use these instead of starting from a blank page. Every template is open, forkable, and
          versioned in the BAZ design system.
        </p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES.map((t) => (
            <div key={t.name} className="bg-paper-50 rounded-2xl border border-ink-100 p-6 hover:border-ink-900 hover:-translate-y-0.5 hover:shadow-lift transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl bg-accent text-white grid place-items-center font-display font-bold">B</div>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-500">{t.count} {t.count === 1 ? 'instance' : 'instances'}</span>
              </div>
              <h3 className="font-display text-lg font-medium tracking-[-0.02em]">{t.name}</h3>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbLd([
            { name: 'Home', url: '/' },
            { name: 'Brandbook', url: '/brandbook' },
          ]),
        ])}
      />
    </>
  );
}

// Client component for the download button (uses navigator APIs)
import { DownloadButton } from './DownloadButton';