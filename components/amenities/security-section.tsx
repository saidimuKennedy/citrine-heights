"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, renderIcon } from "./amenities-primitives";
import type { AmenitiesContent } from "@/lib/amenities-content";

interface SecuritySectionProps {
  security: AmenitiesContent["security"];
}

export function SecuritySection({ security }: SecuritySectionProps) {
  return (
    <section className="bg-[#F8F6F2] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-5xl">
        <MotionReveal y={24} className="mb-16 text-center md:mb-20">
          <EditorialLabel>{security.label}</EditorialLabel>
          <h2 className="mb-6 font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl">
            {security.headline}
          </h2>
          <p className="mx-auto max-w-lg text-base font-light leading-relaxed text-[#4A4A4A]">
            {security.description}
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {security.features.map((feature, idx) => (
            <MotionReveal
              key={feature.title}
              y={20}
              delay={idx * 0.05}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#C6A46A]/25">
                {renderIcon(feature.icon, "h-6 w-6 stroke-[1.25] text-[#C6A46A]")}
              </div>
              <h3 className="mb-2 text-xs font-semibold tracking-[0.2em] text-[#111111]">
                {feature.title.toUpperCase()}
              </h3>
              <p className="text-sm font-light leading-relaxed text-[#4A4A4A]">
                {feature.description}
              </p>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
