import fs from "fs/promises";
import path from "path";

export interface ResidenceImage {
  src: string;
  alt: string;
}

export interface ResidenceSpecs {
  size: string;
  beds: string;
  baths: string;
  balcony: boolean;
  smartHome: boolean;
}

export interface ResidenceType {
  id: string;
  title: string;
  lifestyle: string;
  previewImage: ResidenceImage;
  collectionImage: ResidenceImage;
  specs: ResidenceSpecs;
  features: string[];
  floorPlan: {
    image: ResidenceImage;
    pdfUrl?: string;
  };
}

export interface FeatureFinish {
  title: string;
  description: string;
  image: ResidenceImage;
}

export interface LifeMoment {
  time: string;
  narrative: string;
  image: ResidenceImage;
}

export interface ResidencesContent {
  hero: {
    label: string;
    headline: string;
    subtitle: string;
    ctaLabel: string;
    image: ResidenceImage;
  };
  selector: {
    label: string;
    headline: string;
  };
  residences: ResidenceType[];
  floorPlans: {
    label: string;
    headline: string;
  };
  featuresFinishes: {
    label: string;
    headline: string;
    items: FeatureFinish[];
  };
  lifeInside: {
    label: string;
    headline: string;
    moments: LifeMoment[];
  };
  comparison: {
    label: string;
    headline: string;
  };
  availability: {
    label: string;
    headline: string;
    description: string;
  };
  cta: {
    headline: string;
    buttonLabel: string;
  };
  compare: {
    label: string;
    headline: string;
    minSelection: number;
    maxSelection: number;
  };
}

const DEFAULT_RESIDENCES: ResidencesContent = {
  hero: {
    label: "RESIDENCES",
    headline: "Homes Designed For Extraordinary Living.",
    subtitle: "Five distinct lifestyles. One address above the city.",
    ctaLabel: "EXPLORE RESIDENCES",
    image: {
      src: "/projects/citrine-heights/gallery/living.png",
      alt: "Luxury living room",
    },
  },
  selector: {
    label: "CHOOSE YOUR RESIDENCE",
    headline: "Select the lifestyle that speaks to you.",
  },
  residences: [],
  floorPlans: {
    label: "FLOOR PLANS",
    headline: "Every detail, considered.",
  },
  featuresFinishes: {
    label: "FEATURES & FINISHES",
    headline: "Materials chosen with intention.",
    items: [],
  },
  lifeInside: {
    label: "LIFE INSIDE",
    headline: "A day in your residence.",
    moments: [],
  },
  comparison: {
    label: "AT A GLANCE",
    headline: "Compare specifications.",
  },
  availability: {
    label: "LIMITED COLLECTION",
    headline: "Only a select number of residences remain.",
    description: "",
  },
  cta: {
    headline: "Find The Residence That Fits Your Lifestyle.",
    buttonLabel: "BOOK A PRIVATE CONSULTATION",
  },
  compare: {
    label: "COMPARE RESIDENCES",
    headline: "Side by side.",
    minSelection: 2,
    maxSelection: 3,
  },
};

/** Load residences.json for a project slug. */
export async function getResidencesContent(
  slug: string,
): Promise<ResidencesContent> {
  try {
    const residencesPath = path.join(
      process.cwd(),
      "content",
      slug,
      "residences.json",
    );
    const raw = await fs.readFile(residencesPath, "utf8");
    return JSON.parse(raw) as ResidencesContent;
  } catch {
    return DEFAULT_RESIDENCES;
  }
}
