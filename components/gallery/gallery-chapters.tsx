"use client";

import Image from "next/image";
import type { GalleryChapter } from "@/lib/gallery-content";
import type { GalleryItem } from "@/types";
import { MotionReveal } from "./motion-reveal";

interface GalleryChaptersProps {
  chapters: GalleryChapter[];
  getChapterItems: (chapter: GalleryChapter) => GalleryItem[];
  getLightboxIndex: (itemId: string) => number;
  onOpen: (index: number) => void;
}

export function GalleryChapters({
  chapters,
  getChapterItems,
  getLightboxIndex,
  onOpen,
}: GalleryChaptersProps) {
  return (
    <section className="bg-[#161616]">
      {chapters.map((chapter, chapterIndex) => {
        const items = getChapterItems(chapter);
        if (items.length === 0) return null;

        return (
          <div
            key={chapter.id}
            className="border-t border-white/6 px-4 py-20 md:px-8 md:py-28"
          >
            <div className="mx-auto max-w-[1400px]">
              <MotionReveal y={20}>
                <p className="mb-4 text-[10px] font-semibold tracking-[0.35em] text-[#C8A46B]">
                  {chapter.label.toUpperCase()}
                </p>
                <h2 className="mb-14 max-w-3xl font-serif text-4xl font-light leading-tight text-[#F7F4EF] md:mb-20 md:text-6xl lg:text-7xl">
                  {chapter.headline}
                </h2>
              </MotionReveal>

              <div
                className={`grid gap-6 md:gap-10 ${
                  items.length > 1 ? "md:grid-cols-12" : ""
                }`}
              >
                {items.map((item, itemIndex) => {
                  const lightboxIndex = getLightboxIndex(item.id);
                  const isPrimary = itemIndex === 0;

                  return (
                    <MotionReveal
                      key={item.id}
                      delay={0.1 * itemIndex}
                      className={
                        isPrimary
                          ? "md:col-span-7"
                          : "md:col-span-5 md:mt-24"
                      }
                    >
                      <button
                        type="button"
                        onClick={() => onOpen(lightboxIndex)}
                        className="group relative block w-full overflow-hidden"
                        aria-label={`View ${item.title}`}
                      >
                        <div
                          className={`relative w-full overflow-hidden ${
                            isPrimary ? "aspect-[4/5] md:aspect-[5/6]" : "aspect-[3/4]"
                          }`}
                        >
                          <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            fill
                            className="object-cover transition-transform duration-[8000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
                            sizes={
                              isPrimary
                                ? "(max-width: 768px) 100vw, 60vw"
                                : "(max-width: 768px) 100vw, 40vw"
                            }
                          />
                          <div className="absolute inset-0 bg-[#0E0E10]/0 transition-colors duration-700 group-hover:bg-[#0E0E10]/35" />
                        </div>
                      </button>
                    </MotionReveal>
                  );
                })}
              </div>
            </div>

            {chapterIndex < chapters.length - 1 && (
              <div className="mx-auto mt-20 h-[1px] max-w-[1400px] bg-white/6 md:mt-28" />
            )}
          </div>
        );
      })}
    </section>
  );
}
