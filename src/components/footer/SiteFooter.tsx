import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/content/types";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ site }: { site: SiteSettings }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <Image src={site.logo.onDark.src} alt={site.name} width={site.logo.onDark.width} height={site.logo.onDark.height} className={styles.logo} />
      </div>
      <div className={styles.contact}>
        <a href={site.contact.phoneHref}>{site.contact.phone}</a>
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </div>
      <nav aria-label="Legal and site information">
        <ul className={styles.links}>
          {site.secondaryNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className={styles.legal}>
        © {new Date().getFullYear()} {site.contact.company}
      </p>
    </footer>
  );
}
