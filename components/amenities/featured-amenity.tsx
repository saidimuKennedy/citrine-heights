"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./amenities-primitives";
import type { AmenitiesContent } from "@/lib/amenities-content";

interface FeaturedAmenityProps {
  featured: AmenitiesContent["featured"];
}

export function FeaturedAmenity({ featured }: FeaturedAmenityProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#111111]"
    >
      <div className="relative h-[75svh] min-h-[520px] w-full md:h-[88svh]">
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale, y: imageY }}
        >
          <Image
            src={featured.image.src}
            alt={featured.image.alt}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-[#111111]/50" />
      </div>

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-16 md:pb-28 lg:px-24">
          <MotionReveal y={28}>
            <EditorialLabel>{featured.label}</EditorialLabel>
            <h2 className="mb-8 max-w-3xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-6xl lg:text-7xl">
              {featured.title}
            </h2>
            <p className="max-w-xl text-base font-light leading-relaxed text-white/65 md:text-lg">
              {featured.narrative}
            </p>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
