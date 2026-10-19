import { useState } from 'react'
import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner.jsx'
import FeatureStrip from '../components/FeatureStrip.jsx'
import SectionHead from '../components/SectionHead.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductRail from '../components/ProductRail.jsx'
import QuoteBand from '../components/QuoteBand.jsx'
import { allProducts, productCategories } from '../data/products.js'
import yarnImg from '../assets/images/cotton-yarn.jpg'
import bannerImg from '../assets/images/page-banner.jpg'
import skylineImg from '../assets/images/about-skyline.jpg'
import awardImg from '../assets/images/about-award.jpg'
import cinnamonImg from '../assets/images/product-cinnamon-c5.jpg'
import flourImg from '../assets/images/product-moringa-powder.jpg'
import sweetImg from '../assets/images/product-kithul-treacle.jpg'
import spicesImg from '../assets/images/spice-curry-powder.jpg'
import vaseImg from '../assets/images/product-coconut-shell-vase.jpg'

const COLLECTIONS = [
  { title: 'Spices', sub: 'Cardamom, cloves, pepper, nutmeg & blends', image: spicesImg, category: 'Spices' },
  { title: 'Ceylon Cinnamon', sub: 'C5, C5 Special, chips, powder & leaf oil', image: cinnamonImg, category: 'Cinnamon Varieties' },
  { title: 'Nutritional Flour', sub: 'Moringa and wholesome island flours', image: flourImg, category: 'Nutritional Flour' },
  { title: 'Healthy Sweet', sub: 'Pure kithul treacle from the palm', image: sweetImg, category: 'Healthy Sweet' },
  { title: 'Art & Culture', sub: 'Hand-crafted coconut shell pieces', image: vaseImg, category: 'Art & Culture' },
]

const STATS = [
  { value: `${allProducts.length}+`, label: 'Island products' },
  { value: `${productCategories.length}`, label: 'Product lines' },
  { value: '100%', label: 'Ceylon origin' },
  { value: '∞', label: 'Shipments ahead' },
]

const VALUES = [
  { title: 'Origin', text: 'Spices sourced from the finest regions of the island, carefully selected for their aroma and taste.' },
  { title: 'Heritage', text: 'Cinnamon is the most valuable spice Sri Lanka produces, prized around the world for its distinctive aroma and flavour.' },
  { title: 'Taste & purity', text: 'Every product is checked for the purity it promises, from source to shipment.' },
  { title: 'Customer first', text: 'A small, dedicated team that takes care with every order, every shipment and every partner.' },
  { title: 'Looking ahead', text: 'Growing into new lines, including a planned expansion into cosmetics.' },
]

const JOURNEY = [
  { step: 'I', title: 'Sourced at origin', text: 'We work with growers across the island’s spice regions, from the wet-zone cinnamon belts to the hill-country cardamom estates.' },
  { step: 'II', title: 'Selected by hand', text: 'Each batch is graded and checked for aroma, colour and purity before it earns a place in our catalogue.' },
  { step: 'III', title: 'Prepared with care', text: 'Drying, grinding and processing are handled to protect the natural oils and character of every product.' },
  { step: 'IV', title: 'Packed for export', text: 'Sealed and documented to international standards, ready for the journey to your shelves.' },
]

// First item becomes the large bento feature tile.
const FAVOURITE_IDS = ['cinnamon-c5', 'cardamom', 'nutmeg', 'moringa-powder', 'kithul-treacle', 'c5-special', 'cotton-yarn', 'coconut-shell-vase', 'cinnamon-leaf-oil']
const favourites = FAVOURITE_IDS.map((id) => allProducts.find((p) => p.id === id))

const spiceRail = allProducts.filter((p) => p.category === 'Spices' || p.category === 'Cinnamon Varieties')

