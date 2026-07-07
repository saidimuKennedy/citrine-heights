"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { EditorialLabel, TextLink } from "./homepage-primitives";
import type { ResidenceType } from "@/lib/residences-content";

interface SignatureResidencesProps {
  residences: ResidenceType[];
  slug: string;
}

export function SignatureResidences({
  residences,
  slug,
}: SignatureResidencesProps) {
  const chapters = residences.filter((r) =>
    ["studio", "one-bedroom", "two-bedroom", "penthouse"].includes(r.id),
  );

  return (
    <section id="residences" className="bg-[#F7F4EF] text-[#111111]">
      <div className="border-b border-[#111111]/8 px-6 py-20 md:px-16 md:py-28">
        <MotionReveal y={24} className="mx-auto max-w-7xl">
          <EditorialLabel>SIGNATURE RESIDENCES</EditorialLabel>
          <h2 className="max-w-3xl font-serif text-4xl font-light leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Each residence,
            <br />
            a chapter of its own.
          </h2>
        </MotionReveal>
      </div>

      {chapters.map((residence, idx) => (
        <article
          key={residence.id}
          className="group border-b border-[#111111]/8 last:border-b-0"
        >
          <div className="px-6 pt-16 md:px-16 md:pt-24">
            <MotionReveal y={20} className="mx-auto max-w-7xl">
              <span className="mb-4 block text-[10px] font-semibold tracking-[0.35em] text-[#C6A46A]">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-5xl font-light tracking-tight md:text-7xl lg:text-8xl">
                {residence.title}
              </h3>
            </MotionReveal>
          </div>

          <MotionReveal y={0} delay={0.08} className="relative mt-10 md:mt-14">
            <div className="relative mx-auto aspect-[16/10] max-w-7xl overflow-hidden md:aspect-[21/9] md:min-h-[62svh]">
              <Image
                src={residence.collectionImage.src}
                alt={residence.collectionImage.alt}
                fill
                className={`object-cover ${IMAGE_HOVER_CLASS}`}
                sizes="100vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#111111]/50 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                aria-hidden
              />
            </div>
          </MotionReveal>

          <div className="px-6 py-12 md:px-16 md:py-16">
            <MotionReveal y={16} delay={0.1} className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-lg text-sm font-light leading-[1.9] text-[#4F4F4F] md:text-base">
                {residence.lifestyle}
              </p>
              <div className="flex shrink-0 flex-wrap items-center gap-8">
                <div className="flex flex-wrap gap-6 text-[10px] font-semibold tracking-[0.22em] text-[#111111]/45">
                  <span>{residence.specs.size}</span>
                  <span>{residence.specs.beds}</span>
                  <span>{residence.specs.baths} Bath</span>
                </div>
                <TextLink href={`/${slug}/residences`}>VIEW RESIDENCE</TextLink>
              </div>
            </MotionReveal>
          </div>

          {idx < chapters.length - 1 && (
            <div className="flex justify-center pb-8 md:pb-12" aria-hidden>
              <div className="h-12 w-px bg-gradient-to-b from-[#C6A46A]/60 to-transparent" />
            </div>
          )}
        </article>
      ))}

      <div className="px-6 py-20 text-center md:px-16 md:py-28">
        <Link
          href={`/${slug}/residences`}
          className="inline-flex border border-[#111111]/20 px-12 py-5 text-[10px] font-semibold tracking-[0.28em] text-[#111111] transition-all duration-500 hover:border-[#C6A46A] hover:text-[#C6A46A] md:text-[11px]"
        >
          EXPLORE ALL RESIDENCES
        </Link>
      </div>
    </section>
  );
}
