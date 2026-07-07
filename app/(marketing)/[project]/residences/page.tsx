import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject } from "@/lib/project-loader";
import { getResidencesContent } from "@/lib/residences-content";
import { ResidencesExperience } from "@/components/residences/residences-experience";

interface ResidencesPageProps {
  params: Promise<{ project: string }>;
}

export async function generateMetadata({
  params,
}: ResidencesPageProps): Promise<Metadata> {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Residences Not Found" };
  }

  return {
    title: `Residences — ${project.seo.title}`,
    description: `Discover the residence collection at ${project.name}. Studio to penthouse — homes designed for extraordinary living.`,
  };
}

export default async function ResidencesPage({ params }: ResidencesPageProps) {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const content = await getResidencesContent(slug);

  return (
    <ResidencesExperience content={content} projectSlug={project.slug} />
  );
}
