"use client";

import Image from "next/image";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { ResidenceType } from "@/lib/residences-content";

interface ComparePanelProps {
  open: boolean;
  onClose: () => void;
  residences: ResidenceType[];
  label: string;
  headline: string;
  projectSlug: string;
}

function CompareRow({
  label,
  values,
}: {
  label: string;
  values: (string | boolean)[];
}) {
  return (
    <div className="grid border-b border-white/6 py-5" style={{ gridTemplateColumns: `140px repeat(${values.length}, 1fr)` }}>
      <span className="pr-4 text-[9px] font-semibold tracking-[0.2em] text-white/45">
        {label}
      </span>
      {values.map((value, idx) => (
        <span
          key={idx}
          className="px-3 text-sm font-light text-[#F8F6F2]"
        >
          {typeof value === "boolean" ? (
            value ? (
              <Check className="h-4 w-4 text-[#C6A46A]" aria-label="Yes" />
            ) : (
              <span className="text-white/30">—</span>
            )
          ) : (
            value
          )}
        </span>
      ))}
    </div>
  );
}

export function ComparePanel({
  open,
  onClose,
  residences,
  label,
  headline,
  projectSlug,
}: ComparePanelProps) {
  const columnCount = residences.length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#101010]/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[90svh] overflow-y-auto bg-[#101010] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="compare-panel-title"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#101010] px-6 py-5 md:px-12">
              <div>
                <p className="mb-1 text-[9px] font-semibold tracking-[0.3em] text-[#C6A46A]">
                  {label}
                </p>
                <h2
                  id="compare-panel-title"
                  className="font-serif text-2xl font-light text-[#F8F6F2] md:text-3xl"
                >
                  {headline}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#F8F6F2] transition-colors duration-300 hover:border-[#C6A46A] hover:text-[#C6A46A]"
                aria-label="Close comparison panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-8 md:px-12 md:py-12">
              <div className="overflow-x-auto">
                <div className="min-w-[640px]">
                  {/* Column headers with floor plan images */}
                  <div
                    className="mb-8 grid gap-4"
                    style={{ gridTemplateColumns: `140px repeat(${columnCount}, 1fr)` }}
                  >
                    <div />
                    {residences.map((residence) => (
                      <div key={residence.id} className="flex flex-col">
                        <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden border border-white/8">
                          <Image
                            src={residence.floorPlan.image.src}
                            alt={residence.floorPlan.image.alt}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        </div>
                        <h3 className="font-serif text-xl font-light text-[#F8F6F2]">
                          {residence.title}
                        </h3>
                      </div>
                    ))}
                  </div>

                  <CompareRow
                    label="SIZE"
                    values={residences.map((r) => r.specs.size)}
                  />
                  <CompareRow
                    label="BEDS"
                    values={residences.map((r) => r.specs.beds)}
                  />
                  <CompareRow
                    label="BATHS"
                    values={residences.map((r) => r.specs.baths)}
                  />
                  <CompareRow
                    label="BALCONY"
                    values={residences.map((r) => r.specs.balcony)}
                  />
                  <CompareRow
                    label="SMART HOME"
                    values={residences.map((r) => r.specs.smartHome)}
                  />

                  {/* Features comparison */}
                  <div
                    className="grid border-b border-white/6 py-5"
                    style={{ gridTemplateColumns: `140px repeat(${columnCount}, 1fr)` }}
                  >
                    <span className="pr-4 text-[9px] font-semibold tracking-[0.2em] text-white/45">
                      FEATURES
                    </span>
                    {residences.map((residence) => (
                      <ul
                        key={residence.id}
                        className="space-y-2 px-3 text-sm font-light text-[#F8F6F2]/80"
                      >
                        {residence.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-[#C6A46A]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>

                  {/* Key differences */}
                  <div
                    className="grid py-5"
                    style={{ gridTemplateColumns: `140px repeat(${columnCount}, 1fr)` }}
                  >
                    <span className="pr-4 text-[9px] font-semibold tracking-[0.2em] text-white/45">
                      LIFESTYLE
                    </span>
                    {residences.map((residence) => (
                      <p
                        key={residence.id}
                        className="px-3 text-sm font-light leading-relaxed text-white/60"
                      >
                        {residence.lifestyle}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center border-t border-white/8 pt-10">
                <a
                  href={`/${projectSlug}#contact`}
                  className="inline-flex items-center gap-3 border border-[#C6A46A]/50 px-10 py-4 text-xs font-semibold tracking-[0.28em] text-[#F8F6F2] transition-all duration-500 hover:border-[#C6A46A] hover:bg-[#C6A46A]/10"
                >
                  BOOK A PRIVATE CONSULTATION
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
