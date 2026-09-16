import { BlogFaqItem } from "@/types/blog";
import { PlusIcon } from "@/components/shared/ui/Icons";

/** In-article FAQ block + FAQPage JSON-LD — mirrors `shared/faq/Faq.tsx`. */
export default function ArticleFaq({ items }: { items: BlogFaqItem[] }) {
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
      <h2 className="u-display mb-6 text-[24px] leading-[1.2] lg:text-[28px]">
        Часті запитання
      </h2>

      <div className="border-t border-line">
        {items.map((item) => (
          <details key={item.id} className="group/faq border-b border-line">
            <summary className="flex list-none items-center justify-between gap-6 py-5 text-[15px] leading-snug transition-colors hover:text-clay [&::-webkit-details-marker]:hidden">
              {item.question}
              <PlusIcon className="size-5 shrink-0 transition-transform duration-300 group-open/faq:rotate-45" />
            </summary>
            <p className="pb-6 pr-10 text-[13px] leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
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
