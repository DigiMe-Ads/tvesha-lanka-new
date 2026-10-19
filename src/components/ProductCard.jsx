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
        {category && <span className="product-card-cat">{category}</span>}
      </div>
      <div className="product-card-body">
        <div className="product-card-info">
          <h3>{name}</h3>
          <p className="product-card-price">
            {formatPrice(price)} <span>/ {unit}</span>
          </p>
        </div>
        <button
          type="button"
          className={`add-btn${added ? ' is-added' : ''}`}
          onClick={handleAdd}
          aria-label={`Add ${name} to cart`}
        >
          <span className="add-btn-icon" aria-hidden="true">{added ? '✓' : '+'}</span>
          <span className="add-btn-label">{added ? 'Added' : 'Add to cart'}</span>
        </button>
      </div>
    </article>
  )
}
