// ============================================================
// MotionDiv — Viewport-triggered animation wrapper
// ============================================================

"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  fadeIn,
  slideUp,
  slideLeft,
  slideRight,
  scaleIn,
  blurIn,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/motion";

type PresetName =
  | "fade"
  | "slide-up"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "blur-in"
  | "stagger"
  | "stagger-item";

const presetMap: Record<PresetName, Variants> = {
  fade: fadeIn,
  "slide-up": slideUp,
  "slide-left": slideLeft,
  "slide-right": slideRight,
  scale: scaleIn,
  "blur-in": blurIn,
  stagger: staggerContainer,
  "stagger-item": staggerItem,
};

// Pre-create motion components outside of render
const MotionElements = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
} as const;

type MotionElementKey = keyof typeof MotionElements;

interface MotionDivProps {
  preset?: PresetName;
  variants?: Variants;
  as?: MotionElementKey;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

export function MotionDiv({
  preset = "slide-up",
  variants,
  as = "div",
  delay = 0,
  className,
  children,
}: MotionDivProps) {
  const Component = MotionElements[as];
  const animationVariants = variants || presetMap[preset];

  return (
    <Component
      className={cn(className)}
      variants={animationVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay > 0 ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}
