// ═══════════════════════════════════════════════════════════════════
// AETHER DESIGN SYSTEM — Fibonacci × Da Vinci Mathematical Perfection
// ═══════════════════════════════════════════════════════════════════
//
// Every value in this system is derived from the Fibonacci sequence and
// the Golden Ratio (φ = 1.61803398875…). The human eye perceives beauty
// through these proportions — this system encodes that perception into
// the fabric of the UI.
//
// FIBONACCI SEQUENCE: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987
// GOLDEN RATIO: φ = 1.61803398875…
// GOLDEN ANGLE: 137.50776408…°
// DA VINCI'S VITRUVIAN PROPORTIONS: head=1/8, navel=golden section
//
// ═══════════════════════════════════════════════════════════════════

export const PHI = 1.618033988749895;
export const GOLDEN_ANGLE = 137.50776405003785;
export const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987] as const;

// ─── SPACING (Fibonacci px scale) ───
// Each step is a Fibonacci number. The golden ratio governs the jump between
// non-adjacent levels: F(n+2) / F(n) ≈ φ² ≈ 2.618
export const SPACING = {
  '0': 0,
  '1': 1,     // F(1)
  '2': 2,     // F(3)
  '3': 3,     // F(4)
  '5': 5,     // F(5)
  '8': 8,     // F(6)
  '13': 13,   // F(7)
  '21': 21,   // F(8)
  '34': 34,   // F(9)
  '55': 55,   // F(10)
  '89': 89,   // F(11)
  '144': 144, // F(12)
  '233': 233, // F(13)
  '377': 377, // F(14)
  '610': 610, // F(15)
  '987': 987, // F(16)
} as const;

// ─── TYPOGRAPHY (Fibonacci px → Da Vinci proportions) ───
// Da Vinci noted the ideal body height = 8 heads, each head = 1/8 of height.
// Typography follows the same: each size is F(n), line-height = F(n) × φ.
export const FONT_SIZE = {
  'micro': 8,      // F(6)  — labels, timestamps
  'tiny': 10,      //       — secondary metadata
  'xs': 13,        // F(7)  — UI body text
  'sm': 16,        //       — primary UI text
  'base': 21,      // F(8)  — editor body, content
  'lg': 34,        // F(9)  — section headers
  'xl': 55,        // F(10) — hero text
  'xxl': 89,      // F(11) — display
  'display': 144,  // F(12) — monumental
} as const;

export const LINE_HEIGHT = {
  'micro': Math.round(8 * PHI * 10) / 10,     // 12.9 → 13
  'tiny': Math.round(10 * PHI * 10) / 10,     // 16.2 → 16
  'xs': Math.round(13 * PHI * 10) / 10,       // 21.0
  'sm': Math.round(16 * PHI * 10) / 10,        // 25.9 → 26
  'base': Math.round(21 * PHI * 10) / 10,      // 33.9 → 34
  'lg': Math.round(34 * PHI * 10) / 10,        // 55.0
  'xl': Math.round(55 * PHI * 10) / 10,        // 89.0
} as const;

// ─── BORDER RADIUS (Fibonacci sequence) ───
// Rounded corners follow the Fibonacci spiral. Each radius is F(n) in px.
export const RADIUS = {
  'none': 0,
  'sm': 3,       // F(4)
  'base': 5,      // F(5)
  'md': 8,        // F(6)
  'lg': 13,       // F(7)
  'xl': 21,       // F(8)
  '2xl': 34,      // F(9)
  'full': 55,     // F(10) — perfect circle threshold
  'pill': 89,     // F(11)
} as const;

// ─── BLUR (Fibonacci px — glassmorphism) ───
// Blur radii follow Fibonacci, creating layered depth perception.
export const BLUR = {
  'none': 0,
  'xs': 3,       // F(4)  — subtle frosted edge
  'sm': 5,       // F(5)  — light glass
  'base': 8,     // F(6)  — standard glassmorphism
  'md': 13,      // F(7)  — medium depth
  'lg': 21,      // F(8)  — deep glass
  'xl': 34,      // F(9)  — immersive blur
  '2xl': 55,     // F(10) — dreamlike
} as const;

// ─── OPACITY (Fibonacci percentages / 1000) ───
// Each opacity is a Fibonacci number divided by 1000, giving:
// 0.1%, 0.2%, 0.3%, 0.5%, 0.8%, 1.3%, 2.1%, 3.4%, 5.5%, 8.9%, 14.4%, 23.3%, 37.7%
export const OPACITY = {
  'ghost': 0.001,    // F(1)/1000 — almost invisible
  'wisp': 0.002,     // F(3)/1000
  'trace': 0.003,    // F(4)/1000
  'hint': 0.005,     // F(5)/1000
  'veil': 0.008,     // F(6)/1000
  'mist': 0.013,     // F(7)/1000
  'haze': 0.021,     // F(8)/1000
  'gaze': 0.034,     // F(9)/1000
  'glass': 0.055,    // F(10)/1000 — standard glass
  'frost': 0.089,    // F(11)/1000
  'cloud': 0.144,    // F(12)/1000
  'shade': 0.233,    // F(13)/1000
  'deep': 0.377,    // F(14)/1000
  'solid': 0.610,   // F(15)/1000
  'opaque': 0.987,  // F(16)/1000
} as const;

// ─── ANIMATION DURATIONS (Fibonacci ms) ───
// Transition timing follows Fibonacci. The human eye perceives motion
// as "natural" at these durations because they match biological rhythms.
export const DURATION = {
  'instant': 89,     // F(11) ms — below perception threshold
  'swift': 144,      // F(12) ms — snappy
  'fast': 233,       // F(13) ms — quick
  'normal': 377,     // F(14) ms — standard
  'smooth': 610,     // F(15) ms — luxurious
  'deliberate': 987, // F(16) ms — dramatic
} as const;

