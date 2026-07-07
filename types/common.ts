/**
 * Shared primitive types and value objects used across every domain model.
 *
 * This module has **no internal dependencies** — every other type file may
 * import from here, but this file imports from nothing. That keeps the
 * dependency graph acyclic and makes these primitives safe to reuse anywhere.
 */

/** Stable, opaque unique identifier (UUID, nanoid, or CMS record id). */
export type ID = string;

/** URL-safe slug, e.g. `"citrine-heights"`. */
export type Slug = string;

/** Absolute or root-relative URL string, e.g. `"/projects/hero.jpg"`. */
export type URLString = string;

/** ISO-8601 date/time string, e.g. `"2027-06-01"`. */
export type ISODateString = string;

/** Hex colour token, e.g. `"#0F172A"`. */
export type HexColor = string;

/** ISO-4217 currency code. Known values autocomplete; any string is accepted. */
export type CurrencyCode = LiteralUnion<"KES" | "USD" | "EUR" | "GBP">;

/**
 * Allows a set of known string literals (for editor autocomplete) while still
 * accepting any other string. Ideal for open-ended CMS taxonomies such as
 * gallery or amenity categories that vary per development.
 */
export type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

/** Anything persisted as a collection item carries a stable id. */
export interface Identifiable {
  id: ID;
}

/**
 * A raster image with the metadata needed for accessible, layout-stable
 * rendering. `alt` is required so images are never shipped without alt text.
 */
export interface Image {
  src: URLString;
  /** Accessible alternative text. Required — never optional. */
  alt: string;
  /** Intrinsic width in pixels, used to reserve layout space. */
  width?: number;
  /** Intrinsic height in pixels, used to reserve layout space. */
  height?: number;
  /** Low-quality placeholder (base64) shown while the image loads. */
  blurDataURL?: string;
}

/** A video asset with an optional poster frame for the paused/loading state. */
export interface Video {
  src: URLString;
  /** Poster image displayed before playback and as a fallback. */
  poster?: Image;
  /** MIME type, e.g. `"video/mp4"`. */
  mimeType?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

/**
 * Discriminated union expressing "an image **or** a video, never both".
 * Narrow on `type` to access the correct payload.
 */
export type Media = ImageMedia | VideoMedia;

export interface ImageMedia {
  type: "image";
  image: Image;
}

export interface VideoMedia {
  type: "video";
  video: Video;
}

/** Visual intent for a call-to-action button. */
export type CTAVariant = "primary" | "secondary" | "outline" | "ghost";

/** A call-to-action link/button. */
export interface CallToAction {
  label: string;
  href: URLString;
  variant?: CTAVariant;
  /** Opens in a new tab and applies `rel="noopener"` semantics. */
  external?: boolean;
}

/** Geographic point in decimal degrees (WGS-84). */
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

/** A monetary amount tied to a currency. */
export interface Price {
  amount: number;
  currency: CurrencyCode;
  /** When true, the amount represents a starting/"from" price. */
  from?: boolean;
  /**
   * Optional display override for non-numeric cases, e.g.
   * `"Price on request"`. When set, UIs should prefer this over `amount`.
   */
  display?: string;
}

/** Unit of floor/land area. */
export type AreaUnit = "sqft" | "sqm" | "acres";

/** A measured area, e.g. `{ value: 1200, unit: "sqft" }`. */
export interface Area {
  value: number;
  unit: AreaUnit;
}
