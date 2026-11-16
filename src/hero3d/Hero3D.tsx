import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { canRun3D, isCoarse, useActive, useReducedMotion } from './env'
import { asset } from '../lib/env'
import { POSTER_SIZES, posterSet } from './poster'

// three + r3f live in their own chunk, fetched right after the load event (+ idle) so it never competes with LCP.
const TowerScene = lazy(() => import('./TowerScene'))

export type HeroInput = { x: number; y: number; drag: number; tilt: number }

/**
 * Architectural condo massing model (3D) over a baked poster of the exact same 4:3 frame (poster shows until
 * the scene's first frame, then crossfades). Runs on desktop AND phones (phones: lite profile, DPR <= 1.5,
 * no shadow maps, standard materials). Reacts to scroll (orbit + dolly while the hero crosses the viewport),
 * mouse (desktop), horizontal touch drag + device tilt (phones). Reduced motion / Save-Data / no WebGL => poster.
 */
export default function Hero3D({ className = '' }: { className?: string }) {
  const [root, setRoot] = useState<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const { active } = useActive(root)
  const [eligible, setEligible] = useState(false)
  const [lite, setLite] = useState(false)
  const [bake, setBake] = useState(false)
  const [load, setLoad] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const progress = useRef(0.5)
  const input = useRef<HeroInput>({ x: 0, y: 0, drag: 0, tilt: 0 })

  useEffect(() => {
    const b = new URLSearchParams(location.search).has('bake')
    setBake(b)
    setLite(isCoarse() || window.innerWidth < 900)
    setEligible(b || (canRun3D() && !reduced))
  }, [reduced])

  const run = eligible && !failed
  useEffect(() => {
    if (!run || load) return
    if (bake) { setLoad(true); return }
    type W = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (n: number) => void }
    const w = window as W
    let idle = 0, t = 0
    const go = () => setLoad(true)
    const afterLoad = () => { if (w.requestIdleCallback) idle = w.requestIdleCallback(go, { timeout: 700 }); else t = window.setTimeout(go, 150) }
    if (document.readyState === 'complete') afterLoad()
    else window.addEventListener('load', afterLoad, { once: true })
    const evs = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'] as const
    evs.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }))
    return () => {
      window.removeEventListener('load', afterLoad)
      evs.forEach((e) => window.removeEventListener(e, go))
      if (idle) w.cancelIdleCallback?.(idle)
      window.clearTimeout(t)
    }
  }, [run, load, bake])

  useEffect(() => {
    if (!run || !root) return
    let raf = 0
    // 0 = hero entering at the bottom of the viewport, 1 = leaving at the top
    const read = () => { raf = 0; const r = root.getBoundingClientRect(); progress.current = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height))) }
    const on = () => { if (!raf) raf = requestAnimationFrame(read) }
    const pm = (e: PointerEvent) => { if (e.pointerType === 'mouse') { input.current.x = (e.clientX / innerWidth) * 2 - 1; input.current.y = (e.clientY / innerHeight) * 2 - 1 } }
    let sx = -1, base = 0
    const td = (e: PointerEvent) => { if (e.pointerType !== 'mouse') { sx = e.clientX; base = input.current.drag } }
    const tm = (e: PointerEvent) => { if (sx >= 0 && e.pointerType !== 'mouse') input.current.drag = base + ((e.clientX - sx) / Math.max(1, root.clientWidth)) * Math.PI }
    const tu = () => { sx = -1 }
    const ori = (e: DeviceOrientationEvent) => { if (e.gamma != null) input.current.tilt = Math.max(-1, Math.min(1, e.gamma / 35)) }
    const ask = () => {
      const D = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> } | undefined
      D?.requestPermission?.().then((s) => { if (s === 'granted') window.addEventListener('deviceorientation', ori) }).catch(() => {})
    }
    read()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on, { passive: true })
    window.addEventListener('pointermove', pm, { passive: true })
    root.addEventListener('pointerdown', td, { passive: true })
    window.addEventListener('pointermove', tm, { passive: true })
    window.addEventListener('pointerup', tu, { passive: true })
    window.addEventListener('pointercancel', tu, { passive: true })
    root.addEventListener('click', ask, { once: true })
    window.addEventListener('deviceorientation', ori, { passive: true })
    return () => {
      window.removeEventListener('scroll', on); window.removeEventListener('resize', on)
      window.removeEventListener('pointermove', pm); root.removeEventListener('pointerdown', td)
      window.removeEventListener('pointermove', tm); window.removeEventListener('pointerup', tu); window.removeEventListener('pointercancel', tu)
      root.removeEventListener('click', ask); window.removeEventListener('deviceorientation', ori)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [run, root])

  const onReady = useCallback(() => setReady(true), [])
  const onFail = useCallback(() => { setFailed(true); setReady(false) }, [])
  const show = run && load

  return (
    <div ref={setRoot} className={`relative aspect-[4/3] w-full ${className}`} aria-hidden="true" data-hero3d={show && ready ? '3d' : 'poster'} style={{ touchAction: 'pan-y' }}>
      <picture>
        <source type="image/avif" srcSet={posterSet('avif')} sizes={POSTER_SIZES} />
        <img
          src={asset('hero/poster-1600.webp')}
          srcSet={posterSet('webp')}
          sizes={POSTER_SIZES}
          width={1600} height={1200} alt="" decoding="async" draggable={false}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700"
          style={{ opacity: show && ready && !bake ? 0 : bake ? 0 : 1 }}
        />
      </picture>
      {show ? (
        <motion.div className="absolute inset-0" style={{ pointerEvents: 'none' }} initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: bake ? 0.12 : 0.6 }}>
          <Suspense fallback={null}>
            <TowerScene active={active || bake} progress={progress} input={input} lite={lite && !bake} still={bake} onReady={onReady} onPerfFail={onFail} />
          </Suspense>
        </motion.div>
      ) : null}
    </div>
  )
}
