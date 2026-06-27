/**
 * The BAZ Agency Graph — the structural map of how the agency operates.
 *
 * Nodes are the things BAZ does / makes / produces.
 * Edges are how they connect — flows of work, attention, or value.
 *
 * Layout is computed once at module load (deterministic from node id).
 * Editing the graph = editing this file. There is no admin UI.
 */

export type NodeId =
  | 'inbound'
  | 'outbound'
  | 'referral-in'
  | 'paid'
  | 'audit'
  | 'strategy'
  | 'execution'
  | 'reporting'
  | 'lead'
  | 'client'
  | 'case-study'
  | 'referral-loop';

export type Ring = 'acquisition' | 'delivery' | 'outcomes';

export interface GraphNode {
  id: NodeId;
  label: string;
  ring: Ring;
  /** 1..10, larger = more central to the agency's daily work. */
  importance: number;
  /** Short, one-line description shown on hover. */
  blurb: string;
}

export interface GraphEdge {
  source: NodeId;
  target: NodeId;
  /** Verb describing the flow direction. */
  label: string;
}

export const RING_LABELS: Record<Ring, string> = {
  acquisition: 'Acquisition',
  delivery: 'Delivery',
  outcomes: 'Outcomes',
};

export const NODES: GraphNode[] = [
  // === ACQUISITION (outer ring) ===
  { id: 'inbound',        label: 'Inbound',        ring: 'acquisition', importance: 7,
    blurb: 'SEO, content, AI search visibility. Long game.' },
  { id: 'outbound',       label: 'Outbound',       ring: 'acquisition', importance: 6,
    blurb: 'Targeted cold outreach. Short game, high leverage.' },
  { id: 'referral-in',    label: 'Referral',       ring: 'acquisition', importance: 9,
    blurb: 'Inbound trust from peers and former clients. Best ROI.' },
  { id: 'paid',           label: 'Paid',           ring: 'acquisition', importance: 4,
    blurb: 'Paid acquisition. Used surgically, not as default.' },

  // === DELIVERY (middle ring) ===
  { id: 'audit',          label: 'Audit',          ring: 'delivery',     importance: 9,
    blurb: 'First 10 days of every engagement. Map the system before changing it.' },
  { id: 'strategy',       label: 'Strategy',       ring: 'delivery',     importance: 8,
    blurb: 'Positioning, pricing, channel mix. The bet.' },
  { id: 'execution',      label: 'Execution',      ring: 'delivery',     importance: 10,
    blurb: 'Where the AI agents and senior partners ship every day.' },
  { id: 'reporting',      label: 'Reporting',      ring: 'delivery',     importance: 7,
    blurb: 'Weekly briefs in the client\u2019s language. Plain English.' },

  // === OUTCOMES (inner ring) ===
  { id: 'lead',           label: 'Lead',           ring: 'outcomes',     importance: 8,
    blurb: 'A real human who filled the contact form. Captured here, in this dashboard.' },
  { id: 'client',         label: 'Client',         ring: 'outcomes',     importance: 10,
    blurb: 'A signed engagement. The only outcome that pays the bills.' },
  { id: 'case-study',     label: 'Case Study',     ring: 'outcomes',     importance: 6,
    blurb: 'A documented win. The unit of social proof for the next lead.' },
  { id: 'referral-loop',  label: 'Referral Loop',  ring: 'outcomes',     importance: 9,
    blurb: 'Happy client \u2192 case study \u2192 referral \u2192 inbound. The compounding engine.' },
];

export const EDGES: GraphEdge[] = [
  // Acquisition \u2192 Leads
  { source: 'inbound',     target: 'lead',     label: 'produces' },
  { source: 'outbound',    target: 'lead',     label: 'produces' },
  { source: 'paid',        target: 'lead',     label: 'produces' },
  { source: 'referral-in', target: 'lead',     label: 'produces' },

  // Lead \u2192 Delivery
  { source: 'lead',        target: 'audit',    label: 'starts with' },

  // Delivery flow
  { source: 'audit',       target: 'strategy', label: 'informs' },
  { source: 'strategy',    target: 'execution', label: 'guides' },
  { source: 'execution',   target: 'reporting', label: 'measured by' },

  // Delivery \u2192 Outcomes
  { source: 'reporting',   target: 'client',   label: 'retains' },
  { source: 'execution',   target: 'client',   label: 'delights' },
  { source: 'audit',       target: 'case-study', label: 'fuels' },

  // The compounding engine
  { source: 'client',      target: 'case-study', label: 'becomes' },
  { source: 'case-study',  target: 'referral-loop', label: 'feeds' },
  { source: 'client',      target: 'referral-loop', label: 'powers' },
  { source: 'referral-loop', target: 'referral-in', label: 'closes' },
];

/**
 * Compute deterministic 2D positions in a polar layout.
 * Acquisition sits on the outer ring, delivery on the middle ring,
 * outcomes in the center. Position is a function of node id and ring
 * only, so it doesn't shift between renders.
 */
export interface PositionedNode extends GraphNode {
  x: number;
  y: number;
}

const W = 800;
const H = 560;
const CENTER = { x: W / 2, y: H / 2 };
const RING_RADIUS: Record<Ring, number> = {
  acquisition: 230,
  delivery:    150,
  outcomes:    60,
};

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 0xffffffff; // 0..1
}

export function layoutNodes(): PositionedNode[] {
  const byRing: Record<Ring, GraphNode[]> = {
    acquisition: [],
    delivery: [],
    outcomes: [],
  };
  for (const n of NODES) byRing[n.ring].push(n);

  const out: PositionedNode[] = [];
  (Object.keys(byRing) as Ring[]).forEach((ring) => {
    const nodes = byRing[ring];
    const r = RING_RADIUS[ring];
    nodes.forEach((node, i) => {
      // Deterministic angular offset based on id, so the same node always
      // sits in the same spot. Spreads nodes around the ring.
      const offset = hash(node.id) * Math.PI * 2;
      const spread = (Math.PI * 2) / Math.max(nodes.length, 1);
      const angle = offset + i * spread * 0.18;
      out.push({
        ...node,
        x: CENTER.x + Math.cos(angle) * r,
        y: CENTER.y + Math.sin(angle) * r,
      });
    });
  });
  return out;
}

export const GRAPH_VIEWBOX = { width: W, height: H, center: CENTER };
