import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import StatusCertificate from './pages/StatusCertificate'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Small site: every page ships in the entry chunk (prerendered to static HTML); only the 3D hero is lazy.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="status-certificate" element={<StatusCertificate />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
