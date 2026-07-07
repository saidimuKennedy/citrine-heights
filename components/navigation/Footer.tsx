"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Download } from "lucide-react";
import { Project } from "@/types";

interface FooterProps {
  project?: Project;
}

export function Footer({ project }: FooterProps) {
  const projectName = project?.name || "Citrine Tower";
  const whatsappNum = project?.contact?.whatsapp?.number || "+254 700 000 000";
  const phoneNum = project?.contact?.salesPhone?.number || "+254 700 000 000";
  const emailAddr = project?.contact?.email || "info@citrineheights.co.ke";
  const currentYear = new Date().getFullYear();
  const slug = project?.slug || "citrine-heights";

  return (
    <footer
      id="contact"
      className="border-t border-white/[0.06] bg-[#111111] pb-10 pt-20 font-sans text-[#F7F4EF] md:pb-12 md:pt-28"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 md:px-12">
        <div className="grid grid-cols-1 gap-14 border-b border-white/8 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="mb-4 block text-[10px] font-semibold tracking-[0.35em] text-[#C6A46A]">
              KIANYINGI COMPANY LIMITED
            </span>
            <h3 className="mb-6 font-serif text-3xl font-light leading-tight tracking-tight text-[#F7F4EF] md:text-4xl">
              Experience {projectName}
              <br />
              for yourself.
            </h3>
            <p className="max-w-sm text-sm font-light leading-relaxed text-white/50">
              Westlands Road, opposite Global Trade Centre, Nairobi, Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <span className="mb-5 block text-[9px] font-semibold tracking-[0.3em] text-white/40">
                OFFICE
              </span>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#C6A46A]" />
                <p className="text-xs font-light leading-relaxed text-white/70">
                  Westlands Road
                  <br />
                  Nairobi, Kenya
                </p>
              </div>
            </div>

            <div>
              <span className="mb-5 block text-[9px] font-semibold tracking-[0.3em] text-white/40">
                CONTACT
              </span>
              <div className="flex flex-col gap-4">
                {project?.contact?.whatsapp && (
                  <a
                    href={`https://wa.me/${whatsappNum.replace(/\s+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-xs tracking-wide text-white/70 transition-colors duration-300 hover:text-[#C6A46A]"
                  >
                    <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.006 5.284 5.302-.013 11.805-.013c3.15.001 6.11 1.23 8.337 3.46 2.228 2.229 3.453 5.19 3.452 8.344-.006 6.525-5.302 11.822-11.805 11.822-2.006-.002-3.978-.511-5.727-1.48L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.807-9.805.002-2.62-1.018-5.086-2.872-6.942C16.299 1.996 13.841 1.015 11.801 1.015 6.398 1.015 2 5.413 1.997 10.824c-.001 1.516.406 3.002 1.18 4.316l-.99 3.616 3.731-.978zM17.9 14.5c-.294-.148-1.745-.86-2.012-.958-.267-.099-.461-.148-.655.148-.194.297-.75.958-.919 1.148-.17.19-.339.213-.633.065-.294-.148-1.242-.458-2.366-1.46-1.722-1.536-1.76-1.515-2.025-1.543-.265-.028-.461.028-.655.148-.194.12-.524.636-.524.636s-.194.24-.316.326c-.194.137-.4.07-.633-.065-.233-.135-1.637-.604-3.078-1.89-1.12-1.001-1.878-2.237-2.097-2.614-.22-.376-.023-.58.11-.726.11-.12.268-.313.4-.47.133-.156.177-.267.266-.445.09-.178.045-.333-.022-.482-.068-.148-.655-1.58-.897-2.164-.236-.569-.475-.492-.656-.5-.17-.008-.364-.01-.557-.01-.194 0-.51.072-.776.368-.266.297-1.018.995-1.018 2.423 0 1.43 1.04 2.81 1.185 3.01.144.195 2.046 3.125 4.957 4.382.693.3 1.233.48 1.654.614.697.221 1.332.19 1.833.114.558-.084 1.745-.713 1.992-1.402.247-.69.247-1.28.173-1.402-.073-.124-.267-.194-.56-.34z" />
                    </svg>
                    {whatsappNum}
                  </a>
                )}
                <a
                  href={`tel:${phoneNum.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 text-xs tracking-wide text-white/70 transition-colors duration-300 hover:text-[#C6A46A]"
                >
                  <Phone size={16} className="shrink-0 text-[#C6A46A]" />
                  {phoneNum}
                </a>
                <a
                  href={`mailto:${emailAddr}`}
                  className="flex items-center gap-3 text-xs tracking-wide text-white/70 transition-colors duration-300 hover:text-[#C6A46A]"
                >
                  <Mail size={16} className="shrink-0 text-[#C6A46A]" />
                  {emailAddr}
                </a>
              </div>
            </div>

            <div>
              <span className="mb-5 block text-[9px] font-semibold tracking-[0.3em] text-white/40">
                DOWNLOADS
              </span>
              <div className="flex flex-col gap-3">
                <a
                  href="/projects/citrine-heights/gallery/citrine.png"
                  className="flex items-center gap-3 text-xs tracking-wide text-white/70 transition-colors duration-300 hover:text-[#C6A46A]"
                >
                  <Download size={16} className="shrink-0 text-[#C6A46A]" />
                  Project Brochure
                </a>
                <Link
                  href={`/${slug}/gallery`}
                  className="text-xs tracking-wide text-white/70 transition-colors duration-300 hover:text-[#C6A46A]"
                >
                  Full Gallery →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 text-[10px] font-semibold tracking-[0.18em] text-white/40 md:flex-row">
          <span>
            © {currentYear} {projectName}. Kianyingi Company Limited. All Rights
            Reserved.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link
              href="https://instagram.com"
              className="transition-colors duration-300 hover:text-[#F7F4EF]"
            >
              INSTAGRAM
            </Link>
            <Link
              href="https://facebook.com"
              className="transition-colors duration-300 hover:text-[#F7F4EF]"
            >
              FACEBOOK
            </Link>
            <Link
              href="https://linkedin.com"
              className="transition-colors duration-300 hover:text-[#F7F4EF]"
            >
              LINKEDIN
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-[#F7F4EF]"
            >
              PRIVACY
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-[#F7F4EF]"
            >
              LEGAL
            </Link>
            <span className="text-white/30">CPR/2010/123456</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
