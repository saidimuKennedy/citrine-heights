"use client";

import Image from "next/image";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { EditorialLabel } from "./location-primitives";
import type { LocationContent } from "@/lib/location-content";

interface NeighbourhoodGalleryProps {
  gallery: LocationContent["gallery"];
}

export function NeighbourhoodGallery({ gallery }: NeighbourhoodGalleryProps) {
  return (
    <section className="bg-[#F8F6F2] px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-14 md:mb-20">
          <EditorialLabel>{gallery.label}</EditorialLabel>
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
            {gallery.headline}
          </h2>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {gallery.images.map((image, idx) => (
            <MotionReveal
              key={`${image.caption}-${idx}`}
              y={28}
              delay={idx * 0.05}
              className={`group relative overflow-hidden bg-[#111111] ${
                idx === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  idx === 0 ? "aspect-[16/10] sm:aspect-auto sm:min-h-[480px]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={`object-cover ${IMAGE_HOVER_CLASS}`}
                  sizes={
                    idx === 0
                      ? "(max-width: 640px) 100vw, 66vw"
                      : "(max-width: 1024px) 50vw, 33vw"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-[10px] font-semibold tracking-[0.28em] text-[#C6A46A]">
                    {image.caption.toUpperCase()}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
