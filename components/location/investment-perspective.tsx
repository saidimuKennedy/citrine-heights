"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, GoldRule } from "./location-primitives";
import type { LocationContent } from "@/lib/location-content";

interface InvestmentPerspectiveProps {
  investment: LocationContent["investment"];
}

export function InvestmentPerspective({ investment }: InvestmentPerspectiveProps) {
  return (
    <section className="bg-[#111111] px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <MotionReveal y={28} className="lg:col-span-7">
          <EditorialLabel>{investment.label}</EditorialLabel>
          <GoldRule className="mb-8" />
          <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-5xl lg:text-6xl">
            {investment.headline}
          </h2>
        </MotionReveal>

        <MotionReveal y={24} delay={0.1} className="lg:col-span-5 lg:pt-20">
          <div className="space-y-6">
            {investment.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base font-light leading-relaxed text-white/55 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-10 space-y-4 border-t border-white/10 pt-10">
            {investment.supportingPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-4 text-sm font-light leading-relaxed text-white/60"
              >
                <span className="mt-2 h-px w-6 shrink-0 bg-[#C6A46A]/70" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </MotionReveal>
      </div>
    </section>
  );
}
