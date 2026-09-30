import Section from "@/components/shared/ui/Section";
import SectionHeading from "@/components/shared/ui/SectionHeading";
import Container from "@/components/shared/ui/Container";
import ScrollRow from "@/components/shared/ui/ScrollRow";
import { reviews } from "@/data/home";

export default function Reviews() {
  if (!reviews.enabled || reviews.items.length === 0) return null;

  return (
    <Section tone="mist" spacing="flush">
      <Container>
        <SectionHeading label="Відгуки" title="Що кажуть родини" />

        <ScrollRow
          label="Відгуки покупців"
          itemClassName="w-[82vw] sm:w-[58vw] md:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]"
        >
          {reviews.items.map((review) => (
            <figure
              key={review.id}
              className="flex h-full flex-col border border-line bg-surface p-7 lg:p-9"
            >
              <p className="mb-5 text-[13px] tracking-[0.2em] text-clay" aria-label="5 з 5">
                ★★★★★
              </p>
              <blockquote className="flex-1 text-[14px] leading-relaxed">
                «{review.text}»
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-5">
                <p className="u-label">{review.name}</p>
                <p className="u-caption mt-1.5">{review.meta}</p>
                <p className="u-caption mt-3">
                  Купили: <span className="text-ink">{review.product}</span>
                </p>
              </figcaption>
            </figure>
          ))}
        </ScrollRow>
      </Container>
    </Section>
  );
}
