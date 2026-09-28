"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteSettings } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import styles from "./SiteHeader.module.css";

type Props = {
  site: SiteSettings;
  hidden: boolean;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
};

export function SiteHeader({ site, hidden, onOpenMenu, onOpenSearch }: Props) {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // Transparent only at the very top; any scroll switches to the frosted bar.
      setOverHero(window.scrollY < 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={styles.header}
      data-over-hero={overHero}
      data-tucked={hidden}
      aria-hidden={hidden || undefined}
      inert={hidden}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className={styles.bar}>
        <button type="button" className={styles.menuButton} onClick={onOpenMenu} aria-haspopup="dialog">
          <Icon name="menu" />
          <span>Menu</span>
        </button>

        <Link href="/" className={styles.logo} aria-label={`${site.name}, home`}>
          <Image
            className={styles.logoOnDark}
            src={site.logo.onDark.src}
            alt=""
            width={site.logo.onDark.width}
            height={site.logo.onDark.height}
            priority
          />
          <Image
            className={styles.logoOnLight}
            src={site.logo.onLight.src}
            alt=""
            width={site.logo.onLight.width}
            height={site.logo.onLight.height}
            priority
          />
        </Link>

        <div className={styles.actions}>
          <button type="button" className={styles.iconButton} onClick={onOpenSearch} aria-haspopup="dialog">
            <Icon name="search" />
            <span className={styles.actionLabel}>Search</span>
          </button>
          <Link href={site.enquiry.href} className={styles.enquiry}>
            <Icon name="enquiry" className={styles.enquiryIcon} />
            <span className={styles.enquiryLabel}>{site.enquiry.label}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
