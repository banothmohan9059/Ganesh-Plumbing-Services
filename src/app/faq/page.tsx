// ============================================================
// FAQ Page — Ganesh Plumbing Services
// ============================================================


import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/layout/Section";
import { FAQClient } from "@/components/sections/FAQClient";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, HelpCircle } from "lucide-react";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants";
import { FAQ_DATA } from "@/lib/faq-page-data";
import Link from "next/link";
import Script from "next/script";

export const metadata = createMetadata({
  title: "Frequently Asked Questions | Ganesh Plumbing Services",
  description: "Find answers to common plumbing questions, pricing, and our 24/7 emergency service areas in Hyderabad.",
  path: "/faq",
});

// Generate FAQ Schema dynamically from data
function generateFAQSchema() {
  const allQuestions = FAQ_DATA.flatMap((cat) => cat.questions);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export default function FAQPage() {
  return (
    <>
      {/* FAQ Schema for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }}
      />

      {/* 1. Page Hero */}
      <PageHero
        badge="Help Center"
        title="Plumbing Questions Answered"
        subtitle="Your comprehensive resource for plumbing information in Hyderabad. Need an immediate answer? Reach out to us directly."
      >
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="h-13 w-full rounded-full px-9 text-[15px] font-semibold bg-brand-500 text-white shadow-[0_0_30px_oklch(0.55_0.18_250/0.45),0_4px_16px_oklch(0_0_0/0.3)] hover:bg-brand-400 hover:shadow-[0_0_50px_oklch(0.55_0.18_250/0.6)] hover:scale-[1.03] transition-all duration-300 sm:w-auto"
            render={<a href={getPhoneUrl()} aria-label={`Call ${SITE_CONFIG.name}`} />}
          >
            <Phone className="size-4" data-icon="inline-start" aria-hidden="true" />
            Call Now
          </Button>

          <Button
            size="lg"
            className="h-13 w-full rounded-full px-9 text-[15px] font-semibold bg-white/8 text-white/90 border border-white/12 backdrop-blur-sm hover:bg-white/12 hover:border-white/22 hover:scale-[1.03] transition-all duration-300 sm:w-auto"
            render={
              <a
                href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp us"
              />
            }
          >
            <MessageCircle className="size-4 text-green-400" data-icon="inline-start" aria-hidden="true" />
            WhatsApp Us
          </Button>
        </div>
      </PageHero>

      {/* 2 & 3. Search Bar and FAQ Categories */}
      <Section variant="default" spacing="md" containerSize="xl" className="min-h-[50vh]">
        <FAQClient data={FAQ_DATA} />
      </Section>

      {/* Quick Links — premium accent section */}
      <Section variant="muted" spacing="sm" containerSize="md">
        <div
          className={[
            "rounded-2xl border border-brand-100/60 bg-gradient-to-r from-brand-50/50 to-white/50 p-6 backdrop-blur-sm",
            "shadow-[0_2px_12px_oklch(0.55_0.18_250/0.06)]",
          ].join(" ")}
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md">
              <HelpCircle className="size-5" aria-hidden="true" />
            </div>
            <p className="text-center text-sm leading-relaxed text-muted-foreground sm:text-left">
              Couldn&apos;t find what you were looking for? Explore our{" "}
              <Link href="/" className="font-semibold text-brand-600 hover:text-brand-500 underline-offset-4 hover:underline transition-colors">
                Homepage
              </Link>{" "}
              for an overview, dive deep into our specialized{" "}
              <Link href="/services" className="font-semibold text-brand-600 hover:text-brand-500 underline-offset-4 hover:underline transition-colors">
                Services
              </Link>
              , or visit our{" "}
              <Link href="/contact" className="font-semibold text-brand-600 hover:text-brand-500 underline-offset-4 hover:underline transition-colors">
                Contact
              </Link>{" "}
              page for direct support. We proudly serve as your local emergency plumber in Miyapur and greater Hyderabad.
            </p>
          </div>
        </div>
      </Section>

      {/* 4. Final CTA — Dark theatrical */}
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
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Still Have Questions?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Our plumbing experts are just a call or message away. Get in touch for transparent advice or immediate service.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-13 w-full rounded-full bg-white text-brand-800 font-bold shadow-[0_4px_20px_oklch(0_0_0/0.3)] hover:bg-white/90 hover:shadow-xl sm:w-auto px-9 text-[15px] transition-all hover:scale-[1.03]"
              render={<a href={getPhoneUrl()} aria-label={`Call ${SITE_CONFIG.name}`} />}
            >
              <Phone className="size-4" data-icon="inline-start" aria-hidden="true" />
              Call Now
            </Button>
            <Button
              size="lg"
              className="h-13 w-full rounded-full border border-white/15 bg-white/8 text-white font-semibold sm:w-auto px-9 text-[15px] backdrop-blur-sm transition-all hover:bg-white/12 hover:scale-[1.03]"
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
              WhatsApp
            </Button>
          </div>
          <div className="mt-6">
            <Button
              variant="link"
              className="text-white/50 hover:text-white/80 underline-offset-4 transition-colors"
              render={<Link href="/contact" />}
            >
              Or fill out our Contact Us form
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
