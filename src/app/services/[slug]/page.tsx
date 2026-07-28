import { notFound } from "next/navigation";

import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/layout/Section";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import * as Icons from "lucide-react";
import { getWhatsAppUrl, getPhoneUrl, SITE_CONFIG } from "@/lib/constants";
import { JsonLd, generateServiceSchema } from "@/lib/structured-data";
import { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

async function getService(slug: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return null;

  try {
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/services/${slug}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      return null;
    }

    const doc = await res.json();
    return {
      id: doc.name.split('/').pop(),
      title: doc.fields?.title?.stringValue || "",
      description: doc.fields?.description?.stringValue || "",
      iconName: doc.fields?.iconName?.stringValue || "Wrench",
      features: doc.fields?.features?.arrayValue?.values?.map((v: { stringValue: string }) => v.stringValue) || [],
    };
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `Top-Rated ${service.title} in Hyderabad | Best Near Me`,
    description: `Need expert ${service.title.toLowerCase()}? ${SITE_CONFIG.name} provides fast, affordable, and professional ${service.title.toLowerCase()} in Hyderabad. Call us today!`,
    openGraph: {
      title: `Expert ${service.title} Services in Hyderabad`,
      description: `Need expert ${service.title.toLowerCase()}? ${SITE_CONFIG.name} provides fast, affordable, and professional ${service.title.toLowerCase()} in Hyderabad. Call us today!`,
    },
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return [];
  try {
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/services`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.documents || []).map((doc: { name: string }) => ({
      slug: doc.name.split('/').pop(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const whatsappMessage = `Hi Ganesh Plumbing, I need help with ${service.title}. Can you please assist me?`;
  const IconComponent = (Icons as unknown as Record<string, import("lucide-react").LucideIcon>)[service.iconName || "Wrench"] || Icons.Wrench;

  return (
    <>
      <JsonLd data={generateServiceSchema(service.title, service.description)} />
      <PageHero
        title={service.title}
        subtitle={service.description}
        bgImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
      />

      <Section spacing="lg" className="bg-[oklch(0.985_0.003_250)]">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Main Content */}
          <div>
            <MotionDiv preset="slide-up">
              <h2 className="mb-6 font-heading text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">
                Expert {service.title} Services
              </h2>
              <div className="prose prose-lg text-muted-foreground prose-p:leading-relaxed max-w-none">
                <p>
                  When you are dealing with plumbing issues, you need a reliable, fast, and professional solution. Our <strong>{service.title.toLowerCase()}</strong> service is designed to solve your problems quickly with lasting results.
                </p>
                <p className="mt-4">
                  We use the latest tools and techniques to ensure your plumbing systems run perfectly. With transparent pricing and a focus on quality, Ganesh Plumbing Services is your trusted local expert in Hyderabad.
                </p>
              </div>
            </MotionDiv>

            <MotionDiv preset="slide-up" className="mt-12">
              <h3 className="mb-6 font-heading text-2xl font-bold text-brand-950">
                What&apos;s Included?
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {service.features.map((feature: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-colors hover:shadow-md"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <CheckCircle2 className="size-5" />
                    </div>
                    <span className="font-medium text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </MotionDiv>
          </div>

          {/* Sidebar CTA */}
          <MotionDiv preset="slide-left">
            <div className="sticky top-24 overflow-hidden rounded-3xl bg-brand-950 p-8 shadow-[0_20px_50px_oklch(0.55_0.18_250/0.15)] relative">
              {/* Decorative Glow */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background:
                    "radial-gradient(circle at top right, oklch(0.55 0.18 250 / 0.25) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
              
              <div className="relative z-10">
                <h3 className="mb-2 font-heading text-2xl font-bold text-white">
                  Need this fixed?
                </h3>
                <p className="mb-8 text-brand-100/80 leading-relaxed">
                  We are ready to help with your {service.title.toLowerCase()} right now.
                </p>

                <div className="space-y-4">
                  <Button
                    render={<a href={getWhatsAppUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" aria-label="Book on WhatsApp" />}
                    size="lg"
                    className="w-full bg-brand-500 text-white hover:bg-brand-400 group h-14"
                  >
                    <MessageCircle className="mr-2 size-5 transition-transform group-hover:scale-110" />
                    Book on WhatsApp
                  </Button>
                  
                  <Button
                    render={<a href={getPhoneUrl()} aria-label={`Call ${SITE_CONFIG.phone}`} />}
                    size="lg"
                    variant="outline"
                    className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 group h-14"
                  >
                    <Phone className="mr-2 size-5 transition-transform group-hover:scale-110" />
                    Call {SITE_CONFIG.phone}
                  </Button>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="flex size-12 items-center justify-center rounded-full bg-brand-500/20 text-brand-300">
                    <IconComponent className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Premium Quality</p>
                    <p className="text-xs text-white/60">100% Satisfaction Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </Section>
    </>
  );
}
