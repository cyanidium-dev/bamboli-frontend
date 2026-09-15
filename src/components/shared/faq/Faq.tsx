import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import { FaqItem } from "@/data/faq";
import { PlusIcon } from "@/components/shared/ui/Icons";

/** Native <details> accordion + FAQPage JSON-LD. Shared by / and /delivery. */
export default function Faq({
  items,
  label = "Питання й відповіді",
  title = "Часті питання",
  allHref,
}: {
  items: FaqItem[];
  label?: string;
  title?: string;
  allHref?: string;
}) {
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
    <section className="pt-20 lg:pt-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div className="lg:sticky lg:top-[110px] lg:self-start">
            <p className="u-label mb-3 text-muted">{label}</p>
            <h2 className="u-display text-[28px] leading-[1.1] lg:text-[40px]">
              {title}
            </h2>
            <p className="mt-5 max-w-[340px] text-[13px] leading-relaxed text-muted">
              Про розміри, тканини, доставку й шоурум — коротко й по суті.
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
            {items.map((item) => (
              <details key={item.id} className="group/faq border-b border-line">
                <summary className="flex list-none items-center justify-between gap-6 py-5 text-[15px] leading-snug transition-colors hover:text-clay lg:py-6 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <PlusIcon className="size-5 shrink-0 transition-transform duration-300 group-open/faq:rotate-45" />
                </summary>
                <p className="max-w-[640px] pb-6 pr-10 text-[13px] leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            ))}
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
