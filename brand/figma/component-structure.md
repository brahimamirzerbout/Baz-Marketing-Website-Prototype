# Figma — Component Structure

## Component Architecture

All components are built using Figma's **Variants** feature with the following property structure:

```
Component Set
├── Variant: [type] × [size] × [state]
├── Auto-Layout: Enabled
├── Design Tokens: Referenced via variables
└── Documentation: Via component description
```

## Variant Properties

### Button
| Property | Values |
|----------|--------|
| Type | Primary, Secondary, Outline, Ghost, Danger, Accent-Outline |
| Size | sm, md, lg, xl, 2xl |
| State | Default, Hover, Active, Focus, Disabled, Loading |
| Icon | None, Left, Right, Icon-only |
| Width | Auto, Full |

### Input
| Property | Values |
|----------|--------|
| Type | Text, Textarea, Select |
| Variant | Default, Filled, Ghost |
| Size | sm, md, lg |
| State | Default, Focus, Error, Disabled |
| Required | True, False |

### Card
| Property | Values |
|----------|--------|
| Type | Default, Flat, Bordered, Ghost, Highlight |
| Padding | Compact (16px), Default (24px), Spacious (32px) |
| Interactive | True (hover effect), False |
| Tone | Paper, White, Ink |

### Alert
| Property | Values |
|----------|--------|
| Severity | Info, Success, Warning, Danger |
| Dismissible | True, False |
| Icon | True, False |

### Badge
| Property | Values |
|----------|--------|
| Color | Default, Primary, Success, Warning, Danger, Neutral |
| Size | sm, md, lg |
| Dot | True, False |

### Modal
| Property | Values |
|----------|--------|
| Size | sm, md, lg, xl |
| State | Open, Closed |

### Toast
| Property | Values |
|----------|--------|
| Severity | Info, Success, Warning, Danger |
| Position | Bottom-right (default) |

## Component Hierarchy

```
📦 BAZ Design System
├── 📁 Primitives
│   ├── Color tokens
│   ├── Type tokens
│   ├── Spacing tokens
│   ├── Radius tokens
│   └── Shadow tokens
│
├── 📁 Atoms
│   ├── Button
│   ├── Input
│   ├── Checkbox
│   ├── Radio
│   ├── Toggle
│   ├── Badge
│   ├── Avatar
│   ├── Tooltip
│   └── Separator
│
├── 📁 Molecules
│   ├── Form Field (Label + Input + Helper)
│   ├── Search Bar (Input + Button)
│   ├── Navigation Item (Icon + Label)
│   ├── Stat Card (Value + Label)
│   └── Eyebrow (Dot + Text)
│
├── 📁 Organisms
│   ├── Header (Logo + Nav + CTA)
│   ├── Footer (Grid + Social + Legal)
│   ├── Hero (Eyebrow + Headline + CTA)
│   ├── Feature Grid (3× Cards)
│   ├── Stat Grid (2×4 Stats)
│   ├── Pricing Table (3× Cards)
│   └── Testimonial Carousel
│
└── 📁 Templates
    ├── Landing Page
    ├── Dashboard
    ├── Pricing
    └── Contact
```

## Instance Swapping Rules

When creating instances:
1. **Text content** — Override with real content
2. **Icons** — Swap within the icon component set
3. **Images** — Replace fill with actual image
4. **Colors** — Never override; use variant properties instead
5. **Spacing** — Never override; use Auto-Layout gap tokens