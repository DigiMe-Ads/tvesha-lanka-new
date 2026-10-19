import { Link } from 'react-router-dom'
import bannerImg from '../assets/images/page-banner.jpg'

/**
 * Editorial page header for inner pages: breadcrumb, oversized title, side copy
 * and a full-width image strip. `title` may contain an <em> accent word.
 */
export default function PageBanner({ title, crumb, eyebrow, text, bgword }) {
  return (
    <section className="page-hero">
      <span className="page-hero-bgword" aria-hidden="true">{bgword ?? crumb}</span>
      <div className="container">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">&mdash;</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <div className="page-hero-grid">
          <h1 className="page-hero-title">{title}</h1>
          <div className="page-hero-side">
            {eyebrow && <p className="eyebrow eyebrow--rule">{eyebrow}</p>}
            {text && <p>{text}</p>}
          </div>
        </div>
      </div>
      <div className="page-hero-strip" aria-hidden="true">
        <img src={bannerImg} alt="" />
      </div>
    </section>
  )
}
