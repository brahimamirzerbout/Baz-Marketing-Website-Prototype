// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { PHI, DURATION, RADIUS, SPACING } from '../../styles/aether-design-system';

// ═══════════════════════════════════════════════════════════════════
// AETHER UI — shadcn-compatible component library
// Every component follows shadcn's composition pattern but is styled
// with Fibonacci/Da Vinci mathematical values and our dark theme system.
// ═══════════════════════════════════════════════════════════════════

// ─── BUTTON ───────────────────────────────────────────────────────
type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link';
type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const BTN_VARIANTS: Record<ButtonVariant, React.CSSProperties> = {
  default:     { background: 'var(--aether-accent, var(--aether-text-primary))', color: 'var(--aether-l0)', border: 'none' },
  outline:     { background: 'transparent', color: 'var(--aether-text-primary)', border: '1px solid var(--aether-border-default)' },
  ghost:       { background: 'transparent', color: 'var(--aether-text-secondary)', border: 'none' },
  destructive: { background: 'var(--aether-danger)', color: 'white', border: 'none' },
  secondary:   { background: 'var(--aether-l4)', color: 'var(--aether-text-primary)', border: '1px solid var(--aether-border-subtle)' },
  link:        { background: 'transparent', color: 'var(--aether-accent, var(--aether-text-primary))', border: 'none', textDecoration: 'underline', textUnderlineOffset: '3px' },
};

const BTN_SIZES: Record<ButtonSize, React.CSSProperties> = {
  default:  { height: `${SPACING[34]}px`, padding: `0 ${SPACING[13]}px`, fontSize: '13px' },
  xs:       { height: `${SPACING[21]}px`, padding: `0 ${SPACING[8]}px`, fontSize: '10px' },
  sm:       { height: `${SPACING[34]}px`, padding: `0 ${SPACING[13]}px`, fontSize: '11px' },
  lg:       { height: `${SPACING[55]}px`, padding: `0 ${SPACING[21]}px`, fontSize: '16px' },
  icon:     { width: `${SPACING[34]}px`, height: `${SPACING[34]}px`, padding: 0 },
  'icon-xs':{ width: `${SPACING[21]}px`, height: `${SPACING[21]}px`, padding: 0 },
  'icon-sm':{ width: `${SPACING[34]}px`, height: `${SPACING[34]}px`, padding: 0 },
  'icon-lg':{ width: `${SPACING[55]}px`, height: `${SPACING[55]}px`, padding: 0 },
};

export function Button({ variant = 'default', size = 'default', className = '', children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1 + 1 / (PHI * 10) }}
      whileTap={{ scale: 1 - 1 / (PHI * 10) }}
      transition={{ duration: DURATION.swift / 1000, ease: [0.618, 0, 0.618, 1] }}
      className={`inline-flex items-center justify-center gap-[5px] font-medium rounded-[8px] aether-transition-colors disabled:opacity-[0.377] disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--aether-accent,var(--aether-text-primary))] focus-visible:ring-offset-1 ${className}`}
      style={{ ...BTN_VARIANTS[variant], ...BTN_SIZES[size] }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ─── CARD ──────────────────────────────────────────────────────────
export function Card({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col rounded-[13px] overflow-hidden ${className}`}
      style={{
        background: 'var(--aether-l3)',
        border: '1px solid var(--aether-border-subtle)',
        boxShadow: 'var(--aether-shadow-md)',
        ...props.style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col gap-[3px] px-[13px] py-[13px] ${className}`} style={{ borderBottom: '1px solid var(--aether-border-subtle)' }} {...props}>{children}</div>;
}

export function CardTitle({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={`text-[13px] font-bold aether-gradient-text ${className}`}>{children}</h3>;
}

export function CardDescription({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <p className={`text-[10px] ${className}`} style={{ color: 'var(--aether-text-tertiary)' }}>{children}</p>;
}

export function CardContent({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-[13px] py-[13px] ${className}`} {...props}>{children}</div>;
}

export function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex items-center px-[13px] py-[13px] ${className}`} style={{ borderTop: '1px solid var(--aether-border-subtle)', background: 'var(--aether-l2)' }} {...props}>{children}</div>;
}

// ─── INPUT ─────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ className = '', invalid, ...props }: InputProps) {
  return (
    <input
      className={`w-full px-[8px] py-[5px] text-[11px] rounded-[8px] outline-none aether-transition-colors aether-mono ${className}`}
      style={{
        background: 'var(--aether-l3)',
        color: 'var(--aether-text-primary)',
        border: `1px solid ${invalid ? 'var(--aether-danger)' : 'var(--aether-border-default)'}`,
        caretColor: 'var(--aether-accent, var(--aether-text-primary))',
      }}
      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--aether-accent, var(--aether-text-primary))'; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = invalid ? 'var(--aether-danger)' : 'var(--aether-border-default)'; }}
      {...props}
    />
  );
}

// ─── CHECKBOX ──────────────────────────────────────────────────────
interface CheckboxProps {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  'aria-label'?: string;
}

export function Checkbox({ checked = false, onCheckedChange, disabled, ...props }: CheckboxProps) {
  const isIndeterminate = checked === 'indeterminate';
  const isChecked = checked === true;

  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={isIndeterminate ? 'mixed' : isChecked}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange?.(!isChecked)}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: DURATION.swift / 1000 }}
      className="flex items-center justify-center flex-shrink-0 aether-transition-colors disabled:opacity-[0.377]"
      style={{
        width: `${SPACING[13]}px`,
        height: `${SPACING[13]}px`,
        borderRadius: `${RADIUS.sm}px`,
        background: isChecked || isIndeterminate ? 'var(--aether-accent, var(--aether-text-primary))' : 'var(--aether-l3)',
        border: `1px solid ${isChecked || isIndeterminate ? 'var(--aether-accent, var(--aether-text-primary))' : 'var(--aether-border-default)'}`,
      }}
      {...props}
    >
      {isChecked && (
        <motion.svg initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: DURATION.fast / 1000, ease: [0.618, 0, 0.618, 1] }} width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5L4 7L8 3" stroke="var(--aether-l0)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      )}
      {isIndeterminate && (
        <div style={{ width: `${SPACING[5]}px`, height: '1px', background: 'var(--aether-l0)' }} />
      )}
    </motion.button>
  );
}

