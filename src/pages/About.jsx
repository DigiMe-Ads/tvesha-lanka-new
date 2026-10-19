import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import QuoteBand from '../components/QuoteBand.jsx'
import bannerImg from '../assets/images/page-banner.jpg'
import skylineImg from '../assets/images/about-skyline.jpg'
import awardImg from '../assets/images/about-award.jpg'

export default function About() {
  return (
    <>
      <PageBanner
        title={<>Our <em>Story</em></>}
        crumb="Our Story"
        eyebrow="About Tvesha Lanka"
        text="A dynamic multinational conglomerate with a rich history and a promising future."
      />

      <section className="section section--top-tight">
        <div className="container split reveal">
          <div>
            <p className="eyebrow eyebrow--rule">About the company</p>
            <h2 className="display display--lg">Built on family, <em>driven by excellence.</em></h2>
            <p className="lead">
              Welcome to Tvesha Lanka Pvt Ltd. Founded by Mr. Mahendran Madhavan, a visionary
              entrepreneur from a family with a strong business background, Tvesha Lanka has
              established itself as a key player in the export and import industry, under the
              able leadership of Mr. Mahendra Madhavan along with his family.
            </p>
            <p>
              Our limited but dedicated team of employees works with utmost happiness and
              dedication, ensuring the smooth operation of all our endeavours. With a strong
              focus on quality, innovation and customer satisfaction, we believe in delivering
              exceptional products and services to our clients across the globe.
            </p>
          </div>
          <div className="split-media">
            <img src={skylineImg} alt="Colombo skyline" />
          </div>
        </div>
      </section>

      <QuoteBand
        image={bannerImg}
        quote={<>A rich history, and <em>a promising future.</em></>}
        cite="Tvesha Lanka (Pvt) Ltd"
      />

      <section className="section">
        <div className="container">
          <div className="philosophy-card philosophy-card--about reveal">
            <div className="philosophy-copy">
              <p className="eyebrow eyebrow--rule eyebrow--amber">Looking ahead</p>
              <h2 className="display display--lg">Redefining boundaries, <em>setting new benchmarks.</em></h2>
              <p>
                As we look ahead, the future of Tvesha Lanka Pvt Ltd is filled with immense
                potential. With our planned expansion into the cosmetic line and a steadfast
                commitment to excellence, we are poised to continue making significant strides
                in the export and import industry.
              </p>
              <p>
                Join us on our journey as we strive to create a lasting impact in the global
                marketplace.
              </p>
              <div className="philosophy-actions">
                <Link to="/contact-us" className="btn btn-cream btn-sm">Partner with us <span aria-hidden="true">&#8599;</span></Link>
              </div>
            </div>
            <figure className="about-award">
              <img src={awardImg} alt="Award presented to Tvesha Lanka (Pvt) Ltd by Commercial Bank" />
              <figcaption>Diribala Exporter Development Program &middot; Commercial Bank</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  )
}
