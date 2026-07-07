import type { HexColor } from "./common";

/** Per-development colour tokens driving the visual identity. */
export interface ColorPalette {
  primary: HexColor;
  secondary: HexColor;
  accent: HexColor;
  /** Elevated surfaces such as cards and panels. */
  surface: HexColor;
  /** Page background. */
  background: HexColor;
  /** Optional default text colour paired with `background`. */
  foreground?: HexColor;
  /** Optional muted tone for secondary text, borders and dividers. */
  muted?: HexColor;
}

/** Font families composing the type system. */
export interface Typography {
  /** Font family for headings. */
  headingFont: string;
  /** Font family for body copy. */
  bodyFont: string;
  /** Optional display/accent font for hero titles or pull quotes. */
  displayFont?: string;
}

/** Global corner-rounding scale applied across the UI. */
export type BorderRadiusScale = "none" | "sm" | "md" | "lg" | "xl" | "full";

/** The complete visual theme for a single development. */
export interface Theme {
  colors: ColorPalette;
  typography: Typography;
  /** Global border-radius token; defaults to the platform baseline. */
  borderRadius?: BorderRadiusScale;
}
