# Components — Full UI Inventory

BAZ uses the BlackSwan Design System for all components. These are **hand-rolled CSS components** built on custom properties — never shadcn/ui, never Radix UI primitives, never MUI.

Every component inherits from the three BlackSwan seed variables (`--seed-hue`, `--seed-sat`, `--seed-lum`) and automatically supports dark mode, reduced motion, and high contrast.

---

## 1. Button

### Purpose
Primary interaction element for all CTAs, form submissions, and navigation actions.

### Variants

| Variant | Background | Text | Border | Use |
|---------|-----------|------|--------|-----|
| `primary` | `bg-accent` (violet) | `text-white` | none | Main CTAs, form submits |
| `secondary` | `bg-ink-900` | `text-white` | none | Dark CTAs, secondary actions |
| `outline` | transparent | `text-ink-900` | `border-ink-200` | Tertiary actions |
| `ghost` | transparent | `text-ink-600` | none | Inline actions, icon buttons |
| `danger` | `bg-danger` | `text-white` | none | Destructive actions |
| `accent-outline` | transparent | `text-accent` | `border-accent` | Violet-bordered CTAs |

### Sizes

| Size | Height | Padding | Font Size | Radius |
|------|--------|---------|-----------|--------|
| `sm` | 36px | `px-4` | 13px | `--radius-fib5` |
| `md` | 40px | `px-5` | 14px | `--radius-fib8` |
| `lg` | 48px | `px-6` | 16px | `--radius-fib8` |
| `xl` | 56px | `px-7` | 16px | `--radius-fib13` |
| `2xl` | 64px | `px-8` | 18px | `--radius-fib13` |

### States

| State | Effect |
|-------|--------|
| `hover` | `translateY(-1px)`, shadow lift, `duration-200` |
| `active` | `translateY(0)`, shadow reduction |
| `focus` | `ring-2 ring-accent ring-offset-2` |
| `disabled` | `opacity-50`, `cursor-not-allowed`, no hover |
| `loading` | Spinner replaces text, `pointer-events-none` |

### HTML
```html
<button class="btn btn-primary btn-lg">
  Get Started
</button>
```

### Tailwind
```html
<button class="h-14 px-7 rounded-[8px] bg-accent text-white font-medium
               transition-all duration-200 hover:bg-accent-600
               hover:shadow-lift hover:-translate-y-0.5
               focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
  Get Started
</button>
```

### CSS
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-weight: 500;
  transition: all var(--duration-normal) var(--ease-default);
  cursor: pointer;
  border: none;
  outline: none;
}

.btn:focus-visible {
  box-shadow: 0 0 0 var(--ring-width) var(--ring-color),
              0 0 0 var(--ring-offset) var(--ring-offset-color);
}

.btn-primary {
  background: var(--color-primary);
  color: var(--fg-on-primary);
  border-radius: var(--radius-fib8);
}

.btn-primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

---

## 2. Input

### Variants
| Variant | Border | Background | Use |
|---------|--------|-----------|-----|
| `default` | `border` | `bg` | Standard text input |
| `filled` | none | `bg-muted` | Search, inline forms |
| `ghost` | `border-transparent` | transparent | Minimal forms |

### States
| State | Effect |
|-------|--------|
| `focus` | `ring-2 ring-accent`, border accent |
| `error` | `ring-2 ring-danger`, border danger, helper text red |
| `disabled` | `opacity-50`, `cursor-not-allowed` |

### Sizes
| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 36px | `px-3` | 13px |
| `md` | 40px | `px-4` | 14px |
| `lg` | 48px | `px-4` | 16px |

---

## 3. Card

### Variants
| Variant | Background | Border | Shadow | Use |
|---------|-----------|--------|--------|-----|
| `default` | `bg` | `border` | `shadow-sm` | Standard content |
| `flat` | `bg` | none | none | Embedded content |
| `bordered` | `bg` | `border-strong` | none | Structured content |
| `ghost` | transparent | none | none | Minimal grouping |
| `highlight` | `primary-bg` | `primary-border` | none | Featured content |

