// ============================================================
// ContactCTA — Premium gradient CTA with shimmer text
// ============================================================

"use client";

import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants";

export function ContactCTA() {
  return (
    <Section variant="default" spacing="md" containerSize="xl" noContainer className="relative overflow-hidden gradient-cta mobile-cta-spacing">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-20 right-10 size-[250px] rounded-full bg-white/[0.04] blur-[60px] animate-float" />
        <div className="absolute bottom-0 -left-10 size-[200px] rounded-full bg-gold-400/[0.05] blur-[60px] animate-float-slow" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <MotionDiv preset="fade">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Ready to Fix Your Plumbing?
          </h2>

          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
            Call us today for a free, no-obligation estimate. We serve
            Miyapur, Kondapur, Gachibowli, KPHB and 15+ areas across Hyderabad.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-13 w-full rounded-full bg-white text-brand-700 font-semibold shadow-lg hover:bg-white/90 hover:shadow-xl sm:w-auto px-8 text-[15px] transition-all hover:scale-[1.02]"
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
              size="lg"
              variant="outline"
              className="h-13 w-full rounded-full border-white/20 text-white hover:bg-white/10 font-semibold sm:w-auto px-8 text-[15px] backdrop-blur-sm transition-all hover:scale-[1.02]"
              render={
                <a
                  href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp us"
                />
              }
            >
              <MessageCircle className="size-4" data-icon="inline-start" aria-hidden="true" />
              WhatsApp Us
            </Button>
          </div>

          <div className="mt-6">
            <Button
              variant="link"
              className="text-white/60 hover:text-white underline-offset-4"
              render={<Link href="/contact" />}
            >
              Or fill out our contact form
              <ArrowRight className="size-3.5" data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        </MotionDiv>
      </div>
    </Section>
  );
}
