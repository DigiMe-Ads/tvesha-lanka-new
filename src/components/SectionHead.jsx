/**
 * Numbered section heading: a ruled label line, a large serif title and optional
 * supporting copy or link on the right. `title` may contain an <em> accent.
 */
export default function SectionHead({ index, eyebrow, title, aside, light = false }) {
  return (
    <div className={`section-head reveal${light ? ' section-head--light' : ''}`}>
      <div className="section-head-rule">
        {index && <span className="section-head-index">({index})</span>}
        {eyebrow && <span className="section-head-label">{eyebrow}</span>}
      </div>
      <div className="section-head-body">
        <h2 className="display">{title}</h2>
        {aside && <div className="section-head-aside">{aside}</div>}
      </div>
    </div>
  )
}
