# Tvesha Lanka (Pvt) Ltd — website

A responsive React site for Tvesha Lanka, styled after Earthy Munchy's
forest-green and cream look (Fraunces serif headings, Jost body text,
rounded image cards) while keeping Tvesha's own copy, products and branding.

## Stack

- React 18 + React Router
- Vite (build tool / dev server)
- Plain CSS (no framework) — everything lives in `src/styles/index.css`

## Getting started

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  assets/images/     source photos (cropped from the current Tvesha site)
  components/        Header, Footer, HeroBanner, FeatureStrip, SectionHead,
                      PageBanner, ProductGrid/ProductCard, ContactForm,
                      NewsletterBand
  data/products.js   product catalogue (with categories), home lists, contact info
  pages/             Home, About, Products, CottonYarn, Contact
  styles/index.css   theme tokens + all page/component styles
```

## Notes

- The Contact page embeds Google Maps via an unauthenticated `output=embed`
  iframe for the Horton Place address — swap in your own Maps Embed API key
  if you want a branded/no-attribution map.
- The contact form and newsletter signup are wired up in the UI but don't
  submit anywhere yet — point `ContactForm.jsx` / `NewsletterBand.jsx` at
  your mail service or API of choice.
- Product photos were cropped from the current tveshalanka.com screenshots;
  swap in higher-resolution originals in `src/assets/images/` whenever
  you have them — filenames are referenced from `src/data/products.js` and
  a few page/component files.
