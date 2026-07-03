# Accessibility — WCAG 2.2 AA Compliance

BAZ is committed to meeting **WCAG 2.2 Level AA** across all digital products. This document defines the specific rules, testing criteria, and implementation patterns.

---

## 1. Color Contrast

### Minimum Ratios (WCAG AA)

| Element | Minimum Ratio | BAZ Implementation |
|---------|-------------|-------------------|
| Normal text (< 18px) | 4.5:1 | `ink-600` (#525252) on `paper` (#f5f1ea) = 6.3:1 ✅ |
| Large text (≥ 18px bold or ≥ 24px) | 3:1 | `ink-500` (#737373) on `paper` (#f5f1ea) = 4.6:1 ✅ |
| UI components & graphical objects | 3:1 | Violet accent on ink = 5.9:1 ✅ |
| Focus indicators | 3:1 | Violet ring on paper = 5.2:1 ✅ |

### Known Contrast Failures (AVOID)

| Foreground | Background | Ratio | Status |
|-----------|------------|-------|--------|
| `violet-500` on `paper` | `#8b5cf6` on `#f5f1ea` | 3.7:1 | ❌ Fails AA normal text |
| `ink-400` on `paper` | `#a3a3a3` on `#f5f1ea` | 2.9:1 | ❌ Fails AA |
| `paper` on `violet-500` | `#f5f1ea` on `#8b5cf6` | 3.7:1 | ❌ Fails AA normal text |

### Safe Color Pairings

| Pairing | Ratio | Use |
|---------|-------|-----|
| `ink-900` on `paper` | 17.2:1 | ✅ All text |
| `paper` on `ink-900` | 17.2:1 | ✅ All text (dark sections) |
| `white` on `ink-900` | 18.1:1 | ✅ All text |
| `violet-500` on `ink-900` | 5.9:1 | ✅ All text |
| `ink-600` on `paper` | 6.3:1 | ✅ All text |
| `ink-500` on `paper` | 4.6:1 | ✅ Large text + UI |
| `violet-300` on `ink-900` | 9.4:1 | ✅ All text (accent on dark) |

---

## 2. Focus Indicators

### Standard Focus Ring
Every interactive element must display a visible focus indicator on `:focus-visible`.

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--ring-color),    /* violet ring */
              0 0 0 4px var(--ring-offset-color); /* background offset */
}
```

### High Contrast Focus Ring
```css
@media (prefers-contrast: more) {
  :focus-visible {
    box-shadow: 0 0 0 3px var(--ring-color),
                0 0 0 6px var(--ring-offset-color);
  }
}
```

### Skip Link
```html
<a href="#main" class="skip-link">Skip to main content</a>
```
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: var(--accent);
  color: white;
  padding: var(--space-4);
  z-index: 9999;
  font-weight: 600;
}

.skip-link:focus {
  top: 0;
}
```

---

## 3. Keyboard Navigation

### Tab Order
All interactive elements must be reachable via keyboard in a logical, predictable order.

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus forward |
| `Shift+Tab` | Move focus backward |
| `Enter` | Activate buttons, links |
| `Space` | Activate buttons, toggle checkboxes |
| `Escape` | Close modals, dropdowns, tooltips |
| `Arrow keys` | Navigate within radios, tabs, menus |
| `Home/End` | Jump to first/last item in a group |

### Keyboard Trap Prevention
- Modals must trap focus while open and return focus on close
- Dropdown menus must cycle through options with arrow keys
- Never create keyboard traps in custom widgets

---

## 4. ARIA Guidance

### Landmark Roles
```html
<header role="banner">
<nav role="navigation">
<main role="main" id="main">
<footer role="contentinfo">
```

### Common ARIA Patterns

| Component | Role | ARIA Attributes |
|-----------|------|-----------------|
| Button | `button` | `aria-pressed`, `aria-expanded`, `aria-disabled` |
| Modal | `dialog` | `aria-modal="true"`, `aria-labelledby`, `aria-describedby` |
| Tab | `tablist` / `tab` / `tabpanel` | `aria-selected`, `aria-controls`, `aria-labelledby` |
| Dropdown | `listbox` / `option` | `aria-expanded`, `aria-activedescendant` |
| Toast | `alert` / `status` | `aria-live="polite"` or `"assertive"` |
| Toggle | `switch` | `aria-checked` |
| Loading | `progressbar` | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Navigation | `nav` | `aria-label="Main navigation"` |

