import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { contactInfo } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about-us', label: 'Our Story' },
  { to: '/products', label: 'Products' },
  { to: '/cotton-yarn', label: 'Cotton Yarn' },
  { to: '/contact-us', label: 'Contact Us' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)
  const { count, openDrawer } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="announce-bar">
        Export enquiries welcome &middot; <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
      </div>
      <div className="header-inner container">
        <NavLink to="/" className="brand" onClick={close}>
          <img src={logo} alt="Tvesha Lanka Private Limited" />
        </NavLink>

        <nav className={`main-nav${open ? ' is-open' : ''}`} aria-label="Main">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={close}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact-us" className="btn btn-primary btn-sm nav-cta-mobile" onClick={close}>
            Request a Quote
          </Link>
        </nav>

        <div className="header-actions">
          <a className="icon-btn" href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} aria-label="Call us">
            <svg viewBox="0 0 24 24" fill="none"><path d="M6 3h3l1.5 4.5L8 9.5a12 12 0 0 0 6.5 6.5l2-2.5L21 15v3a2 2 0 0 1-2 2C10.7 20 4 13.3 4 5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
          </a>
          <a className="icon-btn" href={`mailto:${contactInfo.email}`} aria-label="Email us">
            <svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <button type="button" className="cart-btn" onClick={() => { close(); openDrawer() }} aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d="M3.5 4.5h2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.4-1.1l1.6-6.3H6.4" /><circle cx="9.5" cy="19.5" r="1.2" /><circle cx="17" cy="19.5" r="1.2" /></svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>
          <Link to="/contact-us" className="btn btn-primary btn-sm header-cta">Request a Quote</Link>
          <button
            className={`nav-toggle${open ? ' is-open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
