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
    // The link stays beside the title at every width, bottom-aligned with its
    // last line; the title wraps instead of pushing the link underneath.
    <div className="mb-8 flex items-end justify-between gap-x-6 lg:mb-12">
      <div className="min-w-0 grow">
        {label && <p className="u-label mb-3 text-muted">{label}</p>}
        <h2 className="u-display text-[20px] leading-[1.1] sm:text-[28px] lg:text-[40px]">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="u-label shrink-0 border-b border-ink pb-1 transition hover:opacity-60"
        >
          {hrefLabel}
        </Link>
      )}
    </div>
  );
}
