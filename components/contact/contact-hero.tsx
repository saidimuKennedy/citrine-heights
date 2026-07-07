"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { ContactLabel, GoldRule } from "./contact-primitives";
import type { ContactContent } from "@/lib/contact-content";

interface ContactHeroProps {
  hero: ContactContent["hero"];
}

export function ContactHero({ hero }: ContactHeroProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#111111]">
      <div className="absolute inset-0">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#111111]/50" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] items-end px-6 pb-16 pt-28 md:px-12 md:pb-24 lg:px-16">
        <MotionReveal
          y={32}
          className="w-full max-w-2xl border border-white/10 bg-[#111111]/70 p-8 backdrop-blur-sm md:p-12 lg:p-14"
        >
          <ContactLabel>{hero.label}</ContactLabel>
          <GoldRule className="mb-8" />
          <h1 className="mb-6 font-serif text-4xl font-light leading-[0.95] tracking-tight text-[#F8F6F2] md:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mb-10 max-w-lg text-sm font-light leading-relaxed text-white/60 md:text-base">
            {hero.subtitle}
          </p>
          <Link
            href="#consultation"
            className="inline-flex items-center gap-3 bg-[#C6A46A] px-8 py-3.5 text-[10px] font-semibold tracking-[0.28em] text-[#111111] transition-all duration-500 hover:bg-[#d4b47a] md:text-[11px]"
          >
            {hero.ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
