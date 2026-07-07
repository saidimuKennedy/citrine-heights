"use client";

import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "./location-primitives";
import type { LocationContent } from "@/lib/location-content";

interface ConnectivityProps {
  connectivity: LocationContent["connectivity"];
}

export function Connectivity({ connectivity }: ConnectivityProps) {
  return (
    <section className="bg-[#F8F6F2] px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-4xl">
        <MotionReveal y={24} className="mb-16 text-center md:mb-20">
          <EditorialLabel className="mb-5">{connectivity.label}</EditorialLabel>
          <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl">
            {connectivity.headline}
          </h2>
        </MotionReveal>

        <div className="flex flex-col items-center">
          {connectivity.nodes.map((node, idx) => (
            <MotionReveal key={node.name} y={20} delay={idx * 0.06} className="w-full">
              <div className="flex flex-col items-center py-6 text-center md:py-8">
                <h3 className="font-serif text-2xl font-light tracking-tight text-[#111111] md:text-3xl lg:text-4xl">
                  {node.name}
                </h3>
                {node.description && (
                  <p className="mt-2 max-w-sm text-sm font-light text-[#555555]">
                    {node.description}
                  </p>
                )}
              </div>
              {idx < connectivity.nodes.length - 1 && (
                <div className="flex justify-center py-1" aria-hidden>
                  <div className="h-10 w-px bg-gradient-to-b from-[#C6A46A]/60 to-[#C6A46A]/20" />
                </div>
              )}
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
