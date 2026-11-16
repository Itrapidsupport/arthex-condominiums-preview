import { Link } from 'react-router-dom'
import Img from '../components/Img'
import Parallax from '../components/Parallax'
import { Accreditations, CtaBand, PageHero, SectionHead } from '../components/ui'
import { Arrow, Tick } from '../components/Icons'
import { ADMIN_FINANCIAL, INTRO, PROPERTY_MGMT, RIGHT_FIT } from '../data/site'

function List({ id, title, items, n }: { id: string; title: string; items: string[]; n: string }) {
  return (
    <section aria-labelledby={id} className="rv rounded-3xl border border-line bg-white p-7 sm:p-10">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={id} className="text-2xl font-semibold tracking-tight">{title}</h2>
        <span className="text-sm font-semibold text-red-ink">{n}</span>
      </div>
      <div className="draw mt-5 h-[2px] bg-red" />
      <ul className="mt-6 divide-y divide-line">
        {items.map((s) => <li key={s} className="flex gap-3 py-3.5 text-[0.98rem] leading-snug"><span className="text-red-ink"><Tick /></span>{s}</li>)}
      </ul>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Condominium services" title="Condominium management services" lede={INTRO[0].body} img="townhomes" position="50% 60%" />
      <section className="py-16 sm:py-24">
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-3">
            {INTRO.map((b, i) => (
              <div key={b.title} className="rv" style={{ ['--d' as string]: `${i * 90}ms` }}>
                <h2 className="text-lg font-semibold">{b.title}</h2>
                <p className="mt-2 text-mute">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid items-start gap-6 lg:grid-cols-2">
            <List id="admin" title="Administration and financial" items={ADMIN_FINANCIAL} n={`${ADMIN_FINANCIAL.length} services`} />
            <List id="pm" title="Property management" items={PROPERTY_MGMT} n={`${PROPERTY_MGMT.length} services`} />
          </div>
          <Accreditations className="rv mt-10 border border-line" />
        </div>
      </section>
      <section className="on-dark bg-ink py-20 text-white sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHead eyebrow="The Right Fit Team Approach™" title="A management team sized to your property." />
            <div className="mt-10 space-y-7">
              {RIGHT_FIT.map((r, i) => (
                <div key={r.t} className="rv border-l-2 border-sun pl-5" style={{ ['--d' as string]: `${i * 90}ms` }}>
                  <h3 className="text-lg font-semibold">{r.t}</h3>
                  <p className="mt-1.5 text-white/80">{r.b}</p>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn btn-red mt-10">Request a proposal <Arrow /></Link>
          </div>
          <Parallax className="rv aspect-[4/5] rounded-2xl" amount={14}>
            <Img id="team" alt="White high-rise condominium balconies" sizes="(max-width: 1023px) calc(115vw - 46px), (max-width: 1239px) calc(51vw - 65px), 580px" className="h-full" />
          </Parallax>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
