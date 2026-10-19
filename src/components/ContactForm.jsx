import { useState } from 'react'

const initialState = { name: '', email: '', phone: '', subject: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Wire this up to your mail/API endpoint of choice.
    setSubmitted(true)
    setForm(initialState)
  }

  return (
    <div className="contact-form-panel">
      <p className="eyebrow eyebrow--rule">(02) &nbsp;Enquiry form</p>
      <h2 className="display">Send us <em>a message</em></h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Your Name</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="email">Your Email Id</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" rows={6} value={form.message} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Send message <span aria-hidden="true">&rarr;</span></button>
        {submitted && <p className="form-thanks">Thanks for reaching out — we&rsquo;ll be in touch shortly.</p>}
      </form>
    </div>
  )
}