### Layout
```css
.card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-fib13); /* 13px */
  padding: var(--space-6); /* 24px */
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-normal) var(--ease-default);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### Stat Grid Card (Recurring Pattern)
```html
<div class="bg-paper p-6 md:p-8">
  <p class="font-display text-3xl md:text-5xl font-medium tracking-[-0.03em]">
    240+
  </p>
  <p class="mt-2 font-mono uppercase tracking-[0.18em] text-[11px] text-ink-500">
    brands
  </p>
</div>
```

---

## 4. Badge

### Variants
6 colors (default, primary, success, warning, danger, neutral) × 3 sizes (sm, md, lg)

| Size | Padding | Font Size | Radius |
|------|---------|-----------|--------|
| `sm` | `px-2 py-0.5` | 10px | `--radius-fib3` |
| `md` | `px-2.5 py-1` | 12px | `--radius-fib5` |
| `lg` | `px-3 py-1.5` | 13px | `--radius-fib5` |

### With Dot Indicator
```html
<span class="badge badge-primary badge-md">
  <span class="badge-dot"></span>
  Active
</span>
```

---

## 5. Alert

### Variants
4 severity levels: `info`, `success`, `warning`, `danger`

```html
<div class="alert alert-info" role="alert">
  <svg class="alert-icon"><!-- info icon --></svg>
  <div class="alert-content">
    <p class="alert-title">Information</p>
    <p class="alert-body">This is an informational alert message.</p>
  </div>
</div>
```

### Colors
| Severity | Background | Border | Icon | Text |
|----------|-----------|--------|------|------|
| `info` | `primary-bg` | `primary-border` | `primary` | `primary-fg` |
| `success` | `success-bg` | `success-border` | `success` | `success-fg` |
| `warning` | `warning-bg` | `warning-border` | `warning` | `warning-fg` |
| `danger` | `danger-bg` | `danger-border` | `danger` | `danger-fg` |

---

## 6. Modal

### Sizes
| Size | Max Width | Padding | Radius |
|------|----------|---------|--------|
| `sm` | 400px | `space-6` | `--radius-fib13` |
| `md` | 560px | `space-8` | `--radius-fib13` |
| `lg` | 720px | `space-10` | `--radius-fib21` |
| `xl` | 960px | `space-12` | `--radius-fib21` |

### Overlay
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(14, 14, 14, 0.6);
  backdrop-filter: blur(4px);
  z-index: var(--z-modal);
}
```

### Animation
```css
.modal-enter {
  animation: modal-in var(--duration-normal) var(--ease-bounce);
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
```

---

## 7. Toast

### Position
Bottom-right, stacked with `space-2` gap.

### Variants
Same 4 severity levels as Alert.

### Animation
```css
.toast-enter { animation: toast-in var(--duration-normal) var(--ease-out); }
.toast-exit  { animation: toast-out var(--duration-normal) var(--ease-in); }

@keyframes toast-in {
  from { opacity: 0; transform: translateX(100%); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes toast-out {
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(100%); }
}
```

---

## 8. Navbar

### Structure
```
┌──────────────────────────────────────────────┐
│ [BAZ mark]  Services  Work  About  [CTA →]   │
│  24×24       ── Inter 14px ────────  Button   │
└──────────────────────────────────────────────┘
```

### Behavior
- **Default:** Transparent background, subtle shadow
- **Scrolled:** `bg-paper/95 backdrop-blur-md shadow-sm`
- **Mobile:** Hamburger menu, full-screen overlay

### Sticky Header
```html
<header class="sticky top-0 z-50 bg-paper/95 backdrop-blur-md
               border-b border-ink-100/50 transition-all duration-300">
  <nav class="container mx-auto flex items-center justify-between h-16 px-6">
    <!-- Logo -->
    <!-- Nav links -->
    <!-- CTA -->
  </nav>
</header>
```

---

## 9. Footer

### Structure
```
┌─────────────────────────────────────────────────┐
│ [BAZ mark]                                       │
│ Marketing Ventures Agency                        │
│                                                   │
│ Services   Work   About   Contact               │
│                                                   │
│ ─────────────────────────────────────────────── │
│ © 2025 BAZ. All rights reserved.  Twitter  LI  │
└─────────────────────────────────────────────────┘
```

