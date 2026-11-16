import ContactForm from '../components/ContactForm'
import { PageHero } from '../components/ui'
import { Logo } from '../components/Logo'
import { SITE } from '../data/site'

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Connect with us" title="Contact us for a free consultation." lede="Our team is here to support condominium boards, rental property owners, and commercial clients across Ontario. Arthex provides customized proposals for condominium corporations." img="waterfront" />
      <section className="py-16 sm:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rv rounded-3xl border border-line bg-white p-6 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">Request a proposal or consultation</h2>
            <p className="mt-2 text-mute">Fields marked * are required. Sending opens your email app with the details filled in.</p>
            <div className="mt-8"><ContactForm /></div>
          </div>
          <aside className="rv space-y-6">
            <div className="rounded-3xl bg-white p-7 text-center ring-1 ring-line">
              <Logo light={false} className="mx-auto h-36" />
            </div>
            <div className="on-dark rounded-3xl bg-ink p-7 text-white">
              <h2 className="text-lg font-semibold">{SITE.legal}</h2>
              <address className="mt-4 space-y-1 not-italic text-white/80">
                <p>{SITE.street}</p>
                <p>{SITE.city} {SITE.region} {SITE.postal}</p>
              </address>
              <dl className="mt-5 space-y-2 text-white/80">
                <div className="flex justify-between gap-4"><dt>Phone</dt><dd><a href={SITE.phoneHref} className="link-u font-semibold text-white">{SITE.phone}</a></dd></div>
                <div className="flex justify-between gap-4"><dt>Toll free</dt><dd><a href={SITE.tollFreeHref} className="link-u font-semibold text-white">{SITE.tollFree}</a></dd></div>
                <div className="flex justify-between gap-4"><dt>Fax</dt><dd>{SITE.fax}</dd></div>
                <div className="flex justify-between gap-4"><dt>Email</dt><dd><a href={`mailto:${SITE.email}`} className="link-u font-semibold text-white">{SITE.email}</a></dd></div>
              </dl>
              <p className="mt-5 text-sm text-white/65">Office hours: {SITE.hours}.</p>
              <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6">Open in Google Maps</a>
            </div>
            <div className="rounded-3xl border-2 border-red bg-white p-7">
              <h2 className="text-lg font-semibold text-red-ink">Emergencies</h2>
              <p className="mt-2 text-mute">For fire, flood, or life-threatening situations, call 911. For building-related emergencies after hours (e.g. no heat, major leak), call {SITE.phone} and press 1.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
