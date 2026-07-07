"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "@/components/overview/overview-primitives";
import type { ResidenceType } from "@/lib/residences-content";

interface ResidenceSelectorProps {
  label: string;
  headline: string;
  residences: ResidenceType[];
  selectedIds: string[];
  onToggleCompare: (id: string) => void;
  onSelectResidence: (id: string) => void;
  maxCompare: number;
}

export function ResidenceSelector({
  label,
  headline,
  residences,
  selectedIds,
  onToggleCompare,
  onSelectResidence,
  maxCompare,
}: ResidenceSelectorProps) {
  return (
    <section
      id="choose-residence"
      className="bg-[#F8F6F2] px-6 py-28 md:px-16 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-16 md:mb-24">
          <EditorialLabel>{label}</EditorialLabel>
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#101010] md:text-5xl lg:text-6xl">
            {headline}
          </h2>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {residences.map((residence, idx) => {
            const isSelected = selectedIds.includes(residence.id);
            const compareFull =
              selectedIds.length >= maxCompare && !isSelected;

            return (
              <MotionReveal key={residence.id} y={28} delay={0.06 * idx}>
                <motion.article
                  className="group relative flex h-full cursor-pointer flex-col overflow-hidden border border-[#101010]/8 bg-white/40 transition-all duration-700 hover:-translate-y-1 hover:border-[#C6A46A]/30"
                  onClick={() => onSelectResidence(residence.id)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={residence.previewImage.src}
                      alt={residence.previewImage.alt}
                      fill
                      className={`object-cover brightness-[0.92] ${IMAGE_HOVER_CLASS}`}
                      sizes="(max-width: 640px) 100vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/70 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-serif text-2xl font-light text-[#F8F6F2]">
                        {residence.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-6 flex-1 text-sm font-light leading-relaxed text-[#5A5A5A]">
                      {residence.lifestyle}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!compareFull) onToggleCompare(residence.id);
                      }}
                      disabled={compareFull}
                      className={`inline-flex items-center gap-2 self-start border px-3 py-1.5 text-[9px] font-semibold tracking-[0.2em] transition-all duration-500 ${
                        isSelected
                          ? "border-[#C6A46A] bg-[#C6A46A]/10 text-[#101010]"
                          : compareFull
                            ? "cursor-not-allowed border-[#101010]/10 text-[#5A5A5A]/40"
                            : "border-[#101010]/15 text-[#5A5A5A] hover:border-[#C6A46A] hover:text-[#101010]"
                      }`}
                      aria-pressed={isSelected}
                      aria-label={`${isSelected ? "Remove" : "Add"} ${residence.title} to comparison`}
                    >
                      {isSelected && <Check className="h-3 w-3 text-[#C6A46A]" />}
                      {isSelected ? "SELECTED" : "COMPARE"}
                    </button>
                  </div>
                </motion.article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
