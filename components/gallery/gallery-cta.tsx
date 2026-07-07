"use client";

import Link from "next/link";
import { MotionReveal } from "./motion-reveal";

interface GalleryCTAProps {
  projectSlug: string;
}

export function GalleryCTA({ projectSlug }: GalleryCTAProps) {
  return (
    <section className="bg-[#161616] px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <MotionReveal y={24}>
          <p className="mb-6 text-[10px] font-semibold tracking-[0.35em] text-[#C8A46B]">
            PRIVATE VIEWINGS
          </p>
          <h2 className="mb-10 font-serif text-4xl font-light leading-tight text-[#F7F4EF] md:text-6xl">
            Ready To Experience
            <br />
            Citrine Tower?
          </h2>
          <Link
            href={`/${projectSlug}#contact`}
            className="inline-flex items-center gap-3 border border-[#C8A46B]/50 px-10 py-4 text-[11px] font-semibold tracking-[0.28em] text-[#F7F4EF] transition-all duration-500 hover:border-[#C8A46B] hover:bg-[#C8A46B]/10"
          >
            BOOK A PRIVATE VIEWING
            <span aria-hidden>→</span>
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
