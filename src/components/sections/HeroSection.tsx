// ============================================================
// HeroSection — World-class dark hero with mouse parallax + blur-in
// ============================================================

"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ShieldCheck, Zap, Star } from "lucide-react";
import { CustomBadge } from "@/components/shared/CustomBadge";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants";

const ease = [0.25, 0.1, 0.25, 1] as const;

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "5+ Years Experience" },
  { icon: Zap, label: "24/7 Emergency Service" },
  { icon: Star, label: "Free Estimates" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const springConfig = { stiffness: 40, damping: 20, mass: 1 };

  const orb1X = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-40px", "40px"]), springConfig);
  const orb1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], ["-30px", "30px"]), springConfig);
  const orb2X = useSpring(useTransform(mouseX, [-0.5, 0.5], ["25px", "-25px"]), springConfig);
  const orb2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], ["20px", "-20px"]), springConfig);
  const orb3X = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-15px", "15px"]), springConfig);
  const orb3Y = useSpring(useTransform(mouseY, [-0.5, 0.5], ["10px", "-10px"]), springConfig);

  return (
    <section
      className="relative flex min-h-[100dvh] items-center overflow-hidden hero-dark-bg"
      aria-label="Hero section"
    >
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="presentation"
        className="relative w-full flex items-center justify-center min-h-[100dvh]"
      >
      {/* ── Layered Background ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Photographic background with dark overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
            alt="Plumber working"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-20 mix-blend-overlay"
          />
        </div>

        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid-bg opacity-25 z-10" />

        {isMounted && (
          <>
            {/* Primary blue orb — top right */}
            <motion.div
              style={{ x: orb1X, y: orb1Y }}
              className="absolute -top-48 -right-24 size-[700px] rounded-full"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="size-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 40% 40%, oklch(0.55 0.18 250 / 0.45) 0%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* Gold accent orb — bottom left */}
            <motion.div
              style={{ x: orb2X, y: orb2Y }}
              className="absolute -bottom-32 -left-32 size-[500px] rounded-full"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            >
              <div
                className="size-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 60% 60%, oklch(0.73 0.17 65 / 0.18) 0%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* Center ambient orb */}
            <motion.div
              style={{ x: orb3X, y: orb3Y }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full"
              animate={{ opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div
                className="size-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at center, oklch(0.50 0.16 250 / 0.2) 0%, transparent 65%)",
                }}
              />
            </motion.div>
          </>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 pb-12 pt-28 sm:pb-24 sm:pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">

          {/* Badge */}
          <div
            className="mb-8 flex justify-center animate-slide-up-fade"
          >
            <CustomBadge variant="dark-glass" dot>
              Trusted Plumber in Miyapur, Hyderabad
            </CustomBadge>
          </div>

          {/* Main heading */}
          <h1
            className="font-heading text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-[4.5rem] lg:leading-[1.05] animate-slide-up-fade delay-100"
          >
            Professional{" "}
            <span className="gradient-text-animated">Plumbing</span>
            <br className="hidden sm:block" />
            {" "}Services in Hyderabad
          </h1>

          {/* Subtitle */}
          <p
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg sm:leading-relaxed animate-slide-up-fade delay-300"
          >
            Expert residential &amp; commercial plumbing — leak repairs, pipe
            installations, drain cleaning &amp; more. Available{" "}
            <span className="text-white/80 font-semibold">24/7</span> for
            emergency services across Miyapur &amp; Hyderabad.
          </p>

          {/* CTA row */}
          <div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-slide-up-fade delay-500"
          >
            {/* Primary — Call */}
            <Button
              size="lg"
              className={[
                "h-14 w-full rounded-full px-9 text-[15px] font-semibold sm:w-auto",
                "bg-brand-500 text-white",
                "shadow-[0_0_30px_oklch(0.55_0.18_250/0.45),0_4px_16px_oklch(0_0_0/0.3)]",
                "hover:bg-brand-400",
                "hover:shadow-[0_0_50px_oklch(0.55_0.18_250/0.6),0_8px_24px_oklch(0_0_0/0.3)]",
                "hover:scale-[1.03] transition-all duration-300",
              ].join(" ")}
              render={
                <a
                  href={getPhoneUrl()}
                  aria-label={`Call ${SITE_CONFIG.name}`}
                />
              }
            >
              <Phone className="size-4" data-icon="inline-start" aria-hidden="true" />
              Call Now — Free Estimate
            </Button>

            {/* Secondary — WhatsApp */}
            <Button
              size="lg"
              className={[
                "h-14 w-full rounded-full px-9 text-[15px] font-semibold sm:w-auto",
                "bg-white/8 text-white/90 border border-white/12 backdrop-blur-sm",
                "hover:bg-white/12 hover:border-white/22",
                "hover:scale-[1.03] transition-all duration-300",
              ].join(" ")}
              render={
                <a
                  href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message us on WhatsApp"
                />
              }
            >
              <MessageCircle className="size-4 text-green-400" data-icon="inline-start" aria-hidden="true" />
              WhatsApp Us
            </Button>
          </div>

          {/* Trust micro-indicators */}
          {isMounted && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58, ease }}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            >
              {TRUST_BADGES.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm font-medium text-white/45"
                >
                  <Icon className="size-4 shrink-0 text-brand-400" aria-hidden="true" />
                  <span>{label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Bottom Gradient Fade ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-950 to-transparent"
        aria-hidden="true"
      />
      </div>
    </section>
  );
}
