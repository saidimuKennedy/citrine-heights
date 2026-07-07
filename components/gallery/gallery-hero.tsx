"use client";

import Image from "next/image";
import { MotionReveal } from "./motion-reveal";

interface GalleryHeroProps {
  backgroundSrc: string;
  backgroundAlt: string;
}

export function GalleryHero({ backgroundSrc, backgroundAlt }: GalleryHeroProps) {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#0E0E10]">
      <div className="absolute inset-0">
        <Image
          src={backgroundSrc}
          alt={backgroundAlt}
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E10]/70 via-[#0E0E10]/45 to-[#0E0E10]" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <MotionReveal y={20}>
          <p className="mb-6 text-[10px] font-semibold tracking-[0.45em] text-[#C8A46B] md:text-xs">
            GALLERY
          </p>
        </MotionReveal>

        <MotionReveal y={28} delay={0.12}>
          <h1 className="max-w-5xl font-serif text-5xl font-light leading-[0.95] tracking-tight text-[#F7F4EF] md:text-7xl lg:text-8xl">
            A Visual Journey
            <br />
            <span className="italic text-white/90">Through Citrine Tower</span>
          </h1>
        </MotionReveal>
      </div>
    </section>
  );
}
