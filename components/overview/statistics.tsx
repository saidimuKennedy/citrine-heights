"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./overview-primitives";
import type {
  OverviewStatistic,
  OverviewStatisticsSection,
} from "@/lib/overview-content";

interface StatisticsProps {
  section?: OverviewStatisticsSection;
  statistics: OverviewStatistic[];
}

export function Statistics({ section, statistics }: StatisticsProps) {
  return (
    <section className="bg-[#F7F4EF] px-6 py-28 text-[#0E0E10] md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {section && (
          <MotionReveal y={24} className="mb-16 md:mb-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <EditorialLabel>{section.label}</EditorialLabel>
                <h2 className="max-w-xl font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                  {section.headline}
                </h2>
              </div>
              {section.description && (
                <p className="max-w-sm text-base font-light leading-relaxed text-[#555555] md:pb-1 md:text-right">
                  {section.description}
                </p>
              )}
            </div>
          </MotionReveal>
        )}

        <MotionReveal y={20} delay={0.08}>
          <div className="border-y border-[#0E0E10]/10">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {statistics.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`flex flex-col px-4 py-10 md:px-8 md:py-14 ${
                    idx % 2 === 1 ? "border-l border-[#0E0E10]/10" : ""
                  } ${idx > 0 ? "md:border-l md:border-[#0E0E10]/10" : ""}`}
                >
                  <span className="mb-4 font-serif text-5xl font-light leading-none text-[#C8A46B] md:text-6xl lg:text-7xl">
                    {stat.value}
                  </span>
                  <span className="mb-2 text-xs font-semibold tracking-[0.3em] text-[#0E0E10]">
                    {stat.label.toUpperCase()}
                  </span>
                  {stat.context && (
                    <span className="text-sm font-light leading-relaxed text-[#555555]">
                      {stat.context}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
