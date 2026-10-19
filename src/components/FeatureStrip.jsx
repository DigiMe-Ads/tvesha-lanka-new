const FEATURES = [
  { title: 'Taste and Purity', text: 'Purity in every product we offer.' },
  { title: 'Flavor Magic', text: 'An exquisite range of true flavour.' },
  { title: 'Pure Natural', text: 'The goodness of nature, untouched.' },
  { title: 'Export Ready', text: 'Shipped with care, worldwide.' },
]

export default function FeatureStrip() {
  return (
    <section className="feature-strip">
      <div className="container feature-strip-grid">
        {FEATURES.map((f, i) => (
          <div className="feature-strip-item" key={f.title}>
            <span className="feature-strip-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
