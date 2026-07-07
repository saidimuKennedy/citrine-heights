"use client";

import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";
import type { GalleryItem } from "@/types";
import { CATEGORY_LABELS } from "@/lib/gallery-content";

type CaptionedSlide = SlideImage & {
  title: string;
  description: string;
};

interface GalleryLightboxProps {
  items: GalleryItem[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function GalleryLightbox({
  items,
  index,
  open,
  onClose,
  onIndexChange,
}: GalleryLightboxProps) {
  const slides: CaptionedSlide[] = items.map((item) => ({
    src: item.image.src,
    alt: item.image.alt,
    title: item.title,
    description: item.description ?? CATEGORY_LABELS[item.category],
  }));

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Counter, Captions]}
      counter={{ container: { style: { top: "unset", bottom: "2rem" } } }}
      captions={{ showToggle: false }}
      on={{
        view: ({ index: nextIndex }) => onIndexChange(nextIndex),
      }}
      carousel={{ finite: false }}
      animation={{ fade: 400, swipe: 500 }}
      controller={{ closeOnBackdropClick: true }}
      styles={{
        container: { backgroundColor: "rgba(14, 14, 16, 0.97)" },
        button: { filter: "none", color: "#F7F4EF" },
        captionsTitle: {
          color: "#F7F4EF",
          fontFamily: "var(--font-serif)",
          fontSize: "1.75rem",
          fontWeight: 300,
        },
        captionsDescription: {
          color: "#C8A46B",
          letterSpacing: "0.3em",
          fontSize: "0.65rem",
          textTransform: "uppercase",
        },
        captionsDescriptionContainer: {
          marginTop: "0.5rem",
        },
      }}
    />
  );
}
