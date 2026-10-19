/**
 * Small leaf-and-rule flourish used to divide headings and bands.
 */
export default function Ornament({ light = false }) {
  return (
    <span className={`ornament${light ? ' ornament--light' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 120 16" fill="none">
        <path d="M0 8h46M74 8h46" stroke="currentColor" strokeWidth="1" />
        <path d="M60 2c-4 3-6 5-6 6s2 3 6 6c4-3 6-5 6-6s-2-3-6-6Z" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="8" r="1.4" fill="currentColor" />
        <circle cx="70" cy="8" r="1.4" fill="currentColor" />
      </svg>
    </span>
  )
}
