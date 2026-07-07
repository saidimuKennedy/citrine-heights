"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, GoldRule, renderIcon } from "./overview-primitives";
import type { OverviewPillar } from "@/lib/overview-content";

interface DesignPhilosophyProps {
  label: string;
  headline: string;
  pillars: OverviewPillar[];
}

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V"];

export function DesignPhilosophy({
  label,
  headline,
  pillars,
}: DesignPhilosophyProps) {
  return (
    <section className="bg-[#111111] px-6 py-28 text-[#F7F4EF] md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <MotionReveal y={24} className="lg:col-span-4 lg:pt-2">
            <EditorialLabel>{label}</EditorialLabel>
            <GoldRule className="mb-10" />
            <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {headline}
            </h2>
          </MotionReveal>

          <div className="flex flex-col lg:col-span-8">
            {pillars.map((pillar, idx) => (
              <MotionReveal key={pillar.title} y={28} delay={0.1 * idx}>
                <div
                  className={`flex gap-8 py-10 md:gap-12 md:py-14 ${
                    idx > 0 ? "border-t border-white/10" : ""
                  }`}
                >
                  <span
                    className="shrink-0 font-serif text-3xl font-light leading-none text-[#C8A46B]/70 md:text-4xl"
                    aria-hidden
                  >
                    {ROMAN_NUMERALS[idx] ?? String(idx + 1)}
                  </span>

                  <div className="flex flex-1 flex-col gap-5 md:flex-row md:items-start md:gap-10">
                    <div className="shrink-0 md:pt-1">
                      {renderIcon(pillar.icon)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-4 text-xs font-semibold tracking-[0.35em] text-[#C8A46B]">
                        {pillar.title.toUpperCase()}
                      </h3>
                      <p className="max-w-xl text-lg font-light leading-relaxed text-white/55">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
