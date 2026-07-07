"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, GoldRule } from "./location-primitives";
import type { LocationContent } from "@/lib/location-content";

interface LocationHeroProps {
  hero: LocationContent["hero"];
}

export function LocationHero({ hero }: LocationHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#111111]"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          className="object-cover object-center brightness-[0.55]"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-[#111111]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 via-[#111111]/30 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 pt-28 md:px-16 md:pb-24 lg:px-24">
        <MotionReveal y={16}>
          <EditorialLabel className="mb-0">{hero.label}</EditorialLabel>
        </MotionReveal>

        <MotionReveal y={32} delay={0.08}>
          <h1 className="mb-6 max-w-3xl font-serif text-[2.75rem] font-light leading-[0.95] tracking-tight text-[#F8F6F2] md:text-6xl lg:text-7xl xl:text-8xl">
            {hero.headline}
          </h1>
        </MotionReveal>

        <MotionReveal y={20} delay={0.16}>
          <p className="mb-10 max-w-md text-sm font-light leading-relaxed text-[#F8F6F2]/60 md:text-base lg:text-lg">
            {hero.subtitle}
          </p>
        </MotionReveal>

        <MotionReveal y={16} delay={0.24}>
          <Link
            href="#location-story"
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

      <div className="absolute bottom-28 right-6 z-10 hidden md:block" aria-hidden>
        <MotionReveal y={12} delay={0.35}>
          <p className="text-[10px] font-medium tracking-[0.45em] text-[#C6A46A]/70 [writing-mode:vertical-rl]">
            {hero.accent}
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
