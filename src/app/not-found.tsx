// ============================================================
// 404 — Premium Not Found Page
// ============================================================

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden section-padding">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-brand-400/[0.06] blur-[100px] animate-float-slow" />
        <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-gold-400/[0.04] blur-[80px] animate-float" />
      </div>

      <Container size="sm" className="relative">
        <div className="text-center space-y-8">
          {/* Animated 404 Graphic */}
          <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-brand-600"
            >
              {/* Pipe */}
              <path
                d="M40 100 H120 V160"
                stroke="currentColor"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M108 160 H132"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Dripping Water Drop */}
              <path
                d="M120 170 C120 170 110 180 110 185 C110 190.5 114.5 195 120 195 C125.5 195 130 190.5 130 185 C130 180 120 170 120 170 Z"
                fill="#38bdf8"
                className="animate-bounce"
                style={{ animationDuration: "2s" }}
              />
              {/* 404 Text overlapping */}
              <text
                x="50%"
                y="45%"
                textAnchor="middle"
                className="text-7xl font-bold fill-foreground font-heading"
              >
                404
              </text>
            </svg>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Page Not Found
            </h1>
            <p className="mx-auto max-w-md text-muted-foreground">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-full px-8 shadow-md hover-glow-brand"
              render={<Link href="/" />}
            >
              <Home className="size-4" data-icon="inline-start" aria-hidden="true" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-full px-8 border-brand-200 hover:border-brand-400"
              render={<Link href="/contact" />}
            >
              <ArrowLeft className="size-4" data-icon="inline-start" aria-hidden="true" />
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
