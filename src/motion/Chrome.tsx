import { motion, useScroll, useSpring } from 'framer-motion'
import { TOWNS } from '../data/site'

/** Thin Arthex-red reading-progress line pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.3 })
  return <motion.div aria-hidden className="ax-progress" style={{ scaleX: x }} />
}

/** Endless marquee of the towns Arthex serves (from arthex.ca). Second copy is aria-hidden. */
export function TownMarquee() {
  return (
    <section aria-label="Communities we serve" className="ax-mq">
      <p className="sr-only">Communities we serve: {TOWNS.join(', ')}.</p>
      <div className="ax-mq-track" aria-hidden="true">
        {[0, 1].map((k) => (
          <ul key={k} className="ax-mq-row">
            {TOWNS.map((t, i) => (
              <li key={t} className={i % 2 ? 'ax-mq-o' : ''}>{t}<span className="ax-mq-dot" /></li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
