import Link from 'next/link';
import { site } from '@/lib/site';
import { services } from '@/content/services';

const servicesByGroup = {
  Strategy: services.filter((s) => s.pillar === 'owned' || s.pillar === 'platform').slice(0, 4),
  Growth: services.filter((s) => s.pillar === 'earned' || s.pillar === 'paid').slice(0, 4),
  Data: services.filter((s) => s.pillar === 'data').slice(0, 4),
};

export function Footer() {
  return (
    <footer className="bg-ink-900 text-paper mt-24">
      <div className="container mx-auto py-16 md:py-20">
        <div className="grid gap-12 md:gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2 group" aria-label={site.name}>
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-accent text-white font-display font-bold text-xl">B</span>
              <span className="font-display font-bold text-2xl tracking-[-0.02em]">BAZ</span>
            </Link>
            <p className="mt-5 text-paper-300 max-w-sm leading-relaxed">{site.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-600 transition-colors text-white px-5 h-11 rounded-full font-medium">
                Book a growth call
                <span aria-hidden>→</span>
              </a>
            </div>
            <div className="mt-6 text-sm text-paper-300">
              <a href={`mailto:${site.email}`} className="hover:text-paper underline-offset-4 hover:underline">{site.email}</a>
              <span className="mx-2 opacity-50">·</span>
              <span>{site.phone}</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-400 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-paper">About</Link></li>
              <li><Link href="/case-studies" className="hover:text-paper">Case studies</Link></li>
              <li><Link href="/industries" className="hover:text-paper">Industries</Link></li>
              <li><Link href="/insights" className="hover:text-paper">Insights</Link></li>
              <li><Link href="/contact" className="hover:text-paper">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-400 mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {servicesByGroup.Strategy.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-paper">{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-400 mb-4">Growth</h4>
            <ul className="space-y-2.5 text-sm">
              {servicesByGroup.Growth.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-paper">{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-400 mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacy" className="hover:text-paper">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-paper">Terms</Link></li>
              <li>
                <a href="https://www.linkedin.com/company/baz-agency" target="_blank" rel="noopener noreferrer" className="hover:text-paper">LinkedIn</a>
              </li>
              <li>
                <a href="https://twitter.com/bazagency" target="_blank" rel="noopener noreferrer" className="hover:text-paper">Twitter / X</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-paper/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-paper-400">
          <p>© {new Date().getFullYear()} {site.name}. Built in NYC, London & Tokyo.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]">hello@baz.agency · Senior team · No juniors</p>
        </div>
      </div>
    </footer>
  );
}
