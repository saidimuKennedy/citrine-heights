"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { ContactLabel, GoldRule, SectionContainer } from "./contact-primitives";
import type { ContactContent } from "@/lib/contact-content";

interface ContactFaqProps {
  faq: ContactContent["faq"];
}

export function ContactFaq({ faq }: ContactFaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SectionContainer className="bg-[#F8F6F2]">
      <MotionReveal y={24} className="mb-14 md:mb-20">
        <ContactLabel>{faq.label}</ContactLabel>
        <GoldRule className="mb-8" />
        <h2 className="max-w-xl font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl">
          {faq.headline}
        </h2>
      </MotionReveal>

      <div className="mx-auto max-w-3xl divide-y divide-[#111111]/8">
        {faq.items.map((item, index) => {
          const isOpen = openId === item.id;
          return (
            <MotionReveal key={item.id} y={16} delay={index * 0.04}>
              <div>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-500 hover:text-[#C6A46A] md:py-8"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg font-light text-[#111111] md:text-xl">
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 text-[#C6A46A] transition-transform duration-500 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm font-light leading-relaxed text-[#555555] md:pb-8">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </MotionReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
