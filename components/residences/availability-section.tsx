"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "@/components/overview/overview-primitives";

interface AvailabilitySectionProps {
  label: string;
  headline: string;
  description: string;
}

export function AvailabilitySection({
  label,
  headline,
  description,
}: AvailabilitySectionProps) {
  return (
    <section className="border-y border-[#101010]/6 bg-[#F8F6F2] px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <MotionReveal y={24}>
          <EditorialLabel>{label}</EditorialLabel>
          <h2 className="mb-8 font-serif text-3xl font-light leading-tight text-[#101010] md:text-5xl">
            {headline}
          </h2>
          <p className="text-base font-light leading-relaxed text-[#5A5A5A] md:text-lg">
            {description}
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
