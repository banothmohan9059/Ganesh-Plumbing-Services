// ============================================================
// Ganesh Plumbing Services — Premium Framer Motion Presets
// ============================================================
// Rich, cinematic animations inspired by Stripe/Linear.
// Spring physics for organic feel.
// ============================================================

import type { Variants, Transition } from "framer-motion";

// ------------------------------------------------------------
// Shared Timing
// ------------------------------------------------------------

const ease = [0.25, 0.1, 0.25, 1] as const;
const easeOut = [0, 0, 0.2, 1] as const;

const defaultTransition: Transition = {
  duration: 0.6,
  ease,
};

const quickTransition: Transition = {
  duration: 0.4,
  ease,
};

const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1,
};

// ------------------------------------------------------------
// Fade
// ------------------------------------------------------------

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

// ------------------------------------------------------------
// Slide Up
// ------------------------------------------------------------

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

// ------------------------------------------------------------
// Slide Down
// ------------------------------------------------------------

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// ------------------------------------------------------------
// Slide Left (enters from right)
// ------------------------------------------------------------

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

// ------------------------------------------------------------
// Slide Right (enters from left)
// ------------------------------------------------------------

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

// ------------------------------------------------------------
// Scale
// ------------------------------------------------------------

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

// ------------------------------------------------------------
// Blur In (Premium)
// ------------------------------------------------------------

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

// ------------------------------------------------------------
// Stagger Container
// ------------------------------------------------------------

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ------------------------------------------------------------
// Stagger Item
// ------------------------------------------------------------

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: quickTransition,
  },
};

// ------------------------------------------------------------
// Hover & Tap Presets
// ------------------------------------------------------------

export const hoverLift = {
  whileHover: {
    y: -4,
    transition: { duration: 0.3, ease: easeOut },
  },
  whileTap: {
    y: 0,
    scale: 0.99,
    transition: { duration: 0.1 },
  },
};

export const hoverScale = {
  whileHover: {
    scale: 1.03,
    transition: { duration: 0.3, ease: easeOut },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 30px oklch(0.55 0.18 250 / 0.2), 0 4px 20px oklch(0 0 0 / 0.08)",
    transition: { duration: 0.3, ease: easeOut },
  },
};

// ------------------------------------------------------------
// Viewport Defaults
// ------------------------------------------------------------

export const viewportOnce = {
  once: true,
  margin: "-80px" as const,
};

export const viewportRepeat = {
  once: false,
  margin: "-60px" as const,
};

// ------------------------------------------------------------
// Page Transition
// ------------------------------------------------------------

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease,
    },
  },
};

// ------------------------------------------------------------
// Utility: Create slide-up with custom distance
// ------------------------------------------------------------

export function createSlideUp(distance: number = 30, duration: number = 0.6): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease },
    },
  };
}

// ------------------------------------------------------------
// Utility: Create stagger with custom timing
// ------------------------------------------------------------

export function createStagger(
  staggerDelay: number = 0.1,
  initialDelay: number = 0.15
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };
}
