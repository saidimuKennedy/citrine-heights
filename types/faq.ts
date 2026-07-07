import type { Identifiable, LiteralUnion } from "./common";

/** Well-known FAQ groupings; open to bespoke categories per development. */
export type FAQCategory = LiteralUnion<
  | "general"
  | "pricing"
  | "payment"
  | "amenities"
  | "location"
  | "legal"
  | "construction"
>;

export interface FAQItem extends Identifiable {
  question: string;
  answer: string;
  category?: FAQCategory;
  /** Sort order within the list or its category (ascending). */
  order?: number;
}
