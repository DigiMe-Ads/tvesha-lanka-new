import { Link } from 'react-router-dom'
import Ornament from './Ornament.jsx'
import bannerImg from '../assets/images/page-banner.jpg'

/**
 * Title + breadcrumb banner at the top of every inner page.
 * `title` may contain an <em> for the italic blue accent word.
 */
export default function PageBanner({ title, crumb, eyebrow, text }) {
  return (
    <section className="page-banner">
      <div className="container">
        <div className="page-banner-card">
          <img src={bannerImg} alt="" aria-hidden="true" className="page-banner-bg" />
          <div className="page-banner-inner">
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>{crumb}</span>
            </nav>
            {eyebrow && <p className="eyebrow eyebrow--rule">{eyebrow}</p>}
            <h1 className="display">{title}</h1>
            {text && <p className="page-banner-text">{text}</p>}
            <Ornament light />
          </div>
        </div>
      </div>
    </section>
  )
}
