"use client";

import Image from "next/image";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { GoldRule } from "./amenities-primitives";
import type { AmenitiesContent } from "@/lib/amenities-content";

interface LifestylePhilosophyProps {
  philosophy: AmenitiesContent["philosophy"];
}

export function LifestylePhilosophy({ philosophy }: LifestylePhilosophyProps) {
  const pullQuote = philosophy.paragraphs[0];
  const bodyParagraphs = philosophy.paragraphs.slice(1);

  return (
    <section
      id="lifestyle-philosophy"
      className="relative overflow-hidden bg-[#F8F6F2] text-[#4A4A4A]"
    >
      <div className="relative min-h-[70svh] w-full md:min-h-[80svh]">
        <Image
          src={philosophy.image.src}
          alt={philosophy.image.alt}
          fill
          className={`object-cover ${IMAGE_HOVER_CLASS}`}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#111111]/55" />
      </div>

      <div className="relative z-10 -mt-24 px-6 pb-24 md:-mt-32 md:px-16 md:pb-32 lg:px-24">
        <div className="mx-auto max-w-3xl border border-[#111111]/8 bg-[#F8F6F2] p-8 shadow-[0_24px_80px_-20px_rgba(14,14,16,0.15)] md:p-14">
          <MotionReveal y={24}>
            <GoldRule className="mb-10" />
            <h2 className="mb-8 font-serif text-3xl font-light leading-[1.08] tracking-tight text-[#111111] md:text-4xl lg:text-5xl">
              {philosophy.headline}
            </h2>
            {pullQuote && (
              <p className="mb-10 font-serif text-2xl font-light italic leading-[1.2] text-[#4A4A4A] md:text-3xl">
                {pullQuote}
              </p>
            )}
            {bodyParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="mb-6 text-base font-light leading-relaxed text-[#4A4A4A] last:mb-0 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
