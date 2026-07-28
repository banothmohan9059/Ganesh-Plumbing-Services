// ============================================================
// MobileNav — Premium full-screen glassmorphism navigation
// ============================================================

"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NAV_LINKS,
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.06, duration: 0.4, ease },
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Focus trap & ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && navRef.current) {
        const focusable = navRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={navRef}
            id="mobile-nav"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm glass-strong shadow-overlay lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/20 px-5 py-4">
                <span className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">
                  Menu
                </span>
                <motion.button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  aria-label="Close navigation menu"
                  whileTap={{ rotate: 90, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="size-5" />
                </motion.button>
              </div>

              {/* Navigation links with stagger */}
              <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Mobile navigation">
                <ul className="space-y-1.5">
                  {NAV_LINKS.map((link, index) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);

                    return (
                      <motion.li
                        key={link.href}
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        custom={index}
                      >
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-300",
                            isActive
                              ? "bg-gradient-to-r from-brand-50 to-brand-100/50 text-primary shadow-sm"
                              : "text-foreground hover:bg-muted/50"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {link.label}
                          <ArrowRight
                            className={cn(
                              "size-4 transition-transform",
                              isActive ? "text-primary" : "text-muted-foreground"
                            )}
                            aria-hidden="true"
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom CTAs */}
              <div className="border-t border-white/20 p-4 space-y-3">
                <Button
                  size="lg"
                  className="w-full h-12 rounded-xl text-[15px] shadow-md hover-glow-brand"
                  render={
                    <a
                      href={getPhoneUrl()}
                      aria-label={`Call ${SITE_CONFIG.name}`}
                    />
                  }
                >
                  <Phone className="size-4" data-icon="inline-start" aria-hidden="true" />
                  Call {SITE_CONFIG.phone}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-12 rounded-xl text-[15px] border-green-400/50 text-green-600 hover:bg-green-50/80"
                  render={
                    <a
                      href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Message us on WhatsApp"
                    />
                  }
                >
                  <MessageCircle className="size-4" data-icon="inline-start" aria-hidden="true" />
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
