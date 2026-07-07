"use client";

import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";
import type { ResidenceType } from "@/lib/residences-content";

type CaptionedSlide = SlideImage & {
  title: string;
  description: string;
};

interface FloorPlanLightboxProps {
  residences: ResidenceType[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function FloorPlanLightbox({
  residences,
  index,
  open,
  onClose,
  onIndexChange,
}: FloorPlanLightboxProps) {
  const slides: CaptionedSlide[] = residences.map((residence) => ({
    src: residence.floorPlan.image.src,
    alt: residence.floorPlan.image.alt,
    title: residence.title,
    description: `${residence.specs.size} · ${residence.specs.beds} bed · ${residence.specs.baths} bath`,
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
        container: { backgroundColor: "rgba(16, 16, 16, 0.97)" },
        button: { filter: "none", color: "#F8F6F2" },
        captionsTitle: {
          color: "#F8F6F2",
          fontFamily: "var(--font-serif)",
          fontSize: "1.75rem",
          fontWeight: 300,
        },
        captionsDescription: {
          color: "#C6A46A",
          letterSpacing: "0.2em",
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
