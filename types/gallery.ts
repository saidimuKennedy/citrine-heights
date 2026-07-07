import type { Identifiable, Image, LiteralUnion } from "./common";

/**
 * Well-known gallery groupings. The union autocompletes common categories
 * while still accepting bespoke ones per development.
 */
export type GalleryCategory = LiteralUnion<
  | "exterior"
  | "interior"
  | "amenities"
  | "views"
  | "construction"
  | "lifestyle"
  | "floor-plans"
>;

/**
 * A single gallery entry. Alt text is provided by {@link Image.alt}, so it is
 * never duplicated at this level.
 */
export interface GalleryItem extends Identifiable {
  image: Image;
  title: string;
  description?: string;
  category: GalleryCategory;
  /** Surfaced in featured grids, sliders and previews. */
  featured?: boolean;
}
