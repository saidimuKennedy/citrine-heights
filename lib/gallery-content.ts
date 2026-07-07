import type { GalleryCategory, GalleryItem } from "@/types";

export type GalleryFilter =
  | "all"
  | "exterior"
  | "interior"
  | "amenities"
  | "lifestyle"
  | "views"
  | "construction";

export const GALLERY_FILTERS: { id: GalleryFilter; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "exterior", label: "EXTERIORS" },
  { id: "interior", label: "INTERIORS" },
  { id: "amenities", label: "AMENITIES" },
  { id: "lifestyle", label: "LIFESTYLE" },
  { id: "views", label: "VIEWS" },
  { id: "construction", label: "CONSTRUCTION" },
];

export const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  exterior: "Exteriors",
  interior: "Interiors",
  amenities: "Amenities",
  lifestyle: "Lifestyle",
  views: "Views",
  construction: "Construction",
  "floor-plans": "Floor Plans",
};

export interface GalleryChapter {
  id: string;
  label: string;
  headline: string;
  categories: GalleryCategory[];
}

export const GALLERY_CHAPTERS: GalleryChapter[] = [
  {
    id: "architecture",
    label: "Architecture",
    headline: "Crafted To Inspire.",
    categories: ["exterior", "construction"],
  },
  {
    id: "residences",
    label: "Residences",
    headline: "Designed For Everyday Luxury.",
    categories: ["interior"],
  },
  {
    id: "amenities",
    label: "Amenities",
    headline: "Curated For Modern Living.",
    categories: ["amenities"],
  },
  {
    id: "views",
    label: "Views",
    headline: "Above The City.",
    categories: ["views"],
  },
  {
    id: "night",
    label: "Night",
    headline: "The Skyline Never Sleeps.",
    categories: ["lifestyle", "exterior"],
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    headline: "Live The Extraordinary.",
    categories: ["lifestyle", "interior", "amenities"],
  },
];

/** Masonry span presets for editorial rhythm. */
export type MasonrySpan = "tall" | "medium" | "wide" | "standard";

export interface MasonryGalleryItem extends GalleryItem {
  span: MasonrySpan;
}

const SPAN_CYCLE: MasonrySpan[] = [
  "tall",
  "standard",
  "medium",
  "wide",
  "standard",
  "tall",
  "medium",
  "standard",
];

export function withMasonrySpans(items: GalleryItem[]): MasonryGalleryItem[] {
  return items.map((item, index) => ({
    ...item,
    span: SPAN_CYCLE[index % SPAN_CYCLE.length],
  }));
}

export function filterGalleryItems(
  items: GalleryItem[],
  filter: GalleryFilter,
): GalleryItem[] {
  if (filter === "all") return items;
  return items.filter((item) => item.category === filter);
}

export function itemsForChapter(
  items: GalleryItem[],
  chapter: GalleryChapter,
  limit = 2,
): GalleryItem[] {
  return items
    .filter((item) => chapter.categories.includes(item.category))
    .slice(0, limit);
}

export function getFeaturedItem(
  items: GalleryItem[],
  filter: GalleryFilter = "all",
): GalleryItem {
  const scoped = filterGalleryItems(items, filter);
  if (scoped.length === 0) {
    return items[0];
  }
  return scoped.find((item) => item.featured) ?? scoped[0];
}

export function getNightDividerImage(items: GalleryItem[]): GalleryItem | undefined {
  return (
    items.find((item) => item.id === "gh-026") ??
    items.find((item) => item.category === "lifestyle")
  );
}