// ─── LABEL ─────────────────────────────────────────────────────────
export function Label({ className = '', children, htmlFor, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-[11px] font-medium aether-transition-colors cursor-pointer ${className}`}
      style={{ color: 'var(--aether-text-secondary)' }}
      {...props}
    >
      {children}
    </label>
  );
}

// ─── KBD ───────────────────────────────────────────────────────────
export function Kbd({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <kbd
      className={`inline-flex items-center justify-center aether-mono px-[5px] py-[1px] text-[8px] rounded-[3px] ${className}`}
      style={{
        background: 'var(--aether-l4)',
        border: '1px solid var(--aether-border-default)',
        color: 'var(--aether-text-secondary)',
        minWidth: `${SPACING[13]}px`,
      }}
    >
      {children}
    </kbd>
  );
}

export function KbdGroup({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <span className={`inline-flex items-center gap-[2px] ${className}`}>{children}</span>;
}

// ─── BREADCRUMB ────────────────────────────────────────────────────
export function Breadcrumb({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <nav className={`flex items-center ${className}`} aria-label="breadcrumb">{children}</nav>;
}

export function BreadcrumbList({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <ol className={`flex items-center gap-[3px] flex-wrap ${className}`}>{children}</ol>;
}

export function BreadcrumbItem({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <li className={`inline-flex items-center gap-[3px] ${className}`}>{children}</li>;
}

export function BreadcrumbLink({ className = '', children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={`text-[10px] aether-transition-colors ${className}`}
      style={{ color: 'var(--aether-text-tertiary)' }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--aether-text-primary)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--aether-text-tertiary)'; }}
      {...props}
    >
      {children}
    </a>
  );
}

export function BreadcrumbPage({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <span className={`text-[10px] font-medium ${className}`} style={{ color: 'var(--aether-text-primary)' }}>{children}</span>;
}

export function BreadcrumbSeparator({ className = '', children }: { className?: string; children?: React.ReactNode }) {
  return (
    <span className={`text-[8px] ${className}`} style={{ color: 'var(--aether-text-ghost)' }}>
      {children || '›'}
    </span>
  );
}

// ─── BUBBLE (chat message) ─────────────────────────────────────────
type BubbleVariant = 'default' | 'secondary' | 'muted' | 'tinted' | 'outline' | 'ghost' | 'destructive';
type BubbleAlign = 'start' | 'end';

interface BubbleProps {
  variant?: BubbleVariant;
  align?: BubbleAlign;
  className?: string;
  children: React.ReactNode;
}

const BUBBLE_VARIANTS: Record<BubbleVariant, React.CSSProperties> = {
  default:     { background: 'var(--aether-accent-bg, var(--aether-l5))', color: 'var(--aether-text-primary)', border: '1px solid var(--aether-accent-border, var(--aether-border-default))' },
  secondary:   { background: 'var(--aether-l4)', color: 'var(--aether-text-primary)', border: '1px solid var(--aether-border-subtle)' },
  muted:       { background: 'var(--aether-l3)', color: 'var(--aether-text-secondary)', border: '1px solid var(--aether-border-subtle)' },
  tinted:      { background: 'hsla(0, 0%, 72%, 0.055)', color: 'var(--aether-text-primary)', border: '1px solid hsla(0, 0%, 72%, 0.144)' },
  outline:     { background: 'transparent', color: 'var(--aether-text-primary)', border: '1px solid var(--aether-border-default)' },
  ghost:       { background: 'transparent', color: 'var(--aether-text-primary)', border: 'none' },
  destructive: { background: 'hsla(8, 80%, 58%, 0.055)', color: 'var(--aether-danger)', border: '1px solid hsla(8, 80%, 58%, 0.233)' },
};

export function Bubble({ variant = 'secondary', align = 'start', className = '', children }: BubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 / PHI, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: DURATION.fast / 1000, ease: [0.618, 0, 0.618, 1] }}
      className={`inline-block max-w-[80%] rounded-[13px] px-[13px] py-[8px] text-[11px] leading-[16px] ${className}`}
      style={{
        ...BUBBLE_VARIANTS[variant],
        alignSelf: align === 'end' ? 'flex-end' : 'flex-start',
        borderRadius: align === 'end' ? '13px 13px 3px 13px' : '13px 13px 13px 3px',
        maxWidth: variant === 'ghost' ? '100%' : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}

export function BubbleContent({ className = '', children, asChild }: { className?: string; children: React.ReactNode; asChild?: boolean }) {
  if (asChild) return <>{children}</>;
  return <div className={className}>{children}</div>;
}

export function BubbleReactions({ className = '', children, side = 'bottom', align = 'end' }: { className?: string; children: React.ReactNode; side?: 'top' | 'bottom'; align?: 'start' | 'end' }) {
  return (
    <div
      className={`inline-flex items-center gap-[2px] px-[3px] py-[1px] rounded-[13px] ${className}`}
      style={{
        background: 'var(--aether-l4)',
        border: '1px solid var(--aether-border-subtle)',
        position: 'relative',
        marginTop: side === 'top' ? '0' : '-5px',
        marginBottom: side === 'top' ? '-5px' : '0',
        alignSelf: align === 'end' ? 'flex-end' : 'flex-start',
      }}
    >
      {children}
    </div>
  );
}

export function BubbleGroup({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex flex-col gap-[3px] ${className}`}>{children}</div>;
}

