"use client";

import Image from "next/image";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./amenities-primitives";
import type { AmenitiesContent } from "@/lib/amenities-content";

interface WellnessSectionProps {
  wellness: AmenitiesContent["wellness"];
}

export function WellnessSection({ wellness }: WellnessSectionProps) {
  return (
    <section className="bg-[#111111] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-16 md:mb-20">
          <EditorialLabel>{wellness.label}</EditorialLabel>
          <h2 className="mb-6 max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-5xl lg:text-6xl">
            {wellness.headline}
          </h2>
          <p className="max-w-xl text-base font-light leading-relaxed text-white/55">
            {wellness.description}
          </p>
        </MotionReveal>

        <div className="flex flex-col gap-8 md:gap-10">
          {wellness.items.map((item, idx) => (
            <MotionReveal key={item.title} y={28} delay={idx * 0.06}>
              <div className="group relative min-h-[420px] overflow-hidden md:min-h-[520px]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className={`object-cover ${IMAGE_HOVER_CLASS}`}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/40 to-transparent" />
                <div className="absolute inset-0 flex items-end p-8 md:items-center md:p-16">
                  <div className="max-w-md md:max-w-lg">
                    <span className="mb-4 block font-serif text-6xl font-light leading-none text-[#C6A46A]/25 md:text-8xl">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-4 font-serif text-2xl font-light text-[#F8F6F2] md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-white/60 md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
