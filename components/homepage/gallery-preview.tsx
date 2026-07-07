"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { EditorialLabel, SectionHeading } from "./homepage-primitives";
import type { HomepageContent } from "@/lib/homepage-content";
import type { GalleryItem } from "@/types/gallery";

interface GalleryPreviewProps {
  gallery: HomepageContent["gallery"];
  images: GalleryItem[];
}

export function GalleryPreview({ gallery, images }: GalleryPreviewProps) {
  const featured = images.slice(0, 6);

  return (
    <section
      id="gallery"
      className="bg-[#111111] px-6 py-28 text-[#F7F4EF] md:px-16 md:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal
          y={24}
          className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end"
        >
          <div>
            <EditorialLabel>{gallery.label.toUpperCase()}</EditorialLabel>
            <SectionHeading light>{gallery.headline}</SectionHeading>
          </div>
          <Link
            href={gallery.cta.href}
            className="shrink-0 border-b border-[#C6A46A]/50 pb-1 text-[10px] font-semibold tracking-[0.25em] text-[#C6A46A] transition-colors duration-500 hover:border-[#C6A46A] md:text-[11px]"
          >
            {gallery.cta.label.toUpperCase()} →
          </Link>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {featured.map((item, idx) => {
            const layout =
              idx === 0
                ? "md:col-span-7 md:row-span-2 md:min-h-[640px]"
                : idx === 1
                  ? "md:col-span-5 md:min-h-[310px]"
                  : idx === 2
                    ? "md:col-span-5 md:min-h-[310px]"
                    : "md:col-span-4 md:min-h-[280px]";

            return (
              <MotionReveal
                key={item.id}
                y={24}
                delay={0.05 * idx}
                className={`group relative aspect-[4/3] overflow-hidden ${layout}`}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className={`object-cover brightness-[0.9] ${IMAGE_HOVER_CLASS}`}
                  sizes={
                    idx === 0
                      ? "(max-width: 768px) 100vw, 58vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/75 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-6 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-[#F7F4EF]">
                    {item.title.toUpperCase()}
                  </p>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
