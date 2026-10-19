// Full product catalogue. `category` drives the filter on the Products page.
// Prices are placeholders in LKR until the real price list is confirmed.
export const allProducts = [
  { id: 'cardamom', name: 'Cardamom', category: 'Spices', image: 'spice-cardamom.jpg', price: 1450, unit: '100g' },
  { id: 'nutmeg', name: 'Nutmeg', category: 'Spices', image: 'spice-nutmeg.jpg', price: 690, unit: '100g' },
  { id: 'mace', name: 'Mace', category: 'Spices', image: 'spice-mace.jpg', price: 980, unit: '100g' },
  { id: 'pepper', name: 'Pepper', category: 'Spices', image: 'spice-pepper.jpg', price: 420, unit: '100g' },
  { id: 'cloves', name: 'Cloves', category: 'Spices', image: 'spice-cloves.jpg', price: 560, unit: '100g' },
  { id: 'chilies-powder', name: 'Chilies Powder', category: 'Spices', image: 'spice-chilies-powder.jpg', price: 320, unit: '100g' },
  { id: 'curry-powder', name: 'Sri Lankan Curry Powder', category: 'Spices', image: 'spice-curry-powder.jpg', price: 380, unit: '100g' },
  { id: 'turmeric-powder', name: 'Turmeric Powder', category: 'Spices', image: 'spice-turmeric-powder.jpg', price: 340, unit: '100g' },
  { id: 'cinnamon-c5', name: 'Cinnamon C5', category: 'Cinnamon Varieties', image: 'product-cinnamon-c5.jpg', price: 1250, unit: '100g' },
  { id: 'c5-special', name: 'C5 Special', category: 'Cinnamon Varieties', image: 'product-c5-special.jpg', price: 1480, unit: '100g' },
  { id: 'cinnamon-chips', name: 'Cinnamon Chips', category: 'Cinnamon Varieties', image: 'spice-cinnamon-chips.jpg', price: 450, unit: '100g' },
  { id: 'cinnamon-powder', name: 'Cinnamon Powder', category: 'Cinnamon Varieties', image: 'spice-cinnamon-powder.jpg', price: 520, unit: '100g' },
  { id: 'cinnamon-leaf-oil', name: 'Cinnamon Leaf Oil', category: 'Cinnamon Varieties', image: 'spice-cinnamon-leaf-oil.jpg', price: 1850, unit: '30ml' },
  { id: 'moringa-powder', name: 'Moringa Powder', category: 'Nutritional Flour', image: 'product-moringa-powder.jpg', price: 640, unit: '100g' },
  { id: 'kithul-treacle', name: 'Kithul Treacle', category: 'Healthy Sweet', image: 'product-kithul-treacle.jpg', price: 890, unit: '375ml' },
  { id: 'cotton-yarn', name: 'Recycled Cotton Yarn', category: 'Cotton Yarn', image: 'product-cotton-yarn-thumb.jpg', price: 2400, unit: '1kg cone' },
  { id: 'coconut-shell-vase', name: 'Coconut Shell Flower Vase Large', category: 'Art & Culture', image: 'product-coconut-shell-vase.jpg', price: 3200, unit: 'each' },
]

const CATEGORY_NAMES = [
  'Spices',
  'Cinnamon Varieties',
  'Nutritional Flour',
  'Healthy Sweet',
  'Cotton Yarn',
  'Art & Culture',
]

export const productCategories = CATEGORY_NAMES.map((name) => ({
  name,
  count: allProducts.filter((p) => p.category === name).length,
}))

export const contactInfo = {
  address: ['#33, Horton Place, Colombo- 07,', 'Sri Lanka'],
  phone: '+94 112 681 315',
  whatsapp: '+94 701 100 500',
  email: 'info@tveshalanka.com',
}

export function formatPrice(amount) {
  return `Rs. ${amount.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
