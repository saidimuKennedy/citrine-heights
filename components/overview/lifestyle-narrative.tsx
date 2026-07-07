"use client";

import Image from "next/image";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./overview-primitives";
import type { LifestyleMoment } from "@/lib/overview-content";

interface LifestyleNarrativeProps {
  label: string;
  headline: string;
  moments: LifestyleMoment[];
}

const BENTO_LAYOUTS = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
] as const;

export function LifestyleNarrative({
  label,
  headline,
  moments,
}: LifestyleNarrativeProps) {
  return (
    <section className="bg-[#F7F4EF] px-6 py-28 md:px-16 md:py-40 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-16 md:mb-24">
          <EditorialLabel>{label}</EditorialLabel>
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#0E0E10] md:text-5xl lg:text-6xl">
            {headline}
          </h2>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:auto-rows-[minmax(200px,auto)] md:gap-5">
          {moments.map((moment, idx) => {
            const layout = BENTO_LAYOUTS[idx % BENTO_LAYOUTS.length];
            const isLarge = idx % 4 === 0;

            return (
              <MotionReveal
                key={moment.time}
                y={28}
                delay={idx * 0.06}
                className={`group relative overflow-hidden ${layout}`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    isLarge ? "aspect-[4/5] md:h-full md:min-h-[480px]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={moment.image.src}
                    alt={moment.image.alt}
                    fill
                    className={`object-cover ${IMAGE_HOVER_CLASS}`}
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10]/85 via-[#0E0E10]/25 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="mb-3 text-[10px] font-semibold tracking-[0.35em] text-[#C8A46B]">
                    {moment.time.toUpperCase()}
                  </p>
                  <p
                    className={`font-serif font-light leading-snug text-[#F7F4EF] ${
                      isLarge
                        ? "text-2xl md:text-3xl lg:text-4xl"
                        : "text-xl md:text-2xl"
                    }`}
                  >
                    {moment.narrative}
                  </p>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
