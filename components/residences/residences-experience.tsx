"use client";

import { useCallback, useMemo, useState, type CSSProperties } from "react";
import { EDITORIAL } from "@/lib/editorial";
import type { ResidencesContent } from "@/lib/residences-content";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ResidencesHero } from "./residences-hero";
import { ResidenceSelector } from "./residence-selector";
import { ResidenceCollection } from "./residence-collection";
import { FloorPlansSection } from "./floor-plans-section";
import { FeaturesFinishes } from "./features-finishes";
import { LifeInside } from "./life-inside";
import { ComparisonTable } from "./comparison-table";
import { AvailabilitySection } from "./availability-section";
import { ResidencesCTA } from "./residences-cta";
import { CompareBar } from "./compare-bar";
import { ComparePanel } from "./compare-panel";

interface ResidencesExperienceProps {
  content: ResidencesContent;
  projectSlug: string;
}

export function ResidencesExperience({
  content,
  projectSlug,
}: ResidencesExperienceProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const residenceById = useMemo(
    () => new Map(content.residences.map((r) => [r.id, r])),
    [content.residences],
  );

  const selectedResidences = useMemo(
    () =>
      selectedIds
        .map((id) => residenceById.get(id))
        .filter((r): r is NonNullable<typeof r> => Boolean(r)),
    [selectedIds, residenceById],
  );

  const toggleCompare = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((item) => item !== id);
        }
        if (prev.length >= content.compare.maxSelection) {
          return prev;
        }
        return [...prev, id];
      });
    },
    [content.compare.maxSelection],
  );

  const removeFromCompare = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const clearCompare = useCallback(() => {
    setSelectedIds([]);
    setCompareOpen(false);
  }, []);

  const scrollToResidence = useCallback((id: string) => {
    const element = document.getElementById(`residence-${id}`);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <SmoothScroll>
      <div
        className="bg-[#F8F6F2] text-[#101010] selection:bg-[#C6A46A] selection:text-[#101010]"
        style={{ "--editorial-ink": EDITORIAL.ink } as CSSProperties}
      >
        <ResidencesHero hero={content.hero} />

        <ResidenceSelector
          label={content.selector.label}
          headline={content.selector.headline}
          residences={content.residences}
          selectedIds={selectedIds}
          onToggleCompare={toggleCompare}
          onSelectResidence={scrollToResidence}
          maxCompare={content.compare.maxSelection}
        />

        <ResidenceCollection
          residences={content.residences}
          selectedIds={selectedIds}
          onToggleCompare={toggleCompare}
          maxCompare={content.compare.maxSelection}
        />

        <FloorPlansSection
          label={content.floorPlans.label}
          headline={content.floorPlans.headline}
          residences={content.residences}
          projectSlug={projectSlug}
        />

        {content.featuresFinishes.items.length > 0 && (
          <FeaturesFinishes
            label={content.featuresFinishes.label}
            headline={content.featuresFinishes.headline}
            items={content.featuresFinishes.items}
          />
        )}

        {content.lifeInside.moments.length > 0 && (
          <LifeInside
            label={content.lifeInside.label}
            headline={content.lifeInside.headline}
            moments={content.lifeInside.moments}
          />
        )}

        <ComparisonTable
          label={content.comparison.label}
          headline={content.comparison.headline}
          residences={content.residences}
        />

        <AvailabilitySection
          label={content.availability.label}
          headline={content.availability.headline}
          description={content.availability.description}
        />

        <ResidencesCTA
          headline={content.cta.headline}
          buttonLabel={content.cta.buttonLabel}
          projectSlug={projectSlug}
        />

        <CompareBar
          selectedResidences={selectedResidences}
          minSelection={content.compare.minSelection}
          maxSelection={content.compare.maxSelection}
          onRemove={removeFromCompare}
          onClear={clearCompare}
          onOpenCompare={() => setCompareOpen(true)}
        />

        <ComparePanel
          open={compareOpen}
          onClose={() => setCompareOpen(false)}
          residences={selectedResidences}
          label={content.compare.label}
          headline={content.compare.headline}
          projectSlug={projectSlug}
        />
      </div>
    </SmoothScroll>
  );
}