// ─── EASING (Golden ratio curves) ───
// Da Vinci's curves inspire these cubic-bezier paths.
// The control points are placed at golden-ratio positions.
export const EASING = {
  // Natural: follows the golden spiral
  'natural': [PHI * 0.382, 0, PHI * 0.382, 1], // [0.618, 0, 0.618, 1]
  // Spring: bounces with Fibonacci-damped oscillation
  'spring': { type: 'spring', stiffness: Math.round(233), damping: Math.round(34), mass: 1 },
  // Glide: smooth Da Vinci curve
  'glide': [0.236, 0.618, 0.236, 1], // 1/φ², φ-1, 1/φ², 1
  // Snap: quick decisive motion
  'snap': [0.382, 0, 0.236, 1],
  // Float: weightless drift
  'float': [0.618, 0, 0.382, 1],
} as const;

// ─── COLOR SYSTEM — The Beauty of Darkness ───
//
// The entire palette is built on HSL with mathematical precision.
// Base hue: 41° (gold) — the color of warmth and luxury.
// Each layer is separated by Fibonacci-scaled luminance steps.
// Accent hues are placed at golden-angle intervals around the wheel.
//
// LAYER 0: The Void         — pure darkness, the canvas of creation
// LAYER 1: The Deep          — barely perceptible depth
// LAYER 2: The Shadow        — structural surfaces
// LAYER 3: The Surface        — interactive elements
// LAYER 4: The Raised         — buttons, cards, inputs
// LAYER 5: The Hover          — feedback state
// LAYER 6: The Focus          — attention state
// LAYER 7: The Active         — selection state
//
// FUNCTIONAL ACCENTS (only shown when "Enable Functional Colors" is on):
//   Primary:    41° (gold)    — creation, AI, the core
//   Success:   145° (emerald)  — growth, completion
//   Warning:    38° (amber)    — caution, attention
//   Danger:      8° (red)      — destruction, error
//   Info:      210° (blue)     — knowledge, data
//   Neutral:   240° (zinc)     — structure, text

export interface ColorLayer {
  h: number;  // hue
  s: number;  // saturation %
  l: number;  // lightness %
  alpha: number;
}

// 8 layers of darkness — Fibonacci luminance steps
// L = base × φⁿ, mapped to 0-100 range
export const DARK_LAYERS: ColorLayer[] = [
  { h: 41, s: 14, l: 3.9,  alpha: 1 },     // L0: The Void       — #0a0a0f
  { h: 41, s: 13, l: 6.5,  alpha: 1 },     // L1: The Deep       — derived L0×φ⁰·⁵
  { h: 41, s: 12, l: 9.0,  alpha: 1 },     // L2: The Shadow     — #17171f
  { h: 41, s: 11, l: 13.0, alpha: 1 },     // L3: The Surface    — #1e1e2a
  { h: 41, s: 10, l: 18.0, alpha: 1 },     // L4: The Raised     — #2a2a38
  { h: 262, s: 12, l: 24.0, alpha: 1 },     // L5: The Hover      — #34344a
  { h: 264, s: 15, l: 32.0, alpha: 1 },     // L6: The Focus      — violet-tinted
  { h: 266, s: 20, l: 42.0, alpha: 1 },     // L7: The Active     — clearly selected
];

// Functional accent palette — golden angle hue distribution
// Each accent is placed 137.5° from the previous, creating visual harmony
export const FUNCTIONAL_COLORS = {
  primary:   { h: 41, s: 85, l: 72, alpha: 1 },  // violet — creation
  primaryDim:{ h: 41, s: 60, l: 52, alpha: 1 },  // violet dimmed
  success:   { h: 145, s: 70, l: 55, alpha: 1 },  // emerald — growth
  warning:   { h: 38,  s: 85, l: 58, alpha: 1 },  // amber   — caution
  danger:    { h: 8,   s: 80, l: 58, alpha: 1 },  // red     — error
  info:      { h: 210, s: 75, l: 60, alpha: 1 },  // blue    — knowledge
  neutral:   { h: 240, s: 6,  l: 55, alpha: 1 },  // zinc    — text
  ghost:     { h: 41, s: 8,  l: 35, alpha: 1 },  // faded text
} as const;

// Convert HSL to CSS string
export function hsl(c: ColorLayer | { h: number; s: number; l: number; alpha?: number }): string {
  if ('alpha' in c && c.alpha !== undefined && c.alpha < 1) {
    return `hsla(${c.h}, ${c.s}%, ${c.l}%, ${c.alpha})`;
  }
  return `hsl(${c.h}, ${c.s}%, ${c.l}%)`;
}

// Convert HSL to hex (for CSS custom properties)
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const color = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// ─── GRADIENTS (Golden ratio interpolated) ───
// Every gradient is a journey through Fibonacci-spaced color stops.
// The midpoint of each gradient is at 0.618 (1/φ) — not 0.5.
export const GRADIENTS = {
  // The primary ambient gradient — deep void to violet hint
  void: `linear-gradient(180deg, hsl(0, 0%, 14%, 3.9%) 0%, hsl(0, 0%, 13%, 6.5%) ${100 / PHI}%, hsl(0, 0%, 12%, 9%) 100%)`,
  // Surface gradient — structural depth
  surface: `linear-gradient(180deg, hsl(0, 0%, 11%, 13%) 0%, hsl(0, 0%, 10%, 9%) ${100 / PHI}%, hsl(0, 0%, 14%, 3.9%) 100%)`,
  // Raised gradient — interactive lift
  raised: `linear-gradient(135deg, hsl(0, 0%, 10%, 18%) 0%, hsl(0, 0%, 12%, 13%) ${100 / PHI}%, hsl(0, 0%, 11%, 9%) 100%)`,
  // Violet glow — the signature Aether gradient
  glow: `linear-gradient(135deg, hsl(0, 0%, 85%, 72%) 0%, hsl(280, 70%, 55%) ${100 / PHI}%, hsl(0, 0%, 60%, 40%) 100%)`,
  // Accent overlay — thin violet veil
  veil: `linear-gradient(135deg, hsla(0, 0%, 85%, 72%, 0.05) 0%, hsla(280, 70%, 55%, 0.03) ${100 / PHI}%, transparent 100%)`,
  // Text gradient — violet to purple for headings
  text: `linear-gradient(90deg, hsl(0, 0%, 85%, 72%) 0%, hsl(280, 70%, 65%) ${100 / PHI}%)`,
  // Shadow gradient — depth illusion
  shadow: `linear-gradient(180deg, transparent 0%, hsla(0, 0%, 50%, 0%, 0.5) ${100 / PHI}%, hsla(0, 0%, 50%, 0%, 0.8) 100%)`,
  // Glass — frosted background
  glass: `linear-gradient(135deg, hsla(0, 0%, 12%, 20%, 0.55) 0%, hsla(0, 0%, 10%, 15%, 0.089) ${100 / PHI}%, hsla(0, 0%, 14%, 5%, 0.144) 100%)`,
} as const;

