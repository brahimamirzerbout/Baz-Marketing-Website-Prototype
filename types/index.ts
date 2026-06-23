export type Service = {
  slug: string;
  name: string;
  tagline: string;
  pillar: 'owned' | 'earned' | 'paid' | 'data' | 'platform';
  description: string;
  hero: { eyebrow: string; headline: string; sub: string };
  who: string[];
  deliverables: string[];
  kpis: { label: string; value: string }[];
  process: { step: number; title: string; desc: string }[];
  proof: { client: string; metric: string; detail: string }[];
  faqs: { q: string; a: string }[];
  cta: { primary: string; secondary?: string };
  placeholder?: boolean;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  services: string[];
  cover: string;       // hex / token name
  problem: string;
  strategy: string;
  result: string;
  metrics: { label: string; value: string }[];
  duration: string;
  testimonial?: { quote: string; author: string; role: string };
  placeholder?: boolean;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;        // markdown-lite (paragraphs separated by blank lines)
  category: 'strategy' | 'seo' | 'paid' | 'analytics' | 'content' | 'ai';
  author: string;
  publishedAt: string; // ISO date
  readingMin: number;
};

export type Industry = {
  slug: string;
  name: string;
  blurb: string;
  challenges: string[];
  outcomes: string[];
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric?: string;
  placeholder?: boolean;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
};
