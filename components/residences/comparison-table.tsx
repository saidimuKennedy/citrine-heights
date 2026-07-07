"use client";

import { Check } from "lucide-react";
import { MotionReveal } from "@/components/gallery/motion-reveal";
import { EditorialLabel } from "@/components/overview/overview-primitives";
import type { ResidenceType } from "@/lib/residences-content";

interface ComparisonTableProps {
  label: string;
  headline: string;
  residences: ResidenceType[];
}

export function ComparisonTable({
  label,
  headline,
  residences,
}: ComparisonTableProps) {
  return (
    <section className="bg-[#F8F6F2] px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto max-w-5xl">
        <MotionReveal y={24} className="mb-16 md:mb-20">
          <EditorialLabel>{label}</EditorialLabel>
          <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#101010] md:text-5xl">
            {headline}
          </h2>
        </MotionReveal>

        <MotionReveal y={20} delay={0.1}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-[#101010]/10">
                  <th className="pb-5 pr-6 text-left text-[9px] font-semibold tracking-[0.25em] text-[#5A5A5A]">
                    UNIT
                  </th>
                  <th className="pb-5 px-4 text-left text-[9px] font-semibold tracking-[0.25em] text-[#5A5A5A]">
                    BEDS
                  </th>
                  <th className="pb-5 px-4 text-left text-[9px] font-semibold tracking-[0.25em] text-[#5A5A5A]">
                    BATHS
                  </th>
                  <th className="pb-5 px-4 text-left text-[9px] font-semibold tracking-[0.25em] text-[#5A5A5A]">
                    SIZE
                  </th>
                  <th className="pb-5 pl-4 text-center text-[9px] font-semibold tracking-[0.25em] text-[#5A5A5A]">
                    BALCONY
                  </th>
                </tr>
              </thead>
              <tbody>
                {residences.map((residence) => (
                  <tr
                    key={residence.id}
                    className="border-b border-[#101010]/6 transition-colors duration-500 hover:bg-white/40"
                  >
                    <td className="py-6 pr-6 font-serif text-xl font-light text-[#101010]">
                      {residence.title}
                    </td>
                    <td className="py-6 px-4 text-sm font-light text-[#5A5A5A]">
                      {residence.specs.beds}
                    </td>
                    <td className="py-6 px-4 text-sm font-light text-[#5A5A5A]">
                      {residence.specs.baths}
                    </td>
                    <td className="py-6 px-4 text-sm font-light text-[#5A5A5A]">
                      {residence.specs.size}
                    </td>
                    <td className="py-6 pl-4 text-center">
                      {residence.specs.balcony ? (
                        <Check
                          className="mx-auto h-4 w-4 text-[#C6A46A]"
                          aria-label="Yes"
                        />
                      ) : (
                        <span className="text-[#5A5A5A]/40">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