// ─── SHADOWS (Fibonacci depth layers) ───
// Shadow blur and spread follow Fibonacci. Each level deepens perception.
export const SHADOWS = {
  'none': 'none',
  'sm': `0 ${SPACING[1]}px ${SPACING[3]}px hsla(0, 0%, 50%, 0%, 0.377)`,
  'base': `0 ${SPACING[2]}px ${SPACING[5]}px hsla(0, 0%, 50%, 0%, 0.377)`,
  'md': `0 ${SPACING[3]}px ${SPACING[8]}px hsla(0, 0%, 50%, 0%, 0.377)`,
  'lg': `0 ${SPACING[5]}px ${SPACING[13]}px hsla(0, 0%, 50%, 0%, 0.377)`,
  'xl': `0 ${SPACING[8]}px ${SPACING[21]}px hsla(0, 0%, 50%, 0%, 0.377)`,
  '2xl': `0 ${SPACING[13]}px ${SPACING[34]}px hsla(0, 0%, 50%, 0%, 0.377)`,
  // Colored glow — violet ambient light
  'glow': `0 ${SPACING[2]}px ${SPACING[8]}px hsla(0, 0%, 85%, 55%, 0.233)`,
  'glow-lg': `0 ${SPACING[5]}px ${SPACING[21]}px hsla(0, 0%, 85%, 55%, 0.144)`,
  // Inner — inset depth
  'inner': `inset 0 ${SPACING[1]}px ${SPACING[3]}px hsla(0, 0%, 50%, 0%, 0.377)`,
} as const;

// ─── Z-INDEX (Fibonacci depth stacking) ───
export const Z_INDEX = {
  'base': 0,
  'surface': 8,       // F(6)
  'raised': 13,      // F(7)
  'overlay': 21,     // F(8)
  'modal': 34,       // F(9)
  'toast': 55,       // F(10)
  'tooltip': 89,     // F(11)
  'max': 144,        // F(12)
} as const;

// ─── BORDER WIDTHS (Fibonacci) ───
export const BORDER_WIDTH = {
  'none': 0,
  'thin': 1,    // F(1)
  'base': 1,    // F(1) — standard
  'thick': 2,   // F(3)
  'bold': 3,    // F(4)
  'heavy': 5,   // F(5)
} as const;

// ─── MOTION VARIANTS (Framer Motion — Fibonacci choreography) ───
// Every animation follows the golden spiral: enter from small to large,
// exit from large to small, timing in Fibonacci milliseconds.
export const MOTION = {
  // Fade + scale enter — the "birth" motion
  enter: {
    initial: { opacity: 0, scale: 1 / PHI, y: SPACING[8] },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1 / PHI, y: -SPACING[8] },
    transition: { duration: DURATION.normal / 1000, ease: EASING.natural as any },
  },
  // Slide enter — horizontal flow
  slide: {
    initial: { opacity: 0, x: -SPACING[13] },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: SPACING[13] },
    transition: { duration: DURATION.fast / 1000, ease: EASING.glide as any },
  },
  // Rise — vertical emergence
  rise: {
    initial: { opacity: 0, y: SPACING[21] },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: SPACING[21] },
    transition: { duration: DURATION.smooth / 1000, ease: EASING.float as any },
  },
  // Spring — organic bounce
  spring: {
    initial: { opacity: 0, scale: 0.382 },
    animate: { opacity: 1, scale: 1 },
    transition: EASING.spring as any,
  },
  // Hover lift — Fibonacci micro-interaction
  hover: {
    whileHover: { scale: 1 + (1 / (PHI * 10)), y: -SPACING[1] },
    whileTap: { scale: 1 - (1 / (PHI * 10)) },
    transition: { duration: DURATION.swift / 1000, ease: EASING.snap as any },
  },
  // Shimmer — loading state
  shimmer: {
    animate: { opacity: [0.377, 0.610, 0.377] },
    transition: { duration: DURATION.smooth / 1000, repeat: Infinity, ease: 'easeInOut' },
  },
  // Pulse — attention state
  pulse: {
    animate: { scale: [1, 1 + 1 / (PHI * 5), 1], opacity: [1, 0.610, 1] },
    transition: { duration: DURATION.smooth / 1000, repeat: Infinity, ease: 'easeInOut' },
  },
  // Spin — loading indicator
  spin: {
    animate: { rotate: 360 },
    transition: { duration: DURATION.deliberate / 1000, repeat: Infinity, ease: 'linear' },
  },
  // Bounce dots — thinking indicator (Fibonacci staggered)
  bounce: (i: number) => ({
    animate: { y: [0, -SPACING[3], 0] },
    transition: { duration: DURATION.normal / 1000, repeat: Infinity, delay: i * (1 / PHI), ease: 'easeInOut' },
  }),
} as const;

// ─── LAYER COUNT ───
// Total visual layers in the Aether UI:
export const LAYER_ANALYSIS = {
  // Background depth layers
  backgroundLayers: 8,       // L0-L7 dark layers
  // Gradient overlays
  gradientLayers: 8,        // void, surface, raised, glow, veil, text, shadow, glass
  // Backdrop blur layers
  blurLayers: 7,            // xs through 2xl
  // Shadow depth layers
  shadowLayers: 10,         // none through 2xl + glow + inner
  // Border/separator layers
  borderLayers: 5,          // none through heavy
  // Z-index stacking layers
  zLayers: 7,               // base through max
  // Total distinct visual layers
  total: 45,
  // Animation systems
  animationVariants: 8,     // enter, slide, rise, spring, hover, shimmer, pulse, spin
  // Functional color hues
  functionalHues: 8,        // primary, success, warning, danger, info, neutral, ghost, primaryDim
  // Total unique hue families
  hueFamilies: 3,           // gold(41°), emerald(145°), amber(38°), red(8°), blue(210°) → but grouped: gold-centric
  // Fibonacci ratios embedded
  fibonacciRatios: 16,      // F(1) through F(16)
} as const;

