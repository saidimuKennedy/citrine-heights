"use client";

import { motion, type MotionProps } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface MotionRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function MotionReveal({
  children,
  className,
  delay = 0,
  y = 24,
  ...props
}: MotionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
