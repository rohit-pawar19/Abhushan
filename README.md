# Abhusan

A responsive Indian jewellery storefront built with React, React Router, Bootstrap 5, custom CSS, and React Icons. All jewellery photography comes from the supplied asset folders.

## Run locally

- `npm install`
- `npm run dev`

## Checks

- `npm test` — 18 interaction tests in jsdom
- `npm run lint` — Oxlint
- `npm run build` — production output in `dist/`
- `npm run preview` — serve the production build locally

## Features

Home carousel with live links, six collection dialogs, nine products with individual detail pages, category filtering, search, price/name sorting, persistent shopping cart, quantity controls, demo checkout, about/contact pages, and demo login/signup.

## Structure

- `src/components/` — shared navigation, footer, cards, carousel, dialog, and form controls
- `src/pages/` — individual route pages
- `src/context/` — cart, demo session, and feedback state
- `src/data/catalog.js` — products, collection pieces, INR formatting, and asset references
- `src/styles/` — layout, hero, editorial, catalogue/cart, and form styles
- `src/test/` — interaction tests

## Demo behaviour

No backend, payment gateway, or email service is connected. Checkout never creates an order or collects payment. Contact form submission validates locally and does not send or save the message.

Login accepts any valid email and password of at least eight characters. It demonstrates an account interface, not identity verification. Signup saves only a name and email. Passwords and phone numbers are not stored. Remember me uses localStorage; otherwise the demo session uses sessionStorage.

Cart storage contains product IDs and quantities. Product details and prices are resolved from the catalogue. Invalid saved entries are discarded, and quantities are restricted to 1–99.

Contact information and prices are illustrative. Existing campaign artwork may include embedded wording; its original files have not been edited. The carousel shows each complete square image. Live buttons cover the printed CTA using percentage positions. All collection, story, account, and product photography is displayed without cropping. Google Fonts has local system-font fallbacks.

## Deployment

Deploy `dist/` to a static host. Configure unknown routes to serve `index.html` so React Router routes work after a direct load or refresh.

## Test coverage and remaining visual checks

Automated checks cover all routes, cart updates/persistence/removal, collection dialogs and confirmation, carousel timing/controls/links, menu toggling, sorting/filtering/search, local image paths, account validation/storage, and contact validation. The tests assert that no React console errors occur.

jsdom cannot verify rendered dimensions, image loading/appearance, or the browser's native dialog focus trap. A browser connection was unavailable during implementation. Visually check 375 px, 768 px, and 1440 px widths, carousel image framing, keyboard focus in dialogs, and horizontal overflow before publishing.
