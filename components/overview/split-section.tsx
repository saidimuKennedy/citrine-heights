"use client";

import Image from "next/image";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, GoldRule } from "./overview-primitives";
import type { OverviewImage } from "@/lib/overview-content";

interface SplitSectionProps {
  headline: string;
  paragraphs: string[];
  image: OverviewImage;
}

export function SplitSection({
  headline,
  paragraphs,
  image,
}: SplitSectionProps) {
  return (
    <section className="relative bg-[#F7F4EF] px-6 py-24 md:px-16 md:py-32 lg:px-24">
      <div className="relative mx-auto max-w-7xl">
        <div className="group relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={`object-cover ${IMAGE_HOVER_CLASS}`}
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10]/50 via-transparent to-transparent" />
        </div>

        <MotionReveal
          y={32}
          className="relative z-10 -mt-16 mx-auto max-w-xl bg-[#F7F4EF] p-8 shadow-[0_24px_80px_-20px_rgba(14,14,16,0.18)] md:-mt-24 md:ml-8 md:max-w-lg md:p-12 lg:ml-16"
        >
          <EditorialLabel>THE RESIDENCE</EditorialLabel>
          <GoldRule className="mb-8" />
          <h2 className="mb-8 font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#0E0E10] md:text-4xl lg:text-5xl">
            {headline}
          </h2>
          {paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="mb-6 text-base font-light leading-relaxed text-[#555555] last:mb-0 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}
