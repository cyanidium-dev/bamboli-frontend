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
    // Zero basis lets the title shrink to its longest word, so the link only
    // wraps under it when even that doesn't fit beside the link.
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 lg:mb-12">
      <div className="grow basis-0">
        {label && <p className="u-label mb-3 text-muted">{label}</p>}
        <h2 className="u-display text-[28px] leading-[1.1] lg:text-[40px]">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="u-label ml-auto shrink-0 border-b border-ink pb-1 transition hover:opacity-60"
        >
          {hrefLabel}
        </Link>
      )}
    </div>
  );
}
