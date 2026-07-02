// @ts-nocheck
/**
 * Marketing analytics primitives — pure TypeScript, no runtime deps.
 *
 * These port the methodology from the Digital Marketing Analytics
 * coursework (AdStock, Attribution, RFM, Budget Optimization) into
 * browser-native math so the BAZ admin tools run anywhere without a
 * Python runtime.
 *
 * Each function is documented with its input/output contract so the
 * UI layer can wire interactive controls with confidence.
 */

// ============================================================
// Attribution modeling
// ============================================================

export type AttributionModel =
  "first-touch" | "last-touch" | "linear" | "time-decay" | "position-based" | "data-driven";

export interface Touchpoint {
  /** ISO timestamp of the touch */
  t: string;
  /** Channel that drove this touch (paid, organic, email, social, direct, referral) */
  channel: string;
}

export interface Journey {
  id: string;
  touchpoints: Touchpoint[];
  /** Did this journey convert? */
  converted: boolean;
  /** Revenue if converted, else 0 */
  revenue: number;
}

/**
 * Attribute the conversion credit across a journey's touchpoints
 * according to the chosen model. Returns an array of weights summing
 * to 1.0 for the journey (0 if no touchpoints).
 */
export function attributeJourney(j: Journey, model: AttributionModel): Record<string, number> {
  const n = j.touchpoints.length;
  if (n === 0) return {};
  if (!j.converted) {
    // Non-converting journeys still count for data-driven and for path analysis;
    // for single-touch models we return 0.
    if (model === "data-driven") return shapleyLikeWeights(j);
    return {};
  }

  const weights: number[] = new Array(n).fill(0);

  switch (model) {
    case "first-touch":
      weights[0] = 1;
      break;
    case "last-touch":
      weights[n - 1] = 1;
      break;
    case "linear":
      for (let i = 0; i < n; i++) weights[i] = 1 / n;
      break;
    case "time-decay":
      // Exponential decay, half-life 7 days
      const now = Date.parse(j.touchpoints[n - 1].t);
      const halflife = 7 * 86400_000;
      const ws = j.touchpoints.map((tp) => Math.pow(0.5, (now - Date.parse(tp.t)) / halflife));
      const sum = ws.reduce((a, b) => a + b, 0);
      for (let i = 0; i < n; i++) weights[i] = ws[i] / sum;
      break;
    case "position-based":
      // 40% first, 40% last, 20% spread across middle
      if (n === 1) weights[0] = 1;
      else if (n === 2) {
        weights[0] = 0.5;
        weights[1] = 0.5;
      } else {
        weights[0] = 0.4;
        weights[n - 1] = 0.4;
        const mid = 0.2 / (n - 2);
        for (let i = 1; i < n - 1; i++) weights[i] = mid;
      }
      break;
    case "data-driven":
      // Shapley-value approximation: average marginal contribution
      // across all permutations of the touchpoint set. Capped at
      // 8! permutations for performance; sampled if longer.
      return shapleyLikeWeights(j);
  }

  const result: Record<string, number> = {};
  j.touchpoints.forEach((tp, i) => {
    result[tp.channel] = (result[tp.channel] || 0) + weights[i];
  });
  return result;
}

/**
 * Approximate Shapley values by sampling permutations. For 8+
 * touchpoints we use Monte Carlo (256 permutations) rather than
 * exact (n!).
 */
function shapleyLikeWeights(j: Journey): Record<string, number> {
  const tps = j.touchpoints;
  const n = tps.length;
  if (n === 0) return {};

  const allPerms = n <= 8 ? permutations(tps) : samplePermutations(tps, 256);

  // Marginal value of adding touchpoint i to set S.
  // Simple proxy: presence probability × recency × position-weighted.
  const value = (path: Touchpoint[]) => {
    if (!j.converted) return 0;
    // Each touchpoint contributes; later touchpoints contribute more
    // because they're closer to conversion.
    return path.reduce((acc, _tp, idx) => acc + 1 / (idx + 1), 0);
  };

  const marginal = new Map<string, number>();
  for (const tp of tps) marginal.set(tp.channel, 0);

  for (const perm of allPerms) {
    let prev = 0;
    const seen = new Set<string>();
    for (let i = 0; i < perm.length; i++) {
      const ch = perm[i].channel;
      if (seen.has(ch)) continue;
      const v = value(perm.slice(0, i + 1));
      marginal.set(ch, (marginal.get(ch) || 0) + (v - prev));
      seen.add(ch);
      prev = v;
    }
  }

  const result: Record<string, number> = {};
  let total = 0;
  for (const [ch, w] of marginal) {
    result[ch] = w / allPerms.length;
    total += result[ch];
  }
  // Normalize
  if (total > 0) for (const ch in result) result[ch] /= total;
  return result;
}