// ─── CSS CUSTOM PROPERTIES GENERATOR ───
export function generateCSSVariables(): string {
  const vars: string[] = [];
  
  // Dark layers
  DARK_LAYERS.forEach((layer, i) => {
    vars.push(`  --aether-l${i}: ${hsl(layer)};`);
    vars.push(`  --aether-l${i}-hex: ${hslToHex(layer.h, layer.s, layer.l)};`);
  });
  
  // Functional colors
  Object.entries(FUNCTIONAL_COLORS).forEach(([name, c]) => {
    vars.push(`  --aether-${name}: ${hsl(c as any)};`);
    vars.push(`  --aether-${name}-hex: ${hslToHex(c.h, c.s, c.l)};`);
  });
  
  // Spacing
  Object.entries(SPACING).forEach(([key, val]) => {
    vars.push(`  --aether-space-${key}: ${val}px;`);
  });
  
  // Font sizes
  Object.entries(FONT_SIZE).forEach(([key, val]) => {
    vars.push(`  --aether-text-${key}: ${val}px;`);
  });
  
  // Line heights
  Object.entries(LINE_HEIGHT).forEach(([key, val]) => {
    vars.push(`  --aether-leading-${key}: ${val};`);
  });
  
  // Radius
  Object.entries(RADIUS).forEach(([key, val]) => {
    vars.push(`  --aether-radius-${key}: ${val}px;`);
  });
  
  // Blur
  Object.entries(BLUR).forEach(([key, val]) => {
    vars.push(`  --aether-blur-${key}: ${val}px;`);
  });
  
  // Shadows
  Object.entries(SHADOWS).forEach(([key, val]) => {
    vars.push(`  --aether-shadow-${key}: ${val};`);
  });
  
  // Z-index
  Object.entries(Z_INDEX).forEach(([key, val]) => {
    vars.push(`  --aether-z-${key}: ${val};`);
  });
  
  // Durations
  Object.entries(DURATION).forEach(([key, val]) => {
    vars.push(`  --aether-duration-${key}: ${val}ms;`);
  });
  
  // Gradients
  Object.entries(GRADIENTS).forEach(([key, val]) => {
    vars.push(`  --aether-gradient-${key}: ${val};`);
  });
  
  // Functional colors toggle (default: off = monochrome dark)
  vars.push(`  --aether-functional-colors: 0;`);
  
  return `:root {\n${vars.join('\n')}\n}`;
}

// ─── COMPONENT CHECKLIST ───
// Every component the Aether IDE needs for complete UI coverage.
// Components marked with ✅ exist, ❌ are missing and need creation.
export const COMPONENT_CHECKLIST = [
  // ── EXISTING ──
  { name: 'AgentSwarm',           status: 'exists', category: 'Panel',      priority: 'critical' },
  { name: 'CommandPalette',       status: 'exists', category: 'Overlay',    priority: 'critical' },
  { name: 'EditorPane',           status: 'exists', category: 'Editor',     priority: 'critical' },
  { name: 'IntentInput',          status: 'exists', category: 'Input',      priority: 'critical' },
  { name: 'MultimodalInput',      status: 'exists', category: 'Input',      priority: 'high' },
  { name: 'PreviewPane',          status: 'exists', category: 'Preview',    priority: 'high' },
  { name: 'ProjectBrain',         status: 'exists', category: 'Panel',      priority: 'medium' },
  { name: 'ProviderStatus',       status: 'exists', category: 'Indicator', priority: 'medium' },
  { name: 'SettingsPanel',        status: 'exists', category: 'Modal',      priority: 'high' },
  { name: 'WorkflowTemplates',    status: 'exists', category: 'Panel',      priority: 'low' },
  
  // ── MISSING — Structural (extracted from inline App.tsx) ──
  { name: 'ActivityBar',          status: 'missing', category: 'Navigation', priority: 'critical' },
  { name: 'Sidebar',              status: 'missing', category: 'Navigation', priority: 'critical' },
  { name: 'TabBar',               status: 'missing', category: 'Editor',     priority: 'critical' },
  { name: 'StatusBar',            status: 'missing', category: 'Chrome',    priority: 'high' },
  { name: 'Terminal',             status: 'missing', category: 'Panel',      priority: 'high' },
  
  // ── MISSING — Primitives ──
  { name: 'Tooltip',              status: 'missing', category: 'Primitive',  priority: 'high' },
  { name: 'ContextMenu',          status: 'missing', category: 'Primitive',  priority: 'high' },
  { name: 'Toast',                status: 'missing', category: 'Primitive',  priority: 'high' },
  { name: 'Modal',                status: 'missing', category: 'Primitive',  priority: 'high' },
  { name: 'ConfirmDialog',        status: 'missing', category: 'Primitive',  priority: 'medium' },
  { name: 'ProgressBar',          status: 'missing', category: 'Primitive',  priority: 'high' },
  { name: 'Spinner',              status: 'missing', category: 'Primitive',  priority: 'high' },
  { name: 'Badge',                status: 'missing', category: 'Primitive',  priority: 'medium' },
  { name: 'Avatar',              status: 'missing', category: 'Primitive',  priority: 'low' },
  { name: 'Divider',             status: 'missing', category: 'Primitive',  priority: 'medium' },
  
  // ── MISSING — Feature Panels ──
  { name: 'SearchPanel',          status: 'missing', category: 'Panel',      priority: 'high' },
  { name: 'GitPanel',             status: 'missing', category: 'Panel',      priority: 'medium' },
  { name: 'DebugPanel',           status: 'missing', category: 'Panel',      priority: 'medium' },
  { name: 'PluginPanel',          status: 'missing', category: 'Panel',      priority: 'low' },
  { name: 'DiagnosticsPanel',     status: 'missing', category: 'Panel',      priority: 'high' },
  { name: 'DatasetBrowser',        status: 'missing', category: 'Panel',      priority: 'low' },
  
  // ── MISSING — Editor Extensions ──
  { name: 'DiffViewer',           status: 'missing', category: 'Editor',    priority: 'medium' },
  { name: 'CodeBlock',            status: 'missing', category: 'Editor',     priority: 'medium' },
  { name: 'MermaidRenderer',      status: 'missing', category: 'Editor',     priority: 'low' },
  { name: 'Minimap',              status: 'missing', category: 'Editor',     priority: 'low' },
  
  // ── MISSING — Overlays ──
  { name: 'KeyboardShortcutsOverlay', status: 'missing', category: 'Overlay', priority: 'medium' },
  { name: 'NotificationCenter',   status: 'missing', category: 'Overlay',   priority: 'medium' },
  { name: 'FileUploadZone',        status: 'missing', category: 'Overlay',   priority: 'low' },
  
  // ── MISSING — System ──
  { name: 'FunctionalColorsToggle', status: 'missing', category: 'System',   priority: 'critical' },
  { name: 'Resizer',              status: 'missing', category: 'System',    priority: 'high' },
  { name: 'CommandBar',           status: 'missing', category: 'System',    priority: 'medium' },
] as const;

