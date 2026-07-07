"use client";

import Image from "next/image";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "@/components/overview/overview-primitives";
import type { FeatureFinish } from "@/lib/residences-content";

interface FeaturesFinishesProps {
  label: string;
  headline: string;
  items: FeatureFinish[];
}

const BENTO_SPANS = [
  "md:col-span-8 md:row-span-2",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-8",
] as const;

export function FeaturesFinishes({
  label,
  headline,
  items,
}: FeaturesFinishesProps) {
  return (
    <section className="bg-[#F8F6F2] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-16 md:mb-24">
          <EditorialLabel>{label}</EditorialLabel>
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#101010] md:text-5xl lg:text-6xl">
            {headline}
          </h2>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[minmax(180px,auto)]">
          {items.map((item, idx) => {
            const span = BENTO_SPANS[idx % BENTO_SPANS.length];
            const isLarge = idx % 4 === 0 || idx % 4 === 3;

            return (
              <MotionReveal
                key={item.title}
                y={28}
                delay={idx * 0.05}
                className={`group relative overflow-hidden ${span}`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    isLarge ? "aspect-[16/10] md:h-full md:min-h-[320px]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className={`object-cover ${IMAGE_HOVER_CLASS}`}
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/80 via-[#101010]/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3
                    className={`mb-2 font-serif font-light text-[#F8F6F2] ${
                      isLarge ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="max-w-md text-sm font-light leading-relaxed text-white/65 md:text-base">
                    {item.description}
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
