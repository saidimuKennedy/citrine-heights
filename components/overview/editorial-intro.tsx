"use client";

import Image from "next/image";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, GoldRule } from "./overview-primitives";
import type { OverviewImage } from "@/lib/overview-content";

interface EditorialIntroProps {
  label: string;
  headline: string;
  description: string;
  image: OverviewImage;
}

export function EditorialIntro({
  label,
  headline,
  description,
  image,
}: EditorialIntroProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#F7F4EF]">
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-center px-6 py-32 md:px-16 md:py-40 lg:col-span-5 lg:px-12 lg:py-0 xl:px-20">
          <MotionReveal y={24}>
            <EditorialLabel>{label}</EditorialLabel>
            <GoldRule className="mb-8" />
            <h1 className="mb-8 font-serif text-5xl font-light leading-[0.95] tracking-tight text-[#0E0E10] md:text-6xl lg:text-7xl xl:text-[5.25rem]">
              {headline}
            </h1>
          </MotionReveal>

          <MotionReveal y={28} delay={0.12}>
            <p className="max-w-md text-base font-light leading-relaxed text-[#555555] md:text-lg">
              {description}
            </p>
          </MotionReveal>

          <div
            className="absolute right-0 top-1/4 hidden h-32 w-px bg-[#C8A46B]/40 lg:block"
            aria-hidden
          />
        </div>

        <div className="relative min-h-[50svh] lg:col-span-7 lg:min-h-0">
          <div
            className="absolute inset-0 lg:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F7F4EF]/80 via-transparent to-transparent lg:from-[#F7F4EF]/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