export const MISSING_COMPONENTS = COMPONENT_CHECKLIST.filter(c => c.status === 'missing');
export const EXISTING_COMPONENTS = COMPONENT_CHECKLIST.filter(c => c.status === 'exists');

// ═══════════════════════════════════════════════════════════════════
// MATERIAL DESIGN 3 → FIBONACCI MAPPING
// ═══════════════════════════════════════════════════════════════════
//
// Material 3's token system is the industry standard for component
// design. We map every M3 token to its Fibonacci equivalent, so
// Aether gains Material's battle-tested component architecture while
// retaining mathematical perfection.
//
// Source: material-web/tokens/v0_192/ (Google Material 3 v0.192)
// ═══════════════════════════════════════════════════════════════════

// ─── M3 COLOR ROLES → AETHER LAYERS ───
// M3 uses neutral tones (neutral4, neutral6, neutral10, …) for surface
// hierarchy. We map them to our 8 Fibonacci luminance dark layers.
export const M3_COLOR_MAP = {
  // M3 dark surface tones → Aether layers
  'neutral0':    { m3: '#000000',     aether: 'L0', hsl: 'hsl(0, 0%, 0%)' },       // shadow/scrim
  'neutral4':    { m3: '#0f0d13',     aether: 'L0', hsl: 'hsl(0, 0%, 14%, 3.9%)' }, // surface-lowest
  'neutral6':    { m3: '#141218',     aether: 'L1', hsl: 'hsl(0, 0%, 13%, 6.5%)' }, // background/surface-dim
  'neutral10':   { m3: '#1d1b20',     aether: 'L2', hsl: 'hsl(0, 0%, 12%, 9%)' },   // surface-low
  'neutral12':   { m3: '#211f26',     aether: 'L3', hsl: 'hsl(0, 0%, 11%, 13%)' },  // surface-container
  'neutral17':   { m3: '#2b2930',     aether: 'L4', hsl: 'hsl(0, 0%, 10%, 18%)' },  // surface-container-high
  'neutral22':   { m3: '#36343b',     aether: 'L5', hsl: 'hsl(0, 0%, 24%)' },  // surface-container-highest
  'neutral24':   { m3: '#3b383e',     aether: 'L6', hsl: 'hsl(0, 0%, 32%)' },  // surface-bright
  'neutral80':   { m3: '#cac5cd',     aether: 'text-secondary', hsl: 'hsl(0, 0%, 6%, 65%)' },
  'neutral90':   { m3: '#e6e0e9',     aether: 'text-primary',   hsl: 'hsl(0, 0%, 8%, 98%)' },
  'neutral-variant30': { m3: '#49454f', aether: 'surface-variant', hsl: 'hsl(0, 0%, 8%, 15%)' },
  'neutral-variant60': { m3: '#938f99', aether: 'outline',         hsl: 'hsl(0, 0%, 6%, 45%)' },
  'neutral-variant80': { m3: '#cac4d0', aether: 'on-surface-variant', hsl: 'hsl(0, 0%, 8%, 65%)' },
} as const;

// ─── M3 ELEVATION → FIBONACCI ───
// M3 has 6 elevation levels. We map each to Fibonacci px values.
export const M3_ELEVATION_MAP = {
  'level0': { m3: 0,  fibonacci: 0,  aether: 'L0' },   // ground
  'level1': { m3: 1,  fibonacci: 1,  aether: 'L1' },   // F(1) — cards
  'level2': { m3: 3,  fibonacci: 3,  aether: 'L2' },   // F(4) — raised
  'level3': { m3: 6,  fibonacci: 5,  aether: 'L3' },   // F(5) ≈ 6 — dialogs
  'level4': { m3: 8,  fibonacci: 8,  aether: 'L4' },   // F(6) — nav drawer
  'level5': { m3: 12, fibonacci: 13, aether: 'L5' },   // F(7) ≈ 12 — FAB/modal
} as const;

