import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { allProducts, productCategories } from '../data/products.js'

const ALL = 'All Products'

const SORTS = {
  featured: { label: 'Featured', fn: null },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  name: { label: 'Name: A–Z', fn: (a, b) => a.name.localeCompare(b.name) },
}

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [sort, setSort] = useState('featured')
  const requested = params.get('category')
  const active = productCategories.some((c) => c.name === requested) ? requested : ALL
  const filtered = active === ALL ? allProducts : allProducts.filter((p) => p.category === active)
  const visible = SORTS[sort].fn ? [...filtered].sort(SORTS[sort].fn) : filtered

  function select(name) {
    setParams(name === ALL ? {} : { category: name }, { replace: true })
  }

  const filters = [{ name: ALL, count: allProducts.length }, ...productCategories]

  return (
    <>
      <PageBanner
        title={active === ALL ? <>The <em>Collection</em></> : active}
        crumb="Shop"
        bgword="Shop"
        eyebrow="Curated from Ceylon"
        text="Spices, cinnamon grades, flours, natural sweets and more, sourced across Sri Lanka. Prices shown are placeholders."
      />
      <section className="section section--top-tight">
        <div className="container shop-layout">
          <aside className="shop-sidebar" aria-label="Filter products">
            <h2 className="shop-sidebar-title">Categories</h2>
            <ul className="shop-cats">
              {filters.map((cat) => (
                <li key={cat.name}>
                  <button
                    type="button"
                    aria-pressed={cat.name === active}
                    className={cat.name === active ? 'is-active' : undefined}
                    onClick={() => select(cat.name)}
                  >
                    <span>{cat.name}</span>
                    <small>{String(cat.count).padStart(2, '0')}</small>
                  </button>
                </li>
              ))}
            </ul>
            <div className="shop-sidebar-note">
              <strong>Buying in bulk?</strong>
              <p>Export and wholesale quantities are quoted separately.</p>
              <Link to="/contact-us" className="text-link">Request a quote</Link>
            </div>
          </aside>

          <div className="shop-main">
            <div className="shop-toolbar">
              <p className="results-meta">
                Showing <strong>{visible.length}</strong> {visible.length === 1 ? 'item' : 'items'}
              </p>
              <label className="shop-sort">
                <span>Sort by</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {Object.entries(SORTS).map(([key, s]) => (
                    <option key={key} value={key}>{s.label}</option>
                  ))}
                </select>
              </label>
            </div>
            <ProductGrid products={visible} columns={3} />
          </div>
        </div>
      </section>
    </>
  )
}
