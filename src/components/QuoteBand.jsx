import Ornament from './Ornament.jsx'

/**
 * Full-bleed image band with a large italic pull quote.
 */
export default function QuoteBand({ image, quote, cite, text }) {
  return (
    <section className="quote-band">
      <img src={image} alt="" aria-hidden="true" className="quote-band-bg" loading="lazy" />
      <div className="container quote-band-inner reveal">
        <Ornament light />
        <blockquote>
          <p>{quote}</p>
        </blockquote>
        {text && <p className="quote-band-text">{text}</p>}
        {cite && <cite>&mdash; {cite}</cite>}
      </div>
    </section>
  )
}
