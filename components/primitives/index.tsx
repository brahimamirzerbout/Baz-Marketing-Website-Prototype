// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { DURATION, RADIUS, BLUR, MOTION, PHI } from '../../styles/aether-design-system';
import { Modal } from './Modal';

// ═══════════════════════════════════════════════════════════════════
// SPINNER — Fibonacci spiral loading indicator
// ═══════════════════════════════════════════════════════════════════

interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 16, className = '' }: SpinnerProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: DURATION.deliberate / 1000, repeat: Infinity, ease: 'linear' }}
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${Math.max(1, size / 13)}px solid var(--aether-border-default)`,
        borderTopColor: 'var(--aether-accent, var(--aether-text-primary))',
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// PROGRESS BAR — Fibonacci-segmented progress indicator
// ═══════════════════════════════════════════════════════════════════

interface ProgressBarProps {
  value: number; // 0-100
  height?: number;
  indeterminate?: boolean;
  className?: string;
}

export function ProgressBar({ value, height = 3, indeterminate = false, className = '' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        height: `${height}px`,
        borderRadius: `${RADIUS.pill}px`,
        background: 'var(--aether-l3)',
      }}
    >
      {indeterminate ? (
        <motion.div
          animate={{ x: ['-100%', '400%'] }}
          transition={{ duration: DURATION.smooth / 1000, repeat: Infinity, ease: [0.618, 0, 0.618, 1] }}
          className="absolute top-0 h-full"
          style={{
            width: '25%',
            borderRadius: `${RADIUS.pill}px`,
            background: 'var(--aether-gradient-text, var(--aether-text-primary))',
          }}
        />
      ) : (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: DURATION.normal / 1000, ease: [0.618, 0, 0.618, 1] }}
          className="h-full"
          style={{
            borderRadius: `${RADIUS.pill}px`,
            background: 'var(--aether-gradient-text, var(--aether-text-primary))',
            boxShadow: 'var(--aether-shadow-glow)',
          }}
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// BADGE — Fibonacci-sized status indicator
// ═══════════════════════════════════════════════════════════════════

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
}

const BADGE_STYLES: Record<BadgeVariant, { bg: string; border: string; text: string; dot: string }> = {
  default: { bg: 'var(--aether-l4)', border: 'var(--aether-border-default)', text: 'var(--aether-text-secondary)', dot: 'var(--aether-text-ghost)' },
  primary: { bg: 'hsla(0, 0%, 72%, 0.055)', border: 'hsla(0, 0%, 72%, 0.233)', text: 'var(--aether-accent, var(--aether-text-primary))', dot: 'var(--aether-accent, var(--aether-text-primary))' },
  success: { bg: 'hsla(145, 70%, 55%, 0.055)', border: 'hsla(145, 70%, 55%, 0.233)', text: 'var(--aether-success)', dot: 'var(--aether-success)' },
  warning: { bg: 'hsla(38, 85%, 58%, 0.055)',  border: 'hsla(38, 85%, 58%, 0.233)',  text: 'var(--aether-warning)', dot: 'var(--aether-warning)' },
  danger:  { bg: 'hsla(8, 80%, 58%, 0.055)',   border: 'hsla(8, 80%, 58%, 0.233)',   text: 'var(--aether-danger)', dot: 'var(--aether-danger)' },
  info:    { bg: 'hsla(210, 75%, 60%, 0.055)', border: 'hsla(210, 75%, 60%, 0.233)', text: 'var(--aether-info)', dot: 'var(--aether-info)' },
};

export function Badge({ variant = 'default', children, dot = false }: BadgeProps) {
  const s = BADGE_STYLES[variant];
  return (
    <span
      className="inline-flex items-center gap-[3px] px-[5px] py-[1px] text-[8px] font-bold uppercase tracking-[0.1em] rounded-[3px] aether-transition-colors"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
    >
      {dot && (
        <motion.span
          animate={{ opacity: [1, 0.610, 1] }}
          transition={{ duration: DURATION.smooth / 1000, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[3px] h-[3px] rounded-full"
          style={{ background: s.dot, boxShadow: `0 0 5px ${s.dot}` }}
        />
      )}
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DIVIDER — Golden ratio proportioned separator
// ═══════════════════════════════════════════════════════════════════

interface DividerProps {
  vertical?: boolean;
  label?: string;
  className?: string;
}

export function Divider({ vertical = false, label, className = '' }: DividerProps) {
  if (vertical) {
    return <div className={`w-[1px] self-stretch ${className}`} style={{ background: 'var(--aether-border-subtle)' }} />;
  }
  if (label) {
    return (
      <div className={`flex items-center gap-[8px] ${className}`}>
        <div className="flex-1 h-[1px]" style={{ background: 'var(--aether-border-subtle)' }} />
        <span className="text-[8px] font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--aether-text-ghost)' }}>
          {label}
        </span>
        <div className="flex-1 h-[1px]" style={{ background: 'var(--aether-border-subtle)' }} />
      </div>
    );
  }
  return <div className={`h-[1px] w-full ${className}`} style={{ background: 'var(--aether-border-subtle)' }} />;
}

// ═══════════════════════════════════════════════════════════════════
// AVATAR — Fibonacci-circle identity indicator
// ═══════════════════════════════════════════════════════════════════

interface AvatarProps {
  name: string;
  size?: number;
  src?: string;
}

export function Avatar({ name, size = 21, src }: AvatarProps) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="rounded-full object-cover"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  }
  
  // Hash name to hue (golden angle distribution)
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * PHI + name.charCodeAt(i)) % 360;
  const hue = Math.round(hash);
  
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold aether-transition-colors"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size / 2.618}px`,
        background: `hsl(${hue}, 20%, ${20 + (hue % 13)}%)`,
        color: `hsl(${hue}, 10%, 80%)`,
        border: '1px solid var(--aether-border-default)',
      }}
    >
      {initials}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CONFIRM DIALOG — Golden ratio decision modal
// ═══════════════════════════════════════════════════════════════════

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  danger = false, onConfirm, onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} width={377}>
      <div className="p-[21px]">
        <h3 className="text-[16px] font-bold mb-[8px]" style={{ color: 'var(--aether-text-primary)' }}>
          {title}
        </h3>
        <p className="text-[13px] mb-[21px]" style={{ color: 'var(--aether-text-secondary)' }}>
          {message}
        </p>
        <div className="flex justify-end gap-[8px]">
          <button
            onClick={onCancel}
            className="px-[13px] py-[5px] text-[11px] rounded-[8px] aether-transition-colors"
            style={{ background: 'var(--aether-l4)', color: 'var(--aether-text-secondary)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--aether-l5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--aether-l4)'; }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-[13px] py-[5px] text-[11px] rounded-[8px] aether-transition-colors font-medium"
            style={{
              background: danger ? 'var(--aether-danger)' : 'var(--aether-accent, var(--aether-text-primary))',
              color: danger ? 'white' : 'var(--aether-l0)',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}