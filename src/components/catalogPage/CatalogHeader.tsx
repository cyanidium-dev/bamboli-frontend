import Link from "next/link";
import PageHeading from "@/components/shared/ui/PageHeading";
import { uiText } from "@/data/uiText";

interface Crumb {
  label: string;
  href?: string;
}

export default function CatalogHeader({
  title,
  caption,
  breadcrumbs,
  actions,
}: {
  title: string;
  caption?: string;
  breadcrumbs: Crumb[];
  /** Icon buttons pinned to the right, on the bottom line of the heading block. */
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 lg:mb-10">
      <nav aria-label="Навігація" className="u-label mb-6 text-muted lg:mb-10">
        <Link href="/" className="transition hover:text-ink">
          {uiText.nav.home}
        </Link>
        {breadcrumbs.map((crumb) => (
          <span key={crumb.label}>
            <span className="px-2">/</span>
            {crumb.href ? (
              <Link href={crumb.href} className="transition hover:text-ink">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-ink">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="flex items-end justify-between gap-4">
        {/* min-w-0: the title takes the width left by the icons and wraps inside it. */}
        <PageHeading
          title={title}
          description={caption}
          className="min-w-0 [&_h1]:break-words"
        />
        {actions}
      </div>
    </div>
  );
}
