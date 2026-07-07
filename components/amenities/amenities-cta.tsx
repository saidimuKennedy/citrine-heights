"use client";

import Link from "next/link";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import type { AmenitiesContent } from "@/lib/amenities-content";

interface AmenitiesCTAProps {
  cta: AmenitiesContent["cta"];
  projectSlug: string;
}

export function AmenitiesCTA({ cta, projectSlug }: AmenitiesCTAProps) {
  return (
    <section className="bg-[#111111] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <MotionReveal y={28}>
          <h2 className="mb-12 font-serif text-4xl font-light leading-tight text-[#F8F6F2] md:text-6xl lg:text-7xl">
            {cta.headline}
          </h2>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href={`/${projectSlug}#contact`}
              className="inline-flex items-center gap-3 border border-[#C6A46A]/50 px-10 py-4 text-xs font-semibold tracking-[0.28em] text-[#F8F6F2] transition-all duration-500 hover:border-[#C6A46A] hover:bg-[#C6A46A]/10"
            >
              {cta.primaryLabel}
              <span aria-hidden>→</span>
            </Link>

            {cta.brochureUrl && (
              <a
                href={cta.brochureUrl}
                download
                className="inline-flex items-center gap-3 border border-white/20 px-10 py-4 text-xs font-semibold tracking-[0.28em] text-white/70 transition-all duration-500 hover:border-white/40 hover:text-[#F8F6F2]"
              >
                {cta.secondaryLabel}
              </a>
            )}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
