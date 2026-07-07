"use client";

import { useState, type CSSProperties } from "react";
import { EDITORIAL } from "@/lib/editorial";
import type { ContactContent, JourneyId } from "@/lib/contact-content";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ContactHero } from "./contact-hero";
import { ContactWelcome } from "./contact-welcome";
import { WaysToConnect } from "./ways-to-connect";
import { ChooseJourney } from "./choose-journey";
import { ConsultationForm } from "./consultation-form";
import { ScheduleViewing } from "./schedule-viewing";
import { MeetTheTeam } from "./meet-the-team";
import { VisitSalesGallery } from "./visit-sales-gallery";
import { ContactMap } from "./contact-map";
import { ContactFaq } from "./contact-faq";
import { ResponsePromise } from "./response-promise";
import { DownloadCentre } from "./download-centre";
import { ContactCTA } from "./contact-cta";
import { WhatsAppButton } from "./whatsapp-button";

interface ContactExperienceProps {
  content: ContactContent;
}

export function ContactExperience({ content }: ContactExperienceProps) {
  const [journey, setJourney] = useState<JourneyId | null>("home");

  return (
    <SmoothScroll>
      <div
        className="bg-[#F8F6F2] text-[#555555] selection:bg-[#C6A46A] selection:text-[#111111]"
        style={{ "--editorial-ink": EDITORIAL.ink } as CSSProperties}
      >
        <ContactHero hero={content.hero} />
        <ContactWelcome welcome={content.welcome} />
        <WaysToConnect waysToConnect={content.waysToConnect} />
        <ChooseJourney
          journeys={content.journeys}
          selected={journey}
          onSelect={setJourney}
        />
        <ConsultationForm
          consultation={content.consultation}
          journey={journey}
        />
        <ScheduleViewing scheduleViewing={content.scheduleViewing} />
        <MeetTheTeam team={content.team} />
        <VisitSalesGallery salesGallery={content.salesGallery} />
        <ContactMap map={content.map} />
        <ContactFaq faq={content.faq} />
        <ResponsePromise responsePromise={content.responsePromise} />
        <DownloadCentre downloads={content.downloads} />
        <ContactCTA
          headline={content.cta.headline}
          buttonLabel={content.cta.buttonLabel}
        />
        <WhatsAppButton
          number={content.whatsapp.number}
          message={content.whatsapp.message}
        />
      </div>
    </SmoothScroll>
  );
}
