"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, renderIcon } from "./amenities-primitives";
import type { AmenitiesContent } from "@/lib/amenities-content";

interface ConvenienceSectionProps {
  convenience: AmenitiesContent["convenience"];
}

export function ConvenienceSection({ convenience }: ConvenienceSectionProps) {
  return (
    <section className="border-t border-[#111111]/8 bg-[#F8F6F2] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-6xl">
        <MotionReveal y={24} className="mb-16 md:mb-20">
          <EditorialLabel>{convenience.label}</EditorialLabel>
          <h2 className="mb-6 max-w-xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl">
            {convenience.headline}
          </h2>
          <p className="max-w-lg text-base font-light leading-relaxed text-[#4A4A4A]">
            {convenience.description}
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {convenience.features.map((feature, idx) => (
            <MotionReveal
              key={feature.title}
              y={20}
              delay={idx * 0.04}
              className="flex gap-5 border-l border-[#C6A46A]/30 pl-6"
            >
              <div className="mt-0.5 shrink-0">
                {renderIcon(
                  feature.icon,
                  "h-5 w-5 stroke-[1.25] text-[#C6A46A]",
                )}
              </div>
              <div>
                <h3 className="mb-2 text-xs font-semibold tracking-[0.18em] text-[#111111]">
                  {feature.title.toUpperCase()}
                </h3>
                <p className="text-sm font-light leading-relaxed text-[#4A4A4A]">
                  {feature.description}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
