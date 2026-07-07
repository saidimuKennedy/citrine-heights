"use client";

import Image from "next/image";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./amenities-primitives";
import type { AmenitiesContent } from "@/lib/amenities-content";

interface SocialSpacesProps {
  socialSpaces: AmenitiesContent["socialSpaces"];
}

export function SocialSpaces({ socialSpaces }: SocialSpacesProps) {
  return (
    <section className="bg-[#F8F6F2] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-12 md:mb-20">
          <EditorialLabel>{socialSpaces.label}</EditorialLabel>
          <h2 className="mb-10 font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
            {socialSpaces.headline}
          </h2>
          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-[#111111]/10 pt-8">
            {socialSpaces.pillars.map((pillar) => (
              <span
                key={pillar}
                className="font-serif text-xl font-light text-[#C6A46A] md:text-2xl"
              >
                {pillar}
              </span>
            ))}
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {socialSpaces.spaces.map((space, idx) => (
            <MotionReveal
              key={space.title}
              y={28}
              delay={idx * 0.06}
              className={`group relative overflow-hidden ${
                idx === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  idx === 0 ? "aspect-[4/3] md:aspect-auto md:h-full md:min-h-[520px]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={space.image.src}
                  alt={space.image.alt}
                  fill
                  className={`object-cover ${IMAGE_HOVER_CLASS}`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="mb-3 font-serif text-xl font-light text-[#F8F6F2] md:text-2xl">
                  {space.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-white/65 md:text-base">
                  {space.narrative}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
