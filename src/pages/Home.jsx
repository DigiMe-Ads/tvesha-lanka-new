import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner.jsx'
import FeatureStrip from '../components/FeatureStrip.jsx'
import SectionHead from '../components/SectionHead.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import QuoteBand from '../components/QuoteBand.jsx'
import { allProducts, homeProducts, productCategories, spiceChest } from '../data/products.js'
import yarnImg from '../assets/images/cotton-yarn.jpg'
import bannerImg from '../assets/images/page-banner.jpg'
import cinnamonImg from '../assets/images/spice-cinnamon-chips.jpg'
import flourImg from '../assets/images/product-moringa-powder.jpg'
import sweetImg from '../assets/images/product-kithul-treacle.jpg'
import spicesImg from '../assets/images/spice-curry-powder.jpg'

const COLLECTIONS = [
  { title: 'Spices', sub: 'Explore Spices', image: spicesImg, category: 'Spices' },
  { title: 'Ceylon Cinnamon', sub: 'True Cinnamon Grades', image: cinnamonImg, category: 'Cinnamon Varieties' },
  { title: 'Nutritional Flour', sub: 'Wholesome Goodness', image: flourImg, category: 'Nutritional Flour' },
  { title: 'Healthy Sweet', sub: 'Natural Sweeteners', image: sweetImg, category: 'Healthy Sweet' },
]

const STATS = [
  { value: `${allProducts.length}+`, label: 'Island products', note: 'Spices to cotton yarn' },
  { value: `${productCategories.length}`, label: 'Product lines', note: 'And growing' },
  { value: '100%', label: 'Ceylon origin', note: 'Sourced across Sri Lanka' },
  { value: '∞', label: 'Shipments ahead', note: 'Wherever the world takes us' },
]

const PROMISES = [
  { title: 'Taste & Purity', text: 'Every product checked for the purity it promises.', icon: 'leaf' },
  { title: 'Quality Assured', text: 'Carefully selected, from source to shipment.', icon: 'seal' },
  { title: 'Customer First', text: 'Exceptional service for clients across the globe.', icon: 'globe' },
  { title: 'Looking Ahead', text: 'Growing into new lines, including cosmetics.', icon: 'compass' },
]

const JOURNEY = [
  { step: '01', title: 'Sourced at origin', text: 'We work with growers across the island’s spice regions, from the wet-zone cinnamon belts to the hill-country cardamom estates.' },
  { step: '02', title: 'Selected by hand', text: 'Each batch is graded and checked for aroma, colour and purity before it earns a place in our catalogue.' },
  { step: '03', title: 'Prepared with care', text: 'Drying, grinding and processing are handled to protect the natural oils and character of every product.' },
  { step: '04', title: 'Packed for export', text: 'Sealed and documented to international standards, ready for the journey to your shelves.' },
]

const PHILOSOPHY = [
  { tag: 'Origin', title: 'From Where it Belongs', text: 'Spices sourced from the finest regions of the island, carefully selected for their aroma and taste.' },
  { tag: 'Heritage', title: 'Ceylon, Left to Speak', text: 'Cinnamon is the most valuable spice Sri Lanka produces, prized for its distinctive aroma and flavour.' },
  { tag: 'Craft', title: 'Made with Intention', text: 'A small, dedicated team that takes care with every order, every shipment and every partner.' },
]

const ICONS = {
  leaf: <><path d="M12 20c0-8 4.7-12.7 9.3-14-.6 6.7-4 11.3-9.3 14Z" /><path d="M12 20c0-8-4.7-12.7-9.3-14 .6 6.7 4 11.3 9.3 14Z" /></>,
  seal: <><circle cx="12" cy="10" r="6" /><path d="m9 15-1.5 6L12 19l4.5 2L15 15" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.4 3.6 5.2 3.6 8.5s-1.1 6.1-3.6 8.5c-2.5-2.4-3.6-5.2-3.6-8.5S9.5 5.9 12 3.5Z" /></>,
  compass: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
}

function LineIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  )
}

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeatureStrip />

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Nature's finest treasures"
            title={<>Explore Our <em>Collection</em></>}
            aside={<p>Browse our Ceylon spices, true cinnamon grades, nutritional flours and natural sweets, all sourced from the island.</p>}
          />
          <div className="collection-grid">
            {COLLECTIONS.map((c, i) => (
              <Link
                key={c.title}
                to={`/products?category=${encodeURIComponent(c.category)}`}
                className="collection-card reveal"
                style={{ '--reveal-delay': `${i * 90}ms` }}
              >
                <img src={c.image} alt="" loading="lazy" />
                <span className="collection-card-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="collection-card-copy">
                  <h3>{c.title}</h3>
                  <span>{c.sub} <span aria-hidden="true">&#8599;</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="story-card reveal">
            <div className="story-copy">
              <p className="eyebrow eyebrow--rule">From the island, with intention</p>
              <h2 className="display display--lg">Rooted in Ceylon&rsquo;s <em>spice story.</em></h2>
              <p>
                Founded by Mr. Mahendran Madhavan, a visionary entrepreneur from a family with
                a strong business background, Tvesha Lanka Pvt Ltd has established itself as a
                key player in the export and import industry.
              </p>
              <div className="chip-row">
                <span className="chip">Ceylon Cinnamon</span>
                <span className="chip">Cardamom</span>
                <span className="chip">Black Pepper</span>
              </div>
              <div className="story-points">
                <div>
                  <h4>Authentic &amp; Pure</h4>
                  <p>Rooted in the island&rsquo;s rich spice heritage.</p>
                </div>
                <div>
                  <h4>Thoughtfully Selected</h4>
                  <p>Products worthy of a place on your table.</p>
                </div>
                <div>
                  <h4>Globally Trusted</h4>
                  <p>Delivering to clients across the world.</p>
                </div>
              </div>
            </div>
            <div className="story-emblem">
              <div className="story-emblem-ring">
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <path d="M24 40c0-12 7-19 14-21-1 10-6 17-14 21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M24 40c0-12-7-19-14-21 1 10 6 17 14 21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M24 40V18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <span className="story-emblem-kicker">Tvesha Lanka</span>
                <span className="story-emblem-word">CEYLON</span>
                <span className="story-emblem-sub">spice &middot; export &middot; heritage</span>
              </div>
              <div className="story-emblem-tag">
                Recognised in the Diribala Exporter Development Program
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <SectionHead
            eyebrow="Curated spice collection"
            title={<>The Spice <em>Chest</em></>}
            aside={<Link to="/products?category=Spices" className="text-link">Explore all spices <span aria-hidden="true">&#8599;</span></Link>}
          />
          <ProductGrid products={spiceChest} columns={4} />
        </div>
      </section>

      <QuoteBand
        image={bannerImg}
        quote={<>Every spice carries the character <em>of the place it comes from.</em></>}
        text="Sourced across Sri Lanka, selected by hand, and shipped with care to partners around the world."
        cite="Tvesha Lanka"
      />

      <section className="section">
        <div className="container note-grid">
          <div className="note-copy reveal">
            <p className="eyebrow eyebrow--rule">A legacy of trust &amp; tradition</p>
            <h2 className="display display--lg">
              One company. Many products.
              <br />
              <em>One promise.</em>
            </h2>
            <span className="note-rule" aria-hidden="true" />
            <p className="lead">
              At Tvesha Lanka Pvt Ltd, our limited but dedicated team works with utmost
              happiness and dedication, ensuring the smooth operation of all our endeavours.
              With a strong focus on quality, innovation and customer satisfaction, we deliver
              exceptional products and services to clients across the globe.
            </p>
            <p className="note-quote">&ldquo;A small team, careful hands and a global reach.&rdquo;</p>
            <Link to="/about-us" className="text-link text-link--caps">Our story <span aria-hidden="true">&#8599;</span></Link>
          </div>
          <div className="stat-grid reveal">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
                <span className="stat-note">{s.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="promise-cards">
            {PROMISES.map((p, i) => (
              <article className="promise-card reveal" key={p.title} style={{ '--reveal-delay': `${i * 90}ms` }}>
                <div className="promise-card-top">
                  <LineIcon name={p.icon} />
                  <span>{i + 1}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark journey">
        <div className="container">
          <div className="journey-head reveal">
            <p className="eyebrow eyebrow--sky eyebrow--center">The Tvesha journey</p>
            <h2 className="display display--lg">From source <em>to shipment.</em></h2>
          </div>
          <ol className="journey-list">
            {JOURNEY.map((j) => (
              <li className="journey-item reveal" key={j.step}>
                <span className="journey-num" aria-hidden="true">{j.step}</span>
                <div>
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="philosophy-card reveal">
            <div className="philosophy-copy">
              <p className="eyebrow eyebrow--rule eyebrow--sky">The Tvesha philosophy</p>
              <h2 className="display display--lg">Goodness, where <em>nature intended.</em></h2>
              <p>
                The world&rsquo;s most remarkable ingredients carry the character of the places
                they come from. We seek out produce at its source, from fragrant Ceylon cinnamon
                and aromatic cloves to kithul treacle, and bring it to you with its natural
                character intact.
              </p>
              <div className="philosophy-actions">
                <Link to="/products" className="btn btn-cream btn-sm">Explore Collection <span aria-hidden="true">&#8599;</span></Link>
                <span className="chip chip--ghost">Cinnamon</span>
                <span className="chip chip--ghost">Cardamom</span>
                <span className="chip chip--ghost">Cloves</span>
              </div>
            </div>
            <div className="philosophy-stack">
              {PHILOSOPHY.map((p) => (
                <div className="glass-card" key={p.tag}>
                  <span className="glass-card-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bleed-split">
        <div className="bleed-split-media">
          <img src={yarnImg} alt="Spools of 100% recycled cotton yarn" loading="lazy" />
        </div>
        <div className="bleed-split-copy">
          <div className="reveal">
            <p className="eyebrow eyebrow--sky eyebrow--underline">Beyond the spice rack</p>
            <h2 className="display display--lg">100% recycled <em>cotton yarn.</em></h2>
            <p>
              Crafted from post-consumer cotton garments, each strand embodies a commitment to
              reducing waste and preserving our planet. Available in any colour, with twisted
              and single threads.
            </p>
            <Link to="/cotton-yarn" className="btn btn-line-sky">Discover Cotton Yarn</Link>
          </div>
        </div>
      </section>

      <section className="section section--cream2">
        <div className="container">
          <SectionHead
            eyebrow="Best loved"
            title={<>Our Favourite <em>Picks</em></>}
            aside={<p>A curated selection of favourites, chosen for their distinctive flavour, character and quality.</p>}
          />
          <ProductGrid products={homeProducts} columns={4} />
        </div>
      </section>
    </>
  )
}
