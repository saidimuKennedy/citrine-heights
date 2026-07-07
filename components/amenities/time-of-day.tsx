"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./amenities-primitives";
import type { AmenitiesContent } from "@/lib/amenities-content";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface TimeOfDayProps {
  timeOfDay: AmenitiesContent["timeOfDay"];
}

export function TimeOfDay({ timeOfDay }: TimeOfDayProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMoment = timeOfDay.moments[activeIndex];

  return (
    <section className="bg-[#111111] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-12 md:mb-16">
          <EditorialLabel>{timeOfDay.label}</EditorialLabel>
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-5xl lg:text-6xl">
            {timeOfDay.headline}
          </h2>
        </MotionReveal>

        <div className="mb-10 flex flex-wrap gap-2 md:gap-3">
          {timeOfDay.moments.map((moment, idx) => {
            const isActive = idx === activeIndex;

            return (
              <button
                key={moment.period}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-5 py-3 text-[10px] font-semibold tracking-[0.28em] transition-all duration-500 md:px-7 md:py-3.5 md:text-[11px] ${
                  isActive
                    ? "bg-[#C6A46A] text-[#111111]"
                    : "border border-white/15 text-white/50 hover:border-[#C6A46A]/40 hover:text-white/80"
                }`}
                aria-pressed={isActive}
              >
                {moment.label.toUpperCase()}
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[480px] overflow-hidden md:min-h-[560px]">
          <AnimatePresence mode="wait">
            {activeMoment && (
              <motion.div
                key={activeMoment.period}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/4]">
                  <motion.div
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeMoment.image.src}
                      alt={activeMoment.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                >
                  <p className="mb-5 text-xs font-semibold tracking-[0.35em] text-[#C6A46A]">
                    {activeMoment.label.toUpperCase()}
                  </p>
                  <p className="font-serif text-3xl font-light leading-snug text-[#F8F6F2] md:text-4xl lg:text-5xl">
                    {activeMoment.narrative}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 flex gap-2">
          {timeOfDay.moments.map((moment, idx) => (
            <button
              key={`progress-${moment.period}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className="group flex-1 py-2"
              aria-label={`View ${moment.label}`}
            >
              <div
                className={`h-px w-full transition-all duration-500 ${
                  idx === activeIndex
                    ? "bg-[#C6A46A]"
                    : "bg-white/15 group-hover:bg-white/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
