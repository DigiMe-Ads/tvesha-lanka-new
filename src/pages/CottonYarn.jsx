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
        eyebrow="Sustainable textiles"
        text="Where eco-consciousness meets creativity."
      />
      <section className="section section--top-tight">
        <div className="container split reveal">
          <div className="split-media">
            <img src={yarnImg} alt="Spools of 100% recycled cotton yarn" />
          </div>
          <div>
            <p className="eyebrow eyebrow--rule">Beyond the spice rack</p>
            <h2 className="display display--lg">100% recycled <em>cotton yarn.</em></h2>
            <p className="lead">
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
            <div className="promise-points promise-points--3">
              {SPECS.map((s) => (
                <div key={s.title}>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            <Link to="/contact-us" className="btn btn-primary">Request a Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}