// ─── DROPDOWN MENU ─────────────────────────────────────────────────
interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'end';
}

export function DropdownMenu({ trigger, children, align = 'start' }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 1 / PHI, y: -3 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: DURATION.swift / 1000, ease: [0.618, 0, 0.618, 1] }}
          className="absolute z-[34] min-w-[144px] py-[5px] rounded-[8px] aether-glass"
          style={{
            background: 'var(--aether-l4)',
            border: '1px solid var(--aether-border-default)',
            boxShadow: 'var(--aether-shadow-lg)',
            [align === 'end' ? 'right' : 'left']: 0,
            top: '100%',
            marginTop: '3px',
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export function DropdownMenuItem({ className = '', children, onClick, danger, ...props }: { className?: string; children: React.ReactNode; onClick?: () => void; danger?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-[8px] px-[13px] py-[5px] text-[11px] cursor-pointer aether-transition-colors ${className}`}
      style={{ color: danger ? 'var(--aether-danger)' : 'var(--aether-text-secondary)' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = danger ? 'hsla(8, 80%, 58%, 0.055)' : 'var(--aether-l5)'; e.currentTarget.style.color = danger ? 'var(--aether-danger)' : 'var(--aether-text-primary)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = danger ? 'var(--aether-danger)' : 'var(--aether-text-secondary)'; }}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`px-[13px] py-[3px] text-[8px] font-bold uppercase tracking-[0.15em] ${className}`} style={{ color: 'var(--aether-text-ghost)' }}>{children}</div>;
}

export function DropdownMenuSeparator() {
  return <div className="h-[1px] my-[3px] mx-[8px]" style={{ background: 'var(--aether-border-subtle)' }} />;
}

export function DropdownMenuGroup({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

export function DropdownMenuShortcut({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <span className={`ml-auto text-[8px] aether-mono ${className}`} style={{ color: 'var(--aether-text-ghost)' }}>{children}</span>;
}

// ─── DRAWER ────────────────────────────────────────────────────────
interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}

export function Drawer({ open, onOpenChange, side = 'right', children }: DrawerProps) {
  const sideStyles: Record<string, React.CSSProperties> = {
    top:    { top: 0, left: 0, right: 0, height: 'auto', maxHeight: '80vh' },
    right:  { top: 0, right: 0, bottom: 0, width: '377px', maxWidth: '90vw' },
    bottom: { bottom: 0, left: 0, right: 0, height: 'auto', maxHeight: '80vh' },
    left:   { top: 0, left: 0, bottom: 0, width: '377px', maxWidth: '90vw' },
  };
  const animDir = side === 'right' ? { x: '100%' } : side === 'left' ? { x: '-100%' } : side === 'top' ? { y: '-100%' } : { y: '100%' };

  return (
    <>
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        transition={{ duration: DURATION.normal / 1000 }}
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 z-[34]"
        style={{ background: 'hsla(0, 0%, 0%, 0.610)', backdropFilter: 'blur(8px) saturate(1.618)' }}
      />
      <motion.div
        initial={false}
        animate={open ? { x: 0, y: 0, opacity: 1 } : { ...animDir, opacity: 0 }}
        transition={{ duration: DURATION.smooth / 1000, ease: [0.618, 0, 0.618, 1] }}
        className="fixed z-[34] aether-glass flex flex-col"
        style={{ ...sideStyles[side], background: 'var(--aether-gradient-surface)' }}
      >
        {children}
      </motion.div>
    </>
  );
}

export function DrawerHeader({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`px-[21px] py-[13px] ${className}`} style={{ borderBottom: '1px solid var(--aether-border-subtle)' }}>{children}</div>;
}

export function DrawerTitle({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={`text-[13px] font-bold aether-gradient-text ${className}`}>{children}</h2>;
}

export function DrawerDescription({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <p className={`text-[10px] mt-[2px] ${className}`} style={{ color: 'var(--aether-text-tertiary)' }}>{children}</p>;
}

export function DrawerContent({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex-1 overflow-y-auto p-[21px] ${className}`}>{children}</div>;
}

export function DrawerFooter({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex items-center justify-end gap-[8px] px-[21px] py-[13px] ${className}`} style={{ borderTop: '1px solid var(--aether-border-subtle)' }}>{children}</div>;
}

// ─── HOVER CARD ────────────────────────────────────────────────────
interface HoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom';
  openDelay?: number;
}

export function HoverCard({ trigger, children, side = 'top', openDelay = 233 }: HoverCardProps) {
  const [open, setOpen] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => { timerRef.current = setTimeout(() => setOpen(true), openDelay); }}
      onMouseLeave={() => { if (timerRef.current) clearTimeout(timerRef.current); setOpen(false); }}
    >
      {trigger}
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 1 / PHI, y: side === 'top' ? 5 : -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: DURATION.swift / 1000, ease: [0.618, 0, 0.618, 1] }}
          className="absolute z-[89] min-w-[144px] max-w-[233px] p-[8px] rounded-[8px] aether-glass"
          style={{
            [side === 'top' ? 'bottom' : 'top']: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: side === 'top' ? '5px' : 0,
            marginTop: side === 'bottom' ? '5px' : 0,
          }}
        >
          {children}
        </motion.div>
      )}
    </span>
  );
}

// ─── EMPTY ─────────────────────────────────────────────────────────
export function Empty({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex flex-col items-center justify-center text-center py-[34px] px-[21px] ${className}`} style={{ color: 'var(--aether-text-ghost)' }}>{children}</div>;
}

export function EmptyHeader({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex flex-col items-center gap-[5px] mb-[13px] ${className}`}>{children}</div>;
}

export function EmptyMedia({ variant = 'icon', className = '', children }: { variant?: 'icon' | 'default'; className?: string; children: React.ReactNode }) {
  return <div className={`flex items-center justify-center w-[55px] h-[55px] rounded-[13px] ${className}`} style={{ background: 'var(--aether-l3)', border: '1px solid var(--aether-border-subtle)' }}>{children}</div>;
}

export function EmptyTitle({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={`text-[13px] font-medium ${className}`} style={{ color: 'var(--aether-text-secondary)' }}>{children}</h3>;
}

export function EmptyDescription({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <p className={`text-[10px] ${className}`} style={{ color: 'var(--aether-text-ghost)' }}>{children}</p>;
}

export function EmptyContent({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex items-center justify-center gap-[8px] mt-[13px] ${className}`}>{children}</div>;
}

// ─── ATTACHMENT ────────────────────────────────────────────────────
type AttachmentState = 'idle' | 'uploading' | 'processing' | 'error' | 'done';
type AttachmentSize = 'default' | 'sm' | 'xs';
type AttachmentOrientation = 'horizontal' | 'vertical';

interface AttachmentProps {
  state?: AttachmentState;
  size?: AttachmentSize;
  orientation?: AttachmentOrientation;
  className?: string;
  children: React.ReactNode;
}

const ATTACH_SIZES: Record<AttachmentSize, React.CSSProperties> = {
  default: { padding: `${SPACING[8]}px ${SPACING[13]}px`, gap: `${SPACING[8]}px`, borderRadius: `${RADIUS.lg}px` },
  sm:      { padding: `${SPACING[5]}px ${SPACING[8]}px`, gap: `${SPACING[5]}px`, borderRadius: `${RADIUS.md}px` },
  xs:      { padding: `${SPACING[3]}px ${SPACING[5]}px`, gap: `${SPACING[3]}px`, borderRadius: `${RADIUS.sm}px` },
};

export function Attachment({ state = 'done', size = 'default', orientation = 'horizontal', className = '', children }: AttachmentProps) {
  const isError = state === 'error';
  const isLoading = state === 'uploading' || state === 'processing';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 / PHI }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: DURATION.fast / 1000, ease: [0.618, 0, 0.618, 1] }}
      className={`flex items-center aether-transition-colors ${className}`}
      style={{
        ...ATTACH_SIZES[size],
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        background: isError ? 'hsla(8, 80%, 58%, 0.021)' : 'var(--aether-l3)',
        border: `1px solid ${isError ? 'hsla(8, 80%, 58%, 0.233)' : 'var(--aether-border-subtle)'}`,
        boxShadow: 'var(--aether-shadow-sm)',
      }}
    >
      {children}
    </motion.div>
  );
}

