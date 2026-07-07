import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/project-loader";
import { generateProjectMetadata } from "@/lib/metadata";
import * as Icons from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ project: string }>;
}

// Generate dynamic SEO metadata for each project route
export async function generateMetadata({ params }: ProjectPageProps) {
  const { project: slug } = await params;
  return generateProjectMetadata(slug);
}

// Helper to resolve icon name strings to Lucide elements
const renderIcon = (iconName: string) => {
  const IconComponent = (Icons as any)[iconName];
  if (IconComponent) {
    return <IconComponent className="text-brand-gold w-8 h-8 stroke-[1.5]" />;
  }
  return <Icons.Sparkles className="text-brand-gold w-8 h-8 stroke-[1.5]" />;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { project: slug } = await params;
  const project = await getProject(slug);

  // Return 404 if the project is not found
  if (!project) {
    notFound();
  }

  const defaultImage = "/projects/citrine-heights/gallery/citrine heights.png";

  // Type-safe media extractors
  const heroImage = project.hero?.media?.type === "image" ? project.hero.media.image : null;
  const heroImageSrc = heroImage?.src || defaultImage;
  const heroImageAlt = heroImage?.alt || project.name;

  const overviewImage = project.overview?.media?.type === "image" ? project.overview.media.image : null;
  const overviewImageSrc = overviewImage?.src || defaultImage;
  const overviewImageAlt = overviewImage?.alt || "Luxury interior representation";

  return (
    <div className="bg-black text-white selection:bg-brand-gold selection:text-black">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            priority
            className="object-cover object-center scale-[1.02] brightness-75 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 z-10" />
        </div>

        {/* Text Overlays */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-12 w-full flex flex-col items-start pt-20">
          <span className="text-brand-gold text-xs md:text-sm tracking-[0.3em] font-semibold mb-4 uppercase animate-fade-in">
            {project.hero?.subtitle || "THE FUTURE OF LUXURY LIVING"}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white max-w-xs md:max-w-lg mb-6 font-light">
            {project.hero?.title || "Elevate Your World"}
          </h1>
          <p className="text-white/80 font-sans text-sm md:text-lg max-w-lg mb-8 leading-relaxed font-light">
            {project.hero?.tagline ||
              "A landmark address in Westlands that redefines sophistication, comfort and value."}
          </p>

          <Link
            href="#contact"
            className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black px-8 py-3.5 text-xs tracking-[0.25em] font-medium transition-all duration-300 active:scale-[0.98] inline-flex items-center gap-3 font-sans"
          >
            {project.hero?.primaryCta?.label || "BOOK A PRIVATE VIEWING"}
            <span className="text-lg leading-none">→</span>
          </Link>
        </div>

        {/* Right side slide navigator (mock) */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 text-white/40 text-[10px] tracking-widest font-semibold">
          <span className="hover:text-white cursor-pointer transition-colors duration-300">01</span>
          <div className="h-10 w-[1px] bg-white/20" />
          <span className="text-brand-gold">02</span>
          <div className="h-10 w-[1px] bg-white/20" />
          <span className="hover:text-white cursor-pointer transition-colors duration-300">03</span>
        </div>

      </section>

      {/* 2. ARCHITECTURE / ABOUT SECTION (Light Cream Background) */}
      <section id="overview" className="bg-[#F9F8F6] text-brand-dark font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col items-start justify-center px-6 md:px-16 py-16 md:py-20">
            <span className="text-brand-gold text-[10px] tracking-[0.3em] font-bold mb-4 uppercase">
              ABOUT {project.name.toUpperCase()}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-brand-dark mb-6 font-medium">
              {project.overview?.headline || "Architecture that inspires tomorrow."}
            </h2>
            {project.overview?.description?.map((p, idx) => (
              <p
                key={idx}
                className="text-brand-dark/75 text-sm md:text-base leading-relaxed mb-8 font-light"
              >
                {p}
              </p>
            ))}
            <Link
              href="#gallery"
              className="text-brand-dark border-b border-brand-dark/20 hover:border-brand-gold hover:text-brand-gold pb-1 text-xs tracking-[0.2em] font-semibold transition-all duration-300 inline-flex items-center gap-2"
            >
              DISCOVER THE VISION
              <span className="text-sm">→</span>
            </Link>
          </div>

          <div className="lg:col-span-7 relative w-full min-h-[320px] aspect-[3/2] lg:aspect-auto">
            <Image
              src={overviewImageSrc}
              alt={overviewImageAlt}
              fill
              className="object-cover hover:scale-[1.03] transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 3. VALUE GRID SECTION (Dark Slate Background) */}
      {((project as any).valueGrid) && (
        <section id="residences" className="relative bg-brand-charcoal
         overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/projects/citrine-heights/gallery/marble.jpg"
              alt=""
              fill
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-brand-charcoal/70" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {((project as any).valueGrid || []).map((item: any) => (
              <div key={item.id} className="flex flex-col items-start gap-4">
                {renderIcon(item.icon)}
                <h4 className="text-brand-gold text-xs tracking-[0.2em] font-semibold uppercase mt-2">
                  {item.title}
                </h4>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* 4. THE TOWER SECTION */}
      {((project as any).tower) && (
        <section className="bg-black">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Tower hero image */}
            <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[480px]">
              <Image
                src={
                  (project as any).tower?.media?.image?.src ||
                  "/projects/citrine-heights/gallery/cetrine-icon.png"
                }
                alt={(project as any).tower?.media?.image?.alt || "Tower facade rendering"}
                fill
                className="object-cover hover:scale-[1.03] transition-transform duration-1000"
              />
            </div>

            {/* Right Text Column */}
            <div className="lg:col-span-6 flex flex-col items-start justify-center px-6 md:px-16 py-16 md:py-20 bg-[#0B0C0E]">
              <span className="text-brand-gold text-[10px] tracking-[0.3em] font-bold mb-4 uppercase">
                THE TOWER
              </span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-white mb-6 font-medium">
                {(project as any).tower?.headline}
              </h2>
              {(project as any).tower?.description?.map((p: string, idx: number) => (
                <p key={idx} className="text-white/70 text-sm md:text-base leading-relaxed mb-8 font-light">
                  {p}
                </p>
              ))}

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-6 w-full mb-10">
                {((project as any).tower?.stats || []).map((stat: any, idx: number) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-serif text-2xl md:text-3xl text-brand-gold font-light mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[9px] tracking-[0.15em] text-white/50 font-bold uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="#contact"
                className="text-white border-b border-white/20 hover:border-brand-gold hover:text-brand-gold pb-1 text-xs tracking-[0.2em] font-semibold transition-all duration-300 inline-flex items-center gap-2"
              >
                EXPLORE THE TOWER
                <span className="text-sm">→</span>
              </Link>
            </div>
          </div>

          {/* Full-width amenity thumbnail strip */}
          <div id="amenities" className="grid grid-cols-2 sm:grid-cols-4">
            {((project as any).amenitiesList || []).map((amenity: any) => (
              <div
                key={amenity.id}
                className="group relative aspect-[4/3] sm:aspect-[5/4] overflow-hidden cursor-pointer bg-black"
              >
                <Image
                  src={amenity.image || defaultImage}
                  alt={amenity.title}
                  fill
                  className="object-cover brightness-[0.65] group-hover:brightness-[0.45] group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-4 flex items-end">
                  <span className="text-white text-[10px] tracking-[0.15em] font-semibold uppercase inline-flex items-center gap-2">
                    {amenity.title}
                    <span className="text-brand-gold">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. INVESTMENT SECTION (Light Cream Background) */}
      {project.investment && (
        <section id="investment" className="bg-[#F9F8F6] text-brand-dark py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
              <span className="text-brand-gold text-[10px] tracking-[0.3em] font-bold mb-4 uppercase">
                INVEST WITH CONFIDENCE
              </span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-brand-dark font-medium">
                {project.investment.headline || "Built for today. Valued for tomorrow."}
              </h2>
            </div>

            {/* Right Yield Stats & Button */}
            <div className="lg:col-span-7 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-8 md:p-10 border border-brand-dark/5 shadow-md">
              {/* Stat Indicators */}
              <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 w-full justify-between">
                {(project.investment as any).highlights?.map((highlight: any, idx: number) => (
                  <div key={idx} className="flex flex-col items-start">
                    {renderIcon(highlight.icon)}
                    <span className="font-serif text-3xl text-brand-dark font-medium mt-3 mb-1">
                      {highlight.value}
                    </span>
                    <span className="text-[9px] tracking-[0.2em] text-brand-dark/50 font-bold uppercase">
                      {highlight.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <Link
                href="#contact"
                className="bg-brand-charcoal hover:bg-brand-dark text-white px-6 py-4 text-[10px] tracking-[0.25em] font-medium transition-all duration-300 active:scale-[0.98] whitespace-nowrap text-center font-sans mt-4 md:mt-0"
              >
                VIEW INVESTMENT DETAILS
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
