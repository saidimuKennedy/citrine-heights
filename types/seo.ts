import type { Image, URLString } from "./common";

/** Robots meta directives controlling crawler behaviour. */
export type RobotsDirective =
  | "index"
  | "noindex"
  | "follow"
  | "nofollow"
  | "noarchive"
  | "nosnippet"
  | "noimageindex";

/** Open Graph metadata for rich social sharing previews. */
export interface OpenGraph {
  /** Falls back to the page `title` when omitted. */
  title?: string;
  /** Falls back to the page `description` when omitted. */
  description?: string;
  /** Share image (1200×630 recommended). */
  image: Image;
  type?: "website" | "article" | "profile";
  siteName?: string;
}

/** Twitter/X card metadata. */
export interface TwitterCard {
  card?: "summary" | "summary_large_image";
  site?: string;
  image?: Image;
}

/**
 * Search-engine and social metadata for a page or development.
 * Maps cleanly onto Next.js `Metadata` but stays framework-agnostic.
 */
export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
  /** Canonical URL to de-duplicate indexed content. */
  canonicalUrl?: URLString;
  openGraph?: OpenGraph;
  twitter?: TwitterCard;
  /** Robots directives; omit to fall back to platform defaults. */
  robots?: RobotsDirective[];
}
