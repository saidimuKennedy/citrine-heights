"use client";

import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import type { GalleryItem } from "@/types";
import { MotionReveal } from "./motion-reveal";

interface GalleryDividerProps {
  item: GalleryItem;
}

export function GalleryDivider({ item }: GalleryDividerProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[480px] overflow-hidden bg-[#0E0E10] md:h-[85vh]"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#0E0E10]/55" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <MotionReveal y={24}>
          <p className="mb-5 text-[10px] font-semibold tracking-[0.4em] text-[#C8A46B]">
            EVERY ANGLE
          </p>
          <h2 className="max-w-4xl font-serif text-4xl font-light leading-tight text-[#F7F4EF] md:text-6xl lg:text-7xl">
            Designed To Impress.
          </h2>
        </MotionReveal>
      </div>
    </section>
  );
}
