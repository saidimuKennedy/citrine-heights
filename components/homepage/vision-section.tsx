"use client";

import Image from "next/image";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import {
  EditorialLabel,
  GoldRule,
  SectionHeading,
  TextLink,
} from "./homepage-primitives";
import type { HomepageContent } from "@/lib/homepage-content";

interface VisionSectionProps {
  vision: HomepageContent["vision"];
}

export function VisionSection({ vision }: VisionSectionProps) {
  return (
    <section id="vision" className="overflow-hidden bg-[#111111] text-[#F7F4EF]">
      <div className="grid min-h-[85svh] grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-24 md:px-16 md:py-32 lg:px-20">
          <MotionReveal y={24}>
            <EditorialLabel>{vision.label.toUpperCase()}</EditorialLabel>
            <GoldRule className="mb-8" />
            <SectionHeading light className="mb-10">
              {vision.headline}
            </SectionHeading>
          </MotionReveal>

          <MotionReveal y={20} delay={0.1}>
            {vision.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="mb-6 max-w-md text-sm font-light leading-[1.85] text-white/60 last:mb-10 md:text-base"
              >
                {paragraph}
              </p>
            ))}
            <TextLink href={vision.cta.href} variant="light">
              {vision.cta.label.toUpperCase()}
            </TextLink>
          </MotionReveal>
        </div>

        <div className="relative min-h-[50svh] lg:min-h-0">
          <MotionReveal y={0} className="absolute inset-0">
            <Image
              src={vision.image.src}
              alt={vision.image.alt}
              fill
              className={`object-cover ${IMAGE_HOVER_CLASS}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#111111]/40 lg:to-[#111111]/25" />
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
