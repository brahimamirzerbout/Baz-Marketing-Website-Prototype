'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  EDGES,
  GRAPH_VIEWBOX,
  NODES,
  RING_LABELS,
  layoutNodes,
  type NodeId,
} from './graph-data';

const RING_STROKE: Record<'acquisition' | 'delivery' | 'outcomes', string> = {
  acquisition: 'rgba(120, 120, 140, 0.18)',
  delivery:    'rgba(120, 120, 140, 0.28)',
  outcomes:    'rgba(255, 59, 47, 0.30)',
};

const NODE_FILL: Record<'acquisition' | 'delivery' | 'outcomes', string> = {
  acquisition: 'hsl(0 0% 100% / 0.04)',
  delivery:    'hsl(0 0% 100% / 0.06)',
  outcomes:    'hsl(0 0% 100% / 0.10)',
};

const NODE_STROKE_DEFAULT = 'rgba(120, 120, 140, 0.45)';
const NODE_STROKE_FOCUS   = 'rgb(255, 59, 47)';
const NODE_TEXT          = 'rgb(245, 245, 242)';
const NODE_TEXT_DIM      = 'rgba(245, 245, 242, 0.55)';
const EDGE_STROKE        = 'rgba(245, 245, 242, 0.22)';
const EDGE_STROKE_FOCUS  = 'rgb(255, 59, 47)';

const W = GRAPH_VIEWBOX.width;
const H = GRAPH_VIEWBOX.height;
const CENTER = GRAPH_VIEWBOX.center;

interface AgencyGraphProps {
  /** Optional override text shown in the corner of the card. */
  caption?: string;
}

/**
 * The Obsidian-style agency graph.
 *
 * Rendered as inline SVG so it's crisp, accessible, and animatable with
 * CSS without a canvas redraw on every hover. State lives in this
 * component only — the dashboard renders the graph alongside the leads
 * inbox without coupling.
 */
export function AgencyGraph({ caption }: AgencyGraphProps) {
  const positioned = useMemo(() => layoutNodes(), []);
  const byId = useMemo(
    () => new Map(positioned.map((n) => [n.id, n])),
    [positioned]
  );

  const [focus, setFocus] = useState<NodeId | null>(null);

  const isFocused = (id: NodeId) => focus === null || focus === id;
  const isNeighborOfFocus = (id: NodeId) => {
    if (!focus) return true;
    if (focus === id) return true;
    return EDGES.some(
      (e) =>
        (e.source === focus && e.target === id) ||
        (e.target === focus && e.source === id)
    );
  };

  const focusNode = focus ? byId.get(focus) : null;

  return (
    <div className="rounded-2xl border border-ink-100 bg-card overflow-hidden">
      {/* Header strip */}
      <div className="flex items-baseline justify-between px-5 py-4 border-b border-ink-100">
        <div>
          <h3 className="font-display text-lg font-medium tracking-[-0.01em]">
            Agency Graph
          </h3>
          <p className="text-xs text-ink-500 mt-0.5">
            How BAZ operates. Hover to highlight. Click a node to focus.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-ink-500 font-mono">
          <Legend label="Acquire" color={RING_STROKE.acquisition} />
          <Legend label="Deliver" color={RING_STROKE.delivery} />
          <Legend label="Outcome" color={RING_STROKE.outcomes} />
        </div>
      </div>

      {/* The graph itself */}
      <div
        className="relative bg-[hsl(240_10%_4%)] cursor-pointer"
        onClick={() => setFocus(null)}
        role="presentation"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          style={{ maxHeight: '560px' }}
          aria-label="Agency operating graph"
        >
          {/* Radial rings */}
          {(['acquisition', 'delivery', 'outcomes'] as const).map((ring) => (
            <circle
              key={ring}
              cx={CENTER.x}
              cy={CENTER.y}
              r={
                ring === 'acquisition' ? 230 : ring === 'delivery' ? 150 : 60
              }
              fill="none"
              stroke={RING_STROKE[ring]}
              strokeWidth={ring === 'outcomes' ? 1.25 : 1}
              strokeDasharray={ring === 'outcomes' ? '0' : '2 4'}
            />
          ))}

          {/* Ring labels, sitting at the right of each ring */}
          {(['acquisition', 'delivery', 'outcomes'] as const).map((ring) => {
            const r =
              ring === 'acquisition' ? 230 : ring === 'delivery' ? 150 : 60;
            return (
              <text
                key={ring}
                x={CENTER.x + r}
                y={CENTER.y - r + 14}
                textAnchor="end"
                className="font-mono"
                style={{
                  fontSize: 9,
                  fill: NODE_TEXT_DIM,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {RING_LABELS[ring]}
              </text>
            );
          })}

          {/* Edges */}
          <g>
            {EDGES.map((edge, i) => {
              const a = byId.get(edge.source);
              const b = byId.get(edge.target);
              if (!a || !b) return null;
              const active = isFocused(edge.source) && isFocused(edge.target);
              return (
                <motion.line
                  key={`${edge.source}-${edge.target}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={active ? EDGE_STROKE_FOCUS : EDGE_STROKE}
                  strokeWidth={active ? 1.5 : 0.8}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.04,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {positioned.map((node, i) => {
              const focused = focus === node.id;
              const dim = !isNeighborOfFocus(node.id);
              const radius = 6 + node.importance * 1.6;
              return (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{
                    opacity: dim ? 0.35 : 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + i * 0.05,
                    ease: 'easeOut',
                  }}
                  style={{ cursor: 'pointer', transformOrigin: `${node.x}px ${node.y}px` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocus(focused ? null : node.id);
                  }}
                >
                  {focused && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius + 10}
                      fill="none"
                      stroke={NODE_STROKE_FOCUS}
                      strokeWidth={1}
                      strokeDasharray="2 3"
                      opacity={0.6}
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius}
                    fill={NODE_FILL[node.ring]}
                    stroke={focused ? NODE_STROKE_FOCUS : NODE_STROKE_DEFAULT}
                    strokeWidth={focused ? 2 : 1.25}
                  />
                  <text
                    x={node.x}
                    y={node.y + radius + 14}
                    textAnchor="middle"
                    style={{
                      fontSize: node.importance >= 8 ? 11 : 10,
                      fontWeight: node.importance >= 8 ? 600 : 500,
                      fill: dim ? NODE_TEXT_DIM : NODE_TEXT,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {node.label}
                  </text>
                </motion.g>
              );
            })}
          </g>
        </svg>

        {/* Focus panel — overlay that shows the focused node's blurb */}
        {focusNode && (
          <div
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm rounded-xl bg-ink-900/95 backdrop-blur border border-ink-100 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <p className="font-display text-base font-medium text-paper">
                {focusNode.label}
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-300">
                {RING_LABELS[focusNode.ring]}
              </span>
            </div>
            <p className="text-sm text-paper-300 leading-relaxed">
              {focusNode.blurb}
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-paper-400 font-mono">
              <span>
                {EDGES.filter(
                  (e) => e.source === focusNode.id || e.target === focusNode.id
                ).length}{' '}
                connections
              </span>
              <span>importance {focusNode.importance}/10</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer strip */}
      <div className="px-5 py-3 border-t border-ink-100 flex items-baseline justify-between text-xs text-ink-500">
        <span>
          {NODES.length} nodes &middot; {EDGES.length} edges
        </span>
        {caption ? <span className="italic">{caption}</span> : null}
      </div>
    </div>
  );
}

function Legend({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}
