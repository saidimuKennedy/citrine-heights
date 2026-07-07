import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject } from "@/lib/project-loader";
import { getOverviewContent } from "@/lib/overview-content";
import { OverviewExperience } from "@/components/overview/overview-experience";

interface OverviewPageProps {
  params: Promise<{ project: string }>;
}

export async function generateMetadata({
  params,
}: OverviewPageProps): Promise<Metadata> {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "The Vision Not Found" };
  }

  return {
    title: `The Vision — ${project.seo.title}`,
    description: `Discover the vision behind ${project.name}. Architecture, lifestyle and location.`,
  };
}

export default async function OverviewPage({ params }: OverviewPageProps) {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const content = await getOverviewContent(slug);

  return (
    <OverviewExperience
      content={content}
      projectSlug={project.slug}
      projectName={project.name}
    />
  );
}
