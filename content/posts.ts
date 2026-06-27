import type { Post } from '@/types';

export const posts: Post[] = [
  {
    slug: 'compounding-seo',
    title: 'Compounding SEO: the only channel that ages like wine',
    excerpt: 'Why SEO is the only growth channel where yesterday\'s work still pays off next year — and how to build one that compounds.',
    body: `Most channels are renting attention. SEO is owning it.

When you stop publishing, paid traffic stops. When you stop posting, social traffic decays. But SEO compounds: every article you ship, every link you earn, every technical fix you make stays in the index and keeps producing traffic 24/7/365.

The math is simple. A piece ranking top-3 for a 5,000/mo query produces 60,000 sessions a year — for free. A piece ranking for ten such queries produces 600,000 sessions a year. After 24 months of compounding, that single content investment is outperforming most paid budgets.

But compounding only happens when three things are right: technical SEO, topical authority, and link earning.

Technical SEO is the foundation. Crawlability, indexation, Core Web Vitals, schema, internal linking. Get this wrong and nothing else matters.

Topical authority is the strategy. A site that has 200 high-quality pages on "B2B SaaS analytics" outranks a site with 2,000 scattered pages across random topics.

Link earning is the multiplier. Authority compounds faster than content quality, but only when the content deserves it.

The mistake most agencies make is treating SEO as a content mill. The mistake most in-house teams make is treating SEO as a checklist. The truth is editorial: SEO is a publishing business that happens to rank.`,
    category: 'seo',
    author: 'Sora Tanaka',
    publishedAt: '2026-06-18',
    readingMin: 6,
  },
  {
    slug: 'paid-attribution-after-ios',
    title: 'Paid attribution after iOS: a survival guide',
    excerpt: 'Server-side tracking, conversion APIs, and the new rules of measuring paid media without losing your mind.',
    body: `The old attribution model is dead. Browser-side pixels lost 30–60% of conversion signal on iOS. Cookies are being deprecated. Marketers pretending otherwise are flying blind.

Server-side tracking is the new floor, not the ceiling. Google Tag Manager's server container, Meta\'s Conversion API, TikTok\'s Events API — these give you deterministic signal that survives iOS and Chrome's cookie phase-out.

The pattern:

1. Fire conversion events from your backend to each platform's API.
2. Send the same event_id to GA4 via server GTM and to ad platforms.
3. Deduplicate in-platform using event_id.
4. Send hashed PII (email, phone) for advanced matching.

This gives you 95%+ signal recovery. Most teams stop there. The teams that win go further: they build a single source of truth for revenue (a warehouse or even a SQLite table) and reconcile every platform's numbers against it weekly.

The platforms lie. Their numbers are always 5–20% optimistic. The warehouse is the only place you see reality.

Attribution is the moat. Most agencies can't build it. Most in-house teams don't have time. The few teams who can are the ones whose dashboards execs actually open.`,
    category: 'paid',
    author: 'Mira Okafor',
    publishedAt: '2026-06-11',
    readingMin: 7,
  },
  {
    slug: 'winning-the-ai-overview',
    title: 'How to win the AI Overview',
    excerpt: 'AI Overviews and LLM answers are the new top of the SERP. Here is how to be cited, not just ranked.',
    body: `If your SEO strategy hasn't changed in 12 months, you are already losing traffic to AI Overviews.

The click-through rate on queries with AI Overviews is down 20–40% year-over-year. The page that gets cited in the AI Overview gets the rest — and the brand impression that doesn't show up in GA4.

Three pillars of winning the new SERP:

1. Entity-first content. LLMs and Google's AI Overviews work on entities, not keywords. Get your entity (brand, product, founder) on Wikidata, in schema, and in citation sources. The model needs to know you exist as a thing.

2. Citation-worthy structure. The pages that get cited have clear claims, named sources, and quotable sentences. Not 1,500-word fluffy intros. Specificity wins.

3. Author authority. Author bios with credentials, bylines across publications, and outbound links to authoritative sources. Models weight author signals heavily.

The teams that crack this early will own the next decade of search. The teams that don't will watch their traffic decay in slow motion.`,
    category: 'ai',
    author: 'Brahim ZERBOUT',
    publishedAt: '2026-06-04',
    readingMin: 5,
  },
  {
    slug: 'cro-without-slop',
    title: 'CRO without the slop',
    excerpt: 'Conversion rate optimization is the most abused word in growth. Here is what good CRO actually looks like.',
    body: `Most "CRO" is a junior changing button colors and A/B testing copy that doesn't matter.

Real CRO starts with a funnel. Where are users dropping? Where is intent highest but conversion lowest? What does the data say vs. what does the team feel?

A rigorous CRO program runs 5–10 tests a month, each with a clear hypothesis tied to a specific metric. It uses a stats engine (Evan Miller's calculator, or built-in tools) and doesn't call winners until they hit 95% confidence.

It also tests the right things. Hero copy, pricing structure, social proof placement, signup flow friction — these move the needle. Color contrast on the CTA doesn't.

The mistake most agencies make is running tests that are easy to ship, not tests that move the metric. The mistake most in-house teams make is running too few tests to learn anything.

BAZ runs 60+ tests per quarter per client. Most teams run 4. That's the gap.`,
    category: 'analytics',
    author: 'Daniel K.',
    publishedAt: '2026-05-28',
    readingMin: 6,
  },
  {
    slug: 'editorial-as-moat',
    title: 'Editorial as a moat',
    excerpt: 'Why the best growth teams are publishers first and marketers second.',
    body: `The best B2B and DTC brands of the next decade will be publishers. Not because content is cheap, but because it compounds in a way no other channel does.

A paid campaign stops when the budget stops. An email list decays if you stop emailing. A podcast ages.

An article published in 2022 is still ranking, still converting, still cited. The work has been done. The traffic is free.

The teams winning at this treat editorial as a product, not a campaign. They have editors, writers, a calendar, a CMS workflow, and a measurement framework. They publish 8–24 pieces a month with the same rigor a media company applies to its flagship publication.

The mistake most agencies make is treating content as a service line, not a strategy. The mistake most brands make is treating it as an afterthought.

BAZ runs editorial as an operating discipline, not a deliverable. That is the moat.`,
    category: 'content',
    author: 'Hala Mansour',
    publishedAt: '2026-05-21',
    readingMin: 5,
  },
  {
    slug: 'the-90-day-plan',
    title: 'The 90-day growth plan',
    excerpt: 'Why BAZ plans in 90 days, not 12 months — and what that means for compounding.',
    body: `A 12-month plan is a deck. A 90-day plan is a contract.

Most agencies pitch annual roadmaps because they obscure accountability. Three months is short enough that the work has to ship, the metrics have to move, and the strategy has to be honest about assumptions.

BAZ plans in 90-day cycles for three reasons:

1. Honesty. A 12-month plan is a wish list. A 90-day plan has named owners, dated milestones, and metrics that have to move.

2. Learning. Three months is enough to learn whether a hypothesis was right. Twelve months is enough to bury it.

3. Compounding. Each 90-day cycle builds on the last. By month 12, you've shipped four iterations — not one giant plan that may or may not work.

The 90-day structure:
- Days 1–14: Audit and strategy.
- Days 15–30: Foundations (tracking, content, design system).
- Days 31–75: Execution (campaigns, content, tests).
- Days 76–90: Review and replan.

Most of our clients renew after their first 90 days. The plan works. So does the rhythm.`,
    category: 'strategy',
    author: 'Brahim ZERBOUT',
    publishedAt: '2026-05-14',
    readingMin: 5,
  },

  // ── Imported from baz-marketing (legacy DB) on 2026-06-23 ──
  {
    slug: 'senior-team-no-juniors',
    title: 'Why we only staff senior people — and what it costs us',
    excerpt: 'The conventional agency pyramid sells at the top and delivers at the bottom. We rejected that, and paid for it.',
    body: `When we started BAZ, the conventional wisdom was clear: build a junior-heavy pyramid, sell at the top, deliver at the bottom. We rejected that.

In our model, the person who pitched the work is the person who ships it. No junior BA synthesizing the call. No account manager translating between strategy and execution. The senior crafts the brief, ships the work, and answers the email.

This means our margins are worse. Our utilization is harder to manage. Our capacity is finite. But the output is consistent, the relationships compound, and our clients renew at a rate we never managed with the pyramid.`,
    category: 'strategy',
    author: 'Brahim ZERBOUT',
    publishedAt: '2026-04-08',
    readingMin: 3,
  },
  {
    slug: 'distribution-is-design',
    title: 'Distribution is design: a manifesto',
    excerpt: 'Most agencies treat distribution as an afterthought. We treat it as the first constraint.',
    body: `Most agencies treat distribution as an afterthought — something the media team handles once the creative is "done." We think that's wrong.

Distribution shapes the creative. The format, the length, the hook, the caption — all of it is downstream of where it's going to live and who's going to see it. Designing in a vacuum is a recipe for beautiful work that dies in a CMS.

In our process, distribution is part of the brief from day one. Before we write a line of copy, we know the platforms, the formats, the algorithms, the audiences, the cadence. The creative comes after.`,
    category: 'content',
    author: 'Brahim ZERBOUT',
    publishedAt: '2026-04-15',
    readingMin: 3,
  },
  {
    slug: 'original-data-seo',
    title: 'Original data is the only SEO moat that lasts',
    excerpt: 'After three algorithm updates targeting helpful content, the winning pattern is clear: ship data nobody else has.',
    body: `After three algorithm updates targeting "helpful content," the pattern is clear: thin, derivative content gets buried. The strategy that works: original data.

Five formats that work for us right now:

1. **Original benchmarks.** Survey 50+ companies, publish the results. Linkable, citable, evergreen.
2. **Internal data, anonymized.** "We analyzed 12M ad impressions — here's what worked."
3. **Industry tooling.** Free calculators, graders, generators. People link to tools.
4. **Expert roundups with original synthesis.** Not "10 CEOs say X." Instead: "We interviewed 30 CEOs, here's the 4-part pattern."
5. **Live dashboards.** Public, always-updated data. Build once, link forever.`,
    category: 'seo',
    author: 'Brahim ZERBOUT',
    publishedAt: '2026-04-22',
    readingMin: 3,
  },
  {
    slug: 'brand-is-a-verb',
    title: 'Brand is a verb, not a noun',
    excerpt: 'A brand isn\'t a logo on a balance sheet. It\'s the pattern of behavior a company exhibits across every touchpoint.',
    body: `Most companies treat "brand" as an asset on a balance sheet — a logo, a color, a font. It's something they own.

That framing is broken. A brand is the pattern of behavior a company exhibits across every touchpoint. The way the support rep answers. The way the product breaks. The way the CEO tweets. None of that is on a balance sheet, all of it is the brand.

The reframe changes everything: you stop measuring brand health with quarterly trackers and start measuring it with the consistency of experience. You stop hiring brand managers and start hiring operators who understand that everything ships the brand.`,
    category: 'content',
    author: 'Brahim ZERBOUT',
    publishedAt: '2026-04-29',
    readingMin: 3,
  },
  {
    slug: 'speed-as-a-feature',
    title: 'Speed is a feature',
    excerpt: 'Our average engagement is eight weeks. Our longest retainer renewal is six years. Both are downstream of one principle.',
    body: `Our average engagement is eight weeks. Our longest retainer renewal is six years. Both are downstream of one operating principle: ship fast, iterate faster.

The OS that makes this possible:

- **No pitches longer than two weeks.** Anything more complex gets scoped down or rejected.
- **Senior team on every call.** No translation layer, no re-briefing.
- **Async-first.** Decisions in writing. Meetings are exceptions, not defaults.
- **Public roadmap per client.** They see what's shipping next, this week.
- **Weekly demos, not weekly status.** "Look at what shipped" beats "here's what we're doing."

We gave up: predictability, scope-creep tolerance, and the ability to say yes to every brief. We gained: speed, trust, and a renewal rate that compounds.`,
    category: 'strategy',
    author: 'Brahim ZERBOUT',
    publishedAt: '2026-05-02',
    readingMin: 3,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
