import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject } from "@/lib/project-loader";
import { getLocationContent } from "@/lib/location-content";
import { LocationExperience } from "@/components/location/location-experience";

interface LocationPageProps {
  params: Promise<{ project: string }>;
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Location Not Found" };
  }

  return {
    title: `Location — ${project.seo.title}`,
    description: `Discover why ${project.name} in Westlands, Nairobi is perfectly positioned for living, working and investing.`,
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const content = await getLocationContent(slug);

  return (
    <LocationExperience content={content} projectSlug={project.slug} />
  );
}
