// ============================================================
// Services Page — Ganesh Plumbing Services
// ============================================================


import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { FeatureCard } from "@/components/shared/FeatureCard";
import dynamic from "next/dynamic";
const ServicesFAQList = dynamic(() => import("@/components/sections/ServicesFAQList").then((mod) => mod.ServicesFAQList));
import { Button } from "@/components/ui/button";
import {
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Zap,
  ShieldCheck,
  BadgeIndianRupee,
  PhoneCall,
  Search,
  Wrench,
  CheckCircle,
} from "lucide-react";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  AREAS_SERVED,
} from "@/lib/constants";
// Removed static data fallbacks so Firestore is the strict source of truth.
import * as Icons from "lucide-react";
import Link from "next/link";
import { Service } from "@/types";

export const metadata = createMetadata({
  title: "Our Services | Ganesh Plumbing Services",
  description: "Explore our comprehensive plumbing services in Hyderabad including leak repair, geyser installation, drain cleaning, and 24/7 emergency support.",
  path: "/services",
});

const PROCESS_STEPS = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Contact",
    desc: "Call or WhatsApp us to describe your plumbing issue.",
    color: "from-brand-500 to-brand-700",
    glow: "shadow-[0_0_30px_oklch(0.55_0.18_250/0.35)]",
    label: "text-brand-600",
  },
  {
    icon: Search,
    step: "02",
    title: "Inspection",
    desc: "We arrive promptly and diagnose the root cause.",
    color: "from-gold-500 to-gold-700",
    glow: "shadow-[0_0_30px_oklch(0.73_0.17_65/0.3)]",
    label: "text-gold-600",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Repair",
    desc: "Expert execution with minimal disruption to your home.",
    color: "from-green-500 to-green-700",
    glow: "shadow-[0_0_30px_oklch(0.55_0.17_145/0.3)]",
    label: "text-green-600",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Satisfaction",
    desc: "We clean up and ensure you are 100% happy with the work.",
    color: "from-brand-600 to-brand-800",
    glow: "shadow-[0_0_30px_oklch(0.42_0.17_250/0.3)]",
    label: "text-brand-700",
  },
] as const;

export const revalidate = 60;

