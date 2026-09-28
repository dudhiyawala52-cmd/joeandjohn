"use client";

import Image from "next/image";
import Link from "next/link";
import type { Ref } from "react";
import type { SiteSettings } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import headerStyles from "./SiteHeader.module.css";
import styles from "./OverlayBar.module.css";

type Props = {
  site: SiteSettings;
  /** Which overlay is open. Its trigger slot turns into Close; the other slot switches overlays. */
  mode: "menu" | "search";
  onClose: () => void;
  onSwitch: () => void;
  closeRef?: Ref<HTMLButtonElement>;
};

/**
 * Top bar shared by the menu and search overlays. It reuses the site header's
 * layout and styles, so opening either overlay never moves anything: Close
 * appears exactly where MENU or Search was clicked.
 */
export function OverlayBar({ site, mode, onClose, onSwitch, closeRef }: Props) {
  return (
    <div className={styles.bar}>
      <div className={headerStyles.bar}>
        {mode === "menu" ? (
          <button ref={closeRef} type="button" className={headerStyles.menuButton} onClick={onClose} aria-label="Close menu">
            <Icon name="close" />
            <span>Close</span>
          </button>
        ) : (
          <button type="button" className={headerStyles.menuButton} onClick={onSwitch} aria-haspopup="dialog">
            <Icon name="menu" />
            <span>Menu</span>
          </button>
        )}

        <Link href="/" className={headerStyles.logo} onClick={onClose} aria-label={`${site.name}, home`}>
          <Image src={site.logo.onLight.src} alt="" width={site.logo.onLight.width} height={site.logo.onLight.height} />
        </Link>

        <div className={headerStyles.actions}>
          {mode === "search" ? (
            <button ref={closeRef} type="button" className={headerStyles.iconButton} onClick={onClose} aria-label="Close search">
              <Icon name="close" />
              <span className={headerStyles.actionLabel}>Close</span>
            </button>
          ) : (
            <button type="button" className={headerStyles.iconButton} onClick={onSwitch} aria-haspopup="dialog">
              <Icon name="search" />
              <span className={headerStyles.actionLabel}>Search</span>
            </button>
          )}
          <Link href={site.enquiry.href} className={headerStyles.enquiry} onClick={onClose}>
            <Icon name="enquiry" className={headerStyles.enquiryIcon} />
            <span className={headerStyles.enquiryLabel}>{site.enquiry.label}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
