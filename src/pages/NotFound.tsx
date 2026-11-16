import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="wrap py-28 sm:py-40">
      <p className="eyebrow">404</p>
      <h1 className="h-display mt-5 text-[clamp(2.4rem,6vw,4rem)]">This page could not be found.</h1>
      <p className="lede mt-5 max-w-xl">The page may have moved. Start from condominium management or contact the Arthex team.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn btn-red">Condominium management</Link>
        <Link to="/contact" className="btn btn-ghost">Contact us</Link>
      </div>
    </section>
  )
}
