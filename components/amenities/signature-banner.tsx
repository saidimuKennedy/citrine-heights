"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import type { AmenitiesContent } from "@/lib/amenities-content";

interface SignatureBannerProps {
  signatureBanner: AmenitiesContent["signatureBanner"];
}

export function SignatureBanner({ signatureBanner }: SignatureBannerProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[85svh] min-h-[520px] w-full overflow-hidden bg-[#111111] md:h-[92svh]"
    >
      <motion.div className="absolute inset-0 scale-110" style={{ y: imageY }}>
        <Image
          src={signatureBanner.image.src}
          alt={signatureBanner.image.alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/30 to-[#111111]/45" />

      <div className="relative z-10 flex h-full items-end px-6 pb-20 md:px-16 md:pb-28 lg:px-24">
        <MotionReveal y={30}>
          <h2 className="max-w-4xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-6xl lg:text-7xl">
            {signatureBanner.overlay}
          </h2>
        </MotionReveal>
      </div>
    </section>
  );
}
