const ITEMS = [
  'Taste & Purity',
  'Ceylon Cinnamon',
  'Flavour Magic',
  'Cardamom',
  'Pure & Natural',
  'Black Pepper',
  'Export Ready',
  'Kithul Treacle',
  'Cloves',
  'Moringa',
]

/**
 * Endless scrolling ticker of the brand promises and signature products.
 */
export default function FeatureStrip() {
  const row = ITEMS.map((item) => (
    <span key={item} className="ticker-item">
      {item}
      <span className="ticker-star" aria-hidden="true">&#10022;</span>
    </span>
  ))

  return (
    <section className="ticker" aria-label="What we offer">
      <div className="ticker-track">
        <div className="ticker-group">{row}</div>
        <div className="ticker-group" aria-hidden="true">{row}</div>
      </div>
    </section>
  )
}
