// ============================================================
// FAQItem — Premium accordion with blur animation + numbered variant
// ============================================================

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
  index?: number;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function FAQItem({
  question,
  answer,
  defaultOpen = false,
  index,
  className,
  isOpen: controlledIsOpen,
  onToggle,
}: FAQItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <motion.div
      layout
      className={cn(
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        isOpen
          ? "border-brand-200 bg-white shadow-[0_4px_24px_oklch(0.55_0.18_250/0.08)]"
          : "border-gray-100 bg-white shadow-[0_1px_3px_oklch(0_0_0/0.05)] hover:border-brand-100 hover:shadow-[0_4px_16px_oklch(0_0_0/0.06)]",
        className
      )}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          {index !== undefined && (
            <span
              className={cn(
                "shrink-0 font-heading text-sm font-black tabular-nums transition-colors duration-300",
                isOpen ? "gradient-text" : "text-muted-foreground/40"
              )}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <span className="font-heading text-[15px] font-bold text-foreground sm:text-base">
            {question}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease }}
          className={cn(
            "shrink-0 flex size-7 items-center justify-center rounded-full transition-colors duration-300",
            isOpen
              ? "bg-brand-500 text-white"
              : "bg-muted text-muted-foreground"
          )}
        >
          {isOpen ? (
            <Minus className="size-3.5" aria-hidden="true" />
          ) : (
            <Plus className="size-3.5" aria-hidden="true" />
          )}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "border-t border-gray-50 pb-6 pt-4 text-[15px] leading-relaxed text-muted-foreground",
                index !== undefined ? "pl-16 pr-7" : "px-7"
              )}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
