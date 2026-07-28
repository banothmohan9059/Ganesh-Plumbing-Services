// ============================================================
// Ganesh Plumbing Services — Structured Data (JSON-LD)
// ============================================================

import { SITE_CONFIG } from "@/lib/constants";

// ------------------------------------------------------------
// LocalBusiness Schema
// ------------------------------------------------------------

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.pincode,
      addressCountry: SITE_CONFIG.address.country,
    },
    openingHoursSpecification: SITE_CONFIG.hours
      .filter((h) => h.isOpen)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: "08:00",
        closes: "20:00",
      })),
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: SITE_CONFIG.address.city,
    },
  };
}

// ------------------------------------------------------------
// Organization Schema
// ------------------------------------------------------------

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Telugu"],
    },
  };
}

// ------------------------------------------------------------
// BreadcrumbList Schema
// ------------------------------------------------------------

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.href}`,
    })),
  };
}

// ------------------------------------------------------------
// FAQPage Schema
// ------------------------------------------------------------

interface FAQSchemaItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ------------------------------------------------------------
// Service Schema
// ------------------------------------------------------------

export function generateServiceSchema(serviceName: string, serviceDescription: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.phone,
    },
    areaServed: {
      "@type": "City",
      name: SITE_CONFIG.address.city,
    },
    description: serviceDescription,
  };
}

// ------------------------------------------------------------
// JSON-LD Script Component Helper
// ------------------------------------------------------------

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
