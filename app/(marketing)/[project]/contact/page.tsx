import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject } from "@/lib/project-loader";
import { getContactContent } from "@/lib/contact-content";
import { ContactExperience } from "@/components/contact/contact-experience";

interface ContactPageProps {
  params: Promise<{ project: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Contact Not Found" };
  }

  return {
    title: `Contact — ${project.seo.title}`,
    description: `Get in touch with the ${project.name} sales team. Book a private consultation, schedule a viewing, or visit our sales gallery.`,
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { project: slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const content = await getContactContent(slug);

  return <ContactExperience content={content} />;
}
