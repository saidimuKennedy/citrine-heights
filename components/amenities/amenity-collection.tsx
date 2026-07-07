"use client";

import Image from "next/image";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./amenities-primitives";
import type { AmenitiesContent } from "@/lib/amenities-content";

interface AmenityCollectionProps {
  collection: AmenitiesContent["collection"];
}

export function AmenityCollection({ collection }: AmenityCollectionProps) {
  return (
    <section className="bg-[#F8F6F2] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-16 md:mb-24">
          <EditorialLabel>{collection.label}</EditorialLabel>
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
            {collection.headline}
          </h2>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[minmax(200px,auto)]">
          {collection.items.map((item, idx) => {
            const isWide = idx % 3 === 0;
            const span = isWide ? "md:col-span-8" : "md:col-span-4";

            return (
              <MotionReveal
                key={item.title}
                y={28}
                delay={idx * 0.05}
                className={`group relative overflow-hidden ${span}`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    isWide ? "aspect-[16/9] md:min-h-[360px]" : "aspect-[3/4] md:min-h-[360px]"
                  }`}
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className={`object-cover ${IMAGE_HOVER_CLASS}`}
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/25 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3
                    className={`mb-3 font-serif font-light text-[#F8F6F2] ${
                      isWide ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="max-w-lg text-sm font-light leading-relaxed text-white/65 md:text-base">
                    {item.narrative}
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
