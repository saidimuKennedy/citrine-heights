"use client";

import type { ComponentType, ReactNode } from "react";
import * as Icons from "lucide-react";

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

export function renderIcon(
  iconName: string,
  className = "h-7 w-7 stroke-[1.25] text-[#C6A46A]",
) {
  const icons = Icons as unknown as Record<
    string,
    ComponentType<{ className?: string }>
  >;
  const IconComponent = icons[iconName];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <Icons.Sparkles className={className} />;
}
