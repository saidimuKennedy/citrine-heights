import fs from "fs/promises";
import path from "path";

export interface HomepageImage {
  src: string;
  alt: string;
}

export interface HomepageCta {
  label: string;
  href: string;
}

export interface HomepageContent {
  hero: {
    title: string;
    headline: string;
    tagline: string;
    primaryCta: HomepageCta;
    secondaryCta: HomepageCta;
    timeOfDay: {
      day: { label: string; image: HomepageImage };
      sunset: { label: string; image: HomepageImage };
      night: { label: string; image: HomepageImage };
    };
  };
  introduction: {
    headline: string[];
    paragraph: string;
  };
  vision: {
    label: string;
    headline: string;
    paragraphs: string[];
    image: HomepageImage;
    cta: HomepageCta;
  };
  lifestyle: {
    label: string;
    headline: string;
    timeline: {
      time: string;
      title: string;
      narrative: string;
      image: HomepageImage;
    }[];
    cta: HomepageCta;
  };
  location: {
    label: string;
    headline: string;
    paragraph: string;
    travelTimes: { minutes: string; destination: string }[];
    map: { embedUrl: string; directionsUrl: string };
    cta: HomepageCta;
  };
  investment: {
    label: string;
    headline: string;
    pillars: { title: string; description: string }[];
  };
  diaspora: {
    label: string;
    headline: string;
    paragraph: string;
    points: { title: string; description: string }[];
  };
  construction: {
    label: string;
    headline: string;
    phases: {
      id: string;
      title: string;
      status: "complete" | "active" | "upcoming";
      description: string;
    }[];
  };
  gallery: {
    label: string;
    headline: string;
    cta: HomepageCta;
  };
  trust: {
    label: string;
    developer: string;
    headline: string;
    stats: { value: string; label: string }[];
    resources: { label: string; href: string; icon: string }[];
    registration: string;
  };
  finalCta: {
    headline: string;
    subheadline: string;
    cta: HomepageCta;
    image: HomepageImage;
  };
  buildingExplorer: {
    label: string;
    headline: string;
    floors: {
      id: string;
      label: string;
      floor: string;
      description: string;
      y: number;
    }[];
    towerImage: HomepageImage;
  };
}

export async function getHomepageContent(
  slug: string,
): Promise<HomepageContent | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      slug,
      "homepage.json",
    );
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as HomepageContent;
  } catch {
    return null;
  }
}
