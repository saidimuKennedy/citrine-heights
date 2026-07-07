"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface WhatsAppButtonProps {
  number: string;
  message: string;
}

export function WhatsAppButton({ number, message }: WhatsAppButtonProps) {
  const href = `https://wa.me/${number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 border border-[#C6A46A]/30 bg-[#111111]/90 px-5 py-3 backdrop-blur-sm transition-all duration-700 hover:border-[#C6A46A] hover:bg-[#111111]"
        aria-label="Chat on WhatsApp"
      >
        <span className="flex h-8 w-8 items-center justify-center border border-[#C6A46A]/40 text-[10px] font-bold tracking-wider text-[#C6A46A] transition-colors duration-500 group-hover:bg-[#C6A46A] group-hover:text-[#111111]">
          WA
        </span>
        <span className="hidden text-[10px] font-semibold tracking-[0.2em] text-[#F8F6F2] sm:block">
          WHATSAPP
        </span>
      </Link>
    </motion.div>
  );
}
