import type { Category, SearchResult } from "@/content/types";

const normalise = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}.\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Small ranked search over the demo index. Pure and synchronous so it can run
 * on every keystroke in the browser; production search will replace it.
 */
export function searchCatalogue(index: SearchResult[], cats: Category[], query: string): SearchResult[] {
  const q = normalise(query);
  if (!q) return [];
  const terms = q.split(" ");
  const keywordMap = new Map(cats.map((c) => [c.handle, normalise(c.keywords.join(" "))]));

  return index
    .map((item) => {
      const title = normalise(item.title);
      const category = normalise(item.categoryTitle);
      const keywords = keywordMap.get(item.categoryHandle) ?? "";
      const haystack = `${title} ${category} ${keywords} ${item.sku} ${normalise(item.highlights.join(" "))}`;
      let score = 0;
      for (const term of terms) {
        if (!haystack.includes(term)) return { item, score: 0 };
        if (item.sku.startsWith(term)) score += 6;
        if (title.includes(term)) score += 3;
        if (category.includes(term)) score += 2;
        if (keywords.includes(term)) score += 1;
      }
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}
