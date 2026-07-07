"use client";

import type { ReactNode } from "react";

export function ContactLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-xs font-semibold tracking-[0.4em] text-[#C6A46A]">
      {children}
    </p>
  );
}

export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`h-px w-12 bg-[#C6A46A]/60 ${className}`} aria-hidden />
  );
}

export function SectionContainer({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 py-24 md:px-10 md:py-32 lg:px-16 ${className}`}>
      <div className="mx-auto max-w-[1400px]">{children}</div>
    </section>
  );
}
