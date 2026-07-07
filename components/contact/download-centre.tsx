"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { ContactLabel, GoldRule, SectionContainer } from "./contact-primitives";
import { FloatingField } from "./floating-field";
import type { ContactContent } from "@/lib/contact-content";

const unlockSchema = z.object({
  fullName: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
});

type UnlockFormValues = z.infer<typeof unlockSchema>;

interface DownloadCentreProps {
  downloads: ContactContent["downloads"];
}

export function DownloadCentre({ downloads }: DownloadCentreProps) {
  const [unlocked, setUnlocked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UnlockFormValues>({
    resolver: zodResolver(unlockSchema),
  });

  const onSubmit = () => {
    setUnlocked(true);
  };

  return (
    <SectionContainer id="downloads" className="bg-[#F8F6F2]">
      <MotionReveal y={24} className="mb-14 md:mb-20">
        <ContactLabel>{downloads.label}</ContactLabel>
        <GoldRule className="mb-8" />
        <h2 className="mb-4 max-w-xl font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl">
          {downloads.headline}
        </h2>
        <p className="max-w-lg text-sm font-light leading-relaxed text-[#555555]">
          {downloads.description}
        </p>
      </MotionReveal>

      {!unlocked ? (
        <MotionReveal y={20} className="mx-auto mb-16 max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <FloatingField
              label="Phone"
              type="tel"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#111111] px-8 py-4 text-[10px] font-semibold tracking-[0.28em] text-[#F8F6F2] transition-all duration-500 hover:bg-[#C6A46A] hover:text-[#111111] disabled:opacity-50"
            >
              {isSubmitting ? "UNLOCKING..." : downloads.unlockLabel}
            </button>
          </form>
        </MotionReveal>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {downloads.items.map((item, index) => (
            <MotionReveal key={item.id} y={20} delay={index * 0.06}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="group flex h-full flex-col border border-[#111111]/8 bg-white/50 p-6 transition-colors duration-700 hover:border-[#C6A46A]/30 md:p-8"
              >
                <h3 className="mb-2 font-serif text-lg font-light text-[#111111]">
                  {item.title}
                </h3>
                <p className="mb-6 flex-grow text-xs font-light leading-relaxed text-[#555555]">
                  {item.description}
                </p>
                <a
                  href={item.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-[#C6A46A] transition-colors duration-500 hover:text-[#111111]"
                >
                  DOWNLOAD
                  <span aria-hidden>→</span>
                </a>
              </motion.article>
            </MotionReveal>
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
