import Link from "next/link";

export default function SectionHeading({
  label,
  title,
  href,
  hrefLabel = "Дивитись усе",
}: {
  label?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    // On mobile the link always sits under the title, right-aligned. From sm
    // up, zero basis lets the title shrink to its longest word, so the link
    // only wraps under it when even that doesn't fit beside the link.
    <div className="mb-8 flex flex-col gap-y-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-x-6 lg:mb-12">
      <div className="sm:grow sm:basis-0">
        {label && <p className="u-label mb-3 text-muted">{label}</p>}
        <h2 className="u-display text-[20px] leading-[1.1] sm:text-[28px] lg:text-[40px]">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="u-label shrink-0 self-end border-b border-ink pb-1 transition hover:opacity-60 sm:ml-auto"
        >
          {hrefLabel}
        </Link>
      )}
    </div>
  );
}
