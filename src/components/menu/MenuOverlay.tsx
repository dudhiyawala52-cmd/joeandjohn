"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Category, SiteSettings } from "@/content/types";
import { gsap, useGSAP } from "@/lib/gsap";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { OverlayBar } from "@/components/header/OverlayBar";
import { ProductVisual } from "@/components/ui/ProductVisual";
import styles from "./MenuOverlay.module.css";

type Props = {
  open: boolean;
  site: SiteSettings;
  categories: Category[];
  onClose: () => void;
  onOpenSearch: () => void;
};

export function MenuOverlay({ open, site, categories, onClose, onOpenSearch }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [preview, setPreview] = useState(0);
  const wasOpen = useRef(false);

  useFocusTrap(root, open, closeButton);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lines = el.querySelectorAll("[data-line]");
      const fades = el.querySelectorAll("[data-fade]");
      const media = el.querySelector("[data-media]");

      if (!open && !wasOpen.current) return;
      wasOpen.current = open;
      if (reduced) {
        gsap.set(scrim.current, { autoAlpha: open ? 1 : 0 });
        gsap.set(el, { autoAlpha: open ? 1 : 0, clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set([lines, fades], { yPercent: 0, opacity: 1 });
        return;
      }
      if (open) {
        gsap
          .timeline()
          .set(el, { autoAlpha: 1 })
          .fromTo(scrim.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" }, 0)
          .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.inOut" }, 0)
          .fromTo(lines, { yPercent: 105 }, { yPercent: 0, duration: 0.55, ease: "power3.out", stagger: 0.03 }, 0.18)
          .fromTo(media, { scale: 1.06 }, { scale: 1, duration: 0.9, ease: "power3.out" }, 0.05)
          .fromTo(fades, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.04 }, 0.25);
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

  return (
    <>
      {/* Dims and softens the page below the menu panel; clicking it closes the menu. */}
      <div ref={scrim} className={styles.scrim} onClick={onClose} aria-hidden="true" />
    <div
      ref={root}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
    >
      <OverlayBar site={site} mode="menu" onClose={onClose} onSwitch={onOpenSearch} closeRef={closeButton} />

      <div className={styles.panel}>
        {/* Product categories are the headline of the menu and drive the image on the right. */}
        <nav className={styles.products} aria-label="Products">
          <ul>
            {categories.map((cat, i) => (
              <li key={cat.handle} className={styles.mask}>
                <Link
                  href={cat.href}
                  className={styles.categoryLink}
                  data-line
                  data-active={preview === i}
                  onMouseEnter={() => setPreview(i)}
                  onFocus={() => setPreview(i)}
                  onPointerDown={() => setPreview(i)}
                  onClick={onClose}
                >
                  <span className={styles.thumb} aria-hidden="true">
                    <ProductVisual image={cat.heroImage} fallbackLabel={cat.title} sizes="56px" />
                  </span>
                  <span className={styles.categoryName}>{cat.title}</span>
                  <span className={styles.count}>
                    {cat.productCount}
                    <span className="visually-hidden"> products</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.media} aria-hidden="true">
        <div className={styles.mediaInner} data-media>
          {categories.map((cat, i) => (
            <div key={cat.handle} className={styles.layer} data-active={preview === i}>
              <Image
                src={cat.menuImage.src}
                alt=""
                fill
                sizes="50vw"
                className={styles.layerImage}
                style={cat.menuFocus ? { objectPosition: cat.menuFocus } : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer} data-fade>
        <nav aria-label="Main">
          <ul className={styles.primary}>
            {site.primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.primaryLink} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.contact}>
          <a href={site.contact.phoneHref}>{site.contact.phone}</a>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </div>
      </div>
    </div>
    </>
  );
}
