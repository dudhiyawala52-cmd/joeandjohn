"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Category, SearchResult, SiteSettings } from "@/content/types";
import { SiteHeader } from "@/components/header/SiteHeader";
import { MenuOverlay } from "@/components/menu/MenuOverlay";
import { SearchOverlay } from "@/components/search/SearchOverlay";

export type Panel = "menu" | "search" | null;

type Props = {
  site: SiteSettings;
  categories: Category[];
  searchIndex: SearchResult[];
};

/** Owns which full-screen panel is open, scroll locking, shortcuts and focus return. */
export function SiteChrome({ site, categories, searchIndex }: Props) {
  const [panel, setPanel] = useState<Panel>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((next: Exclude<Panel, null>) => {
    if (!returnFocus.current) returnFocus.current = document.activeElement as HTMLElement | null;
    setPanel(next);
  }, []);

  const close = useCallback(() => {
    setPanel(null);
    const target = returnFocus.current;
    returnFocus.current = null;
    // Wait for the panel to become inert before moving focus back.
    window.setTimeout(() => target?.focus({ preventScroll: true }), 50);
  }, []);

  useEffect(() => {
    document.body.dataset.locked = panel ? "true" : "false";
  }, [panel]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target;
      const typing = target instanceof Element && target.closest("input, textarea, [contenteditable='true']");
      if (e.key === "Escape" && panel) {
        e.preventDefault();
        close();
      } else if (((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) && panel !== "search") {
        e.preventDefault();
        open("search");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel, open, close]);

  return (
    <>
      <SiteHeader site={site} hidden={panel !== null} onOpenMenu={() => open("menu")} onOpenSearch={() => open("search")} />
      <MenuOverlay
        open={panel === "menu"}
        site={site}
        categories={categories}
        onClose={close}
        onOpenSearch={() => setPanel("search")}
      />
      <SearchOverlay
        open={panel === "search"}
        site={site}
        categories={categories}
        index={searchIndex}
        onClose={close}
        onOpenMenu={() => setPanel("menu")}
      />
    </>
  );
}
