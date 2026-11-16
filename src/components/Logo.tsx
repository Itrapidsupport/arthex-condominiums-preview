import { asset } from '../lib/env'

/**
 * Arthex logo. `light`: lockup for dark backgrounds = their skyline/house mark (vector SVG traced from
 * arthex-2019-logo.png, sharp at any DPR) + the wordmark set as live text, matching the
 * white-text version they use on arthex.ca. `light={false}`: their full stacked logo (vector SVG) for white backgrounds; `onDark` swaps in the white-text variant.
 */
export function Logo({ light = true, onDark = false, className = '' }: { light?: boolean; onDark?: boolean; className?: string }) {
  if (!light) return <img src={asset(onDark ? 'brand/arthex-2019-logo-white.svg' : 'brand/arthex-2019-logo.svg')} width={564} height={476} alt="Arthex Property Management (1983) Inc." className={`w-auto ${className}`} />
  return (
    <span className={`inline-flex items-end gap-2.5 ${className}`}>
      <img src={asset('brand/arthex-mark.svg')} width={532} height={397} alt="" className="h-[46px] w-auto" />
      <span className="flex flex-col pb-[3px] leading-none text-white">
        <span className="text-[1.2rem] font-bold tracking-[-0.01em]">Arthex</span>
        <span className="mt-[3px] text-[0.72rem] font-normal tracking-[0.005em] text-white/90">Property Management (1983) Inc.</span>
      </span>
      <span className="sr-only">Arthex Property Management (1983) Inc.</span>
    </span>
  )
}
