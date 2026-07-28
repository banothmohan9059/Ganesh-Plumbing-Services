// ============================================================
// error.tsx — Premium Error Boundary
// ============================================================

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Home, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { MotionDiv } from "@/components/shared/MotionDiv";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <Section variant="default" spacing="lg" className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden text-center">
      {/* Background ambient elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 dot-grid-bg opacity-40" />
        <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-destructive/[0.04] blur-[100px] animate-float-slow" />
        <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-brand-400/[0.03] blur-[80px] animate-float" />
      </div>

      <MotionDiv preset="slide-up" className="relative mx-auto max-w-md space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            {/* Pulse rings */}
            {[1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full bg-destructive/10 animate-ping"
                style={{ animationDelay: `${i * 0.5}s`, animationDuration: "2.5s" }}
              />
            ))}
            <div className="relative flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-destructive/80 to-destructive text-white shadow-[0_0_30px_oklch(0.62_0.26_29/0.2)]">
              <AlertCircle className="size-11" />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Something went wrong
          </h2>
          
          <p className="text-base leading-relaxed text-muted-foreground">
            We apologize for the inconvenience. An unexpected error has occurred on our end. Please try again or return to the homepage.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
          <Button
            size="lg"
            className="h-13 w-full sm:w-auto rounded-full px-9 font-semibold bg-brand-600 text-white shadow-[0_4px_20px_oklch(0.55_0.18_250/0.3)] hover:bg-brand-500 hover:shadow-lg transition-all hover:scale-[1.02]"
            onClick={() => reset()}
          >
            <RefreshCcw className="mr-2 size-4" />
            Try Again
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="h-13 w-full sm:w-auto rounded-full px-9 font-semibold border-brand-200 hover:border-brand-400 hover:bg-brand-50/50 transition-all hover:scale-[1.02]"
            render={<Link href="/" />}
          >
            <Home className="mr-2 size-4" />
            Go Home
          </Button>
        </div>
      </MotionDiv>
    </Section>
  );
}