function permutations<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const p of permutations(rest)) result.push([arr[i], ...p]);
  }
  return result;
}

function samplePermutations<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < n; i++) {
    const copy = [...arr];
    for (let j = copy.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [copy[j], copy[k]] = [copy[k], copy[j]];
    }
    out.push(copy);
  }
  return out;
}

/**
 * Aggregate attribution across many journeys.
 */
export function attributeAll(
  journeys: Journey[],
  model: AttributionModel,
): {
  byChannel: Record<string, { credit: number; conversions: number; revenue: number }>;
  journeys: number;
  conversions: number;
} {
  const byChannel: Record<string, { credit: number; conversions: number; revenue: number }> = {};
  let conversions = 0;
  for (const j of journeys) {
    if (j.converted) conversions++;
    const w = attributeJourney(j, model);
    for (const ch in w) {
      if (!byChannel[ch]) byChannel[ch] = { credit: 0, conversions: 0, revenue: 0 };
      byChannel[ch].credit += w[ch];
      if (j.converted) {
        byChannel[ch].conversions += w[ch]; // fractional conversion
        byChannel[ch].revenue += w[ch] * j.revenue;
      }
    }
  }
  return { byChannel, journeys: journeys.length, conversions };
}

// ============================================================
// AdStock (media carryover)
// ============================================================

export interface AdStockParams {
  /** Retention rate 0..1 (typical: 0.5 for TV, 0.3 for paid search) */
  retention: number;
  /** Maximum carryover periods */
  maxLag: number;
}

export interface AdStockResult {
  /** adstock values aligned to spend[] */
  values: number[];
  /** effective reach: adstock / max(adstock) */
  reachPct: number[];
  /** peak adstock and which period it occurred */
  peak: { value: number; index: number };
  /** total carryover (sum of post-period-0 values) */
  totalCarryover: number;
  /** half-life in periods */
  halfLife: number;
}

/**
 * Geometric AdStock: classic from the coursework. Each period's
 * adstock = spend + retention * prior adstock, with a lag cap.
 */
export function adstock(spend: number[], params: AdStockParams): AdStockResult {
  const { retention, maxLag } = params;
  const values: number[] = [];
  for (let t = 0; t < spend.length; t++) {
    let carry = 0;
    for (let lag = 1; lag <= maxLag; lag++) {
      const src = t - lag;
      if (src < 0) break;
      carry += Math.pow(retention, lag) * spend[src];
    }
    values.push(spend[t] + carry);
  }
  const peak = values.reduce((p, v, i) => (v > p.value ? { value: v, index: i } : p), {
    value: -Infinity,
    index: 0,
  });
  const totalCarryover = values.reduce((s, v, i) => s + (i === 0 ? 0 : v - spend[i]), 0);
  const halfLife = retention > 0 ? Math.log(0.5) / Math.log(retention) : 0;
  const max = Math.max(...values, 1);
  const reachPct = values.map((v) => (v / max) * 100);
  return { values, reachPct, peak, totalCarryover, halfLife };
}

/**
 * Hill / saturation curve: maps adstock → response with diminishing returns.
 *   response = alpha * adstock^gamma / (adstock^gamma + kappa^gamma)
 */
export function hillResponse(adstockValue: number, alpha = 1, kappa = 1, gamma = 1): number {
  const aG = Math.pow(adstockValue, gamma);
  const kG = Math.pow(kappa, gamma);
  return alpha * (aG / (aG + kG));
}

// ============================================================
// RFM (Recency, Frequency, Monetary)
// ============================================================

export interface RfmRecord {
  customerId: string;
  /** Last purchase date as ISO string */
  lastPurchase: string;
  /** Number of purchases */
  frequency: number;
  /** Lifetime spend */
  monetary: number;
}

