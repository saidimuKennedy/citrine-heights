import fs from "fs/promises";
import path from "path";

export interface ContactImage {
  src: string;
  alt: string;
}

export type JourneyId = "home" | "investor" | "diaspora" | "partner";

export interface ContactContent {
  hero: {
    label: string;
    headline: string;
    subtitle: string;
    ctaLabel: string;
    image: ContactImage;
  };
  welcome: {
    headline: string;
    paragraph: string;
  };
  waysToConnect: {
    label: string;
    headline: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      contact: string;
      action: string;
      actionLabel: string;
    }>;
  };
  journeys: {
    label: string;
    headline: string;
    paths: Array<{
      id: JourneyId;
      title: string;
      description: string;
    }>;
  };
  consultation: {
    label: string;
    headline: string;
    description: string;
    submitLabel: string;
    image: ContactImage;
    residenceTypes: string[];
    budgetRanges: string[];
    contactMethods: string[];
    viewingTypes: string[];
  };
  scheduleViewing: {
    label: string;
    headline: string;
    description: string;
    submitLabel: string;
    properties: string[];
    timeSlots: string[];
  };
  team: {
    label: string;
    headline: string;
    members: Array<{
      id: string;
      name: string;
      role: string;
      email: string;
      phone: string;
      image: ContactImage;
    }>;
  };
  salesGallery: {
    label: string;
    headline: string;
    description: string;
    image: ContactImage;
    address: string;
    openingHours: string;
    parking: string;
    appointmentRequired: boolean;
  };
  map: {
    label: string;
    headline: string;
    embedUrl: string;
    directionsUrl: string;
  };
  faq: {
    label: string;
    headline: string;
    items: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
  responsePromise: {
    headline: string;
    paragraph: string;
  };
  cta: {
    headline: string;
    buttonLabel: string;
  };
  whatsapp: {
    number: string;
    message: string;
  };
  downloads: {
    label: string;
    headline: string;
    description: string;
    unlockLabel: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      fileUrl: string;
    }>;
  };
}

const DEFAULT_CONTACT: ContactContent = {
  hero: {
    label: "CONTACT",
    headline: "Let's Start The Conversation.",
    subtitle: "Our team is ready to guide you.",
    ctaLabel: "BOOK CONSULTATION",
    image: {
      src: "/projects/citrine-heights/gallery/living.png",
      alt: "Luxury sales lounge",
    },
  },
  welcome: {
    headline: "Every Great Investment Begins With A Conversation.",
    paragraph: "",
  },
  waysToConnect: {
    label: "WAYS TO CONNECT",
    headline: "Reach us on your terms.",
    cards: [],
  },
  journeys: {
    label: "CHOOSE YOUR JOURNEY",
    headline: "Tell us how we can best serve you.",
    paths: [],
  },
  consultation: {
    label: "PRIVATE CONSULTATION",
    headline: "Request a personal conversation.",
    description: "",
    submitLabel: "REQUEST PRIVATE CONSULTATION",
    image: {
      src: "/projects/citrine-heights/gallery/living.png",
      alt: "Living space",
    },
    residenceTypes: [],
    budgetRanges: [],
    contactMethods: ["Phone", "Email", "WhatsApp"],
    viewingTypes: ["In Person", "Virtual"],
  },
  scheduleViewing: {
    label: "SCHEDULE A VIEWING",
    headline: "Experience the project firsthand.",
    description: "",
    submitLabel: "CONFIRM VIEWING REQUEST",
    properties: [],
    timeSlots: [],
  },
  team: {
    label: "MEET THE TEAM",
    headline: "The people behind your journey.",
    members: [],
  },
  salesGallery: {
    label: "VISIT OUR SALES GALLERY",
    headline: "Walk through your future address.",
    description: "",
    image: {
      src: "/projects/citrine-heights/gallery/citrine heights.png",
      alt: "Sales gallery",
    },
    address: "Westlands Road, Nairobi",
    openingHours: "Mon - Sat: 9AM - 6PM",
    parking: "On-site parking available",
    appointmentRequired: true,
  },
  map: {
    label: "FIND US",
    headline: "In the heart of Westlands.",
    embedUrl: "",
    directionsUrl: "",
  },
  faq: {
    label: "FREQUENTLY ASKED",
    headline: "Questions we hear often.",
    items: [],
  },
  responsePromise: {
    headline: "We Respond Within One Business Day.",
    paragraph: "",
  },
  cta: {
    headline: "Ready To Find Your Future Home?",
    buttonLabel: "BOOK A PRIVATE CONSULTATION",
  },
  whatsapp: {
    number: "+254700000000",
    message: "Hello, I would like to learn more about Citrine Heights.",
  },
  downloads: {
    label: "DOWNLOAD CENTRE",
    headline: "Resources for informed decisions.",
    description: "",
    unlockLabel: "UNLOCK DOWNLOADS",
    items: [],
  },
};

/** Load contact.json for a project slug. */
export async function getContactContent(slug: string): Promise<ContactContent> {
  try {
    const contactPath = path.join(process.cwd(), "content", slug, "contact.json");
    const raw = await fs.readFile(contactPath, "utf8");
    return JSON.parse(raw) as ContactContent;
  } catch {
    return DEFAULT_CONTACT;
  }
}
