"use client";

import { useMemo, useState } from "react";
import type { GalleryItem } from "@/types";
import {
  GALLERY_CHAPTERS,
  filterGalleryItems,
  getFeaturedItem,
  getNightDividerImage,
  itemsForChapter,
  withMasonrySpans,
  type GalleryFilter,
} from "@/lib/gallery-content";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { GalleryHero } from "./gallery-hero";
import { GalleryCategoryNav } from "./gallery-category-nav";
import { GalleryFeatured } from "./gallery-featured";
import { GalleryChapters } from "./gallery-chapters";
import { GalleryMasonry } from "./gallery-masonry";
import { GalleryDivider } from "./gallery-divider";
import { GalleryCTA } from "./gallery-cta";
import { GalleryLightbox } from "./gallery-lightbox";

interface GalleryExperienceProps {
  items: GalleryItem[];
  projectSlug: string;
  projectName: string;
}

export function GalleryExperience({
  items,
  projectSlug,
  projectName,
}: GalleryExperienceProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const featuredItem = useMemo(
    () => getFeaturedItem(items, activeFilter),
    [activeFilter, items],
  );
  const dividerItem = useMemo(
    () => getNightDividerImage(items) ?? featuredItem,
    [featuredItem, items],
  );

  const filteredItems = useMemo(
    () => filterGalleryItems(items, activeFilter),
    [activeFilter, items],
  );

  const masonryItems = useMemo(
    () => withMasonrySpans(filteredItems),
    [filteredItems],
  );

  const lightboxItems = useMemo(() => items, [items]);

  const indexById = useMemo(
    () => new Map(lightboxItems.map((item, index) => [item.id, index])),
    [lightboxItems],
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getLightboxIndex = (itemId: string) => indexById.get(itemId) ?? 0;

  const heroImage =
    items.find((item) => item.id === "gh-001")?.image ??
    featuredItem.image;

  return (
    <SmoothScroll>
      <div className="bg-[#0E0E10] text-[#F7F4EF] selection:bg-[#C8A46B] selection:text-[#0E0E10]">
        <GalleryHero
          backgroundSrc={heroImage.src}
          backgroundAlt={heroImage.alt || `${projectName} gallery`}
        />

        <GalleryCategoryNav
          active={activeFilter}
          onChange={setActiveFilter}
        />

        <GalleryFeatured
          key={featuredItem.id}
          item={featuredItem}
          lightboxIndex={getLightboxIndex(featuredItem.id)}
          onOpen={openLightbox}
        />

        {activeFilter === "all" && (
          <GalleryChapters
            chapters={GALLERY_CHAPTERS}
            getChapterItems={(chapter) => itemsForChapter(items, chapter, 2)}
            getLightboxIndex={getLightboxIndex}
            onOpen={openLightbox}
          />
        )}

        <GalleryMasonry
          items={masonryItems}
          getLightboxIndex={getLightboxIndex}
          onOpen={openLightbox}
        />

        <GalleryDivider item={dividerItem} />

        <GalleryCTA projectSlug={projectSlug} />

        <GalleryLightbox
          items={lightboxItems}
          index={lightboxIndex}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={setLightboxIndex}
        />
      </div>
    </SmoothScroll>
  );
}
