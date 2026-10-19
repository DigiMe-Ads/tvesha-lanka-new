// Full product catalogue. `category` drives the filter on the Products page.
export const allProducts = [
  { id: 'cardamom', name: 'Cardamom', category: 'Spices', image: 'spice-cardamom.jpg' },
  { id: 'nutmeg', name: 'Nutmeg', category: 'Spices', image: 'spice-nutmeg.jpg' },
  { id: 'mace', name: 'Mace', category: 'Spices', image: 'spice-mace.jpg' },
  { id: 'pepper', name: 'Pepper', category: 'Spices', image: 'spice-pepper.jpg' },
  { id: 'cloves', name: 'Cloves', category: 'Spices', image: 'spice-cloves.jpg' },
  { id: 'chilies-powder', name: 'Chilies Powder', category: 'Spices', image: 'spice-chilies-powder.jpg' },
  { id: 'curry-powder', name: 'Sri Lankan Curry Powder', category: 'Spices', image: 'spice-curry-powder.jpg' },
  { id: 'turmeric-powder', name: 'Turmeric Powder', category: 'Spices', image: 'spice-turmeric-powder.jpg' },
  { id: 'cinnamon-c5', name: 'Cinnamon C5', category: 'Cinnamon Varieties', image: 'product-cinnamon-c5.jpg' },
  { id: 'c5-special', name: 'C5 Special', category: 'Cinnamon Varieties', image: 'product-c5-special.jpg' },
  { id: 'cinnamon-chips', name: 'Cinnamon Chips', category: 'Cinnamon Varieties', image: 'spice-cinnamon-chips.jpg' },
  { id: 'cinnamon-powder', name: 'Cinnamon Powder', category: 'Cinnamon Varieties', image: 'spice-cinnamon-powder.jpg' },
  { id: 'cinnamon-leaf-oil', name: 'Cinnamon Leaf Oil', category: 'Cinnamon Varieties', image: 'spice-cinnamon-leaf-oil.jpg' },
  { id: 'moringa-powder', name: 'Moringa Powder', category: 'Nutritional Flour', image: 'product-moringa-powder.jpg' },
  { id: 'kithul-treacle', name: 'Kithul Treacle', category: 'Healthy Sweet', image: 'product-kithul-treacle.jpg' },
  { id: 'cotton-yarn', name: 'Recycled Cotton Yarn', category: 'Cotton Yarn', image: 'product-cotton-yarn-thumb.jpg' },
  { id: 'coconut-shell-vase', name: 'Coconut Shell Flower Vase Large', category: 'Art & Culture', image: 'product-coconut-shell-vase.jpg' },
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

const byId = (ids) => ids.map((id) => allProducts.find((p) => p.id === id))

// "The Spice Chest" row on the Home page.
export const spiceChest = byId(['cardamom', 'pepper', 'cloves', 'nutmeg'])

// "Our Favourite Picks" grid on the Home page.
export const homeProducts = byId([
  'cardamom',
  'nutmeg',
  'cinnamon-c5',
  'moringa-powder',
  'kithul-treacle',
  'c5-special',
  'cotton-yarn',
  'coconut-shell-vase',
])

export const contactInfo = {
  address: ['#33, Horton Place, Colombo- 07,', 'Sri Lanka'],
  phone: '+94 112 681 315',
  whatsapp: '+94 701 100 500',
  email: 'info@tveshalanka.com',
}
