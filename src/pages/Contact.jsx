import PageBanner from '../components/PageBanner.jsx'
import ContactForm from '../components/ContactForm.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { contactInfo } from '../data/products.js'

const ICONS = {
  address: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 3h3l1.5 4.5L8 9.5a12 12 0 0 0 6.5 6.5l2-2.5L21 15v3a2 2 0 0 1-2 2C10.7 20 4 13.3 4 5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17.2 4 20l2.9-2.9A8 8 0 1 1 10 19l-3 .9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5.8-1l-.7-1.6c-.2-.4-.6-.5-1-.3l-.7.3a4 4 0 0 1-2.3-2.3l.3-.7c.2-.4.1-.8-.3-1L9.9 8.2c-.5-.2-1 .2-1 .8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default function Contact() {
  const mapQuery = encodeURIComponent('#33, Horton Place, Colombo 00700, Sri Lanka')

  const items = [
    { key: 'address', label: 'Visit us', value: contactInfo.address.join(' ') },
    { key: 'phone', label: 'Call us', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s+/g, '')}` },
    { key: 'whatsapp', label: 'WhatsApp', value: contactInfo.whatsapp, href: `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}` },
    { key: 'email', label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  ]

  return (
    <>
      <PageBanner
        title={<>Contact <em>Us</em></>}
        crumb="Contact Us"
        eyebrow="Let's talk"
        text="For export enquiries, quotations or partnerships, our team is happy to help."
      />
      <section className="section section--top-tight">
        <div className="container contact-grid reveal">
          <div className="contact-info-card">
            <p className="eyebrow eyebrow--amber">Get in touch</p>
            <h2 className="display">We&rsquo;d love to <em>hear from you.</em></h2>
            <ul className="contact-info-list">
              {items.map((item) => (
                <li key={item.key}>
                  <span className="contact-icon">{ICONS[item.key]}</span>
                  <div>
                    <strong>{item.label}</strong>
                    {item.href ? <a href={item.href}>{item.value}</a> : <p>{item.value}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section section--top-tight">
        <div className="container">
          <SectionHead eyebrow="Horton Place, Colombo 07" title={<>Our <em>Location</em></>} />
          <div className="map-embed reveal">
            <iframe
              title="Tvesha Lanka (Pvt) Ltd location"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}
