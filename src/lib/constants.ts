// ============================================================
// Ganesh Plumbing Services — Constants & Configuration
// ============================================================

import type { NavItem, SiteConfig } from "@/types";

// ------------------------------------------------------------
// Site Configuration
// ------------------------------------------------------------

export const SITE_CONFIG: SiteConfig = {
  name: "Ganesh Plumbing Services",
  tagline: "Professional Plumbing Solutions You Can Trust",
  description:
    "Ganesh Plumbing Services provides expert residential and commercial plumbing solutions in Miyapur, Hyderabad. Available 24/7 for emergency repairs, installations, and maintenance.",
  url: "https://ganeshplumbingservices.com",
  phone: "+916309665446",
  whatsapp: "+916309665446",
  email: "ganibanoth419@gmail.com",
  address: {
    street: "218/2, near Ambedkar Circle, near Janapriya Apartments, Ambedkar Nagar, Hafeezpet",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500049",
    country: "India",
  },
  hours: [
    { day: "Monday", hours: "Open 24 Hours", isOpen: true },
    { day: "Tuesday", hours: "Open 24 Hours", isOpen: true },
    { day: "Wednesday", hours: "Open 24 Hours", isOpen: true },
    { day: "Thursday", hours: "Open 24 Hours", isOpen: true },
    { day: "Friday", hours: "Open 24 Hours", isOpen: true },
    { day: "Saturday", hours: "Open 24 Hours", isOpen: true },
    { day: "Sunday", hours: "Open 24 Hours", isOpen: true },
  ],
  socialLinks: [],
};

// ------------------------------------------------------------
// Navigation
// ------------------------------------------------------------

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const LEGAL_LINKS: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

// ------------------------------------------------------------
// Areas Served
// ------------------------------------------------------------

export const AREAS_SERVED = [
  "Miyapur",
  "Hafeezpet",
  "Kondapur",
  "Gachibowli",
  "Nalagandla",
  "Chandanagar",
  "KPHB",
  "Kukatpally",
  "Nizampet",
  "Ameenpur",
  "Hitech City",
  "Jubilee Hills",
  "Manikonda",
  "Ameerpet",
  "Narsingi",
] as const;

// ------------------------------------------------------------
// WhatsApp
// ------------------------------------------------------------

export function getWhatsAppUrl(message?: string): string {
  const baseUrl = "https://wa.me/";
  const phone = SITE_CONFIG.whatsapp.replace(/[^0-9]/g, "");
  const encodedMessage = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `${baseUrl}${phone}${encodedMessage}`;
}

export function getPhoneUrl(): string {
  return `tel:${SITE_CONFIG.phone}`;
}

// ------------------------------------------------------------
// Default WhatsApp Message
// ------------------------------------------------------------

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi, I'm interested in your plumbing services. Can you provide more information?";
