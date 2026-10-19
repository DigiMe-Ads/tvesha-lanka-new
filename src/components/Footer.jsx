import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { contactInfo, productCategories } from '../data/products.js'

const MENU_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'Our Story' },
  { to: '/products', label: 'Shop All' },
  { to: '/cotton-yarn', label: 'Cotton Yarn' },
  { to: '/contact-us', label: 'Contact' },
]

function InvitationBand() {
  const tel = `tel:${contactInfo.phone.replace(/\s+/g, '')}`
  return (
    <section className="invite">
      <div className="container invite-grid reveal">
        <div>
          <p className="eyebrow eyebrow--sky eyebrow--rule">An invitation</p>
          <h2 className="invite-title">
            Let&rsquo;s bring Ceylon <em>to your shelves.</em>
          </h2>
        </div>
        <div className="invite-side">
          <p>
            Whether you need a single container of true cinnamon or a long-term sourcing partner
            for spices, flours and natural sweets, our team would love to hear from you.
          </p>
          <div className="invite-actions">
            <Link to="/contact-us" className="btn btn-sky">Request a quote <span aria-hidden="true">&rarr;</span></Link>
            <Link to="/products" className="btn btn-ghost-light">Shop online</Link>
          </div>
          <dl className="invite-contact">
            <div><dt>Call</dt><dd><a href={tel}>{contactInfo.phone}</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></dd></div>
          </dl>
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
      <h3>Tvesha updates</h3>
      <p>New products, shipments and export offerings from the island.</p>
      <form onSubmit={handleSubmit} className="footer-news-form">
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <button type="submit">Join</button>
      </form>
      {sent && <p className="newsletter-thanks">Thanks — you&rsquo;re on the list.</p>}
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  // The invitation CTA would only distract mid-purchase.
  const onCheckout = useLocation().pathname === '/checkout'

  return (
    <>
      {!onCheckout && <InvitationBand />}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col footer-about">
              <h3>Tvesha Lanka (Pvt) Ltd</h3>
              <p>
                Thoughtfully sourced Ceylon produce, bringing the character of the island to
                tables and partners across the globe.
              </p>
              <address>
                {contactInfo.address.join(' ')}
                <br />
                <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}>{contactInfo.phone}</a>
                <br />
                <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}>WhatsApp {contactInfo.whatsapp}</a>
              </address>
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
              <h3>Shop</h3>
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
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          Tvesha <em>Lanka</em>
        </div>

        <div className="container footer-bottom">
          <p>&copy; {year} Tvesha Lanka (Pvt) Ltd</p>
          <p>From Ceylon&rsquo;s soil to global tables</p>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            Back to top &uarr;
          </a>
        </div>
      </footer>
    </>
  )
}
