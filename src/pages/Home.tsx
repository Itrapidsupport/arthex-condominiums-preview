import { Link } from 'react-router-dom'
import Hero3D from '../hero3d/Hero3D'
import Img from '../components/Img'
import Parallax from '../components/Parallax'
import { Accreditations, CtaBand, SectionHead } from '../components/ui'
import { Arrow, BuildingGlyph, Tick } from '../components/Icons'
import { ADMIN_FINANCIAL, ADVANTAGE, BUILDING_TYPES, CREDENTIALS, EXPERTISE, INSURANCE, INTRO, PROPERTY_MGMT, REGIONS, SITE, TOWNS } from '../data/site'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(70% 80% at 78% 40%, #ffffff 0%, rgba(255,255,255,0) 70%)' }} />
        <div className="wrap relative grid items-center gap-6 pt-10 pb-12 min-[900px]:grid-cols-[0.92fr_1.2fr] min-[900px]:gap-4 min-[900px]:pt-14 min-[900px]:pb-16">
          <div className="relative z-10">
            <p className="eyebrow" style={{ animation: 'ax-rise .8s .05s var(--ax-ease) both' }}>Condominium management · Since 1972</p>
            <h1 className="h-display mt-5 text-[clamp(2.5rem,5.6vw,4.6rem)]">
              Condominium management that keeps communities in <span className="text-red-ink">harmony</span>.
            </h1>
            <p className="lede mt-6 max-w-[48ch]" style={{ animation: 'ax-rise .9s .22s var(--ax-ease) both' }}>{INTRO[0].body}</p>
            <div className="mt-8 flex flex-wrap gap-3" style={{ animation: 'ax-rise .9s .3s var(--ax-ease) both' }}>
              <Link to="/contact" className="btn btn-red">Request a proposal <Arrow /></Link>
              <Link to="/services" className="btn btn-ghost">View condo services</Link>
            </div>
            <p className="mt-7 text-sm text-mute">
              24-hour emergency line <a className="font-semibold text-ink link-u" href={SITE.phoneHref}>{SITE.phone}</a>, press 1 after hours.
            </p>
          </div>
          <div className="relative -mx-4 min-[900px]:mx-0 min-[900px]:-mr-16">
            <Hero3D />
          </div>
        </div>
        <div className="border-y border-line bg-white/60">
          <ul className="wrap grid grid-cols-2 gap-y-6 py-7 md:grid-cols-4">
            {CREDENTIALS.map((c, i) => (
              <li key={c.k} className={`rv pr-4 ${i ? 'md:border-l md:border-line md:pl-6' : ''}`} style={{ ['--d' as string]: `${i * 80}ms` }}>
                <p className="text-2xl font-semibold tracking-tight">{c.k}</p>
                <p className="mt-1 text-sm leading-snug text-mute">{c.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Intro with their townhome banner */}
      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHead eyebrow="Full-service condo management" title="One team for operations, finances, administration and maintenance." />
            <div className="mt-10 space-y-8">
              {INTRO.slice(1).map((b, i) => (
                <div key={b.title} className="rv border-l-2 border-red pl-5" style={{ ['--d' as string]: `${i * 90}ms` }}>
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-mute">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
          <Parallax className="rv aspect-[4/5] rounded-2xl sm:aspect-[5/4] lg:aspect-[4/5]" amount={14}>
            <Img id="property4" alt="Brick and stone townhome condominium with landscaped walkway" sizes="(max-width: 639px) calc(172vw - 69px), (max-width: 1023px) 110vw, (max-width: 1239px) calc(86vw - 110px), 960px" className="h-full" />
          </Parallax>
        </div>
      </section>

      {/* Services preview */}
      <section className="on-dark bg-ink py-20 text-white sm:py-28">
        <div className="wrap">
          <SectionHead eyebrow="Condominium services" title="Everything a board needs, handled with care." lede="Two disciplines, one accountable team. Here is a sample of what Arthex looks after for every corporation." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[{ t: 'Administration and financial', items: ADMIN_FINANCIAL, pick: [0, 4, 5, 6, 3, 13] }, { t: 'Property management', items: PROPERTY_MGMT, pick: [0, 1, 2, 3, 10, 14] }].map((c, ci) => (
              <div key={c.t} className="rv rounded-2xl border border-white/12 bg-ink-2 p-7 sm:p-9" style={{ ['--d' as string]: `${ci * 100}ms` }}>
                <h3 className="text-xl font-semibold">{c.t}</h3>
                <div className="draw mt-4 h-px bg-red" />
                <ul className="mt-6 space-y-3.5">
                  {c.pick.map((i) => <li key={i} className="flex gap-3 text-white/85"><span className="text-sun"><Tick /></span>{c.items[i]}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <Link to="/services" className="btn btn-ghost mt-10">See all {ADMIN_FINANCIAL.length + PROPERTY_MGMT.length} services <Arrow /></Link>
        </div>
      </section>

      {/* Building types */}
      <section className="py-20 sm:py-28">
        <div className="wrap">
          <SectionHead eyebrow="Our expertise" title="From townhouse complexes to high-rise corporations." lede="We manage single to multi-residential and commercial properties, with sound knowledge of the Condominium Act and a review of each corporation's articles, by-laws, rules, policies and procedures." />
          <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {BUILDING_TYPES.map((b, i) => (
              <li key={b.k} className="rv flex flex-col justify-between rounded-2xl border border-line bg-white p-6 text-ink" style={{ ['--d' as string]: `${i * 80}ms` }}>
                <BuildingGlyph kind={b.k} />
                <p className="mt-6 font-semibold">{b.t}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {EXPERTISE.map((e, i) => (
              <div key={e.t} className="rv" style={{ ['--d' as string]: `${i * 90}ms` }}>
                <p className="text-sm font-semibold text-red-ink">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{e.t}</h3>
                <p className="mt-2 text-mute">{e.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progressive Service Advantage */}
      <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
        <Parallax className="absolute inset-0 -z-10 opacity-45" amount={18}>
          <Img id="waterfront" alt="" sizes="(max-width: 899px) 1840px, (max-width: 1500px) 1500px, 100vw" className="h-full" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="wrap py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="rv eyebrow">The Progressive Service Advantage™</p>
            <h2 className="rv h-sec mt-4">Anticipating needs instead of reacting to issues.</h2>
            <p className="rv lede mt-5">Arthex's Progressive Service Advantage is our commitment to delivering proactive, consistent, and responsive property management, with continuous oversight.</p>
          </div>
          <div className="mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {ADVANTAGE.map((a, i) => (
              <div key={a.t} className="rv rounded-2xl border border-white/15 bg-ink/60 p-7 backdrop-blur-sm" style={{ ['--d' as string]: `${i * 100}ms` }}>
                <h3 className="text-lg font-semibold">{a.t}</h3>
                <p className="mt-2 text-white/80">{a.b}</p>
              </div>
            ))}
          </div>
          <Link to="/about" className="btn btn-ghost mt-10">About Arthex <Arrow /></Link>
        </div>
      </section>

      {/* Community website + insurance */}
      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <div className="rv">
            <p className="eyebrow">Shift Suite</p>
            <h2 className="h-sec mt-4">Secure records and a community website for every corporation.</h2>
            <p className="lede mt-5">Arthex uses Shift Suite property management, accounting software and community website platforms, covering everything from purchase orders to compliance letters, variance reports and communication portals.</p>
            <p className="mt-5 text-mute">Unit and financial information are securely stored on the cloud and can be accessed from virtually anywhere. Owners reach important condo information through the online member community website, including smartphone access.</p>
          </div>
          <div className="rv rounded-2xl bg-stone p-7 sm:p-10">
            <p className="eyebrow">Insurance coverage</p>
            <p className="mt-4 text-mute">Fully licensed, insured and bonded as per our ACMO 2000 certification mandate and CMRAO requirements.</p>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {INSURANCE.map((x) => (
                <div key={x.amount} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:items-baseline">
                  <dt className="text-2xl font-semibold tracking-tight text-ink">{x.amount}</dt>
                  <dd className="text-mute">{x.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="pb-20 sm:pb-28">
        <div className="wrap">
          <div className="grid gap-10 rounded-3xl border border-line bg-white p-7 sm:p-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rv">
              <p className="eyebrow">Expertise across multiple regions</p>
              <h2 className="h-sec mt-4">Based in Burlington, serving {REGIONS.length} regions.</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {REGIONS.map((r) => <li key={r} className="rounded-full bg-ink px-3.5 py-1.5 text-sm font-medium text-white">{r}</li>)}
              </ul>
            </div>
            <ul className="rv columns-2 gap-6 text-mute sm:columns-3">
              {TOWNS.map((t) => <li key={t} className="break-inside-avoid border-b border-line py-2">{t}</li>)}
            </ul>
          </div>
          <Accreditations className="rv mt-10 border border-line" />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
