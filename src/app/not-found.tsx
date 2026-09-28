import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/content";

/**
 * Every link on the homepage points at its real future route. Until those
 * pages are built, visitors land here instead of a bare 404.
 */
export default async function NotFound() {
  const site = await getSiteSettings();
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "2rem var(--gutter)",
        background: "var(--basin)",
        textAlign: "center",
      }}
    >
      <div style={{ display: "grid", gap: "1.5rem", justifyItems: "center", maxWidth: "34rem" }}>
        <Image src={site.logo.onLight.src} alt={site.name} width={180} height={38} style={{ height: "auto" }} />
        <h1>
          This page is coming in the next phase
        </h1>
        <p style={{ color: "var(--steel)", fontSize: "var(--p-lg)" }}>
          The homepage is ready for review. Product, enquiry and information pages will be built once it is approved.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: 48,
            padding: "0 1.5rem",
            borderRadius: 999,
            background: "var(--black)",
            color: "var(--white)",
            fontWeight: 500,
          }}
        >
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
