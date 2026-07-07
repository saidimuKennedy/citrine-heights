"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./overview-primitives";

interface DeveloperVisionProps {
  paragraph: string;
  projectName: string;
}

export function DeveloperVision({
  paragraph,
  projectName,
}: DeveloperVisionProps) {
  return (
    <section className="bg-[#F7F4EF] px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto max-w-3xl text-center">
        <MotionReveal y={24}>
          <EditorialLabel>DEVELOPER&apos;S NOTE</EditorialLabel>
          <p className="font-serif text-2xl font-light italic leading-relaxed text-[#555555] md:text-3xl md:leading-relaxed">
            &ldquo;{paragraph}&rdquo;
          </p>
          <p className="mt-10 text-xs font-semibold tracking-[0.3em] text-[#C8A46B]">
            — KIANYINGI DEVELOPMENTS, {projectName.toUpperCase()}
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
