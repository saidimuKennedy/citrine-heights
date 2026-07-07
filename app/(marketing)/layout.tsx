import React from "react";
import { getProject } from "@/lib/project-loader";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: Promise<{ project?: string }>;
}

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  // Resolve parameters from Next.js 15+ router
  const resolvedParams = await params;
  const slug = resolvedParams?.project;

  // Load project details
  const project = slug ? await getProject(slug) : null;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      <Header project={project || undefined} />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer project={project || undefined} />
    </div>
  );
}
