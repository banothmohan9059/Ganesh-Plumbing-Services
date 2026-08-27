// ============================================================
// Contact Page — Ganesh Plumbing Services
// ============================================================


import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { ContactForm } from "@/components/sections/ContactForm";
import { GoogleMap } from "@/components/shared/GoogleMap";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  Zap,
  PhoneCall,
  Search,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants";
import Script from "next/script";

export const metadata = createMetadata({
  title: "Contact Us | Ganesh Plumbing Services Hyderabad",
  description: "Get in touch with Ganesh Plumbing Services for 24/7 emergency plumbing, geyser repair, drain cleaning, and more in Miyapur and Hyderabad. Call or WhatsApp now.",
  path: "/contact",
});

import { generateLocalBusinessSchema } from "@/lib/structured-data";

// Contact info card data
const CONTACT_CARDS = [
  {
    id: "phone",
    href: getPhoneUrl(),
    label: "Call Us (24/7)",
    value: SITE_CONFIG.phone,
    icon: Phone,
    color: "from-brand-500 to-brand-700",
    glow: "oklch(0.55 0.18 250 / 0.3)",
    hoverBorder: "hover:border-brand-200/80",
    hoverBg: "hover:bg-brand-50/40",
    external: false,
  },
  {
    id: "whatsapp",
    href: getWhatsAppUrl(),
    label: "WhatsApp Us",
    value: SITE_CONFIG.whatsapp,
    icon: MessageCircle,
    color: "from-[#25D366] to-[#128C7E]",
    glow: "oklch(0.6 0.18 158 / 0.25)",
    hoverBorder: "hover:border-[#25D366]/30",
    hoverBg: "hover:bg-[#25D366]/5",
    external: true,
  },
  {
    id: "email",
    href: `mailto:${SITE_CONFIG.email}`,
    label: "Email Us",
    value: SITE_CONFIG.email,
    icon: Mail,
    color: "from-gold-500 to-gold-700",
    glow: "oklch(0.73 0.17 65 / 0.25)",
    hoverBorder: "hover:border-gold-200/80",
    hoverBg: "hover:bg-gold-50/40",
    external: false,
  },
] as const;

const PROCESS_STEPS = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Call / WhatsApp",
    desc: "Contact us with your location and plumbing issue.",
    color: "from-brand-500 to-brand-700",
    glow: "shadow-[0_0_30px_oklch(0.55_0.18_250/0.35)]",
    label: "text-brand-600",
  },
  {
    icon: Search,
    step: "02",
    title: "Inspection",
    desc: "Our plumber arrives promptly to diagnose the root cause.",
    color: "from-gold-500 to-gold-700",
    glow: "shadow-[0_0_30px_oklch(0.73_0.17_65/0.3)]",
    label: "text-gold-600",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Professional Repair",
    desc: "We fix the issue permanently using quality materials.",
    color: "from-green-500 to-green-700",
    glow: "shadow-[0_0_30px_oklch(0.55_0.17_145/0.3)]",
    label: "text-green-600",
  },
] as const;

import { getLocations } from "@/lib/data/locations";

