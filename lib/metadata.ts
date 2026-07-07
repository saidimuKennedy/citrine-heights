import type { Metadata } from "next";
import { getProject } from "./project-loader";

/**
 * Dynamically constructs Next.js metadata objects from the project SEO schema.
 */
export async function generateProjectMetadata(slug: string): Promise<Metadata> {
  const project = await getProject(slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const seo = project.seo;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: seo.openGraph
      ? {
          title: seo.openGraph.title || seo.title,
          description: seo.openGraph.description || seo.description,
          type: seo.openGraph.type || "website",
          siteName: seo.openGraph.siteName,
          images: [
            {
              url: seo.openGraph.image.src,
              alt: seo.openGraph.image.alt,
            },
          ],
        }
      : undefined,
    twitter: seo.twitter
      ? {
          card: seo.twitter.card || "summary_large_image",
          site: seo.twitter.site,
          images: seo.twitter.image ? [seo.twitter.image.src] : undefined,
        }
      : undefined,
  };
}
