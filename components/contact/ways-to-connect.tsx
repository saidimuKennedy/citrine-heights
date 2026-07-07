"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { ContactLabel, GoldRule, SectionContainer } from "./contact-primitives";
import type { ContactContent } from "@/lib/contact-content";

interface WaysToConnectProps {
  waysToConnect: ContactContent["waysToConnect"];
}

export function WaysToConnect({ waysToConnect }: WaysToConnectProps) {
  return (
    <SectionContainer className="bg-[#F8F6F2]">
      <MotionReveal y={24} className="mb-16 md:mb-20">
        <ContactLabel>{waysToConnect.label}</ContactLabel>
        <GoldRule className="mb-8" />
        <h2 className="max-w-xl font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl">
          {waysToConnect.headline}
        </h2>
      </MotionReveal>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {waysToConnect.cards.map((card, index) => (
          <MotionReveal key={card.id} y={24} delay={index * 0.08}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="group flex h-full flex-col border border-[#111111]/8 bg-white/50 p-8 transition-colors duration-700 hover:border-[#C6A46A]/30 md:p-10"
            >
              <h3 className="mb-4 font-serif text-2xl font-light text-[#111111]">
                {card.title}
              </h3>
              <p className="mb-8 flex-grow text-sm font-light leading-relaxed text-[#555555]">
                {card.description}
              </p>
              <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-[#C6A46A]">
                {card.contact}
              </p>
              <Link
                href={card.action}
                className="inline-flex w-fit items-center gap-2 border border-[#111111]/15 px-6 py-2.5 text-[10px] font-semibold tracking-[0.24em] text-[#111111] transition-all duration-500 group-hover:border-[#C6A46A] group-hover:text-[#C6A46A]"
              >
                {card.actionLabel}
                <span aria-hidden>→</span>
              </Link>
            </motion.article>
          </MotionReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
