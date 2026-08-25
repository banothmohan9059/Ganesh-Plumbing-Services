import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { Star, Quote, Phone, MessageCircle } from "lucide-react";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants";

export const metadata = createMetadata({
  title: "Customer Reviews | Ganesh Plumbing Services",
  description: "Read what our customers have to say about our premium plumbing services in Hyderabad.",
  path: "/reviews",
});

// Mock reviews since there's no dedicated database collection in the setup
const REVIEWS_DATA = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Miyapur",
    rating: 5,
    text: "Excellent service! They arrived on time, quickly identified the leakage issue in my bathroom, and fixed it perfectly. Highly recommend Ganesh Plumbing.",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Sneha Reddy",
    location: "Gachibowli",
    rating: 5,
    text: "Very professional team. They installed a new water heater and upgraded our pipe fittings without any mess. The pricing was transparent and reasonable.",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Amit Sharma",
    location: "Kondapur",
    rating: 5,
    text: "I had a massive drain blockage in the middle of the night. Their emergency service was a lifesaver! Fast, efficient, and very polite.",
    date: "3 months ago"
  },
  {
    id: 4,
    name: "Priya Singh",
    location: "Kukatpally",
    rating: 4,
    text: "Good work on the kitchen sink repair. They were a little late due to traffic, but the actual repair was done flawlessly. Will use their services again.",
    date: "4 months ago"
  },
  {
    id: 5,
    name: "Vikram Rao",
    location: "Hitech City",
    rating: 5,
    text: "Ganesh Plumbing has been my go-to for all property maintenance. They always deliver premium quality work with branded materials. Trustworthy professionals.",
    date: "5 months ago"
  },
  {
    id: 6,
    name: "Anjali Desai",
    location: "Jubilee Hills",
    rating: 5,
    text: "Complete bathroom renovation was done perfectly. The finishing is incredibly premium and they ensured everything was watertight before leaving.",
    date: "6 months ago"
  }
];

export default function ReviewsPage() {
  return (
    <>
      {/* 1. Page Hero */}
      <PageHero
        badge="Testimonials"
        title="Customer Reviews"
        subtitle="Don't just take our word for it. Read what homeowners and businesses across Hyderabad have to say about our plumbing services."
      />

      {/* 2. Reviews Grid */}
      <Section variant="default" spacing="md" containerSize="xl" className="min-h-[50vh]">
        <MotionDiv preset="slide-up">
          <SectionHeading
            badge="Feedback"
            title="What Our Clients Say"
            subtitle="Real experiences from satisfied customers in your neighborhood."
            align="center"
            className="mb-12"
          />
        </MotionDiv>
        
        <MotionDiv preset="stagger" as="div" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS_DATA.map((review) => (
            <MotionDiv key={review.id} preset="stagger-item">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-[0_2px_12px_oklch(0_0_0/0.04)] transition-all duration-300 hover:shadow-[0_8px_24px_oklch(0_0_0/0.08)] hover:-translate-y-1">
                <div>
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                      />
                    ))}
                  </div>
                  <Quote className="mb-3 size-8 text-brand-100" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &quot;{review.text}&quot;
                  </p>
                </div>
                
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                    <span>{review.location}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
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
              Ready to Experience 5-Star Service?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              Join our growing list of satisfied customers. We are available 24/7 for all your plumbing needs.
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
