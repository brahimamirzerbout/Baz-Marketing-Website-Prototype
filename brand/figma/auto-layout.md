# Figma — Auto-Layout Conventions

## Principles

1. **Every component uses Auto-Layout** — no manual positioning
2. **Token-based spacing** — all gaps and padding reference spacing variables
3. **Responsive by default** — components scale using `fill container` and `hug contents`
4. **No fixed widths** — all components are fluid unless deliberately constrained

## Auto-Layout Settings by Component

### Buttons
| Property | Value |
|----------|-------|
| Direction | Horizontal |
| Primary axis | Hug contents |
| Counter axis | Fixed (h-12 for lg) |
| Gap | 8px (`space-2`) |
| Padding | `px-6 py-0` (horizontal only) |

### Cards
| Property | Value |
|----------|-------|
| Direction | Vertical |
| Primary axis | Hug contents |
| Counter axis | Fill container |
| Gap | 16px (`space-4`) |
| Padding | 24px (`space-6`) |
| Corner radius | 13px (`radius-fib13`) |

### Input Fields
| Property | Value |
|----------|-------|
| Direction | Vertical |
| Primary axis | Hug contents |
| Counter axis | Fill container |
| Gap | 8px (`space-2`) between label and input |
| Input padding | `px-4 py-3` |

### Navigation
| Property | Value |
|----------|-------|
| Direction | Horizontal |
| Primary axis | Space between |
| Counter axis | Center |
| Gap | 32px (`space-8`) between nav items |
| Height | 64px (`h-16`) |

### Hero Sections
| Property | Value |
|----------|-------|
| Direction | Vertical |
| Primary axis | Hug contents |
| Counter axis | Fill container |
| Gap | 24px (`space-6`) eyebrow→headline |
| Gap | 40px (`space-10`) headline→CTA |
| Max width | 1024px (`max-w-hero`) |

### Stat Grid
| Property | Value |
|----------|-------|
| Direction | Horizontal |
| Primary axis | Fill container |
| Counter axis | Hug contents |
| Gap | 1px (divider between cells) |
| Corner radius | 21px (`radius-fib21`) on container |
| Responsive | `grid-cols-2 md:grid-cols-4` |

## Breakpoint Behavior

| Breakpoint | Width | Columns | Gutter | Behavior |
|-----------|-------|---------|--------|----------|
| Mobile | 375–639px | 4 | 16px | Stack, single column |
| Tablet | 640–1023px | 8 | 24px | Two-column cards |
| Desktop | 1024–1279px | 12 | 24px | Full layout |
| Wide | 1280px+ | 12 | 24px | Max-width 1440px |

## Constraints

- **Horizontal scrolling:** Never allowed
- **Minimum touch target:** 44×44px
- **Text truncation:** After 2 lines max for cards, 3 lines for descriptions
- **Image aspect ratios:** Enforce using `fill` mode with `object-fit: cover`