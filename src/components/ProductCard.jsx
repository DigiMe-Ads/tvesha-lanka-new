import { Link } from 'react-router-dom'

const imageModules = import.meta.glob('../assets/images/*.{jpg,png}', {
  eager: true,
  import: 'default',
})

export function resolveImage(filename) {
  const match = Object.entries(imageModules).find(([path]) => path.endsWith(`/${filename}`))
  return match ? match[1] : undefined
}

export default function ProductCard({ name, image, category }) {
  return (
    <article className="product-card reveal">
      <div className="product-card-media">
        <img src={resolveImage(image)} alt={name} loading="lazy" />
      </div>
      <div className="product-card-body">
        {category && <span className="product-card-cat">{category}</span>}
        <h3>{name}</h3>
        <Link to="/contact-us" className="product-card-link">Enquire <span aria-hidden="true">&#8599;</span></Link>
      </div>
    </article>
  )
}
