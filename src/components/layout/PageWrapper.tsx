// ============================================================
// PageWrapper — Page-level wrapper with entry animations
// ============================================================

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <motion.main
      className={cn("flex-1", className)}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      role="main"
    >
      {children}
    </motion.main>
  );
}
