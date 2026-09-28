"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import type { HeroSlide } from "@/content/types";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import styles from "./HeroCarousel.module.css";

const AUTOPLAY_SECONDS = 7;

/** Video slides last exactly as long as their video; everything else uses the default. */
const slideSeconds = (slide: HeroSlide) => (slide.media.kind === "video" ? slide.media.duration : AUTOPLAY_SECONDS);

type Props = { slides: HeroSlide[] };

export function HeroCarousel({ slides }: Props) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  // Autoplay is on unless the visitor prefers reduced motion.
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);
  const busy = useRef(false);
  const activeRef = useRef(0);
  const progress = useRef<gsap.core.Tween | null>(null);
  const drift = useRef<gsap.core.Tween | null>(null);

  const q = (sel: string) => root.current?.querySelectorAll<HTMLElement>(sel) ?? [];
  const slideEl = (i: number) => q(`[data-slide="${i}"]`)[0];

  // Reduced motion: start paused and swap slides without movement.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Keep the transparent header in sync with the artwork behind it.
  useEffect(() => {
    document.documentElement.dataset.heroTone = slides[active].headerTone ?? slides[active].tone;
  }, [active, slides]);

  // Stop the clock when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const onVis = () => setInView(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const startDrift = useCallback(
    (i: number) => {
      drift.current?.kill();
      if (reduced) return;
      const media = slideEl(i)?.querySelector("[data-media]");
      // Ken Burns: start at the image's natural fit, then ease slowly inwards while the slide is shown.
      if (media) drift.current = gsap.fromTo(media, { scale: 1 }, { scale: 1.08, duration: AUTOPLAY_SECONDS + 3, ease: "none" });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reduced],
  );

  const goTo = useCallback(
    (next: number, direction: 1 | -1) => {
      const current = activeRef.current;
      if (busy.current || next === current) return;
      const from = slideEl(current);
      const to = slideEl(next);
      if (!from || !to) return;
      busy.current = true;
      activeRef.current = next;
      setActive(next);

      const toMedia = to.querySelector("[data-media]");
      const fromMedia = from.querySelector("[data-media]");
      const words = to.querySelectorAll("[data-word]");
      const extras = to.querySelectorAll("[data-reveal]");

      gsap.set(to, { zIndex: 2, visibility: "visible" });
      gsap.set(from, { zIndex: 1 });

      if (reduced) {
        gsap.set(to, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });
        gsap.set([words, extras], { yPercent: 0, opacity: 1 });
        gsap.set(from, { visibility: "hidden" });
        busy.current = false;
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          gsap.set(from, { visibility: "hidden", zIndex: 0 });
          busy.current = false;
        },
      });
      tl.fromTo(
        to,
        { clipPath: direction === 1 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3 },
      )
        .fromTo(toMedia, { scale: 1, xPercent: 6 * direction }, { scale: 1, xPercent: 0, duration: 1.3 }, 0)
        .to(fromMedia, { xPercent: -10 * direction, duration: 1.3 }, 0)
        .fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "power3.out", stagger: 0.035 }, 0.55)
        .fromTo(extras, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08 }, 0.8)
        .add(() => startDrift(next), 1.1)
        .set(fromMedia, { xPercent: 0 });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reduced, startDrift],
  );

  const step = useCallback(
    (dir: 1 | -1) => goTo((activeRef.current + dir + slides.length) % slides.length, dir),
    [goTo, slides.length],
  );

  // Initial state: first slide visible, others clipped away.
  useGSAP(
    () => {
      slides.forEach((_, i) => {
        const el = slideEl(i);
        if (!el) return;
        gsap.set(el, {
          visibility: i === 0 ? "visible" : "hidden",
          zIndex: i === 0 ? 1 : 0,
          clipPath: "inset(0% 0% 0% 0%)",
        });
      });
      const first = slideEl(0);
      if (!first || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(first.querySelectorAll("[data-word]"), { yPercent: 110, duration: 1.2, ease: "power3.out", stagger: 0.04, delay: 0.25 });
      gsap.from(first.querySelectorAll("[data-reveal]"), { opacity: 0, yPercent: 40, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.6 });
      startDrift(0);
    },
    { scope: root },
  );

  // Video slides restart from the beginning each time they are shown and pause when off-screen.
  useEffect(() => {
    q("video[data-video]").forEach((node) => {
      const video = node as unknown as HTMLVideoElement;
      if (Number(video.dataset.video) === active && inView && !reduced) {
        video.currentTime = 0;
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, inView, reduced]);

  // Autoplay: the amber line under the active slide in the index is the timer.
  useEffect(() => {
    progress.current?.kill();
    const bar = root.current?.querySelector<HTMLElement>(`[data-progress="${active}"]`);
    q("[data-progress]").forEach((b) => gsap.set(b, { scaleX: 0 }));
    if (!bar) return;
    if (!playing || !inView) {
      gsap.set(bar, { scaleX: playing ? 0 : 1 });
      return;
    }
    progress.current = gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, duration: slideSeconds(slides[active]), ease: "none", onComplete: () => step(1) },
    );
    return () => {
      progress.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, playing, inView, step]);

  // Touch swipe.
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  };

  return (
    <section
      ref={root}
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Featured products"
      data-tone={slides[active].tone}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <h1 className="visually-hidden">Joe &amp; Jone touch-free washroom products</h1>

      <div className={styles.track} aria-live={playing ? "off" : "polite"}>
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={styles.slide}
            data-slide={i}
            data-tone={slide.tone}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${slide.label}`}
            aria-hidden={i !== active}
            inert={i !== active}
          >
            <div className={styles.media} data-media>
              {slide.media.kind === "photo" ? (
                <Image
                  src={slide.media.image.src}
                  alt={slide.media.image.alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className={styles.photo}
                  style={
                    {
                      "--focus": slide.media.focus ?? "50% 50%",
                      "--focus-mobile": slide.media.mobileFocus ?? slide.media.focus ?? "50% 50%",
                    } as React.CSSProperties
                  }
                />
              ) : slide.media.kind === "video" ? (
                <video
                  className={`${styles.photo} ${styles.video}`}
                  src={slide.media.src}
                  poster={slide.media.poster.src}
                  data-video={i}
                  muted
                  playsInline
                  preload="auto"
                  aria-label={slide.media.description}
                  style={
                    {
                      "--focus": slide.media.focus ?? "50% 50%",
                      "--focus-mobile": slide.media.mobileFocus ?? slide.media.focus ?? "50% 50%",
                    } as React.CSSProperties
                  }
                />
              ) : (
                <div className={styles.studio}>
                  {slide.media.items.map((item, n) => (
                    <div key={item.src} className={styles.plate} data-index={n}>
                      <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 767px) 40vw, 26vw" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className={styles.shade}
              aria-hidden="true"
              style={
                slide.shade
                  ? ({
                      "--shade-l": slide.shade.left,
                      "--shade-r": slide.shade.right,
                      ...(slide.shade.top ? { "--shade-t": slide.shade.top, "--shade-t-a": 0.65 } : {}),
                    } as React.CSSProperties)
                  : undefined
              }
            />

            <div className={styles.copy}>
              <h2 className={styles.heading}>
                {slide.heading.split(" ").map((word, w) => (
                  <Fragment key={w}>
                    <span className={styles.wordMask}>
                      <span className={styles.word} data-word>
                        {word}
                      </span>
                    </span>{" "}
                  </Fragment>
                ))}
              </h2>
              {slide.body ? (
                <p className={styles.body} data-reveal>
                  {slide.body}
                </p>
              ) : null}
              <div data-reveal>
                <Link href={slide.cta.href} className={styles.cta}>
                  {slide.cta.label}
                  <Icon name="arrow" size={18} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom right: arrows above a numbered slide index; the amber line under the current slide is its timer. */}
      <div className={styles.controls} data-tone={slides[active].indexTone ?? slides[active].tone}>
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => step(-1)} aria-label="Previous slide">
            <Icon name="arrow-left" size={18} />
          </button>
          <button type="button" className={styles.arrow} onClick={() => step(1)} aria-label="Next slide">
            <Icon name="arrow" size={18} />
          </button>
        </div>
        <ol className={styles.index} aria-label="Choose slide">
          {slides.map((slide, i) => (
            <li key={slide.id}>
              <button
                type="button"
                className={styles.indexItem}
                aria-label={`Show slide ${i + 1}: ${slide.label}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => goTo(i, i > active ? 1 : -1)}
              >
                <span className={styles.indexNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.indexLabel} aria-hidden="true">
                  {slide.label}
                </span>
                <span className={styles.bar} aria-hidden="true">
                  <span className={styles.barFill} data-progress={i} />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
