"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { SectionContainer } from "./contact-primitives";
import type { ContactContent } from "@/lib/contact-content";

interface ContactWelcomeProps {
  welcome: ContactContent["welcome"];
}

export function ContactWelcome({ welcome }: ContactWelcomeProps) {
  return (
    <SectionContainer className="bg-[#F8F6F2]">
      <MotionReveal y={28} className="mx-auto max-w-3xl text-center">
        <h2 className="mb-10 font-serif text-3xl font-light leading-[1.1] tracking-tight text-[#111111] md:text-5xl lg:text-6xl">
          {welcome.headline}
        </h2>
        <p className="text-base font-light leading-relaxed text-[#555555] md:text-lg">
          {welcome.paragraph}
        </p>
      </MotionReveal>
    </SectionContainer>
  );
}
