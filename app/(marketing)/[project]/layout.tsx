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
    <div className="relative flex min-h-screen flex-col bg-[#111111] text-[#F7F4EF]">
      <Header project={project || undefined} projectSlug={slug} />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer project={project || undefined} />
    </div>
  );
}
