"use client";

import type { CSSProperties } from "react";
import { EDITORIAL } from "@/lib/editorial";
import type { AmenitiesContent } from "@/lib/amenities-content";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { AmenitiesHero } from "./amenities-hero";
import { LifestylePhilosophy } from "./lifestyle-philosophy";
import { FeaturedAmenity } from "./featured-amenity";
import { AmenityCollection } from "./amenity-collection";
import { WellnessSection } from "./wellness-section";
import { SocialSpaces } from "./social-spaces";
import { FamilyLiving } from "./family-living";
import { SecuritySection } from "./security-section";
import { ConvenienceSection } from "./convenience-section";
import { TimeOfDay } from "./time-of-day";
import { SignatureBanner } from "./signature-banner";
import { AmenitiesCTA } from "./amenities-cta";

interface AmenitiesExperienceProps {
  content: AmenitiesContent;
  projectSlug: string;
}

export function AmenitiesExperience({
  content,
  projectSlug,
}: AmenitiesExperienceProps) {
  return (
    <SmoothScroll>
      <div
        className="bg-[#F8F6F2] text-[#4A4A4A] selection:bg-[#C6A46A] selection:text-[#111111]"
        style={{ "--editorial-ink": EDITORIAL.ink } as CSSProperties}
      >
        <AmenitiesHero hero={content.hero} />

        <LifestylePhilosophy philosophy={content.philosophy} />

        <FeaturedAmenity featured={content.featured} />

        {content.collection.items.length > 0 && (
          <AmenityCollection collection={content.collection} />
        )}

        {content.wellness.items.length > 0 && (
          <WellnessSection wellness={content.wellness} />
        )}

        {content.socialSpaces.spaces.length > 0 && (
          <SocialSpaces socialSpaces={content.socialSpaces} />
        )}

        <FamilyLiving familyLiving={content.familyLiving} />

        {content.security.features.length > 0 && (
          <SecuritySection security={content.security} />
        )}

        {content.convenience.features.length > 0 && (
          <ConvenienceSection convenience={content.convenience} />
        )}

        {content.timeOfDay.moments.length > 0 && (
          <TimeOfDay timeOfDay={content.timeOfDay} />
        )}

        <SignatureBanner signatureBanner={content.signatureBanner} />

        <AmenitiesCTA cta={content.cta} projectSlug={projectSlug} />
      </div>
    </SmoothScroll>
  );
}
