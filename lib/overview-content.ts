import fs from "fs/promises";
import path from "path";

export interface OverviewImage {
  src: string;
  alt: string;
}

export interface OverviewPillar {
  title: string;
  description: string;
  icon: string;
}

export interface OverviewStatistic {
  value: string;
  label: string;
  context?: string;
}

export interface OverviewStatisticsSection {
  label: string;
  headline: string;
  description?: string;
}

export interface LifestyleMoment {
  time: string;
  narrative: string;
  image: OverviewImage;
}

export interface TravelTime {
  destination: string;
  time: string;
}

export interface OverviewContent {
  editorial: {
    label: string;
    headline: string;
    description: string;
  };
  split: {
    headline: string;
    paragraphs: string[];
    image: OverviewImage;
  };
  designPhilosophy: {
    label: string;
    headline: string;
    pillars: OverviewPillar[];
  };
  statisticsSection?: OverviewStatisticsSection;
  statistics: OverviewStatistic[];
  signatureImage: OverviewImage & { overlay: string };
  lifestyle: {
    label: string;
    headline: string;
    moments: LifestyleMoment[];
  };
  location: {
    label: string;
    headline: string;
    description: string;
    travelTimes: TravelTime[];
    image: OverviewImage;
  };
  developerVision: {
    paragraph: string;
  };
  cta: {
    headline: string;
    buttonLabel: string;
  };
}

const DEFAULT_OVERVIEW: OverviewContent = {
  editorial: {
    label: "THE VISION",
    headline: "A home shaped by light and intention.",
    description:
      "An emotional narrative of place — why you wake here, entertain here, and belong here.",
  },
  split: {
    headline: "Rooms that breathe with the city.",
    paragraphs: [
      "Interiors composed as a sequence of moments — entry, gathering, retreat.",
    ],
    image: {
      src: "/projects/citrine-heights/gallery/living.png",
      alt: "Luxury interior",
    },
  },
  designPhilosophy: {
    label: "DESIGN PHILOSOPHY",
    headline: "Three principles. One enduring vision.",
    pillars: [],
  },
  statistics: [],
  signatureImage: {
    src: "/projects/citrine-heights/gallery/citrine heights.png",
    alt: "Tower at dusk",
    overlay: "Light writes every line of the façade.",
  },
  lifestyle: {
    label: "A DAY IN THE LIFE",
    headline: "Rhythm of a Westlands day.",
    moments: [],
  },
  location: {
    label: "THE ADDRESS",
    headline: "Westlands — your daily orbit.",
    description: "",
    travelTimes: [],
    image: {
      src: "/projects/citrine-heights/gallery/table.png",
      alt: "City views",
    },
  },
  developerVision: {
    paragraph: "",
  },
  cta: {
    headline: "Begin your chapter at Citrine Heights.",
    buttonLabel: "REQUEST A PRIVATE TOUR",
  },
};

/** Load overview.json for a project slug. */
export async function getOverviewContent(
  slug: string,
): Promise<OverviewContent> {
  try {
    const overviewPath = path.join(
      process.cwd(),
      "content",
      slug,
      "overview.json",
    );
    const raw = await fs.readFile(overviewPath, "utf8");
    return JSON.parse(raw) as OverviewContent;
  } catch {
    return DEFAULT_OVERVIEW;
  }
}