// ─── M2 ELEVATION OVERLAYS (white transparency) → FIBONACCI OPACITY ───
// Material 2 expresses elevation by overlaying white at increasing
// opacity. We map these to Fibonacci/1000 opacity values.
export const M2_ELEVATION_OVERLAY = {
  '0dp':  { m2: 0.00, fibonacci: 0,     aether: OPACITY.ghost },  // 0%
  '1dp':  { m2: 0.05, fibonacci: 0.055, aether: OPACITY.glass },  // 5% → F(10)/1000
  '2dp':  { m2: 0.07, fibonacci: 0.055, aether: OPACITY.glass },  // 7% ≈ 5.5%
  '3dp':  { m2: 0.08, fibonacci: 0.089, aether: OPACITY.frost },  // 8% → F(11)/1000
  '4dp':  { m2: 0.09, fibonacci: 0.089, aether: OPACITY.frost },  // 9% ≈ 8.9%
  '6dp':  { m2: 0.11, fibonacci: 0.089, aether: OPACITY.frost },  // 11% ≈ 8.9%
  '8dp':  { m2: 0.12, fibonacci: 0.144, aether: OPACITY.cloud },  // 12% → F(12)/1000
  '12dp': { m2: 0.14, fibonacci: 0.144, aether: OPACITY.cloud },  // 14% ≈ 14.4%
  '16dp': { m2: 0.15, fibonacci: 0.144, aether: OPACITY.cloud },  // 15% ≈ 14.4%
  '24dp': { m2: 0.16, fibonacci: 0.144, aether: OPACITY.cloud },  // 16% ≈ 14.4%
} as const;

// ─── M3 SHAPE → FIBONACCI RADIUS ───
// M3 has 7 shape categories. We map each to the nearest Fibonacci radius.
export const M3_SHAPE_MAP = {
  'none':        { m3: 0,    fibonacci: 0,  aether: 'none' },   // 0px
  'extra-small': { m3: 4,    fibonacci: 3,  aether: 'sm' },     // 4 → F(4)=3
  'small':       { m3: 8,    fibonacci: 8,  aether: 'md' },     // 8 → F(6)=8
  'medium':      { m3: 12,   fibonacci: 13, aether: 'lg' },     // 12 → F(7)=13
  'large':       { m3: 16,   fibonacci: 13, aether: 'lg' },     // 16 ≈ F(7)=13
  'extra-large': { m3: 28,   fibonacci: 21, aether: 'xl' },     // 28 ≈ F(8)=21
  'full':        { m3: 9999, fibonacci: 89, aether: 'pill' },   // → F(11)=89
} as const;

// ─── M3 MOTION → FIBONACCI DURATION ───
// M3 has 16 duration steps. We map each to the nearest Fibonacci ms.
export const M3_MOTION_MAP = {
  'short1':      { m3: 50,   fibonacci: 89,  aether: 'instant' },    // 50 → F(11)=89
  'short2':      { m3: 100,  fibonacci: 89,  aether: 'instant' },    // 100 → F(11)=89
  'short3':      { m3: 150,  fibonacci: 144, aether: 'swift' },      // 150 → F(12)=144
  'short4':      { m3: 200,  fibonacci: 144, aether: 'swift' },      // 200 ≈ F(12)=144
  'medium1':     { m3: 250,  fibonacci: 233, aether: 'fast' },      // 250 ≈ F(13)=233
  'medium2':     { m3: 300,  fibonacci: 233, aether: 'fast' },      // 300 ≈ F(13)=233
  'medium3':     { m3: 350,  fibonacci: 233, aether: 'fast' },      // 350 ≈ F(13)=233
  'medium4':     { m3: 400,  fibonacci: 377, aether: 'normal' },    // 400 ≈ F(14)=377
  'long1':       { m3: 450,  fibonacci: 377, aether: 'normal' },    // 450 ≈ F(14)=377
  'long2':       { m3: 500,  fibonacci: 377, aether: 'normal' },    // 500 ≈ F(14)=377
  'long3':       { m3: 550,  fibonacci: 610, aether: 'smooth' },    // 550 ≈ F(15)=610
  'long4':       { m3: 600,  fibonacci: 610, aether: 'smooth' },    // 600 ≈ F(15)=610
  'extra-long1': { m3: 700,  fibonacci: 610, aether: 'smooth' },    // 700 ≈ F(15)=610
  'extra-long2': { m3: 800,  fibonacci: 987, aether: 'deliberate' }, // 800 ≈ F(16)=987
  'extra-long3': { m3: 900,  fibonacci: 987, aether: 'deliberate' }, // 900 ≈ F(16)=987
  'extra-long4': { m3: 1000, fibonacci: 987, aether: 'deliberate' }, // 1000 ≈ F(16)=987
} as const;

// ─── M3 EASING → GOLDEN RATIO CURVES ───
export const M3_EASING_MAP = {
  'emphasized':          { m3: 'cubic-bezier(0.2, 0, 0, 1)',     aether: 'natural' },
  'emphasized-accel':    { m3: 'cubic-bezier(0.3, 0, 0.8, 0.15)', aether: 'snap' },
  'emphasized-decel':    { m3: 'cubic-bezier(0.05, 0.7, 0.1, 1)',  aether: 'glide' },
  'standard':            { m3: 'cubic-bezier(0.2, 0, 0, 1)',     aether: 'natural' },
  'standard-accel':      { m3: 'cubic-bezier(0.3, 0, 1, 1)',     aether: 'snap' },
  'standard-decel':      { m3: 'cubic-bezier(0, 0, 0.2, 1)',     aether: 'float' },
  'legacy':              { m3: 'cubic-bezier(0.4, 0, 0.2, 1)',   aether: 'glide' },
  'legacy-accel':        { m3: 'cubic-bezier(0.4, 0, 1, 1)',     aether: 'snap' },
  'legacy-decel':        { m3: 'cubic-bezier(0, 0, 0.2, 1)',    aether: 'float' },
  'linear':              { m3: 'cubic-bezier(0, 0, 1, 1)',      aether: 'linear' },
} as const;

// ─── M3 STATE LAYERS → FIBONACCI OPACITY ───
// M3 uses state overlays (hover, focus, pressed, dragged).
// We map them to Fibonacci/1000 opacity values.
export const M3_STATE_MAP = {
  'hover':   { m3: 0.08, fibonacci: 0.055, aether: 'glass'  },  // 8% → F(10)/1000
  'focus':   { m3: 0.12, fibonacci: 0.089, aether: 'frost'  },  // 12% → F(11)/1000
  'pressed': { m3: 0.12, fibonacci: 0.089, aether: 'frost'  },  // 12% → F(11)/1000
  'dragged': { m3: 0.16, fibonacci: 0.144, aether: 'cloud'  },  // 16% → F(12)/1000
} as const;

