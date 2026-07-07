"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { ResidenceType } from "@/lib/residences-content";

interface CompareBarProps {
  selectedResidences: ResidenceType[];
  minSelection: number;
  maxSelection: number;
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpenCompare: () => void;
}

export function CompareBar({
  selectedResidences,
  minSelection,
  maxSelection,
  onRemove,
  onClear,
  onOpenCompare,
}: CompareBarProps) {
  const canCompare = selectedResidences.length >= minSelection;

  return (
    <AnimatePresence>
      {selectedResidences.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#101010]/95 px-6 py-4 backdrop-blur-md md:px-10"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-1">
              <p className="text-[9px] font-semibold tracking-[0.3em] text-[#C6A46A]">
                COMPARE RESIDENCES
              </p>
              <p className="text-xs font-light text-white/50">
                Select {minSelection}–{maxSelection} unit types to compare
              </p>
            </div>

            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
              {selectedResidences.map((residence) => (
                <span
                  key={residence.id}
                  className="inline-flex items-center gap-2 border border-white/15 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-[#F8F6F2]"
                >
                  {residence.title.toUpperCase()}
                  <button
                    type="button"
                    onClick={() => onRemove(residence.id)}
                    className="text-white/40 transition-colors duration-300 hover:text-[#C6A46A]"
                    aria-label={`Remove ${residence.title} from comparison`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              <button
                type="button"
                onClick={onClear}
                className="text-[9px] font-semibold tracking-[0.2em] text-white/40 transition-colors duration-300 hover:text-white/70"
              >
                CLEAR
              </button>

              <button
                type="button"
                onClick={onOpenCompare}
                disabled={!canCompare}
                className={`ml-auto border px-6 py-2.5 text-[10px] font-semibold tracking-[0.25em] transition-all duration-500 sm:ml-2 ${
                  canCompare
                    ? "border-[#C6A46A] text-[#F8F6F2] hover:bg-[#C6A46A]/10"
                    : "cursor-not-allowed border-white/10 text-white/30"
                }`}
              >
                COMPARE NOW
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
