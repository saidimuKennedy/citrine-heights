"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { ContactLabel, GoldRule, SectionContainer } from "./contact-primitives";
import { FloatingField, FloatingSelect, FloatingTextarea } from "./floating-field";
import { CalendarLinks } from "./calendar-links";
import type { ContactContent, JourneyId } from "@/lib/contact-content";

const baseSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  country: z.string().min(2, "Please enter your country"),
  residenceType: z.string().min(1, "Please select a residence type"),
  budgetRange: z.string().optional(),
  contactMethod: z.string().min(1, "Please select a contact method"),
  viewingType: z.string().min(1, "Please select a viewing preference"),
  message: z.string().optional(),
  timezone: z.string().optional(),
  investmentFocus: z.string().optional(),
  companyName: z.string().optional(),
  partnershipType: z.string().optional(),
});

type FormValues = z.infer<typeof baseSchema>;

const JOURNEY_COPY: Record<
  JourneyId,
  { intro: string; messagePlaceholder: string }
> = {
  home: {
    intro:
      "Tell us about the home you envision — family size, lifestyle preferences, and move-in timeline.",
    messagePlaceholder:
      "Share details about your ideal home, family needs, or any questions...",
  },
  investor: {
    intro:
      "Share your investment goals — portfolio strategy, expected returns, and preferred unit types.",
    messagePlaceholder:
      "Describe your investment criteria, timeline, or portfolio goals...",
  },
  diaspora: {
    intro:
      "We specialise in remote purchases. Tell us where you are based and how we can accommodate your timezone.",
    messagePlaceholder:
      "Share your location abroad, preferred contact hours, or remote purchase questions...",
  },
  partner: {
    intro:
      "Interested in partnering with us? Share your agency details and collaboration interests.",
    messagePlaceholder:
      "Describe your agency, referral network, or partnership proposal...",
  },
};

interface ConsultationFormProps {
  consultation: ContactContent["consultation"];
  journey: JourneyId | null;
}

export function ConsultationForm({
  consultation,
  journey,
}: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      contactMethod: consultation.contactMethods[0],
      viewingType: consultation.viewingTypes[0],
    },
  });

  const journeyCopy = journey
    ? JOURNEY_COPY[journey]
    : {
        intro: consultation.description,
        messagePlaceholder: "How can we help you today?",
      };

  const onSubmit = (data: FormValues) => {
    setSubmittedData(data);
    setSubmitted(true);
  };

  return (
    <SectionContainer id="consultation" className="bg-[#F8F6F2]">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <MotionReveal y={28} className="relative hidden lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={consultation.image.src}
                alt={consultation.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/30 to-transparent" />
            </div>
          </div>
        </MotionReveal>

        <div>
          <MotionReveal y={24}>
            <ContactLabel>{consultation.label}</ContactLabel>
            <GoldRule className="mb-8" />
            <h2 className="mb-4 font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-4xl">
              {consultation.headline}
            </h2>
            <p className="mb-10 text-sm font-light leading-relaxed text-[#555555]">
              {journeyCopy.intro}
            </p>
          </MotionReveal>

          {submitted && submittedData ? (
            <MotionReveal y={20}>
              <div className="border border-[#C6A46A]/30 bg-white/60 p-8 md:p-10">
                <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-[#C6A46A]">
                  REQUEST RECEIVED
                </p>
                <h3 className="mb-4 font-serif text-2xl font-light text-[#111111]">
                  Thank you, {submittedData.fullName.split(" ")[0]}.
                </h3>
                <p className="mb-8 text-sm font-light leading-relaxed text-[#555555]">
                  A dedicated advisor will contact you within one business day
                  via your preferred method — {submittedData.contactMethod}.
                </p>
                <CalendarLinks
                  title="Citrine Heights — Private Consultation"
                  description={`Consultation with Citrine Heights sales team. Contact: ${submittedData.email}`}
                  attendeeName={submittedData.fullName}
                  attendeeEmail={submittedData.email}
                />
              </div>
            </MotionReveal>
          ) : (
            <MotionReveal y={20} delay={0.1}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid gap-6 md:grid-cols-2">
                  <FloatingField
                    label="Full Name"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                  />
                  <FloatingField
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FloatingField
                    label="Phone"
                    type="tel"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                  <FloatingField
                    label="Country of Residence"
                    error={errors.country?.message}
                    {...register("country")}
                  />
                </div>

                {journey === "diaspora" && (
                  <FloatingField
                    label="Timezone"
                    placeholder="e.g. GMT, EST, GST"
                    error={errors.timezone?.message}
                    {...register("timezone", {
                      required: journey === "diaspora",
                    })}
                  />
                )}

                {journey === "investor" && (
                  <FloatingField
                    label="Investment Focus"
                    placeholder="e.g. Rental yield, capital growth, portfolio diversification"
                    error={errors.investmentFocus?.message}
                    {...register("investmentFocus")}
                  />
                )}

                {journey === "partner" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <FloatingField
                      label="Company / Agency Name"
                      error={errors.companyName?.message}
                      {...register("companyName")}
                    />
                    <FloatingField
                      label="Partnership Type"
                      placeholder="e.g. Referral, agency, corporate"
                      error={errors.partnershipType?.message}
                      {...register("partnershipType")}
                    />
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <FloatingSelect
                    label="Interested Residence Type"
                    error={errors.residenceType?.message}
                    options={consultation.residenceTypes}
                    {...register("residenceType")}
                  />
                  <FloatingSelect
                    label="Budget Range (Optional)"
                    error={errors.budgetRange?.message}
                    options={["", ...consultation.budgetRanges]}
                    optionLabels={["Select budget range", ...consultation.budgetRanges]}
                    {...register("budgetRange")}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FloatingSelect
                    label="Preferred Contact Method"
                    error={errors.contactMethod?.message}
                    options={consultation.contactMethods}
                    {...register("contactMethod")}
                  />
                  <FloatingSelect
                    label="Preferred Viewing"
                    error={errors.viewingType?.message}
                    options={consultation.viewingTypes}
                    {...register("viewingType")}
                  />
                </div>

                <FloatingTextarea
                  label="Message"
                  placeholder={journeyCopy.messagePlaceholder}
                  error={errors.message?.message}
                  {...register("message")}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#111111] px-8 py-4 text-[10px] font-semibold tracking-[0.28em] text-[#F8F6F2] transition-all duration-500 hover:bg-[#C6A46A] hover:text-[#111111] disabled:opacity-50 md:text-[11px]"
                >
                  {isSubmitting ? "SUBMITTING..." : consultation.submitLabel}
                </button>
              </form>
            </MotionReveal>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
