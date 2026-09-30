import Link from "next/link";
import PageHeading from "@/components/shared/ui/PageHeading";

interface Crumb {
  label: string;
  href?: string;
}

export default function CatalogHeader({
  title,
  caption,
  breadcrumbs,
}: {
  title: string;
  caption?: string;
  breadcrumbs: Crumb[];
}) {
  return (
    <div className="mb-6 lg:mb-10">
      <nav aria-label="Навігація" className="u-label mb-6 text-muted lg:mb-10">
        <Link href="/" className="transition hover:text-ink">
          Головна
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

      <PageHeading title={title} description={caption} />
    </div>
  );
}
