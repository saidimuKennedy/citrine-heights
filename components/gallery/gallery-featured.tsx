"use client";

import Image from "next/image";
import type { GalleryItem } from "@/types";
import { CATEGORY_LABELS } from "@/lib/gallery-content";
import { MotionReveal } from "./motion-reveal";

interface GalleryFeaturedProps {
  item: GalleryItem;
  onOpen: (index: number) => void;
  lightboxIndex: number;
}

export function GalleryFeatured({
  item,
  onOpen,
  lightboxIndex,
}: GalleryFeaturedProps) {
  return (
    <section className="bg-[#0E0E10] px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <MotionReveal>
          <button
            type="button"
            onClick={() => onOpen(lightboxIndex)}
            className="group relative block aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]"
            aria-label={`View ${item.title}`}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              className="object-cover transition-transform duration-[8000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 1400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10]/80 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-14">
              <p className="mb-3 text-[10px] font-semibold tracking-[0.3em] text-[#C8A46B]">
                {CATEGORY_LABELS[item.category].toUpperCase()}
              </p>
              <h2 className="max-w-2xl font-serif text-3xl font-light text-[#F7F4EF] md:text-5xl">
                {item.title}
              </h2>
            </div>
          </button>
        </MotionReveal>
      </div>
    </section>
  );
}
