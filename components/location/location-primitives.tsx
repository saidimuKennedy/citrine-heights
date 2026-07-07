"use client";

import type { ReactNode } from "react";

export function EditorialLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mb-5 text-xs font-semibold tracking-[0.4em] text-[#C6A46A] ${className}`}
    >
      {children}
    </p>
  );
}

export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`h-px w-12 bg-[#C6A46A]/60 ${className}`} aria-hidden />
  );
}
