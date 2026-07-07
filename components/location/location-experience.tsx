"use client";

import type { CSSProperties } from "react";
import { EDITORIAL } from "@/lib/editorial";
import type { LocationContent } from "@/lib/location-content";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { LocationHero } from "./location-hero";
import { LocationStory } from "./location-story";
import { NeighbourhoodExplorer } from "./neighbourhood-explorer";
import { NeighbourhoodHighlights } from "./neighbourhood-highlights";
import { LifestyleAround } from "./lifestyle-around";
import { Connectivity } from "./connectivity";
import { InvestmentPerspective } from "./investment-perspective";
import { TravelTimes } from "./travel-times";
import { EverythingWithinReach } from "./everything-within-reach";
import { NeighbourhoodGallery } from "./neighbourhood-gallery";
import { LocationCTA } from "./location-cta";

interface LocationExperienceProps {
  content: LocationContent;
  projectSlug: string;
}

export function LocationExperience({
  content,
  projectSlug,
}: LocationExperienceProps) {
  return (
    <SmoothScroll>
      <div
        className="bg-[#F8F6F2] text-[#555555] selection:bg-[#C6A46A] selection:text-[#111111]"
        style={{ "--editorial-ink": EDITORIAL.ink } as CSSProperties}
      >
        <LocationHero hero={content.hero} />
        <LocationStory story={content.story} />
        <NeighbourhoodExplorer map={content.map} />
        <NeighbourhoodHighlights highlights={content.highlights} />
        <LifestyleAround lifestyle={content.lifestyle} />
        <Connectivity connectivity={content.connectivity} />
        <InvestmentPerspective investment={content.investment} />
        <TravelTimes travelTimes={content.travelTimes} />
        <EverythingWithinReach withinReach={content.withinReach} />
        <NeighbourhoodGallery gallery={content.gallery} />
        <LocationCTA cta={content.cta} projectSlug={projectSlug} />
      </div>
    </SmoothScroll>
  );
}
