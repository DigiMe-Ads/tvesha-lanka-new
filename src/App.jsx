import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import CottonYarn from './pages/CottonYarn.jsx'
import Contact from './pages/Contact.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/**
 * Fades `.reveal` elements up as they enter the viewport. Re-scans on every
 * route change so freshly mounted pages animate too.
 */
function RevealOnScroll() {
  const location = useLocation()
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [location.pathname, location.search])
  return null
}

export default function App() {
  return (
    <div className="site">
      <ScrollToTop />
      <RevealOnScroll />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cotton-yarn" element={<CottonYarn />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
