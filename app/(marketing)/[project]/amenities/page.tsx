import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject } from "@/lib/project-loader";
import { getAmenitiesContent } from "@/lib/amenities-content";
import { AmenitiesExperience } from "@/components/amenities/amenities-experience";

interface AmenitiesPageProps {
  params: Promise<{ project: string }>;
}

export async function generateMetadata({
  params,
}: AmenitiesPageProps): Promise<Metadata> {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Amenities Not Found" };
  }

  return {
    title: `Amenities — ${project.seo.title}`,
    description: `Discover world-class amenities at ${project.name}. Wellness, social spaces, and resort-style living above the city.`,
  };
}

export default async function AmenitiesPage({ params }: AmenitiesPageProps) {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const content = await getAmenitiesContent(slug);

  return (
    <AmenitiesExperience content={content} projectSlug={project.slug} />
  );
}
