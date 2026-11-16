import { CtaBand, PageHero } from '../components/ui'
import { FAQ, SITE } from '../data/site'

export default function Faq() {
  return (
    <>
      <PageHero eyebrow="Frequently asked questions" title="Answers for boards, owners and residents." lede={`Can't find what you need? Email ${SITE.email} or call ${SITE.phone}.`} img="inclusive" />
      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[0.6fr_1.4fr]">
          <nav aria-label="FAQ topics" className="hidden lg:block">
            <ul className="sticky top-28 space-y-2">
              {FAQ.map((g, i) => <li key={g.group}><a href={`#faq-${i}`} className="link-u font-medium">{g.group}</a></li>)}
            </ul>
          </nav>
          <div className="space-y-14">
            {FAQ.map((g, gi) => (
              <section key={g.group} id={`faq-${gi}`} aria-labelledby={`faq-h-${gi}`}>
                <h2 id={`faq-h-${gi}`} className="rv text-2xl font-semibold tracking-tight">{g.group}</h2>
                <div className="mt-5 divide-y divide-line border-y border-line">
                  {g.items.map((it) => (
                    <details key={it.q} className="group py-1">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.05rem] font-semibold [&::-webkit-details-marker]:hidden">
                        {it.q}
                        <span aria-hidden className="grid h-8 w-8 flex-none place-items-center rounded-full border border-line text-red-ink transition-transform duration-300 group-open:rotate-45">+</span>
                      </summary>
                      <p className="pb-5 pr-12 text-mute">{it.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
