import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Section, Eyebrow } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { readSessionFromCookies } from '@/lib/auth';
import { getDb } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'Your BAZ engagement: deliverables, briefs, and feedback. One place.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function PortalPage() {
  const { user } = await readSessionFromCookies();
  if (!user) redirect('/login?next=/portal');

  const db = getDb();
  // Find the customer record associated with this user (if any)
  const customer = db.prepare(`SELECT * FROM customers WHERE email = ? LIMIT 1`).get(user.email) as any;
  const projects = customer
    ? db.prepare(`SELECT * FROM projects WHERE customer_id = ? ORDER BY started_at DESC`).all(customer.id) as any[]
    : [];
  const pendingFeedback = customer
    ? db.prepare(`SELECT * FROM feedback_requests WHERE customer_id = ? AND submitted_at IS NULL`).all(customer.id) as any[]
    : [];
  const submittedFeedback = customer
    ? db.prepare(`SELECT * FROM feedback WHERE customer_id = ? ORDER BY created_at DESC LIMIT 5`).all(customer.id) as any[]
    : [];

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Portal' }]} />
        <div className="max-w-4xl">
          <Eyebrow>Client Portal · {user.name}</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em] mt-4">
            {customer ? customer.name : 'Welcome.'}
          </h1>
          <p className="mt-6 text-lg text-ink-600">
            {customer
              ? <>Your engagement at a glance. Active deliverables, pending feedback requests, and the latest from your team.</>
              : <>Your account is set up. Once your engagement starts, projects and feedback requests will show up here.</>}
          </p>
        </div>
      </Section>

      <Section tone="white" size="lg">
        {/* Quick actions */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <Link href="/portal/brief" className="block bg-paper-50 rounded-2xl border border-ink-100 p-6 hover:border-ink-900 hover:-translate-y-0.5 hover:shadow-lift transition-all">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent mb-2">Action</p>
            <p className="font-display text-xl font-medium tracking-[-0.02em] mb-1">Submit a brief</p>
            <p className="text-sm text-ink-600">New project, scope change, or kickoff request.</p>
          </Link>
          <Link href="/portal/feedback" className="block bg-paper-50 rounded-2xl border border-ink-100 p-6 hover:border-ink-900 hover:-translate-y-0.5 hover:shadow-lift transition-all">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent mb-2">Quarterly</p>
            <p className="font-display text-xl font-medium tracking-[-0.02em] mb-1">Give feedback</p>
            <p className="text-sm text-ink-600">4-dimension review — takes 60 seconds.</p>
          </Link>
          <Link href="/contact" className="block bg-paper-50 rounded-2xl border border-ink-100 p-6 hover:border-ink-900 hover:-translate-y-0.5 hover:shadow-lift transition-all">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent mb-2">Direct</p>
            <p className="font-display text-xl font-medium tracking-[-0.02em] mb-1">Talk to your team</p>
            <p className="text-sm text-ink-600">Email, book a call, or send a message.</p>
          </Link>
        </div>

        {/* Projects */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-medium tracking-[-0.02em] mb-4">Active projects</h2>
          {projects.length === 0 ? (
            <p className="text-sm text-ink-500">No active projects yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p.id} className="bg-paper-50 rounded-2xl border border-ink-100 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-lg font-medium tracking-[-0.02em]">{p.name}</h3>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full ${
                      p.status === 'active' ? 'bg-success/10 text-success' :
                      p.status === 'completed' ? 'bg-ink-100 text-ink-700' :
                      'bg-warning/10 text-warning'
                    }`}>{p.status}</span>
                  </div>
                  {p.scope && <p className="text-sm text-ink-600 mb-2"><b className="text-ink-900">Scope:</b> {p.scope}</p>}
                  {p.deliverables && <p className="text-sm text-ink-600"><b className="text-ink-900">Deliverables:</b> {p.deliverables}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending feedback */}
        {pendingFeedback.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display text-2xl font-medium tracking-[-0.02em] mb-4">Pending feedback</h2>
            <div className="bg-warning/10 border border-warning/30 rounded-2xl p-5 space-y-3">
              {pendingFeedback.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-ink-900">{r.kind} feedback request</p>
                    <p className="text-xs text-ink-600">Sent {new Date(r.requested_at).toLocaleDateString()}</p>
                  </div>
                  <Link href={`/portal/feedback?token=${r.token}`} className="h-10 px-4 inline-flex items-center rounded-full bg-ink-900 text-paper text-sm font-medium hover:bg-ink-800">
                    Give feedback
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent feedback */}
        {submittedFeedback.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-medium tracking-[-0.02em] mb-4">Your feedback history</h2>
            <div className="space-y-2">
              {submittedFeedback.map((f) => (
                <div key={f.id} className="bg-paper-50 rounded-xl border border-ink-100 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-ink-700">{new Date(f.created_at).toLocaleDateString()}</p>
                    <p className="font-display text-2xl font-medium tabular-nums">{f.overall}<span className="text-ink-400 text-base">/5</span></p>
                  </div>
                  {f.comment && <p className="text-sm text-ink-600">{f.comment}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}