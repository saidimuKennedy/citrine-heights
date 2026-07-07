"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { GoldRule } from "./homepage-primitives";
import type { HomepageContent } from "@/lib/homepage-content";

interface EditorialIntroProps {
  introduction: HomepageContent["introduction"];
}

export function EditorialIntro({ introduction }: EditorialIntroProps) {
  return (
    <section
      id="introduction"
      className="bg-[#F7F4EF] px-6 py-36 text-[#111111] md:px-16 md:py-56 lg:py-64"
    >
      <div className="mx-auto max-w-5xl text-center">
        <MotionReveal y={36}>
          <GoldRule className="mx-auto mb-16" />
          <h2 className="mb-16 font-serif text-5xl font-light leading-[1.06] tracking-tight md:text-7xl lg:text-8xl">
            {introduction.headline.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h2>
        </MotionReveal>

        <MotionReveal y={24} delay={0.12}>
          <p className="mx-auto max-w-xl text-sm font-light leading-[1.9] text-[#4F4F4F] md:text-base">
            {introduction.paragraph}
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
