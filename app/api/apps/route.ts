import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/apps — manifest of every BAZ surface (operator console,
 * client portal, public routes, API). Useful for nav rendering,
 * sitemap generation, and the /admin/apps panel.
 */
const APPS = [
  // Public surfaces
  { pillar: 'public', id: 'home',         path: '/',                    auth: false, label: 'Home' },
  { pillar: 'public', id: 'services',     path: '/services',            auth: false, label: 'Services' },
  { pillar: 'public', id: 'case-studies', path: '/case-studies',        auth: false, label: 'Case studies' },
  { pillar: 'public', id: 'industries',   path: '/industries',          auth: false, label: 'Industries' },
  { pillar: 'public', id: 'insights',     path: '/insights',            auth: false, label: 'Insights' },
  { pillar: 'public', id: 'brandbook',    path: '/brandbook',           auth: false, label: 'Brandbook' },
  { pillar: 'public', id: 'pricing',      path: '/pricing',             auth: false, label: 'Pricing' },
  { pillar: 'public', id: 'about',        path: '/about',               auth: false, label: 'About' },
  { pillar: 'public', id: 'contact',      path: '/contact',             auth: false, label: 'Contact' },
  { pillar: 'public', id: 'become-an-operator', path: '/become-an-operator', auth: false, label: 'Become an Operator' },
  // Admin / Operator
  { pillar: 'admin', id: 'admin',         path: '/admin',               auth: 'session', label: 'Admin home' },
  { pillar: 'admin', id: 'leads',         path: '/admin/leads',         auth: 'session', label: 'Leads' },
  { pillar: 'admin', id: 'analytics',     path: '/admin/analytics',     auth: 'session', label: 'Analytics' },
  { pillar: 'admin', id: 'canva',         path: '/admin/canva',         auth: 'session', label: 'Canva' },
  { pillar: 'admin', id: 'monitors',      path: '/admin/monitors',      auth: 'session', label: 'Monitors' },
  { pillar: 'admin', id: 'integrations',  path: '/admin/integrations',  auth: 'session', label: 'Integrations' },
  { pillar: 'admin', id: 'console',       path: '/console',             auth: 'session', label: 'Operator Console' },
  { pillar: 'admin', id: 'agents',        path: '/admin/agents',        auth: 'session', label: 'AI Agents' },
  { pillar: 'admin', id: 'pipeline',      path: '/admin/pipeline',      auth: 'session', label: 'CRM Pipeline' },
  // Client portal
  { pillar: 'portal', id: 'portal',       path: '/portal',              auth: 'session', label: 'Client Portal' },
  { pillar: 'portal', id: 'portal-brief', path: '/portal/brief',        auth: 'session', label: 'Submit brief' },
  { pillar: 'portal', id: 'portal-feedback', path: '/portal/feedback',  auth: 'session', label: 'Quarterly feedback' },
  // API
  { pillar: 'api', id: 'health',         path: '/api/health',          auth: false, label: 'Health' },
  { pillar: 'api', id: 'apps',           path: '/api/apps',            auth: false, label: 'App manifest' },
  { pillar: 'api', id: 'agents',         path: '/api/agents',          auth: false, label: 'AI agents' },
  { pillar: 'api', id: 'ai',             path: '/api/ai',              auth: false, label: 'AI completion' },
  { pillar: 'api', id: 'leads',          path: '/api/leads',           auth: 'mixed',  label: 'Leads CRUD' },
  { pillar: 'api', id: 'auth',           path: '/api/auth',            auth: false, label: 'Auth' },
];

export async function GET() {
  return NextResponse.json({ count: APPS.length, apps: APPS });
}