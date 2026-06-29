# BAZ Brand & Sales Kit

Working assets for an agency running sales, content, and client work.

## What's here

```
assets/brand/
├── README.md               ← you are here
├── logo/                   ← 5 logo variants + usage guide
├── pitch-deck/             ← 10-slide pitch deck (HTML, print to PDF)
├── case-studies/           ← 3 one-pagers (markdown, ready to send)
├── service-cards/          ← 3 reusable SVG service card templates
├── lead-magnet/            ← "90-day playbook" cover + body
└── social/                 ← 4 LinkedIn posts + 2 carousel slides
```

## How to use this kit

### Sending to a prospect
- **First touch:** `social/linkedin-posts.md` — pick the most relevant post, add a personal note, send via LinkedIn DM.
- **Reply:** `case-studies/` — send the case study that matches their industry (ViralVista for DTC, Northwind for FinTech/SaaS, EngageEra for B2B SaaS).
- **Discovery call booked:** `pitch-deck/deck.html` — open in browser, print to PDF, walk through the 10 slides.
- **After the call:** `lead-magnet/playbook-cover.svg` + body — send as the "here's the playbook we mentioned" follow-up.

### Posting on social
- One post per week from `social/linkedin-posts.md`. Tuesday or Wednesday morning.
- Carousel: post slides 01-05 as a swipeable PDF on LinkedIn, 4-5 days after the matching text post.

### Pitching in person
- `pitch-deck/deck.html` → print to PDF → bring iPad or print slides.
- `logo/baz-wordmark.svg` on slide 1.
- `service-cards/` as leave-behinds (one card per pillar they care about).

### Repurposing for content
- The 24-page playbook can be split into 4 blog posts (one per chapter).
- The 4 LinkedIn posts can be split into a Twitter thread, an email sequence, or a YouTube script.

## Don't

- Don't edit the visual system (colors, fonts, accent red `#ff3b2f`).
- Don't generate new assets without saving the prompt + output for reuse.
- Don't post the same carousel twice in a quarter — leads notice.
- Don't send a case study that doesn't match the prospect's industry.

## Refresh cadence

- **Logo suite:** only when the brand mark changes (rare).
- **Pitch deck:** quarterly. Refresh the case studies and stats.
- **Case study one-pagers:** after every new signed engagement that produces proof.
- **Service cards:** when a service changes price, scope, or proof.
- **LinkedIn posts:** write 1 per week. Aim for 12 in the bank at any time.
- **Lead magnet:** when the offer changes or the playbook gets a major refresh.

## Color tokens (don't change these)

```
--accent:    #ff3b2f   ←  the red
--ink-900:   #0e0e10   ←  body text
--paper:     #f5f1ea   ←  cream background
--paper-50:  #faf7f2   ←  off-white
--gold:      #f9a01f   ←  secondary accent
```

## Where things came from

- **Brand voice** → `docs/BRAND-BRIEF.md`
- **Design tokens** → `docs/DESIGN-TOKENS.md`
- **Site code** → `~/baz/`
- **This kit** → `assets/brand/`

If you change the voice, tokens, or site, update this kit. If you change this kit, update the site to match.
