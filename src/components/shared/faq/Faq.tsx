"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import { FaqItem } from "@/data/faq";
import { PlusIcon } from "@/components/shared/ui/Icons";
import { cn } from "@/lib/utils";

/** Animated accordion (CSS grid-rows) + FAQPage JSON-LD. Shared by / and /delivery. */
export default function Faq({
  items,
  label = "Питання й відповіді",
  title = "Часті питання",
  description = "Про розміри, тканини, доставку й шоурум — коротко й по суті.",
  allHref,
  id,
  decorative = false,
}: {
  items: FaqItem[];
  label?: string;
  title?: string;
  description?: string;
  allHref?: string;
  id?: string;
  /** Home-page-only decorative petal from the Figma design, bleeding off the left edge. */
  decorative?: boolean;
}) {
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
    <section
      id={id}
      className={id ? "scroll-mt-[90px] pt-20 lg:scroll-mt-[100px] lg:pt-28" : "pt-20 lg:pt-28"}
    >
      <Container>
        <div className="relative isolate grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          {decorative && (
            <Image
              src="/images/bamboli/decor/petal-white.svg"
              alt=""
              width={441}
              height={373}
              aria-hidden
              className="pointer-events-none absolute left-[-23%] top-[35%] -z-10 hidden w-[37%] h-auto lg:block"
            />
          )}

          <div className="relative lg:sticky lg:top-[110px] lg:self-start">
            <p className="u-label mb-3 text-muted">{label}</p>
            <h2 className="u-display text-[28px] leading-[1.1] lg:text-[40px]">
              {title}
            </h2>
            <p className="mt-5 max-w-[340px] text-[13px] leading-relaxed text-muted">
              {description}
            </p>
            {allHref && (
              <Link
                href={allHref}
                className="u-label mt-8 inline-block border-b border-ink pb-1 transition hover:opacity-60"
              >
                Усі питання
              </Link>
            )}
          </div>

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
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[15px] leading-snug transition-colors hover:text-clay lg:py-6"
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
                      <p className="max-w-[640px] pb-6 pr-10 text-[13px] leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
