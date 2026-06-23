'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { defaultBrand, templates, type BrandKit, type TemplateId } from '@/lib/canva';

type Layer = {
  id: string;
  kind: 'heading' | 'sub' | 'body' | 'badge' | 'metric';
  text: string;
  x: number; // percent
  y: number;
  size: number;
  weight: number;
  align: 'left' | 'center' | 'right';
  color: string;
};

const seedLayers = (template: TemplateId, brand: BrandKit): Layer[] => {
  if (template === 'og-card') {
    return [
      { id: 'l1', kind: 'badge',  text: 'CASE STUDY', x: 6, y: 8,  size: 14, weight: 500, align: 'left',  color: brand.accent },
      { id: 'l2', kind: 'heading',text: 'Northwind · 4.2× AI Overview citations', x: 6, y: 22, size: 56, weight: 600, align: 'left', color: brand.ink },
      { id: 'l3', kind: 'sub',    text: 'How we rebuilt content for the new search game.', x: 6, y: 60, size: 22, weight: 400, align: 'left', color: brand.ink },
      { id: 'l4', kind: 'body',   text: 'BAZ · Marketing Agency', x: 6, y: 86, size: 16, weight: 500, align: 'left', color: brand.ink },
    ];
  }
  if (template === 'case-cover') {
    return [
      { id: 'l1', kind: 'badge',  text: 'CLIENT · NORTHWIND', x: 6, y: 8,  size: 14, weight: 500, align: 'left',  color: 'rgba(255,255,255,0.85)' },
      { id: 'l2', kind: 'heading',text: 'Fintech SEO, rebuilt.', x: 6, y: 35, size: 88, weight: 600, align: 'left', color: '#ffffff' },
      { id: 'l3', kind: 'sub',    text: '+312% organic signups in 6 months.', x: 6, y: 60, size: 28, weight: 400, align: 'left', color: 'rgba(255,255,255,0.9)' },
    ];
  }
  if (template === 'ad-square') {
    return [
      { id: 'l1', kind: 'badge',  text: 'FOR CMOs', x: 6, y: 8, size: 16, weight: 500, align: 'left', color: brand.accent },
      { id: 'l2', kind: 'heading',text: 'Stop paying\nfor activity.', x: 8, y: 28, size: 76, weight: 600, align: 'left', color: brand.ink },
      { id: 'l3', kind: 'sub',    text: 'BAZ ties its fee to revenue.', x: 8, y: 76, size: 22, weight: 400, align: 'left', color: brand.ink },
      { id: 'l4', kind: 'body',   text: 'baz.agency', x: 8, y: 88, size: 16, weight: 500, align: 'left', color: brand.ink },
    ];
  }
  if (template === 'ad-story') {
    return [
      { id: 'l1', kind: 'badge',  text: 'AI OVERVIEW', x: 8, y: 6, size: 18, weight: 500, align: 'left', color: brand.accent },
      { id: 'l2', kind: 'heading',text: 'Win the\nsearch\nthat matters.', x: 8, y: 26, size: 78, weight: 600, align: 'left', color: brand.ink },
      { id: 'l3', kind: 'body',   text: 'BAZ · Marketing Agency', x: 8, y: 90, size: 18, weight: 500, align: 'left', color: brand.ink },
    ];
  }
  if (template === 'quote-card') {
    return [
      { id: 'l1', kind: 'heading',text: '"BAZ moved the needle in the first 30 days — and told us when our targets were unrealistic."', x: 8, y: 18, size: 44, weight: 500, align: 'left', color: brand.ink },
      { id: 'l2', kind: 'sub',    text: 'Margaret H., Head of Marketing, Northwind', x: 8, y: 80, size: 20, weight: 400, align: 'left', color: brand.ink },
    ];
  }
  // banner-wide
  return [
    { id: 'l1', kind: 'badge',   text: 'BAZ · 2026', x: 4, y: 20, size: 16, weight: 500, align: 'left', color: brand.accent },
    { id: 'l2', kind: 'heading', text: 'Make growth predictable.', x: 4, y: 42, size: 64, weight: 600, align: 'left', color: '#ffffff' },
    { id: 'l3', kind: 'body',    text: 'baz.agency', x: 4, y: 78, size: 16, weight: 500, align: 'left', color: '#ffffff' },
  ];
};

