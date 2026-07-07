import type { Identifiable, LiteralUnion } from "./common";

/** Well-known amenity groupings; open to bespoke categories per development. */
export type AmenityCategory = LiteralUnion<
  | "recreation"
  | "wellness"
  | "security"
  | "convenience"
  | "connectivity"
  | "outdoor"
  | "family"
  | "sustainability"
>;

export interface Amenity extends Identifiable {
  title: string;
  description: string;
  /**
   * Icon identifier resolved by the UI's icon registry, e.g. `"pool"`,
   * `"gym"`, `"security"`. Decouples content from any specific icon library.
   */
  icon: string;
  category: AmenityCategory;
  /** Highlighted in "key amenities" summaries. */
  featured?: boolean;
}
