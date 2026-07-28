"use client";

import { useState } from "react";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { GalleryCard } from "@/components/shared/GalleryCard";
import { GalleryItem } from "@/types";
import { GALLERY_CATEGORIES } from "@/lib/gallery-page-data";

interface GalleryClientProps {
  initialItems: GalleryItem[];
}

export function GalleryClient({ initialItems }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? initialItems 
    : initialItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Categories Tag Cloud — premium glass pills */}
      <MotionDiv preset="fade" className="mb-12 flex flex-wrap items-center justify-center gap-2">
        {GALLERY_CATEGORIES.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={
                isActive
                  ? "inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-md glow-brand transition-all"
                  : "inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium bg-white/70 text-foreground ring-1 ring-white/40 backdrop-blur-sm shadow-card hover:shadow-elevated hover:-translate-y-0.5 hover:ring-brand-200 transition-all duration-300 cursor-pointer"
              }
            >
              {category}
            </button>
          );
        })}
      </MotionDiv>

      {/* Masonry-style Grid */}
      <MotionDiv preset="stagger" as="div" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {filteredItems.length > 0 ? (
          filteredItems.map((project) => (
            <MotionDiv key={project.id} preset="stagger-item">
              <GalleryCard
                src={project.src || project.imageUrl || ""}
                alt={project.alt || project.title}
                title={project.title}
                category={project.category}
                aspectRatio={project.aspectRatio || "square"}
              />
            </MotionDiv>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No gallery images found for this category.
          </div>
        )}
      </MotionDiv>
    </>
  );
}
