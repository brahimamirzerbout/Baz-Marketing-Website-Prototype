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
    <footer className="mt-24" style={{background:"#0e0e10",color:"#faf7f2"}}>
      <div className="container mx-auto py-16 md:py-20">
        <div className="grid gap-12 md:gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group" aria-label={site.name}>
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-accent text-white font-display font-bold text-xl">B</span>
              <span className="font-display font-bold text-2xl tracking-[-0.02em]">BAZ</span>
            </Link>
            <p className="mt-5 text-white/70 max-w-sm leading-relaxed">{site.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <a href={site.bookOrMailto} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-600 transition-colors text-white px-5 h-11 rounded-full font-medium">
                Book a growth call
                <span aria-hidden>→</span>
              </a>
            </div>
            <div className="mt-6 text-sm text-white/70">
              <a href={`mailto:${site.email}`} className="hover:text-white underline-offset-4 hover:underline">{site.email}</a>
              <span className="mx-2 opacity-50">·</span>
              <span>{site.phone}</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/our-story" className="hover:text-white">Our story</Link></li>
              <li><Link href="/methodology" className="hover:text-white">Methodology</Link></li>
              <li><Link href="/case-studies" className="hover:text-white">Case studies</Link></li>
              <li><Link href="/industries" className="hover:text-white">Industries</Link></li>
              <li><Link href="/insights" className="hover:text-white">Insights</Link></li>
              <li><Link href="/marketing-hub" className="hover:text-white">Marketing Hub</Link></li>
              <li><Link href="/vs-others" className="hover:text-white">vs other agencies</Link></li>
              <li><Link href="/stance" className="hover:text-white">Our stance</Link></li>
              <li><Link href="/brandbook" className="hover:text-white">Brandbook</Link></li>
              <li><Link href="/loop" className="hover:text-white">The Loop</Link></li>
              <li><Link href="/pulse" className="hover:text-white">Live Pulse</Link></li>
              <li><Link href="/portal/client" className="hover:text-white">Client portal</Link></li>
              <li><Link href="/become-an-operator" className="hover:text-white">Become an Operator</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {servicesByGroup.Strategy.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 mb-4">Growth</h4>
            <ul className="space-y-2.5 text-sm">
              {servicesByGroup.Growth.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 mb-4">Operators</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/become-an-operator" className="hover:text-white">Become an Operator</Link></li>
              <li><Link href="/marketing-hub/showcase" className="hover:text-white">Products catalog →</Link></li>
              <li><Link href="/loop" className="hover:text-white">The Loop</Link></li>
              <li><Link href="/pulse" className="hover:text-white">Live Pulse</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              <li>
                <a href="https://www.linkedin.com/company/baz-agency" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
              </li>
              <li>
                <a href="https://twitter.com/bazagency" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter / X</a>
              </li>
            </ul>
          </div>
        <div className="md:col-span-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 mb-4">Build</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">View source →</a>
              </li>
              <li>
                <Link href="/feed.xml" className="hover:text-white">RSS</Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} {site.name}. Based in Algiers. Working with clients in MENA, EU, and the US.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]">zerboutbrahimamir@gmail.com · Senior team · No juniors</p>
        </div>
      </div>
    </footer>
  );
}
