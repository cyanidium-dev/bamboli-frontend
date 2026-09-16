import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/shared/ui/Container";
import CatalogView from "@/components/catalogPage/CatalogView";
import CatalogHeader from "@/components/catalogPage/CatalogHeader";
import {
  getAksesuaryProducts,
  getCategoryBySlug,
  getIgrashkyProducts,
  getOdyagProducts,
  getSaleProducts,
} from "@/lib/api";
import {
  accessorySubcategories,
  findOdyagGroup,
  odyagGroups,
  toyBrands,
  toySubcategories,
} from "@/data/categoryTree";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

/** /catalog/sale is a filter on the «Знижка» flag, not a real category. */
const SALE = {
  title: "Знижки",
  caption: "Улюблені моделі за вигідною ціною — поки є розміри.",
};

interface Crumb {
  label: string;
  href?: string;
}

interface Resolved {
  title: string;
  caption?: string;
  breadcrumbs: Crumb[];
  products: Product[];
  chips: { label: string; href: string; active: boolean }[];
}

async function resolve(category: string, slug: string[]): Promise<Resolved | null> {
  if (category === "sale") {
    if (slug.length > 0) return null;
    return {
      title: SALE.title,
      caption: SALE.caption,
      breadcrumbs: [{ label: SALE.title }],
      products: await getSaleProducts(),
      chips: [],
    };
  }

  const main = await getCategoryBySlug(category);
  if (!main) return null;

  if (category === "odyag") {
    const [groupSlug, subSlug] = slug;
    if (slug.length > 2) return null;

    if (!groupSlug) {
      return {
        title: main.title,
        caption: main.caption,
        breadcrumbs: [{ label: main.title }],
        products: await getOdyagProducts(),
        chips: odyagGroups.map((group) => ({
          label: group.title,
          href: `/catalog/odyag/${group.slug}`,
          active: false,
        })),
      };
    }

    const group = findOdyagGroup(groupSlug);
    if (!group) return null;

    if (!subSlug) {
      return {
        title: group.title,
        caption: group.caption,
        breadcrumbs: [
          { label: main.title, href: "/catalog/odyag" },
          { label: group.title },
        ],
        products: await getOdyagProducts(groupSlug),
        chips: group.subcategories.map((sub) => ({
          label: sub.title,
          href: `/catalog/odyag/${group.slug}/${sub.slug}`,
          active: false,
        })),
      };
    }

    const sub = group.subcategories.find((item) => item.slug === subSlug);
    if (!sub) return null;

    return {
      title: sub.title,
      caption: `${sub.title} у розділі «${group.title}».`,
      breadcrumbs: [
        { label: main.title, href: "/catalog/odyag" },
        { label: group.title, href: `/catalog/odyag/${group.slug}` },
        { label: sub.title },
      ],
      products: await getOdyagProducts(groupSlug, subSlug),
      chips: group.subcategories.map((item) => ({
        label: item.title,
        href: `/catalog/odyag/${group.slug}/${item.slug}`,
        active: item.slug === subSlug,
      })),
    };
  }

  if (category === "igrashky") {
    if (slug.length > 2) return null;
    if (slug.length === 0) {
      return {
        title: main.title,
        caption: main.caption,
        breadcrumbs: [{ label: main.title }],
        products: await getIgrashkyProducts(),
        chips: toySubcategories.map((sub) => ({
          label: sub.title,
          href: `/catalog/igrashky/${sub.slug}`,
          active: false,
        })),
      };
    }

    if (slug[0] === "brend") {
      const brandSlug = slug[1];
      const brand = toyBrands.find((item) => item.slug === brandSlug);
      if (!brand) return null;
      return {
        title: brand.name,
        caption: `Товари бренду ${brand.name} у Bamboli.`,
        breadcrumbs: [
          { label: main.title, href: "/catalog/igrashky" },
          { label: brand.name },
        ],
        products: await getIgrashkyProducts(undefined, brandSlug),
        chips: toyBrands.map((item) => ({
          label: item.name,
          href: `/catalog/igrashky/brend/${item.slug}`,
          active: item.slug === brandSlug,
        })),
      };
    }

    if (slug.length > 1) return null;
    const sub = toySubcategories.find((item) => item.slug === slug[0]);
    if (!sub) return null;
    return {
      title: sub.title,
      caption: `${sub.title} у розділі «${main.title}».`,
      breadcrumbs: [
        { label: main.title, href: "/catalog/igrashky" },
        { label: sub.title },
      ],
      products: await getIgrashkyProducts(sub.slug),
      chips: toySubcategories.map((item) => ({
        label: item.title,
        href: `/catalog/igrashky/${item.slug}`,
        active: item.slug === sub.slug,
      })),
    };
  }

  if (category === "aksesuary") {
    if (slug.length > 1) return null;
    if (slug.length === 0) {
      return {
        title: main.title,
        caption: main.caption,
        breadcrumbs: [{ label: main.title }],
        products: await getAksesuaryProducts(),
        chips: accessorySubcategories.map((sub) => ({
          label: sub.title,
          href: `/catalog/aksesuary/${sub.slug}`,
          active: false,
        })),
      };
    }

    const sub = accessorySubcategories.find((item) => item.slug === slug[0]);
    if (!sub) return null;
    return {
      title: sub.title,
      caption: `${sub.title} у розділі «${main.title}».`,
      breadcrumbs: [
        { label: main.title, href: "/catalog/aksesuary" },
        { label: sub.title },
      ],
      products: await getAksesuaryProducts(sub.slug),
      chips: accessorySubcategories.map((item) => ({
        label: item.title,
        href: `/catalog/aksesuary/${item.slug}`,
        active: item.slug === sub.slug,
      })),
    };
  }

  return null;
}

