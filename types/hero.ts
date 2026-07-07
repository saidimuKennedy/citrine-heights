import type { CallToAction, Media } from "./common";

/**
 * The above-the-fold hero for a development landing page.
 *
 * `media` is a {@link Media} discriminated union, so a hero carries an image
 * **or** a video — never both, and never neither.
 */
export interface Hero {
  title: string;
  subtitle?: string;
  /** Short evocative line, e.g. `"Elevated living in the heart of the city"`. */
  tagline?: string;
  /** Background/foreground media (image or video). */
  media: Media;
  primaryCta?: CallToAction;
  secondaryCta?: CallToAction;
}
