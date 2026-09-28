# Joe & Jone: homepage prototype

Next.js 16 (App Router), React 19, TypeScript, GSAP + ScrollTrigger. Homepage only, for client approval.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production preview: `npm run build` then `npm run start`.

The npm scripts call `node node_modules/...` directly because the `&` in the folder path ("Joe & John") breaks npm's Windows command shims.

## Structure

```
src/content/types.ts        Content model (SiteSettings, HeroSlide, Category, Product)
src/content/demo/*.ts       Demonstration data (real Joe & Jone titles, SKUs, specs, photos)
src/lib/content.ts          The only place the UI gets data from: async getters
src/lib/search.ts           Client-side search over the demo index
src/components/*            Presentational components that receive typed props only
public/products, /hero      Product photography from joeandjone.co.uk and the supplied hero render
```

## Future CMS and commerce integration

- Components never import demo data. `page.tsx` calls the getters in `src/lib/content.ts` and passes typed props down.
- To go live, reimplement those getters:
  - `getSiteSettings`, `getHeroSlides` → Builder.io models (navigation, contact details, hero slides with desktop and mobile focal points).
  - `getCategories`, `getProducts`, `getSearchIndex` → Shopify Storefront API (collections, products, variants, metafields for specs).
- `Category.handle` is intended to match the Shopify collection handle. Every link already points to its future route (`/products/<collection>/<product>`, `/enquiry`, and so on). Until those pages exist they show a "coming in the next phase" page.
- Hand dryers have no photography on the current site, so `image: null` renders a labelled illustration. Supplying photos in the CMS replaces it automatically.
