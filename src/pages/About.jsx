import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import QuoteBand from '../components/QuoteBand.jsx'
import bannerImg from '../assets/images/page-banner.jpg'
import skylineImg from '../assets/images/about-skyline.jpg'
import awardImg from '../assets/images/about-award.jpg'

const PILLARS = [
  { title: 'Quality', text: 'Every product checked for the purity and character it promises.' },
  { title: 'Innovation', text: 'New lines and better processes, including a planned move into cosmetics.' },
  { title: 'Customer satisfaction', text: 'Exceptional products and service for clients across the globe.' },
]

export default function About() {
  return (
    <>
      <PageBanner
        title={<>Our <em>Story</em></>}
        crumb="Our Story"
        bgword="Story"
        eyebrow="About Tvesha Lanka"
        text="A dynamic multinational conglomerate with a rich history and a promising future."
      />

      <section className="section section--top-tight">
        <div className="container about-intro">
          <div className="about-intro-copy reveal">
            <p className="eyebrow eyebrow--rule">(01) &nbsp;About the company</p>
            <h2 className="display display--lg">Built on family, <em>driven by excellence.</em></h2>
            <p className="dropcap">
              Welcome to Tvesha Lanka Pvt Ltd. Founded by Mr. Mahendran Madhavan, a visionary
              entrepreneur from a family with a strong business background, Tvesha Lanka has
              established itself as a key player in the export and import industry, under the
              able leadership of Mr. Mahendra Madhavan along with his family.
            </p>
            <p>
              Our limited but dedicated team of employees works with utmost happiness and
              dedication, ensuring the smooth operation of all our endeavours.
            </p>
          </div>
          <figure className="arch about-intro-media reveal">
            <img src={skylineImg} alt="Colombo skyline" />
          </figure>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <ol className="pillars">
            {PILLARS.map((p, i) => (
              <li key={p.title} className="reveal" style={{ '--reveal-delay': `${i * 100}ms` }}>
                <span className="pillars-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <QuoteBand
        image={bannerImg}
        quote={<>A rich history, and <em>a promising future.</em></>}
        cite="Tvesha Lanka (Pvt) Ltd"
      />

      <section className="section">
        <div className="container ahead">
          <figure className="ahead-media reveal">
            <img src={awardImg} alt="Award presented to Tvesha Lanka (Pvt) Ltd by Commercial Bank" />
            <figcaption>Diribala Exporter Development Program &middot; Commercial Bank</figcaption>
          </figure>
          <div className="ahead-copy reveal">
            <p className="eyebrow eyebrow--rule">(02) &nbsp;Looking ahead</p>
            <h2 className="display display--lg">Redefining boundaries, <em>setting new benchmarks.</em></h2>
            <p>
              As we look ahead, the future of Tvesha Lanka Pvt Ltd is filled with immense
              potential. With our planned expansion into the cosmetic line and a steadfast
              commitment to excellence, we are poised to continue making significant strides in
              the export and import industry.
            </p>
            <p>
              Join us on our journey as we strive to create a lasting impact in the global
              marketplace.
            </p>
            <Link to="/contact-us" className="btn btn-primary">Partner with us <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </div>
      </section>
    </>
  )
}
