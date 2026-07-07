"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, GoldRule } from "@/components/overview/overview-primitives";
import type { ResidencesContent } from "@/lib/residences-content";

interface ResidencesHeroProps {
  hero: ResidencesContent["hero"];
}

export function ResidencesHero({ hero }: ResidencesHeroProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#101010]">
      <div className="absolute inset-0">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#101010]/35" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] items-end justify-end px-6 pb-16 pt-28 md:px-12 md:pb-20">
        <MotionReveal
          y={32}
          className="w-full max-w-xl border border-white/10 bg-[#101010]/75 p-8 backdrop-blur-sm md:p-12 lg:mr-8 lg:max-w-lg"
        >
          <EditorialLabel>{hero.label}</EditorialLabel>
          <GoldRule className="mb-8" />
          <h1 className="mb-6 font-serif text-4xl font-light leading-[0.95] tracking-tight text-[#F8F6F2] md:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mb-10 text-sm font-light leading-relaxed text-white/60 md:text-base">
            {hero.subtitle}
          </p>
          <Link
            href="#choose-residence"
            className="inline-flex items-center gap-3 border border-[#C6A46A]/50 px-8 py-3.5 text-[10px] font-semibold tracking-[0.28em] text-[#F8F6F2] transition-all duration-500 hover:border-[#C6A46A] hover:bg-[#C6A46A]/10 md:text-[11px]"
          >
            {hero.ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
