"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { IMAGE_HOVER_CLASS } from "@/lib/editorial";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel, GoldRule } from "@/components/overview/overview-primitives";
import type { ResidenceType } from "@/lib/residences-content";

interface ResidenceCollectionProps {
  residences: ResidenceType[];
  selectedIds: string[];
  onToggleCompare: (id: string) => void;
  maxCompare: number;
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col border-t border-white/10 pt-4">
      <span className="mb-1 text-[9px] font-semibold tracking-[0.22em] text-white/45">
        {label}
      </span>
      <span className="font-serif text-xl font-light text-[#F8F6F2] md:text-2xl">
        {value}
      </span>
    </div>
  );
}

function ResidenceOverlay({
  residence,
  isSelected,
  compareFull,
  onToggleCompare,
}: {
  residence: ResidenceType;
  isSelected: boolean;
  compareFull: boolean;
  onToggleCompare: (id: string) => void;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101010]/95 via-[#101010]/70 to-transparent px-6 pb-10 pt-24 md:px-12 md:pb-14 md:pt-32">
      <MotionReveal y={24}>
        <EditorialLabel>{residence.title.toUpperCase()}</EditorialLabel>
        <GoldRule className="mb-6" />
        <h2 className="mb-4 max-w-2xl font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-4xl lg:text-5xl">
          {residence.lifestyle.split(".")[0]}.
        </h2>
        <p className="mb-8 max-w-xl text-sm font-light leading-relaxed text-white/60 md:text-base">
          {residence.lifestyle}
        </p>

        <div className="mb-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:gap-6">
          <SpecItem label="SIZE" value={residence.specs.size} />
          <SpecItem label="BEDS" value={residence.specs.beds} />
          <SpecItem label="BATHS" value={residence.specs.baths} />
          <SpecItem
            label="BALCONY"
            value={residence.specs.balcony ? "Yes" : "—"}
          />
          <SpecItem
            label="SMART HOME"
            value={residence.specs.smartHome ? "Yes" : "—"}
          />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="#floor-plans"
            className="inline-flex items-center gap-3 border-b border-white/20 pb-1 text-[10px] font-semibold tracking-[0.25em] text-[#F8F6F2] transition-all duration-500 hover:border-[#C6A46A] hover:text-[#C6A46A] md:text-[11px]"
          >
            VIEW FLOOR PLAN
            <span aria-hidden>→</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              if (!compareFull) onToggleCompare(residence.id);
            }}
            disabled={compareFull}
            className={`inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] transition-all duration-500 ${
              isSelected
                ? "text-[#C6A46A]"
                : compareFull
                  ? "cursor-not-allowed text-white/25"
                  : "text-white/50 hover:text-[#F8F6F2]"
            }`}
          >
            {isSelected && <Check className="h-3.5 w-3.5" />}
            {isSelected ? "IN COMPARISON" : "ADD TO COMPARE"}
          </button>
        </div>
      </MotionReveal>
    </div>
  );
}

function ResidenceFloatingCard({
  residence,
  isSelected,
  compareFull,
  onToggleCompare,
  align,
}: {
  residence: ResidenceType;
  isSelected: boolean;
  compareFull: boolean;
  onToggleCompare: (id: string) => void;
  align: "left" | "right";
}) {
  return (
    <div
      className={`relative z-10 -mt-20 px-6 md:-mt-32 md:px-12 ${
        align === "right" ? "flex justify-end" : ""
      }`}
    >
      <MotionReveal
        y={28}
        className="w-full max-w-lg border border-[#101010]/8 bg-[#F8F6F2] p-8 shadow-[0_24px_80px_-20px_rgba(14,14,16,0.2)] md:p-10"
      >
        <EditorialLabel>{residence.title.toUpperCase()}</EditorialLabel>
        <GoldRule className="mb-6" />
        <h2 className="mb-4 font-serif text-3xl font-light leading-[1.05] text-[#101010] md:text-4xl">
          {residence.lifestyle.split(".")[0]}.
        </h2>
        <p className="mb-8 text-sm font-light leading-relaxed text-[#5A5A5A] md:text-base">
          {residence.lifestyle}
        </p>

        <div className="mb-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
          <div className="flex flex-col border-t border-[#101010]/8 pt-4">
            <span className="mb-1 text-[9px] font-semibold tracking-[0.22em] text-[#5A5A5A]">
              SIZE
            </span>
            <span className="font-serif text-xl font-light text-[#101010]">
              {residence.specs.size}
            </span>
          </div>
          <div className="flex flex-col border-t border-[#101010]/8 pt-4">
            <span className="mb-1 text-[9px] font-semibold tracking-[0.22em] text-[#5A5A5A]">
              BEDS
            </span>
            <span className="font-serif text-xl font-light text-[#101010]">
              {residence.specs.beds}
            </span>
          </div>
          <div className="flex flex-col border-t border-[#101010]/8 pt-4">
            <span className="mb-1 text-[9px] font-semibold tracking-[0.22em] text-[#5A5A5A]">
              BATHS
            </span>
            <span className="font-serif text-xl font-light text-[#101010]">
              {residence.specs.baths}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="#floor-plans"
            className="inline-flex items-center gap-3 border-b border-[#101010]/15 pb-1 text-[10px] font-semibold tracking-[0.25em] text-[#101010] transition-all duration-500 hover:border-[#C6A46A] hover:text-[#C6A46A]"
          >
            VIEW FLOOR PLAN
            <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              if (!compareFull) onToggleCompare(residence.id);
            }}
            disabled={compareFull}
            className={`inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] transition-all duration-500 ${
              isSelected
                ? "text-[#C6A46A]"
                : compareFull
                  ? "cursor-not-allowed text-[#5A5A5A]/40"
                  : "text-[#5A5A5A] hover:text-[#101010]"
            }`}
          >
            {isSelected && <Check className="h-3.5 w-3.5" />}
            {isSelected ? "IN COMPARISON" : "ADD TO COMPARE"}
          </button>
        </div>
      </MotionReveal>
    </div>
  );
}

