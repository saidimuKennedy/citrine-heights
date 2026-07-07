"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, SectionHeading } from "./homepage-primitives";
import type { HomepageContent } from "@/lib/homepage-content";

interface ConstructionTimelineProps {
  construction: HomepageContent["construction"];
}

const STATUS_LABEL = {
  complete: "Complete",
  active: "In Progress",
  upcoming: "Upcoming",
} as const;

export function ConstructionTimeline({
  construction,
}: ConstructionTimelineProps) {
  return (
    <section className="bg-[#F7F4EF] px-6 py-28 text-[#111111] md:px-16 md:py-44">
      <div className="mx-auto max-w-3xl">
        <MotionReveal y={24} className="mb-20 text-center md:mb-28">
          <EditorialLabel>{construction.label.toUpperCase()}</EditorialLabel>
          <SectionHeading>{construction.headline}</SectionHeading>
        </MotionReveal>

        <div className="flex flex-col items-center">
          {construction.phases.map((phase, idx) => (
            <MotionReveal key={phase.id} y={20} delay={0.06 * idx} className="w-full">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`mb-6 flex h-3 w-3 items-center justify-center rounded-full ${
                    phase.status === "complete"
                      ? "bg-[#C6A46A]"
                      : phase.status === "active"
                        ? "ring-2 ring-[#C6A46A] ring-offset-4 ring-offset-[#F7F4EF]"
                        : "border border-[#111111]/20"
                  }`}
                  aria-hidden
                />

                <span className="mb-3 text-[9px] font-semibold tracking-[0.3em] text-[#C6A46A]">
                  {STATUS_LABEL[phase.status].toUpperCase()}
                </span>
                <h3 className="mb-4 font-serif text-3xl font-light tracking-tight md:text-4xl">
                  {phase.title}
                </h3>
                <p className="max-w-md text-sm font-light leading-[1.9] text-[#4F4F4F]">
                  {phase.description}
                </p>
              </div>

              {idx < construction.phases.length - 1 && (
                <div className="my-10 flex justify-center md:my-12" aria-hidden>
                  <div className="h-14 w-px bg-gradient-to-b from-[#C6A46A]/60 via-[#111111]/15 to-transparent" />
                </div>
              )}
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
