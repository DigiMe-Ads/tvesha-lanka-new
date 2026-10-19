export default function QtyStepper({ value, onChange, label }) {
  return (
    <div className="qty" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label="Decrease quantity">&minus;</button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase quantity" disabled={value >= 99}>+</button>
    </div>
  )
}
