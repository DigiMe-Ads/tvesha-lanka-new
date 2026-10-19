import { useState } from 'react'
import { Link } from 'react-router-dom'
import Ornament from './Ornament.jsx'
import logo from '../assets/images/logo.png'
import { contactInfo, productCategories } from '../data/products.js'

const MENU_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'Our Story' },
  { to: '/products', label: 'All Products' },
  { to: '/cotton-yarn', label: 'Cotton Yarn' },
  { to: '/contact-us', label: 'Contact Us' },
]

const ICONS = {
  email: <path d="M3.5 6.5h17v11h-17zM4.5 7.5l7.5 6 7.5-6" />,
  phone: <path d="M6 3h3l1.5 4.5L8 9.5a12 12 0 0 0 6.5 6.5l2-2.5L21 15v3a2 2 0 0 1-2 2C10.7 20 4 13.3 4 5a2 2 0 0 1 2-2Z" />,
  pin: <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21ZM12 7.1a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z" />,
}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

function InvitationBand() {
  return (
    <section className="invitation">
      <div className="container invitation-inner reveal">
        <p className="eyebrow eyebrow--amber">An invitation</p>
        <h2 className="display display--xl">
          Let&rsquo;s bring Ceylon
          <br />
          <em>to your shelves.</em>
        </h2>
        <p className="invitation-text">
          Whether you need a single container of true cinnamon or a long-term sourcing partner
          for spices, flours and natural sweets, our team would love to hear from you.
        </p>
        <div className="invitation-actions">
          <Link to="/contact-us" className="btn btn-amber">
            Request a Quote <span aria-hidden="true">&#8599;</span>
          </Link>
          <Link to="/products" className="btn btn-ghost-light">Browse Products</Link>
        </div>
      </div>
    </section>
  )
}

function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
  }

  return (
    <div className="footer-col footer-news">
      <h3>Tvesha Updates</h3>
      <p>New products, shipments and export offerings from the island.</p>
      <form onSubmit={handleSubmit} className="footer-news-form">
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <button type="submit" aria-label="Subscribe">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </form>
      {sent && <p className="newsletter-thanks">Thanks — you&rsquo;re on the list.</p>}
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      <InvitationBand />
      <footer className="site-footer">
        <div className="container">
          <div className="footer-ornament">
            <Ornament light />
          </div>
          <div className="footer-grid">
            <div className="footer-about">
              <span className="footer-logo-wrap">
                <img src={logo} alt="Tvesha Lanka Private Limited" />
              </span>
              <p className="footer-quote">
                &ldquo;Thoughtfully sourced Ceylon produce, bringing the character of the island
                to tables and partners across the globe.&rdquo;
              </p>
            </div>

            <div className="footer-col">
              <h3>Explore</h3>
              <ul>
                {MENU_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h3>Products</h3>
              <ul>
                {productCategories.map((cat) => (
                  <li key={cat.name}>
                    <Link to={`/products?category=${encodeURIComponent(cat.name)}`}>{cat.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <FooterNewsletter />
          </div>

          <div className="footer-contact-row">
            <div>
              <Icon name="email" />
              <div>
                <h4>Email</h4>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>
            </div>
            <div>
              <Icon name="phone" />
              <div>
                <h4>Call</h4>
                <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}>{contactInfo.phone}</a>
                <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}>WhatsApp {contactInfo.whatsapp}</a>
              </div>
            </div>
            <div>
              <Icon name="pin" />
              <div>
                <h4>Office</h4>
                <p>{contactInfo.address.join(' ')}</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {year} Tvesha Lanka (Pvt) Ltd &middot; All rights reserved</p>
            <p className="footer-tagline">From Ceylon&rsquo;s soil to global tables</p>
          </div>
        </div>
      </footer>
    </>
  )
}
