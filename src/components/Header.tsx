import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { NAV } from '../data/site'
import { Logo } from './Logo'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    let last = window.scrollY
    const handler = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      if (y > 320 && y > last + 4) setHidden(true)
      else if (y < last - 4 || y <= 320) setHidden(false)
      last = y
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <>
      <motion.header
        className="on-dark sticky top-0 z-50 bg-ink text-white"
        style={{ height: 'var(--ax-header-h)' }}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`wrap flex h-full items-center justify-between gap-6 border-b ${scrolled ? 'border-white/10' : 'border-transparent'}`}>
          <Link to="/" aria-label="Arthex Property Management, condominium management home" className="flex shrink-0 items-center">
            <Logo />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-1 min-[960px]:flex">
            {NAV.filter((n) => n.to !== '/contact').map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `relative px-3 py-2 text-[0.93rem] font-medium transition-colors ${isActive ? 'text-white' : 'text-white/75 hover:text-white'}`}>
                {({ isActive }) => (
                  <>
                    {n.label}
                    <span aria-hidden className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left bg-sun transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
                  </>
                )}
              </NavLink>
            ))}
            <Link to="/contact" className="btn btn-red ml-3 !min-h-[42px] !py-2 text-[0.9rem]">Request a proposal</Link>
          </nav>
          <button
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
            className="relative -mr-2 grid h-12 w-12 place-items-center rounded-full min-[960px]:hidden"
          >
            <span aria-hidden className={`absolute h-[2px] w-6 bg-white transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[5px]'}`} />
            <span aria-hidden className={`absolute h-[2px] w-6 bg-white transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[5px]'}`} />
          </button>
        </div>
      </motion.header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
