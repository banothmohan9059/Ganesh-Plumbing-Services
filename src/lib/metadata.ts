// ============================================================
// Ganesh Plumbing Services — Metadata Helpers
// ============================================================

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

// ------------------------------------------------------------
// Base URL
// ------------------------------------------------------------

const baseUrl = SITE_CONFIG.url;

// ------------------------------------------------------------
// Default Metadata
// ------------------------------------------------------------

const defaultMetadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  siteName: SITE_CONFIG.name,
  locale: "en_IN",
  type: "website" as const,
};

// ------------------------------------------------------------
// createMetadata — Generate per-page metadata
// ------------------------------------------------------------

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function createMetadata({
  title,
  description,
  path = "",
  ogImage,
  noIndex = false,
  keywords = [],
}: CreateMetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.name;
  const pageDescription = description || defaultMetadata.description;
  const canonicalUrl = `${baseUrl}${path}`;
  const ogImageUrl = ogImage || `${baseUrl}/og-image.jpg`;

  const defaultKeywords = [
    "plumbing services",
    "plumber",
    "emergency plumbing",
    "pipe repair",
    "leak repair",
    "bathroom plumbing",
    "kitchen plumbing",
    SITE_CONFIG.address.city,
    SITE_CONFIG.name,
  ];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [...defaultKeywords, ...keywords],

    metadataBase: new URL(baseUrl),

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: defaultMetadata.siteName,
      locale: defaultMetadata.locale,
      type: defaultMetadata.type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large" as const,
            "max-snippet": -1,
          },
        },

    verification: {
      // Add Google Search Console verification when available
      // google: "verification-token",
    },
  };
}
