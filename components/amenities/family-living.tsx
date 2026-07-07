"use client";

import Image from "next/image";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./amenities-primitives";
import type { AmenitiesContent } from "@/lib/amenities-content";

interface FamilyLivingProps {
  familyLiving: AmenitiesContent["familyLiving"];
}

export function FamilyLiving({ familyLiving }: FamilyLivingProps) {
  return (
    <section className="bg-[#F8F6F2]">
      <div className="relative h-[60svh] min-h-[400px] w-full overflow-hidden md:h-[70svh]">
        <Image
          src={familyLiving.image.src}
          alt={familyLiving.image.alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-16 md:pb-20">
          <MotionReveal y={24}>
            <EditorialLabel>{familyLiving.label}</EditorialLabel>
            <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-5xl lg:text-6xl">
              {familyLiving.headline}
            </h2>
          </MotionReveal>
        </div>
      </div>

      <div className="px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <MotionReveal y={20} className="mb-16 max-w-xl">
            <p className="text-base font-light leading-relaxed text-[#4A4A4A] md:text-lg">
              {familyLiving.description}
            </p>
          </MotionReveal>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:gap-16">
            {familyLiving.features.map((feature, idx) => (
              <MotionReveal key={feature.title} y={24} delay={idx * 0.05}>
                <div className="group relative mb-6 aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    fill
                    className={`object-cover ${IMAGE_HOVER_CLASS}`}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <h3 className="mb-3 font-serif text-xl font-light text-[#111111] md:text-2xl">
                  {feature.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-[#4A4A4A] md:text-base">
                  {feature.description}
                </p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
