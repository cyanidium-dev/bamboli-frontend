"use client";

import { useState } from "react";
import { BlogFaqItem } from "@/types/blog";
import { PlusIcon } from "@/components/shared/ui/Icons";
import { cn } from "@/lib/utils";

/** In-article FAQ block + FAQPage JSON-LD — mirrors `shared/faq/Faq.tsx`. */
export default function ArticleFaq({ items }: { items: BlogFaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="mt-14 max-w-[720px] lg:mt-16">
      <h2 className="u-display mb-6 text-[20px] leading-[1.2] sm:text-[24px] lg:text-[28px]">
        Часті запитання
      </h2>

      <div className="border-t border-line">
        {items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[15px] leading-snug transition-colors hover:text-clay"
              >
                {item.question}
                <PlusIcon
                  className={cn(
                    "size-5 shrink-0 transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              </button>

              {/* Smooth expand/collapse via animated grid rows (0fr → 1fr) —
                  dependency-free and animates to the content's natural height. */}
              <div
                id={`faq-panel-${item.id}`}
                role="region"
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 pr-10 text-[13px] leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