export type Segment =
  | "Champions"
  | "Loyal"
  | "Potential Loyalist"
  | "Recent"
  | "Promising"
  | "Needs Attention"
  | "About to Sleep"
  | "At Risk"
  | "Cant Lose Them"
  | "Hibernating";

export interface RfmScored extends RfmRecord {
  R: number;
  F: number;
  M: number;
  score: number;
  segment: Segment;
}

const SEGMENT_MATRIX: Array<{
  r: [number, number];
  f: [number, number];
  m: [number, number];
  segment: Segment;
}> = [
  { r: [4, 5], f: [4, 5], m: [4, 5], segment: "Champions" },
  { r: [3, 5], f: [3, 5], m: [3, 5], segment: "Loyal" },
  { r: [4, 5], f: [0, 2], m: [0, 5], segment: "Recent" },
  { r: [3, 4], f: [1, 3], m: [1, 3], segment: "Potential Loyalist" },
  { r: [3, 4], f: [0, 1], m: [0, 2], segment: "Promising" },
  { r: [2, 3], f: [2, 3], m: [2, 3], segment: "Needs Attention" },
  { r: [2, 3], f: [0, 2], m: [0, 2], segment: "About to Sleep" },
  { r: [1, 2], f: [3, 5], m: [3, 5], segment: "At Risk" },
  { r: [0, 1], f: [4, 5], m: [4, 5], segment: "Cant Lose Them" },
  { r: [0, 2], f: [0, 2], m: [0, 2], segment: "Hibernating" },
];

function bucket(value: number, sortedUnique: number[]): number {
  // 5-bucket score (1..5, where 5 is best for R; for F/M high = best)
  const idx = sortedUnique.findIndex((v) => value <= v);
  // Map to 1..5: positions 0..4 of quintiles
  const q = Math.min(4, Math.max(0, idx === -1 ? 4 : idx));
  return 5 - q; // higher bucket = better
}

/**
 * Score a list of customers on R/F/M (1-5 each, higher = better).
 * Uses quintile bucketing against the population.
 */
export function rfmScore(records: RfmRecord[], asOf?: Date): RfmScored[] {
  const now = asOf ?? new Date();

  // Compute R (days since last purchase, lower = better)
  const recencies = records.map((r) =>
    Math.max(0, (now.getTime() - Date.parse(r.lastPurchase)) / 86400_000),
  );
  const freqs = records.map((r) => r.frequency);
  const mons = records.map((r) => r.monetary);

  const quantize = (arr: number[], reverse = false): number[] => {
    const sorted = [...arr].sort((a, b) => a - b);
    const n = sorted.length;
    const cut = (q: number) => sorted[Math.min(n - 1, Math.floor(q * n))];
    const q1 = cut(0.2),
      q2 = cut(0.4),
      q3 = cut(0.6),
      q4 = cut(0.8);
    return arr.map((v) => {
      let bucket = 1;
      if (v <= q1) bucket = 1;
      else if (v <= q2) bucket = 2;
      else if (v <= q3) bucket = 3;
      else if (v <= q4) bucket = 4;
      else bucket = 5;
      return reverse ? 6 - bucket : bucket;
    });
  };

  // Recency: lower days = better → reverse
  const R = quantize(recencies, true);
  // Frequency / Monetary: higher = better
  const F = quantize(freqs);
  const M = quantize(mons);

  return records.map((r, i) => {
    const rScore = R[i],
      fScore = F[i],
      mScore = M[i];
    let segment: Segment = "Hibernating";
    for (const row of SEGMENT_MATRIX) {
      if (
        rScore >= row.r[0] &&
        rScore <= row.r[1] &&
        fScore >= row.f[0] &&
        fScore <= row.f[1] &&
        mScore >= row.m[0] &&
        mScore <= row.m[1]
      ) {
        segment = row.segment;
        break;
      }
    }
    return { ...r, R: rScore, F: fScore, M: mScore, score: rScore + fScore + mScore, segment };
  });
}

export function rfmSummary(
  scored: RfmScored[],
): Array<{ segment: Segment; count: number; revenue: number }> {
  const m = new Map<Segment, { count: number; revenue: number }>();
  for (const r of scored) {
    if (!m.has(r.segment)) m.set(r.segment, { count: 0, revenue: 0 });
    const e = m.get(r.segment)!;
    e.count += 1;
    e.revenue += r.monetary;
  }
  return [...m.entries()]
    .map(([segment, v]) => ({ segment, count: v.count, revenue: v.revenue }))
    .sort((a, b) => b.revenue - a.revenue);
}

