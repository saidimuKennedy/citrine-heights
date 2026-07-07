"use client";

import type { ReactNode } from "react";
import Link from "next/link";

export const PALETTE = {
  charcoal: "#111111",
  cream: "#F7F4EF",
  gold: "#C6A46A",
  slate: "#4F4F4F",
} as const;

export function EditorialLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-[10px] font-semibold tracking-[0.4em] text-[#C6A46A] md:text-xs">
      {children}
    </p>
  );
}

export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`h-px w-12 bg-[#C6A46A]/60 ${className}`} aria-hidden />
  );
}

export function TextLink({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light";
}) {
  const colors =
    variant === "light"
      ? "text-[#F7F4EF] border-[#F7F4EF]/20 hover:border-[#C6A46A] hover:text-[#C6A46A]"
      : "text-[#111111] border-[#111111]/15 hover:border-[#C6A46A] hover:text-[#C6A46A]";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 border-b pb-1 text-[10px] font-semibold tracking-[0.25em] transition-all duration-500 md:text-[11px] ${colors}`}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

export function SectionHeading({
  children,
  className = "",
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <h2
      className={`whitespace-pre-line font-serif text-4xl font-light leading-[1.02] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl ${
        light ? "text-[#F7F4EF]" : "text-[#111111]"
      } ${className}`}
    >
      {children}
    </h2>
  );
}
