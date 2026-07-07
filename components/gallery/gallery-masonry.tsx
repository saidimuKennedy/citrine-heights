"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { MasonryGalleryItem } from "@/lib/gallery-content";
import { CATEGORY_LABELS } from "@/lib/gallery-content";

interface GalleryMasonryProps {
  items: MasonryGalleryItem[];
  getLightboxIndex: (itemId: string) => number;
  onOpen: (index: number) => void;
}

const aspectClasses: Record<MasonryGalleryItem["span"], string> = {
  tall: "aspect-[3/5]",
  medium: "aspect-[5/6]",
  wide: "aspect-[16/11]",
  standard: "aspect-[4/5]",
};

export function GalleryMasonry({
  items,
  getLightboxIndex,
  onOpen,
}: GalleryMasonryProps) {
  return (
    <section className="bg-[#0E0E10] px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 md:mb-20"
        >
          <p className="mb-4 text-[10px] font-semibold tracking-[0.35em] text-[#C8A46B]">
            COLLECTION
          </p>
          <h2 className="max-w-3xl font-serif text-4xl font-light text-[#F7F4EF] md:text-6xl">
            Every frame, a story.
          </h2>
        </motion.div>

        {items.length === 0 ? (
          <p className="py-20 text-center text-sm tracking-[0.2em] text-white/40">
            NO IMAGES IN THIS COLLECTION YET.
          </p>
        ) : (
          <motion.div layout className="columns-1 gap-6 md:columns-2 md:gap-8 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {items.map((item) => {
                const lightboxIndex = getLightboxIndex(item.id);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="mb-6 break-inside-avoid md:mb-8"
                  >
                    <button
                      type="button"
                      onClick={() => onOpen(lightboxIndex)}
                      className={`group relative block w-full overflow-hidden text-left ${aspectClasses[item.span]}`}
                      aria-label={`View ${item.title}`}
                    >
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        className="object-cover transition-transform duration-[8000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-[#0E0E10]/25 transition-colors duration-700 md:bg-[#0E0E10]/0 md:group-hover:bg-[#0E0E10]/55" />
                      <div className="absolute inset-x-0 bottom-0 p-6 opacity-100 transition-all duration-700 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                        <p className="mb-2 text-[9px] font-semibold tracking-[0.25em] text-[#C8A46B]">
                          {CATEGORY_LABELS[item.category].toUpperCase()}
                        </p>
                        <p className="font-serif text-xl font-light text-[#F7F4EF] md:text-2xl">
                          {item.title}
                        </p>
                        <p className="mt-3 text-[10px] font-medium tracking-[0.2em] text-white/70">
                          VIEW →
                        </p>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
