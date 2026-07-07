import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject } from "@/lib/project-loader";
import { GalleryExperience } from "@/components/gallery/gallery-experience";

interface GalleryPageProps {
  params: Promise<{ project: string }>;
}

export async function generateMetadata({
  params,
}: GalleryPageProps): Promise<Metadata> {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Gallery Not Found" };
  }

  return {
    title: `Gallery — ${project.seo.title}`,
    description: `A visual journey through ${project.name}.`,
  };
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <GalleryExperience
      items={project.gallery}
      projectSlug={project.slug}
      projectName={project.name}
    />
  );
}
