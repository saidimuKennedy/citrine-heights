"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Project } from "@/types";

interface HeaderProps {
  project?: Project;
  projectSlug?: string;
}

export function Header({ project, projectSlug }: HeaderProps) {
  const pathname = usePathname();
  const isGalleryPage = pathname?.includes("/gallery");
  const isOverviewPage = pathname?.includes("/overview");
  const isResidencesPage = pathname?.includes("/residences");
  const isAmenitiesPage = pathname?.includes("/amenities");
  const isLocationPage = pathname?.includes("/location");
  const isContactPage = pathname?.includes("/contact");
  const slug = projectSlug || project?.slug || "citrine-heights";
  const basePath = `/${slug}`;
  const isProjectHome = pathname === basePath;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLightPage =
    isOverviewPage ||
    (isResidencesPage && isScrolled) ||
    (isAmenitiesPage && isScrolled) ||
    (isLocationPage && isScrolled) ||
    (isContactPage && isScrolled);

  useEffect(() => {
    const getScrollThreshold = () => {
      if (isProjectHome) return window.innerHeight * 0.85;
      if (
        isResidencesPage ||
        isAmenitiesPage ||
        isLocationPage ||
        isContactPage
      ) {
        return window.innerHeight * 0.75;
      }
      return 120;
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > getScrollThreshold());
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [
    isProjectHome,
    isResidencesPage,
    isAmenitiesPage,
    isLocationPage,
    isContactPage,
  ]);

  const menuItems = [
    { label: "HOME", href: basePath, route: "home" },
    { label: "OVERVIEW", href: `${basePath}/overview`, route: "overview" },
    { label: "RESIDENCES", href: `${basePath}/residences`, route: "residences" },
    { label: "AMENITIES", href: `${basePath}/amenities`, route: "amenities" },
    { label: "LOCATION", href: `${basePath}/location`, route: "location" },
    { label: "GALLERY", href: `${basePath}/gallery`, route: "gallery" },
    { label: "CONTACT", href: `${basePath}/contact`, route: "contact" },
  ];

  const projectName = project?.name || "CITRINE TOWER";
  const projectLocation = project?.location?.address || "WESTLANDS, NAIROBI";

  const useFrostedGlass = isScrolled;
  const headerSurfaceClass = isLightPage
    ? useFrostedGlass
      ? "bg-[#F7F4EF]/90 backdrop-blur-xl border-b border-[#111111]/8"
      : "bg-transparent"
    : useFrostedGlass
      ? "bg-[#111111]/75 backdrop-blur-xl border-b border-white/[0.08]"
      : "bg-transparent";

  const projectNameClass = isLightPage && isScrolled ? "text-[#111111]" : isLightPage ? "text-[#111111]" : "text-white";
  const navLinkClass = (isActive: boolean) => {
    if (isActive) return "text-[#C6A46A]";
    if (isLightPage && !isProjectHome) {
      return isScrolled
        ? "text-[#111111]/70 hover:text-[#111111]"
        : "text-[#111111]/70 hover:text-[#111111]";
    }
    if (isProjectHome && !isScrolled) {
      return "text-white/70 hover:text-white";
    }
    return isLightPage
      ? "text-[#111111]/70 hover:text-[#111111]"
      : "text-white/70 hover:text-white";
  };

  const mobileToggleClass =
    isLightPage && !isProjectHome
      ? "text-[#111111]/95"
      : isProjectHome && !isScrolled
        ? "text-white/95"
        : isLightPage
          ? "text-[#111111]/95"
          : "text-white/95";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${headerSurfaceClass}`}
    >
      <div className="flex h-20 w-full items-center justify-between px-6 md:px-10">
        <Link href={basePath} className="group flex flex-shrink-0 items-center gap-4">
          <div className="relative flex h-9 w-9 items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full fill-none stroke-[#C6A46A] stroke-[1.5] transition-transform duration-700 group-hover:rotate-180"
            >
              <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" />
              <line x1="50" y1="5" x2="50" y2="95" />
              <line x1="10" y1="27" x2="90" y2="73" />
              <line x1="90" y1="27" x2="10" y2="73" />
              <polygon points="50,27 70,60 30,60" className="stroke-[#C6A46A]/60" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif text-lg font-medium leading-tight tracking-[0.25em] ${projectNameClass}`}
            >
              {projectName.toUpperCase()}
            </span>
            <span className="font-sans text-[9px] font-semibold tracking-[0.3em] text-[#C6A46A]">
              {projectLocation.toUpperCase()}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 xl:gap-10 lg:flex">
          {menuItems.map((item) => {
            const isActive =
              item.route === "home"
                ? isProjectHome
                : item.route === "gallery"
                  ? isGalleryPage
                  : item.route === "overview"
                    ? isOverviewPage
                    : item.route === "residences"
                      ? isResidencesPage
                      : item.route === "amenities"
                        ? isAmenitiesPage
                        : item.route === "location"
                          ? isLocationPage
                          : item.route === "contact"
                            ? isContactPage
                            : false;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`font-sans text-[11px] tracking-[0.18em] transition-colors duration-500 ${navLinkClass(isActive)}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-shrink-0 md:block">
          <Link
            href={`${basePath}/contact`}
            className="bg-[#C6A46A] px-7 py-2.5 font-sans text-[11px] font-medium tracking-[0.22em] text-[#111111] transition-all duration-500 hover:bg-[#d4b47a] active:scale-[0.98]"
          >
            BOOK VIEWING
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-1 focus:outline-none lg:hidden ${mobileToggleClass}`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#111111]/98 transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute right-6 top-6 text-white focus:outline-none"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-serif text-lg tracking-[0.25em] text-white/80 transition-colors duration-300 hover:text-[#C6A46A]"
          >
            {item.label}
          </Link>
        ))}

        <Link
          href={`${basePath}/contact`}
          onClick={() => setIsMobileMenuOpen(false)}
          className="mt-4 bg-[#C6A46A] px-8 py-3 font-sans text-sm font-medium tracking-[0.2em] text-[#111111] transition-all duration-300 hover:bg-[#d4b47a]"
        >
          BOOK VIEWING
        </Link>
      </div>
    </header>
  );
}