export function AttachmentMedia({ variant = 'icon', className = '', children }: { variant?: 'icon' | 'image'; className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden flex-shrink-0 ${className}`}
      style={{
        width: variant === 'image' ? '100%' : `${SPACING[34]}px`,
        height: variant === 'image' ? `${SPACING[55]}px` : `${SPACING[34]}px`,
        borderRadius: `${RADIUS.md}px`,
        background: 'var(--aether-l4)',
      }}
    >
      {children}
    </div>
  );
}

export function AttachmentContent({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex-1 min-w-0 ${className}`}>{children}</div>;
}

export function AttachmentTitle({ className = '', children, state }: { className?: string; children: React.ReactNode; state?: AttachmentState }) {
  const isLoading = state === 'uploading' || state === 'processing';
  return (
    <div
      className={`text-[11px] font-medium truncate ${className}`}
      style={{
        color: 'var(--aether-text-primary)',
        ...(isLoading && { animation: 'aether-shimmer 610ms ease-in-out infinite' }),
      }}
    >
      {children}
    </div>
  );
}

export function AttachmentDescription({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`text-[8px] truncate ${className}`} style={{ color: 'var(--aether-text-ghost)' }}>{children}</div>;
}

export function AttachmentActions({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex items-center gap-[3px] flex-shrink-0 ${className}`}>{children}</div>;
}

export function AttachmentAction({ 'aria-label': ariaLabel, children, onClick }: { 'aria-label'?: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Button variant="ghost" size="icon-xs" aria-label={ariaLabel} onClick={onClick}>
      {children}
    </Button>
  );
}

// ─── FIELD ─────────────────────────────────────────────────────────
export function Field({ orientation = 'vertical', className = '', children, 'data-invalid': invalid }: { orientation?: 'vertical' | 'horizontal'; className?: string; children: React.ReactNode; 'data-invalid'?: boolean }) {
  return (
    <div
      className={`flex gap-[5px] ${className}`}
      style={{ flexDirection: orientation === 'horizontal' ? 'row' : 'column', alignItems: orientation === 'horizontal' ? 'center' : 'stretch' }}
      data-invalid={invalid}
    >
      {children}
    </div>
  );
}

export function FieldLabel({ className = '', children, htmlFor }: { className?: string; children: React.ReactNode; htmlFor?: string }) {
  return <Label htmlFor={htmlFor} className={className}>{children}</Label>;
}

export function FieldDescription({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <p className={`text-[8px] ${className}`} style={{ color: 'var(--aether-text-ghost)' }}>{children}</p>;
}

export function FieldError({ className = '', children, errors }: { className?: string; children?: React.ReactNode; errors?: { message?: string }[] }) {
  if (errors && errors.length > 0) {
    return (
      <div className={className}>
        {errors.map((e, i) => <p key={i} className="text-[8px]" style={{ color: 'var(--aether-danger)' }}>{e.message}</p>)}
      </div>
    );
  }
  if (!children) return null;
  return <p className={`text-[8px] ${className}`} style={{ color: 'var(--aether-danger)' }}>{children}</p>;
}

export function FieldGroup({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex flex-col gap-[13px] ${className}`}>{children}</div>;
}

