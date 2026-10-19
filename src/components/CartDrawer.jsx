import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FREE_DELIVERY_OVER, useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/products.js'
import { resolveImage } from './ProductCard.jsx'
import QtyStepper from './QtyStepper.jsx'

export default function CartDrawer() {
  const { lines, count, subtotal, setQty, remove, drawerOpen, closeDrawer } = useCart()
  const toFree = Math.max(0, FREE_DELIVERY_OVER - subtotal)

  useEffect(() => {
    if (!drawerOpen) return undefined
    const onKey = (e) => e.key === 'Escape' && closeDrawer()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [drawerOpen, closeDrawer])

  return (
    <div className={`cart-layer${drawerOpen ? ' is-open' : ''}`} inert={drawerOpen ? undefined : ''}>
      <button type="button" className="cart-scrim" onClick={closeDrawer} aria-label="Close cart" tabIndex={-1} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <header className="cart-drawer-head">
          <div>
            <p className="eyebrow eyebrow--rule">Your basket</p>
            <h2 className="display">Cart <em>({count})</em></h2>
          </div>
          <button type="button" className="cart-close" onClick={closeDrawer} aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/products" className="btn btn-primary btn-sm" onClick={closeDrawer}>Browse products</Link>
          </div>
        ) : (
          <>
            <div className="cart-progress">
              {toFree > 0 ? (
                <p>Add <strong>{formatPrice(toFree)}</strong> more for free standard delivery</p>
              ) : (
                <p>You&rsquo;ve unlocked <strong>free standard delivery</strong></p>
              )}
              <span><i style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_OVER) * 100)}%` }} /></span>
            </div>

            <ul className="cart-lines">
              {lines.map((l) => (
                <li key={l.id} className="cart-line">
                  <img src={resolveImage(l.image)} alt="" />
                  <div className="cart-line-body">
                    <span className="product-card-cat">{l.category}</span>
                    <h3>{l.name}</h3>
                    <span className="cart-line-unit">{formatPrice(l.price)} / {l.unit}</span>
                    <div className="cart-line-actions">
                      <QtyStepper value={l.qty} onChange={(q) => setQty(l.id, q)} label={l.name} />
                      <button type="button" className="cart-remove" onClick={() => remove(l.id)}>Remove</button>
                    </div>
                  </div>
                  <strong className="cart-line-total">{formatPrice(l.lineTotal)}</strong>
                </li>
              ))}
            </ul>

            <footer className="cart-drawer-foot">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="cart-foot-note">Delivery calculated at checkout.</p>
              <Link to="/checkout" className="btn btn-primary btn-block" onClick={closeDrawer}>
                Proceed to checkout <span aria-hidden="true">&#8599;</span>
              </Link>
              <button type="button" className="btn btn-outline btn-block" onClick={closeDrawer}>Continue shopping</button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
