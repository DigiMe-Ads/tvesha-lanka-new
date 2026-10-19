import { Link } from 'react-router-dom'
import heroImg from '../assets/images/hero-spoons.jpg'
import insetImg from '../assets/images/spice-cinnamon-chips.jpg'
import { allProducts, productCategories } from '../data/products.js'

export default function HeroBanner() {
  return (
    <section className="hero">
      <span className="hero-bgword" aria-hidden="true">Ceylon</span>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow--rule">Tvesha Lanka &middot; Export house, Colombo</p>
          <h1>
            From Ceylon&rsquo;s soil <em>to global tables.</em>
          </h1>
          <div className="hero-sub">
            <p>
              Premium spices, true Ceylon cinnamon, nutritional flours and natural sweets,
              sourced across Sri Lanka and exported with care to clients around the world.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Shop the collection <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link to="/about-us" className="text-link">Our story</Link>
            </div>
          </div>
          <dl className="hero-meta">
            <div>
              <dt>{allProducts.length}+</dt>
              <dd>Island products</dd>
            </div>
            <div>
              <dt>{productCategories.length}</dt>
              <dd>Product lines</dd>
            </div>
            <div>
              <dt>100%</dt>
              <dd>Ceylon origin</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual">
          <div className="arch hero-arch">
            <img src={heroImg} alt="Ceylon spices laid out on antique silver spoons" />
          </div>
          <div className="hero-inset" aria-hidden="true">
            <img src={insetImg} alt="" />
          </div>
          <div className="hero-badge" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="hero-badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
              </defs>
              <text>
                <textPath href="#hero-badge-circle">TRUE CEYLON &middot; EXPORT QUALITY &middot; FROM SRI LANKA &middot;</textPath>
              </text>
            </svg>
            <span>&#10022;</span>
          </div>
          <span className="hero-vertical" aria-hidden="true">Sri Lanka &mdash; 7.87&deg; N, 80.77&deg; E</span>
        </div>
      </div>
    </section>
  )
}
