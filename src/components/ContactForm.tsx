import { useRef, useState, type FormEvent } from 'react'
import { SITE } from '../data/site'

type F = { first: string; last: string; email: string; phone: string; position: string; type: string; corp: string; address: string; units: string; message: string }
const EMPTY: F = { first: '', last: '', email: '', phone: '', position: '', type: 'Request for proposal', corp: '', address: '', units: '', message: '' }

/** Accessible form; submit composes a mailto: to the address Arthex publishes (info@arthex.ca). No backend. */
export default function ContactForm() {
  const [f, setF] = useState<F>(EMPTY)
  const [err, setErr] = useState<Partial<Record<keyof F, string>>>({})
  const [status, setStatus] = useState('')
  const form = useRef<HTMLFormElement>(null)
  const set = (k: keyof F) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const x: Partial<Record<keyof F, string>> = {}
    if (!f.first.trim()) x.first = 'Please enter your first name.'
    if (!f.last.trim()) x.last = 'Please enter your last name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Please enter a valid email address.'
    if (!f.phone.trim()) x.phone = 'Please enter a phone number.'
    if (!f.message.trim()) x.message = 'Please tell us how we can help.'
    setErr(x)
    if (Object.keys(x).length) {
      setStatus('Please fix the highlighted fields.')
      form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }
    const body = [
      `Name: ${f.first} ${f.last}`, `Position: ${f.position || '-'}`, `Email: ${f.email}`, `Phone: ${f.phone}`, '',
      `Corporation number: ${f.corp || '-'}`, `Corporation address: ${f.address || '-'}`, `Number of units: ${f.units || '-'}`, '', f.message,
    ].join('\n')
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`${f.type}: ${f.first} ${f.last}`)}&body=${encodeURIComponent(body)}`
    setStatus(`Your email app should open with the message addressed to ${SITE.email}.`)
  }

  const field = (k: keyof F, label: string, type = 'text', req = false, auto?: string) => (
    <div>
      <label htmlFor={`f-${k}`} className="block text-sm font-semibold">{label}{req ? <span className="text-red-ink"> *</span> : null}</label>
      <input id={`f-${k}`} name={k} type={type} autoComplete={auto} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `e-${k}` : undefined} required={req}
        className="mt-2 block min-h-[48px] w-full rounded-xl border border-line bg-white px-4 text-[1rem] outline-none transition focus:border-ink focus-visible:outline-2 focus-visible:outline-red aria-[invalid=true]:border-red" />
      {err[k] ? <p id={`e-${k}`} className="mt-1.5 text-sm text-red-ink">{err[k]}</p> : null}
    </div>
  )
  const select = (k: keyof F, label: string, opts: string[]) => (
    <div>
      <label htmlFor={`f-${k}`} className="block text-sm font-semibold">{label}</label>
      <select id={`f-${k}`} name={k} value={f[k]} onChange={set(k)} className="mt-2 block min-h-[48px] w-full appearance-none rounded-xl border border-line bg-white bg-[length:14px] bg-[right_1rem_center] bg-no-repeat px-4 pr-10 text-[1rem]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Cpath d='M2 5l5 5 5-5' fill='none' stroke='%2317181b' stroke-width='1.6'/%3E%3C/svg%3E\")" }}>
        {opts.map((o) => <option key={o} value={o === 'Choose an option' ? '' : o}>{o}</option>)}
      </select>
    </div>
  )

  return (
    <form ref={form} onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">{select('type', 'I would like', ['Request for proposal', 'Free consultation', 'General question'])}</div>
      {field('first', 'First name', 'text', true, 'given-name')}
      {field('last', 'Last name', 'text', true, 'family-name')}
      {field('email', 'Email address', 'email', true, 'email')}
      {field('phone', 'Phone', 'tel', true, 'tel')}
      {select('position', 'Position', ['Choose an option', 'Owner', 'Board Member', 'President', 'Other Officer', 'Other'])}
      {field('units', 'Number of units', 'text')}
      {field('corp', 'Corporation number', 'text')}
      {field('address', 'Corporation address', 'text', false, 'street-address')}
      <div className="sm:col-span-2">
        <label htmlFor="f-message" className="block text-sm font-semibold">How can we help?<span className="text-red-ink"> *</span></label>
        <textarea id="f-message" name="message" rows={5} value={f.message} onChange={set('message')} aria-invalid={!!err.message} aria-describedby={err.message ? 'e-message' : undefined} required
          className="mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-[1rem] outline-none focus:border-ink aria-[invalid=true]:border-red" />
        {err.message ? <p id="e-message" className="mt-1.5 text-sm text-red-ink">{err.message}</p> : null}
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className="btn btn-red">Send to {SITE.email}</button>
        <p role="status" aria-live="polite" className="text-sm text-mute">{status}</p>
      </div>
    </form>
  )
}
