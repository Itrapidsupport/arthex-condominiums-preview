import { POSTER_SIZES, posterSet } from '../hero3d/poster'
/** Per-route SEO, used at runtime (lib/Seo.tsx) and at build time (scripts/postbuild.mjs). Preview = noindex. */
import { FAQ, SITE } from './site'

export type SeoEntry = { path: string; title: string; description: string; jsonld?: unknown }

// Canonical points at the preview URL (this is not arthex.ca and must never claim to be).
export const ORIGIN = 'https://itrapidsupport.github.io/arthex-condominiums-preview'
export const canonical = (path: string) => ORIGIN + (path === '/' ? '/' : path.replace(/\/+$/, '') + '/')

const ORG = {
  '@type': 'LocalBusiness',
  '@id': ORIGIN + '/#org',
  name: SITE.legal,
  alternateName: 'Arthex',
  url: 'https://www.arthex.ca/',
  email: SITE.email,
  telephone: '+1-905-340-0622',
  faxNumber: '+1-905-340-0588',
  slogan: SITE.tagline,
  foundingDate: '1972',
  address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.city, addressRegion: SITE.region, postalCode: SITE.postal, addressCountry: 'CA' },
  openingHours: 'Mo-Fr 09:00-17:00',
  areaServed: ['Peel', 'Brant', 'Halton', 'Wellington', 'Waterloo', 'Wentworth', 'Haldimand', 'Niagara'].map((n) => ({ '@type': 'AdministrativeArea', name: n + ' Region, Ontario' })),
}
const graph = (...nodes: unknown[]) => ({ '@context': 'https://schema.org', '@graph': [ORG, ...nodes] })
const crumb = (name: string, path: string) => ({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: canonical('/') }, { '@type': 'ListItem', position: 2, name, item: canonical(path) }] })

export const SEO: SeoEntry[] = [
  {
    path: '/',
    title: 'Condominium Management in Burlington and Southwestern Ontario | Arthex',
    description: 'Arthex Property Management (1983) Inc. delivers full-service condominium management for boards, owners and residents across Halton, Peel, Hamilton and Niagara. ACMO 2000 certified, since 1972.',
    jsonld: graph({ '@type': 'WebSite', '@id': ORIGIN + '/#website', url: canonical('/'), name: 'Arthex condominium management (preview)', publisher: { '@id': ORIGIN + '/#org' }, inLanguage: 'en-CA' }),
  },
  {
    path: '/services',
    title: 'Condominium Management Services | Arthex Property Management',
    description: 'Administration, financial and property management services for Ontario condominium corporations: budgets, reserve funds, meetings, status certificates, inspections and a 24-hour emergency line.',
    jsonld: graph({ '@type': 'Service', name: 'Condominium management', serviceType: 'Condominium property management', provider: { '@id': ORIGIN + '/#org' }, areaServed: 'Southwestern Ontario' }, crumb('Services', '/services')),
  },
  {
    path: '/about',
    title: 'About Arthex | Condominium Management Since 1972',
    description: 'A third-generation property management firm founded in 1972, ACMO 2000 certified, CMRAO licensed, ACMO and CCI corporate member with an A+ BBB rating.',
    jsonld: graph({ '@type': 'AboutPage', url: canonical('/about'), about: { '@id': ORIGIN + '/#org' } }, crumb('About', '/about')),
  },
  {
    path: '/status-certificate',
    title: 'Order a Condo Status Certificate | Arthex Property Management',
    description: 'Order status certificates for Arthex-managed condominiums online through CONDUIT at statuscertificate.com. $128.25 including the provider fee, delivered as a PDF.',
    jsonld: graph(crumb('Status certificates', '/status-certificate')),
  },
  {
    path: '/faq',
    title: 'Condominium FAQ | Arthex Property Management',
    description: 'Answers for condominium boards, owners and residents: insurance and certification, community website access, emergencies, maintenance requests and status certificates.',
    jsonld: graph({ '@type': 'FAQPage', mainEntity: FAQ.flatMap((g) => g.items).map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })) }, crumb('FAQ', '/faq')),
  },
  {
    path: '/contact',
    title: 'Contact Arthex | Request a Condominium Management Proposal',
    description: 'Contact Arthex Property Management at 980 Fraser Drive, Suite 204, Burlington. Call 905-340-0622 or 1-866-573-3878, or email info@arthex.ca for a free consultation or proposal.',
    jsonld: graph({ '@type': 'ContactPage', url: canonical('/contact'), mainEntity: { '@id': ORIGIN + '/#org' } }, crumb('Contact', '/contact')),
  },
]

export const NOT_FOUND: SeoEntry = { path: '/404', title: 'Page not found | Arthex Property Management', description: 'This page could not be found.' }

export function seoFor(path: string): SeoEntry {
  const p = path.replace(/\/+$/, '') || '/'
  return SEO.find((e) => e.path === p) ?? NOT_FOUND
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
export function headHtml(path: string): string {
  const e = seoFor(path)
  const nf = e.path === '/404'
  const url = canonical(path)
  const ld = e.jsonld ? `\n    <script type="application/ld+json">${JSON.stringify(e.jsonld).replace(/</g, '\\u003c')}</script>` : ''
  return `<!--SEO:START-->
    <title>${esc(e.title)}</title>
    <meta name="description" content="${esc(e.description)}" />
${nf ? '' : `    <link rel="canonical" href="${url}" />\n`}    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Arthex Property Management" />
    <meta property="og:locale" content="en_CA" />
    <meta property="og:title" content="${esc(e.title)}" />
    <meta property="og:description" content="${esc(e.description)}" />
${nf ? '' : `    <meta property="og:url" content="${url}" />`}${ld}${e.path === '/' ? `\n    <link rel="preload" as="image" type="image/avif" imagesrcset="${posterSet('avif')}" imagesizes="${POSTER_SIZES}" fetchpriority="high" />` : ''}
    <!--SEO:END-->`
}
