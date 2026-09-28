import type { SiteSettings } from "../types";

export const site: SiteSettings = {
  name: "Joe & Jone",
  tagline: "We deal in water conservation",
  intro: {
    statement:
      "Joe & Jone makes washroom products that respond to presence, not pressure. Sensor taps, soap dispensers, hand dryers and flush controls that use only the water and energy each visit needs, with fewer shared surfaces to touch.",
  },
  logo: {
    onDark: { src: "/brand/logo-light.webp", alt: "Joe & Jone", width: 800, height: 169 },
    onLight: { src: "/brand/logo-dark.webp", alt: "Joe & Jone", width: 801, height: 171 },
  },
  contact: {
    company: "Joe & Jone UK Limited",
    phone: "+44 (0) 207 689 7666",
    phoneHref: "tel:+442076897666",
    email: "info@joeandjone.co.uk",
  },
  primaryNav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
    { label: "Product enquiry", href: "/enquiry" },
  ],
  secondaryNav: [
    { label: "Sustainability", href: "/sustainability" },
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Terms & conditions", href: "/terms" },
    { label: "Sitemap", href: "/sitemap" },
  ],
  enquiry: { label: "Product enquiry", href: "/enquiry" },
};