const bgFor = (template: TemplateId, brand: BrandKit): string => {
  if (template === 'og-card')     return `linear-gradient(135deg, ${brand.paper} 0%, #ffffff 100%)`;
  if (template === 'case-cover')  return `linear-gradient(135deg, ${brand.ink} 0%, #1a1a1f 60%, ${brand.accent} 130%)`;
  if (template === 'ad-square')   return `linear-gradient(180deg, ${brand.secondary} 0%, ${brand.paper} 100%)`;
  if (template === 'ad-story')    return `linear-gradient(160deg, ${brand.paper} 0%, ${brand.secondary} 100%)`;
  if (template === 'quote-card')  return `linear-gradient(135deg, ${brand.accent} 0%, #ff6b5e 100%)`;
  return `linear-gradient(90deg, ${brand.ink} 0%, ${brand.accent} 130%)`;
};

const ratioStyle = (t: TemplateId) => {
  const tmpl = templates.find((x) => x.id === t)!;
  return { aspectRatio: `${tmpl.w} / ${tmpl.h}` };
};

export default function CanvaPage() {
  const [template, setTemplate] = useState<TemplateId>('og-card');
  const [brand, setBrand] = useState<BrandKit>(defaultBrand);
  const [layers, setLayers] = useState<Layer[]>(() => seedLayers('og-card', defaultBrand));
  const [selected, setSelected] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLayers(seedLayers(template, brand));
    setSelected(null);
  }, [template, brand]);

  const tmpl = templates.find((t) => t.id === template)!;
  const sel = layers.find((l) => l.id === selected);

  const updateLayer = (id: string, patch: Partial<Layer>) => {
    setLayers((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };
  const addLayer = () => {
    const id = `l${Date.now().toString(36)}`;
    setLayers((ls) => [...ls, { id, kind: 'body', text: 'New text', x: 10, y: 50, size: 24, weight: 500, align: 'left', color: brand.ink }]);
    setSelected(id);
  };
  const deleteLayer = (id: string) => {
    setLayers((ls) => ls.filter((l) => l.id !== id));
    if (selected === id) setSelected(null);
  };

  const exportPng = async () => {
    const stage = stageRef.current;
    if (!stage) return;
    // Use html-to-image dynamically (already in deps? if not, use SVG fallback)
    try {
      const mod = await import('html-to-image').catch(() => null as any);
      if (mod) {
        const dataUrl = await mod.toPng(stage, { pixelRatio: 2, cacheBust: true });
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${template}-${Date.now()}.png`;
        a.click();
        return;
      }
    } catch {/* fall through */}

    // Fallback: SVG export
    const svg = renderSvg(tmpl.w, tmpl.h, bgFor(template, brand), layers, brand);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template}-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportSvg = () => {
    const svg = renderSvg(tmpl.w, tmpl.h, bgFor(template, brand), layers, brand);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template}-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto py-10 md:py-16">
      <header className="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-2">BAZ Canva · /admin/canva</p>
          <h1 className="font-display text-display-xl font-medium tracking-[-0.035em]">Design assets, in-house.</h1>
          <p className="mt-3 text-ink-600 max-w-xl">
            Generate OG cards, case covers, ads, and quotes with your brand kit. No third-party tool. Export PNG or SVG.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="md" onClick={exportSvg} trackAs="canva_export_svg">Export SVG</Button>
          <Magnetic strength={0.25}>
            <Button variant="primary" size="md" onClick={exportPng} trackAs="canva_export_png">Export PNG →</Button>
          </Magnetic>
        </div>
      </header>

      <div className="grid lg:grid-cols-[260px_1fr_280px] gap-6">
        {/* Templates */}
        <aside className="rounded-2xl border border-ink-100 bg-paper p-3">
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 px-2 pb-2">Templates</p>
          <ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {templates.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setTemplate(t.id)}
                  aria-pressed={template === t.id}
                  className={`w-full text-left rounded-xl p-3 border transition-colors ${template === t.id ? 'border-ink-900 bg-white' : 'border-ink-100 hover:border-ink-300 bg-white'}`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium text-sm">{t.name}</span>
                    <span className="font-mono text-[10px] text-ink-400">{t.w}×{t.h}</span>
                  </div>
                  <p className="text-xs text-ink-500 mt-0.5">{t.desc}</p>
                </button>
              </li>
            ))}
          </ul>

          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 px-2 pt-6 pb-2">Brand kit</p>
          <div className="space-y-2 px-2">
            <Field label="Primary" type="color" value={brand.primary} onChange={(v) => setBrand({ ...brand, primary: v })} />
            <Field label="Accent"  type="color" value={brand.accent}  onChange={(v) => setBrand({ ...brand, accent: v })} />
            <Field label="Paper"   type="color" value={brand.paper}   onChange={(v) => setBrand({ ...brand, paper: v })} />
            <Field label="Ink"     type="color" value={brand.ink}     onChange={(v) => setBrand({ ...brand, ink: v })} />
            <Field label="Display font" type="text" value={brand.displayFont} onChange={(v) => setBrand({ ...brand, displayFont: v })} />
          </div>
        </aside>

        {/* Stage */}
        <div className="rounded-2xl border border-ink-100 bg-paper-300 p-4 md:p-8">
          <div
            ref={stageRef}
            className="relative w-full max-w-3xl mx-auto rounded-2xl shadow-lift overflow-hidden select-none"
            style={{ ...ratioStyle(template), background: bgFor(template, brand) }}
            onClick={() => setSelected(null)}
          >
            {layers.map((l) => (
              <div
                key={l.id}
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); setSelected(l.id); }}
                className={`absolute cursor-move ${selected === l.id ? 'outline outline-2 outline-offset-2 outline-accent' : ''}`}
                style={{
                  left: `${l.x}%`, top: `${l.y}%`,
                  transform: 'translate(0,0)',
                  fontFamily: l.kind === 'heading' || l.kind === 'badge' ? brand.displayFont : brand.bodyFont,
                  fontSize: `${l.size}px`,
                  fontWeight: l.weight,
                  color: l.color,
                  textAlign: l.align,
                  lineHeight: 1.05,
                  letterSpacing: l.kind === 'heading' ? '-0.025em' : l.kind === 'badge' ? '0.18em' : 'normal',
                  whiteSpace: 'pre-line',
                  maxWidth: '88%',
                }}
              >
                {l.kind === 'badge' ? <span style={{ textTransform: 'uppercase', fontSize: l.size }}>{l.text}</span> : l.text}
              </div>
            ))}
          </div>
          <p className="text-center mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
            {tmpl.w} × {tmpl.h} · click a layer to edit
          </p>
        </div>

        {/* Inspector */}
        <aside className="rounded-2xl border border-ink-100 bg-paper p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400">Layers</p>
            <button type="button" onClick={addLayer} className="text-xs font-medium px-3 py-1.5 rounded-full bg-ink-900 text-paper hover:bg-ink-800">+ Add</button>
          </div>
          <ul className="space-y-1.5 mb-4">
            {layers.map((l) => (
              <li key={l.id} className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm border ${selected === l.id ? 'border-accent bg-white' : 'border-ink-100 bg-white'}`}>
                <button type="button" onClick={() => setSelected(l.id)} className="flex-1 text-left truncate">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400 mr-2">{l.kind}</span>
                  <span className="truncate align-middle">{l.text.split('\n')[0]}</span>
                </button>
                <button type="button" aria-label="Delete layer" onClick={() => deleteLayer(l.id)} className="ml-2 text-ink-400 hover:text-accent">×</button>
              </li>
            ))}
          </ul>

          {sel && (
            <div className="space-y-3 border-t border-ink-100 pt-4">
              <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400">Edit layer</p>
              <label className="block">
                <span className="block text-xs font-medium mb-1">Text</span>
                <textarea
                  rows={3}
                  value={sel.text}
                  onChange={(e) => updateLayer(sel.id, { text: e.target.value })}
                  className="w-full rounded-xl bg-white border border-ink-200 px-3 py-2 text-sm focus:outline-none focus:border-accent resize-y"
                />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <NumField label="Size"   value={sel.size}   onChange={(v) => updateLayer(sel.id, { size: v })} />
                <NumField label="Weight" value={sel.weight} onChange={(v) => updateLayer(sel.id, { weight: v })} />
                <NumField label="X %"    value={sel.x}      onChange={(v) => updateLayer(sel.id, { x: v })} />
                <NumField label="Y %"    value={sel.y}      onChange={(v) => updateLayer(sel.id, { y: v })} />
              </div>
              <label className="block">
                <span className="block text-xs font-medium mb-1">Color</span>
                <input
                  type="color"
                  value={normalizeColor(sel.color)}
                  onChange={(e) => updateLayer(sel.id, { color: e.target.value })}
                  className="w-full h-9 rounded-lg border border-ink-200 bg-white"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-medium mb-1">Align</span>
                <select
                  value={sel.align}
                  onChange={(e) => updateLayer(sel.id, { align: e.target.value as Layer['align'] })}
                  className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </label>
            </div>
          )}

          {!sel && (
            <p className="text-xs text-ink-500 border-t border-ink-100 pt-4">
              Click any layer on the canvas to edit it, or add a new one. Use the brand kit on the left to set colors and fonts across all templates.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange }: { label: string; type: 'color' | 'text'; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="w-20 text-ink-500 font-mono uppercase tracking-[0.14em] text-[10px]">{label}</span>
      {type === 'color' ? (
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-10 h-7 rounded border border-ink-200 bg-white" />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 rounded border border-ink-200 bg-white px-2 py-1 text-xs" />
      )}
    </label>
  );
}

function NumField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium mb-1">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-sm"
      />
    </label>
  );
}

