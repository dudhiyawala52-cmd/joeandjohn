/**
 * The single seam between the UI and its data.
 *
 * Today every getter resolves local demonstration data. After approval:
 *  - getSiteSettings / getHeroSlides  -> Builder.io content models
 *  - getCategories / getProducts      -> Shopify Storefront API (collections, products)
 *  - getSearchIndex (+ lib/search.ts) -> Shopify predictive search
 * The function signatures stay the same, so components need no changes.
 */
import { categories, products } from "@/content/demo/catalogue";
import { heroSlides } from "@/content/demo/hero";
import { site } from "@/content/demo/site";
import type { Category, HeroSlide, Product, SearchResult, SiteSettings } from "@/content/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  return site;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return heroSlides;
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getProducts(): Promise<Product[]> {
  return products;
}

/** Everything the client-side search needs, prepared once on the server. */
export async function getSearchIndex(): Promise<SearchResult[]> {
  const byHandle = new Map(categories.map((c) => [c.handle, c]));
  return products.map((p) => ({ ...p, categoryTitle: byHandle.get(p.categoryHandle)?.title ?? "" }));
}
