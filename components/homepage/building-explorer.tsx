"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, SectionHeading } from "./homepage-primitives";
import type { HomepageContent } from "@/lib/homepage-content";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface BuildingExplorerProps {
  explorer: HomepageContent["buildingExplorer"];
}

export function BuildingExplorer({ explorer }: BuildingExplorerProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeFloor =
    explorer.floors.find((f) => f.id === activeId) ?? explorer.floors[0];

  return (
    <section className="overflow-hidden bg-[#111111] px-6 py-28 text-[#F7F4EF] md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-16 md:mb-20">
          <EditorialLabel>{explorer.label.toUpperCase()}</EditorialLabel>
          <SectionHeading light>{explorer.headline}</SectionHeading>
        </MotionReveal>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto aspect-[3/5] w-full max-w-sm">
            <Image
              src={explorer.towerImage.src}
              alt={explorer.towerImage.alt}
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 1024px) 80vw, 400px"
            />

            {explorer.floors.map((floor) => (
              <button
                key={floor.id}
                type="button"
                onMouseEnter={() => setActiveId(floor.id)}
                onFocus={() => setActiveId(floor.id)}
                onMouseLeave={() => setActiveId(null)}
                onBlur={() => setActiveId(null)}
                className={`absolute left-[28%] right-[28%] h-[6%] transition-all duration-500 ${
                  activeId === floor.id
                    ? "bg-[#C6A46A]/35 ring-1 ring-[#C6A46A]/60"
                    : "bg-transparent hover:bg-[#C6A46A]/15"
                }`}
                style={{ top: `${floor.y}%` }}
                aria-label={`${floor.label} — ${floor.floor}`}
              />
            ))}

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111111] to-transparent"
              aria-hidden
            />
          </div>

          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFloor.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="mb-3 text-[10px] font-semibold tracking-[0.35em] text-[#C6A46A]">
                  {activeFloor.floor.toUpperCase()}
                </p>
                <h3 className="mb-5 font-serif text-3xl font-light tracking-tight md:text-4xl">
                  {activeFloor.label}
                </h3>
                <p className="max-w-md text-sm font-light leading-[1.85] text-white/60 md:text-base">
                  {activeFloor.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap gap-2">
              {explorer.floors.map((floor) => (
                <button
                  key={`chip-${floor.id}`}
                  type="button"
                  onClick={() => setActiveId(floor.id)}
                  className={`px-4 py-2 text-[9px] font-semibold tracking-[0.22em] transition-all duration-500 ${
                    activeId === floor.id
                      ? "bg-[#C6A46A] text-[#111111]"
                      : "border border-white/15 text-white/50 hover:border-[#C6A46A]/40"
                  }`}
                >
                  {floor.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
