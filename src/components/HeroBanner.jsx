import { Link } from 'react-router-dom'
import heroImg from '../assets/images/home-hero.jpg'
import { allProducts, productCategories } from '../data/products.js'

export default function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <img src={heroImg} alt="" />
      </div>
      <div className="container hero-inner">
        <p className="eyebrow eyebrow--rule">Authentically sourced &middot; Ceylon origin</p>
        <h1>
          From Ceylon&rsquo;s Soil
          <br />
          to <em>Global Tables.</em>
        </h1>
        <p className="hero-subtext">
          Premium spices, true Ceylon cinnamon, nutritional flours and natural sweets,
          sourced across Sri Lanka and exported with care to clients around the world.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="btn btn-primary">
            Explore Collection <span aria-hidden="true">&#8599;</span>
          </Link>
          <Link to="/about-us" className="btn btn-outline">Our Story</Link>
        </div>
        <dl className="hero-meta">
          <div>
            <dt>{allProducts.length}+</dt>
            <dd>Island products</dd>
          </div>
          <div>
            <dt>{productCategories.length}</dt>
            <dd>Curated categories</dd>
          </div>
          <div>
            <dt>100%</dt>
            <dd>Ceylon origin</dd>
          </div>
        </dl>
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
      <span className="hero-scroll" aria-hidden="true">Scroll</span>
    </section>
  )
}
