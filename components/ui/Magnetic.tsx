'use client';

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

/**
 * Wraps any element and pulls it toward the cursor when nearby.
 * Use for hero CTAs and section anchors. Set `strength` (0–1) for pull amount.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(x, y);
      const reach = Math.max(r.width, r.height) * 1.4;
      if (dist < reach) {
        const k = (1 - dist / reach) * strength;
        tx = x * k;
        ty = y * k;
      } else {
        tx = 0;
        ty = 0;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  // Build the intrinsic element dynamically to keep types honest.
  const Component = Tag as any;
  const style: CSSProperties = { display: 'inline-block', willChange: 'transform' };
  return (
    <Component ref={ref} className={className} style={style} data-magnetic>
      {children}
    </Component>
  );
}