export async function generateStaticParams() {
  const params: { category: string; slug?: string[] }[] = [
    { category: "sale" },
    { category: "odyag" },
    { category: "igrashky" },
    { category: "aksesuary" },
  ];

  for (const group of odyagGroups) {
    params.push({ category: "odyag", slug: [group.slug] });
    for (const sub of group.subcategories) {
      params.push({ category: "odyag", slug: [group.slug, sub.slug] });
    }
  }

  for (const sub of toySubcategories) {
    params.push({ category: "igrashky", slug: [sub.slug] });
  }
  for (const brand of toyBrands) {
    params.push({ category: "igrashky", slug: ["brend", brand.slug] });
  }

  for (const sub of accessorySubcategories) {
    params.push({ category: "aksesuary", slug: [sub.slug] });
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { category, slug = [] } = await params;
  const resolved = await resolve(category, slug);
  if (!resolved) return {};
  return { title: resolved.title, description: resolved.caption };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string; slug?: string[] }>;
}) {
  const { category, slug = [] } = await params;
  const resolved = await resolve(category, slug);
  if (!resolved) notFound();

  return (
    <Container className="pb-10 pt-10 lg:pt-14">
      <CatalogHeader
        title={resolved.title}
        caption={resolved.caption}
        breadcrumbs={resolved.breadcrumbs}
      />

      {resolved.chips.length > 0 && (
        <div className="no-scrollbar -mx-1 mb-8 flex max-w-full items-center gap-1.5 overflow-x-auto px-1 lg:mb-12 lg:flex-wrap">
          {resolved.chips.map((chip) => (
            <Link
              key={chip.href}
              href={chip.href}
              className={cn(
                "shrink-0 border px-2.5 py-1.5 text-[11px] leading-none transition",
                chip.active
                  ? "border-ink bg-ink text-bg"
                  : "border-line hover:border-ink",
              )}
            >
              {chip.label}
            </Link>
          ))}
        </div>
      )}

      <CatalogView
        products={resolved.products}
        filterBy={category === "sale" ? "category" : "size"}
      />
    </Container>
  );
}
