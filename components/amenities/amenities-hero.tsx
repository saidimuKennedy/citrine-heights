"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, GoldRule } from "./amenities-primitives";
import type { AmenitiesContent } from "@/lib/amenities-content";

interface AmenitiesHeroProps {
  hero: AmenitiesContent["hero"];
}

export function AmenitiesHero({ hero }: AmenitiesHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.06]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#111111]"
    >
      {/* Right image column — clipped so parallax never bleeds into the dark panel */}
      <div
        className="absolute inset-y-0 right-0 w-full overflow-hidden border-0 md:left-[42%]"
        aria-hidden
      >
        <motion.div
          className="absolute inset-0 origin-right will-change-transform"
          style={{ y: imageY, scale: imageScale }}
        >
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#111111]/50 md:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-[#111111]/45 md:from-[#111111]/85 md:via-transparent md:to-[#111111]/30" />
      </div>

      {/* Solid left panel — clean seam, no image ghosting */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[42%] border-0 bg-[#111111] md:block"
        aria-hidden
      />

      {/* Editorial anchor — left column */}
      <div className="relative z-10 flex h-full w-full min-w-0 flex-col justify-between px-6 pb-12 pt-24 md:w-[42%] md:px-12 md:pb-16 md:pt-28 lg:px-16 xl:px-20">
        <MotionReveal y={16} className="overflow-visible">
          <div className="flex items-center gap-5">
            <EditorialLabel className="mb-0">{hero.label}</EditorialLabel>
            <GoldRule className="hidden w-16 md:block" />
          </div>
        </MotionReveal>

        <div className="overflow-visible">
          <MotionReveal y={32} delay={0.08} className="overflow-visible">
            <h1 className="mb-6 max-w-lg font-serif text-[2.75rem] font-light leading-[0.95] tracking-tight text-[#F8F6F2] md:text-6xl lg:text-7xl">
              {hero.headline}
            </h1>
          </MotionReveal>

          <MotionReveal y={20} delay={0.18} className="overflow-visible">
            <p className="mb-8 max-w-sm text-sm font-light leading-relaxed text-[#F8F6F2]/55 md:text-base">
              {hero.subtitle}
            </p>
          </MotionReveal>

          <MotionReveal y={16} delay={0.28} className="overflow-visible">
            <Link
              href="#lifestyle-philosophy"
              className="group inline-flex items-center gap-4 text-[10px] font-semibold tracking-[0.32em] text-[#C6A46A] transition-colors duration-500 hover:text-[#F8F6F2] md:text-[11px]"
            >
              <span
                className="h-px w-10 bg-[#C6A46A]/70 transition-all duration-500 group-hover:w-14 group-hover:bg-[#F8F6F2]"
                aria-hidden
              />
              {hero.ctaLabel}
            </Link>
          </MotionReveal>
        </div>

        {/* Gold accent confined to the dark panel — not across the image seam */}
        <div
          className="pointer-events-none absolute right-0 top-[36%] hidden h-24 w-px bg-gradient-to-b from-transparent via-[#C6A46A]/30 to-transparent md:block"
          aria-hidden
        />
      </div>

      {/* Vertical explore accent — image side only */}
      <div
        className="absolute bottom-28 right-6 z-10 hidden md:left-[44%] md:right-auto md:block"
        aria-hidden
      >
        <MotionReveal y={12} delay={0.35}>
          <p className="text-[10px] font-medium tracking-[0.45em] text-[#C6A46A]/70 [writing-mode:vertical-rl]">
            {hero.accent}
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
