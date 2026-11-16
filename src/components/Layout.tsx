import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import Seo from '../lib/Seo'
import { SmoothScroll } from '../motion/SmoothScroll'
import { useMotionScan } from '../motion/scan'
import { ScrollProgress, TownMarquee } from '../motion/Chrome'
import { prefersReduced } from '../motion/env'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Layout() {
  const { pathname } = useLocation()
  const first = useRef(true)
  const [wipe, setWipe] = useState(0)
  useMotionScan(pathname)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    if (!prefersReduced()) setWipe((n) => n + 1)
    const l = window.__lenis
    if (l) l.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname])
  return (
    <SmoothScroll anchorOffset={-88}>
      <a href="#main" className="skip">Skip to content</a>
      <Seo />
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <motion.div key={pathname} initial={first.current ? false : { opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}>
          <Outlet />
        </motion.div>
      </main>
      <TownMarquee />
      <Footer />
      {wipe ? (
        <motion.div key={wipe} aria-hidden className="ax-curtain" initial={{ y: '0%' }} animate={{ y: '-101%' }} transition={{ duration: 0.75, ease: EASE, delay: 0.05 }}>
          <span className="ax-curtain-line" />
        </motion.div>
      ) : null}
    </SmoothScroll>
  )
}
