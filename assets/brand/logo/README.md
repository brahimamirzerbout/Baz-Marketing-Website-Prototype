# BAZ Logo Suite

5 variants, one source of truth. Save these where you need them.

## Files

| File | Use for | Background |
|---|---|---|
| `baz-wordmark.svg` | Default. Hero, decks, email signature, social banners. | Light or off-white backgrounds |
| `baz-wordmark-reverse.svg` | Anywhere dark. Pitch deck dark slides, dark-mode social. | Dark backgrounds only |
| `baz-wordmark-mono.svg` | Print, single-color fax-style placements, watermarks, monospace contexts. | Either — but always one color |
| `baz-mark.svg` | The B-in-red-square alone. Tight spaces, app icons, watermarks. | Either |
| `baz-favicon.svg` | 64×64. Browser tab, app shortcut icon. | Either |

## Don't

- Don't recolor the mark. The red is `#ff3b2f`. Always.
- Don't stretch, skew, or rotate.
- Don't add drop shadows, glows, or outlines to the mark.
- Don't put the mark on busy photos without a solid scrim behind it.
- Don't replace the serif "B" with a sans, italic, or condensed variant.

## Sizes

- **Minimum width**: 80px for the full wordmark, 24px for the mark alone
- **Preferred**: 200–400px for the wordmark in decks, 64–120px for the mark
- **Maximum**: never above 800px on screen — beyond that it competes with the typography of the document

## Color tokens

```
--accent:    #ff3b2f   ←  the red. Don't change it.
--ink-900:   #0e0e10   ←  body text and dark mark on light
--paper:     #f5f1ea   ←  background of the cream wordmark reverse
--paper-50:  #faf7f2   ←  white inside the red square
```

## When in doubt

Use `baz-wordmark.svg`. The other four are for specific situations.
