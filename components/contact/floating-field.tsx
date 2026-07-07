"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FloatingFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingField = forwardRef<HTMLInputElement, FloatingFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="relative">
        <input
          ref={ref}
          id={fieldId}
          placeholder=" "
          className={cn(
            "peer w-full border-0 border-b border-[#111111]/15 bg-transparent px-0 pb-2 pt-6 text-sm text-[#111111] outline-none transition-colors duration-500 focus:border-[#C6A46A] placeholder-transparent",
            error && "border-red-400/60",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={fieldId}
          className="pointer-events-none absolute left-0 top-2 text-[10px] font-semibold tracking-[0.2em] text-[#555555] transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-xs peer-placeholder-shown:tracking-[0.15em] peer-placeholder-shown:text-[#555555]/60 peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-[0.2em] peer-focus:text-[#C6A46A]"
        >
          {label.toUpperCase()}
        </label>
        {error && (
          <p className="mt-1 text-[10px] tracking-wide text-red-500/80">{error}</p>
        )}
      </div>
    );
  },
);
FloatingField.displayName = "FloatingField";

interface FloatingSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: string[];
  optionLabels?: string[];
}

export const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ label, error, options, optionLabels, className, id, ...props }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="relative">
        <select
          ref={ref}
          id={fieldId}
          className={cn(
            "peer w-full appearance-none border-0 border-b border-[#111111]/15 bg-transparent px-0 pb-2 pt-6 text-sm text-[#111111] outline-none transition-colors duration-500 focus:border-[#C6A46A]",
            error && "border-red-400/60",
            className,
          )}
          {...props}
        >
          {(optionLabels || options).map((opt, i) => (
            <option key={opt || `opt-${i}`} value={options[i]}>
              {opt || options[i]}
            </option>
          ))}
        </select>
        <label
          htmlFor={fieldId}
          className="pointer-events-none absolute left-0 top-2 text-[10px] font-semibold tracking-[0.2em] text-[#555555]"
        >
          {label.toUpperCase()}
        </label>
        {error && (
          <p className="mt-1 text-[10px] tracking-wide text-red-500/80">{error}</p>
        )}
      </div>
    );
  },
);
FloatingSelect.displayName = "FloatingSelect";

interface FloatingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="relative">
        <label
          htmlFor={fieldId}
          className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-[#555555]"
        >
          {label.toUpperCase()}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          rows={4}
          className={cn(
            "w-full resize-none border border-[#111111]/10 bg-white/40 px-4 py-4 text-sm text-[#111111] outline-none transition-colors duration-500 focus:border-[#C6A46A]",
            error && "border-red-400/60",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-[10px] tracking-wide text-red-500/80">{error}</p>
        )}
      </div>
    );
  },
);
FloatingTextarea.displayName = "FloatingTextarea";
