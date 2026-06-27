import Link from 'next/link';
import type { Metadata } from 'next';
import { Section, Eyebrow } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { readSessionFromCookies } from '@/lib/auth';
import { ConsoleClient } from './ConsoleClient';
import { getDb } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Operator Console',
  description: 'Owner-operator cockpit. Pipeline, scout, activity, income. Everything you need to run BAZ day-to-day.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function ConsolePage() {
  const { user } = await readSessionFromCookies();
  if (!user) {
    // Render a soft prompt — the client-side will redirect to /login
    return (
      <>
        <Section tone="paper" size="lg">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Console' }]} />
          <div className="max-w-2xl">
            <Eyebrow>Operator Console</Eyebrow>
            <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em] mt-4">
              Sign in to access the console.
            </h1>
            <p className="mt-6 text-lg text-ink-600">
              The operator console is the cockpit you use every day: pipeline, scout list,
              activity tracker, income calculator, AI tools. It&rsquo;s the surface for the
              owner-operator playbook.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/login" className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-ink-900 hover:bg-ink-800 text-paper font-medium">
                Sign in
              </Link>
              <Link href="/become-an-operator" className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-ink-200 hover:border-ink-900 font-medium">
                Become an Operator
              </Link>
            </div>
          </div>
        </Section>
      </>
    );
  }

  // Server-side data hydration so the operator sees live numbers on first paint
  const db = getDb();
  const totals = {
    leads:    (db.prepare('SELECT COUNT(*) AS n FROM leads').get() as { n: number }).n,
    new:      (db.prepare(`SELECT COUNT(*) AS n FROM leads WHERE status = 'new'`).get() as { n: number }).n,
    qualified:(db.prepare(`SELECT COUNT(*) AS n FROM leads WHERE status = 'qualified'`).get() as { n: number }).n,
    won:      (db.prepare(`SELECT COUNT(*) AS n FROM leads WHERE status = 'won'`).get() as { n: number }).n,
    customers:(db.prepare(`SELECT COUNT(*) AS n FROM customers WHERE status = 'active'`).get() as { n: number }).n,
    mrr:      (db.prepare(`SELECT COALESCE(SUM(mrr),0) AS m FROM customers WHERE status = 'active'`).get() as { m: number }).m,
  };

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Console' }]} />
        <div className="max-w-4xl">
          <Eyebrow>Operator Console · {user.name}</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em] mt-4">
            Sell. Ship. Get paid.
          </h1>
          <p className="mt-6 text-lg text-ink-600">
            This is the cockpit. Pipeline on the left, scout list in the middle, activity tracker
            on the right. The only thing that moves the business is conversations — every tool here
            exists to make them more frequent.
          </p>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <ConsoleClient totals={totals} />
      </Section>
    </>
  );
}