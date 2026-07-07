"use client";

import Link from "next/link";
import { MotionReveal } from "@/components/gallery/motion-reveal";

interface OverviewCTAProps {
  headline: string;
  buttonLabel: string;
  projectSlug: string;
}

export function OverviewCTA({
  headline,
  buttonLabel,
  projectSlug,
}: OverviewCTAProps) {
  return (
    <section className="bg-[#111111] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <MotionReveal y={28}>
          <h2 className="mb-12 font-serif text-4xl font-light leading-tight text-[#F7F4EF] md:text-6xl lg:text-7xl">
            {headline}
          </h2>
          <Link
            href={`/${projectSlug}#contact`}
            className="inline-flex items-center gap-3 border border-[#C8A46B]/50 px-10 py-4 text-xs font-semibold tracking-[0.28em] text-[#F7F4EF] transition-all duration-500 hover:border-[#C8A46B] hover:bg-[#C8A46B]/10"
          >
            {buttonLabel}
            <span aria-hidden>→</span>
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
