import fs from "fs/promises";
import path from "path";

export interface LocationImage {
  src: string;
  alt: string;
}

export type MapPinCategory =
  | "shopping"
  | "dining"
  | "healthcare"
  | "education"
  | "business"
  | "entertainment"
  | "parks"
  | "airport";

export interface MapPin {
  id: string;
  name: string;
  category: MapPinCategory;
  description: string;
  travelTime: string;
  /** Horizontal position on the map overlay (0–100). */
  x: number;
  /** Vertical position on the map overlay (0–100). */
  y: number;
}

export interface HighlightItem {
  category: string;
  destination: string;
  travelTime: string;
  description: string;
  icon: string;
  image: LocationImage;
  /** editorial span — default 1, featured items use 2 */
  span?: 1 | 2;
}

export interface LifestyleMoment {
  period: string;
  label: string;
  narrative: string;
  image: LocationImage;
}

export interface ConnectivityNode {
  name: string;
  description?: string;
}

export interface TravelTimeItem {
  minutes: string;
  destination: string;
}

export interface ReachItem {
  name: string;
  category: string;
  travelTime: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface LocationContent {
  hero: {
    label: string;
    headline: string;
    subtitle: string;
    ctaLabel: string;
    accent: string;
    image: LocationImage;
  };
  story: {
    label: string;
    headline: string;
    paragraphs: string[];
    image: LocationImage;
  };
  map: {
    label: string;
    headline: string;
    embedUrl: string;
    directionsUrl: string;
    categories: { id: MapPinCategory; label: string }[];
    pins: MapPin[];
  };
  highlights: {
    label: string;
    headline: string;
    items: HighlightItem[];
  };
  lifestyle: {
    label: string;
    headline: string;
    moments: LifestyleMoment[];
  };
  connectivity: {
    label: string;
    headline: string;
    nodes: ConnectivityNode[];
  };
  investment: {
    label: string;
    headline: string;
    paragraphs: string[];
    supportingPoints: string[];
  };
  travelTimes: {
    label: string;
    headline: string;
    items: TravelTimeItem[];
  };
  withinReach: {
    label: string;
    headline: string;
    description: string;
    items: ReachItem[];
  };
  gallery: {
    label: string;
    headline: string;
    images: GalleryImage[];
  };
  cta: {
    headline: string;
    primaryLabel: string;
    secondaryLabel: string;
    directionsUrl: string;
  };
}

const DEFAULT_LOCATION: LocationContent = {
  hero: {
    label: "LOCATION",
    headline: "At The Centre Of Everything.",
    subtitle:
      "Perfectly positioned to connect business, lifestyle and everyday living.",
    ctaLabel: "EXPLORE THE NEIGHBOURHOOD",
    accent: "DISCOVER",
    image: {
      src: "/projects/citrine-heights/gallery/citrine heights.png",
      alt: "Nairobi skyline at golden hour",
    },
  },
  story: {
    label: "THE ADDRESS",
    headline: "Location is more than an address.",
    paragraphs: [
      "It shapes how you work, connect, invest and live.",
      "Citrine Heights places you within minutes of Nairobi's finest destinations.",
    ],
    image: {
      src: "/projects/citrine-heights/gallery/citrine heights.png",
      alt: "Westlands cityscape",
    },
  },
  map: {
    label: "NEIGHBOURHOOD EXPLORER",
    headline: "Everything within reach.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8158!2d36.8055!3d-1.2634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173d963dc089%3A0x6df2a3a495889230!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1710000000000!5m2!1sen!2ske",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Westlands+Road,+Nairobi",
    categories: [
      { id: "shopping", label: "Shopping" },
      { id: "dining", label: "Dining" },
      { id: "healthcare", label: "Healthcare" },
      { id: "education", label: "Schools" },
      { id: "business", label: "Business" },
      { id: "entertainment", label: "Entertainment" },
      { id: "parks", label: "Parks" },
      { id: "airport", label: "Airport" },
    ],
    pins: [],
  },
  highlights: {
    label: "EVERYTHING NEARBY",
    headline: "Recognisable landmarks. Real convenience.",
    items: [],
  },
  lifestyle: {
    label: "LIFESTYLE AROUND YOU",
    headline: "A day in Westlands.",
    moments: [],
  },
  connectivity: {
    label: "CONNECTIVITY",
    headline: "Move through the city with ease.",
    nodes: [],
  },
  investment: {
    label: "INVESTMENT PERSPECTIVE",
    headline: "Positioned in one of Nairobi's most desirable growth corridors.",
    paragraphs: [],
    supportingPoints: [],
  },
  travelTimes: {
    label: "TRAVEL TIMES",
    headline: "Minutes, not hours.",
    items: [],
  },
  withinReach: {
    label: "EVERYTHING WITHIN REACH",
    headline: "Life within ten minutes.",
    description: "",
    items: [],
  },
  gallery: {
    label: "NEIGHBOURHOOD GALLERY",
    headline: "The city around you.",
    images: [],
  },
  cta: {
    headline: "See the location for yourself.",
    primaryLabel: "BOOK A PRIVATE TOUR",
    secondaryLabel: "GET DIRECTIONS",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Westlands+Road,+Nairobi",
  },
};

/** Load location.json for a project slug. */
export async function getLocationContent(slug: string): Promise<LocationContent> {
  try {
    const locationPath = path.join(
      process.cwd(),
      "content",
      slug,
      "location.json",
    );
    const raw = await fs.readFile(locationPath, "utf8");
    return JSON.parse(raw) as LocationContent;
  } catch {
    return DEFAULT_LOCATION;
  }
}