export default async function ContactPage() {
  const locations = await getLocations();
  const areas = locations.map(l => l.name);
  
  const fullAddress = `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} ${SITE_CONFIG.address.pincode}`;

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema()) }}
      />

      {/* 1. Page Hero */}
      <PageHero
        badge="Contact Us"
        title="We're Here to Help, 24/7"
        subtitle="Need a plumber immediately or looking to schedule a repair? Reach out to us through call, WhatsApp, or our secure form below."
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

      {/* 2 & 3. Contact Cards & Contact Form */}
      <Section variant="default" spacing="md" containerSize="xl">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left: Contact Info Cards */}
          <MotionDiv preset="slide-right" as="div" className="space-y-6 lg:col-span-5">
            <div>
              <h2 className="mb-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Get In Touch
              </h2>
              <p className="mb-8 text-muted-foreground">
                Our team is based right here in Hyderabad, ensuring fast response times for your peace of mind.
              </p>
            </div>

            {/* Premium contact cards */}
            <div className="space-y-3">
              {CONTACT_CARDS.map(({ id, href, label, value, icon: Icon, color, glow, hoverBorder, hoverBg, external }) => (
                <a
                  key={id}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={[
                    "group flex items-center gap-4 rounded-2xl border border-gray-100/80 bg-white/70 p-5",
                    "backdrop-blur-sm shadow-[0_1px_3px_oklch(0_0_0/0.05)]",
                    "transition-all duration-300",
                    "hover:shadow-[0_8px_32px_oklch(0_0_0/0.10)]",
                    "hover:-translate-y-0.5",
                    hoverBorder,
                    hoverBg,
                  ].join(" ")}
                  aria-label={`${label}: ${value}`}
                >
                  {/* Icon */}
                  <div
                    className={[
                      `flex size-13 shrink-0 items-center justify-center rounded-2xl`,
                      `bg-gradient-to-br ${color} text-white`,
                      `shadow-[0_4px_16px_${glow}]`,
                      "transition-transform duration-300 group-hover:scale-110",
                    ].join(" ")}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                      {label}
                    </p>
                    <p className="mt-0.5 font-heading text-base font-bold text-foreground truncate">
                      {value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Address card (non-clickable) */}
              <div className="flex items-center gap-4 rounded-2xl border border-gray-100/80 bg-white/70 p-5 backdrop-blur-sm shadow-[0_1px_3px_oklch(0_0_0/0.05)]">
                <div className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-muted-foreground/20 text-muted-foreground">
                  <MapPin className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                    Our Location
                  </p>
                  <p className="mt-0.5 text-sm font-medium leading-relaxed text-foreground">
                    {fullAddress}
                  </p>
                </div>
              </div>

              {/* Hours card */}
              <div className="flex items-center gap-4 rounded-2xl border border-amber-100/80 bg-amber-50/30 p-5 backdrop-blur-sm shadow-[0_1px_3px_oklch(0_0_0/0.04)]">
                <div className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-[0_4px_16px_oklch(0.75_0.16_65/0.25)]">
                  <Clock className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                    Business Hours
                  </p>
                  <p className="mt-0.5 font-heading text-base font-bold text-foreground">
                    Open 24 Hours
                  </p>
                  <p className="text-xs text-muted-foreground">7 Days a Week</p>
                </div>
              </div>
            </div>
          </MotionDiv>

          {/* Right: Contact Form — premium glass card */}
          <MotionDiv preset="slide-left" as="div" className="lg:col-span-7">
            <div
              className={[
                "rounded-3xl p-7 sm:p-10",
                "bg-white/60 backdrop-blur-xl",
                "border border-white/70",
                "shadow-[0_8px_40px_oklch(0_0_0/0.08),0_2px_8px_oklch(0.55_0.18_250/0.06)]",
              ].join(" ")}
            >
              {/* Card gradient top accent */}
              <div
                className="absolute -top-px left-8 right-8 h-0.5 rounded-full"
                style={{
                  background: "linear-gradient(90deg, oklch(0.55 0.18 250), oklch(0.73 0.17 65))",
                }}
                aria-hidden="true"
              />

              <h2 className="mb-1.5 font-heading text-2xl font-bold text-foreground">
                Send Us a Message
              </h2>
              <p className="mb-8 text-sm text-muted-foreground">
                Fill out the form and we will get back to you as soon as possible.
              </p>
              <ContactForm />
            </div>
          </MotionDiv>
        </div>
      </Section>

      {/* 4. Emergency Plumbing — Dark theatrical CTA */}
      <section className="relative overflow-hidden bg-brand-950 py-20">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.45 0.19 250 / 0.18) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 dot-grid-bg opacity-10" />
        </div>

        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <MotionDiv preset="fade">
            <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
              <div className="flex-1">
                {/* Icon */}
                <div className="mb-5 flex justify-center lg:justify-start">
                  <div className="relative">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="absolute inset-0 rounded-2xl bg-brand-500/20 animate-ping"
                        style={{ animationDelay: `${i * 0.4}s`, animationDuration: "2s" }}
                      />
                    ))}
                    <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_0_30px_oklch(0.55_0.18_250/0.5)]">
                      <Zap className="size-8" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  24/7 Emergency Plumbing
                </h2>
                <p className="mt-3 text-base text-white/55 max-w-xl">
                  Don&apos;t let a burst pipe or severe leak damage your property. We are standing by to help right now.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-13 w-full rounded-full bg-white text-brand-800 font-bold shadow-[0_4px_20px_oklch(0_0_0/0.3)] hover:bg-white/90 hover:shadow-xl sm:w-auto px-9 text-[15px] transition-all hover:scale-[1.03]"
                  render={
                    <a
                      href={getPhoneUrl()}
                      aria-label={`Call ${SITE_CONFIG.phone}`}
                    />
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
                      href={getWhatsAppUrl("I have a plumbing emergency!")}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp us for emergency"
                    />
                  }
                >
                  <MessageCircle className="size-4" data-icon="inline-start" aria-hidden="true" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* 5. Contact Process — Premium timeline */}
      <Section variant="default" spacing="md" containerSize="xl" className="relative overflow-hidden">
        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute -right-40 top-10 size-[300px] rounded-full animate-float-slow"
            style={{
              background: "radial-gradient(circle at center, oklch(0.55 0.18 250 / 0.05) 0%, transparent 70%)",
            }}
          />
        </div>

        <MotionDiv preset="blur-in" className="mb-16">
          <SectionHeading
            badge="Simple Steps"
            title="How It Works"
            subtitle="Getting your plumbing fixed is as easy as 1-2-3."
            align="center"
          />
        </MotionDiv>

        <div className="relative mx-auto max-w-4xl">
          {/* Connecting line — desktop */}
          <div
            className="pointer-events-none absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] hidden h-px sm:block"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-200 via-gold-200 to-green-200 opacity-40" />
            <div
              className="absolute top-1/2 -mt-1.5 size-3 rounded-full bg-brand-500 shadow-[0_0_12px_oklch(0.55_0.18_250/0.6)]"
              style={{ animation: "marquee-ltr 5s ease-in-out infinite alternate" }}
            />
          </div>

          <MotionDiv preset="stagger" as="div" className="grid gap-10 sm:grid-cols-3 sm:gap-6">
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <MotionDiv key={step.step} preset="stagger-item">
                  <div className="relative flex flex-col items-center text-center">
                    {/* Icon */}
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
                    <p className="max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </MotionDiv>
              );
            })}
          </MotionDiv>
        </div>
      </Section>

      {/* 6. Google Maps Section */}
      <Section variant="default" spacing="md" containerSize="xl" className="bg-[oklch(0.985_0.003_250)]">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Find Us"
            title="Our Headquarters"
            subtitle="Strategically located in Hafeezpet to serve Hyderabad quickly."
            align="center"
            className="mb-10"
          />
        </MotionDiv>
        <MotionDiv preset="fade">
          <div className="overflow-hidden rounded-3xl border border-gray-100/80 shadow-[0_8px_40px_oklch(0_0_0/0.10)]">
            <GoogleMap address={fullAddress} className="h-[400px] w-full lg:h-[500px]" />
          </div>
        </MotionDiv>
      </Section>

      {/* 7. Areas We Serve — Premium glass pills */}
      <Section variant="default" spacing="md" containerSize="xl" className="bg-muted/30">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Local Coverage"
            title="Areas We Serve"
            subtitle="Providing top-tier plumbing services across these major neighborhoods."
            align="center"
            className="mb-12"
          />
        </MotionDiv>
        <MotionDiv preset="stagger" as="div">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
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

        {/* Trust indicators */}
        <MotionDiv preset="fade" className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            { icon: CheckCircle2, label: "Same-Day Service Available" },
            { icon: Zap, label: "24/7 Emergency Response" },
            { icon: Phone, label: "Free Estimates" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Icon className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </MotionDiv>
      </Section>
    </>
  );
}