### 4-Column Grid (Desktop)
```html
<footer class="bg-ink-900 text-paper-300">
  <div class="container mx-auto py-20">
    <div class="grid lg:grid-cols-12 gap-10">
      <!-- Brand column: 4 cols -->
      <!-- Services: 2 cols -->
      <!-- Company: 2 cols -->
      <!-- Contact: 4 cols -->
    </div>
    <!-- Bottom bar -->
    <div class="mt-16 pt-8 border-t border-neutral-700 flex justify-between">
      <p class="text-sm text-paper-400">© 2025 BAZ. All rights reserved.</p>
      <!-- Social links -->
    </div>
  </div>
</footer>
```

---

## 10. Table

### Structure
```html
<div class="overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="border-b border-paper-200">
        <th class="text-left py-3 px-4 font-mono text-[11px] uppercase tracking-[0.18em]">
          Label
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-paper-100 hover:bg-paper-50 transition-colors">
        <td class="py-3 px-4">Data</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Striped Variant
Add `striped` class for alternating row backgrounds using `bg-paper-50` on even rows.

---

## 11. CTA (Call to Action)

### Primary Pattern (Visual Weight Order)
1. **Primary** — `bg-accent text-white hover:bg-accent-600 shadow-soft hover:shadow-lift hover:-translate-y-0.5`
2. **Outline** — `border-ink-200 hover:border-ink-900 hover:bg-paper`
3. **Ghost** — `hover:bg-ink-100` (no border)

### Magnetic CTA
Wrap the primary CTA in `<Magnetic strength={0.3}>` for the pull-toward-cursor effect on desktop.

```html
<Magnetic strength={0.3}>
  <button class="btn btn-primary btn-xl rounded-full">
    Get Started →
  </button>
</Magnetic>
```

All buttons: `rounded-full`, `h-14`, `px-7`, `font-medium`, `transition-all duration-200`.

---

## 12. Hero Section

### Pattern
```html
<section class="bg-paper relative overflow-hidden">
  <div class="bg-grid opacity-50 absolute inset-0"></div>
  <div class="bg-mesh opacity-90 absolute inset-0"></div>
  <div class="bg-grain absolute inset-0"></div>
  
  <div class="container mx-auto relative pt-16 pb-20 md:pt-24 md:pb-32">
    <div class="max-w-5xl">
      <p class="font-mono uppercase tracking-[0.18em] text-[11px] text-accent">
        ● Brand & Identity
      </p>
      <h1 class="font-display text-[clamp(2.5rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[0.95] mt-6">
        Brand & Buzz.
      </h1>
      <p class="font-display text-[clamp(1.5rem,2.5vw,2rem)] tracking-[-0.02em] mt-6 text-ink-600">
        We make brands unignorable.
      </p>
      <div class="flex gap-4 mt-10">
        <button class="btn btn-primary btn-lg rounded-full">Get Started</button>
        <button class="btn btn-outline btn-lg rounded-full">Our Work</button>
      </div>
    </div>
  </div>
</section>
```

---

## 13. Remaining Component Summary

| Component | Key Specs | Radius | Animation |
|-----------|----------|--------|-----------|
| **Checkbox** | 20px × 20px, `border-ink-200`, accent fill on check | `--radius-fib3` | `duration-fast` |
| **Switch** | 44px × 24px, accent track when on | `--radius-full` | `duration-normal ease-bounce` |
| **Radio** | 20px × 20px, accent dot when selected | `--radius-full` | `duration-fast` |
| **Dropdown** | Min 200px width, `shadow-lg` | `--radius-fib13` | `duration-normal ease-out` |
| **Tabs** | Underline style, accent active indicator | `--radius-none` | `duration-normal` |
| **Accordion** | Chevron rotation on expand | `--radius-none` | `duration-normal ease-default` |
| **Breadcrumb** | `/` separator, `text-sm` | — | — |
| **Pagination** | `h-10 w-10`, accent active page | `--radius-fib5` | `duration-fast` |
| **Tooltip** | `text-xs`, `bg-ink-900 text-paper`, max 240px | `--radius-fib5` | `duration-instant` |
| **Avatar** | 6 sizes (24–96px), status dot bottom-right | `--radius-full` | — |
| **Skeleton** | Shimmer animation, `bg-paper-100` | Inherited | `1.5s ease-in-out infinite` |
| **Separator** | 5 styles: solid, dashed, dotted, double, gradient | — | — |