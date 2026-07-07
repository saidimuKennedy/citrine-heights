"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Maximize2 } from "lucide-react";
import { motion } from "motion/react";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "@/components/overview/overview-primitives";
import { FloorPlanLightbox } from "./floor-plan-lightbox";
import type { ResidenceType } from "@/lib/residences-content";

interface FloorPlansSectionProps {
  label: string;
  headline: string;
  residences: ResidenceType[];
  projectSlug: string;
}

export function FloorPlansSection({
  label,
  headline,
  residences,
  projectSlug,
}: FloorPlansSectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="floor-plans" className="bg-[#101010] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-7xl">
        <MotionReveal y={24} className="mb-16 md:mb-24">
          <EditorialLabel>{label}</EditorialLabel>
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-5xl lg:text-6xl">
            {headline}
          </h2>
        </MotionReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {residences.map((residence, idx) => (
            <MotionReveal key={residence.id} y={28} delay={0.06 * idx}>
              <motion.article
                className="group relative flex flex-col overflow-hidden border border-white/8 bg-[#161616] transition-all duration-700 hover:border-[#C6A46A]/25"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(idx)}
                  className="relative aspect-[4/3] w-full overflow-hidden text-left"
                  aria-label={`View ${residence.title} floor plan fullscreen`}
                >
                  <Image
                    src={residence.floorPlan.image.src}
                    alt={residence.floorPlan.image.alt}
                    fill
                    className={`object-cover brightness-90 ${IMAGE_HOVER_CLASS}`}
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#101010]/20 transition-colors duration-700 group-hover:bg-[#101010]/10" />
                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/20 bg-[#101010]/60 text-[#F8F6F2] opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </button>

                <div className="flex flex-col gap-4 p-6">
                  <div>
                    <h3 className="mb-2 font-serif text-2xl font-light text-[#F8F6F2]">
                      {residence.title}
                    </h3>
                    <p className="text-xs font-light tracking-wide text-white/50">
                      {residence.specs.size} · {residence.specs.beds} bed ·{" "}
                      {residence.specs.baths} bath
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href={`/${projectSlug}#contact`}
                      className="inline-flex items-center gap-2 text-[9px] font-semibold tracking-[0.2em] text-[#C6A46A] transition-colors duration-500 hover:text-[#F8F6F2]"
                    >
                      <Download className="h-3.5 w-3.5" />
                      DOWNLOAD PDF
                    </a>
                    <button
                      type="button"
                      onClick={() => openLightbox(idx)}
                      className="inline-flex items-center gap-2 text-[9px] font-semibold tracking-[0.2em] text-white/50 transition-colors duration-500 hover:text-[#F8F6F2]"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      VIEW FULLSCREEN
                    </button>
                  </div>
                </div>
              </motion.article>
            </MotionReveal>
          ))}
        </div>
      </div>

      <FloorPlanLightbox
        residences={residences}
        index={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
