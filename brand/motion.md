# Motion — Easing, Duration & Micro-Interactions

BAZ motion is **cinematic, not bouncy**. Animations should feel like a premium editorial experience — smooth, intentional, and never distracting. Think *Apple product pages*, not *Material Design ripple effects*.

---

## 1. Motion Principles

### 1.1 Purposeful Motion
Every animation must serve a functional purpose:
- **Reveal** — Scroll-triggered fade-ups show content progressively
- **Feedback** — Hover states confirm interactivity
- **Transition** — Page and element transitions maintain spatial awareness
- **Delight** — Magnetic CTAs and subtle cursor effects reward attention

### 1.2 Speed Hierarchy
- **Instant** (75ms) — Hover color changes, focus rings
- **Fast** (150ms) — Button press, toggle switch
- **Normal** (250ms) — Card hover, dropdown, tooltip
- **Slow** (400ms) — Modal enter, page transition
- **Glacial** (600ms) — Hero text reveal, scroll animations

### 1.3 Cinematic, Not Bouncy
- Use `ease-default` (decelerate) for most UI animations
- Use `ease-bounce` **only** for toggle switches and playful micro-interactions
- Never use `ease-elastic` for standard UI elements
- Scroll reveals use `ease-out` for natural deceleration

---

## 2. Easing Curves

| Token | Value | Use |
|-------|-------|-----|
| `--ease-default` | `cubic-bezier(0.2, 0, 0, 1)` | Default for most animations |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the screen |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetric transitions |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Toggle switches, badges |
| `--ease-elastic` | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` | **Sparingly only** — notification badges |

---

## 3. Duration Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--duration-instant` | 75ms | Hover color, focus ring |
| `--duration-fast` | 150ms | Button press, toggle |
| `--duration-normal` | 250ms | Card hover, dropdown |
| `--duration-slow` | 400ms | Modal enter, page transition |
| `--duration-glacial` | 600ms | Hero reveal, scroll animation |

---

## 4. Hover Interactions

### 4.1 Button Hover
```css
.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}
```

### 4.2 Card Hover
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### 4.3 Link Hover
```css
a:hover {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 4px;
}
```

### 4.4 Navigation Hover
```css
.nav-link:hover {
  color: var(--accent);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width var(--duration-normal) var(--ease-default);
}

.nav-link:hover::after {
  width: 100%;
}
```

---

## 5. Focus Interactions

### Focus Ring
```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--ring-width) var(--ring-color),
              0 0 0 var(--ring-offset) var(--ring-offset-color);
}
```

- Ring color: `var(--accent)` (violet)
- Ring width: 2px
- Ring offset: 2px
- Offset color: Matches background

---

## 6. Scroll-Triggered Reveals

BAZ uses a custom `<Reveal>` component that fades elements up on scroll.

### Implementation
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--duration-glacial) var(--ease-out),
              transform var(--duration-glacial) var(--ease-out);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Stagger Pattern
```css
.reveal:nth-child(1) { transition-delay: 0ms; }
.reveal:nth-child(2) { transition-delay: 75ms; }
.reveal:nth-child(3) { transition-delay: 150ms; }
.reveal:nth-child(4) { transition-delay: 225ms; }
.reveal:nth-child(5) { transition-delay: 300ms; }
```

---

## 7. Page Transitions

### Route Change (Next.js)
```css
.page-enter {
  opacity: 0;
  transform: translateY(8px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}

.page-exit {
  opacity: 1;
}

.page-exit-active {
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-in);
}
```

---

## 8. Magnetic CTA

The hero CTA uses a magnetic pull-toward-cursor effect on desktop.

### Implementation
```tsx
<Magnetic strength={0.3}>
  <button className="btn btn-primary btn-xl rounded-full">
    Get Started →
  </button>
</Magnetic>
```

The `<Magnetic>` component:
- Listens for `mousemove` within a configurable radius
- Translates the button toward the cursor by `strength * (cursorOffset)`
- Resets on `mouseleave` with `duration-slow ease-out`
- **Disabled on mobile** (touch devices)
- **Disabled when `prefers-reduced-motion`** is active

---

## 9. Custom Cursor

BAZ sites use a custom cursor that:
- Hides the default cursor over interactive elements
- Shows a larger circle with violet border on hover
- Shows a filled violet circle on CTA hover
- Uses `data-cursor="cta"` attribute on hover targets

```css
.cursor-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: var(--radius-full);
  transition: transform var(--duration-instant) var(--ease-default);
}

.cursor-ring {
  width: 40px;
  height: 40px;
  border: 1.5px solid var(--accent);
  border-radius: var(--radius-full);
  transition: width var(--duration-normal) var(--ease-default),
              height var(--duration-normal) var(--ease-default);
}
```

---

## 10. Marquee Animation

Used for trust strips and client logos.

```css
.marquee {
  display: flex;
  animation: marquee 30s linear infinite;
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## 11. Loading States

### Skeleton Shimmer
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-muted) 25%,
    var(--bg-subtle) 50%,
    var(--bg-muted) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-fib5);
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Spinner
```css
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: var(--radius-full);
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## 12. Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }

  .marquee {
    animation: none;
  }

  .spinner {
    animation: none;
    border-top-color: var(--accent);
  }
}
```

All BlackSwan tokens automatically zero their durations under `prefers-reduced-motion: reduce`.

---

## 13. Tailwind Animation Extensions

```js
// tailwind.theme.js → extend.animation
animation: {
  'fade-up': 'fadeUp 0.6s ease-out forwards',
  'fade-in': 'fadeIn 0.4s ease-out forwards',
  'slide-in': 'slideIn 0.25s ease-out forwards',
  'slide-out': 'slideOut 0.2s ease-in forwards',
  'marquee': 'marquee 30s linear infinite',
  'shimmer': 'shimmer 1.5s ease-in-out infinite',
  'spin': 'spin 0.6s linear infinite',
},

keyframes: {
  fadeUp: {
    '0%': { opacity: '0', transform: 'translateY(24px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  slideIn: {
    '0%': { opacity: '0', transform: 'translateY(10px) scale(0.98)' },
    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
  },
  slideOut: {
    '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
    '100%': { opacity: '0', transform: 'translateY(-10px) scale(0.98)' },
  },
  marquee: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
  shimmer: {
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
  },
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
},
```