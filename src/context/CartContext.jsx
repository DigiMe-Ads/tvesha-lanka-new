import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { allProducts } from '../data/products.js'

const STORAGE_KEY = 'tvesha-cart'
const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((i) => allProducts.some((p) => p.id === i.id)) : []
  } catch {
    return []
  }
}

/**
 * Cart state shared across the site. Only product ids and quantities are
 * stored (in localStorage); product details are looked up from the catalogue.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage can be unavailable (private mode); the cart still works in memory.
    }
  }, [items])

  const add = useCallback((id, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === id)
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
      return [...prev, { id, qty }]
    })
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(99, qty) } : i)),
    )
  }, [])

  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), [])
  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(() => {
    const lines = items
      .map((i) => {
        const product = allProducts.find((p) => p.id === i.id)
        return product ? { ...product, qty: i.qty, lineTotal: product.price * i.qty } : null
      })
      .filter(Boolean)
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      add,
      setQty,
      remove,
      clear,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    }
  }, [items, drawerOpen, add, setQty, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}

// Placeholder delivery options used by the cart drawer and checkout.
export const FREE_DELIVERY_OVER = 10000
export const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard delivery', note: '3–5 working days, island-wide', price: 450 },
  { id: 'express', label: 'Express delivery', note: '1–2 working days, Colombo & suburbs', price: 950 },
  { id: 'pickup', label: 'Collect from office', note: 'Horton Place, Colombo 07', price: 0 },
]

export function deliveryCost(optionId, subtotal) {
  const option = DELIVERY_OPTIONS.find((o) => o.id === optionId) ?? DELIVERY_OPTIONS[0]
  if (option.id === 'standard' && subtotal >= FREE_DELIVERY_OVER) return 0
  return option.price
}
