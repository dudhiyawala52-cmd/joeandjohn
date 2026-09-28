"use client";

import { Fragment, useEffect, useRef } from "react";
import type { IntroContent } from "@/content/types";
import styles from "./IntroSection.module.css";

/** Viewport % the section top must reach before the reveal starts. */
const START = 90;
/** Opacity of characters that have not been revealed yet. */
const DIM = 0.2;

/**
 * Introduction under the hero. The statement is revealed character by character
 * (modelled on Framer's "Text Reveal Scroll" helper). The reveal starts as the
 * section enters the viewport and completes when the section's centre reaches
 * the centre of the screen.
 */
export function IntroSection({ intro }: { intro: IntroContent }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const chars = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-char]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((c) => (c.style.opacity = "1"));
      return;
    }

    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      if (!visible) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const startTop = (vh * START) / 100;
      const endTop = vh / 2 - rect.height / 2; // section centre on screen centre
      const progress = Math.min(Math.max((startTop - rect.top) / (startTop - endTop), 0), 1);
      const exact = progress * chars.length;
      const count = Math.floor(exact);
      for (let i = 0; i < chars.length; i++) {
        const o = i < count ? 1 : i === count ? DIM + (exact - count) * (1 - DIM) : DIM;
        chars[i].style.opacity = String(o);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const words = intro.statement.split(" ");

  return (
    <section ref={section} className={styles.section} aria-label="About Joe & Jone">
      <div className={styles.container}>
        <p className="visually-hidden">{intro.statement}</p>
        <p className={styles.statement} aria-hidden="true">
          {words.map((word, w) => (
            <Fragment key={w}>
              <span className={styles.word}>
                {Array.from(word).map((ch, c) => (
                  <span key={c} data-char style={{ opacity: DIM }}>
                    {ch}
                  </span>
                ))}
              </span>
              {w < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
