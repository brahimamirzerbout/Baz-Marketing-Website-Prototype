// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHI, DURATION, SPACING } from '../styles/aether-design-system';
import { COMPONENT_CHECKLIST, MISSING_COMPONENTS, EXISTING_COMPONENTS, LAYER_ANALYSIS } from '../styles/aether-design-system';

// ═══════════════════════════════════════════════════════════════════
// DESIGN SYSTEM CHECKLIST — Complete audit & component inventory
// ═══════════════════════════════════════════════════════════════════

interface ChecklistProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DesignSystemChecklist({ isOpen, onClose }: ChecklistProps) {
  const [filter, setFilter] = useState<'all' | 'missing' | 'exists'>('all');

  const filtered = useMemo(() => {
    if (filter === 'missing') return MISSING_COMPONENTS;
    if (filter === 'exists') return EXISTING_COMPONENTS;
    return COMPONENT_CHECKLIST;
  }, [filter]);

  const categories = useMemo(() => {
    const cats = new Set(COMPONENT_CHECKLIST.map(c => c.category));
    return Array.from(cats).sort();
  }, []);

  const priorityColor: Record<string, string> = {
    critical: 'var(--aether-danger)',
    high: 'var(--aether-warning)',
    medium: 'var(--aether-info)',
    low: 'var(--aether-text-ghost)',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[34] flex items-center justify-center"
          style={{ background: 'hsla(260, 50%, 0%, 0.610)', backdropFilter: 'blur(8px) saturate(1.618)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1 / PHI, y: 13 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1 / PHI, y: 13 }}
            transition={{ duration: DURATION.normal / 1000, ease: [0.618, 0, 0.618, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="aether-glass rounded-[21px] overflow-hidden flex flex-col"
            style={{ width: '610px', maxWidth: '90vw', maxHeight: '85vh', background: 'var(--aether-gradient-surface)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-[21px] py-[13px]" style={{ borderBottom: '1px solid var(--aether-border-subtle)' }}>
              <div>
                <h2 className="text-[13px] font-bold aether-gradient-text">Aether Design System</h2>
                <span className="text-[8px] uppercase tracking-[0.15em]" style={{ color: 'var(--aether-text-ghost)' }}>
                  Fibonacci × Da Vinci — Mathematical Perfection
                </span>
              </div>
              <button onClick={onClose} className="w-[21px] h-[21px] flex items-center justify-center rounded-[8px] aether-transition-colors"
                style={{ color: 'var(--aether-text-ghost)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--aether-l5)'; e.currentTarget.style.color = 'var(--aether-text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--aether-text-ghost)'; }}
              >✕</button>
            </div>

            {/* Layer Analysis */}
            <div className="px-[21px] py-[13px] grid grid-cols-5 gap-[8px]" style={{ borderBottom: '1px solid var(--aether-border-subtle)' }}>
              {[
                { label: 'Layers', value: LAYER_ANALYSIS.total },
                { label: 'Gradients', value: LAYER_ANALYSIS.gradientLayers },
                { label: 'Blur Levels', value: LAYER_ANALYSIS.blurLayers },
                { label: 'Animations', value: LAYER_ANALYSIS.animationVariants },
                { label: 'Fibonacci R', value: LAYER_ANALYSIS.fibonacciRatios },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.013 }}
                  className="text-center p-[8px] rounded-[8px]"
                  style={{ background: 'var(--aether-l3)', border: '1px solid var(--aether-border-subtle)' }}
                >
                  <div className="text-[21px] font-bold aether-gradient-text">{stat.value}</div>
                  <div className="text-[8px] uppercase tracking-[0.1em] mt-[2px]" style={{ color: 'var(--aether-text-ghost)' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-[5px] px-[21px] py-[8px]" style={{ borderBottom: '1px solid var(--aether-border-subtle)' }}>
              {(['all', 'missing', 'exists'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-[8px] py-[3px] text-[8px] font-bold uppercase tracking-[0.1em] rounded-[8px] aether-transition-colors"
                  style={{
                    background: filter === f ? 'var(--aether-accent-bg, var(--aether-l4))' : 'transparent',
                    color: filter === f ? 'var(--aether-accent, var(--aether-text-primary))' : 'var(--aether-text-ghost)',
                    border: `1px solid ${filter === f ? 'var(--aether-accent-border, var(--aether-border-accent))' : 'var(--aether-border-subtle)'}`,
                  }}
                >
                  {f === 'all' ? `All (${COMPONENT_CHECKLIST.length})` : f === 'missing' ? `Missing (${MISSING_COMPONENTS.length})` : `Exists (${EXISTING_COMPONENTS.length})`}
                </button>
              ))}
            </div>

            {/* Component List */}
            <div className="flex-1 overflow-y-auto p-[13px]">
              <div className="flex flex-col gap-[3px]">
                {filtered.map((comp, i) => (
                  <motion.div
                    key={comp.name}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.005 }}
                    className="flex items-center gap-[8px] px-[8px] py-[5px] rounded-[5px] aether-transition-colors"
                    style={{ background: 'var(--aether-l2)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--aether-l4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--aether-l2)'; }}
                  >
                    <span className="text-[10px] flex-shrink-0" style={{ color: comp.status === 'missing' ? 'var(--aether-danger)' : 'var(--aether-success)' }}>
                      {comp.status === 'missing' ? '✕' : '✓'}
                    </span>
                    <span className="text-[11px] font-medium flex-shrink-0" style={{ color: 'var(--aether-text-primary)' }}>
                      {comp.name}
                    </span>
                    <span className="text-[8px] px-[3px] py-[1px] rounded-[3px] flex-shrink-0" style={{ background: 'var(--aether-l4)', color: 'var(--aether-text-ghost)' }}>
                      {comp.category}
                    </span>
                    <span className="ml-auto text-[8px] uppercase tracking-[0.1em] font-bold flex-shrink-0" style={{ color: priorityColor[comp.priority] }}>
                      {comp.priority}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-[21px] py-[8px] flex items-center justify-between" style={{ borderTop: '1px solid var(--aether-border-subtle)' }}>
              <span className="text-[8px] aether-mono" style={{ color: 'var(--aether-text-ghost)' }}>
                φ = {PHI}… · F = [1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987]
              </span>
              <div className="flex items-center gap-[13px]">
                <span className="text-[8px]" style={{ color: 'var(--aether-success)' }}>✓ {EXISTING_COMPONENTS.length} exist</span>
                <span className="text-[8px]" style={{ color: 'var(--aether-danger)' }}>✕ {MISSING_COMPONENTS.length} missing</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}