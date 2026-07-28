// ============================================================
// HowWeWork — Premium timeline with animated connecting line + step icons
// ============================================================

"use client";

import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { Phone, PhoneCall, ClipboardCheck, CheckCircle } from "lucide-react";
import { getPhoneUrl, SITE_CONFIG } from "@/lib/constants";
import { PROCESS_STEPS } from "@/lib/homepage-data";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const stepIcons: LucideIcon[] = [PhoneCall, ClipboardCheck, CheckCircle];

const stepColors = [
  {
    bg: "from-brand-500 to-brand-700",
    shadow: "shadow-[0_0_30px_oklch(0.55_0.18_250/0.4)]",
    ring: "ring-brand-200",
    label: "text-brand-600",
  },
  {
    bg: "from-gold-500 to-gold-700",
    shadow: "shadow-[0_0_30px_oklch(0.73_0.17_65/0.35)]",
    ring: "ring-gold-200",
    label: "text-gold-600",
  },
  {
    bg: "from-green-500 to-green-700",
    shadow: "shadow-[0_0_30px_oklch(0.55_0.17_145/0.35)]",
    ring: "ring-green-200",
    label: "text-green-600",
  },
];

export function HowWeWork() {
  return (
    <Section
      variant="default"
      spacing="md"
      containerSize="xl"
      className="relative bg-[oklch(0.985_0.003_250)]"
    >
      <MotionDiv preset="blur-in" className="mb-16">
        <SectionHeading
          badge="Simple Process"
          title="How It Works"
          subtitle="From your first call to the final fix — simple, transparent, and hassle-free in 3 steps."
          align="center"
        />
      </MotionDiv>

      <div className="relative mx-auto max-w-4xl">
        {/* Animated connecting line — desktop */}
        <div
          className="pointer-events-none absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] hidden h-px sm:block"
          aria-hidden="true"
        >
          {/* Static base line */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-200 via-gold-200 to-green-200 opacity-40" />
          {/* Animated traveling dot */}
          <motion.div
            className="absolute top-1/2 -mt-1.5 size-3 rounded-full bg-brand-500 shadow-[0_0_12px_oklch(0.55_0.18_250/0.6)]"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <MotionDiv
          preset="stagger"
          as="div"
          className="grid gap-10 sm:grid-cols-3 sm:gap-6"
        >
          {PROCESS_STEPS.map((step, index) => {
            const Icon = stepIcons[index];
            const colors = stepColors[index];

            return (
              <MotionDiv key={step.step} preset="stagger-item">
                <div className="relative flex flex-col items-center text-center">
                  {/* Vertical line for mobile */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div
                      className="absolute top-20 left-1/2 w-px h-10 -translate-x-1/2 bg-gradient-to-b from-brand-200 to-transparent sm:hidden"
                      aria-hidden="true"
                    />
                  )}

                  {/* Step icon */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className={`relative z-10 mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.bg} text-white ${colors.shadow}`}
                  >
                    <Icon className="size-9" aria-hidden="true" />
                  </motion.div>

                  {/* Step label */}
                  <span
                    className={`mb-3 text-xs font-extrabold uppercase tracking-[0.2em] ${colors.label}`}
                  >
                    Step {step.step}
                  </span>

                  <h3 className="mb-3 font-heading text-lg font-bold text-foreground">
                    {step.title}
                  </h3>

                  <p className="max-w-[240px] text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </MotionDiv>
            );
          })}
        </MotionDiv>
      </div>

      <MotionDiv preset="fade" className="mt-16 text-center">
        <Button
          size="lg"
          className="h-13 rounded-full px-9 text-[15px] font-semibold bg-brand-600 text-white shadow-md hover:bg-brand-500 hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          render={
            <a
              href={getPhoneUrl()}
              aria-label={`Get a free estimate from ${SITE_CONFIG.name}`}
            />
          }
        >
          <Phone className="size-4" data-icon="inline-start" aria-hidden="true" />
          Get Your Free Estimate
        </Button>
      </MotionDiv>
    </Section>
  );
}
