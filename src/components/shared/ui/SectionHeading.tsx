import { cn } from "@/lib/utils";
import Button from "./Button";
import { uiText } from "@/data/uiText";

/**
 * Eyebrow + H2 (+ paragraph) (+ link on the right). The link stays beside the
 * title at every width, bottom-aligned with its last line; the title wraps
 * instead of pushing the link underneath.
 *
 * Carries the standard gap to the content below (mb-8, lg:mb-12); pass
 * className="mb-0" when the content is placed by the parent.
 */
export default function SectionHeading({
  label,
  title,
  description,
  href,
  hrefLabel = uiText.nav.viewAll,
  align = "left",
  className,
}: {
  label?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-8 flex items-end justify-between gap-x-6 lg:mb-12",
        centered && "text-center",
        className,
      )}
    >
      <div className="min-w-0 grow">
        {label && <p className="u-label mb-3 text-muted">{label}</p>}
        <h2 className="u-h2">{title}</h2>
        {description && (
          <p className={cn("u-body mt-5 max-w-[380px]", centered && "mx-auto")}>
            {description}
          </p>
        )}
      </div>
      {href && (
        <Button variant="text-link" href={href} className="shrink-0">
          {hrefLabel}
        </Button>
      )}
    </div>
  );
}
