import { Metadata } from 'next';
import { Section, Eyebrow } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { IntegrationsClient } from './IntegrationsClient';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Connected services. Slack, Google Workspace, Linear, Figma, GitHub, Stripe, HubSpot, Meta Ads, Google Ads, LinkedIn, Zapier, Webhooks.',
  robots: { index: false, follow: false }, // admin page
};

export default function IntegrationsPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Integrations' }]} />
        <div className="max-w-4xl">
          <Eyebrow>Admin · BAZ · Integrations</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Connected services.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-600 leading-relaxed max-w-2xl">
            The tools BAZ connects to — comms, design, engineering, finance,
            marketing, automation. Configure connection state per browser.
          </p>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <IntegrationsClient />
      </Section>
    </>
  );
}