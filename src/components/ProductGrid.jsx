import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, columns = 4 }) {
  return (
    <div className={`product-grid product-grid--cols-${columns}`}>
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  )
}
