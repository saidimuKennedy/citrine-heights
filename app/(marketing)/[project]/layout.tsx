import React from "react";
import { getProject } from "@/lib/project-loader";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: Promise<{ project: string }>;
}

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const { project: slug } = await params;
  const project = await getProject(slug);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      <Header project={project || undefined} projectSlug={slug} />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer project={project || undefined} />
    </div>
  );
}
