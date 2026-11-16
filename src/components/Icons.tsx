/** Line icons + building-type drawings (designed graphics for slots with no Arthex photo). */
export const Tick = () => (
  <svg viewBox="0 0 20 20" className="tick" aria-hidden><circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeOpacity=".35" /><path d="M6 10.3l2.6 2.5L14 7.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const Arrow = () => <span aria-hidden className="arr">→</span>

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' as const }
export function BuildingGlyph({ kind }: { kind: string }) {
  if (kind === 'townhouse')
    return (
      <svg viewBox="0 0 120 80" className="h-20 w-auto" aria-hidden>
        {[0, 1, 2, 3].map((i) => <g key={i}><path {...S} d={`M${8 + i * 26} 72V38l13-12 13 12v34`} /><rect {...S} x={15 + i * 26} y={50} width={12} height={22} /></g>)}
        <path {...S} d="M4 72h112" /><path d="M17 31l4-4 4 4" fill="none" stroke="var(--ax-red)" strokeWidth="1.6" />
      </svg>
    )
  if (kind === 'stacked')
    return (
      <svg viewBox="0 0 120 80" className="h-20 w-auto" aria-hidden>
        <path {...S} d="M14 72V30h92v42M14 51h92M37 30v42M60 30v42M83 30v42M10 30l50-14 50 14" />
        {[0, 1, 2, 3].map((i) => <rect key={i} {...S} x={20 + i * 23} y={36} width={10} height={9} />)}
        <path {...S} d="M4 72h112" /><path d="M52 18.3l8-2.3 8 2.3" fill="none" stroke="var(--ax-red)" strokeWidth="1.6" />
      </svg>
    )
  if (kind === 'midrise')
    return (
      <svg viewBox="0 0 120 80" className="h-20 w-auto" aria-hidden>
        <path {...S} d="M24 72V20h72v52" />
        {[26, 36, 46, 56].map((y) => <path key={y} {...S} d={`M24 ${y}h72`} />)}
        {[36, 48, 60, 72, 84].map((x) => <path key={x} {...S} strokeOpacity=".45" d={`M${x} 20v46`} />)}
        <path {...S} d="M4 72h112M52 72v-6h16v6" /><path d="M24 20h72" stroke="var(--ax-red)" strokeWidth="1.6" />
      </svg>
    )
  return (
    <svg viewBox="0 0 120 80" className="h-20 w-auto" aria-hidden>
      <path {...S} d="M44 72V6h32v66M76 72V28h22v44M22 72V40h22v32" />
      {Array.from({ length: 10 }, (_, i) => <path key={i} {...S} strokeOpacity=".5" d={`M44 ${12 + i * 6}h32`} />)}
      <path {...S} d="M4 72h112" /><path d="M44 6h32" stroke="var(--ax-red)" strokeWidth="1.6" />
    </svg>
  )
}
