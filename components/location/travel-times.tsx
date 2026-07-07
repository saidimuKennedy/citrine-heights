"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./location-primitives";
import type { LocationContent } from "@/lib/location-content";

interface TravelTimesProps {
  travelTimes: LocationContent["travelTimes"];
}

export function TravelTimes({ travelTimes }: TravelTimesProps) {
  return (
    <section className="bg-[#F8F6F2] px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-5xl">
        <MotionReveal y={24} className="mb-16 md:mb-24">
          <EditorialLabel>{travelTimes.label}</EditorialLabel>
          <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl">
            {travelTimes.headline}
          </h2>
        </MotionReveal>

        <div className="space-y-0">
          {travelTimes.items.map((item, idx) => (
            <MotionReveal key={item.destination} y={24} delay={idx * 0.05}>
              <div className="border-t border-[#111111]/10 py-10 md:py-14">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
                  <div className="flex items-end gap-4 md:gap-6">
                    <span className="font-serif text-6xl font-light leading-none text-[#C6A46A] md:text-7xl lg:text-8xl">
                      {item.minutes}
                    </span>
                    <span className="mb-2 text-[10px] font-semibold tracking-[0.3em] text-[#555555] md:mb-3">
                      MINUTES
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-light text-[#111111] md:text-4xl lg:text-5xl">
                    {item.destination}
                  </h3>
                </div>
              </div>
            </MotionReveal>
          ))}
          <div className="border-t border-[#111111]/10" aria-hidden />
        </div>
      </div>
    </section>
  );
}
