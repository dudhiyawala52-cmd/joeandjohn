"use client";

import { useId } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import styles from "./ProductVisual.module.css";

type Props = {
  image: ImageAsset | null;
  /** Used for the illustration's accessible name when no photo exists. */
  fallbackLabel: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Show the "photography to follow" note under illustrations. */
  showNote?: boolean;
};

/**
 * Renders a product cut-out on whatever surface it sits on. Supplier photos
 * are shot on white, so they are multiplied into the surface colour. When a
 * category has no photography yet, a clearly labelled illustration stands in.
 */
export function ProductVisual({ image, fallbackLabel, sizes, priority, className, showNote }: Props) {
  if (image) {
    return (
      <Image
        className={`${styles.photo} ${className ?? ""}`}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
      />
    );
  }
  return (
    <figure className={`${styles.figure} ${className ?? ""}`}>
      <HandDryerIllustration label={`${fallbackLabel} (illustration)`} />
      {showNote ? <figcaption className={styles.note}>Illustration. Product photography to follow.</figcaption> : null}
    </figure>
  );
}

function HandDryerIllustration({ label }: { label: string }) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${name}-${uid}`;
  return (
    <svg className={styles.illustration} viewBox="0 0 400 400" role="img" aria-label={label}>
      <defs>
        <linearGradient id={id("hd-body")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#c3c9ca" />
          <stop offset="0.28" stopColor="#f4f5f4" />
          <stop offset="0.55" stopColor="#d9dddc" />
          <stop offset="1" stopColor="#a9b1b3" />
        </linearGradient>
        <linearGradient id={id("hd-face")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("hd-slot")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2b3134" />
          <stop offset="1" stopColor="#4b5357" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="352" rx="92" ry="9" fill="#1e2427" opacity="0.12" />
      <rect x="112" y="58" width="176" height="262" rx="40" fill={`url(#${id("hd-body")})`} />
      <rect x="122" y="68" width="156" height="120" rx="32" fill={`url(#${id("hd-face")})`} />
      <path d="M122 290 Q200 312 278 290 L278 300 Q200 324 122 300 Z" fill={`url(#${id("hd-slot")})`} />
      <rect x="176" y="238" width="48" height="11" rx="5.5" fill="#23292c" />
      <circle cx="200" cy="222" r="3.2" fill="#f4b64c" />
      <rect x="286" y="140" width="5" height="34" rx="2.5" fill="#8d9598" />
    </svg>
  );
}
