// ============================================================
// Ganesh Plumbing Services — Homepage Data
// ============================================================
// Centralized data for all homepage sections.
// No business copy is hardcoded in components.
// ============================================================

import {
  Clock,
  MapPin,
  Zap,
  Shield,
  IndianRupee,
  BadgeCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ------------------------------------------------------------
// Trust Stats
// ------------------------------------------------------------

export interface TrustStat {
  value: string;
  suffix?: string;
  label: string;
}

export const TRUST_STATS: TrustStat[] = [
  { value: "5", suffix: "+", label: "Years Experience" },
  { value: "500", suffix: "+", label: "Happy Customers" },
  { value: "24/7", label: "Emergency Service" },
  { value: "15", suffix: "+", label: "Areas Covered" },
];

// ------------------------------------------------------------
// Why Choose Us
// ------------------------------------------------------------

export interface WhyChooseItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WHY_CHOOSE_US: WhyChooseItem[] = [
  {
    icon: Shield,
    title: "Licensed & Experienced",
    description: "Over 5 years of certified plumbing expertise across residential and commercial projects.",
  },
  {
    icon: Zap,
    title: "24/7 Emergency Response",
    description: "Burst pipe at midnight? We're available around the clock for urgent plumbing repairs.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description: "No hidden charges. We provide upfront quotes before any work begins.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Guaranteed",
    description: "We stand behind every job with a satisfaction guarantee on all our work.",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    description: "We respect your time. Punctual arrivals and efficient service, always.",
  },
  {
    icon: MapPin,
    title: "Local to Miyapur",
    description: "Based in your neighborhood. Quick response times across Miyapur and surrounding areas.",
  },
];

// ------------------------------------------------------------
// Featured Services
// ------------------------------------------------------------

export interface FeaturedService {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export const FEATURED_SERVICES: FeaturedService[] = [
  {
    id: "leak-detection",
    iconName: "Search",
    title: "Leak Detection",
    description: "Advanced leak detection to find and fix hidden water leaks before they cause damage.",
  },
  {
    id: "tap-repair",
    iconName: "Droplets",
    title: "Tap & Fixture Repair",
    description: "Expert repair and installation for all types of taps, faucets, and bathroom fixtures.",
  },
  {
    id: "water-heater",
    iconName: "Flame",
    title: "Water Heater Repair",
    description: "Fast and safe repair, servicing, and installation for gas and electric water heaters.",
  },
  {
    id: "drain-cleaning",
    iconName: "CircleOff",
    title: "Drain Unblocking",
    description: "Professional unblocking of sinks, toilets, and main drains to restore flow instantly.",
  },
];

// ------------------------------------------------------------
// How We Work
// ------------------------------------------------------------

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Call or WhatsApp Us",
    description: "Describe your plumbing issue. We'll provide a free estimate and schedule a convenient time.",
  },
  {
    step: 2,
    title: "We Visit & Diagnose",
    description: "Our expert plumber arrives on time, inspects the problem, and explains the best solution.",
  },
  {
    step: 3,
    title: "Problem Solved",
    description: "We fix it right the first time, clean up after ourselves, and guarantee our work.",
  },
];

// ------------------------------------------------------------
// Testimonials
// ------------------------------------------------------------

export interface TestimonialData {
  name: string;
  location: string;
  rating: number;
  text: string;
}

export const TESTIMONIALS: TestimonialData[] = [
  {
    name: "Rajesh K.",
    location: "Miyapur",
    rating: 5,
    text: "Had a major pipe leak at 10 PM. Called Ganesh Plumbing and they arrived within 30 minutes. Fixed everything quickly and the pricing was very fair. Highly recommended!",
  },
  {
    name: "Priya M.",
    location: "Kondapur",
    rating: 5,
    text: "Very professional service. They renovated our entire bathroom plumbing and the quality of work was excellent. No hidden charges and they cleaned up perfectly after the job.",
  },
  {
    name: "Suresh B.",
    location: "Gachibowli",
    rating: 5,
    text: "Best plumber in the area. We've been using their services for over 2 years now. Always on time, always professional, and their rates are very reasonable.",
  },
];

// ------------------------------------------------------------
// FAQ Preview
// ------------------------------------------------------------

export interface FAQData {
  question: string;
  answer: string;
}

export const FAQ_PREVIEW: FAQData[] = [
  {
    question: "How much do plumbing services cost in Hyderabad?",
    answer: "Our pricing varies based on the type of service needed. Basic repairs start at affordable rates, and we always provide a free upfront estimate before starting any work. No hidden charges — ever.",
  },
  {
    question: "Do you provide free estimates?",
    answer: "Yes! We offer free estimates for all plumbing services. Call us or send a WhatsApp message describing your issue, and we'll give you a transparent quote before scheduling a visit.",
  },
  {
    question: "What areas in Hyderabad do you serve?",
    answer: "We serve Miyapur, Hafeezpet, Kondapur, Gachibowli, KPHB, Kukatpally, Hitech City, Jubilee Hills, and 10+ more areas across Hyderabad. Contact us to confirm service availability in your locality.",
  },
  {
    question: "Are you available for emergency plumbing calls?",
    answer: "Absolutely. We provide 24/7 emergency plumbing services across Hyderabad. Whether it's a burst pipe, severe leak, or blocked drain at any hour — call us and we'll be there as quickly as possible.",
  },
  {
    question: "How quickly can a plumber arrive?",
    answer: "For emergency calls, we typically arrive within 30-60 minutes depending on your location. For scheduled appointments, we arrive at the agreed time — punctuality is one of our core values.",
  },
];