export default async function ServicesPage() {
  let fetchedServices: Service[] = [];
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (projectId) {
      const response = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/services`, { next: { revalidate: 60 } });
      if (response.ok) {
        const data = await response.json();
        if (data.documents && data.documents.length > 0) {
          fetchedServices = data.documents.map((doc: { name: string; fields?: Record<string, { stringValue?: string; arrayValue?: { values?: Array<{ stringValue: string }> } }> }) => ({
            id: doc.name.split('/').pop() || "",
            title: doc.fields?.title?.stringValue || "",
            description: doc.fields?.description?.stringValue || "",
            iconName: doc.fields?.iconName?.stringValue || "Wrench",
            features: doc.fields?.features?.arrayValue?.values?.map((v: { stringValue: string }) => v.stringValue) || [],
          }));
        }
      }
    }
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  return (
    <>
      {/* 1. Page Hero */}
      <PageHero
        bgImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
        badge="OUR SERVICES"
        title="Expert Plumbing Services in Hyderabad"
        subtitle="From minor tap repairs to complete bathroom renovations, our 5+ years of experience guarantee a professional, long-lasting solution."
      />

      {/* 2. Services Overview */}
      <Section variant="default" spacing="md" containerSize="md" className="text-center">
        <MotionDiv preset="slide-up">
          <h2 className="mb-4 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Complete Plumbing Solutions You Can Trust
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            We offer a comprehensive range of plumbing services for both residential and commercial properties. Whether you are dealing with a stubborn drain blockage, planning a bathroom renovation, or need an urgent geyser repair, our fully equipped team is ready to deliver fast, reliable, and transparent service.
          </p>
        </MotionDiv>
      </Section>

      {/* 3. Services Grid */}
      <Section variant="muted" spacing="lg" containerSize="xl">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="What We Do"
            title="Our Core Services"
            subtitle="Professional, efficient, and affordable solutions for every plumbing need."
            align="center"
            className="mb-12"
          />
        </MotionDiv>

        <MotionDiv preset="stagger" as="div" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fetchedServices.length > 0 ? (
            fetchedServices.map((service) => {
              const IconComponent = (Icons as unknown as Record<string, import("lucide-react").LucideIcon>)[service.iconName || "Wrench"] || Icons.Wrench;

              return (
                <MotionDiv key={service.id} preset="stagger-item">
                  <ServiceCard
                    icon={IconComponent}
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    href={`/services/${service.id}`}
                  />
                </MotionDiv>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No services found. Please add some from the admin panel.
            </div>
          )}
        </MotionDiv>
      </Section>

      {/* 4. Emergency Plumbing — Dark theatrical section */}
      <section className="relative overflow-hidden bg-brand-950 py-24">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 50%, oklch(0.45 0.19 250 / 0.2) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 dot-grid-bg opacity-15" />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <MotionDiv preset="blur-in">
            {/* Pulse icon */}
            <div className="mb-10 flex justify-center">
              <div className="relative">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-2xl bg-brand-500/20 animate-ping"
                    style={{ animationDelay: `${i * 0.45}s`, animationDuration: "2.5s" }}
                  />
                ))}
                <div className="relative flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_0_40px_oklch(0.55_0.18_250/0.5)]">
                  <Zap className="size-9" aria-hidden="true" />
                </div>
              </div>
            </div>

            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              24/7 Emergency Plumber in Miyapur
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              Water leak? Burst pipe? Blocked drain? Don&apos;t wait for the damage to get worse. We offer rapid-response emergency plumbing services round the clock.
            </p>

            {/* Phone number */}
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
                    href={getWhatsAppUrl("URGENT: I need emergency plumbing help immediately.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp for emergency"
                  />
                }
              >
                <MessageCircle className="size-4" data-icon="inline-start" aria-hidden="true" />
                WhatsApp Us
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* 5. Why Choose Ganesh Plumbing Services */}
      <Section variant="default" spacing="md" containerSize="xl">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Why Us"
            title="The Ganesh Plumbing Difference"
            subtitle="We don't just fix pipes; we provide peace of mind."
            align="center"
            className="mb-12"
          />
        </MotionDiv>

        <MotionDiv preset="stagger" as="div" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "5+ Years Experience", description: "Deep industry knowledge ensures we get the job done right the first time." },
            { icon: CheckCircle2, title: "Professional Workmanship", description: "High-quality materials and proven techniques for lasting repairs." },
            { icon: BadgeIndianRupee, title: "Transparent Pricing", description: "Clear, upfront estimates. No hidden fees or surprise charges." },
            { icon: MapPin, title: "Local Expertise", description: "Fast dispatch times because we are based right here in your community." },
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

      {/* 6. Service Process — Premium 4-step timeline */}
      <Section
        variant="default"
        spacing="md"
        containerSize="xl"
        className="relative overflow-hidden bg-[oklch(0.985_0.003_250)]"
      >
        <MotionDiv preset="blur-in" className="mb-16">
          <SectionHeading
            badge="Our Process"
            title="How We Deliver Results"
            subtitle="Four simple steps to a perfectly functioning plumbing system."
            align="center"
          />
        </MotionDiv>

        <div className="relative mx-auto max-w-5xl">
          {/* Connecting line — desktop */}
          <div
            className="pointer-events-none absolute top-10 left-[calc(12.5%+2.5rem)] right-[calc(12.5%+2.5rem)] hidden h-px lg:block"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-200 via-gold-200 via-green-200 to-brand-300 opacity-40" />
          </div>

          <MotionDiv preset="stagger" as="div" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <MotionDiv key={step.step} preset="stagger-item">
                  <div className="relative flex flex-col items-center text-center">
                    <div
                      className={`relative z-10 mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white ${step.glow}`}
                    >
                      <Icon className="size-9" aria-hidden="true" />
                    </div>
                    <span className={`mb-3 text-xs font-extrabold uppercase tracking-[0.2em] ${step.label}`}>
                      Step {step.step}
                    </span>
                    <h3 className="mb-3 font-heading text-lg font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="max-w-[200px] text-sm leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </MotionDiv>
              );
            })}
          </MotionDiv>
        </div>
      </Section>

      {/* 7. Areas We Serve — Premium glass pills */}
      <Section variant="default" spacing="md" containerSize="xl" className="bg-muted/30">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Service Areas"
            title="Serving Hyderabad's Key Localities"
            subtitle="Rapid response times across major neighborhoods."
            align="center"
            className="mb-10"
          />
        </MotionDiv>
        <MotionDiv preset="stagger" as="div">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {AREAS_SERVED.map((area) => (
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

      {/* 8. FAQ Preview */}
      <Section variant="default" spacing="md" containerSize="lg">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Common Questions"
            title="Service FAQs"
            subtitle="Answers to common queries about our plumbing services."
            align="center"
            className="mb-10"
          />
        </MotionDiv>
        <ServicesFAQList />
        <MotionDiv preset="fade" className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            className="h-12 rounded-full px-8 border-brand-200 hover:border-brand-400 hover:shadow-md transition-all duration-300"
            render={<Link href="/faq" />}
          >
            View All FAQs
          </Button>
        </MotionDiv>
      </Section>

      {/* 9. Final CTA — Dark theatrical */}
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
              Ready to Fix Your Plumbing Issue?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              Get in touch for a fast, free estimate. We are proud to serve Miyapur, Kondapur, Gachibowli, and surrounding regions.
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
                WhatsApp Us
              </Button>
            </div>

            <div className="mt-6">
              <Button
                variant="link"
                className="text-white/50 hover:text-white/80 underline-offset-4 transition-colors"
                render={<Link href="/contact" />}
              >
                Prefer to email? Fill out our contact form
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>
    </>
  );
}
