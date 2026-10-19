import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/images/logo-clear.png'
import { contactInfo } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

const NAV_LEFT = [
  { to: '/', label: 'Home', end: true },
  { to: '/about-us', label: 'Our Story' },
  { to: '/products', label: 'Shop' },
]

const NAV_RIGHT = [
  { to: '/cotton-yarn', label: 'Cotton Yarn' },
  { to: '/contact-us', label: 'Contact' },
]

const ALL_LINKS = [...NAV_LEFT, ...NAV_RIGHT]

function NavItems({ links, onClick }) {
  return links.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.end}
      onClick={onClick}
      className={({ isActive }) => (isActive ? 'active' : undefined)}
    >
      {link.label}
    </NavLink>
  ))
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count, openDrawer } = useCart()
  const { pathname } = useLocation()
  const close = () => setOpen(false)
  const tel = `tel:${contactInfo.phone.replace(/\s+/g, '')}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`masthead${scrolled ? ' is-scrolled' : ''}${open ? ' menu-open' : ''}`}>
      <div className="masthead-util">
        <div className="container masthead-util-inner">
          <span>Colombo &middot; Sri Lanka</span>
          <span className="masthead-util-mid">Ceylon spices &amp; island produce, exported worldwide</span>
          <span>
            <a href={tel}>{contactInfo.phone}</a>
            <span aria-hidden="true"> &middot; </span>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </span>
        </div>
      </div>

      <div className="container masthead-main">
        <nav className="masthead-nav masthead-nav--left" aria-label="Primary">
          <NavItems links={NAV_LEFT} />
        </nav>

        <Link to="/" className="masthead-logo" onClick={close}>
          <img src={logo} alt="Tvesha Lanka Private Limited" />
        </Link>

        <div className="masthead-right">
          <nav className="masthead-nav" aria-label="Secondary">
            <NavItems links={NAV_RIGHT} />
          </nav>
          <button
            type="button"
            className="cart-btn"
            onClick={() => { close(); openDrawer() }}
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            <span className="cart-btn-label">Cart</span>
            <span className="cart-btn-count">{count}</span>
          </button>
          <button
            type="button"
            className={`menu-toggle${open ? ' is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" inert={open ? undefined : ''}>
        <nav aria-label="Mobile">
          <ol>
            {ALL_LINKS.map((link, i) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} onClick={close}>
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mobile-menu-foot">
          <a href={tel}>{contactInfo.phone}</a>
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          <Link to="/contact-us" className="btn btn-sky" onClick={close}>Request a quote</Link>
        </div>
      </div>
    </header>
  )
}
