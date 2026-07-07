"use client";

import type { CSSProperties } from "react";
import type { Project } from "@/types";
import type { GalleryItem } from "@/types/gallery";
import type { HomepageContent } from "@/lib/homepage-content";
import type { ResidenceType } from "@/lib/residences-content";
import { EDITORIAL } from "@/lib/editorial";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CinematicHero } from "@/components/homepage/cinematic-hero";
import { EditorialIntro } from "@/components/homepage/editorial-intro";
import { VisionSection } from "@/components/homepage/vision-section";
import { BuildingExplorer } from "@/components/homepage/building-explorer";
import { SignatureResidences } from "@/components/homepage/signature-residences";
import { LifestyleSection } from "@/components/homepage/lifestyle-section";
import { LocationSection } from "@/components/homepage/location-section";
import { InvestmentSection } from "@/components/homepage/investment-section";
import { DiasporaSection } from "@/components/homepage/diaspora-section";
import { ConstructionTimeline } from "@/components/homepage/construction-timeline";
import { GalleryPreview } from "@/components/homepage/gallery-preview";
import { DeveloperTrust } from "@/components/homepage/developer-trust";
import { FinalCta } from "@/components/homepage/final-cta";

interface ProjectExperienceProps {
  project: Project;
  homepage: HomepageContent;
  residences: ResidenceType[];
  gallery: GalleryItem[];
}

export function ProjectExperience({
  project,
  homepage,
  residences,
  gallery,
}: ProjectExperienceProps) {
  const featuredGallery = gallery.filter((item) => item.featured);
  const previewImages =
    featuredGallery.length >= 6 ? featuredGallery : gallery;

  return (
    <SmoothScroll>
      <div
        className="bg-[#111111] text-[#F7F4EF] selection:bg-[#C6A46A] selection:text-[#111111]"
        style={{ "--editorial-ink": EDITORIAL.ink } as CSSProperties}
      >
        <CinematicHero hero={homepage.hero} />
        <EditorialIntro introduction={homepage.introduction} />
        <VisionSection vision={homepage.vision} />
        <SignatureResidences residences={residences} slug={project.slug} />
        <BuildingExplorer explorer={homepage.buildingExplorer} />
        <LifestyleSection lifestyle={homepage.lifestyle} />
        <LocationSection location={homepage.location} />
        <InvestmentSection investment={homepage.investment} />
        <DiasporaSection diaspora={homepage.diaspora} />
        <ConstructionTimeline construction={homepage.construction} />
        <GalleryPreview gallery={homepage.gallery} images={previewImages} />
        <DeveloperTrust trust={homepage.trust} />
        <FinalCta finalCta={homepage.finalCta} />
      </div>
    </SmoothScroll>
  );
}
