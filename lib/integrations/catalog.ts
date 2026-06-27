/**
 * BAZ — Integrations catalog
 *
 * Source-of-truth for the /admin/integrations page. Each entry has a stable
 * id, a brand color, an icon glyph, a short description, and the "default"
 * status text shown when it's first connected.
 *
 * `status: 'available'` means the integration exists but no connection has
 * been established yet (Zapier-style). The rest default to connected.
 *
 * Persistence: connection state lives in localStorage under
 * `baz.admin.integrations.v1`. Read/write is handled by `lib/integrations/store.ts`.
 *
 * NOTE: This is a UI demo. Real OAuth / API-key flows per integration are
 * not wired. Each card's Connect/Disconnect toggle is functional within the
 * browser session and persists locally; it does not actually call the
 * third-party API.
 */

export type IntegrationId =
  | 'slack'
  | 'gworkspace'
  | 'linear'
  | 'figma'
  | 'github'
  | 'notion'
  | 'stripe'
  | 'quickbooks'
  | 'hubspot'
  | 'metaads'
  | 'googleads'
  | 'linkedin'
  | 'zapier'
  | 'webhooks';

export interface Integration {
  id: IntegrationId;
  name: string;
  icon: string;          // 1–3 char glyph shown in the swatch
  color: string;         // brand hex; the swatch background
  desc: string;           // 1-line description
  defaultStatus: string;  // status text shown when connected by default
  /** Categories used for filter chips. */
  categories: Array<'comms' | 'design' | 'engineering' | 'finance' | 'marketing' | 'automation'>;
}

export const integrations: Integration[] = [
  { id: 'slack',      name: 'Slack',            icon: 'S',  color: '#4A154B', desc: 'Push briefs, leads, and audit events into a Slack channel.',         defaultStatus: 'Connected · 14 channels', categories: ['comms'] },
  { id: 'gworkspace', name: 'Google Workspace', icon: 'G',  color: '#4285F4', desc: 'SSO, calendar sync, and shared Drive folders for client work.',     defaultStatus: 'Connected · 9 users',     categories: ['comms'] },
  { id: 'linear',     name: 'Linear',           icon: 'L',  color: '#5E6AD2', desc: 'Two-way sync of internal projects, tasks, and roadmaps.',          defaultStatus: 'Connected · sync projects', categories: ['engineering'] },
  { id: 'figma',      name: 'Figma',            icon: 'F',  color: '#F24E1E', desc: 'Embed live design files in briefs and case studies.',              defaultStatus: 'Connected · embed support',  categories: ['design'] },
  { id: 'github',     name: 'GitHub',           icon: '⌘',  color: '#0e0e0e', desc: 'Mirror repos, open PRs from briefs, surface build status.',         defaultStatus: 'Connected · 3 repos',       categories: ['engineering'] },
  { id: 'notion',     name: 'Notion',           icon: 'N',  color: '#0e0e0e', desc: 'Sync internal docs and client knowledge bases.',                    defaultStatus: 'Connected · docs sync',      categories: ['comms'] },
  { id: 'stripe',     name: 'Stripe',           icon: '$',  color: '#635BFF', desc: 'Billing, subscriptions, MRR tracking, and invoice automation.',    defaultStatus: 'Connected · billing',        categories: ['finance'] },
  { id: 'quickbooks', name: 'QuickBooks',       icon: 'Q',  color: '#2CA01C', desc: 'Sync invoices, vendors, and tax categories.',                       defaultStatus: 'Connected · invoicing',      categories: ['finance'] },
  { id: 'hubspot',    name: 'HubSpot',          icon: 'H',  color: '#FF7A59', desc: 'Two-way CRM sync, deal stages, and lifecycle automations.',        defaultStatus: 'Connected · CRM',            categories: ['marketing'] },
  { id: 'metaads',    name: 'Meta Ads',         icon: 'M',  color: '#0866FF', desc: 'Pull campaign performance, ad spend, and audience insights.',       defaultStatus: 'Connected · ad spend',       categories: ['marketing'] },
  { id: 'googleads',  name: 'Google Ads',       icon: 'G',  color: '#FBBC04', desc: 'Search, Display, and YouTube campaign performance.',                defaultStatus: 'Connected · campaigns',      categories: ['marketing'] },
  { id: 'linkedin',   name: 'LinkedIn',         icon: 'in', color: '#0A66C2', desc: 'Schedule posts, surface company page analytics.',                    defaultStatus: 'Connected · publishing',     categories: ['marketing'] },
  { id: 'zapier',     name: 'Zapier',           icon: 'Z',  color: '#FF4A00', desc: 'Connect BAZ to 5,000+ apps via automated workflows (Zaps).',        defaultStatus: 'Available',                 categories: ['automation'] },
  { id: 'webhooks',   name: 'Webhooks',         icon: '{}', color: '#0e0e0e', desc: '3 active endpoints — receive HTTP callbacks on app events.',        defaultStatus: '3 active endpoints',        categories: ['automation'] },
];

export const getIntegration = (id: IntegrationId) =>
  integrations.find((i) => i.id === id);

export const CATEGORIES: Record<Integration['categories'][number], string> = {
  comms:       'Communication',
  design:      'Design',
  engineering: 'Engineering',
  finance:     'Finance',
  marketing:   'Marketing',
  automation:  'Automation',
};