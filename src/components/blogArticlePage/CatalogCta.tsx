import Link from "next/link";
import { ArrowIcon } from "@/components/shared/ui/Icons";

/** CTA into the catalog at the end of an article — marketing-structure.md §3.11. */
export default function CatalogCta() {
  return (
    <div className="mt-14 flex flex-col items-start gap-5 border-t border-line pt-10 lg:mt-16">
      <p className="max-w-[420px] text-[15px] leading-relaxed text-muted">
        Сподобались речі зі статті? У каталозі — весь асортимент Bamboli: одяг, іграшки й
        аксесуари з натуральних тканин.
      </p>
      <Link
        href="/catalog"
        className="u-label inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 text-bg transition hover:bg-transparent hover:text-ink"
      >
        Перейти в каталог
        <ArrowIcon className="size-4" />
      </Link>
    </div>
  );
}
