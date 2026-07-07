"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { SectionContainer } from "./contact-primitives";
import type { ContactContent } from "@/lib/contact-content";

interface ResponsePromiseProps {
  responsePromise: ContactContent["responsePromise"];
}

export function ResponsePromise({ responsePromise }: ResponsePromiseProps) {
  return (
    <SectionContainer className="bg-[#111111]">
      <MotionReveal y={28} className="mx-auto max-w-2xl text-center">
        <h2 className="mb-8 font-serif text-3xl font-light leading-[1.1] tracking-tight text-[#F8F6F2] md:text-5xl">
          {responsePromise.headline}
        </h2>
        <p className="text-sm font-light leading-relaxed text-white/50 md:text-base">
          {responsePromise.paragraph}
        </p>
      </MotionReveal>
    </SectionContainer>
  );
}
