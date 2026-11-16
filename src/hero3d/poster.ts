import { asset } from '../lib/env'

/** Hero poster = still render of the live TowerScene (12K master in ../images-12k/masters/hero-poster-12k.png). */
export const POSTER_WS = [640, 1024, 1600, 2400, 3200, 5120]
export const posterSet = (ext: 'avif' | 'webp') => POSTER_WS.map((w) => `${asset(`hero/poster-${w}.${ext}`)} ${w}w`).join(', ')
/** Displayed width of [data-hero3d]: phones = full bleed (-mx-4), >=900px = grid column + 4rem bleed (max wrap 1240). */
export const POSTER_SIZES = '(max-width: 899px) calc(100vw - 8px), min(58vw, 720px)'