function CollectionIndex() {
  const [active, setActive] = useState(0)

  return (
    <div className="cindex">
      <ol className="cindex-list">
        {COLLECTIONS.map((c, i) => (
          <li key={c.title}>
            <Link
              to={`/products?category=${encodeURIComponent(c.category)}`}
              className={`cindex-row${active === i ? ' is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="cindex-num">{String(i + 1).padStart(2, '0')}</span>
              <img className="cindex-thumb" src={c.image} alt="" loading="lazy" />
              <span className="cindex-text">
                <span className="cindex-title">{c.title}</span>
                <span className="cindex-sub">{c.sub}</span>
              </span>
              <span className="cindex-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="cindex-preview" aria-hidden="true">
        {COLLECTIONS.map((c, i) => (
          <img key={c.title} src={c.image} alt="" className={active === i ? 'is-active' : undefined} loading="lazy" />
        ))}
        <span className="cindex-preview-label">{COLLECTIONS[active].title}</span>
      </div>
    </div>
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
            index="01"
            eyebrow="The collection"
            title={<>Five lines, <em>one island.</em></>}
            aside={<Link to="/products" className="text-link">View all products</Link>}
          />
          <CollectionIndex />
        </div>
      </section>

      <section className="section section--sand story">
        <div className="container story-grid">
          <div className="story-collage reveal">
            <figure className="story-img story-img--main">
              <img src={skylineImg} alt="Colombo skyline across the Beira Lake" loading="lazy" />
            </figure>
            <figure className="story-img story-img--inset">
              <img src={awardImg} alt="Tvesha Lanka export award" loading="lazy" />
            </figure>
            <span className="story-seal">
              Recognised in the Diribala Exporter Development Program
            </span>
          </div>
          <div className="story-copy reveal">
            <p className="eyebrow eyebrow--rule">(02) &nbsp;From the island, with intention</p>
            <h2 className="display display--lg">Rooted in Ceylon&rsquo;s <em>spice story.</em></h2>
            <p className="dropcap">
              Founded by Mr. Mahendran Madhavan, a visionary entrepreneur from a family with a
              strong business background, Tvesha Lanka Pvt Ltd has established itself as a key
              player in the export and import industry.
            </p>
            <p>
              Our limited but dedicated team works with utmost care, with a strong focus on
              quality, innovation and customer satisfaction for clients across the globe.
            </p>
            <ul className="story-points">
              <li><span>i.</span>Authentic &amp; pure</li>
              <li><span>ii.</span>Thoughtfully selected</li>
              <li><span>iii.</span>Globally trusted</li>
            </ul>
            <Link to="/about-us" className="btn btn-outline">Read our story</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="03"
            eyebrow="The spice chest"
            title={<>Spices &amp; <em>true cinnamon</em></>}
            aside={<p>Hand-picked from the island&rsquo;s spice gardens. Add to your cart and check out in a few clicks.</p>}
          />
        </div>
        <div className="container container--rail">
          <ProductRail products={spiceRail} label="Spices and cinnamon" />
        </div>
      </section>

      <QuoteBand
        image={bannerImg}
        quote={<>Every spice carries the character <em>of the place it comes from.</em></>}
        text="Sourced across Sri Lanka, selected by hand, and shipped with care to partners around the world."
        cite="Tvesha Lanka"
      />

      <section className="section">
        <div className="container">
          <div className="promise reveal">
            <p className="eyebrow eyebrow--rule">(04) &nbsp;A legacy of trust &amp; tradition</p>
            <h2 className="promise-title">
              One company. Many products. <em>One promise.</em>
            </h2>
            <p className="promise-text">
              At Tvesha Lanka Pvt Ltd, our team works with utmost happiness and dedication,
              ensuring the smooth operation of all our endeavours, and delivering exceptional
              products and service to clients across the globe.
            </p>
          </div>
          <dl className="stat-row reveal">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--dark journey">
        <div className="container">
          <SectionHead
            light
            index="05"
            eyebrow="The Tvesha journey"
            title={<>From source <em>to shipment.</em></>}
          />
          <ol className="journey-track">
            {JOURNEY.map((j, i) => (
              <li className="journey-step reveal" key={j.step} style={{ '--reveal-delay': `${i * 120}ms` }}>
                <span className="journey-dot" aria-hidden="true" />
                <span className="journey-num">{j.step}</span>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container values">
          <div className="values-head reveal">
            <p className="eyebrow eyebrow--rule">(06) &nbsp;The Tvesha philosophy</p>
            <h2 className="display display--lg">Goodness, where <em>nature intended.</em></h2>
            <p>
              The world&rsquo;s most remarkable ingredients carry the character of the places they
              come from. We seek out produce at its source and bring it to you with its natural
              character intact.
            </p>
            <Link to="/products" className="btn btn-primary">Explore the collection</Link>
          </div>
          <div className="values-list reveal">
            {VALUES.map((v, i) => (
              <details key={v.title} open={i === 0}>
                <summary>
                  <span className="values-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="values-title">{v.title}</span>
                  <span className="values-icon" aria-hidden="true" />
                </summary>
                <p>{v.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bleed-split">
        <div className="bleed-split-copy">
          <div className="reveal">
            <p className="eyebrow eyebrow--sky eyebrow--rule">(07) &nbsp;Beyond the spice rack</p>
            <h2 className="display display--lg">100% recycled <em>cotton yarn.</em></h2>
            <p>
              Crafted from post-consumer cotton garments, each strand embodies a commitment to
              reducing waste and preserving our planet. Available in any colour, with twisted
              and single threads.
            </p>
            <Link to="/cotton-yarn" className="btn btn-ghost-light">Discover cotton yarn</Link>
          </div>
        </div>
        <div className="bleed-split-media">
          <img src={yarnImg} alt="Spools of 100% recycled cotton yarn" loading="lazy" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="08"
            eyebrow="Best loved"
            title={<>Our favourite <em>picks</em></>}
            aside={<p>A curated selection of favourites, chosen for their distinctive flavour, character and quality.</p>}
          />
          <ProductGrid products={favourites} columns={4} layout="bento" />
        </div>
      </section>
    </>
  )
}
