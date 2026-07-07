"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./location-primitives";
import type { LocationContent, MapPin, MapPinCategory } from "@/lib/location-content";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface NeighbourhoodExplorerProps {
  map: LocationContent["map"];
}

export function NeighbourhoodExplorer({ map }: NeighbourhoodExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<MapPinCategory | "all">("all");
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);

  const visiblePins = useMemo(() => {
    if (activeCategory === "all") return map.pins;
    return map.pins.filter((pin) => pin.category === activeCategory);
  }, [activeCategory, map.pins]);

  return (
    <section id="neighbourhood-map" className="bg-[#111111] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <MotionReveal y={24} className="mb-10 md:mb-14">
          <EditorialLabel>{map.label}</EditorialLabel>
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-5xl lg:text-6xl">
            {map.headline}
          </h2>
        </MotionReveal>

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveCategory("all");
              setSelectedPin(null);
            }}
            className={`px-4 py-2.5 text-[10px] font-semibold tracking-[0.22em] transition-all duration-500 md:px-5 md:text-[11px] ${
              activeCategory === "all"
                ? "bg-[#C6A46A] text-[#111111]"
                : "border border-white/15 text-white/50 hover:border-[#C6A46A]/40 hover:text-white/80"
            }`}
          >
            ALL
          </button>
          {map.categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                setActiveCategory(category.id);
                setSelectedPin(null);
              }}
              className={`px-4 py-2.5 text-[10px] font-semibold tracking-[0.22em] transition-all duration-500 md:px-5 md:text-[11px] ${
                activeCategory === category.id
                  ? "bg-[#C6A46A] text-[#111111]"
                  : "border border-white/15 text-white/50 hover:border-[#C6A46A]/40 hover:text-white/80"
              }`}
            >
              {category.label.toUpperCase()}
            </button>
          ))}
        </div>

        <MotionReveal y={28} delay={0.1}>
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10 bg-[#0E0E10] md:aspect-[21/9]">
            <iframe
              title="Westlands neighbourhood map"
              src={map.embedUrl}
              className="absolute inset-0 h-full w-full border-0 opacity-60 [filter:grayscale(0.4)_brightness(0.65)_contrast(1.1)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-[#111111]/20" />

            <div className="absolute inset-0">
              <AnimatePresence>
                {visiblePins.map((pin, idx) => {
                  const isSelected = selectedPin?.id === pin.id;

                  return (
                    <motion.button
                      key={pin.id}
                      type="button"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.5, ease: EASE, delay: idx * 0.04 }}
                      onClick={() => setSelectedPin(isSelected ? null : pin)}
                      className="pointer-events-auto absolute z-10 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      aria-label={`${pin.name}, ${pin.travelTime}`}
                    >
                      <span
                        className={`relative flex h-4 w-4 items-center justify-center rounded-full transition-all duration-500 md:h-5 md:w-5 ${
                          isSelected
                            ? "bg-[#C6A46A] shadow-[0_0_0_8px_rgba(198,164,106,0.25)]"
                            : "bg-[#C6A46A] shadow-[0_0_0_4px_rgba(198,164,106,0.15)] hover:shadow-[0_0_0_8px_rgba(198,164,106,0.3)]"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#111111] md:h-2 md:w-2" />
                      </span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {selectedPin && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute bottom-6 left-6 right-6 z-20 border border-white/10 bg-[#111111]/95 p-6 backdrop-blur-md md:left-auto md:right-8 md:max-w-sm md:p-8"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-1 text-[10px] font-semibold tracking-[0.28em] text-[#C6A46A]">
                        {selectedPin.category.toUpperCase()}
                      </p>
                      <h3 className="font-serif text-2xl font-light text-[#F8F6F2]">
                        {selectedPin.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPin(null)}
                      className="text-white/40 transition-colors hover:text-white"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="mb-4 text-sm font-light leading-relaxed text-white/55">
                    {selectedPin.description}
                  </p>
                  <p className="font-serif text-2xl font-light text-[#C6A46A]">
                    {selectedPin.travelTime}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center">
                <span className="mb-2 h-3 w-3 rotate-45 border border-[#C6A46A] bg-[#111111]" />
                <span className="bg-[#111111]/90 px-3 py-1 text-[9px] font-semibold tracking-[0.3em] text-[#C6A46A]">
                  CITRINE HEIGHTS
                </span>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
