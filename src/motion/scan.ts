import { useEffect } from 'react'
import { gsap, ScrollTrigger } from './gsap'
import { prefersReduced } from './env'

/** Wrap every word of a heading in .ax-w > .ax-wi (mask + rising inner). Text stays in the DOM, so SR/SEO read it normally. */
function splitWords(h: HTMLElement) {
  if (h.dataset.split) return
  h.dataset.split = '1'
  let i = 0
  const walk = (n: Node) => {
    Array.from(n.childNodes).forEach((c) => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment()
        ;(c.textContent || '').split(/(\s+)/).forEach((p) => {
          if (!p) return
          if (/^\s+$/.test(p)) { frag.append(p); return }
          const o = document.createElement('span'); o.className = 'ax-w'
          const inn = document.createElement('span'); inn.className = 'ax-wi'; inn.style.setProperty('--i', String(i++)); inn.textContent = p
          o.append(inn); frag.append(o)
        })
        c.replaceWith(frag)
      } else if (c.nodeType === 1 && !(c as HTMLElement).classList.contains('ax-w')) walk(c)
    })
  }
  walk(h)
  h.classList.add('ax-split')
}

/**
 * Page motion pass, re-run on every route change (after hydration only, so SSR HTML is never hidden):
 * word reveals on headings, image mask wipes + parallax, staggered card reveals with tilt/lift,
 * magnetic buttons, dark-section clip transitions. Elements get .in from one IntersectionObserver.
 */
export function useMotionScan(key: string) {
  useEffect(() => {
    const main = document.getElementById('main')
    if (!main) return
    const reduced = prefersReduced()
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const off: (() => void)[] = []
    const tweens: gsap.core.Tween[] = []

    if (!reduced) main.querySelectorAll<HTMLElement>('h1, h2').forEach(splitWords)
    main.querySelectorAll<HTMLElement>('.rv.rounded-2xl, li.rv, .rounded-2xl.border:not(.ax-img)').forEach((c) => c.classList.add('ax-card'))

    // one observer adds .in (headings, reveals, rules, images)
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv:not(.in), .draw:not(.in), .ax-split:not(.in), .ax-img:not(.in)'))
    if (!('IntersectionObserver' in window)) els.forEach((e) => e.classList.add('in'))
    else {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add('in'); io.unobserve(e.target) }
      }), { rootMargin: '0px 0px -8% 0px' })
      els.forEach((e) => io.observe(e))
      off.push(() => io.disconnect())
    }

    if (!reduced) {
      // photo parallax (images not already inside a <Parallax> frame)
      main.querySelectorAll<HTMLElement>('.ax-img').forEach((w) => {
        if (w.closest('[data-parallax]')) return
        const img = w.querySelector('img'); if (!img) return
        const hero = w.classList.contains('ax-img-hero')
        tweens.push(gsap.fromTo(img, { yPercent: hero ? 0 : -7, scale: hero ? 1.08 : 1.16 }, {
          yPercent: hero ? 14 : 7, scale: hero ? 1.16 : 1.16, ease: 'none',
          scrollTrigger: { trigger: w, start: hero ? 'top top' : 'top bottom', end: 'bottom top', scrub: true },
        }))
      })
      // section transitions: dark/red bands open from a rounded inset card to full bleed
      main.querySelectorAll<HTMLElement>('section.on-dark').forEach((s, i) => {
        if (i === 0 && s === main.querySelector('section')) return
        tweens.push(gsap.fromTo(s, { clipPath: 'inset(4% 3% 0% 3% round 28px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
          scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 30%', scrub: true },
        }))
      })
      // marquee speeds up with scroll velocity
      const mq = document.querySelectorAll<HTMLElement>('.ax-mq-track')
      if (mq.length) {
        let raf = 0
        const tick = () => {
          const v = Math.abs(window.__lenis?.velocity ?? 0)
          mq.forEach((t) => t.getAnimations().forEach((a) => { a.playbackRate += (1 + Math.min(v, 60) / 8 - a.playbackRate) * 0.1 }))
          raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        off.push(() => cancelAnimationFrame(raf))
      }
    }

    if (fine && !reduced) {
      // card tilt + lift
      main.querySelectorAll<HTMLElement>('.ax-card').forEach((c) => {
        const mv = (e: PointerEvent) => {
          const r = c.getBoundingClientRect()
          c.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`)
          c.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 7}deg`)
          c.classList.add('tilt')
        }
        const lv = () => { c.classList.remove('tilt'); c.style.removeProperty('--rx'); c.style.removeProperty('--ry') }
        c.addEventListener('pointermove', mv); c.addEventListener('pointerleave', lv)
        off.push(() => { c.removeEventListener('pointermove', mv); c.removeEventListener('pointerleave', lv) })
      })
      // magnetic buttons
      document.querySelectorAll<HTMLElement>('.btn').forEach((b) => {
        const mv = (e: PointerEvent) => {
          const r = b.getBoundingClientRect()
          b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.28}px ${(e.clientY - r.top - r.height / 2) * 0.35}px`
        }
        const lv = () => { b.style.translate = '' }
        b.addEventListener('pointermove', mv); b.addEventListener('pointerleave', lv)
        off.push(() => { b.removeEventListener('pointermove', mv); b.removeEventListener('pointerleave', lv); lv() })
      })
    }

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60)
    return () => {
      window.clearTimeout(id)
      off.forEach((f) => f())
      tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill() })
    }
  }, [key])
}
