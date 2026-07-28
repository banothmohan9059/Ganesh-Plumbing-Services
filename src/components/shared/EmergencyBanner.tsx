// ============================================================
// EmergencyBanner — Urgent top banner for emergency services
// ============================================================

import { cn } from "@/lib/utils";
import { Phone, AlertTriangle } from "lucide-react";
import { SITE_CONFIG, getPhoneUrl } from "@/lib/constants";

interface EmergencyBannerProps {
  message?: string;
  className?: string;
}

export function EmergencyBanner({
  message,
  className,
}: EmergencyBannerProps) {
  return (
    <div
      className={cn(
        "bg-destructive text-white",
        className
      )}
      role="alert"
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-center gap-2 px-4 py-2 text-center text-sm font-medium sm:gap-3">
        <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
        <span>
          {message || "24/7 Emergency Plumbing Available"}
        </span>
        <span className="hidden text-white/60 sm:inline" aria-hidden="true">—</span>
        <a
          href={getPhoneUrl()}
          className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
          aria-label={`Call for emergency plumbing at ${SITE_CONFIG.phone}`}
        >
          <Phone className="size-3" aria-hidden="true" />
          Call Now
        </a>
      </div>
    </div>
  );
}
