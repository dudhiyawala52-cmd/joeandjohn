/**
 * Content model for the Joe & Jone storefront.
 *
 * These types are deliberately shaped like the data that will eventually come
 * from the CMS (Builder.io: site settings, navigation, hero slides, page
 * content) and the commerce platform (Shopify: collections, products,
 * variants). Components only ever receive these types, never raw API payloads,
 * so swapping demo data for live data is confined to `src/lib/content.ts`.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Link = {
  label: string;
  href: string;
};

export type ContactDetails = {
  company: string;
  phone: string;
  phoneHref: string;
  email: string;
};

/** The introduction under the hero: one statement, revealed character by character on scroll. */
export type IntroContent = {
  statement: string;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  intro: IntroContent;
  logo: { onDark: ImageAsset; onLight: ImageAsset };
  contact: ContactDetails;
  primaryNav: Link[];
  secondaryNav: Link[];
  enquiry: Link;
};

/** A hero slide is either a full-bleed photograph or a studio composition of product cut-outs. */
export type HeroSlide = {
  id: string;
  /** Short name used by the slide picker. */
  label: string;
  heading: string;
  /** Optional supporting line under the heading. */
  body?: string;
  cta: Link;
  /** Colour of the artwork behind the text, so the header and copy can adapt. */
  tone: "dark" | "light";
  /** Colour of the artwork behind the header, when it differs from the bottom of the image. Defaults to `tone`. */
  headerTone?: "dark" | "light";
  /** Colour of the artwork behind the slide index and arrows, when it differs from the copy. Defaults to `tone`. */
  indexTone?: "dark" | "light";
  /** Deep shades of the photo's own colours (as "r g b") for the bottom-left and bottom-right corners. */
  shade?: { left: string; right: string; /** Optional shade along the top edge, behind a white header. */ top?: string };
  media:
    | {
        kind: "photo";
        image: ImageAsset;
        /** CSS object-position focal points, so a CMS editor can keep the product in frame on each device. */
        focus?: string;
        mobileFocus?: string;
      }
    | {
        kind: "video";
        /** Silent, web-optimised MP4. Plays from the start each time the slide is shown. */
        src: string;
        /** Shown before the video loads and to visitors who prefer reduced motion. */
        poster: ImageAsset;
        /** What the video shows, for screen readers. */
        description: string;
        /** Length in seconds; the slide advances when the video finishes. */
        duration: number;
        focus?: string;
        mobileFocus?: string;
      }
    | { kind: "studio"; items: ImageAsset[] };
};

export type Spec = { label: string; value: string };

export type Category = {
  /** Handle doubles as the Shopify collection handle. */
  handle: string;
  title: string;
  /** Short title used in dense lists. */
  shortTitle: string;
  summary: string;
  href: string;
  productCount: number;
  specs: Spec[];
  /** Primary visual. `null` means no photography exists yet and an illustration is shown instead. */
  heroImage: ImageAsset | null;
  /** Portrait image that fills the right-hand panel of the full-screen menu edge to edge. */
  menuImage: ImageAsset;
  /** CSS object-position for the menu image, so the product stays in view as the panel changes shape. */
  menuFocus?: string;
  /** Landscape studio image for the full-width category panels. */
  panelImage: ImageAsset;
  /** Portrait image for the category panel on phones; falls back to menuImage. */
  panelPortraitImage?: ImageAsset;
  /** CSS object-position for the landscape panel image, to keep the product clear of the text. */
  panelFocus?: string;
  /** CSS object-position for the panel image on phones, to keep the product in frame. */
  panelMobileFocus?: string;
  /**
   * Optional background video for the category panel (silent, looping). Replaces the
   * studio image and switches the panel to light text on a dark background.
   */
  panelVideo?: { src: string; poster: ImageAsset; description: string };
  /** Optional manual line breaks for the panel title; one line when omitted. */
  panelTitleLines?: string[];
  keywords: string[];
};

export type Product = {
  handle: string;
  title: string;
  sku: string;
  categoryHandle: string;
  href: string;
  image: ImageAsset | null;
  highlights: string[];
};

export type SearchResult = Product & { categoryTitle: string };
