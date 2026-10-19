import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import yarnImg from '../assets/images/cotton-yarn.jpg'

const SPECS = [
  { title: '100% Recycled', text: 'Made from post-consumer cotton garments.' },
  { title: 'Any Colour', text: 'Produced to match your palette.' },
  { title: 'Twisted & Single', text: 'Available in both thread types.' },
]

export default function CottonYarn() {
  return (
    <>
      <PageBanner
        title={<>Cotton <em>Yarn</em></>}
        crumb="Cotton Yarn"
        bgword="Yarn"
        eyebrow="Sustainable textiles"
        text="Where eco-consciousness meets creativity."
      />
      <section className="section section--top-tight">
        <div className="container about-intro about-intro--flip">
          <figure className="arch about-intro-media reveal">
            <img src={yarnImg} alt="Spools of 100% recycled cotton yarn" />
          </figure>
          <div className="about-intro-copy reveal">
            <p className="eyebrow eyebrow--rule">(01) &nbsp;Beyond the spice rack</p>
            <h2 className="display display--lg">100% recycled <em>cotton yarn.</em></h2>
            <p className="dropcap">
              Discover the sustainable allure of recycled cotton yarn. Crafted from
              post-consumer cotton garments, each strand embodies a commitment to reducing
              waste and preserving our planet.
            </p>
            <p>
              Embrace its soft texture and versatility in your weaving projects, knowing that
              you&rsquo;re contributing to a greener, more sustainable future. Join the movement
              towards mindful crafting, where every stitch tells a story of environmental
              responsibility.
            </p>
            <dl className="spec-list">
              {SPECS.map((s, i) => (
                <div key={s.title}>
                  <dt><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</dt>
                  <dd>{s.text}</dd>
                </div>
              ))}
            </dl>
            <Link to="/contact-us" className="btn btn-primary">Request a quote <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </div>
      </section>
    </>
  )
}