### Screen Reader Announcements
```html
<div aria-live="polite" class="sr-only" id="announcer"></div>
```

Use this for dynamic content updates (form submissions, toast messages, etc.).

---

## 5. Screen Reader Support

### `.sr-only` Class
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Image Alt Text
- **Decorative images:** `alt=""` (empty alt, screen readers skip)
- **Informative images:** Descriptive alt text
- **Logo images:** `alt="BAZ Marketing Ventures Agency"`
- **Never** use `alt="image of..."` or `alt="picture of..."`

### Link Text
- ✅ "Get started with BAZ"
- ❌ "Click here"
- ❌ "Learn more" (without context)
- ❌ "Read more →" (without descriptive context)

---

## 6. Touch Targets

All interactive elements must have a minimum touch target size of **44×44px** (WCAG 2.2 SC 2.5.8).

| Element | Minimum Size | BAZ Size |
|---------|-------------|----------|
| Buttons | 44×44px | 48×48px (h-12) |
| Links (standalone) | 44×44px | Full line height + padding |
| Form inputs | 44×44px | 40px min (with 2px padding = 44px) |
| Checkboxes/Radios | 44×44px | 44×44px with invisible hit area |
| Icon buttons | 44×44px | 44×44px minimum |
| Nav items | 44×44px | Full height with vertical padding |

### Spacing Between Targets
Minimum 8px (`space-2`) between adjacent interactive elements to prevent accidental activation.

---

## 7. Color Blindness

### Design Rules
1. **Never** use color as the sole indicator of meaning
2. Form errors must use both color (danger red) AND an icon/text label
3. Status indicators must include both color AND shape/pattern
4. Charts must use patterns in addition to colors

### Safe Status Patterns

| Status | Color | Shape | Pattern |
|--------|-------|-------|---------|
| Success | Green | ✓ Checkmark | Solid fill |
| Warning | Amber | ⚠ Triangle | Striped fill |
| Error | Red | ✕ Circle | Dotted fill |
| Info | Violet | ℹ Circle | Solid fill |

### Color Blindness Simulation
Test all designs against:
- **Protanopia** (red-blind)
- **Deuteranopia** (green-blind)
- **Tritanopia** (blue-yellow-blind)

Use the built-in browser DevTools color vision simulation or Stark plugin.

---

## 8. Responsive Accessibility

### Text Sizing
- Base font: 16px minimum
- Never use `px` for font sizes in CSS — use `rem`
- All text must remain readable at 200% zoom
- No horizontal scrolling at 320px width

### Responsive Focus
- Focus indicators must remain visible at all breakpoints
- Touch targets must scale up on mobile (minimum 48px)
- Keyboard shortcuts must work across all device sizes

### Motion
- All animations must respect `prefers-reduced-motion`
- Auto-playing content must have pause controls
- No content that flashes more than 3 times per second

---

## 9. Semantic HTML

### Required Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Title — BAZ</title>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <header role="banner">
    <nav aria-label="Main navigation">...</nav>
  </header>
  <main id="main" role="main">
    <article>...</article>
  </main>
  <footer role="contentinfo">...</footer>
</body>
</html>
```

### Required Attributes
- All `<html>` elements: `lang="en"`
- All `<img>`: `alt` attribute (empty for decorative)
- All `<form>`: `aria-label` or visible `<label>`
- All `<button>`: visible text or `aria-label`
- All `<input>`: associated `<label>` or `aria-label`

---

## 10. Testing Checklist

### Automated Testing
- [ ] Lighthouse Accessibility score ≥ 95
- [ ] axe-core 0 violations
- [ ] WAVE 0 errors
- [ ] ESLint jsx-a11y plugin 0 warnings

### Manual Testing
- [ ] Tab through entire page — all interactive elements reachable
- [ ] Skip link works and moves focus to `#main`
- [ ] All images have appropriate alt text
- [ ] Color contrast verified with DevTools
- [ ] Page usable with JavaScript disabled (progressive enhancement)
- [ ] Screen reader testing (VoiceOver/NVDA)
- [ ] Keyboard-only navigation complete
- [ ] 200% zoom — no horizontal scroll, all content accessible
- [ ] `prefers-reduced-motion` — all animations stop
- [ ] `prefers-contrast: more` — borders and focus rings strengthen