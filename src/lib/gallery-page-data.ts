// ============================================================
// Gallery Page Data
// ============================================================

export function getPlaceholderImage(text: string) {
  const svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f1f5f9"/><text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="#64748b" text-anchor="middle" dominant-baseline="middle">${text}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export interface GalleryProject {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  location: string;
  aspectRatio: "square" | "video" | "portrait";
}

export const GALLERY_CATEGORIES = [
  "All",
  "Leak Repairs",
  "Bathroom Plumbing",
  "Kitchen Plumbing",
  "Drain Cleaning",
  "Bathroom Renovation",
  "Water Heater Repair",
  "Emergency Plumbing",
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "proj-1",
    src: getPlaceholderImage("Bathroom Renovation"),
    alt: "Complete bathroom pipe routing and fixture installation",
    title: "Complete Bathroom Renovation",
    category: "Bathroom Renovation",
    location: "Miyapur",
    aspectRatio: "portrait",
  },
  {
    id: "proj-2",
    src: getPlaceholderImage("Leak Repair"),
    alt: "Concealed wall leak detection and repair",
    title: "Concealed Wall Leak Repair",
    category: "Leak Repairs",
    location: "Kondapur",
    aspectRatio: "square",
  },
  {
    id: "proj-3",
    src: getPlaceholderImage("Drain Cleaning"),
    alt: "High-pressure drain cleaning for commercial kitchen",
    title: "Commercial Drain Unblocking",
    category: "Drain Cleaning",
    location: "Gachibowli",
    aspectRatio: "video",
  },
  {
    id: "proj-4",
    src: getPlaceholderImage("Water Heater"),
    alt: "New geyser installation in residential apartment",
    title: "25L Geyser Installation",
    category: "Water Heater Repair",
    location: "KPHB",
    aspectRatio: "square",
  },
  {
    id: "proj-7",
    src: getPlaceholderImage("Kitchen Plumbing"),
    alt: "Modern kitchen sink and RO filter connection",
    title: "Kitchen Sink & RO Setup",
    category: "Kitchen Plumbing",
    location: "Nalagandla",
    aspectRatio: "square",
  },
  {
    id: "proj-8",
    src: getPlaceholderImage("Emergency Call"),
    alt: "Midnight burst pipe repair",
    title: "Midnight Burst Pipe Repair",
    category: "Emergency Plumbing",
    location: "Hitech City",
    aspectRatio: "square",
  },
];

export const BEFORE_AFTER_PROJECTS = [
  {
    id: "ba-1",
    title: "Corroded Pipe Replacement",
    location: "Miyapur",
    description: "Replaced an old, heavily rusted iron pipe with a modern, durable CPVC pipe to restore clean water flow and prevent leaks.",
    beforeImage: getPlaceholderImage("Before: Corroded Pipe"),
    afterImage: getPlaceholderImage("After: New CPVC Pipe"),
  },
  {
    id: "ba-2",
    title: "Bathroom Seepage Fix",
    location: "Chandanagar",
    description: "Diagnosed and repaired severe water seepage causing wall damage. Regrouted tiles and sealed concealed pipe leaks.",
    beforeImage: getPlaceholderImage("Before: Wall Seepage"),
    afterImage: getPlaceholderImage("After: Fixed & Regrouted"),
  },
];
