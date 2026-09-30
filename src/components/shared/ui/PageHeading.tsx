/**
 * H1 of an inner page (28 / 34 / 40). The home hero uses .u-h1-hero directly.
 * Spacing to the content below is the parent's job.
 */
export default function PageHeading({
  label,
  title,
  description,
  className,
}: {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && <p className="u-label mb-3 text-muted">{label}</p>}
      <h1 className="u-h1">{title}</h1>
      {description && <p className="u-body mt-5 max-w-[380px]">{description}</p>}
    </div>
  );
}