// ============================================================
// Budget optimization (diminishing returns / marginal CAC)
// ============================================================

export interface ChannelDiminishingReturns {
  /** Channel name */
  channel: string;
  /** Current spend per week */
  spend: number;
  /** Current conversions per week */
  conversions: number;
  /** Hill-saturation scale (current spend produces ~50% of max conversions) */
  halfSaturation: number;
  /** Maximum conversions per week at infinite spend */
  maxConversions: number;
}

export interface ReallocationResult {
  channel: string;
  current: number;
  recommended: number;
  delta: number;
  newConversions: number;
}

/**
 * Hill curve: conversions = maxConv * spend / (spend + halfSat).
 * Returns conversions for a given spend.
 */
export function hillConversions(spend: number, maxConv: number, halfSat: number): number {
  return maxConv * (spend / (spend + halfSat));
}

/**
 * Marginal CAC: cost of producing one more conversion at spend s.
 * Derivative of inverted Hill curve: dC/dConv.
 */
export function marginalCac(spend: number, maxConv: number, halfSat: number): number {
  // From Hill: C = maxConv * s / (s + halfSat)
  // Inverse: s = halfSat * conv / (maxConv - conv)
  // ds/dc = halfSat * maxConv / (maxConv - conv)^2
  // Then CAC = ds/dc
  const eps = 0.001;
  const c = hillConversions(spend, maxConv, halfSat);
  const c2 = hillConversions(spend + eps, maxConv, halfSat);
  return eps / (c2 - c);
}

/**
 * Given a total budget and a list of channels with diminishing-returns
 * curves, redistribute spend greedily toward highest marginal return
 * until budget is exhausted.
 */
export function optimizeBudget(
  totalBudget: number,
  channels: ChannelDiminishingReturns[],
): ReallocationResult[] {
  const minSpendPerChannel = 100; // never go below $100/wk
  const remaining = channels.reduce((s, c) => s + c.spend, 0);
  // Free up any budget that exceeds the cap
  const overshoot = Math.max(0, remaining - totalBudget);

  // Initialize with current spends
  const spends = channels.map((c) => Math.max(minSpendPerChannel, c.spend));
  let free = spends.reduce((a, b) => a + b, 0);

  // Pull from channels with highest marginal CAC first (least efficient)
  if (overshoot > 0) {
    const indexed = channels
      .map((c, i) => ({ i, cac: marginalCac(spends[i], c.maxConversions, c.halfSaturation) }))
      .sort((a, b) => b.cac - a.cac);
    for (const { i } of indexed) {
      if (free - overshoot < minSpendPerChannel) break;
      const take = Math.min(
        spends[i] - minSpendPerChannel,
        free - overshoot - minSpendPerChannel * (channels.length - 1),
      );
      if (take <= 0) continue;
      spends[i] -= take;
      free -= take;
      if (free === 0 || free === minSpendPerChannel * channels.length) break;
    }
  }

  // Greedily add to channels with lowest marginal CAC until budget exhausted
  const ITER = 80;
  for (let it = 0; it < ITER; it++) {
    const best = channels
      .map((c, i) => ({ i, cac: marginalCac(spends[i] + 100, c.maxConversions, c.halfSaturation) }))
      .sort((a, b) => a.cac - b.cac)[0];
    const step = Math.min(100, Math.max(0, totalBudget - free));
    if (step === 0) break;
    spends[best.i] += step;
    free += step;
  }

  return channels.map((c, i) => ({
    channel: c.channel,
    current: c.spend,
    recommended: Math.round(spends[i]),
    delta: Math.round(spends[i] - c.spend),
    newConversions: Math.round(hillConversions(spends[i], c.maxConversions, c.halfSaturation)),
  }));
}

// ============================================================
// Sample data generators (so the UI is interactive without uploads)
// ============================================================

/**
 * Synthesize a realistic journey dataset. Returns 100 journeys across
 * 6 channels with realistic time gaps.
 */
