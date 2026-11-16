import Img from '../components/Img'
import Parallax from '../components/Parallax'
import { Accreditations, CtaBand, PageHero, SectionHead } from '../components/ui'
import { HISTORY, IDEALS, VALUES } from '../data/site'

export default function About() {
  return (
    <>
      <PageHero eyebrow="About Arthex" title="A third-generation firm, serving Ontario since 1972." lede="For more than five decades, Arthex Property Management (1983) Inc. has delivered trusted, professional, and responsive property management services to condominium corporations, rental property owners, and commercial clients across Ontario." img="highrise" />

      <section className="py-20 sm:py-28">
        <div className="wrap">
          <SectionHead eyebrow="Company profile" title="Three chapters, one name." />
          <ol className="relative mt-14 grid gap-10 md:grid-cols-3">
            <div aria-hidden className="draw absolute left-0 right-0 top-[1.15rem] hidden h-[2px] bg-red md:block" />
            {HISTORY.map((h, i) => (
              <li key={h.y} className="rv relative" style={{ ['--d' as string]: `${i * 140}ms` }}>
                <span className="relative inline-block rounded-full bg-red px-4 py-1.5 text-sm font-semibold text-white">{h.y}</span>
                <h3 className="mt-5 text-xl font-semibold">{h.t}</h3>
                <p className="mt-2 text-mute">{h.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-center">
          <Parallax className="rv aspect-[4/3] rounded-2xl" amount={14}>
            <Img id="expertise" alt="Row of red-brick condominium townhomes with white porches" sizes="(max-width: 1023px) calc(274vw - 110px), (max-width: 1239px) calc(137vw - 175px), 1525px" className="h-full" />
          </Parallax>
          <div>
            <SectionHead eyebrow="Accredited, licensed, experienced" title="ACMO 2000 certified, CMRAO licensed." />
            <p className="rv mt-5 text-mute">Arthex is proud to be an ACMO and CCI corporate member and has obtained the ACMO 2000 certification, which distinguishes professional property management firms. We are pleased to have an A+ Better Business Bureau rating.</p>
            <p className="rv mt-4 text-mute">Arthex Property Management is registered and licensed by the CMRAO along with all its managers, supported by specialists in accounting, customer service coordination, and professional administration.</p>
            <figure className="rv mt-8 rounded-2xl border-l-4 border-red bg-paper p-6">
              <blockquote className="text-[1.02rem] leading-relaxed">“This company… is able to offer excellent service to clients and has developed a web site to inform new and existing clients about the services it provides. The web site includes facilities for owners to communicate with the company and to access information about their Corporation. This type of service is on the leading edge of the Property Management industry.”</blockquote>
              <figcaption className="mt-4 text-sm text-mute">John E. Outram, P.Eng., ACMO 2000 auditor, October 29, 2010</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="on-dark bg-ink py-20 text-white sm:py-28">
        <div className="wrap">
          <div className="rv max-w-3xl">
            <p className="eyebrow">Our mission</p>
            <p className="mt-5 text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-snug tracking-tight">To provide a <span className="text-sun">harmonious</span>, safe, and peaceful environment ensuring a financially secure future for all the properties that we manage. Quality service is not the main objective in our company, it is the <span className="text-sun">only</span> objective.</p>
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="rv text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Our ideals: the art of doing</h2>
              <ul className="mt-5 divide-y divide-white/12 border-y border-white/12">
                {IDEALS.map((x) => <li key={x.t} className="rv grid gap-1 py-4 sm:grid-cols-[13rem_1fr]"><span className="font-semibold">{x.t}</span><span className="text-white/75">{x.b}</span></li>)}
              </ul>
            </div>
            <div>
              <h2 className="rv text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Our core values: the art of being</h2>
              <ul className="mt-5 divide-y divide-white/12 border-y border-white/12">
                {VALUES.map((x) => <li key={x.t} className="rv grid gap-1 py-4 sm:grid-cols-[13rem_1fr]"><span className="font-semibold">{x.t}</span><span className="text-white/75">{x.b}</span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <SectionHead eyebrow="Our team" title="Licensed property managers, backed by accounting and support staff." lede="Arthex is powered by experienced, CMRAO and IHM-licensed property managers and dedicated support professionals. We believe in continuing education, personally and professionally, through CMRAO licensing, ACMO programs and strategic industry training." />
          </div>
          <Parallax className="rv aspect-[4/3] rounded-2xl" amount={14}>
            <Img id="gazebo-banner" alt="Waterfront gazebo on a lawn by Lake Ontario" sizes="(max-width: 1023px) calc(330vw - 132px), (max-width: 1239px) calc(146vw - 187px), 1630px" className="h-full" />
          </Parallax>
        </div>
        <div className="wrap"><Accreditations className="rv mt-14 border border-line" /></div>
      </section>
      <CtaBand />
    </>
  )
}
