"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";

interface SignatureImageProps {
  src: string;
  alt: string;
  overlay: string;
}

export function SignatureImage({ src, alt, overlay }: SignatureImageProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[85svh] min-h-[520px] w-full overflow-hidden bg-[#0E0E10] md:h-[92svh]"
    >
      <motion.div className="absolute inset-0 scale-110" style={{ y: imageY }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10]/80 via-[#0E0E10]/25 to-[#0E0E10]/40" />

      <div className="relative z-10 flex h-full items-end px-6 pb-20 md:px-16 md:pb-28 lg:px-24">
        <MotionReveal y={30}>
          <h2 className="max-w-4xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F7F4EF] md:text-6xl lg:text-7xl">
            {overlay}
          </h2>
        </MotionReveal>
      </div>
    </section>
  );
}