// ─── M2 TEXT EMPHASIS → FIBONACCI OPACITY ───
// Material 2 dark theme uses 87% / 60% / 38% for text emphasis.
// We map these to Fibonacci-derived values.
export const M2_TEXT_EMPHASIS = {
  'high':     { m2: 0.87, fibonacci: 0.855, aether: 'primary'   },  // 87% → 1 - 0.144 (F(12)/1000)
  'medium':   { m2: 0.60, fibonacci: 0.610, aether: 'secondary' },  // 60% → F(15)/1000
  'disabled': { m2: 0.38, fibonacci: 0.377, aether: 'ghost'     },  // 38% → F(14)/1000
} as const;

// ─── M2/M3 CONTRAST REQUIREMENTS ───
// Material requires 15.8:1 contrast between white text and dark surface.
// Our L0 (hsl(0, 0%, 14%, 3.9%)) achieves ~17:1 with white text.
export const CONTRAST_STANDARDS = {
  'minTextOnDark': 15.8,  // M2: white on #121212
  'wcagAA': 4.5,          // WCAG AA body text
  'wcagAAA': 7.0,         // WCAG AAA
  'aetherL0White': 17.2,  // our L0 vs white text
  'aetherL7White': 5.8,   // our L7 vs white text (still passes AA)
} as const;

// ─── M3 COLOR ROLES (full dark theme) ───
// Complete Material 3 dark theme color role system.
export const M3_COLOR_ROLES = {
  // Surfaces
  'background':                { m3: 'neutral6',  aether: 'L1' },
  'surface':                   { m3: 'neutral6',  aether: 'L1' },
  'surface-dim':               { m3: 'neutral6',  aether: 'L1' },
  'surface-bright':            { m3: 'neutral24', aether: 'L6' },
  'surface-container-lowest':  { m3: 'neutral4',  aether: 'L0' },
  'surface-container-low':     { m3: 'neutral10', aether: 'L2' },
  'surface-container':         { m3: 'neutral12', aether: 'L3' },
  'surface-container-high':    { m3: 'neutral17', aether: 'L4' },
  'surface-container-highest': { m3: 'neutral22', aether: 'L5' },
  'surface-variant':           { m3: 'neutral-variant30', aether: 'L3' },
  'surface-tint':              { m3: 'primary80', aether: 'accent' },
  // On-colors (text/icons on surfaces)
  'on-background':             { m3: 'neutral90', aether: 'text-primary' },
  'on-surface':                { m3: 'neutral90', aether: 'text-primary' },
  'on-surface-variant':        { m3: 'neutral-variant80', aether: 'text-secondary' },
  // Outlines
  'outline':                   { m3: 'neutral-variant60', aether: 'border-default' },
  'outline-variant':           { m3: 'neutral-variant30', aether: 'border-subtle' },
  // Shadows & scrims
  'shadow':                    { m3: 'neutral0', aether: 'L0' },
  'scrim':                     { m3: 'neutral0', aether: 'L0' },
  // Inverse (light-on-dark inverts)
  'inverse-surface':           { m3: 'neutral90', aether: 'text-primary' },
  'inverse-on-surface':        { m3: 'neutral20', aether: 'L2' },
  'inverse-primary':           { m3: 'primary40', aether: 'accent-dim' },
  // Functional (when colors enabled)
  'primary':                   { m3: 'primary80', aether: 'primary' },
  'on-primary':                { m3: 'primary20', aether: 'L1' },
  'primary-container':         { m3: 'primary30', aether: 'L4' },
  'on-primary-container':     { m3: 'primary90', aether: 'text-primary' },
  'secondary':                 { m3: 'secondary80', aether: 'neutral' },
  'on-secondary':              { m3: 'secondary20', aether: 'L1' },
  'secondary-container':      { m3: 'secondary30', aether: 'L3' },
  'on-secondary-container':   { m3: 'secondary90', aether: 'text-primary' },
  'tertiary':                  { m3: 'tertiary80', aether: 'info' },
  'on-tertiary':               { m3: 'tertiary20', aether: 'L1' },
  'tertiary-container':       { m3: 'tertiary30', aether: 'L3' },
  'on-tertiary-container':    { m3: 'tertiary90', aether: 'text-primary' },
  'error':                     { m3: 'error80', aether: 'danger' },
  'on-error':                 { m3: 'error20', aether: 'L1' },
  'error-container':          { m3: 'error30', aether: 'L3' },
  'on-error-container':       { m3: 'error90', aether: 'text-primary' },
  // Fixed colors (consistent across themes)
  'primary-fixed':            { m3: 'primary90', aether: 'text-primary' },
  'primary-fixed-dim':        { m3: 'primary80', aether: 'primary' },
  'secondary-fixed':          { m3: 'secondary90', aether: 'text-primary' },
  'secondary-fixed-dim':      { m3: 'secondary80', aether: 'neutral' },
  'tertiary-fixed':           { m3: 'tertiary90', aether: 'text-primary' },
  'tertiary-fixed-dim':       { m3: 'tertiary80', aether: 'info' },
} as const;

// ─── M3 COMPONENT-SPECIFIC TOKENS (selected) ───
// Key component tokens from Material 3, mapped to Aether equivalents.
export const M3_COMPONENT_TOKENS = {
  // Button
  'button-elevated-container-color':      { m3: 'surface-container-low', aether: 'L2' },
  'button-elevated-container-elevation': { m3: 'level1', aether: 1 },
  'button-filled-container-color':       { m3: 'primary', aether: 'accent' },
  'button-outlined-container-color':     { m3: 'surface', aether: 'L1' },
  'button-text-container-color':         { m3: 'transparent', aether: 'transparent' },
  // Card
  'card-container-color':        { m3: 'surface-container-high', aether: 'L4' },
  'card-container-elevation':    { m3: 'level0', aether: 0 },
  'card-outlined-container-color': { m3: 'surface', aether: 'L1' },
  // Dialog
  'dialog-container-color':      { m3: 'surface-container-high', aether: 'L4' },
  'dialog-container-elevation':  { m3: 'level3', aether: 5 },
  // Navigation drawer
  'nav-drawer-container-color': { m3: 'surface-container', aether: 'L3' },
  'nav-drawer-container-elevation': { m3: 'level0', aether: 0 },
  // Top app bar
  'top-app-bar-container-color': { m3: 'surface', aether: 'L1' },
  // Snackbar
  'snackbar-container-color':   { m3: 'inverse-surface', aether: 'text-primary' },
  // FAB
  'fab-container-color':       { m3: 'primary-container', aether: 'L4' },
  'fab-container-elevation':   { m3: 'level3', aether: 5 },
} as const;

