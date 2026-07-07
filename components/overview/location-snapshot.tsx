"use client";

import Image from "next/image";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, GoldRule } from "./overview-primitives";
import type { OverviewImage, TravelTime } from "@/lib/overview-content";

interface LocationSnapshotProps {
  label: string;
  headline: string;
  description: string;
  travelTimes: TravelTime[];
  image: OverviewImage;
}

export function LocationSnapshot({
  label,
  headline,
  description,
  travelTimes,
  image,
}: LocationSnapshotProps) {
  return (
    <section className="bg-[#111111] text-[#F7F4EF]">
      <div className="relative h-[55svh] min-h-[380px] w-full overflow-hidden md:h-[65svh]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={`object-cover brightness-90 ${IMAGE_HOVER_CLASS}`}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-[#111111]/40" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-8 md:px-16 md:pb-12">
          <MotionReveal y={20}>
            <div className="mx-auto flex max-w-7xl flex-wrap gap-x-10 gap-y-6 border-t border-white/15 pt-8 md:gap-x-16">
              {travelTimes.map((item) => (
                <div key={item.destination} className="flex flex-col">
                  <span className="mb-1 font-serif text-2xl font-light text-[#C8A46B] md:text-3xl">
                    {item.time}
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.25em] text-white/50">
                    {item.destination.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </div>

      <div className="px-6 py-20 md:px-16 md:py-28 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <MotionReveal y={24} className="lg:col-span-5">
            <EditorialLabel>{label}</EditorialLabel>
            <GoldRule className="mb-8" />
            <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {headline}
            </h2>
          </MotionReveal>

          <MotionReveal y={20} delay={0.1} className="lg:col-span-7 lg:pt-16">
            <p className="max-w-xl text-lg font-light leading-relaxed text-white/55 md:text-xl">
              {description}
            </p>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