function normalizeColor(c: string) {
  // Strip alpha, return 6-digit hex for <input type="color">
  if (c.startsWith('#') && (c.length === 7 || c.length === 4)) return c.length === 4 ? '#' + [...c.slice(1)].map((ch) => ch + ch).join('') : c;
  if (c.startsWith('rgb')) return '#000000';
  return '#000000';
}

function renderSvg(w: number, h: number, bg: string, layers: Layer[], brand: BrandKit) {
  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const layerXml = layers.map((l) => {
    const x = (l.x / 100) * w;
    const y = (l.y / 100) * h;
    const anchor = l.align === 'center' ? 'middle' : l.align === 'right' ? 'end' : 'start';
    const tx = l.align === 'center' ? x : l.align === 'right' ? x : x;
    return `<text x="${tx}" y="${y + l.size}" fill="${l.color}" font-family="${l.kind === 'heading' || l.kind === 'badge' ? brand.displayFont : brand.bodyFont}" font-size="${l.size}" font-weight="${l.weight}" text-anchor="${anchor}" letter-spacing="${l.kind === 'badge' ? '2' : l.kind === 'heading' ? '-1' : '0'}">${escape(l.text).replace(/\n/g, `</text><text x="${tx}" y="${y + l.size * 2.1}" fill="${l.color}" font-family="${l.kind === 'heading' || l.kind === 'badge' ? brand.displayFont : brand.bodyFont}" font-size="${l.size}" font-weight="${l.weight}" text-anchor="${anchor}">`)}</text>`;
  }).join('\n');
  // Note: simple background (solid color or linear gradient as rect)
  const bgRect = bg.startsWith('linear-gradient')
    ? `<rect width="${w}" height="${h}" fill="${brand.paper}"/>` // SVG can't easily mirror CSS gradient; degrade to solid
    : `<rect width="${w}" height="${h}" fill="${bg}"/>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
${bgRect}
${layerXml}
</svg>`;
}
