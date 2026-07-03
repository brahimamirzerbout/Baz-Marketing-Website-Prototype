# BAZ Pattern & Background Assets

These SVG patterns are designed to be used as CSS background images with controlled opacity and blend modes.

---

## Usage in CSS

### Grid Pattern (paper sections)
```css
.bg-grid {
  background-image: url('/brand/assets/patterns/grid-pattern.svg');
  background-size: 40px 40px;
  opacity: 0.03;
}
```
Use on: `bg-paper` sections as subtle texture

### Mesh Gradient (ink sections)
```css
.bg-mesh {
  background-image: url('/brand/assets/patterns/mesh-gradient.svg');
  background-size: cover;
  opacity: 0.10;
}
```
Use on: Hero sections, ink backgrounds. Position at `top center` or `right top`.

### Paper Grain (all sections)
```css
.bg-grain {
  background-image: url('/brand/assets/patterns/paper-grain.svg');
  background-size: 200px 200px;
  opacity: 0.03;
  mix-blend-mode: overlay;
}
```
Use on: All sections for subtle organic texture. Repeats at 200px.

### Dot Pattern (paper sections)
```css
.bg-dots {
  background-image: url('/brand/assets/patterns/dot-pattern.svg');
  background-size: 20px 20px;
  opacity: 0.04;
}
```
Use on: Alternative to grid pattern for lighter texture

### Violet Gradient (CTAs)
```css
.bg-violet-gradient {
  background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #9985ff 100%);
}
```
Use on: Primary CTA buttons, hero accents

### Violet Shimmer (decorative)
```css
.bg-violet-shimmer {
  background: linear-gradient(
    90deg,
    rgba(139, 92, 246, 0.15) 0%,
    rgba(139, 92, 246, 0.4) 50%,
    rgba(139, 92, 246, 0.15) 100%
  );
}
```
Use on: Divider lines, animated accents, hover states

---

## Layer Recipe (Hero)
```html
<section class="bg-paper relative overflow-hidden">
  <div class="bg-grid absolute inset-0 opacity-[0.03]"></div>
  <div class="bg-mesh absolute inset-0 opacity-[0.08]"></div>
  <div class="bg-grain absolute inset-0 opacity-[0.03] mix-blend-overlay"></div>
  <!-- Content above -->
</section>
```

## Layer Recipe (Ink Section)
```html
<section class="bg-ink relative overflow-hidden">
  <div class="bg-mesh absolute inset-0 opacity-[0.12]"></div>
  <div class="bg-grain absolute inset-0 opacity-[0.03] mix-blend-overlay"></div>
  <!-- Content above -->
</section>
```

---

## Color Values for Reference

| Pattern | `currentColor` | Recommended opacity |
|---------|---------------|-------------------|
| Grid | `#0e0e0e` on paper, `#f5f1ea` on ink | 0.03–0.06 |
| Dots | `#0e0e0e` on paper, `#f5f1ea` on ink | 0.04–0.08 |
| Mesh | `#8b5cf6` (violet-500) | 0.08–0.15 |
| Grain | N/A (noise filter) | 0.03, mix-blend: overlay |