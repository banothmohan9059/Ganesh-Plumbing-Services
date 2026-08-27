// ============================================================
// Gallery Page — Ganesh Plumbing Services
// ============================================================


import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MotionDiv } from "@/components/shared/MotionDiv";
import dynamic from "next/dynamic";
const GalleryClient = dynamic(() => import("./GalleryClient").then((mod) => mod.GalleryClient));
import { FeatureCard } from "@/components/shared/FeatureCard";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ThumbsUp,
} from "lucide-react";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants";
import Link from "next/link";
import { GalleryItem } from "@/types";

export const metadata = createMetadata({
  title: "Our Work Gallery | Ganesh Plumbing Services",
  description: "View our recent plumbing projects, installations, and repairs across Hyderabad. Real work by trusted professionals.",
  path: "/gallery",
});

export const revalidate = 60;

import { getLocations } from "@/lib/data/locations";

export default async function GalleryPage() {
  const locations = await getLocations();
  const areas = locations.map(l => l.name);
  let galleryItems: GalleryItem[] = [];
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (projectId) {
      const response = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/gallery`, { next: { revalidate: 60 } });
      if (response.ok) {
        const data = await response.json();
        if (data.documents && data.documents.length > 0) {
          galleryItems = data.documents.map((doc: { name: string; fields?: Record<string, { stringValue?: string }> }) => ({
            id: doc.name.split('/').pop() || "",
            title: doc.fields?.title?.stringValue || "",
            src: doc.fields?.src?.stringValue || doc.fields?.imageUrl?.stringValue || "",
            alt: doc.fields?.alt?.stringValue || "",
            category: doc.fields?.category?.stringValue || "General",
            imageUrl: doc.fields?.src?.stringValue || doc.fields?.imageUrl?.stringValue || "",
          }));
        }
      }
    }
  } catch (error) {
    console.error("Error fetching gallery items:", error);
  }

  return (
    <>
      {/* 1. Page Hero */}
      <PageHero
        badge="Our Work"
        title="Plumbing Projects Gallery"
        subtitle="Explore our recent plumbing repairs, installations, and renovations. We let the quality of our workmanship speak for itself."
      />

      {/* 2 & 3. Work Categories & Featured Projects */}
      <Section variant="default" spacing="md" containerSize="xl">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Portfolio"
            title="Featured Projects"
            subtitle="Browse through our successful plumbing interventions across Hyderabad."
            align="center"
            className="mb-8"
          />
        </MotionDiv>

        <GalleryClient initialItems={galleryItems} />
      </Section>

      {/* 5. Work Quality Section */}
      <Section variant="default" spacing="md" containerSize="xl">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Our Standard"
            title="Commitment to Quality"
            subtitle="Every project in our gallery reflects our core values and dedication to excellence."
            align="center"
            className="mb-12"
          />
        </MotionDiv>

        <MotionDiv preset="stagger" as="div" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Sparkles, title: "Clean Workmanship", description: "We respect your property, leaving work areas spotless after every job." },
            { icon: CheckCircle2, title: "Professional Finish", description: "Meticulous attention to detail ensures a premium look and reliable function." },
            { icon: ShieldCheck, title: "Quality Materials", description: "We use highly durable, branded pipes and fittings for lasting peace of mind." },
            { icon: ThumbsUp, title: "Customer Satisfaction", description: "Our 5-star reviews reflect our unwavering commitment to our clients." },
          ].map((item, index) => (
            <MotionDiv key={item.title} preset="stagger-item">
              <FeatureCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                index={index}
              />
            </MotionDiv>
          ))}
        </MotionDiv>
      </Section>

      {/* 6. Areas We Serve — Premium glass pills */}
      <Section variant="muted" spacing="md" containerSize="xl">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Local Presence"
            title="Recent Work in Your Area"
            subtitle="We have successfully completed projects in all major Hyderabad neighborhoods."
            align="center"
            className="mb-10"
          />
        </MotionDiv>
        <MotionDiv preset="stagger" as="div">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {areas.map((area) => (
              <MotionDiv key={area} preset="stagger-item">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    area === "Miyapur"
                      ? "bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-md glow-brand"
                      : "bg-white/70 text-foreground ring-1 ring-white/40 backdrop-blur-sm shadow-card hover:shadow-elevated hover:-translate-y-0.5 hover:ring-brand-200"
                  }`}
                >
                  <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                  {area}
                </span>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </Section>

      {/* 7. Final CTA — Dark theatrical */}
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
              Impressed by Our Work?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              Let us deliver the same high-quality plumbing solutions for your home or business. We are available 24/7 across Hyderabad.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="h-13 w-full rounded-full bg-white text-brand-800 font-bold shadow-[0_4px_20px_oklch(0_0_0/0.3)] hover:bg-white/90 hover:shadow-xl sm:w-auto px-9 text-[15px] transition-all hover:scale-[1.03]"
                render={
                  <a href={getPhoneUrl()} aria-label={`Call ${SITE_CONFIG.name}`} />
                }
              >
                <Phone className="size-4" data-icon="inline-start" aria-hidden="true" />
                Call {SITE_CONFIG.phone}
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
                WhatsApp Us
              </Button>
            </div>

            <div className="mt-6">
              <Button
                variant="link"
                className="text-white/50 hover:text-white/80 underline-offset-4 transition-colors"
                render={<Link href="/contact" />}
              >
                Or request service via our contact form
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>
    </>
  );
}