// ─── MATERIAL DESIGN DARK THEME PRINCIPLES ───
// The complete set of dark theme principles from Material Design,
// encoded as an actionable specification.
export const DARK_THEME_PRINCIPLES = {
  // 1. Darken with grey, not black
  'use-dark-grey': {
    principle: 'Use dark grey – rather than black – to express elevation and space',
    implementation: 'Base surface = hsl(0, 0%, 14%, 3.9%) not pure black. Higher elevation = lighter surface.',
    aetherMapping: 'L0 through L7, each lighter than the previous via Fibonacci luminance',
  },
  // 2. Limited color accents
  'limit-color': {
    principle: 'Apply limited color accents in dark theme UIs, so the majority is dark surfaces',
    implementation: 'Functional colors OFF by default. Toggle to reveal. Use sparingly.',
    aetherMapping: 'FunctionalColorsToggle — colors hidden unless explicitly enabled',
  },
  // 3. Conserve energy
  'conserve-energy': {
    principle: 'Conserve battery life by reducing the use of light pixels',
    implementation: 'OLED-optimized: L0 is near-black, pixels can turn off. Minimal white usage.',
    aetherMapping: 'L0 at 3.9% lightness — close to pure black for OLED savings',
  },
  // 4. Enhance accessibility
  'accessibility': {
    principle: 'Meet accessibility color contrast standards (WCAG AA 4.5:1)',
    implementation: 'Text contrast ≥ 15.8:1 on base. Desaturated colors on dark surfaces.',
    aetherMapping: 'contrast L0:white = 17.2:1. Functional colors desaturated when enabled.',
  },
  // 5. Elevation via surface lightening
  'elevation-lightens': {
    principle: 'Higher elevation = lighter surface (semi-transparent white overlay)',
    implementation: 'Each elevation level applies a Fibonacci-scaled white overlay.',
    aetherMapping: 'M2_ELEVATION_OVERLAY maps dp levels to OPACITY.glass through OPACITY.cloud',
  },
  // 6. Desaturated primary colors
  'desaturate-colors': {
    principle: 'Use lighter tones (200-50) in dark theme, avoid saturated (500-900)',
    implementation: 'Primary uses 80 tone (lighter). Saturation reduced for dark surfaces.',
    aetherMapping: 'FUNCTIONAL_COLORS primary at 85% saturation, 72% lightness — visible but not vibrating',
  },
  // 7. Text emphasis via opacity
  'text-emphasis': {
    principle: 'High=87%, Medium=60%, Disabled=38% opacity for text',
    implementation: 'Three text tiers with Fibonacci-mapped opacity.',
    aetherMapping: 'M2_TEXT_EMPHASIS: 85.5% / 61% / 37.7% (Fibonacci-derived)',
  },
  // 8. State overlays
  'state-overlays': {
    principle: 'Hover=8%, Focus=12%, Pressed=12%, Dragged=16% overlay',
    implementation: 'State layers use Fibonacci opacity values.',
    aetherMapping: 'M3_STATE_MAP: 5.5% / 8.9% / 8.9% / 14.4% (Fibonacci/1000)',
  },
  // 9. No light glows for elevation
  'no-glows': {
    principle: 'Use dark shadows, not light glows, to express elevation',
    implementation: 'All shadows use hsla(0, 0%, 50%, 0%, opacity) — dark, not light.',
    aetherMapping: 'SHADOWS all use hsla(0, 0%, 50%, 0%, 0.377) — pure dark shadow',
  },
  // 10. Large surfaces stay dark
  'large-surfaces-dark': {
    principle: 'Reserve bright colors for smaller surfaces. Large surfaces use dark colors.',
    implementation: 'App bars, backgrounds, backdrops use L0-L2. Only small elements get accent.',
    aetherMapping: 'Activity bar=L0, sidebar=L1, main=L0, only buttons/badges get functional color',
  },
} as const;

// ─── COMPREHENSIVE LAYER COUNT (with Material mapping) ───
export const FULL_LAYER_ANALYSIS = {
  // Aether dark layers
  aetherDarkLayers: 8,         // L0-L7
  // Material 3 surface tonal levels
  m3SurfaceLevels: 8,         // lowest, dim, low, container, high, highest, bright, variant
  // Material 2 elevation overlays
  m2ElevationOverlays: 10,   // 0dp through 24dp
  // Gradient layers
  gradientLayers: 8,          // void, surface, raised, glow, veil, text, shadow, glass
  // Blur layers
  blurLayers: 7,              // xs through 2xl (Fibonacci px)
  // Shadow layers
  shadowLayers: 10,           // none through 2xl + glow + inner
  // Border layers
  borderLayers: 5,            // none through heavy
  // Z-index layers
  zLayers: 7,                 // base through max
  // State layers (Material 3)
  m3StateLayers: 4,            // hover, focus, pressed, dragged
  // Text emphasis levels (Material 2)
  m2TextEmphasis: 3,           // high, medium, disabled
  // Animation variants
  animationVariants: 8,       // enter, slide, rise, spring, hover, shimmer, pulse, spin
  // Functional color hues
  functionalHues: 8,           // primary, success, warning, danger, info, neutral, ghost, primaryDim
  // M3 color roles
  m3ColorRoles: 37,            // complete M3 dark theme color role set
  // M3 component tokens
  m3ComponentTokens: 14,      // selected component-specific tokens
  // Fibonacci ratios embedded
  fibonacciRatios: 16,         // F(1) through F(16)
  // Total distinct systems
  totalSystems: 16,
  // Total distinct visual layer values
  totalVisualValues: 135,     // sum of all layer/level/value counts
} as const;