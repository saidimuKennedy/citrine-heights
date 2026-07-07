"use client";

import Link from "next/link";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { ContactLabel, SectionContainer } from "./contact-primitives";
import type { ContactContent } from "@/lib/contact-content";

interface ContactMapProps {
  map: ContactContent["map"];
}

export function ContactMap({ map }: ContactMapProps) {
  return (
    <SectionContainer className="bg-[#111111] !py-0">
      <MotionReveal y={24} className="py-24 md:py-32">
        <ContactLabel>{map.label}</ContactLabel>
        <h2 className="mb-10 max-w-xl font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-5xl">
          {map.headline}
        </h2>
      </MotionReveal>

      <MotionReveal y={28} delay={0.1}>
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10 bg-[#0E0E10] md:aspect-[21/9]">
          <iframe
            title="Citrine Heights location map"
            src={map.embedUrl}
            className="absolute inset-0 h-full w-full border-0 opacity-60 [filter:grayscale(0.4)_brightness(0.65)_contrast(1.1)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-[#111111]/20" />

          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <Link
              href={map.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#C6A46A]/50 bg-[#111111]/80 px-6 py-3 text-[10px] font-semibold tracking-[0.24em] text-[#F8F6F2] backdrop-blur-sm transition-all duration-500 hover:border-[#C6A46A] hover:bg-[#C6A46A]/20"
            >
              GET DIRECTIONS
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </MotionReveal>
    </SectionContainer>
  );
}
