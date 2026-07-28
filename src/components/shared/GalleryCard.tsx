"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface GalleryCardProps {
  src: string;
  alt: string;
  title: string;
  category?: string;
  aspectRatio?: "square" | "video" | "portrait";
  className?: string;
}

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

export function GalleryCard({
  src,
  alt,
  title,
  category,
  aspectRatio = "square",
  className,
}: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-muted",
        "shadow-[0_2px_8px_oklch(0_0_0/0.08)]",
        "transition-all duration-500 hover:shadow-[0_16px_48px_oklch(0_0_0/0.18)] hover:-translate-y-1",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Gradient border on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "transparent",
          boxShadow: "inset 0 0 0 1.5px oklch(0.55 0.18 250 / 0.35)",
        }}
        aria-hidden="true"
      />

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={cn(
          "object-cover transition-all duration-700 group-hover:scale-106",
          isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
        )}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* Overlay — always has slight gradient at bottom, full glass on hover */}
      <figcaption
        className={cn(
          "absolute inset-0 flex flex-col justify-end p-5 transition-all duration-400",
          "bg-gradient-to-t from-black/50 via-black/0 to-transparent",
          "group-hover:from-black/75 group-hover:via-black/20"
        )}
      >
        {category && (
          <span
            className={cn(
              "mb-1.5 inline-flex w-fit items-center rounded-full px-2.5 py-0.5",
              "text-xs font-semibold uppercase tracking-wider text-white/80",
              "bg-white/10 backdrop-blur-sm border border-white/20",
              "opacity-0 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0"
            )}
          >
            {category}
          </span>
        )}
        <span
          className={cn(
            "text-sm font-bold text-white",
            "opacity-0 translate-y-2 transition-all duration-400 delay-75 group-hover:opacity-100 group-hover:translate-y-0"
          )}
        >
          {title}
        </span>
      </figcaption>
    </figure>
  );
}
