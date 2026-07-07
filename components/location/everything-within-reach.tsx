"use client";

import { motion } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./location-primitives";
import type { LocationContent } from "@/lib/location-content";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface EverythingWithinReachProps {
  withinReach: LocationContent["withinReach"];
}

export function EverythingWithinReach({
  withinReach,
}: EverythingWithinReachProps) {
  const items = withinReach.items;
  const angleStep = 360 / items.length;

  return (
    <section className="bg-[#111111] px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-6 text-center md:mb-8">
          <EditorialLabel className="mb-5">{withinReach.label}</EditorialLabel>
          <h2 className="mx-auto max-w-3xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-5xl lg:text-6xl">
            {withinReach.headline}
          </h2>
        </MotionReveal>

        <MotionReveal y={16} delay={0.08}>
          <p className="mx-auto mb-16 max-w-2xl text-center text-base font-light leading-relaxed text-white/50 md:mb-20 md:text-lg">
            {withinReach.description}
          </p>
        </MotionReveal>

        <div className="relative mx-auto aspect-square w-full max-w-[640px]">
          <div className="absolute inset-[12%] rounded-full border border-[#C6A46A]/20" />
          <div className="absolute inset-[24%] rounded-full border border-white/8" />
          <div className="absolute inset-[36%] rounded-full border border-white/5" />

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="mb-2 flex justify-center">
              <span className="h-4 w-4 rotate-45 border border-[#C6A46A] bg-[#111111]" />
            </div>
            <p className="text-[10px] font-semibold tracking-[0.35em] text-[#C6A46A]">
              CITRINE
            </p>
            <p className="text-[9px] tracking-[0.25em] text-white/40">10 MIN RADIUS</p>
          </div>

          {items.map((item, idx) => {
            const angle = angleStep * idx - 90;
            const radius = 42;
            const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: idx * 0.06 }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 text-center"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="min-w-[88px] border border-white/10 bg-[#111111]/90 px-3 py-3 backdrop-blur-sm md:min-w-[100px] md:px-4 md:py-4">
                  <p className="mb-1 text-[8px] font-semibold tracking-[0.2em] text-[#C6A46A] md:text-[9px]">
                    {item.category.toUpperCase()}
                  </p>
                  <p className="font-serif text-sm font-light text-[#F8F6F2] md:text-base">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[10px] text-white/40">{item.travelTime}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
