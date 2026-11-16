import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV, SITE } from '../data/site'

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/** Full-screen opaque mobile menu: focus trap, Escape closes, iOS-safe scroll lock, main/footer inert. */
export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const toggle = document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')
    const y = window.scrollY
    const b = document.body.style
    const prev = { position: b.position, top: b.top, width: b.width }
    b.position = 'fixed'; b.top = `-${y}px`; b.width = '100%'
    window.__lenis?.stop()
    const outside = Array.from(document.querySelectorAll<HTMLElement>('main, footer'))
    outside.forEach((el) => el.setAttribute('inert', ''))
    panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      if (e.key !== 'Tab' || !panel.current) return
      const items = [toggle, ...Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE))].filter(Boolean) as HTMLElement[]
      const i = items.indexOf(document.activeElement as HTMLElement)
      e.preventDefault()
      items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      outside.forEach((el) => el.removeAttribute('inert'))
      Object.assign(b, prev)
      window.scrollTo(0, y)
      window.__lenis?.start()
      toggle?.focus({ preventScroll: true })
    }
  }, [open, onClose])

  return (
    <div id="mobile-menu" ref={panel} role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}
      className="on-dark fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-ink text-white min-[960px]:hidden" style={{ top: 'var(--ax-header-h)' }}>
      <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <ul className="border-t border-white/12">
          {[{ to: '/', label: 'Home' }, ...NAV].map((n, i) => (
            <li key={n.to} className="border-b border-white/12" style={{ animation: open ? `ax-rise .55s ${60 + i * 45}ms var(--ax-ease) both` : undefined }}>
              <NavLink to={n.to} end={n.to === '/'} onClick={onClose}
                className={({ isActive }) => `flex items-center justify-between py-4 text-[1.6rem] font-semibold tracking-[-0.02em] ${isActive ? 'text-sun' : 'text-white'}`}>
                {n.label}
                <span aria-hidden className="text-base text-white/40">→</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/contact" onClick={onClose} className="btn btn-red mt-7 w-full justify-center">Request a proposal</Link>
        <div className="mt-auto space-y-1 pt-10 text-white/80">
          <a href={SITE.phoneHref} className="block text-lg font-semibold text-white">{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`} className="block underline underline-offset-4">{SITE.email}</a>
          <p className="text-sm text-white/60">After-hours building emergencies: call {SITE.phone} and press 1.</p>
        </div>
      </nav>
    </div>
  )
}
