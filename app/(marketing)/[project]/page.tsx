import { notFound } from "next/navigation";
import { getProject } from "@/lib/project-loader";
import { getHomepageContent } from "@/lib/homepage-content";
import { getResidencesContent } from "@/lib/residences-content";
import { generateProjectMetadata } from "@/lib/metadata";
import { ProjectExperience } from "@/components/project/project-experience";

interface ProjectPageProps {
  params: Promise<{ project: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { project: slug } = await params;
  return generateProjectMetadata(slug);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { project: slug } = await params;
  const [project, homepage, residencesContent] = await Promise.all([
    getProject(slug),
    getHomepageContent(slug),
    getResidencesContent(slug),
  ]);

  if (!project || !homepage) {
    notFound();
  }

  return (
    <ProjectExperience
      project={project}
      homepage={homepage}
      residences={residencesContent.residences}
      gallery={project.gallery ?? []}
    />
  );
}
