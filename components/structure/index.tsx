// @ts-nocheck
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PHI, SPACING, DURATION, RADIUS } from '../../styles/aether-design-system';

// ═══════════════════════════════════════════════════════════════════
// RESIZER — Fibonacci-grippable pane divider
// Content agnostic: drags in any direction, maintains proportions.
// ═══════════════════════════════════════════════════════════════════

interface ResizerProps {
  orientation: 'horizontal' | 'vertical';
  onResize: (delta: number) => void;
  minSize?: number;
  maxSize?: number;
  currentSize: number;
}

export function Resizer({ orientation, onResize, minSize = 55, maxSize = 987, currentSize }: ResizerProps) {
  const [dragging, setDragging] = useState(false);
  const startPos = useRef(0);
  const startSize = useRef(currentSize);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    startPos.current = orientation === 'horizontal' ? e.clientX : e.clientY;
    startSize.current = currentSize;
  }, [orientation, currentSize]);

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e: MouseEvent) => {
      const currentPos = orientation === 'horizontal' ? e.clientX : e.clientY;
      const delta = currentPos - startPos.current;
      const newSize = Math.max(minSize, Math.min(maxSize, startSize.current + delta));
      onResize(newSize - startSize.current);
    };
    const handleUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    document.body.style.cursor = orientation === 'horizontal' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [dragging, orientation, onResize, minSize, maxSize]);

  const isH = orientation === 'horizontal';

  return (
    <div
      onMouseDown={handleMouseDown}
      className="relative flex-shrink-0 aether-transition-colors group"
      style={{
        [isH ? 'width' : 'height']: `${SPACING[1]}px`,
        background: dragging ? 'var(--aether-accent, var(--aether-border-accent))' : 'var(--aether-border-subtle)',
        cursor: isH ? 'col-resize' : 'row-resize',
      }}
    >
      {/* Grip indicator — Fibonacci dots */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          [isH ? 'width' : 'height']: `${SPACING[1]}px`,
          [isH ? 'height' : 'width']: '100%',
          opacity: dragging ? 1 : 0.377,
        }}
      >
        <div
          className="flex gap-[1px]"
          style={{ flexDirection: isH ? 'column' : 'row' }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={dragging ? { scale: [1, 1.236, 1] } : {}}
              transition={{ duration: DURATION.normal / 1000, repeat: Infinity, delay: i * 0.089 }}
              className="rounded-full"
              style={{
                width: `${SPACING[2]}px`,
                height: `${SPACING[2]}px`,
                background: 'var(--aether-text-ghost)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STATUS BAR — Fibonacci-height bottom information bar
// Content agnostic: slots accept any ReactNode.
// ═══════════════════════════════════════════════════════════════════

interface StatusBarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function StatusBar({ left, center, right }: StatusBarProps) {
  return (
    <footer
      className="flex items-center justify-between px-[13px] flex-shrink-0 aether-glass-sm"
      style={{
        height: `${SPACING[21]}px`,
        background: 'var(--aether-l0)',
        borderTop: '1px solid var(--aether-border-subtle)',
        fontSize: '10px',
        fontFamily: 'var(--aether-mono)',
      }}
    >
      <div className="flex items-center gap-[13px]" style={{ color: 'var(--aether-text-tertiary)' }}>
        {left}
      </div>
      {center && (
        <div className="flex items-center gap-[8px]" style={{ color: 'var(--aether-text-ghost)' }}>
          {center}
        </div>
      )}
      <div className="flex items-center gap-[13px]" style={{ color: 'var(--aether-text-tertiary)' }}>
        {right}
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TAB BAR — Fibonacci-proportioned file tabs
// Content agnostic: tabs define themselves.
// ═══════════════════════════════════════════════════════════════════

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  dirty?: boolean;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  onNew?: () => void;
}

export function TabBar({ tabs, activeTab, onSelect, onClose, onNew }: TabBarProps) {
  return (
    <div
      className="flex items-center overflow-x-auto aether-no-scrollbar flex-shrink-0"
      style={{
        background: 'var(--aether-l1)',
        borderBottom: '1px solid var(--aether-border-subtle)',
        minHeight: `${SPACING[34]}px`,
      }}
    >
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: -SPACING[5] }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.swift / 1000 }}
            onClick={() => onSelect(tab.id)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.982 }}
            className="flex items-center gap-[5px] px-[13px] cursor-pointer aether-transition-colors relative group"
            style={{
              minHeight: `${SPACING[34]}px`,
              minWidth: `${SPACING[89]}px`,
              maxWidth: `${SPACING[144]}px`,
              background: active ? 'var(--aether-l2)' : 'transparent',
              color: active ? 'var(--aether-text-primary)' : 'var(--aether-text-ghost)',
              borderRight: '1px solid var(--aether-border-subtle)',
            }}
          >
            {active && (
              <motion.div
                layoutId="tab-active-indicator"
                className="absolute top-0 left-0 right-0"
                style={{
                  height: `${SPACING[1]}px`,
                  background: 'var(--aether-accent, var(--aether-text-primary))',
                  borderRadius: `${RADIUS.pill}px`,
                  boxShadow: 'var(--aether-shadow-glow)',
                }}
              />
            )}
            {tab.icon && <span className="flex-shrink-0" style={{ opacity: active ? 1 : 0.610 }}>{tab.icon}</span>}
            <span className="text-[11px] font-medium truncate flex-1">{tab.label}</span>
            {tab.dirty && (
              <motion.span
                animate={{ scale: [1, 1.236, 1] }}
                transition={{ duration: DURATION.smooth / 1000, repeat: Infinity }}
                className="w-[3px] h-[3px] rounded-full flex-shrink-0"
                style={{ background: 'var(--aether-accent, var(--aether-text-primary))' }}
              />
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onClose(tab.id); }}
              className="flex-shrink-0 w-[13px] h-[13px] flex items-center justify-center rounded-[3px] aether-transition-colors"
              style={{
                opacity: active ? 1 : 0,
                color: 'var(--aether-text-ghost)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--aether-l5)'; e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.opacity = active ? '1' : '0'; }}
            >
              ✕
            </button>
          </motion.div>
        );
      })}
      {onNew && (
        <button
          onClick={onNew}
          className="px-[13px] py-[8px] aether-transition-colors flex-shrink-0"
          style={{ color: 'var(--aether-text-ghost)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--aether-accent, var(--aether-text-primary))'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--aether-text-ghost)'; }}
        >
          +
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TERMINAL — Fibonacci-height collapsible console
// ═══════════════════════════════════════════════════════════════════

interface TerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  lines: string[];
  height?: number;
}

export function Terminal({ isOpen, onToggle, lines, height = 144 }: TerminalProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? height : 0 }}
      transition={{ type: 'spring', stiffness: 233, damping: 34 }}
      className="flex flex-col overflow-hidden flex-shrink-0"
      style={{ background: 'var(--aether-l0)', borderTop: '1px solid var(--aether-border-subtle)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-[13px] py-[5px] flex-shrink-0" style={{ background: 'var(--aether-l1)', borderBottom: '1px solid var(--aether-border-subtle)' }}>
        <div className="flex items-center gap-[8px]">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: DURATION.deliberate / 1000, repeat: Infinity, ease: 'linear' }}
            className="w-[8px] h-[8px] rounded-full"
            style={{ border: '1px solid var(--aether-success)', borderTopColor: 'transparent' }}
          />
          <span className="text-[8px] font-bold uppercase tracking-[0.15em] aether-gradient-text">Terminal</span>
        </div>
        <button
          onClick={onToggle}
          className="px-[5px] py-[2px] text-[10px] rounded-[3px] aether-transition-colors"
          style={{ color: 'var(--aether-text-ghost)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--aether-l4)'; e.currentTarget.style.color = 'var(--aether-text-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--aether-text-ghost)'; }}
        >
          ✕
        </button>
      </div>
      {/* Output */}
      <div className="flex-1 overflow-y-auto p-[13px] aether-mono text-[10px] leading-[16px]" style={{ color: 'var(--aether-text-secondary)' }}>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -SPACING[5] }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.013 }}
            className="mb-[1px]"
          >
            <span style={{ color: 'var(--aether-success)' }}>➜</span>
            <span className="ml-[5px]" style={{ color: 'var(--aether-info)' }}>~</span>
            <span className="ml-[5px]">{line}</span>
          </motion.div>
        ))}
        {/* Input line */}
        <div className="flex items-center">
          <span style={{ color: 'var(--aether-success)' }}>➜</span>
          <span className="ml-[5px]" style={{ color: 'var(--aether-info)' }}>~</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 ml-[5px] bg-transparent outline-none aether-mono"
            style={{ color: 'var(--aether-text-primary)', caretColor: 'var(--aether-accent, var(--aether-text-primary))' }}
          />
          <motion.span
            animate={{ opacity: [1, 0.377, 1] }}
            transition={{ duration: DURATION.normal / 1000, repeat: Infinity }}
            className="w-[2px] h-[10px]"
            style={{ background: 'var(--aether-accent, var(--aether-text-primary))' }}
          />
        </div>
        <div ref={endRef} />
      </div>
    </motion.div>
  );
}