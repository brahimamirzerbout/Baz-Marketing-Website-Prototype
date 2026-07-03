// ============================================================================
// Shared EmptyState — used by every list page
// ============================================================================
// Two API styles, both supported:
//
//   1. <EmptyState icon title description action />        — explicit ReactNode
//   2. <EmptyState icon title description actionLabel onAction /> — legacy
// ============================================================================

import type { ReactNode } from "react";
import Button from "./Button";
import { Sparkle } from "./svgs";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Pass a ReactNode to render as the CTA (preferred). */
  action?: ReactNode;
  /** Legacy shortcut: render a primary Button with this label. */
  actionLabel?: string;
  /** Legacy: callback for the Button. */
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const resolvedAction =
    action ?? (actionLabel && onAction ? <Button onClick={onAction}>{actionLabel}</Button> : null);

  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-surface-border bg-surface-card p-12 text-center",
        className,
      )}
    >
      <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-surface-muted flex items-center justify-center text-light-3">
        {icon ?? <Sparkle className="h-6 w-6" />}
      </div>
      <h3 className="text-sm font-semibold text-light-1">{title}</h3>
      {description && <p className="text-xs text-light-3 mt-1.5 max-w-md mx-auto">{description}</p>}
      {resolvedAction && <div className="mt-4">{resolvedAction}</div>}
    </div>
  );
}

export default EmptyState;
