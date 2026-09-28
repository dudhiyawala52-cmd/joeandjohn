"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Keeps Tab focus inside `container` while `active`, and focuses `initial` on activation. */
export function useFocusTrap(
  container: RefObject<HTMLElement | null>,
  active: boolean,
  initial?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const el = container.current;
    if (!active || !el) return;
    const t = window.setTimeout(() => (initial?.current ?? el.querySelector<HTMLElement>(FOCUSABLE))?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = [...el.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    el.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      el.removeEventListener("keydown", onKey);
    };
  }, [container, active, initial]);
}
