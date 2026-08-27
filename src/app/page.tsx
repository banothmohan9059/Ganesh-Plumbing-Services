// ============================================================
// Ganesh Plumbing Services — Homepage
// ============================================================

import {
  HeroSection,
  TrustStrip,
} from "@/components/sections";
import nextDynamic from "next/dynamic";
import { Service, Review } from "@/types";

// Removed static data fallbacks so Firestore is the strict source of truth.

const WhyChooseUs = nextDynamic(() => import("@/components/sections/WhyChooseUs").then((mod) => mod.WhyChooseUs), { ssr: true });
const FeaturedServices = nextDynamic(() => import("@/components/sections/FeaturedServices").then((mod) => mod.FeaturedServices), { ssr: true });
const EmergencySection = nextDynamic(() => import("@/components/sections/EmergencySection").then((mod) => mod.EmergencySection), { ssr: true });
const HowWeWork = nextDynamic(() => import("@/components/sections/HowWeWork").then((mod) => mod.HowWeWork), { ssr: true });
const AreasWeServe = nextDynamic(() => import("@/components/sections/AreasWeServe").then((mod) => mod.AreasWeServe), { ssr: true });
const ContactCTA = nextDynamic(() => import("@/components/sections/ContactCTA").then((mod) => mod.ContactCTA), { ssr: true });
const TestimonialsSection = nextDynamic(() => import("@/components/sections/TestimonialsSection").then((mod) => mod.TestimonialsSection), { ssr: true });
const FAQPreview = nextDynamic(() => import("@/components/sections/FAQPreview").then((mod) => mod.FAQPreview), { ssr: true });

import { getLocations } from "@/lib/data/locations";

export const revalidate = 60; // 1 minute ISR

export default async function HomePage() {
  let featuredServices: Service[] = [];
  let testimonials: Review[] = [];
  const locations = await getLocations();

  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (projectId) {
      const [servicesRes, reviewsRes] = await Promise.all([
        fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/services?pageSize=4`, { next: { revalidate: 60 } }),
        fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/reviews`, { next: { revalidate: 60 } })
      ]);
      
      
      if (servicesRes.ok) {
        const data = await servicesRes.json();
        if (data.documents && data.documents.length > 0) {
          featuredServices = data.documents.map((doc: { name: string; fields?: Record<string, { stringValue?: string }> }) => ({
            id: doc.name.split('/').pop() || "",
            title: doc.fields?.title?.stringValue || "",
            description: doc.fields?.description?.stringValue || "",
            iconName: doc.fields?.iconName?.stringValue || "Wrench",
          }));
        }
      }
      
      if (reviewsRes.ok) {
        const data = await reviewsRes.json();
        if (data.documents && data.documents.length > 0) {
          testimonials = data.documents.map((doc: { name: string; fields?: Record<string, { stringValue?: string; integerValue?: string; doubleValue?: string }> }) => ({
            id: doc.name.split('/').pop() || "",
            name: doc.fields?.name?.stringValue || "",
            location: doc.fields?.role?.stringValue || doc.fields?.location?.stringValue || "",
            text: doc.fields?.content?.stringValue || doc.fields?.text?.stringValue || "",
            rating: Number(doc.fields?.rating?.integerValue || doc.fields?.rating?.doubleValue || 5),
            author: doc.fields?.name?.stringValue || "",
            date: "",
          }));
        }
      }
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <WhyChooseUs />
      <FeaturedServices services={featuredServices} />
      <EmergencySection />
      <HowWeWork />
      <AreasWeServe areas={locations.map(l => l.name)} />
      <TestimonialsSection reviews={testimonials} />
      <FAQPreview />
      <ContactCTA />
    </>
  );
}
