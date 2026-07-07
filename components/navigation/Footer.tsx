"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Project } from "@/types";

interface FooterProps {
  project?: Project;
}

export function Footer({ project }: FooterProps) {
  const projectName = project?.name || "THE PRISM";
  const whatsappNum = project?.contact?.whatsapp?.number || "+254 700 000 000";
  const phoneNum = project?.contact?.salesPhone?.number || "+254 700 000 000";
  const emailAddr = project?.contact?.email || "info@theprism.co.ke";
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-brand-charcoal text-white border-t border-white/10 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        {/* Top Call to Action Panel */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="flex flex-col">
            <span className="text-brand-gold text-[10px] tracking-[0.3em] font-semibold mb-2">
              BOOK A PRIVATE VIEWING
            </span>
            <h3 className="font-serif text-2xl md:text-3xl tracking-wide text-white font-medium">
              Experience {projectName} <br />
              for yourself.
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-8 lg:gap-12">
            {/* WhatsApp channel */}
            {project?.contact?.whatsapp && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-brand-gold">
                  {/* WhatsApp Custom SVG */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.006 5.284 5.302-.013 11.805-.013c3.15.001 6.11 1.23 8.337 3.46 2.228 2.229 3.453 5.19 3.452 8.344-.006 6.525-5.302 11.822-11.805 11.822-2.006-.002-3.978-.511-5.727-1.48L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.807-9.805.002-2.62-1.018-5.086-2.872-6.942C16.299 1.996 13.841 1.015 11.801 1.015 6.398 1.015 2 5.413 1.997 10.824c-.001 1.516.406 3.002 1.18 4.316l-.99 3.616 3.731-.978zM17.9 14.5c-.294-.148-1.745-.86-2.012-.958-.267-.099-.461-.148-.655.148-.194.297-.75.958-.919 1.148-.17.19-.339.213-.633.065-.294-.148-1.242-.458-2.366-1.46-1.722-1.536-1.76-1.515-2.025-1.543-.265-.028-.461.028-.655.148-.194.12-.524.636-.524.636s-.194.24-.316.326c-.194.137-.4.07-.633-.065-.233-.135-1.637-.604-3.078-1.89-1.12-1.001-1.878-2.237-2.097-2.614-.22-.376-.023-.58.11-.726.11-.12.268-.313.4-.47.133-.156.177-.267.266-.445.09-.178.045-.333-.022-.482-.068-.148-.655-1.58-.897-2.164-.236-.569-.475-.492-.656-.5-.17-.008-.364-.01-.557-.01-.194 0-.51.072-.776.368-.266.297-1.018.995-1.018 2.423 0 1.43 1.04 2.81 1.185 3.01.144.195 2.046 3.125 4.957 4.382.693.3 1.233.48 1.654.614.697.221 1.332.19 1.833.114.558-.084 1.745-.713 1.992-1.402.247-.69.247-1.28.173-1.402-.073-.124-.267-.194-.56-.34z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] tracking-wider text-white/50">WHATSAPP</span>
                  <a
                    href={`https://wa.me/${whatsappNum.replace(/\s+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold tracking-widest text-white hover:text-brand-gold transition-colors"
                  >
                    {whatsappNum}
                  </a>
                </div>
              </div>
            )}

            {/* Phone channel */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-brand-gold">
                <Phone size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] tracking-wider text-white/50">CALL US</span>
                <a
                  href={`tel:${phoneNum.replace(/\s+/g, "")}`}
                  className="text-xs font-semibold tracking-widest text-white hover:text-brand-gold transition-colors"
                >
                  {phoneNum}
                </a>
              </div>
            </div>

            {/* Email channel */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-brand-gold">
                <Mail size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] tracking-wider text-white/50">EMAIL US</span>
                <a
                  href={`mailto:${emailAddr}`}
                  className="text-xs font-semibold tracking-wider text-white hover:text-brand-gold transition-colors"
                >
                  {emailAddr}
                </a>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="#contact"
              className="bg-brand-gold hover:bg-brand-gold/90 text-black px-6 py-3 text-xs tracking-[0.25em] font-medium transition-all duration-300 active:scale-[0.98] inline-flex items-center gap-2 font-sans"
            >
              BOOK A VIEWING
              <span className="text-lg leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Socials & Legals row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] tracking-[0.2em] text-white/50 font-semibold">
          {/* Copyright */}
          <span>© {currentYear} {projectName}. All Rights Reserved.</span>

          {/* Social Links */}
          <div className="flex items-center gap-8">
            <Link href="https://instagram.com" className="hover:text-white transition-colors duration-300">
              INSTAGRAM
            </Link>
            <Link href="https://facebook.com" className="hover:text-white transition-colors duration-300">
              FACEBOOK
            </Link>
            <Link href="https://linkedin.com" className="hover:text-white transition-colors duration-300">
              LINKEDIN
            </Link>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">
              PRIVACY POLICY
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">
              TERMS & CONDITIONS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