export function sampleJourneys(seed = 42, n = 120): Journey[] {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };

  const channels = ["paid-search", "paid-social", "organic", "email", "direct", "referral"];
  const journeys: Journey[] = [];
  const start = Date.now() - 90 * 86400_000;

  for (let i = 0; i < n; i++) {
    const converted = rand() < 0.32;
    const touchCount = Math.max(1, Math.floor(rand() * 5) + 1);
    const touchpoints: Touchpoint[] = [];
    for (let t = 0; t < touchCount; t++) {
      const ch = channels[Math.floor(rand() * channels.length)];
      const ts = new Date(
        start + Math.floor(rand() * 80 * 86400_000) + t * 86400_000 * Math.floor(rand() * 14),
      ).toISOString();
      touchpoints.push({ t: ts, channel: ch });
    }
    touchpoints.sort((a, b) => Date.parse(a.t) - Date.parse(b.t));
    const revenue = converted ? Math.round(50 + rand() * 450) : 0;
    journeys.push({ id: `j_${i.toString().padStart(4, "0")}`, touchpoints, converted, revenue });
  }
  return journeys;
}

/**
 * Synthesize 16 weeks of weekly spend for a single channel.
 */
export function sampleSpend(seed = 7, mean = 5000, vol = 0.4): number[] {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  return Array.from({ length: 16 }, () =>
    Math.round(mean * (0.6 + rand() * 0.8) * (1 + (rand() - 0.5) * vol)),
  );
}

/**
 * Synthesize an RFM dataset (60 customers, last 12 months).
 */
export function sampleRfm(seed = 99, n = 60): RfmRecord[] {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  const now = Date.now();
  return Array.from({ length: n }, (_, i) => ({
    customerId: `c_${i.toString().padStart(4, "0")}`,
    lastPurchase: new Date(now - Math.floor(rand() * 365 * 86400_000)).toISOString(),
    frequency: Math.max(1, Math.floor(rand() * 12) + 1),
    monetary: Math.round(50 + rand() * 2500),
  }));
}

/**
 * Synthesize channel-level diminishing-returns inputs.
 */
export function sampleChannels(seed = 21): ChannelDiminishingReturns[] {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  return [
    {
      channel: "Paid Search",
      spend: 8000,
      conversions: 240,
      halfSaturation: 12000,
      maxConversions: 800,
    },
    {
      channel: "Paid Social",
      spend: 6000,
      conversions: 150,
      halfSaturation: 9000,
      maxConversions: 600,
    },
    {
      channel: "SEO/Content",
      spend: 4000,
      conversions: 90,
      halfSaturation: 6000,
      maxConversions: 400,
    },
    {
      channel: "Email/Lifecycle",
      spend: 1500,
      conversions: 110,
      halfSaturation: 2000,
      maxConversions: 350,
    },
    {
      channel: "Affiliate",
      spend: 3000,
      conversions: 70,
      halfSaturation: 5000,
      maxConversions: 300,
    },
  ];
}

// ============================================================
// Number / chart helpers
// ============================================================

export function formatNumber(n: number, opts: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat("en-US", opts).format(n);
}

export function formatUsd(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${Math.round(n)}`;
}

export function csvEscape(v: string | number): string {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function downloadCsv(filename: string, rows: (string | number)[][]): void {
  const body = rows.map((r) => r.map(csvEscape).join(",")).join("\n");
  const blob = new Blob([body], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Parse a pasted CSV with at minimum: customerId, lastPurchase, frequency, monetary */
export function parseRfmCsv(text: string): RfmRecord[] {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idx = {
    id: headers.findIndex((h) => /^(customer[_\s-]?id|cid|id)$/.test(h)),
    date: headers.findIndex((h) => /last[_\s-]?purchase|date/.test(h)),
    freq: headers.findIndex((h) => /frequency|orders/.test(h)),
    money: headers.findIndex((h) => /monetary|revenue|spend/.test(h)),
  };
  if (idx.id === -1 || idx.date === -1 || idx.freq === -1 || idx.money === -1) {
    throw new Error("CSV needs columns: customerId, lastPurchase, frequency, monetary");
  }
  return lines
    .slice(1)
    .map((line) => {
      const cells = line.split(",").map((c) => c.trim());
      return {
        customerId: cells[idx.id],
        lastPurchase: new Date(cells[idx.date]).toISOString(),
        frequency: Number(cells[idx.freq]),
        monetary: Number(cells[idx.money]),
      };
    })
    .filter((r) => r.customerId && !Number.isNaN(r.frequency) && !Number.isNaN(r.monetary));
}
