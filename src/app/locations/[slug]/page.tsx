import { notFound } from "next/navigation";
import { TARGET_LOCATIONS } from "@/lib/location-data";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/layout/Section";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, MessageCircle, Wrench, Shield, Clock } from "lucide-react";
import { getWhatsAppUrl, getPhoneUrl, SITE_CONFIG } from "@/lib/constants";
import { Metadata } from "next";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const location = TARGET_LOCATIONS.find((l) => l.id === resolvedParams.slug);

  if (!location) {
    return { title: "Location Not Found" };
  }

  return {
    title: `Emergency Plumber in ${location.name} | Best Plumbing Near Me`,
    description: `Need a reliable plumber in ${location.name}? Ganesh Plumbing Services offers 24/7 emergency plumbing near you, leak detection, and installations in ${location.name}, Hyderabad.`,
    openGraph: {
      title: `Emergency Plumber in ${location.name} | Top-Rated Plumbing Near Me`,
      description: `Fast and affordable 24/7 emergency plumbing services in ${location.name}, Hyderabad.`,
    },
  };
}

export function generateStaticParams() {
  return TARGET_LOCATIONS.map((location) => ({
    slug: location.id,
  }));
}

export default async function LocationPage({ params }: LocationPageProps) {
  const resolvedParams = await params;
  const location = TARGET_LOCATIONS.find((l) => l.id === resolvedParams.slug);

  if (!location) {
    notFound();
  }

  const whatsappMessage = `Hi, I need plumbing services in ${location.name}. Can you help?`;

  return (
    <>
      <PageHero
        title={`Plumbing Services in ${location.name}`}
        subtitle={`Your trusted local plumbing experts in ${location.name}, Hyderabad. Available 24/7.`}
        bgImage="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
      />

      <Section spacing="lg" className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Main Content */}
          <div>
            <MotionDiv preset="slide-up">
              <div className="mb-6 flex items-center gap-2 text-brand-600">
                <MapPin className="size-5" />
                <span className="font-semibold uppercase tracking-wider text-sm">Local Experts</span>
              </div>
              <h2 className="mb-6 font-heading text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">
                Top-Rated Plumbers in {location.name}
              </h2>
              <div className="prose prose-lg text-muted-foreground prose-p:leading-relaxed max-w-none">
                <p>
                  Finding a dependable plumber when you need one shouldn&apos;t be a hassle. At Ganesh Plumbing Services, we are proud to be the go-to plumbing experts for residents and businesses looking for the best <strong>plumber near me</strong> in <strong>{location.name}</strong>.
                </p>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-950 mt-8 mb-4">
                  Emergency 24/7 Plumbing in {location.name}
                </h2>
                <p>
                  We understand that plumbing emergencies don&apos;t wait for business hours. Whether it&apos;s a burst pipe in the middle of the night or a heavily leaking faucet on a weekend, our rapid-response <strong>emergency plumbing</strong> team is available around the clock. 
                </p>
                <p className="mt-4">
                  {location.areaInfo}
                </p>
              </div>
            </MotionDiv>

            <MotionDiv preset="slide-up" className="mt-12">
              <h3 className="mb-6 font-heading text-2xl font-bold text-brand-950">
                Why {location.name} Chooses Us
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { icon: Clock, title: "Rapid Response", desc: `Quick arrival across ${location.name}` },
                  { icon: Shield, title: "Licensed Pros", desc: "Certified and insured plumbers" },
                  { icon: Wrench, title: "Fully Equipped", desc: "Modern tools for every job" },
                  { icon: MapPin, title: "Locally Based", desc: "We know the local plumbing systems" },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <feature.icon className="size-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-950">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MotionDiv>
          </div>

          {/* Sidebar CTA */}
          <MotionDiv preset="slide-left">
            <div className="sticky top-24 overflow-hidden rounded-3xl bg-brand-950 p-8 shadow-[0_20px_50px_oklch(0.55_0.18_250/0.15)] relative">
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
                  Need a Plumber?
                </h3>
                <p className="mb-8 text-brand-100/80 leading-relaxed">
                  We have a team ready to dispatch to {location.name} right now.
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
              </div>
            </div>
          </MotionDiv>
        </div>
      </Section>
    </>
  );
}
