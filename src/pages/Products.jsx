import { useSearchParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { allProducts, productCategories } from '../data/products.js'

const ALL = 'All Products'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const requested = params.get('category')
  const active = productCategories.some((c) => c.name === requested) ? requested : ALL
  const visible = active === ALL ? allProducts : allProducts.filter((p) => p.category === active)

  function select(name) {
    setParams(name === ALL ? {} : { category: name }, { replace: true })
  }

  const filters = [{ name: ALL, count: allProducts.length }, ...productCategories]

  return (
    <>
      <PageBanner
        title={active === ALL ? <>Our <em>Collection</em></> : active}
        crumb="Products"
        eyebrow="Curated from Ceylon"
        text="Spices, cinnamon grades, flours, natural sweets and more, sourced across Sri Lanka for export."
      />
      <section className="section section--top-tight">
        <div className="container">
          <div className="filter-bar" role="tablist" aria-label="Product categories">
            {filters.map((cat) => (
              <button
                key={cat.name}
                type="button"
                role="tab"
                aria-selected={cat.name === active}
                className={`filter-pill${cat.name === active ? ' active' : ''}`}
                onClick={() => select(cat.name)}
              >
                {cat.name}
                <span className="filter-count">{cat.count}</span>
              </button>
            ))}
          </div>
          <p className="results-meta">Showing {visible.length} {visible.length === 1 ? 'item' : 'items'}</p>
          <ProductGrid products={visible} columns={4} />
        </div>
      </section>
    </>
  )
}
