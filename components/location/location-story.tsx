"use client";

import Image from "next/image";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { EditorialLabel, GoldRule } from "./location-primitives";
import type { LocationContent } from "@/lib/location-content";

interface LocationStoryProps {
  story: LocationContent["story"];
}

export function LocationStory({ story }: LocationStoryProps) {
  return (
    <section id="location-story" className="bg-[#F8F6F2] text-[#111111]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12 lg:gap-0">
        <div className="flex flex-col justify-center px-6 py-20 md:px-16 md:py-28 lg:col-span-5 lg:px-12 lg:py-32 xl:px-16">
          <MotionReveal y={24}>
            <EditorialLabel>{story.label}</EditorialLabel>
            <GoldRule className="mb-8" />
            <h2 className="mb-8 font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {story.headline}
            </h2>
          </MotionReveal>

          <MotionReveal y={20} delay={0.1}>
            <div className="space-y-5">
              {story.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base font-light leading-relaxed text-[#555555] md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </MotionReveal>
        </div>

        <MotionReveal
          y={28}
          delay={0.15}
          className="group relative min-h-[420px] lg:col-span-7 lg:min-h-[640px]"
        >
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            className={`object-cover ${IMAGE_HOVER_CLASS}`}
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </MotionReveal>
      </div>
    </section>
  );
}
