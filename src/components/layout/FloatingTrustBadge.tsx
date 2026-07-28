"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingTrustBadge() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay appearance slightly for a premium reveal effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.6,
          }}
          className={cn(
            "fixed bottom-6 left-6 z-40 hidden lg:flex flex-col gap-1.5 p-4",
            "rounded-2xl border border-white/40 bg-white/70 backdrop-blur-md",
            "shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_40px_oklch(0.55_0.18_250/0.15)]"
          )}
        >
          {/* Subtle gradient glow behind the badge */}
          <div
            className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-50"
            style={{
              background: "radial-gradient(circle at top right, oklch(0.55 0.18 250 / 0.1) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-center gap-3">
            {/* Google "G" Logo SVG placeholder */}
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-0.5 text-xs font-semibold text-brand-950">
                Google 5.0 Rating
              </p>
            </div>
          </div>
          <div className="relative z-10 mt-1 flex items-center justify-between gap-4">
            <span className="text-[11px] font-medium text-muted-foreground">Based on 500+ reviews</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">Verified</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
