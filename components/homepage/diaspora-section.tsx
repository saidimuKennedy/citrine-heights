"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import type { HomepageContent } from "@/lib/homepage-content";

interface DiasporaSectionProps {
  diaspora: HomepageContent["diaspora"];
}

export function DiasporaSection({ diaspora }: DiasporaSectionProps) {
  return (
    <section
      id="diaspora"
      className="relative overflow-hidden border-t border-[#111111]/8 bg-[#F7F4EF] text-[#111111]"
    >
      <div className="grid min-h-[70svh] grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-28 md:px-16 md:py-40 lg:px-20">
          <MotionReveal y={24}>
            <p className="mb-5 text-[10px] font-semibold tracking-[0.4em] text-[#C6A46A]">
              {diaspora.label.toUpperCase()}
            </p>
            <h2 className="mb-8 whitespace-pre-line font-serif text-4xl font-light leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
              {diaspora.headline}
            </h2>
            <p className="max-w-md text-sm font-light leading-[1.9] text-[#4F4F4F] md:text-base">
              {diaspora.paragraph}
            </p>
          </MotionReveal>
        </div>

        <div className="relative min-h-[40svh] lg:min-h-0">
          <Image
            src="/projects/citrine-heights/gallery/table.png"
            alt="Virtual viewing and international buyer consultation"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F4EF] via-[#F7F4EF]/20 to-transparent lg:from-[#F7F4EF]/80" />
        </div>
      </div>

      <div className="border-t border-[#111111]/8 px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3">
            {diaspora.points.map((point, idx) => (
              <MotionReveal
                key={point.title}
                y={20}
                delay={0.05 * idx}
                className="border-t border-[#111111]/10 px-0 py-10 md:border-l md:border-t-0 md:px-10 md:py-0 first:md:border-l-0 lg:px-12"
              >
                <span className="mb-4 block font-serif text-3xl font-light text-[#C6A46A]/50">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 font-serif text-xl font-light tracking-tight md:text-2xl">
                  {point.title}
                </h3>
                <p className="text-sm font-light leading-[1.85] text-[#4F4F4F]">
                  {point.description}
                </p>
              </MotionReveal>
            ))}
          </div>

          <MotionReveal y={16} delay={0.2} className="mt-16 text-center md:mt-20">
            <Link
              href="#contact"
              className="inline-flex border border-[#111111]/20 px-10 py-4 text-[10px] font-semibold tracking-[0.28em] text-[#111111] transition-all duration-500 hover:border-[#C6A46A] hover:text-[#C6A46A] md:text-[11px]"
            >
              SPEAK WITH OUR DIASPORA TEAM
            </Link>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
