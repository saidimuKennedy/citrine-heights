import fs from "fs/promises";
import path from "path";

export interface AmenityImage {
  src: string;
  alt: string;
}

export interface AmenityBlock {
  title: string;
  narrative: string;
  image: AmenityImage;
}

export interface WellnessItem {
  title: string;
  description: string;
  image: AmenityImage;
}

export interface SocialSpace {
  title: string;
  narrative: string;
  image: AmenityImage;
}

export interface FamilyFeature {
  title: string;
  description: string;
  image: AmenityImage;
}

export interface SecurityFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ConvenienceFeature {
  title: string;
  description: string;
  icon: string;
}

export interface TimeOfDayMoment {
  period: string;
  label: string;
  narrative: string;
  image: AmenityImage;
}

export interface AmenitiesContent {
  hero: {
    label: string;
    headline: string;
    subtitle: string;
    ctaLabel: string;
    accent: string;
    image: AmenityImage;
  };
  philosophy: {
    headline: string;
    paragraphs: string[];
    image: AmenityImage;
  };
  featured: {
    label: string;
    title: string;
    narrative: string;
    image: AmenityImage;
  };
  collection: {
    label: string;
    headline: string;
    items: AmenityBlock[];
  };
  wellness: {
    label: string;
    headline: string;
    description: string;
    items: WellnessItem[];
  };
  socialSpaces: {
    label: string;
    headline: string;
    pillars: string[];
    spaces: SocialSpace[];
  };
  familyLiving: {
    label: string;
    headline: string;
    description: string;
    features: FamilyFeature[];
    image: AmenityImage;
  };
  security: {
    label: string;
    headline: string;
    description: string;
    features: SecurityFeature[];
  };
  convenience: {
    label: string;
    headline: string;
    description: string;
    features: ConvenienceFeature[];
  };
  timeOfDay: {
    label: string;
    headline: string;
    moments: TimeOfDayMoment[];
  };
  signatureBanner: {
    image: AmenityImage;
    overlay: string;
  };
  cta: {
    headline: string;
    primaryLabel: string;
    secondaryLabel: string;
    brochureUrl?: string;
  };
}

const DEFAULT_AMENITIES: AmenitiesContent = {
  hero: {
    label: "AMENITIES",
    headline: "Designed for the way you live.",
    subtitle:
      "From sunrise laps to evening gatherings — spaces that shape your rhythm.",
    ctaLabel: "DISCOVER THE LIFESTYLE",
    accent: "EXPLORE",
    image: {
      src: "/projects/citrine-heights/gallery/pool.jpg",
      alt: "Rooftop infinity pool overlooking the Nairobi skyline",
    },
  },
  philosophy: {
    headline: "Luxury isn't measured by finishes alone.",
    paragraphs: ["It's measured by how every moment feels."],
    image: {
      src: "/projects/citrine-heights/gallery/living.png",
      alt: "Refined interior with natural light",
    },
  },
  featured: {
    label: "SIGNATURE",
    title: "Infinity Sky Pool",
    narrative: "",
    image: {
      src: "/projects/citrine-heights/gallery/pool.jpg",
      alt: "Infinity pool at dusk",
    },
  },
  collection: {
    label: "THE COLLECTION",
    headline: "Spaces that shape your rhythm.",
    items: [],
  },
  wellness: {
    label: "WELLNESS",
    headline: "Restore. Recharge. Renew.",
    description: "",
    items: [],
  },
  socialSpaces: {
    label: "SOCIAL SPACES",
    headline: "Gather. Celebrate. Connect.",
    pillars: [],
    spaces: [],
  },
  familyLiving: {
    label: "FAMILY LIVING",
    headline: "Room for every generation.",
    description: "",
    features: [],
    image: {
      src: "/projects/citrine-heights/gallery/citrine.png",
      alt: "Landscaped gardens",
    },
  },
  security: {
    label: "SECURITY",
    headline: "Peace of mind, always.",
    description: "",
    features: [],
  },
  convenience: {
    label: "CONVENIENCE",
    headline: "Everyday ease, elevated.",
    description: "",
    features: [],
  },
  timeOfDay: {
    label: "AMENITIES BY TIME OF DAY",
    headline: "A day unfolds at Citrine Heights.",
    moments: [],
  },
  signatureBanner: {
    image: {
      src: "/projects/citrine-heights/gallery/citrine heights.png",
      alt: "Tower at golden hour",
    },
    overlay: "Because Home Should Feel Like A Private Resort",
  },
  cta: {
    headline: "Experience the lifestyle for yourself.",
    primaryLabel: "BOOK A PRIVATE TOUR",
    secondaryLabel: "DOWNLOAD BROCHURE",
  },
};

/** Load amenities.json for a project slug. */
export async function getAmenitiesContent(
  slug: string,
): Promise<AmenitiesContent> {
  try {
    const amenitiesPath = path.join(
      process.cwd(),
      "content",
      slug,
      "amenities.json",
    );
    const raw = await fs.readFile(amenitiesPath, "utf8");
    return JSON.parse(raw) as AmenitiesContent;
  } catch {
    return DEFAULT_AMENITIES;
  }
}
