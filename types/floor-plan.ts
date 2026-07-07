import type { Area, Identifiable, Image, Price, URLString } from "./common";

/**
 * A purchasable unit type / floor plan within a development.
 *
 * `price` and `pdfUrl` are optional because pricing may be on request and not
 * every plan ships with a downloadable document.
 */
export interface FloorPlan extends Identifiable {
  /** Unit or model name, e.g. `"2 Bedroom Deluxe"`. */
  name: string;
  bedrooms: number;
  bathrooms: number;
  /** Internal/built-up area of the unit. */
  size: Area;
  price?: Price;
  /** Rendered plan graphic. */
  image: Image;
  /** Downloadable floor-plan / brochure PDF. */
  pdfUrl?: URLString;
  /** Whether units of this type are currently available. */
  available?: boolean;
}
