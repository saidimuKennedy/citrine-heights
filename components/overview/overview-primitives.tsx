"use client";

import type { ComponentType, ReactNode } from "react";
import * as Icons from "lucide-react";

export function EditorialLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-xs font-semibold tracking-[0.4em] text-[#C8A46B]">
      {children}
    </p>
  );
}

export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`h-px w-12 bg-[#C8A46B]/60 ${className}`} aria-hidden />
  );
}

export function renderIcon(
  iconName: string,
  className = "h-8 w-8 stroke-[1.25] text-[#C8A46B]",
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
