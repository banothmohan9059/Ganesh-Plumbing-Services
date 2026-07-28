// ============================================================
// Services Page Data
// ============================================================



export interface ServiceDetail {
  id: string;
  iconName: string;
  title: string;
  description: string;
  features: string[];
}

export const ALL_SERVICES: ServiceDetail[] = [
  {
    id: "leak-detection",
    iconName: "Search",
    title: "Leak Detection",
    description: "Advanced non-destructive leak detection to find hidden water leaks behind walls or under floors.",
    features: ["Thermal imaging", "Acoustic testing", "Moisture mapping"],
  },
  {
    id: "tap-repair",
    iconName: "Droplets",
    title: "Tap Repair",
    description: "Fixing dripping taps, replacing old fixtures, and installing water-saving aerators.",
    features: ["Mixer tap repair", "Washer replacement", "New tap fitting"],
  },
  {
    id: "toilet-repair",
    iconName: "CircleOff",
    title: "Toilet Repair",
    description: "Comprehensive toilet services including flush repairs, leakage fixes, and seat replacements.",
    features: ["Flush tank repair", "Blockage removal", "Full replacement"],
  },
  {
    id: "drain-cleaning",
    iconName: "Waves",
    title: "Drain Cleaning",
    description: "Routine maintenance and cleaning of residential and commercial drainage systems.",
    features: ["Odor removal", "Preventive cleaning", "High-pressure jetting"],
  },
  {
    id: "drain-blockage",
    iconName: "Activity",
    title: "Drain Blockages",
    description: "Professional unblocking of sinks, toilets, and main lines using advanced techniques.",
    features: ["Camera inspection", "Root removal", "Hydro jetting"],
  },
  {
    id: "geyser-repair",
    iconName: "Flame",
    title: "Geyser Repair",
    description: "Expert repair and maintenance for all brands of gas and electric water heaters.",
    features: ["Thermostat repair", "Element replacement", "Scaling removal"],
  },
  {
    id: "geyser-install",
    iconName: "Bath",
    title: "Geyser Installation",
    description: "Safe and compliant installation of new water heaters with proper electrical and plumbing connections.",
    features: ["Brand agnostic", "Safety check", "Old geyser removal"],
  },
  {
    id: "water-motors",
    iconName: "Activity",
    title: "Water Motors",
    description: "Installation, repair, and maintenance of domestic water pumps and motors.",
    features: ["Pressure pumps", "Submersible motors", "Switch repair"],
  },
  {
    id: "tanks-sumps",
    iconName: "CookingPot",
    title: "Tanks & Sumps",
    description: "Thorough cleaning, repairing, and installation of overhead water tanks and underground sumps.",
    features: ["Anti-bacterial clean", "Crack sealing", "Float valve repair"],
  },
  {
    id: "bathroom-fittings",
    iconName: "ShowerHead",
    title: "Bathroom Fittings",
    description: "Modernizing bathrooms with the installation of new showers, bathtubs, and sanitaryware.",
    features: ["Concealed wiring", "Luxury fittings", "Space optimization"],
  },
  {
    id: "kitchen-plumbing",
    iconName: "CookingPot",
    title: "Kitchen Plumbing",
    description: "Complete kitchen plumbing services including sinks, RO filters, and dishwasher connections.",
    features: ["Sink unblocking", "RO installation", "Pipe rerouting"],
  },
  {
    id: "water-seepage",
    iconName: "AlertTriangle",
    title: "Water Seepage",
    description: "Identifying and resolving dampness and seepage issues in walls and ceilings.",
    features: ["Waterproofing", "Joint sealing", "Structural assessment"],
  },
  {
    id: "renovations",
    iconName: "Paintbrush",
    title: "Renovations",
    description: "End-to-end plumbing work for new constructions or full bathroom/kitchen renovations.",
    features: ["Layout planning", "Material sourcing", "Turnkey execution"],
  },
  {
    id: "general-repair",
    iconName: "Hammer",
    title: "General Repair",
    description: "Quick fixes for minor plumbing issues, noisy pipes, and low water pressure.",
    features: ["Pressure regulation", "Pipe replacement", "Valve checks"],
  },
];

export const SERVICES_FAQ = [
  {
    question: "Do you provide emergency plumbing services in Miyapur?",
    answer: "Yes, we offer 24/7 emergency plumbing services across Miyapur and the surrounding areas. We guarantee a rapid response to mitigate any water damage.",
  },
  {
    question: "How much does a typical plumbing repair cost?",
    answer: "Costs vary depending on the specific issue and materials required. We provide completely transparent, upfront pricing before we begin any work, so there are no surprises.",
  },
  {
    question: "Are your plumbers experienced with modern bathroom fittings?",
    answer: "Absolutely. Our team is highly trained in installing, repairing, and maintaining both traditional plumbing systems and modern, concealed bathroom fixtures.",
  },
  {
    question: "Do you offer a guarantee on your work?",
    answer: "Yes, we stand behind the quality of our craftsmanship. All our repairs and installations come with a satisfaction guarantee.",
  },
  {
    question: "How quickly can you fix a blocked drain?",
    answer: "Most common blockages can be cleared within an hour of our arrival using our specialized equipment.",
  },
];
