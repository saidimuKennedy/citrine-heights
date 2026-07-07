"use client";

import { motion } from "motion/react";
import type { GalleryFilter } from "@/lib/gallery-content";
import { GALLERY_FILTERS } from "@/lib/gallery-content";

interface GalleryCategoryNavProps {
  active: GalleryFilter;
  onChange: (filter: GalleryFilter) => void;
}

export function GalleryCategoryNav({ active, onChange }: GalleryCategoryNavProps) {
  return (
    <nav className="sticky top-20 z-40 border-y border-white/8 bg-[#0E0E10]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-4 md:justify-center md:gap-2 md:px-8 [&::-webkit-scrollbar]:hidden">
        {GALLERY_FILTERS.map((filter) => {
          const isActive = active === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onChange(filter.id)}
              className="relative shrink-0 px-3 py-2 text-[10px] font-semibold tracking-[0.22em] transition-colors duration-500 md:px-4 md:text-[11px]"
            >
              <span
                className={
                  isActive ? "text-[#F7F4EF]" : "text-white/45 hover:text-white/75"
                }
              >
                {filter.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="gallery-filter-underline"
                  className="absolute inset-x-2 bottom-1 h-[1px] bg-[#C8A46B]"
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
