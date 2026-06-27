import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Section, Eyebrow } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { readSessionFromCookies } from '@/lib/auth';
import { BriefForm } from './BriefForm';

export const metadata: Metadata = {
  title: 'Submit a brief',
  description: 'New project, scope change, or kickoff request.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function PortalBriefPage() {
  const { user } = await readSessionFromCookies();
  if (!user) redirect('/login?next=/portal/brief');

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Portal', href: '/portal' }, { label: 'Submit brief' }]} />
        <div className="max-w-3xl">
          <Eyebrow>Portal · Submit brief</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em] mt-4">
            Tell us what you need.
          </h1>
          <p className="mt-6 text-lg text-ink-600">
            New project, scope change, or kickoff request. The more specific you are about
            the outcome you want, the better we can scope.
          </p>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="max-w-2xl">
          <BriefForm email={user.email} name={user.name} />
        </div>
      </Section>
    </>
  );
}