import { CtaBand, PageHero } from '../components/ui'
import { Arrow } from '../components/Icons'
import { SITE } from '../data/site'

const STEPS = [
  { t: 'Search the corporation', b: 'Visit statuscertificate.com, where you can search 24/7 for the property by corporation number or address.' },
  { t: 'Set up your CONDUIT login', b: 'If this is your first time using CONDUIT, set up your user ID and password. Record them for future use; you will need them to access your certificate once completed.' },
  { t: 'Order and pay online', b: 'Fill in the required forms online and pay $128.25 by credit card: $100.00 for the status certificate and $28.25 charged by the web service provider as a convenience fee.' },
  { t: 'Download the PDF', b: 'Once your order is processed you will be notified by email that the certificate may be downloaded. Save the PDF and email it to the agent, lawyer and owner.' },
]

export default function StatusCertificate() {
  return (
    <>
      <PageHero eyebrow="Order status certificate" title="Status certificates, ordered online." lede="Arthex provides secure, efficient processing of condominium status certificates for buyers, sellers, and legal representatives, through CONDUIT." img="proposal" />
      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <ol className="space-y-5">
            {STEPS.map((s, i) => (
              <li key={s.t} className="rv grid grid-cols-[3rem_1fr] gap-4 rounded-2xl border border-line bg-white p-6 sm:p-8" style={{ ['--d' as string]: `${i * 90}ms` }}>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-red text-lg font-semibold text-white">{i + 1}</span>
                <div>
                  <h2 className="text-lg font-semibold">{s.t}</h2>
                  <p className="mt-1.5 text-mute">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
          <aside className="rv h-fit rounded-3xl bg-ink p-8 text-white on-dark lg:sticky lg:top-28">
            <p className="text-sm uppercase tracking-[0.14em] text-white/65">Total online price</p>
            <p className="mt-2 text-5xl font-semibold tracking-tight">$128.25</p>
            <p className="mt-2 text-white/75">$100.00 certificate + $28.25 provider convenience fee</p>
            <div className="my-7 h-px bg-white/15" />
            <p className="text-white/80">Status certificates are often completed and delivered electronically in two business days; more complicated certificates may take longer. You should always receive your status certificate within 10 days as per the Condominium Act, 1998.</p>
            <a href={SITE.conduit} target="_blank" rel="noopener noreferrer" className="btn btn-red mt-8 w-full justify-center">Order through CONDUIT <Arrow /></a>
            <p className="mt-5 text-sm text-white/60">Check your spam or junk folder for confirmations, and add statuscertificate.com to your safe list. Including attachments, a certificate can exceed 100 pages; please check whether your solicitor or mortgagee accepts an electronic copy before printing.</p>
          </aside>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
