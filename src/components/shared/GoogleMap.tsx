// ============================================================
// GoogleMap — Reusable Map Component
// ============================================================

import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface GoogleMapProps {
  address: string;
  className?: string;
}

export function GoogleMap({ address, className }: GoogleMapProps) {
  // Note: For a production app, you would replace this with an actual Google Maps iframe 
  // or a library like @react-google-maps/api. For now, it serves as a semantic placeholder.
  
  const mapQuery = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <div className={cn("relative w-full overflow-hidden rounded-2xl border border-border bg-muted", className)}>
      <iframe
        title={`Map location for ${address}`}
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "400px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Fallback overlay in case iframe fails or takes time to load */}
      <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-muted p-6 text-center text-muted-foreground">
        <MapPin className="mb-2 size-8 text-brand-500" aria-hidden="true" />
        <p className="text-sm font-medium">Loading map for:</p>
        <p className="text-xs">{address}</p>
      </div>
    </div>
  );
}
