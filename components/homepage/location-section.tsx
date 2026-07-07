"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import {
  EditorialLabel,
  SectionHeading,
  TextLink,
} from "./homepage-primitives";
import type { HomepageContent } from "@/lib/homepage-content";

interface LocationSectionProps {
  location: HomepageContent["location"];
}

export function LocationSection({ location }: LocationSectionProps) {
  return (
    <section id="location" className="bg-[#F7F4EF] text-[#111111]">
      <div className="px-6 py-28 md:px-16 md:py-40">
        <div className="mx-auto max-w-7xl">
          <MotionReveal y={24} className="mb-16 md:mb-20">
            <EditorialLabel>{location.label.toUpperCase()}</EditorialLabel>
            <SectionHeading className="mb-8">{location.headline}</SectionHeading>
            <p className="max-w-xl text-sm font-light leading-[1.85] text-[#4F4F4F] md:text-base">
              {location.paragraph}
            </p>
          </MotionReveal>

          <MotionReveal y={24} delay={0.1}>
            <div className="mb-16 grid grid-cols-2 gap-px bg-[#111111]/8 sm:grid-cols-3 lg:grid-cols-5">
              {location.travelTimes.map((item) => (
                <div
                  key={item.destination}
                  className="flex flex-col items-center bg-[#F7F4EF] px-4 py-10 text-center md:py-14"
                >
                  <span className="mb-3 font-serif text-4xl font-light text-[#C6A46A] md:text-5xl">
                    {item.minutes}
                  </span>
                  <span className="mb-1 text-[9px] font-semibold tracking-[0.25em] text-[#111111]/40">
                    MIN
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#111111]/70">
                    {item.destination.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal y={24} delay={0.15}>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111111]/5">
              <iframe
                src={location.map.embedUrl}
                title="Citrine Tower location map"
                className="absolute inset-0 h-full w-full border-0 grayscale-[30%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <TextLink href={location.cta.href}>
                {location.cta.label.toUpperCase()}
              </TextLink>
              <a
                href={location.map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold tracking-[0.25em] text-[#4F4F4F] transition-colors duration-500 hover:text-[#C6A46A] md:text-[11px]"
              >
                GET DIRECTIONS →
              </a>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
