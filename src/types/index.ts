export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type SectionVariant = "default" | "muted" | "primary" | "dark";
export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  features?: string[];
  createdAt?: FirestoreTimestamp | Date | string | null;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  src?: string;
  alt?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  aspectRatio?: "square" | "portrait" | "video";
  createdAt?: FirestoreTimestamp | Date | string | null;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  createdAt?: FirestoreTimestamp | Date | string | null;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  message?: string;
  status: "new" | "contacted" | "resolved";
  createdAt?: FirestoreTimestamp | Date | string | null;
}

export interface MediaItem {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ContactForm {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
}

export interface BusinessInfo {
  name: string;
  phone: string;
  email: string;
  url: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  hours: Array<{
    day: string;
    isOpen: boolean;
    hours?: string;
  }>;
}

export interface SiteConfig extends BusinessInfo {
  tagline: string;
  whatsapp: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
}
