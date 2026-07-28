"use client";

import { Inter, Outfit } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Global error:", error);
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
          <h1 className="font-heading text-4xl font-bold text-foreground">Critical Error</h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            A critical application error occurred. We are working to resolve this issue as quickly as possible.
          </p>
          <button
            onClick={() => reset()}
            className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Attempt Recovery
          </button>
        </div>
      </body>
    </html>
  );
}
