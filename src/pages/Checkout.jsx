import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { DELIVERY_OPTIONS, deliveryCost, useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/products.js'
import { resolveImage } from '../components/ProductCard.jsx'
import Ornament from '../components/Ornament.jsx'

/*
 * Demo checkout. Nothing here is sent anywhere or saved: card details live
 * only in component state and are discarded when the "payment" completes.
 */

const STEPS = ['Cart', 'Details', 'Payment', 'Confirmation']
const TEST_CARD = { number: '4242 4242 4242 4242', name: 'DEMO CUSTOMER', expiry: '12/30', cvc: '123' }

const PROCESSING_STAGES = [
  'Securing connection',
  'Contacting issuing bank',
  'Verifying 3-D Secure',
  'Payment authorised',
]

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / debit card', note: 'Visa, Mastercard, Amex' },
  { id: 'bank', label: 'Bank transfer', note: 'Pay to our account within 48h' },
  { id: 'cod', label: 'Cash on delivery', note: 'Sri Lanka only' },
]

const emptyDetails = { name: '', email: '', phone: '', address: '', city: '', postcode: '', country: 'Sri Lanka' }

function luhnValid(num) {
  const digits = num.replace(/\D/g, '')
  if (digits.length < 13) return false
  let sum = 0
  for (let i = 0; i < digits.length; i += 1) {
    let d = Number(digits[digits.length - 1 - i])
    if (i % 2 === 1) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return sum % 10 === 0
}

function expiryValid(value) {
  const m = /^(\d{2})\/(\d{2})$/.exec(value)
  if (!m) return false
  const month = Number(m[1])
  const year = 2000 + Number(m[2])
  if (month < 1 || month > 12) return false
  const now = new Date()
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1)
}

function cardBrand(num) {
  const d = num.replace(/\D/g, '')
  if (/^4/.test(d)) return 'VISA'
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'Mastercard'
  if (/^3[47]/.test(d)) return 'AMEX'
  return ''
}

const formatCardNumber = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
const formatExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

function Stepper({ current }) {
  return (
    <ol className="checkout-steps" aria-label="Checkout progress">
      {STEPS.map((label, i) => (
        <li key={label} className={i < current ? 'is-done' : i === current ? 'is-current' : undefined} aria-current={i === current ? 'step' : undefined}>
          <span>{i < current ? '✓' : i + 1}</span>
          {label}
        </li>
      ))}
    </ol>
  )
}

