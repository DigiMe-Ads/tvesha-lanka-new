import ProductCard from './ProductCard.jsx'

/**
 * `layout="bento"` makes the first product a large feature tile.
 */
export default function ProductGrid({ products, columns = 4, layout }) {
  return (
    <div className={`product-grid product-grid--cols-${columns}${layout ? ` product-grid--${layout}` : ''}`}>
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  )
}
