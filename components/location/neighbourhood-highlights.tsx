"use client";

import Image from "next/image";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { renderIcon } from "@/components/amenities/amenities-primitives";
import { EditorialLabel } from "./location-primitives";
import type { LocationContent } from "@/lib/location-content";

interface NeighbourhoodHighlightsProps {
  highlights: LocationContent["highlights"];
}

export function NeighbourhoodHighlights({
  highlights,
}: NeighbourhoodHighlightsProps) {
  return (
    <section className="bg-[#F8F6F2] px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-14 md:mb-20">
          <EditorialLabel>{highlights.label}</EditorialLabel>
          <h2 className="max-w-3xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
            {highlights.headline}
          </h2>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {highlights.items.map((item, idx) => (
            <MotionReveal
              key={`${item.destination}-${idx}`}
              y={28}
              delay={idx * 0.06}
              className={`group relative overflow-hidden bg-[#111111] ${
                item.span === 2 ? "md:col-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  item.span === 2 ? "aspect-[21/9]" : "aspect-[4/5] md:aspect-[3/4]"
                }`}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className={`object-cover brightness-[0.7] ${IMAGE_HOVER_CLASS}`}
                  sizes={
                    item.span === 2
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/95 via-[#111111]/30 to-transparent" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="mb-4">{renderIcon(item.icon, "h-8 w-8 stroke-[1.25] text-[#C6A46A]")}</div>
                <p className="mb-2 text-[10px] font-semibold tracking-[0.28em] text-[#C6A46A]">
                  {item.category.toUpperCase()}
                </p>
                <div className="mb-3 flex items-end justify-between gap-4">
                  <h3 className="font-serif text-3xl font-light text-[#F8F6F2] md:text-4xl">
                    {item.destination}
                  </h3>
                  <span className="shrink-0 font-serif text-2xl font-light text-[#C6A46A] md:text-3xl">
                    {item.travelTime}
                  </span>
                </div>
                <p className="max-w-md text-sm font-light leading-relaxed text-white/55">
                  {item.description}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
