/**
 * Eyebrow + serif title on the left, optional supporting copy or link on the right.
 */
export default function SectionHead({ eyebrow, title, aside, light = false }) {
  // `title` may contain an <em> for the italic amber accent word.
  return (
    <div className={`section-head reveal${light ? ' section-head--light' : ''}`}>
      <div>
        {eyebrow && <p className="eyebrow eyebrow--rule">{eyebrow}</p>}
        <h2 className="display">{title}</h2>
      </div>
      {aside && <div className="section-head-aside">{aside}</div>}
    </div>
  )
}
