import { Link } from 'react-router-dom'
import { NAV, REGIONS, SITE } from '../data/site'
import { Logo } from './Logo'
import { asset } from '../lib/env'

export default function Footer() {
  return (
    <footer className="on-dark bg-ink text-white/80">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-xs text-white/70">{SITE.tagline}. {SITE.oneStop}.</p>
          <img src={asset('brand/50-years-experience.png')} width={200} height={198} alt="50 years of experience seal" loading="lazy" className="mt-6 h-24 w-24" />
        </div>
        <div className="md:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Site</h2>
          <ul className="mt-4 space-y-2">
            {[{ to: '/', label: 'Condominium management' }, ...NAV].map((n) => <li key={n.to}><Link to={n.to} className="link-u">{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="md:col-span-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Contact us</h2>
          <address className="mt-4 space-y-1 not-italic">
            <p>{SITE.legal}</p>
            <p>{SITE.street}, {SITE.city} {SITE.region} {SITE.postal}</p>
            <p>Phone <a href={SITE.phoneHref} className="link-u text-white">{SITE.phone}</a> · Toll free <a href={SITE.tollFreeHref} className="link-u text-white">{SITE.tollFree}</a></p>
            <p>Fax {SITE.fax}</p>
            <p><a href={`mailto:${SITE.email}`} className="link-u text-white">{SITE.email}</a></p>
          </address>
          <p className="mt-6 text-sm text-white/60">Regions served: {REGIONS.join(', ')}.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:justify-between">
          <p>© 2026 {SITE.legal}</p>
          <p>Design preview prepared by IT Rapid Support. Not an official Arthex website.</p>
        </div>
      </div>
    </footer>
  )
}
