// ============================================================
// CTA — Call-to-Action block (Phone + WhatsApp)
// ============================================================

import { cn } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SITE_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/constants";

interface CTAProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "inline" | "stacked";
  size?: "sm" | "md" | "lg";
  phoneLabel?: string;
  whatsappLabel?: string;
  whatsappMessage?: string;
}

export function CTA({
  variant = "inline",
  size = "md",
  phoneLabel,
  whatsappLabel,
  whatsappMessage = DEFAULT_WHATSAPP_MESSAGE,
  className,
  ...props
}: CTAProps) {
  const sizeClasses = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
  };

  const buttonSizes = {
    sm: "default" as const,
    md: "lg" as const,
    lg: "lg" as const,
  };

  return (
    <div
      className={cn(
        "flex",
        variant === "inline"
          ? "flex-col sm:flex-row items-start sm:items-center"
          : "flex-col items-stretch",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Phone CTA */}
      <Button
        size={buttonSizes[size]}
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all hover:shadow-lg"
        render={
          <a
            href={getPhoneUrl()}
            aria-label={`Call ${SITE_CONFIG.name} at ${SITE_CONFIG.phone}`}
          />
        }
      >
        <Phone className="size-4" data-icon="inline-start" aria-hidden="true" />
        {phoneLabel || `Call ${SITE_CONFIG.phone}`}
      </Button>

      {/* WhatsApp CTA */}
      <Button
        size={buttonSizes[size]}
        variant="outline"
        className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 shadow-sm transition-all hover:shadow-md"
        render={
          <a
            href={getWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message ${SITE_CONFIG.name} on WhatsApp`}
          />
        }
      >
        <MessageCircle
          className="size-4"
          data-icon="inline-start"
          aria-hidden="true"
        />
        {whatsappLabel || "WhatsApp Us"}
      </Button>
    </div>
  );
}
