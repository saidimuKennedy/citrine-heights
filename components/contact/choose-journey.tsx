"use client";

import { motion } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { ContactLabel, GoldRule, SectionContainer } from "./contact-primitives";
import type { ContactContent, JourneyId } from "@/lib/contact-content";

interface ChooseJourneyProps {
  journeys: ContactContent["journeys"];
  selected: JourneyId | null;
  onSelect: (id: JourneyId) => void;
}

export function ChooseJourney({
  journeys,
  selected,
  onSelect,
}: ChooseJourneyProps) {
  return (
    <SectionContainer id="choose-journey" className="bg-[#111111]">
      <MotionReveal y={24} className="mb-14 md:mb-20">
        <ContactLabel>{journeys.label}</ContactLabel>
        <GoldRule className="mb-8" />
        <h2 className="max-w-2xl font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-5xl">
          {journeys.headline}
        </h2>
      </MotionReveal>

      <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {journeys.paths.map((path, index) => {
          const isSelected = selected === path.id;
          return (
            <MotionReveal key={path.id} y={20} delay={index * 0.06}>
              <motion.button
                type="button"
                onClick={() => onSelect(path.id)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className={`w-full border p-8 text-left transition-all duration-700 md:p-10 ${
                  isSelected
                    ? "border-[#C6A46A] bg-[#C6A46A]/10"
                    : "border-white/10 bg-white/[0.02] hover:border-[#C6A46A]/40"
                }`}
              >
                <span
                  className={`mb-4 block text-[10px] font-semibold tracking-[0.3em] ${
                    isSelected ? "text-[#C6A46A]" : "text-white/30"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 font-serif text-xl font-light text-[#F8F6F2] md:text-2xl">
                  {path.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-white/50">
                  {path.description}
                </p>
              </motion.button>
            </MotionReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
