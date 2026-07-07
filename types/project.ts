import type { ID, ISODateString, Media, Price, Slug } from "./common";
import type { SEO } from "./seo";
import type { Theme } from "./theme";
import type { Hero } from "./hero";
import type { GalleryItem } from "./gallery";
import type { Amenity } from "./amenity";
import type { FloorPlan } from "./floor-plan";
import type { Location } from "./location";
import type { Contact } from "./contact";
import type { FAQItem } from "./faq";

/**
 * A single headline metric, e.g. `{ label: "Completion", value: "Q4 2027" }`.
 */
export interface OverviewStat {
  label: string;
  value: string;
}

/** The introductory "about this development" section. */
export interface Overview {
  headline: string;
  /** Body copy as discrete paragraphs. */
  description: string[];
  /** Optional highlight metrics (units, completion date, floors, etc.). */
  stats?: OverviewStat[];
  /** Optional supporting image or video. */
  media?: Media;
}

/** A payment structure offered to buyers. */
export interface PaymentPlan {
  name: string;
  description?: string;
  /** Ordered terms, e.g. `["20% deposit", "80% on completion"]`. */
  terms: string[];
}

/** The investment case for the development. */
export interface Investment {
  headline?: string;
  description?: string[];
  /** Entry price for the development. */
  startingPrice?: Price;
  /** Projected return, e.g. `"8% p.a. rental yield"`. */
  expectedRoi?: string;
  paymentPlans?: PaymentPlan[];
  /** Key selling points aimed at investors. */
  highlights?: string[];
}

/** Sales lifecycle stage of a development. */
export type ProjectStatus =
  | "upcoming"
  | "selling"
  | "under-construction"
  | "completed"
  | "sold-out";

/**
 * The root domain object for a single development.
 *
 * A `Project` is fully self-contained: every page of a development website can
 * be rendered from this one object with no additional data fetching. It is
 * assembled by composing the smaller, cohesive interfaces defined across the
 * `types/` directory rather than being one monolithic shape.
 *
 * This contract is intentionally source-agnostic — whether a project is loaded
 * from a `project.json` file today or a headless CMS/database tomorrow, this
 * interface remains the stable boundary the rest of the app depends on.
 */
export interface Project {
  /** Stable unique identifier. */
  id: ID;
  /** URL slug, e.g. `"citrine-heights"`. */
  slug: Slug;
  /** Development name as shown to users. */
  name: string;
  /** Current sales lifecycle stage. */
  status?: ProjectStatus;
  /** When the content was last updated (useful for caching/sitemaps). */
  updatedAt?: ISODateString;

  // --- Composed sections ---------------------------------------------------
  seo: SEO;
  theme: Theme;
  hero: Hero;
  overview: Overview;
  /** May be empty, but the key is always present. */
  gallery: GalleryItem[];
  amenities: Amenity[];
  floorPlans: FloorPlan[];
  location: Location;
  investment?: Investment;
  faqs: FAQItem[];
  contact: Contact;
}
