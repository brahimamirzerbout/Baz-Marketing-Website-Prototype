import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHI, DURATION } from '../../styles/aether-design-system';

// ═══════════════════════════════════════════════════════════════════
// MODAL — Golden ratio centered overlay with glassmorphism
// ═══════════════════════════════════════════════════════════════════

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: number;
  closeOnBackdrop?: boolean;
}

export function Modal({ isOpen, onClose, title, children, width = 610, closeOnBackdrop = true }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.swift / 1000 }}
          className="fixed inset-0 z-[34] flex items-center justify-center"
          style={{ background: 'hsla(0, 0%, 0%, 0.610)', backdropFilter: 'blur(8px) saturate(1.618)' }}
          onClick={() => closeOnBackdrop && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1 / PHI, y: 21 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1 / PHI, y: 21 }}
            transition={{ duration: DURATION.normal / 1000, ease: [0.618, 0, 0.618, 1] }}
            className="aether-glass rounded-[21px] overflow-hidden flex flex-col max-h-[80vh]"
            style={{ width: `${width}px`, maxWidth: '90vw', background: 'var(--aether-gradient-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div
                className="flex items-center justify-between px-[21px] py-[13px] border-b"
                style={{ borderColor: 'var(--aether-border-subtle)' }}
              >
                <h2 className="text-[13px] font-bold aether-gradient-text">{title}</h2>
                <button
                  onClick={onClose}
                  className="w-[21px] h-[21px] flex items-center justify-center rounded-[8px] aether-transition-colors"
                  style={{ color: 'var(--aether-text-ghost)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--aether-l5)'; e.currentTarget.style.color = 'var(--aether-text-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--aether-text-ghost)'; }}
                >
                  ✕
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto aether-no-scrollbar">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}