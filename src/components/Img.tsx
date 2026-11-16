import images from '../data/images.json'
import { asset } from '../lib/env'

type Entry = { w: number; h: number; ws: number[]; avif?: boolean }
const M = images as Record<string, Entry>

const set = (id: string, e: Entry, ext: string) => e.ws.map((w) => `${asset(`img/${id}-${w}.${ext}`)} ${w}w`).join(', ')

/**
 * Arthex photo from arthex.ca. Mastered photos (12K masters in ../images-12k) ship as <picture> with AVIF + WebP
 * 640..5120w; aspect reserved from images.json (no CLS). `sizes` must describe the DISPLAYED width, including
 * object-cover overscan (a wide banner in a tall box renders wider than its box).
 */
export default function Img({ id, alt, sizes = '100vw', className = '', imgClassName = '', priority = false, cover = true, position = '50% 50%' }: {
  id: string; alt: string; sizes?: string; className?: string; imgClassName?: string; priority?: boolean; cover?: boolean; position?: string
}) {
  const e = M[id]
  if (!e) throw new Error('unknown image ' + id)
  const src = asset(`img/${id}-${e.ws[Math.min(1, e.ws.length - 1)]}.webp`)
  return (
    <div className={`overflow-hidden ${priority ? 'ax-img ax-img-hero' : 'ax-img'} ${className}`}>
      <picture>
        {e.avif ? <source type="image/avif" srcSet={set(id, e, 'avif')} sizes={sizes} /> : null}
        <img src={src} srcSet={set(id, e, 'webp')} sizes={sizes} width={e.w} height={e.h} alt={alt}
          loading={priority ? 'eager' : 'lazy'} decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          className={`${cover ? 'h-full w-full object-cover' : ''} ${imgClassName}`} style={{ objectPosition: position }} />
      </picture>
    </div>
  )
}
