import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Service Areas | Ganesh Plumbing Services",
  description: "View the list of areas we serve in Hyderabad. We provide 24/7 plumbing services across major neighborhoods.",
  path: "/areas",
});

import { getLocations } from "@/lib/data/locations";

export default async function AreasPage() {
  const locations = await getLocations();
  return (
    <>
      {/* 1. Page Hero */}
      <PageHero
        badge="Locations"
        title="Areas We Serve"
        subtitle="We provide reliable, 24/7 plumbing services across major neighborhoods in Hyderabad. Our local experts are always nearby when you need them."
      />

      {/* 2. Service Areas Grid */}
      <Section variant="default" spacing="md" containerSize="lg" className="min-h-[40vh]">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Coverage"
            title="Our Service Network"
            subtitle="Find your neighborhood in our comprehensive list of service areas."
            align="center"
            className="mb-12"
          />
        </MotionDiv>
        
        <MotionDiv preset="stagger" as="div" className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {locations.map((loc) => (
            <MotionDiv key={loc.id} preset="stagger-item">
              <Link
                href={`/locations/${loc.id}`}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:border-brand-200 hover:bg-brand-50/50 hover:shadow-md"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600 transition-transform duration-500 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
                  <MapPin className="size-5" aria-hidden="true" />
                </div>
                <span className="font-semibold text-foreground group-hover:text-brand-700">
                  {loc.name}
                </span>
              </Link>
            </MotionDiv>
          ))}
        </MotionDiv>
      </Section>

      {/* 3. Final CTA */}
      <section className="relative overflow-hidden bg-brand-950 py-24 mobile-cta-spacing">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.45 0.19 250 / 0.15) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 dot-grid-bg opacity-10" />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <MotionDiv preset="blur-in">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Don&apos;t See Your Area?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              Give us a call. We often expand our service routes and may be able to assist you even if your neighborhood isn&apos;t listed above.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={getPhoneUrl()}
                className="inline-flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-9 text-[15px] font-bold text-brand-800 shadow-[0_4px_20px_oklch(0_0_0/0.3)] transition-all hover:scale-[1.03] hover:bg-white/90 hover:shadow-xl"
                aria-label={`Call ${SITE_CONFIG.name}`}
              >
                <Phone className="size-4" aria-hidden="true" />
                Call {SITE_CONFIG.phone}
              </a>
              <a
                href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-9 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:scale-[1.03] hover:bg-white/12"
                aria-label="WhatsApp us"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp Us
              </a>
            </div>
          </MotionDiv>
        </div>
      </section>
    </>
  );
}
