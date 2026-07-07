"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { ContactLabel, GoldRule, SectionContainer } from "./contact-primitives";
import { FloatingField } from "./floating-field";
import type { ContactContent } from "@/lib/contact-content";

const viewingSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
});

type ViewingFormValues = z.infer<typeof viewingSchema>;

const STEPS = ["Property", "Date", "Time", "Format", "Confirm"] as const;

interface ScheduleViewingProps {
  scheduleViewing: ContactContent["scheduleViewing"];
}

export function ScheduleViewing({ scheduleViewing }: ScheduleViewingProps) {
  const [step, setStep] = useState(0);
  const [property, setProperty] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [format, setFormat] = useState<"In Person" | "Virtual">("In Person");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ViewingFormValues>({
    resolver: zodResolver(viewingSchema),
  });

  const canAdvance = () => {
    if (step === 0) return property.length > 0;
    if (step === 1) return date.length > 0;
    if (step === 2) return time.length > 0;
    if (step === 3) return format.length > 0;
    return true;
  };

  const onSubmit = () => {
    setSubmitted(true);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <SectionContainer id="schedule-viewing" className="bg-[#111111]">
      <MotionReveal y={24} className="mb-14 md:mb-20">
        <ContactLabel>{scheduleViewing.label}</ContactLabel>
        <GoldRule className="mb-8" />
        <h2 className="mb-4 max-w-2xl font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#F8F6F2] md:text-5xl">
          {scheduleViewing.headline}
        </h2>
        <p className="max-w-lg text-sm font-light leading-relaxed text-white/50">
          {scheduleViewing.description}
        </p>
      </MotionReveal>

      {submitted ? (
        <MotionReveal y={20}>
          <div className="mx-auto max-w-lg border border-[#C6A46A]/30 bg-[#C6A46A]/5 p-8 text-center md:p-12">
            <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-[#C6A46A]">
              VIEWING REQUESTED
            </p>
            <h3 className="mb-4 font-serif text-2xl font-light text-[#F8F6F2]">
              We will confirm your appointment.
            </h3>
            <p className="text-sm font-light leading-relaxed text-white/50">
              {property} — {date} at {time} ({format}). Our team will contact
              you shortly to confirm.
            </p>
          </div>
        </MotionReveal>
      ) : (
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 flex items-center justify-between">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center text-[10px] font-semibold tracking-wider transition-colors duration-500 ${
                    i <= step
                      ? "bg-[#C6A46A] text-[#111111]"
                      : "border border-white/15 text-white/30"
                  }`}
                >
                  {i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-2 h-px flex-1 transition-colors duration-500 ${
                      i < step ? "bg-[#C6A46A]" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="min-h-[280px]"
            >
              {step === 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {scheduleViewing.properties.map((prop) => (
                    <button
                      key={prop}
                      type="button"
                      onClick={() => setProperty(prop)}
                      className={`border p-5 text-left text-sm transition-all duration-500 ${
                        property === prop
                          ? "border-[#C6A46A] bg-[#C6A46A]/10 text-[#F8F6F2]"
                          : "border-white/10 text-white/60 hover:border-[#C6A46A]/40"
                      }`}
                    >
                      {prop}
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div>
                  <label className="mb-4 block text-[10px] font-semibold tracking-[0.24em] text-white/40">
                    SELECT DATE
                  </label>
                  <input
                    type="date"
                    min={minDateStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-[#F8F6F2] outline-none focus:border-[#C6A46A]"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {scheduleViewing.timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`border p-4 text-center text-xs font-semibold tracking-[0.15em] transition-all duration-500 ${
                        time === slot
                          ? "border-[#C6A46A] bg-[#C6A46A]/10 text-[#F8F6F2]"
                          : "border-white/10 text-white/60 hover:border-[#C6A46A]/40"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {(["In Person", "Virtual"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormat(opt)}
                      className={`border p-8 text-center transition-all duration-500 ${
                        format === opt
                          ? "border-[#C6A46A] bg-[#C6A46A]/10"
                          : "border-white/10 hover:border-[#C6A46A]/40"
                      }`}
                    >
                      <p className="font-serif text-xl font-light text-[#F8F6F2]">
                        {opt}
                      </p>
                      <p className="mt-2 text-xs font-light text-white/40">
                        {opt === "In Person"
                          ? "Visit our sales gallery on Westlands Road"
                          : "Live video walkthrough with an advisor"}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="mb-6 rounded border border-white/10 bg-white/[0.02] p-6">
                    <p className="text-[10px] font-semibold tracking-[0.24em] text-[#C6A46A]">
                      YOUR SELECTION
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      {property} — {date} at {time} ({format})
                    </p>
                  </div>
                  <FloatingField
                    label="Full Name"
                    error={errors.name?.message}
                    className="!text-[#F8F6F2] !border-white/15 focus:!border-[#C6A46A]"
                    {...register("name")}
                  />
                  <FloatingField
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    className="!text-[#F8F6F2] !border-white/15 focus:!border-[#C6A46A]"
                    {...register("email")}
                  />
                  <FloatingField
                    label="Phone"
                    type="tel"
                    error={errors.phone?.message}
                    className="!text-[#F8F6F2] !border-white/15 focus:!border-[#C6A46A]"
                    {...register("phone")}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C6A46A] px-8 py-4 text-[10px] font-semibold tracking-[0.28em] text-[#111111] transition-all duration-500 hover:bg-[#d4b47a] disabled:opacity-50"
                  >
                    {isSubmitting
                      ? "SUBMITTING..."
                      : scheduleViewing.submitLabel}
                  </button>
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          {step < 4 && (
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-[10px] font-semibold tracking-[0.24em] text-white/30 transition-colors duration-500 hover:text-white/60 disabled:opacity-0"
              >
                BACK
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className="border border-[#C6A46A]/50 px-8 py-3 text-[10px] font-semibold tracking-[0.24em] text-[#F8F6F2] transition-all duration-500 hover:border-[#C6A46A] hover:bg-[#C6A46A]/10 disabled:opacity-30"
              >
                CONTINUE
              </button>
            </div>
          )}
        </div>
      )}
    </SectionContainer>
  );
}
