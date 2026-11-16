import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Img from './Img'
import images from '../data/images.json'
import { Arrow } from './Icons'
import { SITE } from '../data/site'
import { asset } from '../lib/env'

/** Displayed (object-cover) width of a PageHero photo: band is ~600px tall on phones, ~700px on desktop, img zoomed 1.08x. */
function heroSizes(id: string) {
  const e = (images as Record<string, { w: number; h: number }>)[id]
  const ar = e.w / e.h, d = Math.round(700 * ar)
  return `(max-width: 899px) ${Math.round(600 * ar)}px, (max-width: ${Math.round(d / 1.08)}px) ${d}px, 108vw`
}

/** Inner-page hero: their own banner photo with a charcoal scrim, red title bar echoing arthex.ca. */
export function PageHero({ eyebrow, title, lede, img, position }: { eyebrow: string; title: ReactNode; lede?: string; img: string; position?: string }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
      <Img id={img} alt="" priority sizes={heroSizes(img)} position={position} className="absolute inset-0 -z-10 opacity-55" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
      <div className="wrap py-20 sm:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h-display mt-5 max-w-[18ch] text-[clamp(2.3rem,6vw,4.4rem)]">{title}</h1>
        {lede ? <p className="lede mt-6 max-w-[56ch]">{lede}</p> : null}
      </div>
      <div aria-hidden className="h-2 bg-red" />
    </section>
  )
}

export function SectionHead({ eyebrow, title, lede, className = '' }: { eyebrow: string; title: ReactNode; lede?: ReactNode; className?: string }) {
  return (
    <div className={`rv max-w-3xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-sec mt-4">{title}</h2>
      {lede ? <p className="lede mt-5">{lede}</p> : null}
    </div>
  )
}

/** The three CTAs from the red band on arthex.ca. */
export function CtaBand() {
  const items = [
    { icon: 'icons-proposal', t: 'Proposal request', b: 'Considering Arthex for your property management needs? Request a proposal to see how we can help.', to: '/contact', cta: 'Get started' },
    { icon: 'icons-consult', t: 'Free consultation', b: 'Would you like more information about how we can help you? Contact us today for your free consultation.', to: '/contact', cta: 'Contact us' },
    { icon: 'icons-cert', t: 'Order status certificate', b: "Need to order your condo's status certificate? Order today through CONDUIT.", to: '/status-certificate', cta: 'Learn more' },
  ]
  return (
    <section className="on-dark relative isolate overflow-hidden bg-red text-white" aria-labelledby="cta-h">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-60" style={{ background: 'radial-gradient(80% 120% at 85% 0%, rgba(255,255,255,.14), transparent 60%), radial-gradient(60% 90% at 0% 100%, rgba(0,0,0,.28), transparent 60%)' }} />
      <div className="wrap py-20 sm:py-24">
        <h2 id="cta-h" className="rv h-sec max-w-[22ch] text-white">{SITE.oneStop}.</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/20 md:grid-cols-3">
          {items.map((it, i) => (
            <div key={it.t} className="rv flex flex-col bg-[#b8111b] p-7 sm:p-9" style={{ ['--d' as string]: `${i * 90}ms` }}>
              <h3 className="text-xl font-semibold">{it.t}</h3>
              <p className="mt-3 flex-1 text-white/85">{it.b}</p>
              <Link to={it.to} className="btn mt-7 self-start bg-white text-red-ink hover:bg-ink hover:text-white">{it.cta} <Arrow /></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Accreditations({ className = '' }: { className?: string }) {
  const logos = [
    { f: 'acmo.png', a: 'ACMO, Association of Condominium Managers of Ontario', href: 'http://www.acmo.org/' },
    { f: 'cci-golden-horseshoe.png', a: 'Canadian Condominium Institute, Golden Horseshoe Chapter', href: 'https://www.cci-ghc.ca/' },
    { f: 'bbb-a.png', a: 'BBB Accredited Business, A+ rating', href: 'http://www.bbb.org/kitchener/business-reviews/property-management/arthex-property-management-1983-in-burlington-on-1265400' },
  ]
  return (
    <ul className={`grid grid-cols-3 items-center gap-4 rounded-2xl bg-white p-5 sm:gap-10 sm:px-12 ${className}`}>
      {logos.map((l) => (
        <li key={l.f} className="flex justify-center">
          <a href={l.href} target="_blank" rel="noopener noreferrer" className="block">
            <img src={asset('brand/' + l.f)} alt={l.a} width={200} height={132} loading="lazy" className="h-auto w-full max-w-[150px]" />
          </a>
        </li>
      ))}
    </ul>
  )
}
