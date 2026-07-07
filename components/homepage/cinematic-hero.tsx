"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import type { HomepageContent } from "@/lib/homepage-content";

const EASE = [0.25, 0.1, 0.25, 1] as const;
type TimeKey = "day" | "sunset" | "night";

interface CinematicHeroProps {
  hero: HomepageContent["hero"];
}

const TIME_KEYS: TimeKey[] = ["day", "sunset", "night"];

export function CinematicHero({ hero }: CinematicHeroProps) {
  const [activeTime, setActiveTime] = useState<TimeKey>("sunset");
  const activeImage = hero.timeOfDay[activeTime].image;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#111111]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTime}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute inset-0"
        >
          <div className="hero-ambient-zoom absolute inset-0">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              className="object-cover object-[center_35%]"
              sizes="100vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/15 to-[#111111]/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,rgba(17,17,17,0.35)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-end px-6 pb-24 pt-32 text-center md:pb-32 md:pt-40">
        <MotionReveal y={20}>
          <p className="mb-5 text-[10px] font-semibold tracking-[0.5em] text-[#C6A46A] md:text-xs">
            {hero.title}
          </p>
        </MotionReveal>

        <MotionReveal y={28} delay={0.14}>
          <h1 className="mb-5 whitespace-pre-line font-serif text-5xl font-light leading-[0.92] tracking-tight text-[#F7F4EF] md:text-7xl lg:text-8xl xl:text-[6rem]">
            {hero.headline}
          </h1>
        </MotionReveal>

        <MotionReveal y={20} delay={0.22}>
          <p className="mx-auto mb-10 max-w-md whitespace-pre-line text-sm font-light leading-relaxed text-white/65 md:mb-12 md:max-w-lg md:text-base">
            {hero.tagline}
          </p>
        </MotionReveal>

        <MotionReveal y={16} delay={0.3}>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-4 md:mb-16">
            <Link
              href={hero.primaryCta.href}
              className="border border-[#C6A46A]/50 px-8 py-4 text-[10px] font-semibold tracking-[0.28em] text-[#F7F4EF] backdrop-blur-sm transition-all duration-500 hover:border-[#C6A46A] hover:bg-[#C6A46A]/10 md:px-10 md:text-[11px]"
            >
              {hero.primaryCta.label.toUpperCase()}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="bg-[#C6A46A] px-8 py-4 text-[10px] font-semibold tracking-[0.28em] text-[#111111] transition-all duration-500 hover:bg-[#d4b47a] md:px-10 md:text-[11px]"
            >
              {hero.secondaryCta.label.toUpperCase()}
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal y={12} delay={0.38}>
          <div
            className="flex items-center justify-center"
            role="group"
            aria-label="Skyline time of day"
          >
            {TIME_KEYS.map((key, idx) => (
              <div key={key} className="flex items-center">
                {idx > 0 && (
                  <span
                    className="mx-5 h-3 w-px bg-white/15 md:mx-6"
                    aria-hidden
                  />
                )}
                <button
                  type="button"
                  onClick={() => setActiveTime(key)}
                  className={`relative pb-1 text-[10px] font-semibold tracking-[0.35em] transition-colors duration-500 md:text-[11px] ${
                    activeTime === key
                      ? "text-[#C6A46A]"
                      : "text-white/35 hover:text-white/65"
                  }`}
                  aria-pressed={activeTime === key}
                >
                  {hero.timeOfDay[key].label.toUpperCase()}
                  {activeTime === key && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#C6A46A]/80"
                      aria-hidden
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>

      <div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden
      >
        <span className="text-[9px] tracking-[0.35em] text-white/25">SCROLL</span>
        <div className="h-10 w-px bg-gradient-to-b from-white/35 to-transparent" />
      </div>
    </section>
  );
}
