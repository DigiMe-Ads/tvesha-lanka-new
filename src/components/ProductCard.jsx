import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/products.js'

const imageModules = import.meta.glob('../assets/images/*.{jpg,png}', {
  eager: true,
  import: 'default',
})

export function resolveImage(filename) {
  const match = Object.entries(imageModules).find(([path]) => path.endsWith(`/${filename}`))
  return match ? match[1] : undefined
}

export default function ProductCard({ id, name, image, category, price, unit }) {
  const { add, openDrawer } = useCart()
  const [added, setAdded] = useState(false)
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  function handleAdd() {
    add(id)
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 1600)
    openDrawer()
  }

  return (
    <article className="product-card reveal">
      <div className="product-card-media">
        <img src={resolveImage(image)} alt={name} loading="lazy" />
      </div>
      <div className="product-card-body">
        {category && <span className="product-card-cat">{category}</span>}
        <h3>{name}</h3>
        <p className="product-card-price">
          {formatPrice(price)} <span>/ {unit}</span>
        </p>
        <button
          type="button"
          className={`btn btn-sm btn-cart${added ? ' is-added' : ''}`}
          onClick={handleAdd}
          aria-label={`Add ${name} to cart`}
        >
          {added ? (
            <>Added <span aria-hidden="true">&#10003;</span></>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true"><path d="M3.5 4.5h2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.4-1.1l1.6-6.3H6.4" /><circle cx="9.5" cy="19.5" r="1.2" /><circle cx="17" cy="19.5" r="1.2" /></svg>
              Add to cart
            </>
          )}
        </button>
      </div>
    </article>
  )
}
