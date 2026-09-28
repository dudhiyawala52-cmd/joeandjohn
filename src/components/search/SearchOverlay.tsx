"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useRef, useState } from "react";
import type { Category, SearchResult, SiteSettings } from "@/content/types";
import { gsap, useGSAP } from "@/lib/gsap";
import { searchCatalogue } from "@/lib/search";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { Icon } from "@/components/ui/Icon";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { OverlayBar } from "@/components/header/OverlayBar";
import styles from "./SearchOverlay.module.css";

type Props = {
  open: boolean;
  site: SiteSettings;
  categories: Category[];
  index: SearchResult[];
  onClose: () => void;
  onOpenMenu: () => void;
};

const SUGGESTIONS = ["Sensor tap", "Soap dispenser", "Urinal flush", "Hand dryer", "362.0022"];

export function SearchOverlay({ open, site, categories, index, onClose, onOpenMenu }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const wasOpen = useRef(false);
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  useFocusTrap(root, open, input);

  const results = useMemo(() => searchCatalogue(index, categories, deferred), [index, categories, deferred]);
  const matchedCategories = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) return [];
    return categories.filter(
      (c) => c.title.toLowerCase().includes(q) || c.keywords.some((k) => k.includes(q) || q.includes(k)),
    );
  }, [categories, deferred]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (!open && !wasOpen.current) return;
      wasOpen.current = open;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rise = el.querySelectorAll("[data-rise]");
      if (reduced) {
        gsap.set([el, scrim.current], { autoAlpha: open ? 1 : 0 });
        gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }
      // Same drop-down as the menu: panel unclips from the top over a dimmed page.
      if (open) {
        gsap
          .timeline()
          .set(el, { autoAlpha: 1 })
          .fromTo(scrim.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" }, 0)
          .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.inOut" }, 0)
          .fromTo(rise, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.05 }, 0.2);
      } else {
        gsap
          .timeline()
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.4, ease: "power3.inOut" })
          .to(scrim.current, { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.05)
          .set(el, { autoAlpha: 0 });
      }
    },
    { dependencies: [open], scope: root },
  );

  const hasQuery = deferred.trim().length > 0;
  const status = !hasQuery
    ? "Search by product, category or SKU. Press Esc to close."
    : results.length === 0
      ? `No products match “${deferred.trim()}”`
      : `${results.length} ${results.length === 1 ? "product" : "products"} for “${deferred.trim()}”`;

  return (
    <>
      {/* Dims the page below the panel; clicking it closes search. */}
      <div ref={scrim} className={styles.scrim} onClick={onClose} aria-hidden="true" />
    <div
      ref={root}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      aria-hidden={!open}
      inert={!open}
    >
      <OverlayBar site={site} mode="search" onClose={onClose} onSwitch={onOpenMenu} />

      <div className={styles.inner}>
        <form className={styles.field} role="search" data-rise onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="site-search" className="visually-hidden">
            Search products
          </label>
          <Icon name="search" size={30} className={styles.fieldIcon} />
          <input
            ref={input}
            id="site-search"
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-describedby="search-status"
          />
          {query ? (
            <button type="button" className={styles.clear} onClick={() => (setQuery(""), input.current?.focus())}>
              Clear
            </button>
          ) : null}
        </form>

        <p id="search-status" className={styles.status} aria-live="polite">
          {status}
        </p>

        {!hasQuery || results.length === 0 ? (
          <div className={styles.idle}>
            <div data-rise>
              <p className={styles.groupTitle}>{hasQuery ? "Try one of these" : "Popular searches"}</p>
              <ul className={styles.chips}>
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button type="button" className={styles.chip} onClick={() => (setQuery(s), input.current?.focus())}>
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div data-rise>
              <p className={styles.groupTitle}>Browse categories</p>
              <ul className={styles.categoryGrid}>
                {categories.map((cat) => (
                  <li key={cat.handle}>
                    <Link href={cat.href} className={styles.categoryTile} onClick={onClose}>
                      <span className={styles.tileImage}>
                        <ProductVisual image={cat.heroImage} fallbackLabel={cat.title} sizes="(max-width: 767px) 40vw, 14vw" />
                      </span>
                      <span className={styles.tileTitle}>{cat.title}</span>
                      <span className={styles.tileMeta}>{cat.productCount} products</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.results}>
            {matchedCategories.length ? (
              <ul className={styles.chips} aria-label="Matching categories">
                {matchedCategories.map((cat) => (
                  <li key={cat.handle}>
                    <Link href={cat.href} className={styles.chip} onClick={onClose}>
                      {cat.title} <span className={styles.chipCount}>{cat.productCount}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <ul className={styles.resultGrid}>
              {results.map((item) => (
                <li key={item.handle}>
                  <Link href={item.href} className={styles.result} onClick={onClose}>
                    <span className={styles.resultImage}>
                      <ProductVisual image={item.image} fallbackLabel={item.title} sizes="(max-width: 767px) 44vw, 18vw" />
                    </span>
                    <span className={styles.resultTitle}>{item.title}</span>
                    <span className={styles.resultMeta}>
                      {item.categoryTitle}, SKU {item.sku}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
