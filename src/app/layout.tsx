// ============================================================
// Ganesh Plumbing Services — Root Layout
// ============================================================

import type { Viewport } from "next";
import { Inter, Outfit } from "next/font/google";

import {
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  JsonLd,
} from "@/lib/structured-data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { FloatingTrustBadge } from "@/components/layout/FloatingTrustBadge";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// ------------------------------------------------------------
// Font Configuration
// ------------------------------------------------------------

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

import { createMetadata } from "@/lib/metadata";

// ------------------------------------------------------------
// Metadata
// ------------------------------------------------------------

export const metadata = createMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// ------------------------------------------------------------
// Root Layout
// ------------------------------------------------------------

import { getLocations } from "@/lib/data/locations";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locations = await getLocations();

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <JsonLd data={generateLocalBusinessSchema()} />
        <JsonLd data={generateOrganizationSchema()} />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
        {/* Skip to main content — Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Header */}
        <Header />

        {/* Main content */}
        <main id="main-content" className="flex-1 flex flex-col" role="main">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating lead-generation elements */}
        <FloatingActions />
        <FloatingTrustBadge />

        {/* Global Toaster */}
        <Toaster richColors position="bottom-right" />
        <CommandMenu locations={locations.map(l => ({ id: l.id, name: l.name }))} />
        </ThemeProvider>
      </body>
    </html>
  );
}
