// ============================================================
// Header — Premium glassmorphism with dark-hero-aware text colors
// ============================================================

"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle, Menu } from "lucide-react";
import {
  NAV_LINKS,
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-[0_1px_20px_oklch(0_0_0/0.06)]"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
            aria-label={`${SITE_CONFIG.name} — Home`}
          >
            <div className={cn(
              "rounded-xl p-0.5 transition-all duration-500",
              isScrolled ? "bg-white shadow-sm" : "bg-white/10"
            )}>
              <Image
                src="/logo.png"
                alt={`${SITE_CONFIG.name} Logo`}
                width={44}
                height={44}
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <span className={cn(
              "hidden sm:block font-heading text-sm font-bold tracking-tight transition-colors duration-500",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                        isScrolled
                          ? isActive
                            ? "text-brand-600"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          : isActive
                          ? "text-white"
                          : "text-white/60 hover:text-white hover:bg-white/8"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                      {isActive && (
                        <span
                          className={cn(
                            "absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full transition-all duration-500",
                            isScrolled
                              ? "bg-gradient-to-r from-brand-500 to-brand-400"
                              : "bg-white/60"
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-2">
            {/* WhatsApp — desktop */}
            <a
              href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp"
              className={cn(
                "hidden md:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                isScrolled
                  ? "text-green-700 hover:bg-green-50"
                  : "text-green-300 hover:text-green-200 hover:bg-white/8"
              )}
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>

            {/* Call Now — desktop */}
            <a
              href={getPhoneUrl()}
              aria-label={`Call ${SITE_CONFIG.name}`}
              className={cn(
                "hidden sm:inline-flex items-center gap-2 h-9 rounded-full px-5 text-sm font-semibold transition-all duration-300",
                isScrolled
                  ? "bg-brand-600 text-white shadow-md hover:bg-brand-500 hover:shadow-lg hover:scale-[1.03]"
                  : "bg-white/10 text-white border border-white/15 backdrop-blur-sm hover:bg-white/18 hover:scale-[1.03]"
              )}
            >
              <Phone className="size-3.5" aria-hidden="true" />
              Call Now
            </a>
            
            <div className={cn("hidden sm:block ml-2 transition-colors", isScrolled ? "text-foreground" : "text-white")}>
              <ThemeToggle />
            </div>

            {/* Mobile menu toggle */}
            <button
              className={cn(
                "lg:hidden flex size-9 items-center justify-center rounded-lg transition-all duration-300",
                isScrolled
                  ? "text-foreground hover:bg-muted/50"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-nav"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* NO spacer div — hero is full-viewport and sits behind the transparent header */}
    </>
  );
}
