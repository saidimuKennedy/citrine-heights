"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, SectionHeading } from "./homepage-primitives";
import type { HomepageContent } from "@/lib/homepage-content";

interface InvestmentSectionProps {
  investment: HomepageContent["investment"];
}

export function InvestmentSection({ investment }: InvestmentSectionProps) {
  return (
    <section
      id="investment"
      className="bg-[#111111] px-6 py-28 text-[#F7F4EF] md:px-16 md:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-20 md:mb-32">
          <EditorialLabel>{investment.label.toUpperCase()}</EditorialLabel>
          <SectionHeading light className="max-w-3xl">
            {investment.headline}
          </SectionHeading>
        </MotionReveal>

        <div className="flex flex-col">
          {investment.pillars.map((pillar, idx) => (
            <MotionReveal
              key={pillar.title}
              y={28}
              delay={0.06 * idx}
              className="border-t border-white/[0.08] py-12 first:border-t-0 first:pt-0 md:py-16"
            >
              <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-12">
                <span
                  className="font-serif text-5xl font-light leading-none text-[#C6A46A]/35 md:col-span-2 md:text-7xl"
                  aria-hidden
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-10">
                  <h3 className="mb-5 font-serif text-3xl font-light tracking-tight text-[#F7F4EF] md:text-5xl lg:text-6xl">
                    {pillar.title}
                  </h3>
                  <p className="max-w-2xl text-sm font-light leading-[1.9] text-white/50 md:text-base">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
