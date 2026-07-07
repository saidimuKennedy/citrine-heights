"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import type { HomepageContent } from "@/lib/homepage-content";

interface FinalCtaProps {
  finalCta: HomepageContent["finalCta"];
}

export function FinalCta({ finalCta }: FinalCtaProps) {
  return (
    <section className="relative min-h-[80svh] overflow-hidden bg-[#111111]">
      <div className="absolute inset-0">
        <div className="hero-ambient-zoom absolute inset-0">
          <Image
            src={finalCta.image.src}
            alt={finalCta.image.alt}
            fill
            className="object-cover brightness-[0.38]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-[#111111]/50" />
      </div>

      <div className="relative z-10 flex min-h-[80svh] flex-col items-center justify-center px-6 py-32 text-center md:py-44">
        <MotionReveal y={28}>
          <h2 className="mb-6 whitespace-pre-line font-serif text-5xl font-light leading-[1.02] tracking-tight text-[#F7F4EF] md:text-7xl lg:text-8xl">
            {finalCta.headline}
          </h2>
          <p className="mb-14 text-sm font-light tracking-[0.12em] text-white/55 md:text-base">
            {finalCta.subheadline}
          </p>
          <Link
            href={finalCta.cta.href}
            className="inline-flex bg-[#C6A46A] px-12 py-5 text-[10px] font-semibold tracking-[0.28em] text-[#111111] transition-all duration-500 hover:bg-[#d4b47a] md:text-[11px]"
          >
            {finalCta.cta.label.toUpperCase()}
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
