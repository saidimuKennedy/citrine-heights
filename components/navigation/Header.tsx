"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Project } from "@/types";

interface HeaderProps {
  project?: Project;
}

export function Header({ project }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "OVERVIEW", href: "#overview" },
    { label: "RESIDENCES", href: "#residences" },
    { label: "AMENITIES", href: "#amenities" },
    { label: "LOCATION", href: "#location" },
    { label: "INVESTMENT", href: "#investment" },
    { label: "GALLERY", href: "#gallery" },
    { label: "CONTACT", href: "#contact" },
  ];

  const projectName = project?.name || "THE PRISM";
  const projectLocation = project?.location?.address || "WESTLANDS, NAIROBI";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 md:px-10 flex items-center justify-between h-20">
        {/* Logo Section */}
        <Link href="#" className="flex items-center gap-4 group flex-shrink-0">
          {/* Custom Geometric Prism SVG Logo */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full stroke-brand-gold stroke-[1.5] fill-none transition-transform duration-700 group-hover:rotate-180"
            >
              {/* Outer hexagon */}
              <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" />
              {/* Inner triangles / prism lines */}
              <line x1="50" y1="5" x2="50" y2="95" />
              <line x1="10" y1="27" x2="90" y2="73" />
              <line x1="90" y1="27" x2="10" y2="73" />
              <polygon points="50,27 70,60 30,60" className="stroke-brand-gold/60" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.25em] text-white leading-tight font-medium">
              {projectName.toUpperCase()}
            </span>
            <span className="text-[9px] tracking-[0.3em] text-brand-gold font-sans font-semibold">
              {projectLocation.toUpperCase()}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300 font-sans"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block flex-shrink-0">
          <Link
            href="#contact"
            className="border border-white/30 text-white hover:border-brand-gold hover:text-brand-gold px-7 py-2.5 text-xs tracking-[0.25em] font-sans font-medium transition-all duration-300 hover:bg-white/5 active:scale-[0.98] whitespace-nowrap"
          >
            BOOK A VIEWING
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white/95 focus:outline-none p-1"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Slideout */}
      <div
        className={`fixed inset-0 bg-black/95 z-40 transition-transform duration-500 lg:hidden flex flex-col justify-center items-center gap-8 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-white focus:outline-none"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg tracking-[0.25em] text-white/80 hover:text-brand-gold transition-colors duration-300 font-serif"
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="#contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className="border border-brand-gold text-brand-gold px-8 py-3 text-sm tracking-[0.2em] font-sans font-medium hover:bg-brand-gold hover:text-black transition-all duration-300 mt-4"
        >
          BOOK A VIEWING
        </Link>
      </div>
    </header>
  );
}
