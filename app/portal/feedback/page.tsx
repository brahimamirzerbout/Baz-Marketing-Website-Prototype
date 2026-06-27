import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Section, Eyebrow } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { readSessionFromCookies } from '@/lib/auth';
import { FeedbackForm } from './FeedbackForm';

export const metadata: Metadata = {
  title: 'Quarterly feedback',
  description: '4-dimension review. 60 seconds.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function PortalFeedbackPage() {
  const { user } = await readSessionFromCookies();
  if (!user) redirect('/login?next=/portal/feedback');

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Portal', href: '/portal' }, { label: 'Feedback' }]} />
        <div className="max-w-3xl">
          <Eyebrow>Portal · Feedback</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em] mt-4">
            How are we doing?
          </h1>
          <p className="mt-6 text-lg text-ink-600">
            Four short ratings. One comment. ~60 seconds. We read every one and adjust.
          </p>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="max-w-2xl">
          <FeedbackForm email={user.email} name={user.name} />
        </div>
      </Section>
    </>
  );
}