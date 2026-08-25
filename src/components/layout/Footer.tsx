// ============================================================
// Footer — Premium dark navy footer
// ============================================================

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  SITE_CONFIG,
  NAV_LINKS,
  LEGAL_LINKS,
  getPhoneUrl,
} from "@/lib/constants";

const SERVICE_LINKS = [
  { label: "Leak Detection", href: "/services" },
  { label: "Pipe Installation & Repair", href: "/services" },
  { label: "Bathroom Plumbing", href: "/services" },
  { label: "Drain Cleaning", href: "/services" },
  { label: "Water Heater Repair", href: "/services" },
  { label: "Emergency Plumbing", href: "/services" },
];

const AREA_LINKS = [
  { label: "Miyapur", href: "/contact" },
  { label: "Kondapur", href: "/contact" },
  { label: "Gachibowli", href: "/contact" },
  { label: "KPHB", href: "/contact" },
  { label: "Kukatpally", href: "/contact" },
  { label: "Hitech City", href: "/contact" },
  { label: "Hafeezpet", href: "/contact" },
  { label: "Jubilee Hills", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white" role="contentinfo">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" aria-hidden="true" />

      {/* Floating decorative */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 right-20 size-[300px] rounded-full bg-brand-500/[0.04] blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 size-[200px] rounded-full bg-gold-500/[0.03] blur-[60px]" />
      </div>

      {/* Main footer content */}
      <Container size="xl">
        <div className="relative grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-20">
          {/* Column 1: Business Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="mb-5 inline-flex items-center gap-2" aria-label="Home">
              <Image
                src="/logo.png"
                alt={`${SITE_CONFIG.name} Logo`}
                width={72}
                height={72}
                className="object-contain rounded-xl bg-white/10 p-1"
              />
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {SITE_CONFIG.tagline}. Trusted by homeowners and businesses for reliable, professional plumbing solutions.
            </p>

            {/* Contact details */}
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={getPhoneUrl()}
                  className="inline-flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-brand-300"
                  aria-label={`Call ${SITE_CONFIG.phone}`}
                >
                  <Phone className="size-4 shrink-0 text-brand-400" aria-hidden="true" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-brand-300"
                >
                  <Mail className="size-4 shrink-0 text-brand-400" aria-hidden="true" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <span>
                  {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city},{" "}
                  {SITE_CONFIG.address.state} {SITE_CONFIG.address.pincode}
                </span>
              </li>
            </ul>
          </div>

          {/* Wrapper for side-by-side on mobile */}
          <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:col-span-2 lg:gap-8">
            {/* Column 2: Quick Links */}
            <div>
            <h3 className="mb-5 font-heading text-sm font-bold text-white/90 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="mb-5 font-heading text-sm font-bold text-white/90 uppercase tracking-wider">
              Our Services
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </div>

          {/* Column 4: Hours & Areas */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-5 font-heading text-sm font-bold text-white/90 uppercase tracking-wider">
              Business Hours
            </h3>
            <ul className="space-y-2.5">
              {SITE_CONFIG.hours.map((h: { day: string; isOpen: boolean; hours?: string }) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-white/40">{h.day}</span>
                  <span
                    className={cn(
                      "font-medium",
                      h.isOpen ? "text-white/70" : "text-white/40"
                    )}
                  >
                    {h.hours}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="mb-4 font-heading text-sm font-bold text-white/90 uppercase tracking-wider">
                Areas We Serve
              </h3>
              <div className="flex flex-wrap gap-2">
                {AREA_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:text-white/70"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container size="xl">
          <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
            <div className="flex flex-col items-center gap-1 sm:items-start">
              <p className="text-xs text-white/30">
                © {currentYear} {SITE_CONFIG.name}. All rights reserved.
              </p>
              <p className="text-xs text-white/30">
                Developed by banothmohan9059@gmail.com
              </p>
            </div>
            <nav aria-label="Legal links">
              <ul className="flex items-center gap-5">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/30 transition-colors hover:text-white/60"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </div>
    </footer>
  );
}
