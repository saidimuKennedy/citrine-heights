"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, SectionHeading } from "./homepage-primitives";
import type { HomepageContent } from "@/lib/homepage-content";

interface DeveloperTrustProps {
  trust: HomepageContent["trust"];
}

function renderIcon(iconName: string) {
  const icons = Icons as unknown as Record<
    string,
    ComponentType<{ className?: string }>
  >;
  const Icon = icons[iconName];
  return Icon ? (
    <Icon className="h-4 w-4 stroke-[1.25] text-[#C6A46A]" />
  ) : (
    <Icons.Award className="h-4 w-4 stroke-[1.25] text-[#C6A46A]" />
  );
}

export function DeveloperTrust({ trust }: DeveloperTrustProps) {
  return (
    <section className="border-t border-[#111111]/8 bg-[#F7F4EF] px-6 py-28 text-[#111111] md:px-16 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <MotionReveal y={24}>
            <EditorialLabel>{trust.label.toUpperCase()}</EditorialLabel>
            <p className="mb-8 font-serif text-3xl font-light tracking-wide text-[#C6A46A] md:text-4xl">
              {trust.developer}
            </p>
            <SectionHeading className="mb-0">{trust.headline}</SectionHeading>
          </MotionReveal>

          <div className="flex flex-col justify-end gap-12">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {trust.stats.map((stat, idx) => (
                <MotionReveal
                  key={stat.label}
                  y={20}
                  delay={0.08 * idx}
                  className="text-center sm:text-left"
                >
                  <span className="mb-2 block font-serif text-5xl font-light text-[#111111] md:text-6xl">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.25em] text-[#4F4F4F]">
                    {stat.label.toUpperCase()}
                  </span>
                </MotionReveal>
              ))}
            </div>

            <MotionReveal y={20} delay={0.1}>
              <div className="flex flex-wrap gap-3">
                {trust.resources.map((resource) => (
                  <Link
                    key={resource.label}
                    href={resource.href}
                    className="group flex items-center gap-3 border-b border-[#111111]/15 pb-3 pr-6 transition-all duration-500 hover:border-[#C6A46A]"
                  >
                    {renderIcon(resource.icon)}
                    <span className="text-[10px] font-semibold tracking-[0.22em] text-[#111111] group-hover:text-[#C6A46A] md:text-[11px]">
                      {resource.label.toUpperCase()}
                    </span>
                  </Link>
                ))}
              </div>
              <p className="mt-10 text-[10px] font-medium tracking-[0.2em] text-[#4F4F4F]">
                {trust.registration}
              </p>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
