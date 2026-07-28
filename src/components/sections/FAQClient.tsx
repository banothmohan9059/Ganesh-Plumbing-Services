// ============================================================
// FAQClient — Premium search + category accordion
// ============================================================

"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { MotionDiv } from "@/components/shared/MotionDiv";
import { FAQItem } from "@/components/shared/FAQItem";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQCategory } from "@/lib/faq-page-data";

export function FAQClient({ data }: { data: FAQCategory[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const defaultOpenId = data.length > 0 && data[0].questions.length > 0 ? `${data[0].id}-0` : null;
  const [openFaqId, setOpenFaqId] = useState<string | null>(defaultOpenId);

  const filteredData = data
    .map((category) => {
      const filteredQuestions = category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...category, questions: filteredQuestions };
    })
    .filter((category) => category.questions.length > 0);

  const totalResults = filteredData.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  );

  return (
    <>
      {/* Premium search bar */}
      <MotionDiv preset="fade" className="mx-auto mb-12 max-w-2xl">
        <div className="relative group">
          <Search
            className="absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground/60 transition-colors duration-300 group-focus-within:text-brand-500"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search plumbing questions..."
            className={[
              "h-14 w-full rounded-2xl pl-14 pr-12 text-base",
              "bg-white/70 backdrop-blur-sm",
              "border border-gray-200/80",
              "shadow-[0_2px_12px_oklch(0_0_0/0.06)]",
              "placeholder:text-muted-foreground/50",
              "transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-0",
              "focus-visible:border-brand-400 focus-visible:bg-white",
              "focus-visible:shadow-[0_4px_24px_oklch(0.55_0.18_250/0.12)]",
              "hover:border-brand-200/80 hover:bg-white/80",
            ].join(" ")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search FAQs"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-brand-100 hover:text-brand-600"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Results count */}
        <AnimatePresence>
          {searchQuery && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-3 text-center text-sm text-muted-foreground"
            >
              {totalResults > 0 ? (
                <>
                  Found{" "}
                  <span className="font-semibold text-brand-600">{totalResults}</span>{" "}
                  result{totalResults !== 1 ? "s" : ""} for{" "}
                  <span className="font-semibold">&quot;{searchQuery}&quot;</span>
                </>
              ) : (
                <>No results found</>
              )}
            </motion.p>
          )}
        </AnimatePresence>
      </MotionDiv>

      {/* FAQ content */}
      {filteredData.length > 0 ? (
        <div className="mx-auto max-w-4xl space-y-14">
          {filteredData.map((category) => (
            <MotionDiv key={category.id} preset="slide-up">
              {/* Category heading with gradient accent line */}
              <div className="relative mb-8">
                <div
                  className="absolute left-0 top-0 h-full w-1 rounded-full"
                  style={{
                    background: "linear-gradient(180deg, oklch(0.55 0.18 250), oklch(0.73 0.17 65))",
                  }}
                  aria-hidden="true"
                />
                <h2 className="pl-5 font-heading text-2xl font-bold text-foreground">
                  {category.title}
                </h2>
              </div>
              <div className="space-y-3">
                {category.questions.map((q, idx) => {
                  const faqId = `${category.id}-${idx}`;
                  const isSearching = searchQuery.length > 2;
                  
                  return (
                    <FAQItem
                      key={q.question}
                      question={q.question}
                      answer={q.answer}
                      index={idx}
                      isOpen={isSearching ? true : openFaqId === faqId}
                      onToggle={() => {
                        if (isSearching) return;
                        setOpenFaqId(openFaqId === faqId ? null : faqId);
                      }}
                    />
                  );
                })}
              </div>
            </MotionDiv>
          ))}
        </div>
      ) : (
        <MotionDiv preset="fade" className="py-16 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-muted">
            <Search className="size-7 text-muted-foreground/50" aria-hidden="true" />
          </div>
          <p className="text-lg font-semibold text-foreground">
            No results for &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try searching with different keywords.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-5 font-semibold text-brand-600 hover:text-brand-500 transition-colors underline-offset-4 hover:underline"
          >
            Clear search
          </button>
        </MotionDiv>
      )}
    </>
  );
}
