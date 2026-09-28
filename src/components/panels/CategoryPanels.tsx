"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import type { Category } from "@/content/types";
import { gsap, Observer, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import styles from "./CategoryPanels.module.css";

type Props = { categories: Category[] };

/**
 * Full-width category panels. Each panel is sticky, so the next one slides up
 * over it; the covered panel eases back and dims while the incoming panel's image
 * settles and its text rises into place. Scrolling snaps one full panel at a time.
 */
export function CategoryPanels({ categories }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = root.current!;
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", section);
        const count = panels.length;
        const panelHeight = () => panels[0].offsetHeight;
        const sectionTop = () => section.getBoundingClientRect().top + window.scrollY;

        // Transitions are measured from the (non-sticky) section, never from the sticky panels,
        // so their scroll positions stay correct however often ScrollTrigger re-measures.
        panels.slice(0, -1).forEach((panel, i) => {
          const next = panels[i + 1];
          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: () => `top+=${i * panelHeight()} top`,
                end: () => `top+=${(i + 1) * panelHeight()} top`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            // Outgoing panel eases back and dims.
            .fromTo(panel.querySelector("[data-stage]"), { scale: 1 }, { scale: 0.92, ease: "none" }, 0)
            .fromTo(panel.querySelector("[data-shade]"), { opacity: 0 }, { opacity: 0.45, ease: "none" }, 0)
            // Incoming panel: image settles from a slight zoom, text rises in over the second half.
            .fromTo(next.querySelector("[data-media]"), { scale: 1.12 }, { scale: 1, ease: "none" }, 0)
            .fromTo(
              next.querySelectorAll("[data-rise]"),
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, ease: "power2.out", stagger: 0.08, duration: 0.5 },
              0.45,
            );
        });

        // Paging: inside the section one wheel, trackpad, swipe or key press glides exactly one
        // panel and the gesture itself never scrolls the page. Past either end, scrolling is normal.
        const pageTop = (index: number) => sectionTop() + index * panelHeight();
        const currentIndex = () =>
          gsap.utils.clamp(0, count - 1, Math.round((window.scrollY - sectionTop()) / panelHeight()));
        let animating = false;

        const glideTo = (index: number) => {
          animating = true;
          gsap.to(window, {
            scrollTo: { y: pageTop(index), autoKill: false },
            duration: 1,
            ease: "power3.inOut",
            // Cooldown absorbs trackpad momentum so one flick never skips a panel.
            onComplete: () => void gsap.delayedCall(0.6, () => (animating = false)),
          });
        };

        const release = () => {
          observer.disable();
          window.removeEventListener("keydown", onKey);
        };

        const step = (dir: 1 | -1) => {
          if (animating) return;
          const y = window.scrollY;
          // Arriving from the intro above: settle onto the first panel.
          if (dir === 1 && y < pageTop(0) - 2) return glideTo(0);
          // Leaving upwards from the first panel: hand scrolling back to the page.
          if (dir === -1 && y <= pageTop(0) + 2) return release();
          const next = currentIndex() + dir;
          if (next > count - 1) {
            // Leaving downwards past the last panel: hand back and nudge just past the section.
            release();
            window.scrollTo({ top: pageTop(count - 1) + 2 });
            return;
          }
          glideTo(Math.max(0, next));
        };

        const onKey = (e: KeyboardEvent) => {
          const target = e.target as HTMLElement | null;
          if (target?.closest("input, textarea, [contenteditable=true]")) return;
          if (["ArrowDown", "PageDown", " "].includes(e.key)) {
            e.preventDefault();
            step(1);
          } else if (["ArrowUp", "PageUp"].includes(e.key)) {
            e.preventDefault();
            step(-1);
          }
        };

        const observer = Observer.create({
          target: window,
          type: "wheel,touch",
          wheelSpeed: -1,
          tolerance: 12,
          preventDefault: true,
          onUp: () => step(1),
          onDown: () => step(-1),
        });
        observer.disable();

        const engage = () => {
          if (observer.isEnabled) return;
          observer.enable();
          window.addEventListener("keydown", onKey);
        };

        // Active from the moment the first panel starts to appear until the last panel fills the screen.
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom bottom",
          onToggle: (self) => (self.isActive ? engage() : release()),
          // After releasing at the top, scrolling back down re-engages paging.
          onUpdate: (self) => {
            if (self.isActive && self.direction === 1 && !animating) engage();
          },
        });
        ScrollTrigger.refresh();

        return () => {
          release();
          observer.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Panel videos play only while their panel is on screen, and never for reduced-motion visitors.
  useEffect(() => {
    const videos = Array.from(root.current?.querySelectorAll<HTMLVideoElement>("video[data-panel-video]") ?? []);
    if (!videos.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) video.play().catch(() => undefined);
          else video.pause();
        }),
      { threshold: 0.2 },
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} id="products" className={styles.section} aria-labelledby="panels-title">
      <h2 id="panels-title" className="visually-hidden">
        Product categories
      </h2>
      {categories.map((cat, i) => (
        <article
          key={cat.handle}
          className={styles.panel}
          data-panel
          data-tone={cat.panelVideo ? "dark" : "light"}
          aria-labelledby={`panel-${cat.handle}`}
        >
          <div className={styles.stage} data-stage>
            <div className={styles.media} data-media>
              {cat.panelVideo ? (
                <video
                  className={styles.video}
                  src={cat.panelVideo.src}
                  poster={cat.panelVideo.poster.src}
                  data-panel-video
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={cat.panelVideo.description}
                />
              ) : (
                <>
                  <Image
                    className={styles.landscape}
                    src={cat.panelImage.src}
                    alt={cat.panelImage.alt}
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    style={cat.panelFocus ? { objectPosition: cat.panelFocus } : undefined}
                  />
                  <Image
                    className={styles.portrait}
                    src={(cat.panelPortraitImage ?? cat.menuImage).src}
                    alt=""
                    fill
                    sizes="100vw"
                    style={cat.panelMobileFocus ? { objectPosition: cat.panelMobileFocus } : undefined}
                  />
                </>
              )}
            </div>

            <div className={styles.content}>
              {/* Bottom left: title, description, then the link to the range. */}
              <div className={styles.foot} data-rise>
                <h3 id={`panel-${cat.handle}`} className={styles.title}>
                  {(cat.panelTitleLines ?? [cat.title]).map((line, n) => (
                    <Fragment key={line}>
                      {n > 0 ? " " : null}
                      <span className={styles.titleLine}>{line}</span>
                    </Fragment>
                  ))}
                </h3>
                {cat.heroImage === null ? <p className={styles.note}>Illustration. Product photography to follow.</p> : null}
                <p className={styles.summary}>{cat.summary}</p>
                <Link href={cat.href} className={styles.cta}>
                  View all {cat.productCount} products
                  <Icon name="arrow" size={18} />
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.shade} data-shade aria-hidden="true" />
        </article>
      ))}
    </section>
  );
}
