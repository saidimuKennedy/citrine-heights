"use client";

import Image from "next/image";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { ContactLabel, GoldRule, SectionContainer } from "./contact-primitives";
import type { ContactContent } from "@/lib/contact-content";

interface VisitSalesGalleryProps {
  salesGallery: ContactContent["salesGallery"];
}

export function VisitSalesGallery({ salesGallery }: VisitSalesGalleryProps) {
  return (
    <SectionContainer className="bg-[#F8F6F2]">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <MotionReveal y={28}>
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
            <Image
              src={salesGallery.image.src}
              alt={salesGallery.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </MotionReveal>

        <MotionReveal y={24} delay={0.1}>
          <ContactLabel>{salesGallery.label}</ContactLabel>
          <GoldRule className="mb-8" />
          <h2 className="mb-6 font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-4xl">
            {salesGallery.headline}
          </h2>
          <p className="mb-10 text-sm font-light leading-relaxed text-[#555555]">
            {salesGallery.description}
          </p>

          <dl className="space-y-6">
            <div>
              <dt className="mb-1 text-[10px] font-semibold tracking-[0.24em] text-[#C6A46A]">
                ADDRESS
              </dt>
              <dd className="text-sm font-light text-[#111111]">
                {salesGallery.address}
              </dd>
            </div>
            <div>
              <dt className="mb-1 text-[10px] font-semibold tracking-[0.24em] text-[#C6A46A]">
                OPENING HOURS
              </dt>
              <dd className="text-sm font-light text-[#111111]">
                {salesGallery.openingHours}
              </dd>
            </div>
            <div>
              <dt className="mb-1 text-[10px] font-semibold tracking-[0.24em] text-[#C6A46A]">
                PARKING
              </dt>
              <dd className="text-sm font-light text-[#111111]">
                {salesGallery.parking}
              </dd>
            </div>
            {salesGallery.appointmentRequired && (
              <div>
                <dt className="mb-1 text-[10px] font-semibold tracking-[0.24em] text-[#C6A46A]">
                  APPOINTMENT
                </dt>
                <dd className="text-sm font-light text-[#111111]">
                  Appointment recommended for private consultations
                </dd>
              </div>
            )}
          </dl>
        </MotionReveal>
      </div>
    </SectionContainer>
  );
}
