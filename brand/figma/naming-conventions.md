# Figma — Naming Conventions

## Layer Naming

All layers in Figma follow this naming convention:

```
[category]/[component]/[variant]/[state]
```

### Examples
- `button/primary/default`
- `button/primary/hover`
- `button/primary/disabled`
- `card/default/default`
- `card/highlight/default`
- `input/text/filled/focus`
- `input/text/filled/error`

## Page Structure

```
📄 Cover
📄 Foundations
  ├── Colors
  ├── Typography
  ├── Spacing
  ├── Radii
  ├── Shadows
  └── Icons
📄 Components
  ├── Button
  ├── Input
  ├── Card
  ├── Alert
  ├── Badge
  ├── Modal
  ├── Toast
  ├── Table
  ├── Avatar
  └── Skeleton
📄 Templates
  ├── Landing Page
  ├── Dashboard
  ├── Pricing
  └── Contact
📄 Archive
```

## Component Structure

Each component frame contains:
1. **Properties panel** — Variant properties defined
2. **Auto-layout** — Used for all responsive behavior
3. **Design tokens** — All values reference Figma variables
4. **States** — Default, Hover, Active, Focus, Disabled
5. **Dark mode** — Component with dark mode override

## Variable Naming

Figma variables follow the BAZ token naming:

```
colors/ink-900
colors/paper
colors/accent
colors/accent-500
typography/font-display
typography/font-sans
typography/font-mono
spacing/space-4
spacing/space-6
radius/fib8
radius/fib13
```

## Color Variable Structure

```
📁 colors/
  📁 ink/
    🔵 900
    🔵 800
    🔵 600
    🔵 500
    🔵 400
  📁 paper/
    ⚪ DEFAULT
    ⚪ 50
    ⚪ 100
    ⚪ 200
    ⚪ 300
  📁 accent/
    🟣 DEFAULT
    🟣 50–900
    🟡 gold
    🔴 red
  📁 violet/
    🟣 50–900
  📁 semantic/
    🟢 success
    🟡 warning
    🔴 danger
    🔵 info
```

## Typography Variable Structure

```
📁 typography/
  📁 font-family/
    display
    sans
    mono
  📁 font-size/
    2xs → display
  📁 font-weight/
    light → black
  📁 line-height/
    none → relaxed
  📁 letter-spacing/
    tighter → eyebrow
```