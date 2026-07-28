// ============================================================
// Local SEO Location Data
// ============================================================

export interface LocationData {
  id: string;
  name: string;
  areaInfo: string;
  popularServices: string[];
}

export const TARGET_LOCATIONS: LocationData[] = [
  {
    id: "miyapur",
    name: "Miyapur",
    areaInfo: "As a rapidly growing residential hub, Miyapur homes frequently need tap repairs, water heater servicing, and leak detection.",
    popularServices: ["Tap & Fixture Repair", "Water Heater Installation", "Leak Detection"],
  },
  {
    id: "gachibowli",
    name: "Gachibowli",
    areaInfo: "Serving the IT corridor and premium apartments in Gachibowli with 24/7 emergency plumbing and high-end bathroom renovations.",
    popularServices: ["Emergency Plumbing", "Bathroom Renovation", "Toilet Repair"],
  },
  {
    id: "kukatpally",
    name: "Kukatpally",
    areaInfo: "Providing fast, reliable drain unblocking and complete household plumbing solutions for families across Kukatpally.",
    popularServices: ["Drain Unblocking", "Kitchen Plumbing", "Tap Repair"],
  },
  {
    id: "madhapur",
    name: "Madhapur",
    areaInfo: "Expert commercial and residential plumbing services tailored for the fast-paced lifestyle of Madhapur residents.",
    popularServices: ["Commercial Plumbing", "Leak Detection", "Emergency Repairs"],
  },
];
