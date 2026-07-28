// ============================================================
// EmergencySection — Theatrical dark CTA with animated pulse rings
// ============================================================

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Phone, MessageCircle, Zap } from "lucide-react";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
} from "@/lib/constants";

export function EmergencySection() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-24">
      {/* Background mesh */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, oklch(0.45 0.19 250 / 0.2) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 dot-grid-bg opacity-15" />
        {/* Floating decorative orbs */}
        <motion.div
          className="absolute -top-20 -right-20 size-[350px] rounded-full"
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle at center, oklch(0.55 0.18 250 / 0.3), transparent 70%)",
          }}
        />
        <motion.div
          className="absolute -bottom-16 -left-16 size-[280px] rounded-full"
          animate={{ scale: [1, 1.06, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{
            background: "radial-gradient(circle at center, oklch(0.73 0.17 65 / 0.15), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <MotionDiv preset="blur-in">
          {/* Animated emergency icon with pulse rings */}
          <div className="mb-10 flex justify-center">
            <div className="relative">
              {/* Pulse rings */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-2xl bg-brand-500/20"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.5,
                  }}
                />
              ))}
              <div className="relative flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_0_40px_oklch(0.55_0.18_250/0.5)]">
                <Zap className="size-9" aria-hidden="true" />
              </div>
            </div>
          </div>

          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Plumbing Emergency?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Don&apos;t panic. We&apos;re available{" "}
            <span className="font-semibold text-white/90">24 hours a day</span>, 7 days
            a week for urgent plumbing repairs across Miyapur and surrounding areas.
          </p>

          {/* Phone number display */}
          <div className="mt-8 mb-10">
            <a
              href={getPhoneUrl()}
              className="inline-flex items-center gap-3 group"
              aria-label={`Emergency call — ${SITE_CONFIG.phone}`}
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-white/10 border border-white/15 group-hover:bg-white/15 transition-colors duration-300">
                <Phone className="size-4 text-brand-300" aria-hidden="true" />
              </div>
              <span className="font-heading text-3xl font-bold text-white tracking-wide group-hover:text-brand-300 transition-colors duration-300 sm:text-4xl">
                {SITE_CONFIG.phone}
              </span>
            </a>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-13 w-full rounded-full bg-white text-brand-800 font-bold shadow-[0_4px_20px_oklch(0_0_0/0.3)] hover:bg-white/90 hover:shadow-xl sm:w-auto px-9 text-[15px] transition-all hover:scale-[1.03]"
              render={
                <a
                  href={getPhoneUrl()}
                  aria-label={`Emergency call — ${SITE_CONFIG.phone}`}
                />
              }
            >
              <Phone className="size-4" data-icon="inline-start" aria-hidden="true" />
              Call Now — 24/7
            </Button>

            <Button
              size="lg"
              className="h-13 w-full rounded-full border border-white/15 bg-white/8 text-white font-semibold sm:w-auto px-9 text-[15px] backdrop-blur-sm transition-all hover:bg-white/12 hover:scale-[1.03]"
              render={
                <a
                  href={getWhatsAppUrl("URGENT: I have a plumbing emergency and need help immediately.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp for emergency help"
                />
              }
            >
              <MessageCircle className="size-4" data-icon="inline-start" aria-hidden="true" />
              WhatsApp for Help
            </Button>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
