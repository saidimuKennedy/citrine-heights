"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { ContactLabel, GoldRule, SectionContainer } from "./contact-primitives";
import type { ContactContent } from "@/lib/contact-content";

interface MeetTheTeamProps {
  team: ContactContent["team"];
}

export function MeetTheTeam({ team }: MeetTheTeamProps) {
  return (
    <SectionContainer className="bg-[#F8F6F2]">
      <MotionReveal y={24} className="mb-14 md:mb-20">
        <ContactLabel>{team.label}</ContactLabel>
        <GoldRule className="mb-8" />
        <h2 className="max-w-xl font-serif text-3xl font-light leading-[1.05] tracking-tight text-[#111111] md:text-5xl">
          {team.headline}
        </h2>
      </MotionReveal>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {team.members.map((member, index) => (
          <MotionReveal key={member.id} y={24} delay={index * 0.08}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="group"
            >
              <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-[#111111]/5">
                <Image
                  src={member.image.src}
                  alt={member.image.alt}
                  fill
                  className="object-cover transition-transform duration-[8000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>
              <h3 className="mb-1 font-serif text-xl font-light text-[#111111]">
                {member.name}
              </h3>
              <p className="mb-4 text-[10px] font-semibold tracking-[0.2em] text-[#C6A46A]">
                {member.role.toUpperCase()}
              </p>
              <a
                href={`mailto:${member.email}`}
                className="block text-xs font-light text-[#555555] transition-colors duration-500 hover:text-[#C6A46A]"
              >
                {member.email}
              </a>
              <a
                href={`tel:${member.phone.replace(/\s/g, "")}`}
                className="mt-1 block text-xs font-light text-[#555555] transition-colors duration-500 hover:text-[#C6A46A]"
              >
                {member.phone}
              </a>
            </motion.article>
          </MotionReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