export function ResidenceCollection({
  residences,
  selectedIds,
  onToggleCompare,
  maxCompare,
}: ResidenceCollectionProps) {
  return (
    <section className="bg-[#F8F6F2]">
      {residences.map((residence, idx) => {
        const variant = idx % 3;
        const isSelected = selectedIds.includes(residence.id);
        const compareFull = selectedIds.length >= maxCompare && !isSelected;

        if (variant === 0) {
          return (
            <div
              key={residence.id}
              id={`residence-${residence.id}`}
              className="relative min-h-[85svh] w-full overflow-hidden"
            >
              <Image
                src={residence.collectionImage.src}
                alt={residence.collectionImage.alt}
                fill
                className={`object-cover ${IMAGE_HOVER_CLASS}`}
                sizes="100vw"
              />
              <ResidenceOverlay
                residence={residence}
                isSelected={isSelected}
                compareFull={compareFull}
                onToggleCompare={onToggleCompare}
              />
            </div>
          );
        }

        if (variant === 1) {
          return (
            <div
              key={residence.id}
              id={`residence-${residence.id}`}
              className="pb-16 md:pb-24"
            >
              <div className="group relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]">
                <Image
                  src={residence.collectionImage.src}
                  alt={residence.collectionImage.alt}
                  fill
                  className={`object-cover ${IMAGE_HOVER_CLASS}`}
                  sizes="100vw"
                />
              </div>
              <ResidenceFloatingCard
                residence={residence}
                isSelected={isSelected}
                compareFull={compareFull}
                onToggleCompare={onToggleCompare}
                align="right"
              />
            </div>
          );
        }

        return (
          <div
            key={residence.id}
            id={`residence-${residence.id}`}
            className="grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="group relative min-h-[420px] overflow-hidden lg:col-span-7 lg:min-h-[640px]">
              <Image
                src={residence.collectionImage.src}
                alt={residence.collectionImage.alt}
                fill
                className={`object-cover ${IMAGE_HOVER_CLASS}`}
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
            <div className="flex flex-col justify-center bg-[#101010] px-6 py-16 md:px-12 lg:col-span-5 lg:px-16 lg:py-24">
              <MotionReveal y={24}>
                <EditorialLabel>{residence.title.toUpperCase()}</EditorialLabel>
                <GoldRule className="mb-8" />
                <h2 className="mb-6 font-serif text-3xl font-light leading-[1.05] text-[#F8F6F2] md:text-4xl lg:text-5xl">
                  {residence.lifestyle.split(".")[0]}.
                </h2>
                <p className="mb-10 text-sm font-light leading-relaxed text-white/55 md:text-base">
                  {residence.lifestyle}
                </p>
                <div className="mb-10 grid grid-cols-2 gap-5">
                  <SpecItem label="SIZE" value={residence.specs.size} />
                  <SpecItem label="BEDS" value={residence.specs.beds} />
                  <SpecItem label="BATHS" value={residence.specs.baths} />
                  <SpecItem
                    label="BALCONY"
                    value={residence.specs.balcony ? "Yes" : "—"}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <Link
                    href="#floor-plans"
                    className="inline-flex items-center gap-3 border-b border-white/20 pb-1 text-[10px] font-semibold tracking-[0.25em] text-[#F8F6F2] transition-all duration-500 hover:border-[#C6A46A] hover:text-[#C6A46A]"
                  >
                    VIEW FLOOR PLAN
                    <span aria-hidden>→</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (!compareFull) onToggleCompare(residence.id);
                    }}
                    disabled={compareFull}
                    className={`inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] transition-all duration-500 ${
                      isSelected
                        ? "text-[#C6A46A]"
                        : compareFull
                          ? "cursor-not-allowed text-white/25"
                          : "text-white/50 hover:text-[#F8F6F2]"
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                    {isSelected ? "IN COMPARISON" : "ADD TO COMPARE"}
                  </button>
                </div>
              </MotionReveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}
