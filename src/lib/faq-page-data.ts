// ============================================================
// FAQ Page Data
// ============================================================

export interface FAQCategory {
  title: string;
  id: string;
  questions: { question: string; answer: string }[];
}

export const FAQ_DATA: FAQCategory[] = [
  {
    title: "General Questions",
    id: "general",
    questions: [
      {
        question: "How long has Ganesh Plumbing Services been operating?",
        answer: "We have over 5 years of professional plumbing experience serving residential and commercial properties across Hyderabad.",
      },
      {
        question: "Are your plumbers licensed and trained?",
        answer: "Yes, all our plumbers undergo rigorous training and have extensive hands-on experience handling complex plumbing systems safely and efficiently.",
      },
      {
        question: "Do you service both residential homes and commercial offices?",
        answer: "Absolutely. We provide comprehensive plumbing services for apartments, independent houses, offices, and commercial establishments.",
      },
    ],
  },
  {
    title: "Emergency Plumbing",
    id: "emergency",
    questions: [
      {
        question: "Do you provide 24/7 emergency plumbing?",
        answer: "Yes! We are available 24 hours a day, 7 days a week for plumbing emergencies in Miyapur and surrounding areas.",
      },
      {
        question: "How quickly can a plumber reach Miyapur in an emergency?",
        answer: "For emergency calls within Miyapur and nearby areas like Hafeezpet or Kondapur, our team typically arrives within 30-45 minutes.",
      },
      {
        question: "What constitutes a plumbing emergency?",
        answer: "Severe water leaks, burst pipes, overflowing toilets, and completely blocked main drains are considered emergencies that require immediate attention to prevent property damage.",
      },
    ],
  },
  {
    title: "Leak Detection",
    id: "leak-detection",
    questions: [
      {
        question: "Do you repair leaking pipes concealed in walls?",
        answer: "Yes, we specialize in concealed pipe leak detection and repair, minimizing the damage to your walls and tiles while fixing the issue at its source.",
      },
      {
        question: "How do I know if I have a hidden water leak?",
        answer: "Signs of a hidden leak include unexplained increases in your water bill, damp patches on walls or ceilings, peeling paint, or a persistent moldy smell.",
      },
      {
        question: "Can you fix leaking taps and faucets?",
        answer: "Yes, we repair and replace all types of leaking taps, mixers, and faucets quickly and efficiently to help you save water.",
      },
    ],
  },
  {
    title: "Drain Cleaning",
    id: "drain-cleaning",
    questions: [
      {
        question: "Do you unblock bathroom drains?",
        answer: "Yes, we clear severe hair, soap scum, and sludge blockages in bathroom floor traps and shower drains using professional equipment.",
      },
      {
        question: "Can you fix a severely blocked kitchen sink?",
        answer: "Absolutely. We remove grease, food particle buildup, and deep clogs from kitchen sinks and associated P-traps.",
      },
      {
        question: "Is chemical drain cleaner safe to use before calling you?",
        answer: "We recommend against using harsh chemical cleaners as they can corrode your PVC pipes and harm the environment. It is safer to have a professional clear the blockage mechanically.",
      },
    ],
  },
  {
    title: "Pipe Installation & Repair",
    id: "pipe-installation",
    questions: [
      {
        question: "Do you install new pipelines?",
        answer: "Yes, we handle complete new pipeline installations for both fresh water supply and drainage systems using high-quality CPVC and PVC pipes.",
      },
      {
        question: "Can you replace old, rusted iron pipes?",
        answer: "Yes, we frequently replace outdated, corroded GI (Galvanized Iron) pipes with modern, durable UPVC or CPVC alternatives to improve water quality and pressure.",
      },
      {
        question: "How do you repair a burst pipe?",
        answer: "First, we isolate the water supply to prevent further damage. Then, we cut out the damaged section and professionally weld or join a new, durable pipe section in its place.",
      },
    ],
  },
  {
    title: "Bathroom & Kitchen Plumbing",
    id: "bathroom-kitchen",
    questions: [
      {
        question: "Do you offer bathroom renovation plumbing?",
        answer: "Yes, we provide end-to-end plumbing services for bathroom renovations, including pipe rerouting, fixture upgrades, and waterproofing.",
      },
      {
        question: "Can you install modern concealed flush tanks?",
        answer: "Yes, our team is highly experienced in the installation and repair of concealed flush tanks, wall-hung toilets, and modern shower panels.",
      },
      {
        question: "Do you connect RO systems and washing machines in the kitchen?",
        answer: "Yes, we provide professional inlet and outlet plumbing connections for water purifiers, dishwashers, and washing machines.",
      },
      {
        question: "Do you fix bathroom tile seepage?",
        answer: "Yes, we offer epoxy grouting and waterproofing services to stop water seepage through bathroom floor tiles.",
      },
    ],
  },
  {
    title: "Water Heater (Geyser) Repair",
    id: "water-heater",
    questions: [
      {
        question: "Do you repair geysers?",
        answer: "Yes, we repair all brands and types of electric and gas water heaters (geysers).",
      },
      {
        question: "Why is my geyser not heating water?",
        answer: "This is usually caused by a faulty heating element, a broken thermostat, or heavy scaling inside the tank. Our technicians can quickly diagnose and replace the faulty parts.",
      },
      {
        question: "Can you install a new water heater?",
        answer: "Yes, we provide safe and secure installation of new water heaters, ensuring proper plumbing connections and leak-free performance.",
      },
    ],
  },
  {
    title: "Pricing & Service",
    id: "pricing-service",
    questions: [
      {
        question: "How much does a plumbing visit cost?",
        answer: "We offer highly competitive and transparent pricing. The cost depends on the specific repair or installation required. We always provide a clear estimate before beginning any work.",
      },
      {
        question: "Are there hidden charges for emergency call-outs?",
        answer: "No, we believe in transparent pricing. Any emergency or after-hours service fees are communicated clearly upfront when you contact us.",
      },
      {
        question: "Do you offer a warranty on your plumbing repairs?",
        answer: "Yes, we stand by the quality of our workmanship and offer a satisfaction guarantee on our repairs and installations.",
      },
      {
        question: "Can I book through WhatsApp?",
        answer: "Absolutely! You can message us on WhatsApp with your location and a description (or photo) of the problem, and we will dispatch a plumber promptly.",
      },
    ],
  },
  {
    title: "Areas We Serve",
    id: "areas-served",
    questions: [
      {
        question: "Which areas do you cover in Hyderabad?",
        answer: "We primarily serve Miyapur, Hafeezpet, Kondapur, Gachibowli, Nalagandla, Chandanagar, KPHB, Kukatpally, Nizampet, Ameenpur, Hitech City, Jubilee Hills, Manikonda, Ameerpet, and Narsingi.",
      },
      {
        question: "Do you provide services outside of these core areas?",
        answer: "While we focus on our core service areas for the fastest response times, we do undertake major plumbing projects across the wider Hyderabad region. Please contact us to confirm.",
      },
    ],
  },
];
