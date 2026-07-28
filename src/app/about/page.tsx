// ============================================================
// About Page — Ganesh Plumbing Services
// ============================================================


import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MessageCircle,
  MapPin,
  Shield,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Star,
  Zap,
} from "lucide-react";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  AREAS_SERVED,
} from "@/lib/constants";
import Link from "next/link";

export const metadata = createMetadata({
  title: "About Us | Ganesh Plumbing Services",
  description: "Learn about Ganesh Plumbing Services, a trusted team of professional plumbers in Hyderabad with over 15 years of experience.",
  path: "/about",
});

const DIFFERENTIATORS = [
  {
    title: "Local Hyderabad Expertise",
    desc: "We understand the unique water supply and drainage systems of Hyderabad, allowing us to diagnose and resolve issues much faster than out-of-town contractors.",
  },
  {
    title: "Fully Equipped Professionals",
    desc: "Our technicians arrive with fully stocked toolkits and modern diagnostic equipment, ensuring most problems are fixed on the very first visit.",
  },
  {
    title: "Clean & Respectful Service",
    desc: "We treat your home as if it were our own. Our team wears shoe covers when necessary and always cleans up the work area before leaving.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Page Hero */}
      <PageHero
        bgImage="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2070&auto=format&fit=crop"
        badge="ABOUT US"
        title="Your Trusted Local Plumbing Experts"
        subtitle="For over 5 years, we have been delivering reliable, high-quality plumbing solutions to homes and businesses across Miyapur and Hyderabad."
      />

      {/* 2. Our Story */}
      <Section variant="default" spacing="md" containerSize="lg">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <MotionDiv preset="slide-right">
            <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Story
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Ganesh Plumbing Services was founded with a clear, straightforward mission: to provide the residents of Miyapur and the greater Hyderabad area with a plumbing service they can genuinely depend on.
              </p>
              <p>
                Over the past 5+ years, we have grown from a small local operation into a highly trusted name in both residential and commercial plumbing. We recognized early on that when people face a plumbing emergency, they need more than just a quick fix — they need reassurance, transparency, and professionalism.
              </p>
              <p>
                Today, we continue to uphold those founding principles. Whether it is a minor tap repair or a major pipe installation, we approach every job with the same dedication to quality and customer satisfaction.
              </p>
            </div>
          </MotionDiv>

          {/* Premium story visual */}
          <MotionDiv preset="slide-left">
            <div className="relative overflow-hidden rounded-3xl">
              {/* Premium gradient background card */}
              <div
                className="relative flex min-h-[320px] flex-col items-center justify-center p-10 text-center"
              >
                {/* Dot grid */}
                <div className="absolute inset-0 dot-grid-bg opacity-20" aria-hidden="true" />
                {/* Plumber Photo Background */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2070&auto=format&fit=crop"
                    alt="Smiling Professional Plumber"
                    fill
                    className="object-cover"
                  />
                  {/* Overlays for readability and premium feel */}
                  <div className="absolute inset-0 bg-brand-950/70 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-brand-900/40" />
                </div>

                <div className="relative z-10">
                  {/* Glowing icon */}
                  <div className="relative mb-6 flex justify-center">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="absolute inset-0 flex size-20 items-center justify-center rounded-2xl bg-brand-500/20 animate-ping"
                        style={{ animationDelay: `${i * 0.6}s`, animationDuration: "3s" }}
                      />
                    ))}
                    <div className="relative flex size-32 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-md shadow-[0_8px_32px_oklch(0.55_0.18_250/0.4)] border border-white/20">
                      <Image 
                        src="/cartoon-plumber.png" 
                        alt="Friendly Cartoon Plumber" 
                        width={96} 
                        height={96} 
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <p className="font-heading text-2xl font-bold text-white">
                    Committed to Excellence
                  </p>
                  <p className="mt-2 text-sm text-white/55 max-w-[240px] mx-auto leading-relaxed">
                    Serving Hyderabad with pride since our inception.
                  </p>

                  {/* Mini trust badges */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    {[
                      { icon: Star, label: "5★ Rated" },
                      { icon: Zap, label: "24/7 Support" },
                      { icon: Shield, label: "Licensed" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-medium text-white/75 backdrop-blur-sm"
                      >
                        <Icon className="size-3.5 text-brand-300" aria-hidden="true" />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </Section>

      {/* 3. Mission & Values */}
      <Section variant="muted" spacing="md" containerSize="xl">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Our Core Principles"
            title="Mission & Values"
            subtitle="The standards that guide every repair, installation, and interaction."
            align="center"
            className="mb-12"
          />
        </MotionDiv>

        <MotionDiv preset="stagger" as="div" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: HeartHandshake,
              title: "Integrity First",
              description: "We believe in honest assessments and transparent pricing. No upselling unnecessary parts, and no hidden fees on your final bill.",
            },
            {
              icon: CheckCircle2,
              title: "Quality Craftsmanship",
              description: "We do not cut corners. Our repairs are built to last, utilizing high-quality materials and proven plumbing techniques.",
            },
            {
              icon: Clock,
              title: "24/7 Reliability",
              description: "Plumbing disasters don't wait for business hours. Our team is on standby around the clock to protect your property from water damage.",
            },
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

      {/* 4. Why Choose + Experience */}
      <Section variant="default" spacing="md" containerSize="xl">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Why Us"
            title="Experience You Can Count On"
            subtitle="What sets us apart as Hyderabad's preferred plumbing professionals."
            align="center"
            className="mb-12"
          />
        </MotionDiv>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Differentiators list */}
          <div className="lg:col-span-7">
            <MotionDiv preset="stagger" as="div" className="space-y-5">
              {DIFFERENTIATORS.map((point, i) => (
                <MotionDiv key={i} preset="stagger-item">
                  <div className="group flex gap-5 rounded-2xl border border-gray-100/80 bg-white/70 p-6 backdrop-blur-sm shadow-card transition-all duration-300 hover:shadow-[0_8px_32px_oklch(0_0_0/0.08)] hover:-translate-y-0.5 hover:border-brand-100">
                    {/* Premium checkmark icon */}
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_4px_12px_oklch(0.55_0.18_250/0.3)] transition-transform duration-300 group-hover:scale-110">
                      <CheckCircle2 className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="mb-1.5 font-heading text-lg font-semibold text-foreground">
                        {point.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </MotionDiv>
          </div>

          {/* Stat cards */}
          <div className="lg:col-span-5">
            <MotionDiv preset="stagger" as="div" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { value: "5+", label: "Years of Local Experience" },
                { value: "24/7", label: "Emergency Availability" },
                { value: "100%", label: "Commitment to Satisfaction" },
              ].map((stat) => (
                <MotionDiv key={stat.value} preset="stagger-item">
                  <StatCard value={stat.value} label={stat.label} />
                </MotionDiv>
              ))}
            </MotionDiv>
          </div>
        </div>
      </Section>

      {/* 5. Areas We Serve — Premium glass pills */}
      <Section variant="muted" spacing="md" containerSize="xl">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Local Coverage"
            title="Always Nearby When You Need Us"
            subtitle="We provide rapid response times across major neighborhoods in Hyderabad."
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

      {/* 6. Final CTA — Dark theatrical */}
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
          <div
            className="absolute -top-20 -right-20 size-[350px] rounded-full animate-float-slow"
            style={{
              background: "radial-gradient(circle at center, oklch(0.55 0.18 250 / 0.12), transparent 70%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <MotionDiv preset="blur-in">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Let&apos;s Discuss Your Plumbing Needs
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              Whether you need routine maintenance or emergency repairs, our experienced team is ready to help. Reach out today.
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

            <div className="mt-6 text-sm text-white/40">
              Prefer to write to us?{" "}
              <Link
                href="/contact"
                className="font-medium text-white/70 underline underline-offset-4 hover:text-white transition-colors"
              >
                Go to Contact Page
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>
    </>
  );
}
