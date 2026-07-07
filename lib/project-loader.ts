import fs from "fs/promises";
import path from "path";
import type { Project } from "@/types";

/**
 * Loads a project configuration from the content filesystem.
 * Composes core details, seo, gallery, and faqs.
 */
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const projectDir = path.join(process.cwd(), "content", slug);
    
    // Verify directory exists
    try {
      await fs.access(projectDir);
    } catch {
      return null;
    }

    const projectJsonPath = path.join(projectDir, "project.json");
    const seoJsonPath = path.join(projectDir, "seo.json");
    const galleryJsonPath = path.join(projectDir, "gallery.json");
    const faqJsonPath = path.join(projectDir, "faq.json");

    const projectRaw = await fs.readFile(projectJsonPath, "utf8");
    const projectData = JSON.parse(projectRaw);

    let seo = { title: projectData.name || "", description: "" };
    try {
      const seoRaw = await fs.readFile(seoJsonPath, "utf8");
      seo = JSON.parse(seoRaw);
    } catch {
      // Graceful fallback
    }

    let gallery = [];
    try {
      const galleryRaw = await fs.readFile(galleryJsonPath, "utf8");
      gallery = JSON.parse(galleryRaw);
    } catch {
      // Graceful fallback
    }

    let faqs = [];
    try {
      const faqRaw = await fs.readFile(faqJsonPath, "utf8");
      faqs = JSON.parse(faqRaw);
    } catch {
      // Graceful fallback
    }

    return {
      ...projectData,
      seo,
      gallery,
      faqs,
    } as Project;
  } catch (error) {
    console.error(`Failed to load project dataset for ${slug}:`, error);
    return null;
  }
}
