"use client";

import Image from "next/image";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "@/components/overview/overview-primitives";
import type { LifeMoment } from "@/lib/residences-content";

interface LifeInsideProps {
  label: string;
  headline: string;
  moments: LifeMoment[];
}

export function LifeInside({ label, headline, moments }: LifeInsideProps) {
  return (
    <section className="bg-[#101010] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-16 md:mb-24">
          <EditorialLabel>{label}</EditorialLabel>
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-5xl lg:text-6xl">
            {headline}
          </h2>
        </MotionReveal>

        <div className="flex gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden">
          {moments.map((moment, idx) => (
            <MotionReveal
              key={moment.time}
              y={28}
              delay={idx * 0.06}
              className="w-[85vw] shrink-0 sm:w-[70vw] md:w-[45vw] lg:w-[38vw]"
            >
              <div className="group relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={moment.image.src}
                  alt={moment.image.alt}
                  fill
                  className={`object-cover ${IMAGE_HOVER_CLASS}`}
                  sizes="45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/90 via-[#101010]/20 to-transparent" />
              </div>
              <div className="mt-6 border-l-2 border-[#C6A46A]/40 pl-6">
                <p className="mb-3 text-[10px] font-semibold tracking-[0.35em] text-[#C6A46A]">
                  {moment.time.toUpperCase()}
                </p>
                <p className="font-serif text-2xl font-light leading-snug text-[#F8F6F2] md:text-3xl">
                  {moment.narrative}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
