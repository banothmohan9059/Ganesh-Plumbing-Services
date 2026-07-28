// ============================================================
// FloatingActions — Premium WhatsApp, Back-to-top, Mobile CTA
// ============================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants";

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    setShowBackToTop(scrollTop > 400);
    setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, oklch(0.55 0.18 250), oklch(0.73 0.17 65))",
        }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Floating WhatsApp — desktop */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <a
          href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative flex size-14 items-center justify-center rounded-full",
            "bg-green-500 text-white shadow-lg",
            "transition-all duration-300 hover:bg-green-600 hover:shadow-xl hover:scale-105",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          )}
          aria-label="Chat with us on WhatsApp"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" aria-hidden="true" />
          <MessageCircle className="relative size-6" />
        </a>
      </div>

      {/* Back to top — desktop */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={scrollToTop}
            className={cn(
              "fixed bottom-6 right-6 z-40 md:bottom-24 md:right-6",
              "flex size-11 items-center justify-center rounded-full",
              "glass-strong text-muted-foreground shadow-glass",
              "transition-all duration-300 hover:text-foreground hover:shadow-elevated hover:scale-105",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            )}
            aria-label="Back to top"
          >
            <ArrowUp className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sticky mobile CTA bar */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 md:hidden",
          "glass-strong safe-area-inset-bottom"
        )}
      >
        <div className="flex items-stretch">
          <a
            href={getPhoneUrl()}
            className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 transition-colors hover:from-brand-700 hover:to-brand-800"
            aria-label={`Call ${SITE_CONFIG.name}`}
          >
            <Phone className="size-4" aria-hidden="true" />
            Call Now
          </a>
          <a
            href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-green-500 transition-colors hover:bg-green-600"
            aria-label="WhatsApp us"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