function CardPreview({ card, flipped }) {
  const brand = cardBrand(card.number)
  const shown = card.number || '•••• •••• •••• ••••'
  return (
    <div className={`card-preview${flipped ? ' is-flipped' : ''}`} aria-hidden="true">
      <div className="card-preview-inner">
        <div className="card-face card-face--front">
          <div className="card-top">
            <span className="card-chip" />
            <span className="card-brand">{brand || 'CARD'}</span>
          </div>
          <div className="card-number">{shown}</div>
          <div className="card-bottom">
            <div>
              <small>Card holder</small>
              <span>{card.name || 'YOUR NAME'}</span>
            </div>
            <div>
              <small>Expires</small>
              <span>{card.expiry || 'MM/YY'}</span>
            </div>
          </div>
        </div>
        <div className="card-face card-face--back">
          <span className="card-stripe" />
          <div className="card-cvc">
            <small>CVC</small>
            <span>{card.cvc ? card.cvc.replace(/./g, '•') : '•••'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Summary({ lines, subtotal, shipping, total, onEdit, locked }) {
  return (
    <aside className="checkout-summary">
      <div className="checkout-summary-head">
        <h2>Order summary</h2>
        {!locked && <button type="button" className="text-link" onClick={onEdit}>Edit cart</button>}
      </div>
      <ul className="summary-lines">
        {lines.map((l) => (
          <li key={l.id}>
            <span className="summary-thumb">
              <img src={resolveImage(l.image)} alt="" />
              <b>{l.qty}</b>
            </span>
            <div>
              <h3>{l.name}</h3>
              <span>{formatPrice(l.price)} / {l.unit}</span>
            </div>
            <strong>{formatPrice(l.lineTotal)}</strong>
          </li>
        ))}
      </ul>
      <dl className="summary-totals">
        <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
        <div><dt>Delivery</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
        <div className="summary-grand"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
      </dl>
      <p className="summary-secure">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></svg>
        Secure checkout &middot; demo mode
      </p>
    </aside>
  )
}

export default function Checkout() {
  const { lines, subtotal, clear, openDrawer } = useCart()
  const [step, setStep] = useState(1)
  const [details, setDetails] = useState(emptyDetails)
  const [delivery, setDelivery] = useState('standard')
  const [method, setMethod] = useState('card')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' })
  const [flipped, setFlipped] = useState(false)
  const [errors, setErrors] = useState({})
  const [stage, setStage] = useState(-1)
  const [order, setOrder] = useState(null)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [step])

  const shipping = deliveryCost(delivery, subtotal)
  const total = subtotal + shipping
  const isProcessing = stage >= 0

  const detailErrors = useMemo(() => {
    const e = {}
    if (!details.name.trim()) e.name = 'Please enter your name'
    if (!/^\S+@\S+\.\S+$/.test(details.email)) e.email = 'Enter a valid email'
    if (details.phone.replace(/\D/g, '').length < 9) e.phone = 'Enter a valid phone number'
    if (delivery !== 'pickup') {
      if (!details.address.trim()) e.address = 'Please enter a delivery address'
      if (!details.city.trim()) e.city = 'Please enter a city'
    }
    return e
  }, [details, delivery])

  function updateDetails(e) {
    const { name, value } = e.target
    setDetails((d) => ({ ...d, [name]: value }))
  }

  function updateCard(e) {
    const { name, value } = e.target
    const next =
      name === 'number' ? formatCardNumber(value)
        : name === 'expiry' ? formatExpiry(value)
          : name === 'cvc' ? value.replace(/\D/g, '').slice(0, 4)
            : value.toUpperCase().slice(0, 26)
    setCard((c) => ({ ...c, [name]: next }))
  }

  function submitDetails(e) {
    e.preventDefault()
    setErrors(detailErrors)
    if (Object.keys(detailErrors).length === 0) setStep(2)
  }

  function submitPayment(e) {
    e.preventDefault()
    if (method === 'card') {
      const e2 = {}
      if (!luhnValid(card.number)) e2.number = 'Card number is not valid'
      if (!card.name.trim()) e2.cardName = 'Enter the name on the card'
      if (!expiryValid(card.expiry)) e2.expiry = 'Use a future date (MM/YY)'
      if (card.cvc.length < 3) e2.cvc = '3–4 digits'
      setErrors(e2)
      if (Object.keys(e2).length) return
    }
    runPayment()
  }

  function runPayment() {
    const stages = method === 'card' ? PROCESSING_STAGES : ['Placing your order', 'Reserving stock', 'Order confirmed']
    setStage(0)
    stages.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStage(i), i * 900))
    })
    timers.current.push(
      setTimeout(() => {
        setOrder({
          id: `TV-${Date.now().toString().slice(-6)}`,
          lines,
          subtotal,
          shipping,
          total,
          method,
          last4: card.number.replace(/\D/g, '').slice(-4),
          brand: cardBrand(card.number),
          email: details.email,
          name: details.name,
          delivery: DELIVERY_OPTIONS.find((o) => o.id === delivery),
        })
        setCard({ number: '', name: '', expiry: '', cvc: '' })
        clear()
        setStage(-1)
        setStep(3)
      }, stages.length * 900 + 500),
    )
  }

  const processingStages = method === 'card' ? PROCESSING_STAGES : ['Placing your order', 'Reserving stock', 'Order confirmed']

  if (step === 3 && order) {
    return (
      <section className="section checkout">
        <div className="container">
          <Stepper current={3} />
          <div className="confirm-card reveal is-visible">
            <span className="confirm-tick" aria-hidden="true">
              <svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-16" /></svg>
            </span>
            <p className="eyebrow eyebrow--center">Order {order.id}</p>
            <h1 className="display display--lg">Thank you, <em>{order.name.split(' ')[0]}.</em></h1>
            <p className="confirm-lead">
              {order.method === 'card' && <>Your payment of <strong>{formatPrice(order.total)}</strong> was authorised on your {order.brand || 'card'} ending {order.last4}.</>}
              {order.method === 'bank' && <>Please transfer <strong>{formatPrice(order.total)}</strong> using reference <strong>{order.id}</strong>. We&rsquo;ll dispatch once it clears.</>}
              {order.method === 'cod' && <>Please have <strong>{formatPrice(order.total)}</strong> ready on delivery.</>}
              {' '}A confirmation would be sent to <strong>{order.email}</strong>.
            </p>
            <Ornament />
            <ul className="confirm-lines">
              {order.lines.map((l) => (
                <li key={l.id}>
                  <span>{l.qty} &times; {l.name}</span>
                  <span>{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
              <li><span>{order.delivery.label}</span><span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span></li>
              <li className="confirm-total"><span>Total</span><span>{formatPrice(order.total)}</span></li>
            </ul>
            <p className="demo-note">This was a demo &mdash; no payment was taken and no details were sent.</p>
            <div className="confirm-actions">
              <Link to="/products" className="btn btn-primary">Continue shopping</Link>
              <Link to="/" className="btn btn-outline">Back to home</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (lines.length === 0) {
    return (
      <section className="section checkout">
        <div className="container">
          <Stepper current={0} />
          <div className="confirm-card">
            <p className="eyebrow eyebrow--center">Checkout</p>
            <h1 className="display display--lg">Your cart is <em>empty.</em></h1>
            <p className="confirm-lead">Add a few island favourites to see how checkout works.</p>
            <div className="confirm-actions">
              <Link to="/products" className="btn btn-primary">Browse products</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const fieldError = (key) => errors[key] && <span className="field-error">{errors[key]}</span>

  return (
    <section className="section checkout">
      <div className="container">
        <div className="demo-banner" role="note">
          <strong>Demo checkout</strong> &middot; Prices are placeholders. No payment is taken and nothing you type leaves this page.
        </div>
        <Stepper current={step} />

        <div className="checkout-grid">
          <div className="checkout-main">
            {step === 1 && (
              <form onSubmit={submitDetails} noValidate className="checkout-panel">
                <p className="eyebrow eyebrow--rule">Step 2 of 4</p>
                <h1 className="display">Delivery <em>details</em></h1>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="co-name">Full name</label>
                    <input id="co-name" name="name" autoComplete="name" value={details.name} onChange={updateDetails} aria-invalid={!!errors.name} />
                    {fieldError('name')}
                  </div>
                  <div className="form-field">
                    <label htmlFor="co-email">Email</label>
                    <input id="co-email" name="email" type="email" autoComplete="email" value={details.email} onChange={updateDetails} aria-invalid={!!errors.email} />
                    {fieldError('email')}
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="co-phone">Phone</label>
                  <input id="co-phone" name="phone" type="tel" autoComplete="tel" placeholder="+94 7X XXX XXXX" value={details.phone} onChange={updateDetails} aria-invalid={!!errors.phone} />
                  {fieldError('phone')}
                </div>

                <fieldset className="option-group">
                  <legend>Delivery method</legend>
                  {DELIVERY_OPTIONS.map((o) => (
                    <label key={o.id} className={`option${delivery === o.id ? ' is-selected' : ''}`}>
                      <input type="radio" name="delivery" value={o.id} checked={delivery === o.id} onChange={() => setDelivery(o.id)} />
                      <span className="option-text">
                        <strong>{o.label}</strong>
                        <small>{o.note}</small>
                      </span>
                      <span className="option-price">
                        {deliveryCost(o.id, subtotal) === 0 ? 'Free' : formatPrice(o.price)}
                      </span>
                    </label>
                  ))}
                </fieldset>

                {delivery !== 'pickup' && (
                  <>
                    <div className="form-field">
                      <label htmlFor="co-address">Address</label>
                      <input id="co-address" name="address" autoComplete="street-address" value={details.address} onChange={updateDetails} aria-invalid={!!errors.address} />
                      {fieldError('address')}
                    </div>
                    <div className="form-row form-row--3">
                      <div className="form-field">
                        <label htmlFor="co-city">City</label>
                        <input id="co-city" name="city" autoComplete="address-level2" value={details.city} onChange={updateDetails} aria-invalid={!!errors.city} />
                        {fieldError('city')}
                      </div>
                      <div className="form-field">
                        <label htmlFor="co-postcode">Postcode</label>
                        <input id="co-postcode" name="postcode" autoComplete="postal-code" value={details.postcode} onChange={updateDetails} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="co-country">Country</label>
                        <input id="co-country" name="country" value={details.country} readOnly />
                      </div>
                    </div>
                  </>
                )}

                <div className="checkout-actions">
                  <button type="button" className="btn btn-outline" onClick={openDrawer}>&larr; Back to cart</button>
                  <button type="submit" className="btn btn-primary">Continue to payment</button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={submitPayment} noValidate className="checkout-panel">
                <p className="eyebrow eyebrow--rule">Step 3 of 4</p>
                <h1 className="display">Choose how <em>to pay</em></h1>

                <fieldset className="option-group option-group--inline">
                  <legend className="sr-only">Payment method</legend>
                  {PAYMENT_METHODS.map((m) => (
                    <label key={m.id} className={`option${method === m.id ? ' is-selected' : ''}`}>
                      <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => { setMethod(m.id); setErrors({}) }} />
                      <span className="option-text">
                        <strong>{m.label}</strong>
                        <small>{m.note}</small>
                      </span>
                    </label>
                  ))}
                </fieldset>

                {method === 'card' && (
                  <div className="card-pay">
                    <CardPreview card={card} flipped={flipped} />
                    <div className="card-fields">
                      <div className="form-field">
                        <label htmlFor="cc-number">Card number</label>
                        <input id="cc-number" name="number" inputMode="numeric" autoComplete="off" placeholder="1234 5678 9012 3456" value={card.number} onChange={updateCard} aria-invalid={!!errors.number} />
                        {fieldError('number')}
                      </div>
                      <div className="form-field">
                        <label htmlFor="cc-name">Name on card</label>
                        <input id="cc-name" name="name" autoComplete="off" value={card.name} onChange={updateCard} aria-invalid={!!errors.cardName} />
                        {fieldError('cardName')}
                      </div>
                      <div className="form-row">
                        <div className="form-field">
                          <label htmlFor="cc-exp">Expiry</label>
                          <input id="cc-exp" name="expiry" inputMode="numeric" autoComplete="off" placeholder="MM/YY" value={card.expiry} onChange={updateCard} aria-invalid={!!errors.expiry} />
                          {fieldError('expiry')}
                        </div>
                        <div className="form-field">
                          <label htmlFor="cc-cvc">CVC</label>
                          <input id="cc-cvc" name="cvc" inputMode="numeric" autoComplete="off" placeholder="123" value={card.cvc} onChange={updateCard} onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)} aria-invalid={!!errors.cvc} />
                          {fieldError('cvc')}
                        </div>
                      </div>
                      <button type="button" className="text-link test-card-btn" onClick={() => { setCard(TEST_CARD); setErrors({}) }}>
                        Fill with a test card
                      </button>
                    </div>
                  </div>
                )}

                {method === 'bank' && (
                  <div className="pay-info">
                    <h3>Bank transfer details</h3>
                    <p>After you place the order you&rsquo;ll receive our account details and your order reference. Orders are dispatched once the transfer clears.</p>
                  </div>
                )}

                {method === 'cod' && (
                  <div className="pay-info">
                    <h3>Cash on delivery</h3>
                    <p>Pay the courier in cash when your order arrives. Available for deliveries within Sri Lanka.</p>
                  </div>
                )}

                <div className="checkout-actions">
                  <button type="button" className="btn btn-outline" onClick={() => { setErrors({}); setStep(1) }}>&larr; Back</button>
                  <button type="submit" className="btn btn-primary btn-pay" disabled={isProcessing}>
                    {method === 'card' ? `Pay ${formatPrice(total)}` : `Place order · ${formatPrice(total)}`}
                  </button>
                </div>
              </form>
            )}
          </div>

          <Summary lines={lines} subtotal={subtotal} shipping={shipping} total={total} onEdit={openDrawer} locked={isProcessing} />
        </div>
      </div>

      {isProcessing && (
        <div className="pay-overlay" role="status" aria-live="polite">
          <div className="pay-overlay-card">
            <span className="pay-spinner" aria-hidden="true" />
            <h2 className="display">Processing <em>payment</em></h2>
            <ol className="pay-stages">
              {processingStages.map((s, i) => (
                <li key={s} className={i < stage ? 'is-done' : i === stage ? 'is-active' : undefined}>
                  <span aria-hidden="true">{i < stage ? '✓' : ''}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="demo-note">Demo only &mdash; nothing is being charged.</p>
          </div>
        </div>
      )}
    </section>
  )
}
