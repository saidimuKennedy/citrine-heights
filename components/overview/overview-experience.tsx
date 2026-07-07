"use client";

import type { CSSProperties } from "react";
import { EDITORIAL } from "@/lib/editorial";
import type { OverviewContent } from "@/lib/overview-content";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { EditorialIntro } from "./editorial-intro";
import { SplitSection } from "./split-section";
import { DesignPhilosophy } from "./design-philosophy";
import { Statistics } from "./statistics";
import { SignatureImage } from "./signature-image";
import { LifestyleNarrative } from "./lifestyle-narrative";
import { LocationSnapshot } from "./location-snapshot";
import { DeveloperVision } from "./developer-vision";
import { OverviewCTA } from "./overview-cta";

interface OverviewExperienceProps {
  content: OverviewContent;
  projectSlug: string;
  projectName: string;
}

export function OverviewExperience({
  content,
  projectSlug,
  projectName,
}: OverviewExperienceProps) {
  return (
    <SmoothScroll>
      <div
        className="bg-[#F7F4EF] text-[#0E0E10] selection:bg-[#C8A46B] selection:text-[#0E0E10]"
        style={{ "--editorial-ink": EDITORIAL.ink } as CSSProperties}
      >
        <EditorialIntro
          label={content.editorial.label}
          headline={content.editorial.headline}
          description={content.editorial.description}
          image={content.signatureImage}
        />

        <SplitSection
          headline={content.split.headline}
          paragraphs={content.split.paragraphs}
          image={content.split.image}
        />

        <DesignPhilosophy
          label={content.designPhilosophy.label}
          headline={content.designPhilosophy.headline}
          pillars={content.designPhilosophy.pillars}
        />

        {content.statistics.length > 0 && (
          <Statistics
            section={content.statisticsSection}
            statistics={content.statistics}
          />
        )}

        <SignatureImage
          src={content.signatureImage.src}
          alt={content.signatureImage.alt}
          overlay={content.signatureImage.overlay}
        />

        {content.lifestyle.moments.length > 0 && (
          <LifestyleNarrative
            label={content.lifestyle.label}
            headline={content.lifestyle.headline}
            moments={content.lifestyle.moments}
          />
        )}

        <LocationSnapshot
          label={content.location.label}
          headline={content.location.headline}
          description={content.location.description}
          travelTimes={content.location.travelTimes}
          image={content.location.image}
        />

        {content.developerVision.paragraph && (
          <DeveloperVision
            paragraph={content.developerVision.paragraph}
            projectName={projectName}
          />
        )}

        <OverviewCTA
          headline={content.cta.headline}
          buttonLabel={content.cta.buttonLabel}
          projectSlug={projectSlug}
        />
      </div>
    </SmoothScroll>
  );
}