export function FieldSeparator({ className = '', children }: { className?: string; children?: React.ReactNode }) {
  if (children) {
    return (
      <div className={`flex items-center gap-[8px] my-[3px] ${className}`}>
        <div className="flex-1 h-[1px]" style={{ background: 'var(--aether-border-subtle)' }} />
        <span className="text-[8px]" style={{ color: 'var(--aether-text-ghost)' }}>{children}</span>
        <div className="flex-1 h-[1px]" style={{ background: 'var(--aether-border-subtle)' }} />
      </div>
    );
  }
  return <div className={`h-[1px] my-[3px] ${className}`} style={{ background: 'var(--aether-border-subtle)' }} />;
}

// ─── ITEM ──────────────────────────────────────────────────────────
export function Item({ variant = 'default', size = 'default', className = '', children, asChild }: { variant?: 'default' | 'outline' | 'muted'; size?: 'default' | 'sm' | 'xs'; className?: string; children: React.ReactNode; asChild?: boolean }) {
  const itemVariants = {
    default: { background: 'var(--aether-l3)', border: '1px solid var(--aether-border-subtle)' },
    outline: { background: 'transparent', border: '1px solid var(--aether-border-default)' },
    muted:   { background: 'var(--aether-l2)', border: '1px solid var(--aether-border-subtle)' },
  };
  const itemSizes = {
    default: { padding: `${SPACING[8]}px ${SPACING[13]}px`, gap: `${SPACING[8]}px` },
    sm:      { padding: `${SPACING[5]}px ${SPACING[8]}px`, gap: `${SPACING[5]}px` },
    xs:      { padding: `${SPACING[3]}px ${SPACING[5]}px`, gap: `${SPACING[3]}px` },
  };

  return (
    <div className={`flex items-center rounded-[8px] aether-transition-colors ${className}`} style={{ ...itemVariants[variant], ...itemSizes[size] }}>
      {children}
    </div>
  );
}

export function ItemMedia({ variant = 'default', className = '', children }: { variant?: 'default' | 'icon' | 'image'; className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex items-center justify-center flex-shrink-0 overflow-hidden ${className}`} style={{ width: `${SPACING[21]}px`, height: `${SPACING[21]}px`, borderRadius: `${RADIUS.sm}px`, background: 'var(--aether-l4)' }}>
      {children}
    </div>
  );
}

export function ItemContent({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex-1 min-w-0 ${className}`}>{children}</div>;
}

export function ItemTitle({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`text-[11px] font-medium truncate ${className}`} style={{ color: 'var(--aether-text-primary)' }}>{children}</div>;
}

export function ItemDescription({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`text-[8px] truncate ${className}`} style={{ color: 'var(--aether-text-ghost)' }}>{children}</div>;
}

export function ItemActions({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex items-center gap-[3px] flex-shrink-0 ${className}`}>{children}</div>;
}

export function ItemGroup({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex flex-col gap-[3px] ${className}`}>{children}</div>;
}

export function ItemSeparator() {
  return <div className="h-[1px] my-[2px] mx-[8px]" style={{ background: 'var(--aether-border-subtle)' }} />;
}