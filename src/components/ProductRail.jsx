import { useRef } from 'react'
import ProductCard from './ProductCard.jsx'

/**
 * Horizontally scrolling, snap-aligned row of product cards with prev/next controls.
 */
export default function ProductRail({ products, label }) {
  const track = useRef(null)

  function scroll(dir) {
    const el = track.current
    if (!el) return
    const card = el.querySelector('.product-card')
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="rail">
      <div className="rail-controls">
        <button type="button" onClick={() => scroll(-1)} aria-label={`Scroll ${label} left`}>&larr;</button>
        <button type="button" onClick={() => scroll(1)} aria-label={`Scroll ${label} right`}>&rarr;</button>
      </div>
      <div className="rail-track" ref={track} role="region" aria-label={label} tabIndex={0}>
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  )
}
