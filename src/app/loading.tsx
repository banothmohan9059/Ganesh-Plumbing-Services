// ============================================================
// loading.tsx — Premium loading state
// ============================================================

import { Loader2 } from "lucide-react";
import { Section } from "@/components/layout/Section";

export default function Loading() {
  return (
    <Section className="relative flex min-h-[60vh] flex-col items-center justify-center gap-6 overflow-hidden">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="absolute size-[300px] rounded-full bg-brand-400/[0.04] blur-[80px] animate-pulse" />
      </div>

      <div className="relative">
        {/* Glow rings */}
        <div className="absolute inset-0 scale-150 rounded-full bg-brand-400/20 blur-xl animate-pulse" aria-hidden="true" />
        <div className="absolute inset-0 scale-110 rounded-full border border-brand-200/50 animate-ping" style={{ animationDuration: '3s' }} aria-hidden="true" />
        
        {/* Spinner */}
        <div className="relative flex size-16 items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_oklch(0_0_0/0.06),0_4px_12px_oklch(0.55_0.18_250/0.08)]">
          <Loader2 className="size-8 animate-spin text-brand-500" />
        </div>
      </div>
      
      <p className="font-heading text-sm font-semibold uppercase tracking-widest text-muted-foreground animate-pulse">
        Loading...
      </p>
    </Section>
  );
}
