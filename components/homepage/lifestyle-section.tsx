"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import {
  EditorialLabel,
  SectionHeading,
  TextLink,
} from "./homepage-primitives";
import type { HomepageContent } from "@/lib/homepage-content";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface LifestyleSectionProps {
  lifestyle: HomepageContent["lifestyle"];
}

export function LifestyleSection({ lifestyle }: LifestyleSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMoment = lifestyle.timeline[activeIndex];

  return (
    <section
      id="amenities"
      className="bg-[#111111] px-6 py-28 text-[#F7F4EF] md:px-16 md:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-16 md:mb-28">
          <EditorialLabel>{lifestyle.label.toUpperCase()}</EditorialLabel>
          <SectionHeading light className="max-w-2xl">
            {lifestyle.headline}
          </SectionHeading>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="flex flex-col">
              {lifestyle.timeline.map((moment, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div key={moment.time}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`group w-full border-t border-white/10 py-7 text-left transition-all duration-500 first:border-t-0 lg:py-9 ${
                        isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                      }`}
                      aria-pressed={isActive}
                    >
                      <span className="mb-2 block font-serif text-3xl font-light text-[#C6A46A] md:text-4xl">
                        {moment.time}
                      </span>
                      <span className="block font-serif text-xl font-light leading-snug md:text-2xl">
                        {moment.title}
                      </span>
                    </button>
                    {idx < lifestyle.timeline.length - 1 && (
                      <div
                        className="flex justify-center py-1 lg:hidden"
                        aria-hidden
                      >
                        <div className="h-6 w-px bg-gradient-to-b from-[#C6A46A]/50 to-transparent" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[420px] lg:col-span-8 lg:min-h-[560px]">
            <AnimatePresence mode="wait">
              {activeMoment && (
                <motion.div
                  key={activeMoment.time}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full min-h-[420px] overflow-hidden lg:min-h-[560px]">
                    <motion.div
                      initial={{ scale: 1.06 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.6, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeMoment.image.src}
                        alt={activeMoment.image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
                      <p className="max-w-lg text-sm font-light leading-[1.9] text-white/75 md:text-base">
                        {activeMoment.narrative}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <MotionReveal y={20} delay={0.1} className="mt-16 md:mt-20">
          <TextLink href={lifestyle.cta.href} variant="light">
            {lifestyle.cta.label.toUpperCase()}
          </TextLink>
        </MotionReveal>
      </div>
    </section>
  );
}
