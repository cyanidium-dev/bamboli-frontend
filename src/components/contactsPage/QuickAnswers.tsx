import Link from "next/link";
import Container from "@/components/shared/ui/Container";
import Reveal from "@/components/shared/ui/Reveal";
import { ArrowIcon } from "@/components/shared/ui/Icons";
import { quickAnswers } from "@/data/contacts";

export default function QuickAnswers() {
  return (
    <section className="pt-20 lg:pt-28">
      <Container>
        <Reveal>
          <p className="u-label mb-3 text-muted">Перш ніж писати</p>
          <h2 className="u-display text-[28px] leading-[1.1] lg:text-[40px]">
            Швидкі відповіді
          </h2>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {quickAnswers.map((item) =>
              item.external ? (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 border border-line bg-surface px-5 py-4 text-[13px] transition hover:border-ink"
                  >
                    {item.label}
                    <ArrowIcon className="size-4 shrink-0" />
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-4 border border-line bg-surface px-5 py-4 text-[13px] transition hover:border-ink"
                  >
                    {item.label}
                    <ArrowIcon className="size-4 shrink-0" />
                  </Link>
                </li>
              ),
            )}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
